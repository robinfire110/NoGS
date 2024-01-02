chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.get(["blocked", "enabled", "ipData", "scope", "checkFrequency", "vpnStatus", "animeImageMode"], function (local) {
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
      setIcon(local.enabled, local.vpnStatus);

      //Set Anime Image Mode
      if (local.animeImageMode == undefined) chrome.storage.local.set( {animeImageMode: false} );
    });

    //Start VPN Check
    checkVPN();
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

//Check for VPN
enabled_status = false;
async function checkVPN()
{
  chrome.storage.local.get(["blocked", "enabled", "ipData", "scope", "checkFrequency", "vpnStatus"], async function (local) {
    const { blocked, enabled, ipData, scope, checkFrequency, vpnStatus } = local;
    enabled_status = enabled;
    if (enabled)
    {
      var oldStatus = vpnStatus;
      var s = await checkIp(ipData, scope);

      //Check and set
      if (s != undefined && oldStatus != s && (s == true || s == false))
      {
        chrome.storage.local.set( { vpnStatus: s });

        //Update Icon
        setIcon(enabled, s);
      }
      console.log("VPN Enabled?:", vpnStatus);
    }

    //Run again after set time
    setTimeout(checkVPN, checkFrequency * 1000);
  });
}

//Compare IP
async function checkIp(ipData, scope)
{
  //console.log(ipData);
  if (ipData != undefined)
  {
    //Get IP Address
    try
    {
      //Check IP
      var res = await fetch('https://freeipapi.com/api/json');
      var data = await res.json();
      let check = await data;

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
      console.log(err);
      console.log("Failed to get IP Info, most likely due to attempting with no connection or API issue. Trying again on next refresh. If issue persist, check documentation for possible solutions.", err);
      return undefined;
    }
  }
}

function setIcon(enabled, vpnStatus)
{
  if (!enabled) chrome.action.setIcon({ path: "/img/icon_disabled.png" });
  else
  {
    if (vpnStatus) chrome.action.setIcon({ path: "/img/icon_connected.png" });
    else chrome.action.setIcon({ path: "/img/icon_disconnected.png" });
  }
}