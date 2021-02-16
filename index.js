const supported = 'mediaDevices' in navigator;

if(supported){
    const player = document.getElementById('player');
    const capturedImages = document.getElementById('capturedImages');
    
    
    const captureButton = document.getElementById('capture');

    const constraints = {
        video: true,
    };

    captureButton.addEventListener('click', () => {
        // Draw the video frame to the canvas.
        const canvas = document.createElement('canvas');
        canvas.classList.toggle('image');
        canvas.width = 320;
        canvas.height = 240;
        const context = canvas.getContext('2d');
        context.drawImage(player, 0, 0, canvas.width, canvas.height);
        //console.log(canvas);
        capturedImages.appendChild(canvas);
    });


    // Attach the video stream to the video element and autoplay.
    navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
        player.srcObject = stream;
        });
}
else{
    alert('the app is not supported in the browser')
}