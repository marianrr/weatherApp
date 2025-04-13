// https://api.open-meteo.com/v1/forecast?latitude=47.75&longitude=26.6667&current=temperature_2m,rain,is_day,showers,snowfall,cloud_cover,wind_speed_10m

// https://geocoding-api.open-meteo.com/v1/search?name=botosani


const submit1 = async event => {
    event.preventDefault()
    let city = window.input1.value
    console.log('The city is: ', city)
    let data1 = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
    let city2 = await data1.json()
    console.log(city2.results[0])
    let lat = city2.results[0].latitude
    let long = city2.results[0].longitude
    let city3 = city2.results[0].name
    console.log('Coordonatele geografice sunt: ', lat, long, city3)

    let data2 = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,rain,is_day,showers,snowfall,cloud_cover,wind_speed_10m`)
    let meteo2 = await data2.json()
    console.log('The weather is: ', meteo2)
    let meteo = meteo2.current
    window.weather.textContent = `The temperature is ${meteo.temperature_2m}°C, outside is ${meteo.is_day?'day':'night'}. The windspeed is ${meteo.wind_speed_10m}km/h.`
    window.input1.value = ''
}