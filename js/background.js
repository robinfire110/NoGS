chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.get(["blocked", "enabled"], function (local) {
      if (!Array.isArray(local.blocked)) {
        chrome.storage.local.set({ blocked: [] });
      }
  
      if (typeof local.enabled !== "boolean") {
        chrome.storage.local.set({ enabled: false });
      }
    });
});
  
//Check before you navigate to the page
chrome.webNavigation['onBeforeNavigate'].addListener(function(data) {
  const url = data.url;
  if (!url || !url.startsWith("http")) {
    return;
  }
  
  const hostname = new URL(url).hostname;

  chrome.storage.local.get(["blocked", "enabled"], async function (local) {
    const { blocked, enabled } = local;
    
    //If it is in the list
    if (Array.isArray(blocked) && enabled && (blocked.find(domain => domain.includes(hostname)) || blocked.find(domain => hostname.includes(domain)))) {
      if (await checkIp())
      {
        chrome.tabs.update(data.tabId, { url: 'chrome-extension://gglceijpcfilfeeobcdogbcfgafpmeoo/blocked.html'})
        console.log("Blocked", data.url);
      }
    }
  });
});

async function checkIp()
{
  //Get IP Address
  var res = await fetch('https://api.ipify.org?format=json');
  var data = await res.json();
  let ip = data.ip;

  //Get organization
  var res = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,city,isp,org,as,asname,query`);
  var data = await res.json();
  let check = data.asname;

  //Check
  //console.log(check);
  return check == "UNC-GREENSBORO";
}
  