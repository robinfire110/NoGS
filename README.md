# NoGS VPN Checker
 A Chrome Extension that ensures you are connected to a VPN before going to blocked sites. Can be used in situations when you don't want to go to sites without traffic going through a VPN. Example include using turning on a VPN before accessing a banking app or using a VPN before accessing a streaming site such as Netflix away from home.
 
 Chrome Web Store - https://chromewebstore.google.com/detail/nogs-vpn-checker/ifncliboocknoeldbbmpofmjaahaechg

# Why?
 A friend of mine kept forgetting to connect a VPN before going to less than shady websites (I don't ask questions, I just write programs). He asked if there was a way to block going to particular sites unless you are using a VPN, I looked around and couldn't find anything so I decided to write this Chrome Extension.

# How?
 It's fairly simple. First, the user gives a default IP address to check against. The extension will  periodically check to see if the user's IP address data is different than the default. If so, it assumes the user is connected to a VPN and does not block sites. 

Then, the user lists out the sites they want to be blocked by clicking on the icon in the extensions menu. On every new request, the extension will check if the site the user is attempting to connect to is on the list. If so, it will check if it's connected to a VPN and block it depending on the VPN status. All data is stored locally and you can adjust the parameters of how IP addresses are checked to best fit your needs.

Originally, earlier versions checked for the VPN when you went to the sites. However, it would frequently take too long to block the page. The goal was to avoid ever connecting in the first place, so this wasn't acceptable. The current implementation has it's flaws (constantly pinging the API isn't ideal), but I think it works fairly well. Though, I may reconsider if it becomes a problem.

# Installation

## Chrome Web Store
For most users, the best way to install is through the Chrome Web Store. 
1. Go to the [store page](https://chromewebstore.google.com/detail/nogs-vpn-checker/ifncliboocknoeldbbmpofmjaahaechg) and click "Add to Chrome" to download the extension.
2. Ensure you are not connected to a VPN for the initial setup and open the extension by clicking in the icon in the extension menu.
3. Your "home" IP address will be automatically set to your current IP, but feel free to input whatever IP you want if you have a particular use in mind. Additionally, you can set it to your current IP by click "Use Current IP".
4. Add sites to be blocked in the list.
5. Set your scope and check frequency settings as desired or just leave them as default. More information about those settings can be found in the documentation below.
6. Click "Enable" to enable the extension. You can disable at anytime by switching it to "Disabled"
7. Click save to save your changes and you're good to go!

## Local Install
If you would like to install the unpacked version for use or development, follow these steps.
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
 
 The extension will only block new searches. So, if you have a tab open with a blocked site and you disconnect from your VPN, the site will remain open until you refresh. On the flip side however, if you have a blocked site open and you activate a VPN, it will automatically redirect you to the site. 
 
 Additionally, the extension **will not** block a site with embedded links to blocked sites. For example, if you have blocked `youtube.com` and you go to a site with embeded YouTube videos, that site will not be blocked and you will be able to view those embedded videos. However, if you try to go to YouTube itself, it will still be blocked. In other words, the sites will only be blocked when you go to them directly.
 
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

 If you would like to check exactly what data the extension is getting, you can do so by going to the API's website. The fields the program checks for are (in order) `countryCode, regionName, cityName, zipCode, ipAddress`. The link is below.
 
 https://freeipapi.com
 
### VPN Check Frequency
 The extension makes use of periodically checking your IP to see if you are connected to a VPN. This ensures when the time comes to check a blocked site, it will already know your connection status, making far more reliable and responsive (older versions checked for the VPN on the request and it sometimes took awhile for it to catch up).
 
 The number in this box indicates how frequently you want to check  you current IP for a VPN. The default is every 3 seconds. While this works for most setups in my testing, you may adjust it to fit your needs. For example, if you have a particularly slow connection, you can lower the frequency by inputting a higher number, though I would not recommend any higher than 30 seconds. The API is limited to 60 requests per minute, so the lowest possible value is 1 second while the maximum has been limited to 600 seconds (10 minutes). Just to be safe, I would go lower than 2 seconds just to make sure you don't end up reaching the API limit.
 
 **Note:** The number you input is not exact. There will always be reponse time for the API to take into account. I would estimate it could take up to double the amount of time you input for the status to update depending on when the update happens and the API latency.
 
### VPN Status Indicator
 On the bottom right corner of the popup menu, you will see the VPN Status Indicator. VPN status according to the extension. The indicator's color determines the status along with the icon next to it. The color of the icon in the extensions menu will also dynamically change based on VPN status.
 
 | Color |Icon| Info |
 | ------------- |-|:-------------:|
 | Red |Plug with X|No VPN being used. Listed sites will be blocked.|
 | Green |Plug with &#10003;|VPN is being used. Listed sites will not be blocked.|
 | Grey |Plug with &#8722;|Disabled|
 
 Additionally, you can hover over the indicator to see the status.
 
 **Note:** When you connect/disconnect from a VPN, you have to wait for the next check for the extension to update the status. It is not instant and is dependant on your internet and VPN Check Frequency. Please keep this in mind when using the extension.

## Enabling
 If you want to enable/disable the extension for whatever reason, simply click "Enabled" or "Disabled" at the bottom of the popup menu. The extension will stop checking for your IP address and it will not block any sites. The extension will stay in that state until you switch it back. Remember to save to make it go into effect!

## Save your changes!
 Be sure to click "Save" whenever you are done to submit your changes, otherwise your changes will be lost. This includes enabling/disabling!
 
 Once you save, the popup will automatically close, the extension will reload and your changes will go into effect.

## VPN & Ad Blockers
 Some VPNs come with features to block certain sites labeled as malware, trackers or ads (i.e. Surfshark's ClearWeb, NordVPN's Threat Protection etc). Depending on your VPN, enabling these features may result in this extension not functioning properly. This is because the VPN may block the APIs used to make this extension function. If you are having issues and you have a VPN with these capabilities, try turning off these features to see if this resolves your issue. Additionally, if you have the ability to whitelist sites, whitelisting the API site (freeipapi.com) may also resolve the issue.
 
 Depending on the VPN, you may be unable to use this extension and your VPN blockers enabled at the same time. I apologize if this is the case.
 
 Similarly, some ad blockers may block the required API, so please add it to the whitelist if you are having issues.

***
 
 # Privacy Policy

## Data

The only piece of personal data the extension collects is the given "home" and your connected IP address. This is needed to compare the addresses and see if you are using a VPN. The addresses are only stored locally and do not leave your computer. By extension, I have no access to it and it is not sold to any third parties. 

## Chrome API

This extention takes advantage of the Chrome Storage API and Tabs API. Storage is needed to store the data set within the extension (IP, Region, VPN Check Frequency etc.). Tabs is needed to access site URLS in order to block any listed sites.

## Third-Party APIs

This extension uses one third-party API (https://freeipapi.com). Your "home" and connected IP addresses are sent to the API to obtain data associated with those addresses. This is done to determine whether or not a VPN is being used and part of the information return by the API may be stored to avoid constantly fetching redudant data. According to their [Privacy Policy](https://freeipapi.com/privacy), the API does not store any personal data and only stores request logs for monitoring, performance and debugging purposes. Please read their policy for more information.

## Changes to the Privacy Policy

This policy may be updated in the future as the extension develops, so please check back periodically.

## Feedback

If you have questions about this privacy policy, feel free to [file an issue](https://github.com/robinfire110/NoGS/issues) to this repository.

***

# Versions
## 1.3.2
* Fixed issue where icon would not correctly update
* Chrome Web Store!
* Update README to include Chrome Web Store Link

## 1.3.1
* Fixed issue where blocked page would close if you closed the settings menu.
* Added icons to VPN Status Indicator.
* New Icon.
* Added Dynamic Extension Icon.
* Fixed issue where extension would not enable after being disabled.
* Added Privacy Policy

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
 I hope this extension fits the niche for anyone who needs it. After the 1.3.1 version, I'm going to consider this extension finished unless some massive bug or such is discovered. If you find any such bug, or want to request a feature be added, feel free to let me know and I'll see what I can do. 
 
 Thanks!
