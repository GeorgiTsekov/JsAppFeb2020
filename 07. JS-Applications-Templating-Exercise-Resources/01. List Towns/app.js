function attachEvents() {
    const townsInput = document.getElementById('towns');
    const loadBtn = document.getElementById('btnLoadTowns');
    const ulTowns = document.querySelector("#root > ul");

    loadBtn.addEventListener('click', loadHandler);

    function loadHandler() {

        ulTowns.innerHTML ='';
        
        const arrayOfTowns = townsInput.value.split(', ');

        if (arrayOfTowns[0]) {
            arrayOfTowns.forEach(town => {
                const li = document.createElement('li');
    
                li.textContent = town;
    
                ulTowns.appendChild(li);
            });
        }
        
    }

    return {
        loadHandler
    };
}

let result = attachEvents();



