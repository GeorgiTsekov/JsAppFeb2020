(async () => {

    Handlebars.registerPartial(
        'cat',
        await fetch('./single-cat-template.hbs').then((r) => r.text())
    );

    const template = Handlebars.compile(
        await fetch('./all-cats-template.hbs').then((r) => r.text())
    );

    const resultHTML = template({ cats });

    document.querySelector('section#allCats').innerHTML += resultHTML;

    Array.from(document.getElementsByClassName('showBtn')).forEach(btn => {
        btn.addEventListener('click', handle)
    });

    function handle() {
        if (this.parentNode.getElementsByClassName('status')[0].style.display === 'none') {
            this.parentNode.getElementsByClassName('status')[0].style.display = 'block';
            this.textContent = 'Hide status code';
        } else {
            this.parentNode.getElementsByClassName('status')[0].style.display = 'none';
            this.textContent = 'Show status code';
        }
    }

})();
