//Kendra Mannes 04/01/2025
/*Adapted from https://javascript30.com/ */
/*Javascript Alarm Clock*/
/* New Information:
    added a digital clock display
    added date display
    added alarm feature
    background changes based on time of day
*/
const secondHand = document.querySelector('.second-hand');
const minsHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const hourDigital = document.querySelector('.hour-digital');
const minuteDigital = document.querySelector('.minute-digital');
const secondDigital = document.querySelector('.second-digital');
const day = document.querySelector('.day');
const month = document.querySelector('.month');
const date = document.querySelector('.date');
const year = document.querySelector('.year');
const alarmStatus = document.querySelector('#alarm-status');

function setDate() {
  const now = new Date();

  // Update Analog Clock
  const seconds = now.getSeconds();
  const secondsDegrees = ((seconds / 60) * 360) + 90;
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

  const mins = now.getMinutes();
  const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
  minsHand.style.transform = `rotate(${minsDegrees}deg)`;

  const hour = now.getHours();
  const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;

  // Update Digital Time
  hourDigital.textContent = now.getHours().toString().padStart(2, '0');
  minuteDigital.textContent = now.getMinutes().toString().padStart(2, '0');
  secondDigital.textContent = now.getSeconds().toString().padStart(2, '0');

  // Update Date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = now.toLocaleDateString(undefined, options);
  [day.textContent, month.textContent, date.textContent, year.textContent] = formattedDate.split(/,|\s/);

  // Change Background Color Based on Time
  updateBackground(now.getHours());
}

function updateBackground(hour) {
  if (hour >= 6 && hour < 12) {
    document.body.style.background = 'linear-gradient(to right, #FF7E5F, #FEB47B)'; // Morning colors
  } else if (hour >= 12 && hour < 18) {
    document.body.style.background = 'linear-gradient(to right, #6a11cb, #2575fc)'; // Daytime colors
  } else {
    document.body.style.background = 'linear-gradient(to right, #000428, #004e92)'; // Nighttime colors
  }
}
//Add alarm feature
function setAlarm() {
  const alarmTime = document.querySelector('#alarm-time').value;
  const alarmHour = parseInt(alarmTime.split(':')[0], 10);
  const alarmMinute = parseInt(alarmTime.split(':')[1], 10);
  const now = new Date();

  const alarmTimeInMs = new Date(now.getFullYear(), now.getMonth(), now.getDate(), alarmHour, alarmMinute).getTime();
  const timeDifference = alarmTimeInMs - now.getTime();

  if (timeDifference > 0) {
    alarmStatus.textContent = `Alarm set for ${alarmTime}.`;
    setTimeout(() => {
      alert('Time to wake up!');
    }, timeDifference);
  } else {
    alarmStatus.textContent = 'Please set a valid time in the future.';
  }
}

setInterval(setDate, 1000);
setDate();
