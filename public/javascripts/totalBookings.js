$(document).ready(function () {

    var bookingCounts = [];
    var bookingArr = [];
    var botData = {};

    $.ajax({
        url: "https://dev.smartbothub.com/3000/getBookingCount",
        type: "GET",
        headers: {},
        crossDomain: true,
        success: function (res) {
            botData = res;
            if (botData) {
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
                document.getElementById('booking-count').innerHTML = botData.total ? botData.total : 0
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

    // function getData() {
    //     let botData = { "data": [{ "_id": "5bbdc8b74f247b7c1f2d3557", "vehReg": "MA58TRX", "bookingNum": "8196", "dateOfBooking": "1539164343488", "facility": "None", "__v": 0 }, { "_id": "5bbdca3547f057041311b03d", "vehReg": "MA58TRX", "bookingNum": "8197", "dateOfBooking": "1539335637602", "facility": "None", "__v": 0 }, { "_id": "5bbdccba47f057041311b03e", "vehReg": "MA58TRX", "bookingNum": "8198", "dateOfBooking": "1539165370053", "facility": "None", "__v": 0 }, { "_id": "5bbdcdf347f057041311b03f", "vehReg": "MA58TRX", "bookingNum": "8199", "dateOfBooking": "1539335637602", "facility": "None", "__v": 0 }, { "_id": "5bbe124d66ec46030b3e34bc", "vehReg": "MA58TRX", "bookingNum": "8204", "dateOfBooking": "1539183181287", "facility": "Courtesy Car", "__v": 0 }, { "_id": "5bbe159466ec46030b3e34bd", "vehReg": "MA58TRX", "bookingNum": "8205", "dateOfBooking": "1539184020058", "facility": "Courtesy Car", "__v": 0 }, { "_id": "5bbe198a66ec46030b3e34be", "vehReg": "MA58TRX", "bookingNum": "8207", "dateOfBooking": "1539185034917", "facility": "None", "__v": 0 }, { "_id": "5bbe1a0d66ec46030b3e34bf", "vehReg": "MA58TRX", "bookingNum": "8208", "dateOfBooking": "1539185165170", "facility": "Courtesy Car", "__v": 0 }, { "_id": "5bbe2c3966ec46030b3e34c0", "vehReg": "MA58TRX", "bookingNum": "8213", "dateOfBooking": "1539189817738", "facility": "Courtesy Car", "__v": 0 }, { "_id": "5bbe2f7566ec46030b3e34c1", "vehReg": "MA58TRX", "bookingNum": "8214", "dateOfBooking": "1539190645140", "facility": "Courtesy Car", "__v": 0 }], "total": 10 };
    //     let tempDate;
    //     let rowCount = 0;
    //     console.log("botData.data", botData.data);
    //     for (var i = 0; i < botData.data.length; i++) {
    //         let bDate = new Date(parseInt(botData.data[i].dateOfBooking));
    //         let customDateLabel = (bDate.getMonth() + 1) + '/' + bDate.getDate();
    //         if (bookingArr.indexOf(customDateLabel) == -1) {
    //             rowCount = 0;
    //             bookingArr.push(customDateLabel);
    //             bookingCounts.push(rowCount);
    //         } else {
    //             rowCount++;
    //             bookingCounts[bookingArr.indexOf(customDateLabel)] = rowCount;
    //         }

    //     }
    //     console.log("bookingArr", bookingArr);
    //     console.log("bookingCounts", bookingCounts);
    //     document.getElementById('booking-count').innerHTML = botData.total ? botData.total : 0
    //     initGraph();
    //     beforePrintHandler();
    // }


    function beforePrintHandler() {
        for (var id in Chart.instances) {
            Chart.instances[id].resize()
        }
    }

    function initGraph() {

        var data = {
            labels: bookingArr,
            datasets: [{
                label: "Bookings",
                fill: false,
                data: bookingCounts,
                backgroundColor: '#2ECC71',
                borderColor: "#2ECC71",
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
                text: 'No. of Bookings',
                fontSize: 14
            },
            legend: {
                display: true
            },
            tooltips: {
                enabled: true,
                mode: 'label',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem, data) {
                        console.log("tooltipItem=====", tooltipItem, data);
                        var label = data.datasets[tooltipItem.datasetIndex].label || '';
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


        var lineChartCanvas = document.getElementById("booking-chart").getContext('2d');;
        var barChart = new Chart(lineChartCanvas, {
            type: 'line', // or doughnut
            data: data,
            options: lineOptions
        });
    }
});