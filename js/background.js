chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.get(["blocked", "enabled", "ipData", "scope"], function (local) {
      //Set Array
      if (!Array.isArray(local.blocked)) chrome.storage.local.set({ blocked: [] });

      //Set enabled
      if (typeof local.enabled !== "boolean") chrome.storage.local.set({ enabled: false });

      //Set ipData
      if (local.ipData != undefined) chrome.storage.local.set( { ipData: undefined });

      //Set scope
      if (local.scope != undefined) chrome.storage.local.set( { scope: undefined });

    });
});
  
//Check before you navigate to the page
chrome.tabs.onUpdated.addListener(async function(id, info, data) {
  const url = data.url;
  
  if (!url || !url.startsWith("http")) {
    return;
  }
  
  const hostname = new URL(url).hostname;
  chrome.storage.local.get(["blocked", "enabled", "ipData", "scope"], async function (local) {
    const { blocked, enabled, ipData, scope } = local;
    
    //If it is in the list
    if (Array.isArray(blocked) && enabled && (blocked.find(domain => domain.includes(hostname)) || blocked.find(domain => hostname.includes(domain)))) {
      if (await checkIp(ipData, scope))
      {
        chrome.tabs.update(data.id, { url: `chrome-extension://gglceijpcfilfeeobcdogbcfgafpmeoo/html/blocked.html#${url}`})
        console.log("Blocked", data.url);
      }
    }
  });
});

async function checkIp(ipData, scope)
{
  //Get IP Address
  var res = await fetch('https://api.ipify.org?format=json');
  var data = await res.json();
  let ip = await data.ip;

  //Get organization
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
  