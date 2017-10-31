'use strict';
var dataProcesser = function () {

  var generateRandomData = function(cnt, dim){
  	var data = d3.range(cnt).map(function(){
  		var arr = [];
  		for(var i=0;i<dim;i+=1){
  			arr.push(Math.random());
  		}
  		return arr;
  	});
  	return data;
  	//d3.range(300).map(d => [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]);
  }

    var inputData = generateRandomData(300,5);
  return{
  	data:inputData
  }
};


var tsneProcesser = function(data){
	var model = new TSNE({
	  dim: 2,
	  perplexity: 30.0,
	  earlyExaggeration: 4.0,
	  learningRate: 100.0,
	  nIter: 5,
	  metric: 'euclidean'
	});

	model.init({
	  data: data,
	  type: 'dense'
	});	

	model.run();
	var result = model.getOutputScaled();
	return result;
}