import { monkeys } from './monkeys.js';

(async () => {

    Handlebars.registerPartial(
        'monkey',
        await fetch('./monkey-template.hbs').then((r) => r.text())
    );

    const template = Handlebars.compile(
        await fetch('./all-monkeys-template.hbs').then((r) => r.text())
    );

    const resultHTML = template({ monkeys });

    document.querySelector('section').innerHTML = resultHTML;

    Array.from(document.getElementsByTagName('button')).forEach(btn => {
        btn.addEventListener('click', handle)
    });

    function handle() {
        console.log(this)
        if (this.parentNode.getElementsByTagName('p')[0].style.display === 'none') {
            this.parentNode.getElementsByTagName('p')[0].style.display = 'block';
            this.textContent = 'Hide info';
        } else {
            this.parentNode.getElementsByTagName('p')[0].style.display = 'none';
            this.textContent = 'Info';
        }
    }

})();