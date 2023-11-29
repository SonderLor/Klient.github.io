document.addEventListener("DOMContentLoaded", function() {
    if (window.innerWidth <= 800) {
        let path = window.location.pathname;
        let links = document.querySelectorAll(".navigation-mobile-list-link");
        links.forEach(function(link) {
            if (link.getAttribute("href") === path) {
                let imgUrl = window.getComputedStyle(link.querySelector("#navigation-mobile-list-img")).getPropertyValue("background-image");
                link.querySelector("#navigation-mobile-list-img").style.backgroundImage = imgUrl.slice(0, imgUrl.indexOf(".svg")) + "Hover" + imgUrl.slice(imgUrl.indexOf(".svg"));;
                link.querySelector(".navigation-mobile-list-item").style.color = "#8c2cc4";
            }
        });
    }
    else {
        let path = window.location.pathname;
        let links = document.querySelectorAll("#navigation-list-link");
        links.forEach(function(link) {
            if (link.getAttribute("href") === path) {
                if (path == "/pages/registration.html") {
                    link.querySelector(".navigation-list-account").style.backgroundImage = "url(\"/styles/images/accountHover.svg\")";
                }
                if (path == "/pages/bin.html") {
                    link.querySelector(".navigation-list-bin").style.backgroundImage = "url(\"/styles/images/shoppingCartHover.svg\")";
                }
                link.style.color = "#fff";
            }
        });
    }
  });