# NoGS
 Chrome Extension that ensures you are connected to a VPN before going to blocked sites.

# Why?
 A friend of mine kept forgetting to connect a VPN before going to less than shady websites (I don't ask questions, I just write programs) to ensure the school network doesn't track where he is going. He asked if there was a way to block going to particular sites unless you are using a VPN, I looked around and couldn't find anything so I decided to write this Chrome Extension.

# How?
 It's fairly simple. The user simply lists out the sites they want to be blocked by clicking on the icon in the extensions menu. On every new request, the extension will check if the site the user is attempting to connect to is on the list. If so, it will check their IP and see if the provider is that of the school network and block simply redirect to a page if it is the case.

# Installation
 Download newest release and unzip the folder. Open Chrome and go to the extensions page. Click on "Load Unpacked" and locate the folder. Load it and it should be installed. To use, simply click the icon in the Chrome Extension puzzle piece icon.

# Versions
## 2.0 (In-Development)
* Better compatibility
	* Ability to insert your default IP to select what to check against.
* Icon
* Improved UI
* Documentation

## 1.1
* Intercepts request. Better privacy and reliability.
* Bug fixes
### Known Bugs
* Sometime breaks Google searches when "youtube.com" is blocked.
* May be some other big sites that will trigger a block if they are loaded in the background.

## 1.0
 * Functioning version (but only for the school). 
 * Does not intercept request, meaning request gets sent and then blocked.

# Credits
* Developer - Andy Villasmil (robinfire110)
* Base Website Block Code - https://dev.to/penge/learn-the-most-useful-chrome-apis-by-creating-block-site-chrome-extension-2de8