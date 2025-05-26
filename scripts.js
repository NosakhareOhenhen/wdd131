// Set current year
document.getElementById("year").textContent = new Date().getFullYear();

// Set last modified
document.getElementById("modified").textContent = document.lastModified;

// Wind chill calculation
function calculateWindChill(temp, speed) {
  return (
    13.12 +
    0.6215 * temp -
    11.37 * Math.pow(speed, 0.16) +
    0.3965 * temp * Math.pow(speed, 0.16)
  ).toFixed(1);
}

const temp = parseFloat(document.getElementById("temp").textContent);
const speed = parseFloat(document.getElementById("speed").textContent);
const windchillEl = document.getElementById("windchill");

if (temp <= 10 && speed > 4.8) {
  windchillEl.textContent = calculateWindChill(temp, speed) + " °C";
} else {
  windchillEl.textContent = "N/A";
}
