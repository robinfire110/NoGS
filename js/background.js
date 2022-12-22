chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.get(["blocked", "enabled", "ipData", "scope", "checkFrequency", "vpnStatus"], function (local) {
      //Set Array
      if (!Array.isArray(local.blocked)) chrome.storage.local.set({ blocked: [] });

      //Set enabled
      if (typeof local.enabled !== "boolean") chrome.storage.local.set({ enabled: false });

      //Set ipData
      if (local.ipData != undefined) chrome.storage.local.set( { ipData: undefined });

      //Set scope
      if (local.scope != undefined) chrome.storage.local.set( { scope: undefined });

      //Set Frequency
      if (local.checkFrequency == undefined) chrome.storage.local.set( { checkFrequency: 3 });

      //Set vpnStatus
      if (local.vpnStatus == undefined) chrome.storage.local.set( { vpnStatus: false });
    });
});
  
//Set VPN Check
let vpnCheckInterval;
chrome.storage.local.get(["checkFrequency"], async function (local) {
  const { checkFrequency } = local;
  checkVPN();
  vpnCheckInterval = setInterval(checkVPN, checkFrequency * 1000);
});


//Check before you navigate to the page
chrome.tabs.onUpdated.addListener(async function(id, info, data) {
  const url = info.url || data.url;
  
  if (!url || !url.startsWith("http")) {
    return;
  }
  
  const hostname = new URL(url).hostname;
  chrome.storage.local.get(["blocked", "enabled", "ipData", "scope", "checkFrequency", "vpnStatus"], async function (local) {
    const { blocked, enabled, ipData, scope, checkFrequency, vpnStatus } = local;
    
    //If it is in the list
    if (Array.isArray(blocked) && enabled && (blocked.find(domain => domain.includes(hostname)) || blocked.find(domain => hostname.includes(domain)))) {
      if (!vpnStatus)
      {
        var extensionId = chrome.runtime.id;
        chrome.tabs.update(data.id, { url: `chrome-extension://${extensionId}/html/blocked.html#${url}`})
        console.log("Blocked", data.url);
      }
    }
  });
});

let checking = false;
//Check for VPN
async function checkVPN()
{
  if (!checking) 
  {
    checking = true;
    chrome.storage.local.get(["blocked", "enabled", "ipData", "scope", "checkFrequency", "vpnStatus"], async function (local) {
      const { blocked, enabled, ipData, scope, checkFrequency, vpnStatus } = local;
      if (enabled)
      {
        var oldStatus = vpnStatus;
        var s = await checkIp(ipData, scope);
  
        //Check and set
        if (oldStatus != s && (s == true || s == false))
        {
          chrome.storage.local.set( { vpnStatus: s });

          //Create notification
          /*
          var status = "Disabled"
          if (s == true) status = "Enabled";
          chrome.notifications.create({
            type: "basic",
            iconUrl: '../icon128.png',
            title: `VPN ${status}`,
            message: `VPN Status is ${status}`,
            silent: false
          }, () => {});
          */
        }
        
        
        checking = false;
        console.log(vpnStatus);
      }
    });
  }
  
}

//Compare IP
async function checkIp(ipData, scope)
{
  console.log(ipData);
  if (ipData != undefined)
  {
    //Get IP Address
    try
    {
      //Check IP
      var res = await fetch('https://freeipapi.com/api/json');
      var data = await res.json();
      let check = await data;
      //console.log(check);

      //Check for scope
      var result;
      switch (scope)
      {
        case "0": result = check.countryCode != ipData.countryCode; break; //Country
        case "1": result = check.regionName != ipData.regionName; break; //Region
        case "2": result = check.cityName != ipData.cityName; break; //City
        case "3": result = check.zipCode != ipData.zipCode; break; //Zip
        case "4": result = check.ipAddress != ipData.ipAddress; break; //IP Address
      }
      //console.log(check, ipData);
      return await result;
    }
    catch (err)
    {
      console.log("Failed to get IP Info, most likely due to attempting with no connection. Trying again on next refresh. If issue persist, check documentation for possible solutions.", err);
    }
  }
  
}