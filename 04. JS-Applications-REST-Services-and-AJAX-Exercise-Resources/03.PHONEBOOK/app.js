function attachEvents() {
    const personInput = document.getElementById('person');
    const phoneInput = document.getElementById('phone');
    const phonebook = document.getElementById('phonebook');

    function load() {
        fetch(`https://phonebook-nakov.firebaseio.com/phonebook.json`)
            .then(res => res.json())
            .then(data => {
                phonebook.innerHTML = '';
                Object.entries(data)
                    .forEach(([elId, phonebookData]) => {
                        const { person, phone } = phonebookData;
                        const li = document.createElement('li');
                        li.textContent = `${person}: ${phone}`;
                        const deleteButton = document.createElement('button');

                        deleteButton.setAttribute('data-target', elId);
                        deleteButton.addEventListener('click', deletePhonebook);
                        deleteButton.textContent = 'Delete';
                        li.appendChild(deleteButton);
                        phonebook.appendChild(li);
                    });
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // function handleError(err) {
    //     console.log(err);
    //     //TODO
    // };

    function deletePhonebook() {
        const phoneBookId = this.getAttribute('data-target');

        const headers = {
            method: 'DELETE'
        };

        fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${phoneBookId}.json`, headers)
        .then(() => {
            phonebook.innerHTML = '';
            load();
        })
    }

    function create() {
        const person = personInput.value;
        const phone = phoneInput.value;

        const headers = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ person, phone })
        };

        fetch(`https://phonebook-nakov.firebaseio.com/phonebook.json`, headers)
            // .then(res => res.json())
            .then(() => {
                personInput.value = '';
                phoneInput.value = '';
                phonebook.innerHTML = '';

                load();
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return {
        load,
        create
    }
}

let result = attachEvents();
console.log(result);