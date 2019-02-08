util = {}

util.formatChartData = (chartData) => {
    let chartCounts = [], chartLabels = [];
    for (var i = 0; i < chartData.length; i++) {
        let bDate = new Date(parseInt(chartData[i].dateOfBooking));
        let customDateLabel = getDateFormat(bDate);
        console.log(customDateLabel, bDate, chartData[i].dateOfBooking);
        const index = chartLabels.indexOf(customDateLabel)
        if (index === -1) {
            chartLabels.push(customDateLabel);
            chartCounts.push(1);
        } else {
            chartCounts[index] = chartCounts[index] + 1;
        }
    }
    return { labels: chartLabels, data: chartCounts };
}

function getDateFormat(dt) {
    let m_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let curr_date = dt.getDate();
    let curr_month = dt.getMonth();
    let curr_year = dt.getFullYear();
    return curr_date + " " + m_names[curr_month]
        + " " + curr_year;
}


module.exports = util;
