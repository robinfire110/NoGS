//Get Elements
const textarea = document.getElementById("textarea");
const save = document.getElementById("save");
const checkbox = document.getElementById("checkbox");

//Set block list
save.addEventListener("click", () => {
  //Blocked list
  const blocked = textarea.value.split("\n").map(s => s.trim()).filter(Boolean);
  chrome.storage.local.set({ blocked });

  //Have the user input the remote ip (advise ip chicken or such)
  //Have user have the ability to select which attribute should be checked (IP Address, Country, Region, City, Zip, Organization)
  //Write a page that you can go to that explains what each of these do and why you should use one over the other.
});

//Set Enabled
checkbox.addEventListener("change", (event) => {
  const enabled = event.target.checked;
  chrome.storage.local.set({ enabled });
});

//Refill With Data when load
window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    const { blocked, enabled } = local;
    if (Array.isArray(blocked)) {
      textarea.value = blocked.join("\n");
      checkbox.checked = enabled;
    }
  });
});