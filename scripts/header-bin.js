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


    updateBinAmount();
});