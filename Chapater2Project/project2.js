// Kendra Mannes
// 03/04/2025

// Initialize a string variable
var myName = "Kendra Mannes";

// Update the first paragraph with your name
var para1 = document.getElementById("p1");
para1.textContent = myName;

// Initialize two numeric variables
var n1 = 5;
var n2 = 8;

// Sum of the two numbers
var numberSum = n1 + n2;
document.getElementById("p2").textContent = numberSum;

// Product of the two numbers
var numberMult = n1 * n2;
document.getElementById("p3").textContent = numberMult;

// String and number concatenation
var myNameAddNum = myName + n1;
document.getElementById("p4").textContent = myNameAddNum;

// String and number multiplication (produces NaN)
var myNameMultNum = myName * n1;
document.getElementById("p5").textContent = myNameMultNum;

// Comparing age with multiplication result
var myAge = 25;
var ageCompare = myAge > numberMult;
document.getElementById("p6").textContent = ageCompare;
