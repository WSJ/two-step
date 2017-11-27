// Highcharts has a nasty habit of modifying arrays in place.
// This prevents it from changing the data!
var getData = function(i) {
    var dataset = [
        [1, 2, 3, 4],
        [8,3,1,4],
        [8,3,1,4],
        [3,4,4,7]
    ];
    if (!dataset[i]) {
        return dataset[0];
    }
    return dataset[i];
};

// Create dynamic desktop chart
var chart = $('.chart').highcharts({
	series: [{ data: getData(0) }]
}).highcharts();

// Create carousel for mobile
var carousel = $(".owl-carousel").owlCarousel({
    items: 1,
    onChanged: function(event) {
        console.log('Slide '+event.item.index+' triggered')
        var newData = getData(event.item.index);
        chart.series[0].setData(newData);
    }
});

// Create new TwoStep instance
var ts = new TwoStep({
    elements: document.querySelectorAll('.desktop-narrative .narrative-item'),
    onChange: function(event) {
        console.log('Waypoint '+event.index+' triggered')
        var newData = getData(event.index);
        chart.series[0].setData(newData);
    },
    stick: document.querySelector('.rightcol'),
});

function checkSize() {
    // if desktop...
    if ($(window).width() > 700) {
        ts.enable();
        $('.narrative-item').css('padding-top', '');
    // if mobile...
    } else {
        ts.disable();
        $('.narrative-item').css('padding-top', chart.chartHeight);
    }
}

// Check current screen size
// and set up event listener for future changes
checkSize();
$(window).resize(checkSize);
