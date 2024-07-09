
const api_key = '355ee3f810f04640b6c200058240907'

const form = document.getElementById('weather-form')



const city = document.getElementById('city')
const errorSpan = document.getElementById('error-span')
const wrapper = document.getElementById('wrapper')
const searchBtn = document.getElementById('search-btn')


let weatherObj = {}

async function getWeather(inputValue) {
    errorSpan.textContent = "";
    try{
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${inputValue}`)
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        weatherObj = await response.json()
        showWeather()
        console.log(weatherObj)
    } catch (error) {
        errorSpan.textContent = "Please enter a city";
        console.error('Error fetching data:', error)
    }
    
}

async function showWeather(){
    wrapper.innerHTML = ''

    const card = document.createElement('div')
    card.id = 'weather-card'
    const location = document.createElement('h1')
    location.textContent = `${weatherObj.location.name}, ${weatherObj.location.region}`
    const temp = document.createElement('h3')
    temp.textContent = `${weatherObj.current.temp_f} degrees`

    weatherObj.current.temp_f > 68 ? card.classList.add('warm') : card.classList.add('cold')


    card.append(location)
    card.append(temp)

    wrapper.append(card)
}




form.addEventListener('submit', (e) =>{
    e.preventDefault()
    
    const inputValue = city.value
    getWeather(inputValue) 
     
})