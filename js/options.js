//Get Elements
const textarea = document.getElementById("textarea");
//const checkbox = document.getElementById("checkbox");
const ipForm = document.getElementById("ipForm");
const inputIp = document.getElementById("inputIp");
const useCurrentIp = document.getElementById("useCurrentIp");
const inputScope = document.getElementById("inputScope");
const scopeInfoButton = document.getElementById("scopeInfoButton");
const vpnCheckFrequency = document.getElementById("vpnCheckFrequency");
const vpnCheckFrequencyButton = document.getElementById("vpnCheckFrequencyButton");
const enableButton = document.getElementById("enableButton");
const disableButton = document.getElementById("disableButton");
const saveButton = document.getElementById("saveButton");
const vpnStatusIndicator = document.getElementById("vpnStatusIndicator")
let lastStatus = undefined;
let currentIp;
let frequency;
let vpnStatusInterval;
let enabledStatus;
let oldIpData;

//Use current ip button
useCurrentIp.addEventListener("click", async () => {
  try {
    let ip = await currentIp.ipAddress;
    inputIp.value = ip;
  } catch (error) {
    console.log(error);
    inputIp.placeholder = "Unable to get current IP.";
    inputIp.value = "";
  }
});

//Save
saveButton.addEventListener("click", async () => {
  //Enabled
  const enabled = enabledStatus;
  chrome.storage.local.set( {enabled} );

  //Blocked list
  const blocked = textarea.value.split("\n").map(s => s.trim()).filter(Boolean);
  chrome.storage.local.set( {blocked} );

  //Get ipInfo
  ipData = oldIpData;
  if (oldIpData == undefined || oldIpData.ipAddress != inputIp.value) ipData = await getIpData(inputIp.value);
  
  //Get Selected Scope
  const scope = inputScope.value;

  //Get frequency
  const checkFrequency = vpnCheckFrequency.value;
  chrome.storage.local.set( {checkFrequency} );

  //Set
  chrome.storage.local.set( {ipData} );
  chrome.storage.local.set( {scope} );
  setStatusIndicator();

  //Reload with new settings
  window.close();
});

//Scope information button
scopeInfoButton.addEventListener("click", () => {
  window.open('https://github.com/robinfire110/NoGS#scope', '_blank');
});

//VPN Check Frequency
vpnCheckFrequency.addEventListener("change", () => {
  if (vpnCheckFrequency.value < 1) vpnCheckFrequency.value = 1;
  else if (vpnCheckFrequency.value > 600) vpnCheckFrequency.value = 600;
});

vpnCheckFrequencyButton.addEventListener("click", () => {
  window.open('https://github.com/robinfire110/NoGS#vpn-check-frequency', '_blank');
});

//Set Enabled
enableButton.addEventListener("click", (event) => {
  enabledStatus = true;
  setStatusIndicator();
});

disableButton.addEventListener("click", (event) => {
  enabledStatus= false;
  
  //Set VPN Status
  this.lastStatus = undefined;
  setStatusIndicator();
});

//Refill With Data when load
window.addEventListener("DOMContentLoaded", async () => {
  chrome.storage.local.get(["blocked", "enabled", "ipData", "scope", "checkFrequency", "vpnStatus"], async function (local) {
    const { blocked, enabled, ipData, scope, checkFrequency, vpnStatus } = local;

    //Add to textarea
    if (Array.isArray(blocked)) {
      textarea.value = blocked.join("\n");
    }

    //Check enabled
    enabledStatus = enabled;
    enableButton.checked = enabled;
    disableButton.checked = !enabled;

    //Set Scope
    if (scope != undefined) inputScope.value = scope;

    //Set VPN Check Frequency
    vpnCheckFrequency.value = checkFrequency;

    //VPN Status
    setStatusIndicator();
    vpnStatusInterval = setInterval(() => this.setStatusIndicator(), checkFrequency * 500); //Half speed just to make sure we stay on top of it

    //Set IP
    oldIpData = ipData;
    if (ipData == undefined)
    {
      currentIp = await getIpData();
      if (currentIp != undefined) inputIp.value = currentIp.ipAddress; //If there is nothing saved, get and use current ip
    } 
    else
    { 
      inputIp.value = ipData.ipAddress; //Fill the one from the data
      currentIp = await getIpData();
    } 
  });
});

//Set Status Indicator
function setStatusIndicator()
{
  chrome.storage.local.get(["enabled", "vpnStatus"], async function (local){
    const { enabled, vpnStatus } = local;
    if (enabled)
    {
      if (this.lastStatus != vpnStatus || this.lastStatus == undefined)
      {
        if (vpnStatus)
        {
          vpnStatusIndicator.innerHTML = `<span class="badge rounded-pill text-bg-success" title="VPN Status: On">VPN Status <i class="fa-solid fa-plug-circle-check"></i></span>`;
          chrome.action.setIcon({ path: "/img/icon_connected.png" });
        } 
        else
        {
          vpnStatusIndicator.innerHTML = `<span class="badge rounded-pill text-bg-danger" title="VPN Status: Off">VPN Status <i class="fa-solid fa-plug-circle-xmark"></i></span>`;
          chrome.action.setIcon({ path: "/img/icon_disconnected.png" });
        } 
        this.lastStatus = vpnStatus;
      }
    }
    else
    {
      vpnStatusIndicator.innerHTML = `<span class="badge rounded-pill text-bg-secondary" title="VPN Status: Disabled">VPN Status <i class="fa-solid fa-plug-circle-minus"></i></span>`;
      chrome.action.setIcon({ path: "/img/icon_disabled.png" });
    } 
  });
}

//Get Current Ip
async function getIpData(ip = "")
{
  //Get Current IP (to use in various places)
  try {
    var res = await fetch(`https://freeipapi.com/api/json/${ip}`);
    var data = await res.json();
    return data;
  } catch (error) {
    print(error);
    return undefined;
  }
  
}