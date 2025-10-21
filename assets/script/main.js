const form = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');
    const statusEl = document.getElementById('status');
    const resultEl = document.getElementById('result');

    // Mapeia os códigos de clima do Open-Meteo para ícones e descrições amigáveis
    const weatherCodes = {
      0: { description: 'Céu limpo', icon: '☀️' },
      1: { description: 'Quase limpo', icon: '🌤️' },
      2: { description: 'Parcialmente nublado', icon: '⛅' },
      3: { description: 'Nublado', icon: '☁️' },
      45: { description: 'Nevoeiro', icon: '🌫️' },
      48: { description: 'Nevoeiro com gelo', icon: '🥶' },
      51: { description: 'Garoa leve', icon: '🌦️' },
      53: { description: 'Garoa moderada', icon: '🌦️' },
      55: { description: 'Garoa forte', icon: '🌧️' },
      61: { description: 'Chuva leve', icon: '🌧️' },
      63: { description: 'Chuva moderada', icon: '🌧️' },
      65: { description: 'Chuva forte', icon: ' torrential' },
      71: { description: 'Neve leve', icon: '🌨️' },
      73: { description: 'Neve moderada', icon: '🌨️' },
      75: { description: 'Neve forte', icon: '❄️' },
      80: { description: 'Pancadas de chuva leves', icon: '🌧️' },
      81: { description: 'Pancadas de chuva moderadas', icon: '🌧️' },
      82: { description: 'Pancadas de chuva violentas', icon: '⛈️' },
      95: { description: 'Trovoada', icon: ' thunderstorms' },
      96: { description: 'Trovoada com granizo leve', icon: '⛈️' },
      99: { description: 'Trovoada com granizo forte', icon: '⛈️' },
    };

    /**
     * Lida com o envio do formulário
     */
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const city = cityInput.value.trim();
      if (!city) return;
      
      setStatus('loading', 'Buscando cidade...');
      resultEl.innerHTML = '';

      try {
        const geoData = await getGeoLocation(city);
        const weatherData = await getWeatherData(geoData.latitude, geoData.longitude);
        displayWeather(weatherData, geoData.name, geoData.country);
        setStatus('success'); // Limpa o status
      } catch (error) {
        setStatus('error', error.message);
      }
    });
    
    /**
     * Busca as coordenadas (latitude/longitude) para uma cidade
     */
    async function getGeoLocation(city) {
      const geoApiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pt&format=json`;
      const response = await fetch(geoApiUrl);
      if (!response.ok) {
        throw new Error('Não foi possível conectar ao serviço de geolocalização.');
      }
      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        throw new Error(`Cidade "${city}" não encontrada. Tente novamente.`);
      }
      return data.results[0];
    }
    
    /**
     * Busca os dados do clima para uma latitude e longitude
     */
    async function getWeatherData(latitude, longitude) {
      const weatherApiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto`;
      const response = await fetch(weatherApiUrl);
      if (!response.ok) {
        throw new Error('Não foi possível obter os dados do clima.');
      }
      return await response.json();
    }
    
    /**
     * Exibe os dados do clima na tela
     */
    function displayWeather(data, cityName, countryName) {
      const { current_weather, daily } = data;
      const weatherInfo = weatherCodes[current_weather.weathercode] || { description: 'Desconhecido', icon: '🤷' };

      const weatherCardHTML = `
        <div class="weather-card">
          <div class="weather-header">
            <div>
              <p class="weather-city">${cityName}</p>
              <p class="weather-country">${countryName}</p>
            </div>
            <div class="weather-icon">${weatherInfo.icon}</div>
          </div>
          <div class="weather-body">
            <div class="weather-temp">
              ${Math.round(current_weather.temperature)}<span>°C</span>
            </div>
            <div class="weather-details">
              <p class="weather-description">${weatherInfo.description}</p>
              <p class="weather-minmax">
                Máx: ${Math.round(daily.temperature_2m_max[0])}° / Mín: ${Math.round(daily.temperature_2m_min[0])}°
              </p>
              <p class="weather-wmo">WMO: ${current_weather.weathercode}</p>
            </div>
          </div>
        </div>
      `;
      resultEl.innerHTML = weatherCardHTML;
    }

    /**
     * Define a mensagem de status (carregando, erro, etc.)
     */
    function setStatus(type, message = '') {
      statusEl.textContent = message;
      statusEl.className = `status ${type}`;
    }

    /**
     * Verifica se há um parâmetro "city" na URL ao carregar a página
     */
    function checkUrlForCity() {
      const urlParams = new URLSearchParams(window.location.search);
      const city = urlParams.get('city');
      if (city) {
        cityInput.value = city;
        form.dispatchEvent(new Event('submit'));
      }
    }
    
    // Inicia a verificação da URL quando a página é carregada
    window.addEventListener('load', checkUrlForCity);
