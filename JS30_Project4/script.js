// Kendra Mannes 04/18/2025
/* Adapted from https://javascript30.com/ */
/* Greek Gods Type Aheap App */
/* New Information:
    replaced cities and states data with Greek gods and goddesses
    added JSON file with name, domain, image, and bio link
    displayed god cards with portrait images, domain info, and bio links
    adjusted styling for better image visibility
    all gods display by default on page load
    added a reset search button to clear input and reload all results
*/
const endpoint = 'greek_gods_data_local_images.json';

const gods = [];
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

const resetButton = document.createElement('button');
resetButton.textContent = 'Reset Search';
resetButton.classList.add('reset-btn');
searchInput.insertAdjacentElement('afterend', resetButton);

fetch(endpoint)
  .then(res => res.json())
  .then(data => {
    gods.push(...data);
    displayMatches(); 
  });

function findMatches(wordToMatch, gods) {
  if (!wordToMatch.trim()) return gods; 
  const regex = new RegExp(wordToMatch, 'gi');
  return gods.filter(god =>
    god.name.match(regex) || god.domain.match(regex)
  );
}

function displayMatches() {
  const matchArray = findMatches(searchInput.value, gods);
  const html = matchArray.map(god => {
    const regex = new RegExp(searchInput.value, 'gi');
    const name = god.name.replace(regex, `<span class="hl">${searchInput.value}</span>`);
    const domain = god.domain.replace(regex, `<span class="hl">${searchInput.value}</span>`);
    return `
      <li class="god-card">
        <img src="${god.image}" alt="${god.name}" class="god-img">
        <div class="god-info">
          <span class="name">${name}</span><br>
          <span class="domain">${domain}</span><br>
          <a href="${god.bio}" target="_blank">Read Bio →</a>
        </div>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html || `<li>No gods or domains match that search.</li>`;
}

searchInput.addEventListener('input', displayMatches);

resetButton.addEventListener('click', () => {
  searchInput.value = '';
  displayMatches();
});
