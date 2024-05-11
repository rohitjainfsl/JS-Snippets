chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.scripting.executeScript(
    {
      target: { tabId: tabs[0].id },
      function: fetchImages,
    },
    (injectionResults) => {
      if (
        chrome.runtime.lastError ||
        !injectionResults ||
        !injectionResults.length
      ) {
        console.error("Script injection failed: ", chrome.runtime.lastError);
        return;
      }
      displayImages(injectionResults[0].result);
    }
  );
});

function displayImages(imageUrls) {
  const container = document.getElementById("image-container");
  if (!imageUrls.length) {
    container.textContent = "No images found.";
    return;
  }
  imageUrls.forEach((src) => {
    const imgElement = document.createElement("img");
    imgElement.src = src;
    imgElement.style.width = "100px"; // Example styling
    container.appendChild(imgElement);
  });
}

function fetchImages() {
  const images = Array.from(document.querySelectorAll("img")).map(
    (img) => img.src
  );
  return images.filter(
    (src) =>
      src.endsWith(".jpg") || src.endsWith(".png") || src.endsWith(".svg")
  );
}

//   chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     if (request.images) {
//       const container = document.getElementById("image-container");
//       container.innerHTML = "";
//       request.images.forEach((src) => {
//         const imgElement = document.createElement("img");
//         imgElement.src = src;
//         imgElement.style.width = "100px";
//         container.appendChild(imgElement);
//       });
//     }
//   });

document.getElementById("download-all").addEventListener("click", function () {
  const images = document.querySelectorAll("#image-container img");
  images.forEach((img) => {
    chrome.downloads.download({ url: img.src });
  });
});

document
  .getElementById("download-selected")
  .addEventListener("click", function () {
    const selectedImages = document.querySelectorAll(
      "#image-container img.selected"
    );
    selectedImages.forEach((img) => {
      chrome.downloads.download({ url: img.src });
    });
  });

document
  .getElementById("image-container")
  .addEventListener("click", function (event) {
    if (event.target.tagName === "IMG") {
      event.target.classList.toggle("selected");
    }
  });
