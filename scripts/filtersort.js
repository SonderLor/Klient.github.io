document.addEventListener("DOMContentLoaded", function() {
    function isSelected(itemName) {
        for (let checkbox of selectedCheckboxes) {
            let checkboxText = checkbox.parentElement.innerText.toLocaleLowerCase().trim();
            console.log(checkboxText);
            console.log(itemName);
            if (itemName.includes(checkboxText)) {
                return true;
            }
        }
        return false;
    }

    let button = document.querySelector(".catalog-menu-button");
    let selectElement = document.querySelector(".catalog-menu-select");
    let selectedValue = selectElement.value;
    let catalog = Array.from(document.querySelectorAll(".catalog-list-item"));
    selectElement.addEventListener("change", function() {
        selectedValue = selectElement.value;
    });
    let checkboxes = document.querySelectorAll(".catalog-menu-checkbox");
    let selectedCheckboxes = Array.from(checkboxes).filter(function(checkbox) {
        return checkbox.checked;
    });
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener("change", function(event) {
            let checkbox = event.target;
            if (checkbox.checked) {
                selectedCheckboxes.push(checkbox);
            } 
            else {
                let index = selectedCheckboxes.indexOf(checkbox);
                if (index !== -1) {
                    selectedCheckboxes.splice(index, 1);
                }
            }
        });
    });
    button.addEventListener("click", function() {
        let container = document.querySelector(".section-catalog-list");
        let items = document.querySelectorAll(".catalog-list-item");
        if (selectedCheckboxes.length !== 0) {
            items.forEach(function(item) {
                itemName = item.querySelector(".catalog-list-item-paragraph").innerText.toLocaleLowerCase();
                if (isSelected(itemName)) {
                    item.style.display = "flex";
                }
                else {
                    item.style.display = "none";
                }
            });
        }
        else {
            items.forEach(function(item) {
                item.style.display = "flex";
            });
        }
        if (selectedValue !== "none") {
            let items = Array.from(document.querySelectorAll(".catalog-list-item"));
            items.forEach(function (item) {
                container.removeChild(item);
            });
            if (selectedValue === "increase") {
                items.sort(function (a, b) {
                    let priceA = parseInt(a.querySelector(".catalog-list-item-price").innerText);
                    let priceB = parseInt(b.querySelector(".catalog-list-item-price").innerText);
                    return priceA - priceB;
                });
            }
            else {
                items.sort(function (a, b) {
                    let priceA = parseInt(a.querySelector(".catalog-list-item-price").innerText);
                    let priceB = parseInt(b.querySelector(".catalog-list-item-price").innerText);
                    return priceB - priceA;
                });
            }
            items.forEach(function (item) {
                container.appendChild(item);
            });
        }
        else {
            let items = Array.from(document.querySelectorAll(".catalog-list-item"));
            items.forEach(function (item) {
                container.removeChild(item);
            });
            catalog.forEach(function (item) {
                container.appendChild(item);
            });
        }
    })
});