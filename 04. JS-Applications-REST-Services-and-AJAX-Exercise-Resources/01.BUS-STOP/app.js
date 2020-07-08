function getInfo() {
    const stopIdInput = document.getElementById("stopId");
    const stopNameDiv = document.getElementById('stopName');
    const busContainer = document.getElementById('buses');

    const busesUrl = `https://judgetests.firebaseio.com/businfo/${stopIdInput.value}.json`;

    stopNameDiv.textContent = '';
    busContainer.innerHTML = '';
    fetch(busesUrl)
        .then(res => res.json())
        .then(data => {
            const { name, buses } = data;

            stopNameDiv.textContent = name;

            Object.entries(buses)
                .forEach(([busId, bustTime]) => {
                    const busLi = document.createElement('li');
                    busLi.textContent = `Bus ${busId} arrives in ${bustTime}`
                    busContainer.appendChild(busLi);
                });

        })
        .catch((err) => {
            stopNameDiv.textContent = 'Error';
        })
}