const throttle = require('lodash.throttle');
const feedbackFormEl = document.querySelector('.feedback-form');
const inputEmail = document.querySelector('.feedback-form input');
const inputText = document.querySelector('.feedback-form textarea');
let feedbackFormData = {};
const STORAGE_KEY = 'feedback-form-state';

function onFormAreaInput(evt) {
  feedbackFormData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackFormData));
}

function onFormSubmit(evt) {
  evt.preventDefault();
  evt.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  feedbackFormData = {};
};

function fillFormAreaInput() {
  const savedInput = localStorage.getItem(STORAGE_KEY);
  const savedInputParsed = JSON.parse(savedInput);

  if (savedInputParsed && savedInputParsed.email) {
    inputEmail.value = savedInputParsed.email;
    feedbackFormData.email = savedInputParsed.email;
  };

  if (savedInputParsed && savedInputParsed.message) {
    inputText.value = savedInputParsed.message;
    feedbackFormData.message = savedInputParsed.message;
  };
}

fillFormAreaInput();
feedbackFormEl.addEventListener('input', throttle(onFormAreaInput, 500));
feedbackFormEl.addEventListener('submit', onFormSubmit);
