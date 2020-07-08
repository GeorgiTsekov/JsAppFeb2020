(() => {

    const elements = {
        anglerInput: document.querySelector("#addForm > input.angler"),
        weightInput: document.querySelector("#addForm > input.weight"),
        speciesInput: document.querySelector("#addForm > input.species"),
        locationInput: document.querySelector("#addForm > input.location"),
        baitInput: document.querySelector("#addForm > input.bait"),
        captureTimeInput: document.querySelector("#addForm > input.captureTime"),
        addButton: document.getElementsByClassName('add')[0]
    };

    const CREATE_URL = 'https://fisher-game.firebaseio.com/catches.json';

    elements.addButton.addEventListener('click', addCatch);

    async function addCatch() {

        let currCatch = {
            angler: elements.anglerInput.value,
            weight: elements.weightInput.value,
            species: elements.speciesInput.value,
            location: elements.locationInput.value,
            bait: elements.baitInput.value,
            captureTime: elements.captureTimeInput.value
        };

        const options = {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currCatch),
            method: 'POST'
        };

        try {
            const response = await fetch(CREATE_URL, options);

            const data = await response.json();

            console.log(data)
        } catch (e) {
            console.error(e)
        }
    }




})();

