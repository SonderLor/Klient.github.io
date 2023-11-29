document.addEventListener('DOMContentLoaded', function() {
    
    function truncate(str, maxlength) {
        if (str.length > maxlength) {
            return str.slice(0, maxlength - 1) + '…';
        } else {
            return str;
        }
    }

    const paragraphs = document.querySelectorAll('.blog-section-card-paragraph');
    const maxLength = 100;
    paragraphs.forEach(paragraph => {
        let originalString = paragraph.innerText;
        paragraph.innerText = truncate(originalString, maxLength);
    });
    
});