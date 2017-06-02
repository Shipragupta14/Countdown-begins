chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    console.log(tabs[0].url);
    var output = tabs[0].url;
      document.getElementById("display").innerHTML = output;


/*
chrome.browserAction.onClicked.addListener(function(tab) {
	var d = new Date();
	console.log(d);
    var n = d.getSeconds();
    console.log(n);
    document.getElementById("demo").innerHTML = n;

}); */
});
var background = chrome.extension.getBackgroundPage(); 
background.transfer;