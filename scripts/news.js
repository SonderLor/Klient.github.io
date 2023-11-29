document.addEventListener("DOMContentLoaded", function() {
    let newsItems = document.querySelectorAll(".news-list-item-content");
    newsItems.forEach(function(newsItem) {
        newsItem.parentElement.querySelector(".news-list-item-paragraph-hidden").style.display = "none";
        newsItem.addEventListener("click", function() {
            let paragraph = newsItem.parentElement.querySelector(".news-list-item-paragraph-hidden");
            let img = newsItem.querySelector(".news-list-item-img");
            let paragraphDisplay = paragraph.style.display;
            if (paragraphDisplay == "none") {
                newsItems.forEach(function(item) {
                    item.parentElement.querySelector(".news-list-item-paragraph-hidden").style.display = "none";
                    item.querySelector(".news-list-item-img").style.transform = "rotate(0deg)";
                });
                paragraph.style.display = "block";
                img.style.transform = "rotate(45deg)";
            }
            else {
                paragraph.style.display = "none";
                img.style.transform = "rotate(0deg)";
            }
        });
    });
});