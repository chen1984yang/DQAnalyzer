var VIS = VIS || {};
VIS.CHART = VIS.CHART || {};
VIS.CHART.WIDGET = VIS.CHART.WIDGET || {};
VIS.CHART.WIDGET.plotVisWidget = function (options) {

    if (!options) throw 'options can not be null';
    else if (options && !options.element) throw 'options.element can not be null';

    var defaultVal = {
        transitionDuration:500,
        margin: { top: 4, right: 4, bottom: 4, left: 4 },
        xAxisRange:[-1,1],
        yAxisRange:[-1,1],
        dotSize:2
    };

    function PlotVis(options) {
        var self = this;
        self.d3Ele = d3.select(options.element);
        self.element = options.element;
        self.data = options.data; 
        self.settings = $.extend({}, defaultVal, options);
    }

    PlotVis.prototype = {
        init: function () {
            this._initChart();
           // this._generateChart();
        },
        redraw:function(data){
        },
        resize:function(){
        },
        _initChart:function(){
            var self = this;
          $(self.element).find('[data-id=chartView]').html('');            
            self.chartHeight = $(self.element).find('[data-id=chartView]').height() - self.settings.margin.top - self.settings.margin.bottom;
            self.chartWidth = $(self.element).find('[data-id=chartView]').width() - self.settings.margin.left - self.settings.margin.right;
            
            self.chart = self.d3Ele.select('[data-id=chartView]').append('svg')
            .attr('class','plotVisChart')
            .style('height',self.chartHeight+'px')
            .style('width',self.chartWidth+'px')
            .style('left', self.settings.margin.left + 'px')
            .style('top', self.settings.margin.top + 'px'); 


            self.xScale = d3.scaleLinear().domain([-1, 1]).range([0, self.chartWidth]);
            self.yScale = d3.scaleLinear().domain([-1, 1]).range([0, self.chartHeight]);
            self.chart.append('g').attr('class','dotArea');

            //self._generatePosition();
            self._generateChart();             
        },
        _generatePosition:function(){
            var self = this;
            self.posData = self.data.data.map(function(){
                return [(Math.random()-0.5),(Math.random()-0.5) ];
            });
        },
        _generateChart:function(){
            var self = this;
            var view = self.chart.selectAll('.dotArea');
            var data = self.data.data;
            var posData = self.data.posData;
            var dots = view.selectAll('.dot').data(data)

            var enter = dots.enter().append('g').attr('class','dot')
            .attr('transform',function(d,i){
                return 'translate('+self.xScale(posData[i][0])+','+self.yScale(posData[i][1])+')';
            });

            enter.append('circle').attr('class','dotCircle').attr('r',self.settings.dotSize);

        }
    };
    var plotVis = new PlotVis(options);
    plotVis.init();
    return {
        options: plotVis.settings,
        redraw: function () {
            plotVis.redraw.apply(plotVis, arguments);
        },
        resize:function(){
            plotVis.resize.apply(plotVis, arguments);
        }
    };
};