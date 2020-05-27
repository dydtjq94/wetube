const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

// Blob을 다운받기 webm은 open source라서 webm으로!
const handleVideoData = (event) => {
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  link.innerHTML = "너의 녹화영상";
  document.body.appendChild(link);
  //fake link를 통해 링크를 누른 것처럼 만들자!
  link.click();
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start Recording";
  streamObject.getVideoTracks()[0].stop();
  streamObject.getAudioTracks()[0].stop();
};

// 얻어온 video를 어딘가에 저장 하는 것
const startRecording = () => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  recordBtn.addEventListener("click", stopRecording);
  videoRecorder.addEventListener("dataavailable", handleVideoData);
};

// video를 얻어오는 작업
const getVideo = async () => {
  try {
    // user가 우리한테 대답할떄까지 기다리기 위해서 await 이용
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "Stop Recording";
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = "😩 동영상 업로드 불가능!";
  } finally {
    //   try나 catch가 되고 나면 실행할 수 있는것
    recordBtn.removeEventListener("click", getVideo);
  }
};

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
  init();
}
