// Highcharts has a nasty habit of modifying arrays in place.
// This prevents it from changing the data!
var getData = function(i) {
    var dataset = [
        [1, 2, 3, 4],
        [8,3,1,4],
        [8,3,1,4],
        [3,4,4,7]
    ];
    return dataset[i];
};
        
// Create dynamic desktop chart
var desktopChart = $('.chart').highcharts({
	series: [{ data: getData(0) }]
}).highcharts();

// Create static mobile charts
$('.mobile-chart').each(function(i, el) {
    var data = getData(i);
    $(el).highcharts({
    	series: [{ data: data }]
    });
});

// Create new TwoStep instance
var ts = new TwoStep({
    elements: document.querySelectorAll('.narrative-item'),
    onChange: function(event) {
        console.log('Waypoint '+event.index+' triggered')
        var newData = getData(event.index);
        desktopChart.series[0].setData(newData);
    },
    stick: document.querySelector('.rightcol'),
});

function checkSize() {
    // if desktop...
    if ($(window).width() > 700) {
        ts.enable();
    // if mobile...
    } else {
        ts.disable();
    }
}

// Check current screen size
// and set up event listener for future changes
checkSize();
$(window).resize(checkSize);
