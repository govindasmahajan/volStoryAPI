$(document).ready(function () {

    var bookingCounts = [];
    var bookingArr = [];
    var botData = {};

    $.ajax({
        url: "https://dev.smartbothub.com/3000/getFacilityCount",
        type: "GET",
        headers: {},
        crossDomain: true,
        success: function (res) {
            botData = res;
            console.log("res", botData);
            if (botData) {
                let tempDate;
                let rowCount = 0;
                console.log("botData.data", botData.data);
                for (var i = 0; i < botData.data.length; i++) {
                    let bDate = new Date(parseInt(botData.data[i].dateOfBooking));
                    let customDateLabel = getDateFormat(bDate);
                    if (bookingArr.indexOf(customDateLabel) == -1) {
                        rowCount = 1;
                        bookingArr.push(customDateLabel);
                        bookingCounts.push(rowCount);
                    } else {
                        rowCount++;
                        bookingCounts[bookingArr.indexOf(customDateLabel)] = rowCount;
                    }

                }
                document.getElementById('courtsey-booking-count').innerHTML = botData.total ? botData.total : botData.data.length;
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
            labels: bookingArr,
            datasets: [{
                label: "Courtsey Bookings",
                fill: false,
                data: bookingCounts,
                backgroundColor: '#34495E',
                borderColor: "#34495E",
                pointRadius: 5,
                pointHoverRadius: 10,
                pointHitRadius: 30,
            }]
        };



        var lineOptions = {
            events: true,
            responsive: true,
            animation: {
                duration: 1000
            },
            title: {
                display: true,
                text: 'No. of Courtesy Vehicle Bookings',
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
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Date (2018)'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        };


        var lineChartCanvas = document.getElementById("courtsey-booking-chart").getContext('2d');;
        var barChart = new Chart(lineChartCanvas, {
            type: 'line', // or doughnut
            data: data,
            options: lineOptions
        });
    }
});