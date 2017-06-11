var bg = chrome.extension.getBackgroundPage(); 
var time = bg.time;

var arr = [];
for(url in time){
	arr.push({
		"url" : url,
		"total_time": parseInt(time[url].total_time)
	});
} 
arr.sort(function(a, b){
    return b.total_time - a.total_time;
});
	
for (var i=0;i<arr.length;i++){	
	if(i>9){
		break;
	}
	var hrs = parseInt(arr[i].total_time/3600000)
	var min = parseInt((arr[i].total_time-(hrs*3600000))/60000);
	var sec = parseInt((arr[i].total_time-(hrs*3600000)-(min*60000))/1000);
	hrs = hrs == 0 ? "" : hrs + "h ";
	min = min == 0 ? "" : min + "m ";
	sec = sec == 0 ? "0s" : sec + "s";
	$("table tbody").append("<tr><td>"+arr[i].url+"</td><td> "+hrs + min +sec+"</td></tr>");
}

var clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', function(event) {  
	event.preventDefault();
	window.onclick =function(){
		chrome.runtime.sendMessage({greeting: "onclick"}, function(response) {
	    	console.log(response.farewell);
	    	var parent = document.getElementById("div1");
	    	var child = document.getElementById("table");
			parent.removeChild(child);
		});
	}
});

function openTab(element) {
    window.close();
    chrome.tabs.create({
      url: chrome.extension.getURL('pages/' + element + '.html')
    });
}
$('.tab').click(function() {
  openTab($(this).data('tab'));
});

