import {
  FaceDetector,
  FilesetResolver,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";

let total_times_clicked = 0

const button = document.getElementById("button")

button.onclick = loadResult

const initializefaceDetector = async () => {

  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
  );

  let faceDetector = await FaceDetector.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
      delegate: "GPU"
    },
  });

  const image = document.getElementById("image")

  const faceDetectorResult = faceDetector.detect(image).detections;

  return faceDetectorResult
};

export async function loadResult() {

  total_times_clicked = total_times_clicked + 1

  if (total_times_clicked == 1) {

    button.disabled = "true"
  }


  initializefaceDetector().then((res) => {
    const image = document.getElementById("image")

    const canvas = document.createElement("canvas")
    document.body.appendChild(canvas);

    canvas.width = image.width
    canvas.height = image.height
    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // Draw new image
    ctx.drawImage(image, 0, 0)
    ctx.strokeStyle = 'red';
    ctx.font = "bold 20px arial";
    ctx.fillStyle = "green";

    // Draw text

    ctx.beginPath();
    ctx.fillText("Confidence Level:", res[0].boundingBox.originX - 90, res[0].boundingBox.originY - 60, 180);

    ctx.fillText("" + Math.round(res[0].categories[0].score * 100) / 100, res[0].boundingBox.originX + 90, res[0].boundingBox.originY - 60, 180);

    // Draw bounding box

    ctx.lineWidth = 2;
    ctx.rect(res[0].boundingBox.originX, res[0].boundingBox.originY, res[0].boundingBox.width, res[0].boundingBox.height)
    ctx.stroke()



  })

}




