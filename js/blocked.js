//Get Elements
const blockedImage = document.getElementById("blockedImage");
const blockedSite = document.getElementById("blockedSite");
let animeImageMode = false;

//Update Site
var site = window.location.hash;
site = site.slice(1);
blockedSite.innerHTML = `<a href="${site}" target="_self">${site}</a>`;

//Make it function on refresh
//https://stackoverflow.com/questions/8622892/how-to-redirect-a-page-to-another-page-when-refresh-at-second-attempt
window.onbeforeunload = function() {
    window.setTimeout(function () { 
        window.location = site;
    }, 0); 
    window.onbeforeunload = null; 
}

//Anime Image Mode (if you want some anime images instead of the basic stop sign, just for fun. The friend who I made this for likes anime and will find it funny)
let animeImageArray = [
"https://media.tenor.com/SalsBMgPuj4AAAAC/k-on-mio-akiyama.gif",
"https://media2.giphy.com/media/11q1yAnZSEjNOU/giphy.gif",
"https://media.tenor.com/ODwpBtxiXYMAAAAC/yui-hirasawa-hirasawa-yui.gif",
"https://media.tenor.com/htjbZhCEDEoAAAAC/yui-cry.gif",
"https://media.tenor.com/YTXqLhDoeWoAAAAC/tsumugi-kotobuki-kon.gif",
"https://media.tenor.com/07VyrQ27IAoAAAAC/no-yui.gif",
"https://i.ppy.sh/8d1f0489c98c0b9c329013e9af90e637ed4bf11c/68747470733a2f2f692e696d6775722e636f6d2f43315738494f6b2e676966",
"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8d8aa80d-a00f-4ca5-817d-30fbc6bf33be/da1dwdu-30dcc054-a0bb-4bfc-a68c-213538009629.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzhkOGFhODBkLWEwMGYtNGNhNS04MTdkLTMwZmJjNmJmMzNiZVwvZGExZHdkdS0zMGRjYzA1NC1hMGJiLTRiZmMtYTY4Yy0yMTM1MzgwMDk2MjkuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.vINPgpkEfKTm6QTIJU77QKMLBRVDYmU6VmIRmoy08GQ",
"https://thumbs.gfycat.com/WideBlushingBorer-size_restricted.gif",
"https://i.kym-cdn.com/photos/images/original/000/674/283/52a.gif",
"https://i.kym-cdn.com/photos/images/original/000/644/231/a2c.gif",
"https://giffiles.alphacoders.com/121/12105.gif",
"https://thumbs.gfycat.com/FriendlyPeriodicGoldenmantledgroundsquirrel-size_restricted.gif",
"https://media.tenor.com/UAUxINWYDnIAAAAM/kon.gif",
"http://i.imgur.com/zLFjmJg.gif",
"http://media.tumblr.com/tumblr_ltviihMvkJ1r058cd.gif",
"https://media.tenor.com/VcVzhtbXHfIAAAAC/mugi-fish.gif"
]

if (animeImageMode) blockedImage.src = animeImageArray[Math.floor(Math.random() * animeImageArray.length)];
else blockedImage.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Stopsign.svg/1200px-Stopsign.svg.png";

