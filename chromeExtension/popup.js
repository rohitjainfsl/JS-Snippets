document.getElementById("click-me").addEventListener("click", function () {
  const color = document.getElementById("color-input").value;
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      function: setPageBackgroundColor,
      args: [color],
    });
  });
});

function setPageBackgroundColor(color) {
  function isValidColor(strColor) {
    const s = new Option().style;
    s.color = strColor;
    return s.color !== "";
  }
  if (isValidColor(color)) {
    document.body.style.backgroundColor = color;
  } else {
    alert("Incorrect value. Please enter a valid color.");
  }
}
