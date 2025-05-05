// Kendra Mannes 05/05/2025 //
// Javascript Final Exam //
// Calculator Script //

function calculateAddition(num) {
  let result = '';
  for (let i = 1; i <= 10; i++) {
    result += `${num} + ${i} = ${num + i}\n`;
  }
  document.getElementById('addition').textContent = result;
}

function calculateSubtraction(num) {
  let result = '';
  let i = 1;
  while (i <= 10) {
    result += `${num} - ${i} = ${num - i}\n`;
    i++;
  }
  document.getElementById('subtraction').textContent = result;
}

function calculateMultiplication(num) {
  let result = '';
  let i = 1;
  do {
    result += `${num} * ${i} = ${num * i}\n`;
    i++;
  } while (i <= 10);
  document.getElementById('multiplication').textContent = result;
}

function calculateDivision(num) {
  let result = '';
  for (let i = 1; i <= 10; i++) {
    result += `${num} / ${i} = ${(num / i).toFixed(2)}\n`;
  }
  document.getElementById('division').textContent = result;
}
function clearResults() {
  ['addition', 'subtraction', 'multiplication', 'division'].forEach(id => {
    document.getElementById(id).textContent = '';
  });
}

function runAllCalculations() {
  const numInput = document.getElementById('num');
  const num = Number(numInput.value);
  if (!isNaN(num)) {
    clearResults();
    calculateAddition(num);
    calculateSubtraction(num);
    calculateMultiplication(num);
    calculateDivision(num);
  } else {
    alert('Please enter a valid number.');
  }
}

document.getElementById('calculate-btn').addEventListener('click', runAllCalculations);
