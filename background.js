//  document.addEventListener("visibilitychange", function(){
// 	console.log(document.visibilityState);
// 	console.log("sejbcjbk");
// //chrome.extension.getViews(type : 'popup');
// });
/*chrome.tabs.onActivated.addListener(function(info) {
    var tab = chrome.tabs.get(info.tabId, function(tab) {
        localStorage["current_url"] = tab.url;
    });
}); */

console.log("background.js");

/*
chrome.tabs.onActivated.addListener(function(info) {
	///console.log(new Date());
var d = new Date();
	console.log(d.getTime());
	var start_time = d.getTime();

	//console.log(start_time/3600000)
	var h = parseInt(start_time/3600000);
	var m = parseInt((start_time-3600000)/60000);
	var s = parseInt((start_time-3600000-60000)/1000);
	console.log("the time is "+h+" hours "+m+" min "+s+" seconds");

    var tab = chrome.tabs.get(info.tabId, function(tab) {
        localStorage["current_url"] = tab.id;
    });
}); */

if (localStorage["time"]) {
	var time = JSON.parse(localStorage.getItem("time"));
}else{
	localStorage.setItem("time", JSON.stringify({}));
	var time = JSON.parse(localStorage.getItem("time"));
}

var tabActive;

chrome.tabs.onActivated.addListener(function(info) {	
	console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
	//console.log(tabActive);
	if (tabActive) {
		var d = new Date();
  		
		time[tabActive].total_time  = parseInt(time[tabActive].total_time) + parseInt(d.getTime()) - parseInt(time[tabActive].start_time);

	}
	 
  var d = new Date();
  var start_time = d.getTime();
  var url= "";
 // console.log(tab);
 
	chrome.tabs.get(info.tabId, function(tab) {
  console.log('onActivated', info.tabId);
  url = tab.url;
  console.log(url);
  
  	
	    if(url.indexOf("/",9)!= -1){
    	url = url.substring(0,url.indexOf("/",9))

    };
 
	    tabActive = url;

	    // adding new url in time json of the tab we jumped
	    if(time.hasOwnProperty(url)){
	    	time[url].start_time = start_time;
	    }else{
    		time[url] = {
    				"start_time"  : start_time,
    				"total_time": 0
    			}
	    }




	    console.log(time);
	    console.log("*******************");

	    // Put the object into storage
		localStorage.setItem('time', JSON.stringify(time));
		// Retrieve the object from storage
		var retrievedObject = localStorage.getItem('time');

		console.log('retrievedObject: ', JSON.parse(retrievedObject));
	
	});
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
   	if(changeInfo.url){
   		if (tabActive) {
			var d = new Date();
			time[tabActive].total_time  = parseInt(time[tabActive].total_time) + parseInt(d.getTime()) - parseInt(time[tabActive].start_time);
			//time[tabActive].start_time = d.getTime(); 
		}	

		var d = new Date();
  		var start_time = d.getTime();
  		var url= "";
   	    console.log(changeInfo.url);
   		url = changeInfo.url;
   		console.log(url);

   		if(url.indexOf("/",9)!= -1){
    		url = url.substring(0,url.indexOf("/",9))

		}

   		tabActive = url;

	    // adding new url in time json of the tab we jumped
	    if(time.hasOwnProperty(url)){
	    	time[url].start_time = start_time;
	    }else{
    		time[url] = {
    				"start_time"  : d.getTime(),
    				"total_time" : 0
    			}
	    }

	    console.log(time);

   		localStorage.setItem('time', JSON.stringify(time));
		// Retrieve the object from storage
		var retrievedObject = localStorage.getItem('time');

		console.log('retrievedObject: ', JSON.parse(retrievedObject));
   	}
   	console.log("##################");

   });

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo){
	chrome.tabs.query({currentWindow: true}, function(tabs){
    	console.log(tabs.length);
    	if(tabs.length == 0){
    		if (tabActive) {
				var d = new Date();
				time[tabActive].total_time  = parseInt(time[tabActive].total_time) + parseInt(d.getTime()) - parseInt(time[tabActive].start_time);
			
			}
			
			localStorage.setItem('time',JSON.stringify(time));
			var retrievedObject =  localStorage.getItem('time');
			console.log('retrievedObject:', JSON.parse(retrievedObject));

    	}
	});



});


