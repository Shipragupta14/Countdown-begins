var bg = chrome.extension.getBackgroundPage(); 
var time = bg.time;
for(url in time){
	console.log(url);
	console.log(time[url].total_time);

	var hrs = parseInt(time[url].total_time/3600000);
	var min = parseInt((time[url].total_time-(hrs*3600000))/60000);
	var sec = parseInt((time[url].total_time-(hrs*3600000)-(min*60000))/1000);
	// var p = document.createElement('p');
	// var span =  document.createElement('span');

	// var timeV = document.createTextNode(url +":"+hrs+" hrs "+min+" min "+sec+" sec");
	// span.appendChild(timeV);
	// p.appendChild(span);
	// //console.log(document.getElementById("title").innerHTML);
	// document.body.appendChild(p);
	jQuery("body").append("<p><span><b>"+url+" : </b> "+hrs+" hrs "+min+" min "+sec+" secs</span></p>");

} 

