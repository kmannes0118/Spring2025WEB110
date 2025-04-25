
// Kendra Mannes 04/25/2025
/* Adapted from https://javascript30.com/ */
/* Photo Filters App */

/* New Information:
added dropdown image selector
added reset button
added a user upload option
added nav bar with editing options
added grayscale and brightness variables
*/

const inputs = document.querySelectorAll('.controls input[type="range"], .controls input[type="color"]');
const image = document.getElementById('main-image');
const imagePicker = document.getElementById('image-picker');
const imageUpload = document.getElementById('image-upload');
const resetButton = document.getElementById('reset');

function handleUpdate() {
  const suffix = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);

  const displayVal = document.getElementById(`${this.name}-val`);
  if (displayVal) displayVal.textContent = this.value;
}

inputs.forEach(input => {
  input.addEventListener('input', handleUpdate);
  input.addEventListener('change', handleUpdate);
});

imagePicker.addEventListener('change', function () {
  console.log('Selected image value:', this.value);
  image.src = this.value;
  image.onerror = () => alert("Image failed to load. Check filename or path.");
});

imageUpload.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      image.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

resetButton.addEventListener('click', () => {
  const defaults = {
    spacing: 10,
    blur: 0,
    grayscale: 0,
    brightness: 100,
    base: '#ffc600'
  };

  for (let key in defaults) {
    const val = defaults[key];
    const suffix = (key === 'blur' || key === 'spacing') ? 'px' :
                   (key === 'grayscale' || key === 'brightness') ? '%' : '';
    document.documentElement.style.setProperty(`--${key}`, val + suffix);

    const input = document.querySelector(`input[name="${key}"]`);
    if (input) input.value = val;

    const span = document.getElementById(`${key}-val`);
    if (span) span.textContent = val;
  }

  image.src = 'forest.jpg';
  imagePicker.value = 'forest.jpg';
  imageUpload.value = '';
});
