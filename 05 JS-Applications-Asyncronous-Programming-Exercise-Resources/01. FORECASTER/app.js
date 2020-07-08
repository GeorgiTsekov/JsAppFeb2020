function attachEvents() {
    const locationInput = document.getElementById('location');
    const forecastDiv = document.getElementById('forecast');
    const currentConditionsDiv = document.getElementById('current');
    const upcomingConditionsDiv = document.getElementById('upcoming');

    function GetWeather() {
        fetch(`https://judgetests.firebaseio.com/locations.json`)
            .then(res => res.json())
            .then((data) => {
                locationValue = locationInput.value;

                data.forEach(el => {
                    if (el.name === locationValue) {
                        const conditions = {
                            'Sunny': '☀',
                            'Partly sunny': '⛅',
                            'Overcast': '☁',
                            'Rain': '☂',
                            'Degrees': '°'
                        }

                        let degrees = conditions.Degrees;

                        fetch(`https://judgetests.firebaseio.com/forecast/today/${el.code}.json`)
                            .then(res => res.json())
                            .then((currentConditions) => {

                                const condition = currentConditions.forecast.condition;

                                let condSymbol = conditions[condition];

                                forecastDiv.style.display = 'block';

                                let name = currentConditions.name;
                                let lowTemp = currentConditions.forecast.low;
                                let highTemp = currentConditions.forecast.high;

                                const spanConditionSymbol = document.createElement('span');
                                spanConditionSymbol.className = 'condition symbol';
                                spanConditionSymbol.textContent = condSymbol;


                                const spanCondition = document.createElement('span');
                                spanCondition.className = 'condition';


                                const nameSpan = document.createElement('span');
                                nameSpan.className = 'forecast-data';
                                nameSpan.textContent = name;

                                const tempSpan = document.createElement('span');
                                tempSpan.className = 'forecast-data';
                                tempSpan.textContent = `${lowTemp}${degrees}/${highTemp}${degrees}`;

                                const conditionSpan = document.createElement('span');
                                conditionSpan.className = 'forecast-data';
                                conditionSpan.textContent = condition;

                                spanCondition.appendChild(nameSpan);
                                spanCondition.appendChild(tempSpan);
                                spanCondition.appendChild(conditionSpan);

                                currentConditionsDiv.appendChild(spanConditionSymbol);
                                currentConditionsDiv.appendChild(spanCondition);
                            })
                            .catch((err) => {
                                console.error(err);
                            })

                        fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${el.code}.json`)
                            .then(res => res.json())
                            .then((threeDayForecast) => {

                                Array.from(threeDayForecast.forecast)
                                    .forEach(currentDay => {
                                        const spanClassUpcoming = document.createElement('span');
                                        spanClassUpcoming.className = 'upcoming';

                                        let lowTemp = currentDay.low;
                                        let condition = currentDay.condition;
                                        let highTemp = currentDay.high;
                                        let condSymbol = conditions[condition];

                                        const spanConditionSymbol = document.createElement('span');
                                        spanConditionSymbol.className = 'symbol';
                                        spanConditionSymbol.textContent = condSymbol;

                                        const tempSpan = document.createElement('span');
                                        tempSpan.className = 'forecast-data';
                                        tempSpan.textContent = `${lowTemp}${degrees}/${highTemp}${degrees}`;

                                        const conditionSpan = document.createElement('span');
                                        conditionSpan.className = 'forecast-data';
                                        conditionSpan.textContent = condition;

                                        spanClassUpcoming.appendChild(spanConditionSymbol);
                                        spanClassUpcoming.appendChild(tempSpan);
                                        spanClassUpcoming.appendChild(conditionSpan);

                                        upcomingConditionsDiv.appendChild(spanClassUpcoming);
                                    });
                            })
                            .catch((err) => {
                                console.error(err);
                            })
                    } 
                });
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return {
        GetWeather
    }
}

let result = attachEvents();
console.log(result);
