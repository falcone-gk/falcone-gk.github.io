const language = localStorage.getItem('language') || 'en';
const selectElement = document.querySelector('.select-lang');
selectElement.value = language;

async function fetchJSONData(lang='en') {

    var pathData = `lang/${lang}.json`;

    return fetch(pathData)
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function setupLanguageText(data) {
    document.querySelectorAll("[data-lang]").forEach(element => {
        element.innerText = data[element.getAttribute("data-lang")];
    });
}

function setupPageLang(lang) {
    fetchJSONData(lang)
    .then(data => {
        setupLanguageText(data);

        // Show CV after language is detected
        const body = document.querySelector('body');
        const divCv = document.querySelector('.cv-hidden');
        if (body.classList.contains('load-body') && divCv.classList.contains('cv-hidden')) {
            body.classList.remove('load-body')
            divCv.classList.remove('cv-hidden')
            divCv.classList.add('fade-in')
        }
        localStorage.setItem('language', lang);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

setupPageLang(language)