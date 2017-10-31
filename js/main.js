(function () {
    var dataInstance;
    var visInstance;

    function loadPlotWidget(ele) {
        return VIS.CHART.WIDGET.plotVisWidget({
            element: ele[0],
            data: dataInstance
        });
    }   


    $(document).ready(function () {
        dataInstance = dataProcesser();
        //initWorker();
        dataInstance.posData = tsneProcesser(dataInstance.data);

        visInstance = loadPlotWidget($('[data-id="vis-widget"]'));
    });
})();