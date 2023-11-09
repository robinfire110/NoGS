# NoGS
 Chrome Extension that ensures you are connected to a VPN before going to blocked sites.

# Why?
 A friend of mine kept forgetting to connect a VPN before going to less than shady websites (I don't ask questions, I just write programs) to ensure the school network doesn't track where he is going. He asked if there was a way to block going to particular sites unless you are using a VPN, I looked around and couldn't find anything so I decided to write this Chrome Extension.

# How?
 It's fairly simple. First, the user gives a default IP address to check against. The extension will then periodically check to see if the user's IP address data is different than the default. If so, it assumes the user is connected to a VPN and does not block sites. 

Then, the user lists out the sites they want to be blocked by clicking on the icon in the extensions menu. On every new request, the extension will check if the site the user is attempting to connect to is on the list. If so, it will check if it's connected to a VPN and block it depending on the VPN status. All data is stored locally and you can adjust the parameters of how IP addresses are checked to best fit your needs.

Originally, earlier versions checked for the VPN when you went to the sites. However, it would frequently take too long to block the page. The goal was to avoid ever connecting in the first place, so this wasn't acceptable. The current implementation has it's flaws (constantly pinging and API isn't ideal), but I think it works fairly well. Though, I may reconsider if it becomes a problem.

# Installation
1. Download newest release and unzip the folder. Open Chrome and go to the extensions page. 
2. Ensure you have "Developer Mode" enabled by flipping the switch in the top right corner. Then click on "Load Unpacked" and locate the folder with the extension. Load it and it will appear in your list of extensions. 
3. For the initial setup, ensure you are not connected to a VPN and then open the options menu. Do this by simply clicking the icon in the Chrome Extension menu (the puzzle peice one) an select "NoGS".
4. The extension will automatically set your current IP as the home IP Address. Finish the setup, add the list of sites you want to be blocked (detailed instructions are in the documentation) and enable the extension by pressing "Enable" and the bottom.
5. Click save to commit your changes and the extension should start functioning.
6. Consider reading the documentation for deatiled information about the functions of the extension and possible solutions to problems that may arise.
 
# Documentation
 When you click the "NoGS" icon in the extensions menu, the options menu will appear. Within it, you can adjust how the extension functions.
 
## Blocked Sites
 The main text area is where you add the sites you want to be blocked when you are not connected to a VPN. You can simply write out the webiste URL and seperate each website with a new line. For the best results, write the site in it's simplest form (i.e. no need for "www." or "http:\\"). An example of the format is below...
 >amazon.com\
 >twitter.com\
 >facebook.com
 
 **Note:** The program will block the entire site regardless of what URL is inserted. So, inputting `https://www.youtube.com/watch?v=dQw4w9WgXcQ` will block the entirety of YouTube. 
 
 The extension will only block new searches. So, if you have a tab open with a blocked site and you disconnect from your VPN, the site will remain open until you  refresh.
 
 Additionally, the extension **will not** block a site with embedded links to blocked sites. For example, if you have blocked `youtube.com` and you go to a site with embeded YouTube videos, that site will not be blocked and you will be able to view those embedded videos. However, if you try to go to YouTube itself, it will still be blocked. 

**Note:** I've made it this way because this is a pretty rare situation. However in theory, this is an option I could add fairly easily so if you want it, let me know and I can look into it.
 
## Scoping Options
 Since the extension uses data obtained from your IP address, you can choose how percise you want the blocking to be. This is useful because depending on your internet setup (home network, laptop, school or work network etc.), you may want to adjust the parameters to get better results.

### IP Address
 The extension must have a default IP address that will be used to compare against. The should be your "home" IP address, or whatever the standard would be without being connected to a VPN, but feel free to input whatever you'd like if you have a certain use case in mind. Remember, the extension simply checks for differences between your connected and default IPs.
 
 By default, it will use the IP address you are connected to when you first open the extension. You can press the "Use Current IP" button to insert the current IP address. Alternatively, you can input an IP address manually. 
 
### Scope
 The "Scope" option refers to which parameter you want the extension to check against. You have 6 options and they are ordered from least percise to most percise. You can set whichever one best suits your needs and your network setup. The option you may want to choose may change depending on if you are travling on a laptop, or are staying in the same place with a static IP. If you aren't percise enough, you may get blocked even when connected to a VPN. If you are too percise, you may not get blocked when you are not connected to a VPN. It highly depends on your network and VPN setup, experiment to see what works best for you.
 
 | Scope  | Info |
 | ------------- |:-------------:|
 | Country      |Checks if IP matches country. Useful if your VPN changes your location to a different country.|
 | Region      |**Recommended and default value**. Checks if IP matches region. This would could be States, Provinces, Territories etc. depending on the location. Offers good balance between detecting VPNs and unblocking sites accidentally.|
 | City      |Checks if IP matches City. Fairly percise, and won't trigger portable setups until you leave the City.|
 | Zip      |Checks if IP matches Zip Code. Very percise location.|
 | IP Address      |Checks if IP addresses are the same. Not recommended for most users due to dynamic IP addressing for many network setups. However, can be very effective for advanced users with a static IP address.|

 If you would like to check exactly what data the extension is getting, you can do so by going to the API's website. The fields the program checks for are (in order) `countryCode, region, city, zip, asname, query`. The link is below.
 
 https://ip-api.com
 
### VPN Check Frequency
 The extension makes use of periodically checking your IP to see if you are connected to a VPN. This ensures when the time comes to check a blocked site, it will already know your connection status, making far more reliable and responsive (older versions checked for the VPN on the request and it sometimes took awhile for it to catch up).
 
 The number in this box indicates how frequently you want to check  you current IP for a VPN. The default is every 3 seconds. While this works for most setups in my testing, you may adjust it to fit your needs. For example, if you have a particularly slow connection, you can lower the frequency by inputting a higher number, though I would not recommend any higher than 30 seconds. Due to limitations with the API, the lowest possible value is 1 second while the maximum has been limited to 600 seconds (10 minutes).
 
 Lastly, when the extension is disabled, the checking is automatically turn off.
 
 **Note:** The number you input is not exact. There will always be reponse time for the API to take into account. I would estimate it could take up to double the amount of time you input for the status to update depending on when the update happens and the API latency.
 
### VPN Status Indicator
 On the bottom right corner of the popup menu, you will see the VPN Status Indicator. It tells you the status of if the extension thinks your connected to a VPN or not.
 
 | Color  | Info |
 | ------------- |:-------------:|
 | Red |No VPN being used. Listed sites will be blocked.|
 | Green |VPN is being used. Listed sites will not be blocked.|
 | Grey |Disabled|
 
 Additionally, you can hover over the indicator to see the status.
 
 **Note:** When you connect/disconnect to a VPN, you have to wait for the next check for the extension to start/release to the block. It is not instant. Please keep this in mind when using the extension.

## Enabling
 If you want to enable/disable the extension for whatever reason, simply click "Enabled" or "Disabled" at the bottom of the popup menu. The extension will stay in that state until you switch it back. Remember to save to make it go into effect!

## Save your changes!
 Be sure to click "Save" whenever you are done to submit your changes, otherwise your changes will be lost. This includes enabling/disabling!
 
 Once you save, the popup will automatically close, the extension will reload and your changes will go into effect.

## VPN Blockers
 Some VPNs come with features to block certain sites labeled as malware, trackers or ads (i.e. Surfshark's ClearWeb, NordVPN's Threat Protection etc). Depending on your VPN, enabling these features may result in this extension not functioning properly. This is because the VPN may block the APIs used to make this extension function. If you are having issues and you have a VPN with these capabilities, try turning off these features to see if this resolves your issue. Additionally, if you have the ability to whitelist sites, whitelisting the API site (freeipapi.com) may also resolve the issue.
 
 Depending on the VPN, you may be unable to use this extension and your VPN blockers enabled at the same time. I apologize if this is the case

# Versions
## 1.3
* Switch to FreeIpApi (from ipify and ip-api)
	* Done to simplify program to only use 1 API instead of 2 and for better compatibility with Ad Blockers (I found this one wasn't blocked as much).
* Fixed bug where the Blocked Screen would not load properly.
* Made it so if VPN gets turned on and you are on a block page, that page will automatically redirect.

## 1.2
* Icon
* Improved UI (with Bootstrap 5) on Options and Blocked screens.
* Improved request interception
* Changed method of checking VPN (does it periodically rather than on request)
* New options (VPN check speed)

## 1.1
* Better compatibility
	* Ability to insert your default IP to select what to check against
* Bug fixes
* Improved Documentation (in the README)

## 1.0
* Functioning version (but only for the school)
* Does not intercept request, meaning request gets sent and then blocked

# Credits
* Developer - Andy Villasmil (robinfire110)
* APIs - freeipapi.com
* Made with - HTML, CSS, JavaScript, Bootstrap
* Base Website Block Code - https://dev.to/penge/learn-the-most-useful-chrome-apis-by-creating-block-site-chrome-extension-2de8

# Thanks!
 I hope this extension fits the niche for anyone who needs it. After the 1.2 version, I'm going to consider this extension finished unless some massive bug or such is discovered. If you find any such bug, or want to request a feature be added, feel free to let me know and I'll see what I can do. 
 Thanks!
