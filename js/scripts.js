
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
const wrapperWeatherData = document.querySelector("#wrapper-weather-data")
const errorMessage = document.getElementById("error-message")
const backgroundImage = document.querySelector(".background-image")
const wrapperLoadingContainer = document.getElementById("wrapper-loader-container")


const showCityData = async (city) => {
    showElement(wrapperLoadingContainer)
    hideElement(wrapperWeatherData)
    const data = await getWeatherData(city)
    if (data) {
        showCityPictures(city)
        showWeatherData(city)
        errorMessage.innerHTML = ""
    } else {
        sendErrorMessage()
        hideElement(wrapperLoadingContainer)
    }

} 

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
        return null
    }
}
const showWeatherData = async (city) => {
    const data = await getWeatherData(city)
    cityNameElement.innerHTML = data.name
    temperatureElement.innerHTML = parseInt(data.main.temp)
    umidityElement.innerHTML = `${data.main.humidity}%`
    windElement.innerHTML = `${parseInt(data.wind.speed)}km/h`
    descriptionElement.innerHTML = data.weather[0].description
    weatherIconElement.setAttribute("src", 	`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`)
    const country = data.sys.country.toLowerCase()
    getCountryFlags(country)
}

const getCountryFlags = async (country) => {
    countryFlagElement.setAttribute("src" , `https://flagcdn.com/${country}.svg`)
}

const getCityPicture = async (city) => {
    const accessKey = "H948_LdWKr69x09IHlSXXN5hmTM-ql3Sf2pGt0BNkhA"
    const apiCityPicURL = `https://api.unsplash.com/photos/random/?query=${city}&client_id=${accessKey}`;
    try {
        const response = await fetch(apiCityPicURL)
        const picture = await response.json()
        
        return picture
    } catch (error) {
        console.log("erro")
    }
}

const showCityPictures = async (city) => {
    const picture = await getCityPicture(city)
    console.log(picture)
    url = picture.urls.full
    backgroundImage.setAttribute("src", url)
    hideElement(wrapperLoadingContainer)
    showElement(wrapperWeatherData)
}

const sendErrorMessage = () => {
    errorMessage.innerHTML = "Ops - tente inserir outra cidade"
    hideElement(wrapperWeatherData)

}

const hideElement = (element) => {
    element.classList.add("hidden")
}

const showElement = (element) => {
    element.classList.remove("hidden")
}

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const city = cityInput.value;
    showCityData(city)
})

cityInput.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        const city = e.target.value;
        
        showCityData(city);
        
    }
})
//tratamento de entradas invalidas - OK
//estado de carregamento dos dados
// conexao com api unsplash para fundos personalizados