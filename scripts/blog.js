document.addEventListener("DOMContentLoaded", function() {
    if (window.innerWidth <= 900) {
        let burger = document.querySelector(".blog-aside-burger");
        burger.addEventListener("click", function() {
            let list = document.querySelector(".blog-aside-list");
            if (list.style.transform == "translateX(0px)") {
                list.style.transform = "translateX(-200%)";
                burger.style.backgroundImage = "url(\"/styles/images/burger.svg\")";
            }
            else {
                list.style.transform = "translateX(0)";
                burger.style.backgroundImage = "url(\"/styles/images/close.svg\")";
            }
        });
    }
    else {
        let sidebar = document.querySelector(".blog-aside-list");
        let footer = document.querySelector(".footer");
    
        function checkFooterVisibility() {
            let sidebarRect = sidebar.getBoundingClientRect();
            let footerRect = footer.getBoundingClientRect();
            if (sidebarRect.bottom > footerRect.top - 100) {
                sidebar.style.position = "absolute";
                sidebar.style.bottom = "100px";
            } 
            else if (footerRect.top > 775) {
                sidebar.style.position = "fixed";
                sidebar.style.bottom = "auto";
            }
        }
    
        window.addEventListener("resize", checkFooterVisibility);
        window.addEventListener("scroll", checkFooterVisibility);
        checkFooterVisibility();
    }
});