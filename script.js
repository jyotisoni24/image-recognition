/*const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const snapBtn = document.getElementById("snap");
const resultDiv = document.getElementById("result");

const modelURL = "/model/";
let model;
let maxPredictions;

// Load model and camera
async function init() {
  console.log("Model URL for model.json:", modelURL + "model.json");
  console.log("Model URL for metadata.json:", modelURL + "metadata.json");

  try {
    model = await tmImage.load(modelURL + "model.json", modelURL + "metadata.json");
    maxPredictions = model.getTotalClasses();
    console.log("✅ Model loaded");

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
      audio: false,
    });
    video.srcObject = stream;
  } catch (err) {
    console.error("❌ Error during init:", err);
    alert("Error loading model or accessing camera. Check console.");
  }
}
init();

// Load sustainability data
let sustainabilityData = {};
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    sustainabilityData = data;
  })
  .catch(err => {
    console.error("❌ Failed to load data.json:", err);
  });

// On button click, scan product
snapBtn.addEventListener("click", async () => {
  if (!model) {
    alert("Model not ready.");
    return;
  }

  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const prediction = await model.predict(canvas);
  prediction.sort((a, b) => b.probability - a.probability);

  const product = prediction[0].className;
  const prob = (prediction[0].probability * 100).toFixed(2);
  const info = sustainabilityData[product];

  if (!info) {
    resultDiv.innerHTML = `<h3>Product: ${product}</h3><p>No sustainability info found.</p>`;
    return;
  }

  resultDiv.innerHTML = `
    <h3>✅ Product: ${product} (${prob}% confidence)</h3>
    <ul>
      <li>♻️ Recyclable: ${info.recyclable ? "Yes" : "No"}</li>
      <li>🧴 Plastic: ${info.plastic ? "Yes" : "No"}</li>
      <li>🌿 Plant-Based: ${info.plant_based ? "Yes" : "No"}</li>
      <li>🌍 Carbon Footprint: ${info.carbon_footprint}</li>
      <li>📌 Notes: ${info.notes}</li>
    </ul>
  `;
});
*/

const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const snapBtn = document.getElementById("snap");
const resultDiv = document.getElementById("result");

const modelURL = "/model/";
let model;
let maxPredictions;

// Load model and camera
async function init() {
  console.log("Model URL for model.json:", modelURL + "model.json");
  console.log("Model URL for metadata.json:", modelURL + "metadata.json");

  try {
    model = await tmImage.load(modelURL + "model.json", modelURL + "metadata.json");
    maxPredictions = model.getTotalClasses();
    console.log("✅ Model loaded");

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
      audio: false,
    });
    video.srcObject = stream;
  } catch (err) {
    console.error("❌ Error during init:", err);
    alert("Error loading model or accessing camera. Check console.");
  }
}
init();

// Load sustainability data
let sustainabilityData = {};
fetch("data.json")
  .then(res => res.json())
  .then(data => {
    sustainabilityData = data;
  })
  .catch(err => {
    console.error("❌ Failed to load data.json:", err);
  });

// On button click, scan product
snapBtn.addEventListener("click", async () => {
  if (!model) {
    alert("Model not ready.");
    return;
  }

  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const prediction = await model.predict(canvas);
  prediction.sort((a, b) => b.probability - a.probability);

  const product = prediction[0].className;
  const prob = (prediction[0].probability * 100).toFixed(2);
  const info = sustainabilityData[product];

  if (!info) {
    resultDiv.innerHTML = `<h3>Product: ${product}</h3><p>No sustainability info found.</p>`;
    return;
  }

  // Card color logic
  let cardColor = "#e0fbe0"; // default green
  if (info.color_code === "Yellow") cardColor = "#fffbe0";
  if (info.color_code === "Red") cardColor = "#ffe0e0";

  // Badges
  const badges = info.badges ? info.badges.map(b => `<span class="badge">${b}</span>`).join(" ") : "";

  resultDiv.innerHTML = `
    <div class="green-card" style="background:${cardColor};">
      <h3>✅ ${product} </h3>
      <p><strong>Sustainability Score:</strong> <span style="font-size:1.2em;">${info.sustainability_score} / 100</span></p>
      <div class="esg">
        <strong>ESG:</strong>
        <span>🌱 E: ${info.esg.environmental}</span>
        <span>👥 S: ${info.esg.social}</span>
        <span>🏛️ G: ${info.esg.governance}</span>
      </div>
      <p><strong>Transport Impact:</strong> ${info.transport_impact}</p>
      <p><strong>Mode:</strong> ${info.transport_mode}</p>
      <div>${badges}</div>
      <ul>
        <li>♻️ Recyclable: ${info.recyclable ? "Yes" : "No"}</li>
        <li>🧴 Plastic: ${info.plastic ? "Yes" : "No"}</li>
        <li>🌿 Plant-Based: ${info.plant_based ? "Yes" : "No"}</li>
        <li>🌍 Carbon Footprint: ${info.carbon_footprint}</li>
        <li>📌 Notes: ${info.notes}</li>
      </ul>
      <div class="last-updated">Last Updated: ${info.last_updated}</div>
    </div>
  `;
});

