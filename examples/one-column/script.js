var ts = new TwoStep({
    elements: document.querySelectorAll('.parent .narrative-item'),
    onChange: function(event) {
        console.log('Item '+event.index);
    },
    stick: document.querySelector('.parent .sticky-outer'),
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
    ],
    offset: {
        up: '-10%',
        down: '100%'
    }
});
