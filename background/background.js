var time;
var tabActive;

// Initializing local storage

if (localStorage["time"]) {
	 time = JSON.parse(localStorage.getItem("time"));
}else{
	localStorage.setItem("time", JSON.stringify({}));
	 time = JSON.parse(localStorage.getItem("time"));
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse){

    if (request.greeting == "onblur"){
    	updateTime();
        sendResponse({farewell: "goodbye"}); 
    }else if(request.greeting == "onfocus"){ 

    	chrome.tabs.query({currentWindow: true, active: true}, function(tab){
			startTime(getDomain(tab[0].url));
			sendResponse({farewell: "welcome"});
		});
    }else if (request.greeting == "onclick") {
		localStorage.removeItem(time);
		localStorage.setItem("time", JSON.stringify({}));
		time = JSON.parse(localStorage.getItem("time"));
		startTime(tabActive);
	    sendResponse({farewell: "Cleared!!"});
	}
});

chrome.tabs.onActivated.addListener(function(info) {	
	updateTime();
	chrome.tabs.get(info.tabId, function(tab) {
		startTime(getDomain(tab.url));
	});
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
   	if(changeInfo.url){
   		updateTime();
  		startTime(getDomain(changeInfo.url));
   	}
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo){
	chrome.tabs.query({currentWindow: true}, function(tabs){
    	if(tabs.length == 0){
			updateTime();
    	}
	});
});

chrome.windows.onFocusChanged.addListener(function(windowId) {
    if (windowId === -1) {
         // Assume minimized
  		updateTime();
    } else {
        chrome.windows.get(windowId, function(chromeWindow) {
            if (chromeWindow.state === "minimized") {
            	updateTime();
            } else {
                chrome.tabs.query({currentWindow: true, active: true}, function(tab){
                	updateTime();
	 				startTime(getDomain(tab[0].url));
    			});
            }
        });
    }
});

function startTime(url){
	var d = new Date();
	if(time.hasOwnProperty(url)){
		time[url].start_time = d.getTime();
	}else{
		time[url] = {
		"start_time"  : d.getTime(),
		"total_time": 0
		}
	}

	tabActive = url;
	localStorage.setItem('time', JSON.stringify(time));
}

function updateTime(){
	var  d = new Date();
	if(tabActive){
		time[tabActive].total_time = parseInt(time[tabActive].total_time) + parseInt(d.getTime()) - parseInt(time[tabActive].start_time);
		time[tabActive].start_time = d.getTime();
	}
	localStorage.setItem('time',JSON.stringify(time));		
}

function getDomain(url){
	if(url.indexOf("/",9)!= -1){
		url = url.substring(0,url.indexOf("/",9))
	}
	return url;
}