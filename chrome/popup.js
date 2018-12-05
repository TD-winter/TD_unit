var myChart = echarts.init(document.getElementById('main'));

var array = [];
var title_name = [],
	click_number = [],
	time_number = [];
chrome.storage.local.get({
	name:'1991-11-17',
    record : array
}, function(items) {
    console.log(items);
    for(var i = 0;i < items.record.length;i++){
    	title_name.push(items.record[i].title.substring(0,15));
    	click_number.push(items.record[i].click);
    	time_number.push((items.record[i].time / 1000)/60);
    }

	var option = {
		title:{
			text:'chrome浏览器使用情况展示'+items.name
		},
		tooltip:{
			trigger:'axis',
			axisPointer:{
				type:'shadow'
			}
		},
		legend:{
			data:['点击次数']
		},
		grid:{
			left:'1%',
			containLabel:true
		},
		xAxis:{
			type:'value',
			boundaryGap:[0,0.01]
		},
		yAxis:{
			type:'category',
			data:title_name
		},
		series:[{
			name:'次数',
			type:'bar',
			data:click_number
		},
		{
			name:'停留时间',
			type:'bar',
			data:time_number
		}
		]
	};

	myChart.setOption(option);



})

