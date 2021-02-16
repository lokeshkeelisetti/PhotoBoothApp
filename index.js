const supported = 'mediaDevices' in navigator;

if(supported){
    const player = document.getElementById('player');
    const capturedImages = document.getElementById('capturedImages');
    
    
    const captureButton = document.getElementById('capture');

    const constraints = {
        video: true,
    };

    
    captureButton.addEventListener('click', () => {
        let imageContainer =   document.createElement('div');
        imageContainer.classList.toggle('image');
        imageContainer.classList.toggle('m-2');


        // Draw the video frame to the canvas.
        const canvas = document.createElement('canvas');
        canvas.width = 320;
        canvas.height = 240;
        const context = canvas.getContext('2d');
        context.drawImage(player, 0, 0, canvas.width, canvas.height);
        imageContainer.appendChild(canvas);

        let buttonContainer = document.createElement('div');
        buttonContainer.classList.toggle('row');

        let saveButton = document.createElement('a');
        saveButton.classList.add('btn','btn-primary','ml-auto');
        saveButton.textContent = 'Save';
        saveButton.setAttribute('download', 'MyImage.png');
        saveButton.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
        buttonContainer.appendChild(saveButton);

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('btn','btn-danger','mr-auto','ml-2');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function(){
            capturedImages.removeChild(imageContainer);
        };
        buttonContainer.appendChild(deleteButton);

        imageContainer.appendChild(buttonContainer);

        capturedImages.appendChild(imageContainer);
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