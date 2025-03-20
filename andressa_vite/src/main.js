import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'


document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Buscar Localização</h1>
    <div class="card">
      <input type="text" id="cityInput" placeholder="Digite o nome da cidade" />
      <button id="searchButton">Buscar</button>
    </div>
    <div id="result"></div>
  </div>
`

document.querySelector('#searchButton').addEventListener('click', async () => {
  const city = document.querySelector('#cityInput').value.trim();
  const resultDiv = document.querySelector('#result');
  resultDiv.innerHTML = '';

  if (!city) {
    resultDiv.textContent = 'Por favor, insira um nome de cidade válido.';
    return;
  }

  const apiKey = '6FWNYUNPUZ9FFC52DGQQDZENA';
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 400) {
        throw new Error('Localização inválida. Verifique o nome da cidade.');
      } else {
        throw new Error('Erro ao buscar os dados climáticos.');
      }
    }
    
    const data = await response.json();    
    const current = data.currentConditions;
    const forecast = data.days.slice(0, 3).map(day => `<p>${day.datetime}: ${day.temp}°C, ${day.conditions}</p>`).join('');
    
    resultDiv.innerHTML = `
      <h2>Clima em ${city}</h2>
      <p><strong>Temperatura:</strong> ${current.temp}°C</p>
      <p><strong>Condições:</strong> ${current.conditions}</p>
      <p><strong>Umidade:</strong> ${current.humidity}%</p>
      <h3>Previsão para os próximos dias:</h3>
      ${forecast}
    `;
  } catch (error) {
    resultDiv.textContent = error.message;
  }
});


