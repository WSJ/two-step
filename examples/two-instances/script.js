var ts = new TwoStep({
    elements: document.querySelectorAll('.parent .narrative-item'),
    onChange: function(event) {
        console.log('Item '+event.index);
    },
    stick: document.querySelector('.parent .rightcol'),
    narrative: [
        function(event) {
            $('.parent .chart').text('Item '+event.index);
        },
        function(event) {
            $('.parent .chart').text('Item '+event.index);
        },
        function(event) {
            $('.parent .chart').text('Item '+event.index);
        },
        function(event) {
            $('.parent .chart').text('Item '+event.index);
        }
    ]
});

var ts2 = new TwoStep({
    elements: document.querySelectorAll('.parent2 .narrative-item'),
    onChange: function(event) {
        console.log('Item '+event.index);
    },
    stick: document.querySelector('.parent2 .rightcol'),
    narrative: [
        function(event) {
            $('.parent2 .chart').text('Item '+event.index);
        },
        function(event) {
            $('.parent2 .chart').text('Item '+event.index);
        },
        function(event) {
            $('.parent2 .chart').text('Item '+event.index);
        },
        function(event) {
            $('.parent2 .chart').text('Item '+event.index);
        }
    ]
});
