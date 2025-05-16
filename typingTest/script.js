const quoteDisplay = document.getElementById('quote');
const textarea = document.getElementById('textarea');
const resultDisplay = document.getElementById('result');

// Sample quote for testing
const quote = "My name is Khan.";

// Function to calculate typing speed and accuracy
function calculateResult() {
  const typedText = textarea.value.trim();
  const words = typedText.split(/\s+/).filter(word => word.length > 0);
  const totalWords = quote.split(/\s+/).filter(word => word.length > 0).length;
  const correctWords = words.filter(word => quote.includes(word)).length;
  const accuracy = Math.round((correctWords / totalWords) * 100);
  const typingDuration = new Date().getTime() - startTime;
  const wpm = Math.round((correctWords / (typingDuration / 60000)) * 100) / 100;

  const result = `Words per minute: ${wpm}\nAccuracy: ${accuracy}%`;
  resultDisplay.textContent = result;
}

// Initialize the quote display
quoteDisplay.textContent = quote;

let startTime;

// Event listener for the textarea
textarea.addEventListener('input', () => {
  if (textarea.value.trim() === '') {
    startTime = null;
  } else if (!startTime) {
    startTime = new Date().getTime();
  }
});

// Event listener for the textarea's keyup event
textarea.addEventListener('keyup', () => {
  const typedText = textarea.value.trim();
  if (typedText === quote) {
    calculateResult();
    textarea.disabled = true;
  }
});