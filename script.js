let history = [];

let history = [];
let isDrawing = false;
let lastX = 0;
let lastY = 0;

const canvasColor = document.getElementById('canvasColor');
const canvas = document.getElementById('myCanvas');
const undoButton = document.getElementById('undoButton');
const ClrBtn = document.getElementById('ClrBtn');
const SaveBtn = document.getElementById('SaveBtn');
const fontPicker = document.getElementById('fontPicker');
const textInput = document.getElementById('textInput');
const colorPicker = document.getElementById('colorPicker'); // Missing variable
const fontSizePicker = document.getElementById('fontSizePicker'); // Missing variable

const ctx = canvas.getContext('2d');



const ctx = canvas.getContext('2d');

colorPicker.addEventListener('change', (event) => {
    ctx.fillStyle = event.target.value;
    ctx.strokeStyle = event.target.value;
});

canvasColor.addEventListener('change', (event) => {
    ctx.fillStyle = event.target.value;
    ctx.fillRect(0, 0, 800, 500);
});

canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
});

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        
        lastX = event.offsetX;
        lastY = event.offsetY;
    }
});

canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

fontSizePicker.addEventListener('change', (event) => {
    ctx.lineWidth = event.target.value;
});

ClrBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

SaveBtn.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());
    let link = document.createElement('a');
    
    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();
    
    link.click();
});
