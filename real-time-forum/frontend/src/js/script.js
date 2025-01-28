const settingsmenu = document.querySelector(".settings-menu")
const darkBtn = document.getElementById("dark-theme")


function settingsMenuToggle(){
    settingsmenu.classList.toggle("settings-menu-height");
}

darkBtn.onclick = function(){
    darkBtn.classList.toggle("dark-on");
    document.body.classList.toggle("dark");

    if(localStorage.getItem("theme") == "light"){
        localStorage.setItem("theme", "dark");
    }
    else {
        localStorage.setItem("theme", "light");
    }
}


if (localStorage.getItem("theme") == "light"){
    darkBtn.classList.remove("dark-on")
    document.body.classList.remove("dark");
}
else if (localStorage.getItem("theme") == "dark"){
    darkBtn.classList.add("dark-on")
    document.body.classList.add("dark");
}
else{
    localStorage.setItem("theme", "light");
}
