//Kendra Mannes 04/01/2025
/*Adapted from https://javascript30.com/ */
/*Javascript Drawing App*/
/* New Information:
    removed rainbow brush strokes
    add refernce image next to canvas
    add undo and redo buttons
    add save button to download PNG image
    add clear button to reset the canvas
    add image selector dropdown updates the reference image
*/

const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');
const brushSize = document.getElementById('brushSize');
const colorPicker = document.getElementById('colorPicker');
const undoBtn = document.getElementById('undo');
const redoBtn = document.getElementById('redo');
const clearBtn = document.getElementById('clear');
const saveBtn = document.getElementById('save');
const swatches = document.querySelectorAll('.color-btn');

canvas.width = 600;
canvas.height = 600;

ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = brushSize.value;
ctx.strokeStyle = colorPicker.value;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

const undoStack = [];
const redoStack = [];

function saveState(stack, limit = 50) {
  if (stack.length >= limit) stack.shift();
  stack.push(canvas.toDataURL());
}

function restoreState(stack, oppositeStack) {
  if (!stack.length) return;
  saveState(oppositeStack);
  const img = new Image();
  img.src = stack.pop();
  img.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  };
}

function draw(e) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousedown', (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
  saveState(undoStack);
  redoStack.length = 0;
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);

brushSize.addEventListener('input', () => {
  ctx.lineWidth = brushSize.value;
});

colorPicker.addEventListener('input', () => {
  ctx.strokeStyle = colorPicker.value;
});

swatches.forEach(btn => {
  btn.addEventListener('click', () => {
    ctx.strokeStyle = btn.dataset.color;
    colorPicker.value = btn.dataset.color;
  });
});

undoBtn.addEventListener('click', () => restoreState(undoStack, redoStack));
redoBtn.addEventListener('click', () => restoreState(redoStack, undoStack));

clearBtn.addEventListener('click', () => {
  saveState(undoStack);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.download = 'my_drawing.png';
  link.href = canvas.toDataURL();
  link.click();
});

const imageSelect = document.getElementById('imageSelect');
const referenceImage = document.getElementById('reference');

imageSelect.addEventListener('change', (e) => {
  referenceImage.src = e.target.value;
});

  
