const weatherApiUrl = 'https://api.weatherbit.io/v2.0/current';
const apiKey = '19591a3e9cba4432a54c53887f0d6fa0'

let obtainedIceCream = false;

const defaultCity = 'Hamburg';

const submitBtn = document.querySelector('.submit-btn');
const temp = document.querySelector('.temp');
const city = document.querySelector('.city');
const dialog = document.querySelector('.notificationOuterBox');
const dialog_close = document.querySelector('.dialog_close');

const chanceBtn = document.querySelector('.chance-btn');
const alreadyObtained = document.querySelector('.alreadyObtained');
const stillAChance = document.querySelector('.stillAChance');

let currentInterval = setInterval(getWeatherData, 600000, defaultCity);

submitBtn.addEventListener('click', () => {
    const city = document.querySelector('.city-input');
    getWeatherData(city.value);
    currentInterval = setInterval(getWeatherData, 600000, city.value);
    city.value = ''
});

chanceBtn.addEventListener('click', () => {
    if(obtainedIceCream) {
        alreadyObtained.style.display = 'block';
        setTimeout(() => alreadyObtained.style.display = '', 3000);
    } else {
        stillAChance.style.display = 'block';
        setTimeout(() => stillAChance.style.display = '', 3000);
    }
    // else
});

dialog_close.addEventListener('click', () => {
    dialog.style.display = 'none';
});

function getWeatherData(customCity){
    fetch(`${weatherApiUrl}?city=${customCity}&key=${apiKey}`)
        .then(data => {
            return data.json();
        })
        .then(data => {
            const currTemp = Math.round(data.data[0].app_temp);
            temp.textContent = `${currTemp}°C`;
            city.textContent = customCity;
            if(currTemp > 30 && !obtainedIceCream) {
                dialog.style.display = 'block';
                obtainedIceCream = true;
            } else {
                alreadyObtained.style.display = 'block';
                setTimeout(() => alreadyObtained.style.display = '', 5000);
            }

        })
        .catch(err => console.log(err));

}
