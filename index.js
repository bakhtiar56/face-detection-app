import {
    FaceDetector,
    FilesetResolver,
  } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0";


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
  
            console.log(image)
            const faceDetectorResult = faceDetector.detect(image).detections;
            console.log(faceDetectorResult)
            return faceDetectorResult
  };

  async function  load(){
 

  


  initializefaceDetector().then((res)=> {
    const image = document.getElementById("image")
 
    const canvas=document.createElement("canvas")
    document.body.appendChild(canvas);

    canvas.width=image.width
    canvas.height=image.height
    const ctx=canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(image,0,0)
    ctx.strokeStyle = 'red';
    ctx.font = "bold 30px arial";

    ctx.beginPath();
    ctx.fillText("Confidence Level:",res[0].boundingBox.originX-150 , res[0].boundingBox.originY-50,180);
    ctx.fillText(""+Math.round(res[0].categories[0].score*100)/100,res[0].boundingBox.originX+40, res[0].boundingBox.originY-50,180);


    console.log(res[0].boundingBox.originX)
    ctx.lineWidth=2;
  ctx.rect(res[0].boundingBox.originX, res[0].boundingBox.originY, res[0].boundingBox.width, res[0].boundingBox.height)
    ctx.stroke()



  })





  }
  load()


