# NoGS
 Chrome Extension that ensures you are connected to a VPN before going to blocked sites.

# Why?
 A friend of mine kept forgetting to connect a VPN before going to certain websites (I don't ask questions, I just write programs) to ensure the school network doesn't track where he is going. He asked if there was a way to block going to particular sites unless you are using a VPN, I looked around and couldn't find anything so I decided to write this Chrome Extension.

# How?
 It's fairly simple. The user lists out the sites they want to be blocked by clicking on the icon in the extensions menu. On every new request, the extension will check if the site the user is attempting to connect to is on the list. If so, it will check their IP and see if the data from that IP is what it expects. If not, it will simply redirect to another page to remind the user to turn on a VPN.
 
 All data is stored locally and you can adjust the parameters of how IP addresses are checked to best fit your needs.

# Installation
 Download newest release and unzip the folder. Open Chrome and go to the extensions page. Click on "Load Unpacked" and locate the folder. Load it and it should be installed. To use, simply click the icon in the Chrome Extension puzzle piece icon an select "NoGS".
 
# Documentation
 When you click the "NoGS" icon in the extensions menu, the options menu will appear. Within it, you can adjust how the extension functions.
 
## Blocked Sites
 The main text area is where you add the sites you want to be blocked when you are not connected to a VPN. You can simply write out the webiste URL and seperate each website with a new line. For the best results, write the site in it's simplest form (i.e. no need for `www.` or `http:\\`). An example of the format is below...
 >amazon.com\
 >twitter.com\
 >facebook.com
 
 **Note:** The program will block the entire site regardless of what URL is inserted. So, inputting `https://www.youtube.com/watch?v=dQw4w9WgXcQ` will block the entirety of YouTube.
 
 Additionally, the extension **will not** block a site with embedded links to blocked sites. For example, if you have blocked `youtube.com` and you go to a site with embeded YouTube videos, that site will not be blocked and you will be able to view those embedded videos. However, if you try to go to YouTube itself, it will still be blocked. *I've decided having it this way because it would mean that part of the site would have to load in the first place and this is a pretty rare situation. However in theory, this is an option I could add fairly easily so if you want it, feel free to let me know and I can add the option.*
 
## Scoping Options
 Since the extension uses data obtained from your IP address, you can choose how percise you want the blocking to be. This is useful because depending on your internet setup (home network, laptop, school or work network etc.), you may want to adjust the parameters to get better results.

### IP Address
 The extension must have a default IP address that will be used to compare against. This could either be your IP address or the IP address when you are connected to the VPN. I would personally recommend inputting your "home" IP address, or what the standard would be without being connected to a VPN, but feel free to input whatever you'd like if you have a certain use case in mind. Remember, the extension simply checks for differences between your connected and default IPs.
 
 By default, it will use the IP address you are connected to when you first open the extension. You can press the "Use Current IP" button to insert the current IP address. Alternatively, you can input an IP address manually. 
 
### Scope
 The "Scope" option refers to which parameter you want the extension to check against. You have 6 options and they are ordered from least percise to most percise. You can set whichever one best suits your needs and your network setup. The option you choose may change depending on if you are travling on a laptop, or are staying in the same place with a static IP. If you aren't percise enough, you may get blocked even when connected to a VPN. If you are too percise, you may not get blocked when you are not connected to a VPN. It highly depends on your network and VPN setup, experiment to see what works best for you. Here is some information about each options.
 
 | Scope  | Info |
 | ------------- |:-------------:|
 | Country      |Checks if IP matches country. Useful if your VPN changes your location to a different country.|
 | Region      |**Recommended and default value**. Checks if IP matches region. This would could be States, Provinces, Territories etc. depending on the location. Offers good balance between detecting VPNs and unblocking sites accidentally.|
 | City      |Checks if IP matches City. Fairly percise, and won't trigger portable setups until you leave the City.|
 | Zip      |Checks if IP matches Zip Code. Very percise location.|
 | Organization      |Checks if IP matches Organization. Recommended for shared networks such as school or work, but can be effective in other contexts too.|
 | IP Address      |Checks if IP addresses are the same. Not recommended for most users due to dynamic IP addressing for many network setups. However, can be very effective for advanced users with a static IP address.|
 
 If you would like to check exactly what data the extension is getting, you can do so by going to the API's website and inputting your IP. The fields the program checks for are (in order) `countryCode, region, city, zip, asname, query`. The link is below.
 
 https://ip-api.com

## Enabling
 If you want to enable/disable the extension for whatever reason, simply check or uncheck the "Enabled" checkbox. The extension will stay in that state until you switch it back.

## Save your changes!
 Be sure to click "Save" whenever you are done to submit your changes, otherwise your changes will be lost. This includes enabling/disabling!


# Versions
## 1.2 (In-Development)
* Icon
* Improved UI (with Bootstrap 5)


## 1.1
* Better compatibility
	* Ability to insert your default IP to select what to check against
* Intercepts request. Better privacy and reliability
* Bug fixes
* Improved Documentation (in the README)

## 1.0
* Functioning version (but only for the school)
* Does not intercept request, meaning request gets sent and then blocked

# Credits
* Developer - Andy Villasmil (robinfire110)
* APIs - https://api.ipify.org, https://ip-api.com
* Made with - HTML, CSS, JavaScript, Bootstrap
* Base Website Block Code - https://dev.to/penge/learn-the-most-useful-chrome-apis-by-creating-block-site-chrome-extension-2de8

# Thanks!
 I hope this extension fits the niche for anyone who needs it. This is my first chrome extension and served as a fun project to learn the ropes of it while helping a friend. After the 1.2 version, I'm going to consider this extension finished unless some massive bug or such is discovered. If you find any such bug, or want to request a feature be added, feel free to let me know and I'll see what I can do. 
 Thanks!
