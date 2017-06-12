var bg = chrome.extension.getBackgroundPage(); 
var time = bg.time;

var chart;
var arr = [];           //Used for the table
var urlData =[];		//Used for the highcharts
var durationData = [];	//Used for the highcharts
for(url in time){
	arr.push({
		"url" : url,
		"total_time": parseInt(time[url].total_time)
	});
} 
arr.sort(function(a, b){
    return b.total_time - a.total_time;
});
arr.forEach( function(obj, index){
	//Passing these arrays in the highchart so that axes will not depend on time format
	urlData.push(obj.url);						//pushing the url
	durationData.push(obj.total_time/1000);  	//pushing seconds after dividing by 1000
});

//For pagination...
var arrLength = arr.length;
var size  = 10;
var pages = Math.ceil(arrLength/size);
document.querySelector('.pagination').innerHTML="";
for(var i = 0; i< pages; i++){
	//making the page buttons
	var html = "<li><a  class='list' href='#' >"+parseInt(i+1)+"</a></li>";
    document.querySelector('.pagination').innerHTML =  document.querySelector('.pagination').innerHTML + html;
  }

//to check which page button is clicked by the user
  for(var i= 0; i<pages; i++){
       document.getElementsByClassName('list')[i].addEventListener('click', function(event){
       	event.preventDefault();
	  	getPage(event.toElement.innerHTML);
	  });
  }

//According to the page no., we set the the range of array lies in that page 
  function getPage(pageNo) {
	var start = (pageNo-1)*size +1;
    var end;
    if(pageNo*size > arrLength){
    	end = arrLength;
    }else{
    	end = pageNo*size;
    }
    //slice method returns the elements of an array as a new array object
    newarr = arr.slice(start-1, end);
    newUrl = urlData.slice(start-1, end);
    newDuration = durationData.slice(start-1, end);
    document.querySelector('table tbody').innerHTML = "";
    //to display the time format during the pagination too
	for (var i=0;i<newarr.length;i++){
		var hrs = parseInt(newarr[i].total_time/3600000)
		var min = parseInt((newarr[i].total_time-(hrs*3600000))/60000);
		var sec = parseInt((newarr[i].total_time-(hrs*3600000)-(min*60000))/1000);
		hrs = hrs == 0 ? "" : hrs + "h ";
		min = min == 0 ? "" : min + "m ";
		sec = sec == 0 ? "0s" : sec + "s";
		document.querySelector('table tbody').innerHTML = document.querySelector('table tbody').innerHTML+ "<tr><td>"+newarr[i].url+"</td><td> "+hrs +min +sec +"</td></tr>";
		getChart(newUrl, newDuration);
	}
}
//to display the time format in table 
	for (var i=0;i< (arr.length > size ? size : arr.length);i++){
		var hrs = parseInt(arr[i].total_time/3600000);
		var min = parseInt((arr[i].total_time-(hrs*3600000))/60000);
		var sec = parseInt((arr[i].total_time-(hrs*3600000)-(min*60000))/1000);
		hrs = hrs == 0 ? "" : hrs + "h ";
		min = min == 0 ? "" : min + "m ";
		sec = sec == 0 ? "0s" : sec + "s";
		document.querySelector('table tbody').innerHTML = document.querySelector('table tbody').innerHTML+ "<tr><td>"+arr[i].url+"</td><td> "+hrs +min +sec +"</td></tr>";		
	}

//to show the columns in graph for that sites only which lies in a page 
getChart(urlData.slice(0,size), durationData.slice(0,size));

//GRAPH
function getChart(urlData, durationData){
	//dark-unica theme for highchart 
	Highcharts.theme = {
	colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066', '#eeaaee',
		'#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
	chart: {
		backgroundColor: {
			linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
			stops: [
				[0, '#2a2a2b'],
				[1, '#3e3e40']
			]
		},
		style: {
			fontFamily: '\'Unica One\', sans-serif'
			},
		plotBorderColor: '#606063'
		},
	title: {
		style: {
			color: '#E0E0E3',
			textTransform: 'uppercase',
			fontSize: '20px'
		}
	},
	subtitle: {
		style: {
			color: '#E0E0E3',
			textTransform: 'uppercase'
		}
	},
	xAxis: {
		gridLineColor: '#707073',
		labels: {
			style: {
				color: '#E0E0E3'
			}
		},
		lineColor: '#707073',
		minorGridLineColor: '#505053',
		tickColor: '#707073',
		title: {
			style: {
				color: '#A0A0A3'

			}
		}
	},
	yAxis: {
		gridLineColor: '#707073',
		labels: {
			style: {
				color: '#E0E0E3'
			}
		},
		lineColor: '#707073',
		minorGridLineColor: '#505053',
		tickColor: '#707073',
		tickWidth: 1,
		title: {
			style: {
				color: '#A0A0A3'
			}
		}
	},
	tooltip: {
		backgroundColor: 'rgba(0, 0, 0, 0.85)',
		style: {
			color: '#F0F0F0'
		}
	},
	plotOptions: {
		series: {
			dataLabels: {
				color: '#B0B0B3'
			},
			marker: {
				lineColor: '#333'
			}
		},
		boxplot: {
			fillColor: '#505053'
		},
		candlestick: {
			lineColor: 'white'
		},
		errorbar: {
			color: 'white'
		}
	},
	legend: {
		itemStyle: {
			color: '#E0E0E3'
		},
		itemHoverStyle: {
			color: '#FFF'
		},
		itemHiddenStyle: {
			color: '#606063'
		}
	},
	credits: {
		style: {
			color: '#666'
		}
	},
	labels: {
		style: {
			color: '#707073'
		}
	},

	drilldown: {
		activeAxisLabelStyle: {
			color: '#F0F0F3'
		},
		activeDataLabelStyle: {
			color: '#F0F0F3'
		}
	},

	navigation: {
		buttonOptions: {
			symbolStroke: '#DDDDDD',
			theme: {
				fill: '#505053'
			}
		}
	},

	// scroll charts
	rangeSelector: {
		buttonTheme: {
			fill: '#505053',
			stroke: '#000000',
			style: {
				color: '#CCC'
			},
			states: {
				hover: {
					fill: '#707073',
					stroke: '#000000',
					style: {
						color: 'white'
					}
				},
				select: {
					fill: '#000003',
					stroke: '#000000',
					style: {
						color: 'white'
					}
				}
			}
		},
		inputBoxBorderColor: '#505053',
		inputStyle: {
			backgroundColor: '#333',
			color: 'silver'
		},
		labelStyle: {
			color: 'silver'
		}
	},

	navigator: {
		handles: {
			backgroundColor: '#666',
			borderColor: '#AAA'
		},
		outlineColor: '#CCC',
		maskFill: 'rgba(255,255,255,0.1)',
		series: {
			color: '#7798BF',
			lineColor: '#A6C7ED'
		},
		xAxis: {
			gridLineColor: '#505053'
		}
	},

	scrollbar: {
		barBackgroundColor: '#808083',
		barBorderColor: '#808083',
		buttonArrowColor: '#CCC',
		buttonBackgroundColor: '#606063',
		buttonBorderColor: '#606063',
		rifleColor: '#FFF',
		trackBackgroundColor: '#404043',
		trackBorderColor: '#404043'
	},

	// special colors for some of the
	legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
	background2: '#505053',
	dataLabelsColor: '#B0B0B3',
	textColor: '#C0C0C0',
	contrastTextColor: '#F0F0F3',
	maskColor: 'rgba(255,255,255,0.3)'
};
Highcharts.setOptions(Highcharts.theme);

//Giving values to the chart
chart = Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    
    title: {
        text: 'Runtime for the active tab'
    },
    xAxis:{
    	categories: urlData            //passing urlData array obj on the x-axis after slicing
    },
    yAxis: {
        min: 0,                     //minimum value of y-axis is zero
        title: {
            text: 'Time(seconds)'	 //y-axis always fetch the data from the array mentioned in the series
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0"> {series.name}: </td>' +
            '<td style="padding:0"><b> {point.y:.0f} sec</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Time',
        data: durationData				//passing durationData array obj on y -axis

    }]
});
}