const colorPicker = document.getElementById('colorPicker');
const canvasColor = document.getElementById('canvasColor');
const canvas = document.getElementById('myCanvas');
const clearButton = document.getElementById('clearBtn');
const saveButton = document.getElementById('saveBtn');
const fontSize = document.getElementById('fontSize'); 
const retrieveButton = document.getElementById('retrieveBtn');

const ctx = canvas.getContext('2d');

colorPicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle = e.target.value;
})

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
})

canvas.addEventListener('touchstart', (e) => {
    isDrawing = true;
    lastX = e.touches[0].clientX - canvas.offsetLeft;
    lastY = e.touches[0].clientY - canvas.offsetTop;

    e.preventDefault();
})

canvas.addEventListener('touchmove', (e) => {
    if (isDrawing) {
        const x = e.touches[0].clientX - canvas.offsetLeft;
        const y = e.touches[0].clientY - canvas.offsetTop;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        lastX = x;
        lastY = y;
    }
    e.preventDefault(); 
});

canvas.addEventListener('touchend', () => {
    isDrawing = false;
});



canvas.addEventListener('mousemove', (event) => {
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();

        lastX = event.offsetX;
        lastY = event.offsetY;
    }

})

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
})

canvasColor.addEventListener('change', (e) => {
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
})

fontSize.addEventListener('change', (e) => {
    ctx.lineWidth = e.target.value;
})

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

saveButton.addEventListener('click', () => {
    localStorage.setItem('canvasContent', canvas.toDataURL());

    let link = document.createElement('a');
    link.download = 'canvas.png';

    link.href = canvas.toDataURL();

    link.click();
})

retrieveButton.addEventListener('click', () => {
    let savedCanvas = localStorage.getItem('canvasContent');

    if(savedCanvas){
        let img = new Image();
        img.src = savedCanvas;

        ctx.drawImage(img, 0, 0);
    }
})

