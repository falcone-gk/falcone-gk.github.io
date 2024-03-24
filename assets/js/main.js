async function fetchJSONData(lang='en') {

    if (lang === 'es') {
        var pathData = "lang/es.json";
    } else {
        var pathData = "lang/en.json";
    }

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
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

setupPageLang('en')