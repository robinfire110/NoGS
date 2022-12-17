//Get Elements
const textarea = document.getElementById("textarea");
const checkbox = document.getElementById("checkbox");
const ipForm = document.getElementById("ipForm");
const inputIp = document.getElementById("inputIp");
const useCurrentIp = document.getElementById("useCurrentIp");
const inputScope = document.getElementById("inputScope");
const scopeInfoButton = document.getElementById("scopeInfoButton");
const saveButton = document.getElementById("saveButton");
const saveSuccess = document.getElementById("saveSuccess");
let currentIp;

//Use current ip button
useCurrentIp.addEventListener("click", async () => {
  inputIp.value = await currentIp;
});

//Set block list
saveButton.addEventListener("click", async () => {
  //Blocked list
  const blocked = textarea.value.split("\n").map(s => s.trim()).filter(Boolean);
  chrome.storage.local.set({ blocked });

  //Get ipInfo
  var res = await fetch(`http://ip-api.com/json/${inputIp.value}?fields=status,message,countryCode,region,city,zip,org,as,asname,query`);
  var data = await res.json();
  const ipData = await data;
  console.log("ipData: ", ipData);

  //Get Selected Scope
  const scope = inputScope.value;

  //Set
  chrome.storage.local.set( {ipData} );
  chrome.storage.local.set( {scope} );

  //Visuals
  saveSuccess.style.opacity = 1;
  setTimeout(() => {
    var fadeInterval = setInterval(() => {
      saveSuccess.style.opacity -= .01;
      if (saveSuccess.style.opacity <= 0)
      {
        saveSuccess.style.opacity = 0;
        clearInterval(fadeInterval);
        
      }
      console.log("ran")
    }, 10)
  }, 1500)
});

//Scope information button
scopeInfoButton.addEventListener("click", () => {
  window.open('https://github.com/robinfire110/NoGS#scope', '_blank');
});


//Set Enabled
checkbox.addEventListener("change", (event) => {
  const enabled = event.target.checked;
  chrome.storage.local.set({ enabled });
});

//Refill With Data when load
window.addEventListener("DOMContentLoaded", async () => {
  chrome.storage.local.get(["blocked", "enabled", "ipData", "scope"], async function (local) {
    const { blocked, enabled, ipData, scope} = local;

    //Add to textarea
    if (Array.isArray(blocked)) {
      textarea.value = blocked.join("\n");
    }

    //Check enabled
    checkbox.checked = enabled;

    //Set Scope
    if (scope != undefined) inputScope.value = scope;

    //Get Current Ip
    currentIp = await getCurrentIp();

    //Set IP
    if (ipData == undefined) inputIp.value = currentIp; //If there is nothing saved, get and use current ip
    else inputIp.value = ipData.query; //Fill the one from the data
  });
});

//Get Current Ip
async function getCurrentIp()
{
  //Get Current IP (to use in various places)
  var res = await fetch('https://api.ipify.org?format=json');
  var data = await res.json();
  return data.ip;
}