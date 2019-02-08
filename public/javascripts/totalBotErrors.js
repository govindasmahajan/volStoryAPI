$(document).ready(function () {

    var errorCounts = [];
    var errorNames = [];
    var botData = {};

    $.ajax({
        url: "https://bots-test.smartbothub.com/6790/v1/api/getErrorNameCount",
        type: "POST",
        contentType: 'application/json',
        headers: {},
        data: JSON.stringify({
            botId: "Test-Autotek21",
            fromDate: 1299626563000,
            toDate: new Date().getTime()
        }),
        crossDomain: true,
        success: function (res) {
            botData = res;
            let count = 0;
            console.log("res", botData);
            if (botData) {
                for (var i = 0; i < botData.data.length; i++) {
                    if (errorNames.indexOf(botData.data[i].error_name) == -1) {
                        errorNames.push(botData.data[i].error_name);
                        errorCounts.push(botData.data[i].count)
                        count = count + botData.data[i].count;
                    }
                }
                document.getElementById('error-count').innerHTML = count;
                initGraph();
                beforePrintHandler();
            }

        },
        error: function (a, b, err) {
            initGraph();
            beforePrintHandler();
            console.log("Error in getting data", err);
        }
    });


    function getDateFormat(dt) {

        let m_names = new Array("Jan", "Feb", "Mar",
            "Apr", "May", "Jun", "Jul", "Aug", "Sep",
            "Oct", "Nov", "Dec");
        let curr_date = dt.getDate();
        let curr_month = dt.getMonth();
        let curr_year = dt.getFullYear();
        return curr_date + " " + m_names[curr_month]
            + " " + curr_year;
    }

    function beforePrintHandler() {
        for (var id in Chart.instances) {
            Chart.instances[id].resize()
        }
    }

    function initGraph() {

        var data = {
            labels: errorNames,
            datasets: [{
                label: "Errors",
                fill: false,
                data: errorCounts,
                backgroundColor: [
                    "rgb(245, 139, 31)",
                    "rgb(0, 156, 204)",
                    "rgb(168, 206, 75)",
                    "rgb(251, 188, 61)",
                    "rgb(105, 81, 170)",
                    "#3f5a87",
                    "#681213",
                    "#213d29",
                    "#3f4222",
                    "#162d2b",
                    "#35173a",
                    "#b36b00",
                    "#006666"
                ],
                hoverBackgroundColor: [
                    "#34495E",
                    "#B370CF",
                    "#CFD4D8",
                    "#36CAAB",
                    "#49A9EA",
                    "#5579b5",
                    "#961819",
                    "#376845",
                    "#5e6331",
                    "#2a5955",
                    "#622b6b",
                    "#ffad33",
                    "#00cccc"
                ]
            }]
        };



        var pieOptions = {
            events: true,
            responsive: true,
            intersect: false,
            showLabels: true,
            animation: {
                duration: 1000
            },
            title: {
                display: true,
                text: 'No. of failed bookings due to error in bot',
                fontSize: 14
            },
            legend: {
                display: true
            },
            tooltips: {
                enabled: true,
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';

                        if (label) {
                            label += ': ';
                        }
                        label += Math.round(tooltipItem.yLabel * 100) / 100;
                        return label;
                    },
                    labelColor: function (tooltipItem, chart) {
                        return {
                            borderColor: 'rgb(255, 0, 0)',
                            backgroundColor: 'rgb(255, 0, 0)'
                        }
                    }
                }
            },
            hover: {
                mode: 'point',
                intersect: true
            }
        };


        var pieChartCanvas = document.getElementById("error-chart").getContext('2d');;
        var barChart = new Chart(pieChartCanvas, {
            type: 'pie', // or doughnut
            data: data,
            options: pieOptions
        });
    }
});