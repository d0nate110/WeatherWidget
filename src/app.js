const temperature_class = document.querySelector(".current_temperature"); 
const description_class = document.querySelector(".weather_description");
const search_button_class = document.querySelector(".search_button");
const search_field_class = document.querySelector(".search_field");

// this function takes the city data in and displays the temperature and description values
const displayWeatherData = function (api_data) {

    // this is to round the temperature to a whole number.
    const temp = Math.round(api_data.main.temp);
    const weather_description = api_data.weather[0].description;

    // then the temperature is displayed in the temperature container in html.
    temperature_class.innerText = temp + " °C";
    // the weather description will be displayed in capital letters
    description_class.innerText = weather_description.toUpperCase();

};


// with this function the program fetches the data for the weather in specified city
const getWeather = function (city) {
    // this url looks for the city and retrieves the data for the city that was searched for
    const api_url = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=522554098bb8cd185e9487ce02cdadcd&units=metric';
     
    fetch(api_url)
        .then(response => {
                
            const api_data = response.json();
            return api_data;
        })
        .then(api_data => {
                
            displayWeatherData(api_data);
        })
        .catch(err => {
            console.log(err);
        });
};


// when user click on the search button, this function is executed. It gets the value from the search field
const handleInputValue = function () {
   
    const city = search_field_class.value; // this gets the value that was typed in to the search box
    const regex = /\d+/; // the program will look for numbers in the input
    const numbers_input = regex.test(city); // if it finds the numbers, then it will return true
    
    try {
        if (numbers_input) {
            throw new Error("Please enter letters!");
        } else if (!city) {
            throw new Error("Please enter a city!");
        } 
        else {
            getWeather(city);
        }
    } catch (error) {

        alert(error);
    }
}
