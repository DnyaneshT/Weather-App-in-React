import React, { useState } from "react";

const api = {
	key: "9174b32c52ae444fa32f974aa4cbebce",
	baseURL: "https://api.openweathermap.org/data/2.5/",
};

function App() {
	const dateBuilder = (d) => {
		let months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		let days = [
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
			"Friday",
			"Saturday",
		];

		let day = days[d.getDay()];
		let date = d.getDate();
		let month = months[d.getMonth()];
		let year = d.getFullYear();

		return `${day} ${date} ${month} ${year}`;
	};

	const [query, setQuery] = useState('')
	const [weather, setWeather] = useState({})
	
	const handleSubmit = (e) => {
		if (e.key === "Enter") {
			fetch(`${api.baseURL}weather?q=${query}&units=imperial&appid=${api.key}`)
				.then(res => res.json())
				.then(result => {
					setWeather(result)
					setQuery("")
					console.log(result)
				});
		}
	}

	return (
		<div className= { (typeof weather.main !== "undefined")? ((weather.main.temp) > 80 ? "app orange" : ((weather.main.temp)<60 ? "app blue" : "app green")) : "app green"} >
			<main>
				<div className="search-box">
					<input className="search-bar" type="text" placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)} onKeyPress={handleSubmit} />
				</div>
				{(typeof weather.main !== "undefined") ? (
					<div>
						<div className="location-box">
							<div className="location"> {weather.name}, {weather.sys.country} </div>
							<div className="date">{dateBuilder(new Date())}</div>
						</div>
						<div className="weather-box">
							<div className="temp"> {Math.round(weather.main.temp)}°F </div>
							<div className="weather"> {weather.weather[0].main} </div>
						</div>
					</div>
				) : ("")}

			</main>
		</div>
	);
}

export default App;
