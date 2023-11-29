document.addEventListener("DOMContentLoaded", function() {


    async function updateBinAmount() {
        await new Promise(resolve => setTimeout(resolve, 50));
        let amount = 0;
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);
            if (value != "undefined") {
                value = JSON.parse(value);
                amount += value[3];
            }
        }
        if (amount != 0) {
            console.log(amount);
            let style = document.createElement("style");
            style.innerHTML = `
            .navigation-list-bin::after {
                display: block;
                content: "${amount}";
            }
            .navigation-mobile-list-bin::after {
                display: block;
                content: "${amount}";
            }
            `;
            document.head.appendChild(style);
        }
        else {
            console.log(amount);
            let style = document.createElement("style");
            style.innerHTML = `
            .navigation-list-bin::after {
                display: none;
            }
            .navigation-mobile-list-bin::after {
                display: none;
            }
            `;
            document.head.appendChild(style);
        }
    }


    function containsInBin(info, price) {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            if (key == info + `x ${price}` && localStorage.getItem(key) != "undefined") {
                return true;
            }
        }
        return false;
    }


    let catalogItemButtons = document.querySelectorAll(".catalog-list-item-button");
    catalogItemButtons.forEach(function(button) {
        if (containsInBin(button.parentElement.parentElement.querySelector(".catalog-list-item-paragraph").innerText, parseInt(button.parentElement.parentElement.querySelector(".catalog-list-item-price").innerText))) {
            button.style.backgroundImage = "url(\"/styles/images/ShopItemAdded.svg\")";
            button.style.backgroundColor = "#ff9aee";
        }
        button.addEventListener("click", function(event) {
            let target = event.target;
            let catalogItem = target.parentElement.parentElement;
            let imgUrl = catalogItem.querySelector(".catalog-list-item-img").getAttribute("src");
            let info = catalogItem.querySelector(".catalog-list-item-paragraph").innerText;
            let price = parseInt(catalogItem.querySelector(".catalog-list-item-price").innerText);

            if (containsInBin(info, price)) {
                window.location.href = "/pages/bin.html";
            }
            else {
                target.style.backgroundImage = "url(\"/styles/images/ShopItemAdded.svg\")";
                button.style.backgroundColor = "#ff9aee";
                localStorage.setItem(info + `x ${price}`, JSON.stringify([imgUrl, info, price, 1]));
            }
            updateBinAmount();
        });
    });
});