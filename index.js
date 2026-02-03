let noiseValues = [];
let maxNoise = 0;
let alertCount = 0;

// get card elements
const avgEl = document.querySelector(".bg-primary .card-text");
const maxEl = document.querySelector(".bg-success .card-text");
const alertEl = document.querySelector(".bg-warning .card-text");
const sensorEl = document.querySelector(".bg-info .card-text");

// sensors online (demo: 1 sensor)
sensorEl.textContent = "1";

// chart setup
const ctx = document.getElementById("noiseChart").getContext("2d");
const noiseChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: [],
    datasets: [{
      label: "Noise Level (dB)",
      data: [],
      borderColor: "rgba(13,110,253,1)",
      backgroundColor: "rgba(13,110,253,0.2)",
      fill: true,
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    plugins: { legend: { display: false } }
  }
});

// MAIN FUNCTION (this connects everything)
function updateNoiseSystem(noise) {

  // save noise
  noiseValues.push(noise);

  // max noise
  if (noise > maxNoise) {
    maxNoise = noise;
  }

  // average noise
  const sum = noiseValues.reduce((a, b) => a + b, 0);
  const average = Math.round(sum / noiseValues.length);

  // alert logic
  if (noise >= 80) {
    alertCount++;
  }

  // update cards
  avgEl.textContent = average + " dB";
  maxEl.textContent = maxNoise + " dB";
  alertEl.textContent = alertCount;

  // update chart
  noiseChart.data.labels.push(new Date().toLocaleTimeString());
  noiseChart.data.datasets[0].data.push(noise);

  // limit chart points
  if (noiseChart.data.labels.length > 10) {
    noiseChart.data.labels.shift();
    noiseChart.data.datasets[0].data.shift();
  }

  noiseChart.update();
}

// DEMO: simulate live noise every second
setInterval(() => {
  const simulatedNoise = Math.floor(Math.random() * 100);
  updateNoiseSystem(simulatedNoise);
}, 1000);

document.addEventListener('DOMContentLoaded', function() {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      height: 300
    });
    calendar.render();
  });

  