//Get Elements
const blockedImage = document.getElementById("blockedImage");
const blockedSite = document.getElementById("blockedSite");
let aimg;

//Update Site
var site = window.location.hash;
site = site.slice(1);
blockedSite.innerHTML = `<a href="${site}" target="_self">${site}</a>`;

//Redirect if connected to VPN
setInterval(() => {
    chrome.storage.local.get(["enabled", "vpnStatus"], async function (local) {
        const { enabled, vpnStatus } = local;
        if (!enabled || vpnStatus) window.location = site;
    });
}, 500);

//Anime Image Mode (if you want some anime images instead of the basic stop sign, just for fun. The friend who I made this for likes anime and will find it funny)
let animeImageArray = [
"https://media.tenor.com/SalsBMgPuj4AAAAC/k-on-mio-akiyama.gif",
"https://media2.giphy.com/media/11q1yAnZSEjNOU/giphy.gif",
"https://media.tenor.com/ODwpBtxiXYMAAAAC/yui-hirasawa-hirasawa-yui.gif",
"https://media.tenor.com/htjbZhCEDEoAAAAC/yui-cry.gif",
"https://media.tenor.com/YTXqLhDoeWoAAAAC/tsumugi-kotobuki-kon.gif",
"https://media.tenor.com/07VyrQ27IAoAAAAC/no-yui.gif",
"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8d8aa80d-a00f-4ca5-817d-30fbc6bf33be/da1dwdu-30dcc054-a0bb-4bfc-a68c-213538009629.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzhkOGFhODBkLWEwMGYtNGNhNS04MTdkLTMwZmJjNmJmMzNiZVwvZGExZHdkdS0zMGRjYzA1NC1hMGJiLTRiZmMtYTY4Yy0yMTM1MzgwMDk2MjkuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.vINPgpkEfKTm6QTIJU77QKMLBRVDYmU6VmIRmoy08GQ",
"https://i.kym-cdn.com/photos/images/original/000/674/283/52a.gif",
"https://i.kym-cdn.com/photos/images/original/000/644/231/a2c.gif",
"https://giffiles.alphacoders.com/121/12105.gif",
"https://media.tenor.com/UAUxINWYDnIAAAAM/kon.gif",
"http://media.tumblr.com/tumblr_ltviihMvkJ1r058cd.gif",
"https://media.tenor.com/VcVzhtbXHfIAAAAC/mugi-fish.gif",
"https://media.tenor.com/jeKSoRM_xSAAAAAM/k-on.gif",
"https://giffiles.alphacoders.com/352/35268.gif",
"https://i.kym-cdn.com/photos/images/original/000/558/059/472.gif",
"https://media.tenor.com/o_xVRHrtKeIAAAAC/ritsu-ritsu-tainaka.gif",
"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8d8aa80d-a00f-4ca5-817d-30fbc6bf33be/da1h6ay-22600e22-4f5e-46b2-bcb6-c9b727111af2.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzhkOGFhODBkLWEwMGYtNGNhNS04MTdkLTMwZmJjNmJmMzNiZVwvZGExaDZheS0yMjYwMGUyMi00ZjVlLTQ2YjItYmNiNi1jOWI3MjcxMTFhZjIuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.kN4Lv19nIckt1Lyt8saCfnRuzZXDZLk7vWDrvsh9g6k",
"https://i0.wp.com/operationrainfall.com/wp-content/uploads/2018/07/giphy-1.gif",
"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8d8aa80d-a00f-4ca5-817d-30fbc6bf33be/da1elnc-2c4bdeb2-c7ae-429e-82f7-64e11b74d41d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzhkOGFhODBkLWEwMGYtNGNhNS04MTdkLTMwZmJjNmJmMzNiZVwvZGExZWxuYy0yYzRiZGViMi1jN2FlLTQyOWUtODJmNy02NGUxMWI3NGQ0MWQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.QaRocnRJ-0ccJGuwVcBJmR0rXUvkQPL7rnzCcyxUXvU",
"https://64.media.tumblr.com/36f2ca51f07eda6dbfbcf8168459b2cc/tumblr_nic3enZwLF1sq72neo1_500.gifv"
];

chrome.storage.local.get(["animeImageMode"], async function (local) {
    const {animeImageMode} = local;
    aimg = animeImageMode;
    console.log(animeImageMode);
    if (animeImageMode) blockedImage.src = animeImageArray[Math.floor(Math.random() * animeImageArray.length)];
    else blockedImage.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Stopsign.svg/1200px-Stopsign.svg.png";
});

//Check for clicks to switch to and from anime mode
counter = 5;
blockedImage.addEventListener("click", (event) => {
    counter--;
    if (counter <= 0)
    {
        chrome.storage.local.set( {animeImageMode: !aimg} );
        if (!aimg) alert("Anime Image Mode Enabled");
        else alert("Anime Image Mode Disabled");
        location.reload();
    }
  });
