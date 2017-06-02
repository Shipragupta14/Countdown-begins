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
chrome.tabs.onSelectionChanged.addListener(function (tabId, inf) {
	
	//console.log(tabActive);
	if (tabActive) {
		var d = new Date();
  		
		time[tabActive].total_time  = parseInt(time[tabActive].total_time) + parseInt(d.getTime()) - parseInt(time[tabActive].start_time);

	}
	 
  console.log('onSelectionChanged', tabId, JSON.stringify(inf));
  var d = new Date();
  var start_time = d.getTime();
  var url= "";
 // console.log(tab);
	chrome.tabs.get(tabId, function(tab) {

	    url = tab.url;
	    if(url.indexOf("/",9)!= -1){
    	url = url.substring(0,url.indexOf("/",9))
    };
 
	    tabActive = url;

	    console.log(url);
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

	    // Put the object into storage
		localStorage.setItem('time', JSON.stringify(time));
		// Retrieve the object from storage
		var retrievedObject = localStorage.getItem('time');

		console.log('retrievedObject: ', JSON.parse(retrievedObject));
	});
});

// chrome.tabs.onUpdated.addListener(function (tabId, inf) {
//   console.log('onUpdated', tabId, JSON.stringify(inf));
// });
 chrome.tabs.onReplaced.addListener(function (addedTabId, removedTabId){
 	console.log("dfhghchcs")
 })


