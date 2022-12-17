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
        chrome.tabs.update(data.id, { url: `chrome-extension://gglceijpcfilfeeobcdogbcfgafpmeoo/html/blocked.html#${url}`})
        console.log("Blocked", data.url);
      }
    }
  });
});

//Check for VPN
async function checkVPN()
{
  chrome.storage.local.get(["blocked", "enabled", "ipData", "scope", "checkFrequency", "vpnStatus"], async function (local) {
    const { blocked, enabled, ipData, scope, checkFrequency, vpnStatus } = local;
    if (enabled)
    {
      var s = await checkIp(ipData, scope);
      chrome.storage.local.set( { vpnStatus: s });
      console.log(vpnStatus);
    }
  });
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
      var res = await fetch('https://api.ipify.org?format=json');
      var data = await res.json();
      let ip = await data.ip;

      //Get data
      var res = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,countryCode,region,city,zip,org,as,asname,query`);
      var data = await res.json();
      let check = await data;

      //Check for scope
      var result;
      switch (scope)
      {
        case "0": result = check.countryCode != ipData.countryCode; break; //Country
        case "1": result = check.region != ipData.region; break; //Region
        case "2": result = check.city != ipData.city; break; //City
        case "3": result = check.zip != ipData.zip; break; //Zip
        case "4": result = check.asname != ipData.asname; break; //Organization
        case "5": result = check.query != ipData.query; break; //IP Address
      }
      //console.log(check, ipData);
      return await result;
    }
    catch (err)
    {
      console.log("Failed to get IP Info, most likely due to attempting with no connection. Trying again on next refresh.", err);
    }
  }
  
}