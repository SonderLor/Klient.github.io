document.addEventListener('DOMContentLoaded', function() {
    
    let captcha = generateLettersCaptcha();
    let numbersCaptcha = generateNumbersCaptcha();
    const captchaContainer = document.getElementById("captcha-container");
    const captchaInput = document.getElementById("captcha-input");
    const captchaText = document.getElementById("captcha-text")
    const submitButton = document.getElementById("submit-button");
    const captchaButton = document.getElementById("captcha-button");
    const errorText = document.getElementById("error-text");

    captchaText.textContent = "Введите текст: " + captcha;
    submitButton.disabled = true;
    submitButton.style.cursor = 'auto';
    captchaButton.disabled = false;
    captchaButton.style.cursor = 'pointer';
    captchaButton.addEventListener('click', checkCaptcha);
    let tries = 1;


    function generateLettersCaptcha() {
        let captcha = "";
        const possibleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (let i = 0; i < 5; i++) {
            captcha += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
        }
        return captcha;
    }


    function generateNumbersCaptcha() {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        return { num1, num2, sum: num1 + num2 };
    }


    function isEmpty(obj) {
        for (let key in obj) {
            return false;
        }
        return true;
    }


    function checkCaptcha() {
        if (!isEmpty(captchaInput.value) && tries < 3) {
            tries++;
            if (captchaInput.value == captcha) {
                captchaButton.disabled = true;
                captchaButton.style.cursor = "auto";
                submitButton.disabled = false;
                submitButton.style.cursor = "pointer";
                captchaText.textContent = "";
                captchaContainer.style.display = "none";
                errorText.textContent = "Вы прошли проверку. Отправка формы разрешена.";
            } else {
                errorText.textContent = "Неверная капча. Попробуйте снова.";
                captcha = generateLettersCaptcha();
                captchaText.textContent = "Введите текст: " + captcha;
            }
        } else if (!isEmpty(captchaInput.value)) {
            tries++;
            if (parseInt(captchaInput.value) == numbersCaptcha.sum) {
                captchaButton.disabled = true;
                captchaButton.style.cursor = 'auto';
                submitButton.disabled = false;
                submitButton.style.cursor = 'pointer';
                captchaText.textContent = "";
                captchaContainer.style.display = "none";
                errorText.textContent = "Вы прошли проверку. Отправка формы разрешена.";
            } else if (tries == 4) {
                if (captchaInput.value == captcha) {
                    captchaButton.disabled = true;
                    captchaButton.style.cursor = 'auto';
                    submitButton.disabled = false;
                    submitButton.style.cursor = 'pointer';
                    captchaText.textContent = "";
                    captchaContainer.style.display = "none";
                    errorText.textContent = "Вы прошли проверку. Отправка формы разрешена.";
                }
                else {
                    captchaText.textContent = `Введите ответ: ${numbersCaptcha.num1} + ${numbersCaptcha.num2} = `;
                }
            } else {
                errorText.textContent = "Неверная сумма. Попробуйте снова.";
                numbersCaptcha = generateNumbersCaptcha();
                captchaText.textContent = `Введите ответ: ${numbersCaptcha.num1} + ${numbersCaptcha.num2} = `;
            }
        }
    }

});