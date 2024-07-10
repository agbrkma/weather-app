
const api_key = '355ee3f810f04640b6c200058240907'

const form = document.getElementById('weather-form')



const city = document.getElementById('city')
const errorSpan = document.getElementById('error-span')
const wrapper = document.getElementById('wrapper')
const searchBtn = document.getElementById('search-btn')
const celciusCheck = document.getElementById('celcius')


let weatherObj = {}

async function getWeather(inputValue, celciusBoolean) {
    errorSpan.textContent = "";
    try{
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${inputValue}`)
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        weatherObj = await response.json()
        showWeather(celciusBoolean)
        console.log(weatherObj)
    } catch (error) {
        errorSpan.textContent = "Please enter a city";
        console.error('Error fetching data:', error)
    }
    
}

async function showWeather(celciusBoolean){
    wrapper.innerHTML = ''

    const card = document.createElement('div')
    card.id = 'weather-card'
    const location = document.createElement('h1')
    location.textContent = `${weatherObj.location.name}, ${weatherObj.location.region}`
    const temp = document.createElement('h3')
    if(!celciusBoolean){
        temp.innerHTML = `${weatherObj.current.temp_f}&#176; F`;
    }else{
        temp.innerHTML = `${weatherObj.current.temp_c}&#176; C`;
    }

    weatherObj.current.temp_f > 68 ? card.classList.add('warm') : card.classList.add('cold')


    card.append(location)
    card.append(temp)

    wrapper.append(card)
}




form.addEventListener('submit', (e) =>{
    e.preventDefault()
    
    const inputValue = city.value
    const celciusBool = celciusCheck.checked
    getWeather(inputValue, celciusBool) 
     
})