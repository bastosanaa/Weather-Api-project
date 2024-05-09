
const apiKey = "e4e618e0233c0e0387ce8673308fc057"
const apiCountryURL = "https://flagsapi.com/BR/flat/";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-button");
const cityNameElement = document.getElementById("city");
const CountryElement = document.getElementById("country");
const temperatureElement = document.querySelector("#temperature span");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");
const descriptionElement = document.getElementById("description");
const weatherIconElement = document.querySelector("#description-container img")
const countryFlagElement = document.getElementById("country")
const weatherDataContainer = document.querySelector("#weather-data")
const errorMessage = document.getElementById("error-message")


//implementando tratamento de erros de entrada
const getWeatherData = async (city) => {
    try {
        const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`
        const response = await fetch(apiWeatherURL)

        if (!response.ok) {
            throw new Error('Erro ao buscar dados do clima')
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.log(error);
        sendErrorMessage()
        return null
    }
}
const showWeatherData = async (city) => {
        const data = await getWeatherData(city)
        console.log(data)
    if (data) {
        cityNameElement.innerHTML = data.name
        temperatureElement.innerHTML = parseInt(data.main.temp)
        umidityElement.innerHTML = `${data.main.humidity}%`
        windElement.innerHTML = `${parseInt(data.wind.speed)}km/h`
        descriptionElement.innerHTML = data.weather[0].description
        weatherIconElement.setAttribute("src", 	`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
        const country = data.sys.country.toLowerCase()
        getCountryFlags(country)
        weatherDataContainer.classList.remove("hidden")
        errorMessage.innerHTML = ""
    }
    
}

const getCountryFlags = async (country) => {
    countryFlagElement.setAttribute("src" , `https://flagcdn.com/${country}.svg`)
}

const getCityPicture = async (city) => {
    const accessKey = "H948_LdWKr69x09IHlSXXN5hmTM-ql3Sf2pGt0BNkhA"
    const apiCityPicURL = `https://api.unsplash.com/photos/random/?query=${city}&client_id=${accessKey}`
}

const sendErrorMessage = () => {
    errorMessage.innerHTML = "Ops - tente inserir outra cidade"
    weatherDataContainer.classList.add("hidden")

}



searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;
    showWeatherData(city)
})

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;
        showWeatherData(city)
    }
})

//tratamento de entradas invalidas
//estado de carregamento dos dados
// conexao com api unsplash para fundos personalizados