const URL = "https://teachablemachine.withgoogle.com/models/-GzZGQFKW/";
// let model, webcam, labelContainer, maxPredictions;

function showImageUpload() {
  document.getElementById("image_upload_div").style.display = "";
  removeWebcam();
}

function removeWebcam() {
  document.getElementById("webcam-container").innerHTML = "";
  document.getElementById("label-container").innerHTML - "";
  webcam.stop();
}

async function int2() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();
  labelContainer = document.getElementById("result");
  for (let i = 0; i < maxPredictions; i++) {
    labelContainer.appendChild(document.createElement("div"));
  }
}

async function predict2(image) {
  const prediction = await model.predict(image);
  for (let i = 0; i < maxPredictions; i++) {
    const classPrediction =
      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
    labelContainer.childNodes[i].innerHTML = classPrediction;
  }
}

async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = async function (e) {
      const img = new Image();
      img.src = e.target.result;
      img.onload = async function () {
        document.getElementById("preview").src = img.src;
        document.getElementById("preview").style.display = "block";
        await predict2(img);
      };
    };
    reader.readAsDataURL(file);
  }
}

int2();
// document.getElementById("imageUpload").addEventListener("change", handleImageUpload);
