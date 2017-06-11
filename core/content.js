window.onblur =function(){
	chrome.runtime.sendMessage({greeting: "onblur"}, function(response) {
	    console.log(response.farewell);
	});
}
window.onfocus =function(){
	chrome.runtime.sendMessage({greeting: "onfocus"}, function(response) {
	    console.log(response.farewell);
	});
}
