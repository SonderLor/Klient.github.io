window.addEventListener("DOMContentLoaded", function() {
    let buttons = document.querySelectorAll(".blog-section-card-icons-like");
    buttons.forEach(function(button) {
        let pseudoElement = document.createElement("span");
        pseudoElement.className = "content-value";
        pseudoElement.textContent = "0";
        button.appendChild(pseudoElement);
        button.addEventListener("click", function() {
            backgroundImage = window.getComputedStyle(button).backgroundImage;
            let match = backgroundImage.match(/url\(".*?\/styles(\/.*)"\)/);
            let newPath = match ? match[1] : null;
            backgroundImage = 'url("/styles' + newPath + '")';
            if (backgroundImage == "url(\"/styles/images/like.svg\")") {
                button.style.backgroundImage = "url(\"/styles/images/likeToggle.svg\")";
                pseudoElement.textContent = "1";
            } 
            else {
                button.style.backgroundImage = "url(\"/styles/images/like.svg\")";
                pseudoElement.textContent = "0";
            }
        });
    });
});