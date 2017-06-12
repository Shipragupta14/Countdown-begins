# Countdown-begins
It is a Chrome Extension which keeps the track of how much time you have spend on each tab.

## How to Run
  * You can try the extension by enabling developer mode from the chrome://extensions settings and loading the unpacked extension.
For more detail check this link: https://developer.chrome.com/extensions/getstarted#unpacked
  
  * Or you can download countdown-begins.crx and drag it to the extension page.


When we enabled the extension, icon of the extension will get appears on the chrome toolbar. After switching the tabs or windows, you can click on the icon. The popup will show you the time for each tab which are get stored in the local storage of the chrome.


![Figure 1](/screenshots/popup.png)


The popup will show the time in decreasing order for various sites and the limit is set to be 10 for the popup.
To see the time for the other sites, you can click on the 'MORE' button which will redirect you to the more.html
more.html will show you the time spend for all tabs along with the graph.


![Figure 2](/screenshots/more.png)


If you click on the 'CLEAR' button then all the records of time get clear from the local storage and the new time will start for all the sites and the popup will appear like this.


![Figure 3](/screenshots/clear.png)


And the countdown begins again :)



