var bg = chrome.extension.getBackgroundPage(); 
var time = bg.time;

//Pushing the JSON obj in the array
var arr = [];
for(url in time){
	arr.push({
		"url" : url,
		"total_time": parseInt(time[url].total_time)
	});
} 
//Sorting the array according to the time
arr.sort(function(a, b){
    return b.total_time - a.total_time;
});

//to convert each timestamp into the time format
for (var i=0;i<arr.length;i++){	
	if(i>9){     //To show only 10 sites in the popup
		break;
	}
	var hrs = parseInt(arr[i].total_time/3600000)
	var min = parseInt((arr[i].total_time-(hrs*3600000))/60000);
	var sec = parseInt((arr[i].total_time-(hrs*3600000)-(min*60000))/1000);
	hrs = hrs == 0 ? "" : hrs + "h ";
	min = min == 0 ? "" : min + "m ";
	sec = sec == 0 ? "0s" : sec + "s";
	//using jquery to store each array element into the table 
	$("table tbody").append("<tr><td>"+arr[i].url+"</td><td> "+hrs + min +sec+"</td></tr>");
}

//Functionality of Clear button

var clearBtn = document.querySelector('#clear');
clearBtn.addEventListener('click', function(event) {  
	event.preventDefault();
	window.onclick =function(){
		//sending msg from popup.js to background.js
		chrome.runtime.sendMessage({greeting: "onclick"}, function(response) {
	    	console.log(response.farewell);
	    	var parent = document.getElementById("div1");
	    	var child = document.getElementById("table");
	    	//removing table on clicking the clear button
			parent.removeChild(child);
			document.getElementById("clear").style.display= 'none';
			document.getElementById("tab").style.display= 'none';

		});
	}
});

//Functionality of More button to redirect on its html page
function openTab(element) {
    window.close();
    chrome.tabs.create({
      url: chrome.extension.getURL('pages/' + element + '.html')
    });
}
$('.tab').click(function() {
  openTab($(this).data('tab'));
});

