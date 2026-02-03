let noiseValues = [];
let maxNoise = 0;
let alertCount = 0;
let sensorID = 1; // example sensor

// get card elements
const avgEl = document.querySelector(".bg-primary .card-text");
const maxEl = document.querySelector(".bg-success .card-text");
const alertEl = document.querySelector(".bg-warning .card-text");
const sensorEl = document.querySelector(".bg-info .card-text");

// sensors online (demo: 1 sensor)
sensorEl.textContent = sensorID;

// chart setup
const ctx = document.getElementById("noiseChart").getContext("2d");
const noiseChart = new Chart(ctx, {
  type: "line",
  data: { labels: [], datasets: [{ label: "Noise Level (dB)", data: [], borderColor: "rgba(13,110,253,1)", backgroundColor: "rgba(13,110,253,0.2)", fill: true, tension: 0.3 }] },
  options: { responsive: true, plugins: { legend: { display: false } } }
});

// alert table
const alertTableBody = document.querySelector("#alertTable tbody");

// MAIN FUNCTION
function updateNoiseSystem(noise) {

  // save noise
  noiseValues.push(noise);

  // max noise
  if (noise > maxNoise) maxNoise = noise;

  // average noise
  const sum = noiseValues.reduce((a, b) => a + b, 0);
  const average = Math.round(sum / noiseValues.length);

  // ALERT logic
  if (noise >= 80) {
    alertCount++;
    
    // record time & date
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();

    // add row to table
    const row = document.createElement("tr");
    row.innerHTML = `<td>${time}</td><td>${date}</td><td>${noise}</td><td>${sensorID}</td>`;
    alertTableBody.prepend(row); // newest on top
  }

  // update cards
  avgEl.textContent = average + " dB";
  maxEl.textContent = maxNoise + " dB";
  alertEl.textContent = alertCount;

  // update chart
  noiseChart.data.labels.push(new Date().toLocaleTimeString());
  noiseChart.data.datasets[0].data.push(noise);
  if (noiseChart.data.labels.length > 10) {
    noiseChart.data.labels.shift();
    noiseChart.data.datasets[0].data.shift();
  }
  noiseChart.update();
}

// simulate live noise
setInterval(() => {
  const simulatedNoise = Math.floor(Math.random() * 100);
  updateNoiseSystem(simulatedNoise);
}, 1000);

// Calendar
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    height: 300
  });
  calendar.render();
});
if (noise >= 80) {
  alertCount++;
  
  const now = new Date();
  const alertData = {
    time: now.toLocaleTimeString(),
    date: now.toLocaleDateString(),
    noise: noise,
    sensor: sensorID
  };

  // Add to table
  const row = document.createElement("tr");
  row.innerHTML = `<td>${alertData.time}</td><td>${alertData.date}</td><td>${alertData.noise}</td><td>${alertData.sensor}</td>`;
  alertTableBody.prepend(row);

  // Save alert to LocalStorage
  let allAlerts = JSON.parse(localStorage.getItem("alerts")) || [];
  allAlerts.push(alertData);
  localStorage.setItem("alerts", JSON.stringify(allAlerts));
}
