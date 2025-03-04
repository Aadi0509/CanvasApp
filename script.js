document.addEventListener("DOMContentLoaded", () => {
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
    const colorPicker = document.getElementById('colorPicker');
    const fontSizePicker = document.getElementById('fontSizePicker');

    if (!canvas) {
        console.error("Canvas element not found!");
        return;
    }

    const ctx = canvas.getContext('2d');

    if (colorPicker) {
        colorPicker.addEventListener('change', (event) => {
            ctx.fillStyle = event.target.value;
            ctx.strokeStyle = event.target.value;
        });
    }

    if (canvasColor) {
        canvasColor.addEventListener('change', (event) => {
            ctx.fillStyle = event.target.value;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        });
    }

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
        history.push(canvas.toDataURL()); 
    });

    if (fontSizePicker) {
        fontSizePicker.addEventListener('change', (event) => {
            ctx.lineWidth = event.target.value;
        });
    }

    if (ClrBtn) {
        ClrBtn.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
    }

    if (SaveBtn) {
        SaveBtn.addEventListener('click', () => {
            localStorage.setItem('canvasContents', canvas.toDataURL());
            let link = document.createElement('a');
            link.download = 'my-canvas.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    }

    if (undoButton) {
        undoButton.addEventListener('click', () => {
            if (history.length > 0) {
                let img = new Image();
                img.src = history.pop();
                img.onload = () => {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                };
            }
        });
    }

    let savedImage = localStorage.getItem('canvasContents');
    if (savedImage) {
        let img = new Image();
        img.src = savedImage;
        img.onload = () => ctx.drawImage(img, 0, 0);
    }
});
