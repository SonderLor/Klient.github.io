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

    function updateBin() {
        if (totalAmount === 0) {
            document.querySelector(".section-empty-bin-info").style.display = "flex";
            document.querySelector(".section-bin-info").style.display = "none";
            document.querySelector(".right").style.display = "none";
        }
        else {
            document.querySelector(".section-empty-bin-info").style.display = "none";
            document.querySelector(".section-bin-info").style.display = "block";
            document.querySelector(".right").style.display = "block";
        }
    }


    var totalAmount = 0;
    var totalPrice = 0;

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        if (value != "undefined") {
            value = JSON.parse(value);
            createBinItem(value[0], value[1], value[2], value[3]);
        }
    }

    updateBin();    

    function createBinItem(imgUrl, info, price, amount) {
        let binItem = document.createElement("li");
        binItem.classList.add("bin-list-item");

        let imgElement = document.createElement("img");
        imgElement.className = "bin-item-img";
        imgElement.src = imgUrl;
        imgElement.alt = "";

        let binItemInfo = document.createElement("div");
        binItemInfo.className = "bin-item-info";

        let binItemInfoUpside = document.createElement("div");
        binItemInfoUpside.className = "bin-item-info-upside";

        let binItemHeader = document.createElement("h3");
        binItemHeader.className = "bin-item-header";
        binItemHeader.textContent = info;

        let binItemDeleteButton = document.createElement("img");
        binItemDeleteButton.className = "bin-item-delete-button";
        binItemDeleteButton.src = "/styles/images/trashBin.svg";
        binItemDeleteButton.alt = "";
        binItemDeleteButton.addEventListener("click", function(event) {
            let target = event.target;
            deleteBinItem(target);
        });
        binItemDeleteButton.addEventListener("click", function() {
            updateBinAmount();
        });

        let binItemInfoDownside = document.createElement("div");
        binItemInfoDownside.className = "bin-item-info-downside";

        let binItemInfoDownsideLeft = document.createElement("div");
        binItemInfoDownsideLeft.className = "bin-item-info-downside-left";

        let buttonIncreaseDecrease = document.createElement("div");
        buttonIncreaseDecrease.className = "button-increase-decrease";

        let buttonIncrease = document.createElement("button");
        buttonIncrease.className = "button-increase";
        buttonIncrease.textContent = "+";
        buttonIncrease.addEventListener("click", function(event) {
            let target = event.target;
            increaseBinItem(target);
        });
        buttonIncrease.addEventListener("click", function() {
            updateBinAmount();
        });

        let binItemAmount = document.createElement("p");
        binItemAmount.className = "bin-item-amount";
        binItemAmount.textContent = amount;

        let buttonDecrease = document.createElement("button");
        buttonDecrease.className = "button-decrease";
        buttonDecrease.textContent = "-";
        buttonDecrease.addEventListener("click", function(event) {
            let target = event.target;
            decreaseBinItem(target);
        });
        buttonDecrease.addEventListener("click", function() {
            updateBinAmount();
        });

        let binItemPrice = document.createElement("p");
        binItemPrice.className = "bin-item-price";
        binItemPrice.innerHTML = `x ${price}`;

        let binItemTotalPrice = document.createElement("p");
        binItemTotalPrice.className = "bin-item-totalprice";
        binItemTotalPrice.textContent = `${amount * price} руб`;

        binItemInfoUpside.appendChild(binItemHeader);
        binItemInfoUpside.appendChild(binItemDeleteButton);

        buttonIncreaseDecrease.appendChild(buttonDecrease);
        buttonIncreaseDecrease.appendChild(binItemAmount);
        buttonIncreaseDecrease.appendChild(buttonIncrease);

        binItemInfoDownsideLeft.appendChild(buttonIncreaseDecrease);
        binItemInfoDownsideLeft.appendChild(binItemPrice);

        binItemInfoDownside.appendChild(binItemInfoDownsideLeft);
        binItemInfoDownside.appendChild(binItemTotalPrice);

        binItemInfo.appendChild(binItemInfoUpside);
        binItemInfo.appendChild(binItemInfoDownside);

        binItem.appendChild(imgElement);
        binItem.appendChild(binItemInfo);

        let binItems = document.querySelector(".section-bin-list");
        binItems.appendChild(binItem);
        totalAmount += amount;
        totalPrice += price * amount;
        document.querySelector(".bin-info-amount").innerText = `Количество: ${totalAmount}`;
        document.querySelector(".bin-info-sum").innerText = `Сумма заказа: ${totalPrice} руб`;
    }


    function deleteBinItem(target) {
        let binItem = target.parentElement.parentElement.parentElement;
        binItem.parentElement.removeChild(binItem);
        totalAmount -= parseInt(binItem.querySelector(".bin-item-amount").innerText);
        totalPrice -= parseInt(binItem.querySelector(".bin-item-totalprice").innerText);
        document.querySelector(".bin-info-amount").innerText = `Количество: ${totalAmount}`;
        document.querySelector(".bin-info-sum").innerText = `Сумма заказа: ${totalPrice} руб`;
        
        let price = parseInt(binItem.querySelector(".bin-item-price").innerText.slice(2));
        let info = binItem.querySelector(".bin-item-header").innerText;
        localStorage.setItem(info + `x ${price}`, undefined);
        updateBin();
    }


    function increaseBinItem(target) {
        let binItem = target.parentElement.parentElement.parentElement.parentElement.parentElement;
        let binItemAmount = binItem.querySelector(".bin-item-amount");
        let price = parseInt(binItem.querySelector(".bin-item-price").innerText.slice(2));
        binItemAmount.innerText = parseInt(binItemAmount.innerText) + 1;
        totalAmount++;
        totalPrice += price;
        document.querySelector(".bin-info-amount").innerText = `Количество: ${totalAmount}`;
        document.querySelector(".bin-info-sum").innerText = `Сумма заказа: ${totalPrice} руб`;
        binItem.querySelector(".bin-item-totalprice").innerText = `${price * parseInt(binItemAmount.innerText)} руб`;

        let imgUrl = binItem.querySelector(".bin-item-img").src;
        let info = binItem.querySelector(".bin-item-header").innerText;
        let amount = parseInt(binItemAmount.innerText);
        localStorage.setItem(info + `x ${price}`, JSON.stringify([imgUrl.slice(imgUrl.indexOf("/styles")), info, price, amount]));
    }


    function decreaseBinItem(target) {
        let binItem = target.parentElement.parentElement.parentElement.parentElement.parentElement;
        let binItemAmount = binItem.querySelector(".bin-item-amount");
        let price = parseInt(binItem.querySelector(".bin-item-price").innerText.slice(2));
        if (parseInt(binItemAmount.innerText) - 1 > 0) {
            binItemAmount.innerText = parseInt(binItemAmount.innerText) - 1;
            totalAmount--;
            totalPrice -= price;
            document.querySelector(".bin-info-amount").innerText = `Количество: ${totalAmount}`;
            document.querySelector(".bin-info-sum").innerText = `Сумма заказа: ${totalPrice} руб`;
            binItem.querySelector(".bin-item-totalprice").innerText = `${price * parseInt(binItemAmount.innerText)} руб`;

            let imgUrl = binItem.querySelector(".bin-item-img").src;
            let info = binItem.querySelector(".bin-item-header").innerText;
            let amount = parseInt(binItemAmount.innerText);
            localStorage.setItem(info + `x ${price}`, JSON.stringify([imgUrl.slice(imgUrl.indexOf("/styles")), info, price, amount]));
        }
        else {
            binItem.querySelector(".bin-item-delete-button").dispatchEvent(new Event("click"));
            let info = binItem.querySelector(".bin-item-header").innerText;
            localStorage.setItem(info + `x ${price}`, undefined);
        }
        updateBin();
    }
});