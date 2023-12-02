document.addEventListener("DOMContentLoaded", function() {
    function makeHoverImage(img) {
        if (img) {
            let imgStyle = window.getComputedStyle(img);
            let imgUrl = imgStyle.getPropertyValue("background-image");
            let newImgUrl = imgUrl.slice(0, imgUrl.indexOf(".svg")) + "Hover" + imgUrl.slice(imgUrl.indexOf(".svg"));
            img.style.backgroundImage = newImgUrl;
        }
    }


    let path = window.location.pathname;
    if (window.innerWidth <= 800) {
        let links = document.querySelectorAll(".navigation-mobile-list-link");
        links.forEach(function(link) {
            if (link.getAttribute("href") === path) {
                let img = link.querySelector("#navigation-mobile-list-img");
                makeHoverImage(img);
                let mobileListItem = link.querySelector(".navigation-mobile-list-item");
                mobileListItem.style.color = "#8c2cc4";
            }
        });
    }
    else {
        let links = document.querySelectorAll("#navigation-list-link");
        links.forEach(function(link) {
            if (link.getAttribute("href") === path) {
                let img = link.querySelector("#navigation-list-link-image");
                makeHoverImage(img);
                link.style.color = "#fff";
            }
        });
    }
});