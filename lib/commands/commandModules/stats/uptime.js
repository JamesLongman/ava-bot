'use strict';

// Module to handle the %uptime command, replies with a graph of Ava's uptime

/* eslint import/no-unresolved: 1 */

const ChartjsNode = require('chartjs-node');
const config = require('../../../../config/config.js');
const log = require('../../../logger.js')(module);
const moment = require('moment');
const mysql = require('mysql');

const database = config.getConfig().database;

module.exports = {
    execute(message) {
        log.verbose(`Called by ${message.member.displayName} (${message.author.id}), on ` +
            `${message.guild.name} (${message.guild.id})`);

        const connection = mysql.createConnection(database);
        connection.connect();

        const dateToday = moment().format('YYYY-MM-DD');
        const date6DaysAgo = moment().subtract(6, 'days').format('YYYY-MM-DD');

        const dateYesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
        const date30DaysAgo = moment().subtract(30, 'days').format('YYYY-MM-DD');

        // Update uptime to new value for today's date in the uptime table
        connection.query(`SELECT * FROM Uptime WHERE date between '${date6DaysAgo}' and ` +
        `'${dateToday}' order by date desc`,
        (error, weekResults) => {
            if (error) { log.error(error); }
            log.silly(`Database querry for weekly uptime: ${JSON.stringify(weekResults)}`);

            connection.query('SELECT AVG(uptime) FROM Uptime WHERE date between ' +
            `'${date30DaysAgo}' and '${dateYesterday}'`,
            (error2, monthResults) => {
                if (error2) { log.error(error2); }
                log.silly(`Database querry for monthly uptime: ${JSON.stringify(monthResults)}`);

                connection.query('SELECT AVG(uptime) FROM Uptime WHERE date < ' +
                `'${dateToday}'`,
                (error3, alltimeResults) => {
                    if (error3) { log.error(error3); }
                    log.silly(`Database querry for alltime uptime: ${JSON.stringify(alltimeResults)}`);

                    createChart(message, weekResults, monthResults, alltimeResults, dateToday);
                    connection.end();
                });
            });
        });
    },
};

function createChart(message, weekResults, monthResults, alltimeResults, dateToday) {
    const chartNode = new ChartjsNode(1000, 1000);

    const chartJsOptions = {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Past Week',
                    xAxisID: 'timeAxis',
                    lineTension: 0.2,
                    backgroundColor: 'rgba(75,192,192,0.3)',
                    borderColor: 'rgba(75,192,192,1)',
                    pointRadius: 0,
                    data: [],
                },
                {
                    xAxisID: 'fixedAxis',
                    backgroundColor: 'rgba(255, 0, 0, 0.3)',
                    borderColor: 'rgba(255, 0, 0, 1)',
                    borderDash: [10, 10],
                    fill: false,
                    pointRadius: 0,
                    data: [],
                },
                {
                    xAxisID: 'fixedAxis',
                    backgroundColor: 'rgba(255, 130, 5, 0.3)',
                    borderColor: 'rgba(255, 130, 5, 1)',
                    borderDash: [10, 10],
                    borderDashOffset: 10,
                    fill: false,
                    pointRadius: 0,
                    data: [],
                },
            ],
        },
        options: {
            title: {
                display: true,
                text: 'Ava Bot Uptime',
                fontColor: '#000',
                fontSize: 36,
            },
            scales: {
                xAxes: [
                    {
                        type: 'time',
                        id: 'timeAxis',
                        time: {
                            unit: 'day',
                            displayFormats: {
                                day: 'MMM Do',
                            },
                        },
                        position: 'bottom',
                        gridLines: {
                            color: 'rgba(255, 255, 255, 0.5)',
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Date',
                            fontColor: '#000',
                            fontSize: 25,
                        },
                    }, {
                        id: 'fixedAxis',
                        display: false,
                    },
                ],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 100,
                        stepSize: 10,
                    },
                    gridLines: {
                        color: 'rgba(255, 255, 255, 0.5)',
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Uptime (%)',
                        fontColor: '#000',
                        fontSize: 25,
                    },
                }],
            },
            plugins: {
                // This triggers after the window and graph has been created, but data is yet to be plotted
                beforeDraw(chartInstance) {
                    const ctx = chartInstance.chart.ctx;
                    const chartArea = chartInstance.chartArea;

                    // First fill the entire canvas with a white background (default is black)
                    ctx.fillStyle = '#fff'; // White
                    ctx.fillRect(0, 0, chartInstance.chart.width, chartInstance.chart.height);

                    // Secondly fill just the chart area with a blueprint blue background to match Ava's style
                    ctx.fillStyle = '#1a53ff'; // 'Blueprint blue'
                    ctx.fillRect(chartArea.left, chartArea.top, chartArea.right - chartArea.left,
                        chartArea.bottom - chartArea.top);
                },
            },
        },
    };

    let uptimeToday = false;

    for (const i in weekResults) {
        const point = {};
        point.x = weekResults[i].date;
        if (moment(weekResults[i].date).format('YYYY-MM-DD') === dateToday) {
            uptimeToday = Math.round((weekResults[i].uptime /
            Math.floor((Date.now() - moment().startOf('day').format('x')) / 60000)) * 100);
            point.y = uptimeToday;
        } else {
            point.y = Math.round((weekResults[i].uptime / 1440) * 100);
        }
        chartJsOptions.data.datasets[0].data.push(point);
    }

    let content = null;

    if (uptimeToday > 98) {
        content = `No current bot issues, uptime so far today is ${uptimeToday}%`;
    } else if (uptimeToday > 90) {
        content = `Ava is currently experiencing minor issues, uptime so far today is ${uptimeToday}%`;
    } else {
        content = 'Ava is currently experiencing some issues, apologies for the downtime. Uptime so ' +
        `far today is ${uptimeToday}%`;
    }

    const pastMonthPercent = Math.round((monthResults[0]['AVG(uptime)'] / 1440) * 100);
    const alltimePercent = Math.round((alltimeResults[0]['AVG(uptime)'] / 1440) * 100);

    chartJsOptions.data.datasets[1].label = `Past Month (${pastMonthPercent}%)`;
    chartJsOptions.data.datasets[1].data = [pastMonthPercent, pastMonthPercent];

    chartJsOptions.data.datasets[2].label = `All-time (${alltimePercent}%)`;
    chartJsOptions.data.datasets[2].data = [alltimePercent, alltimePercent];

    log.silly(`Data: ${JSON.stringify(chartJsOptions.data.datasets[0].data)}`);

    chartNode.drawChart(chartJsOptions)
                .then(() => {
                    log.silly('Succesfully drew graph');
                    chartNode.getImageBuffer('image/jpeg')
                        .then((buffer) => {
                            message.channel.sendFile(buffer, `Ava-uptime-${dateToday}.jpeg`, content)
                                .then(() => {
                                    log.silly('Succesfully posted graph to channel');
                                    chartNode.destroy();
                                })
                                .catch((err2) => {
                                    log.warn(`Failed to send file, ${err2}`);
                                });
                        })
                        .catch((err) => {
                            log.warn(`Failed to get buffer, ${err}`);
                        });
                })
                .catch((drawErr) => {
                    log.silly(`Failed to draw, ${drawErr}`);
                });
}
