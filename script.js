const apiUrl = "https://api.unsplash.com/photos/random";
const accessKey = "e_b8bORlFuCeYhZrun2tsufVV9FcybWl7Kw6yhTBFLM";

const imageContainer = document.getElementById("wrap-picture");
const courselWrap = document.querySelector(".wrap-coursel");
const headWrap = document.querySelector(".wrap-head");

const pictures = [];

async function fetchAndSaveImage() {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });

    const imageData = response.data;
    pictures.push(imageData);

    return imageData;
  } catch (error) {
    console.error("Error in receiving the image:", error);
    throw error;
  }
}


function displayImage() {
  const lastImageIndex = pictures.length - 1;
  const image = pictures[lastImageIndex];

  if (imageContainer) {
    imageContainer.innerHTML = `<img src="${image.urls.regular}" class="wrap-picture" alt="${image.alt_description}">`;
  }
}

function saveAndDisplayCurrentImage() {
  const currentImageIndex = pictures.length - 1;
  const currentImage = pictures[currentImageIndex];

  if (courselWrap) {
    const newImageElement = document.createElement("img");
    newImageElement.src = currentImage.urls.regular;
    newImageElement.className = "wrap-coursel";
    courselWrap.appendChild(newImageElement);
  }

  if (headWrap) {
    const author = currentImage.user.name;
    const attribution = `by ${author} on Unsplash`;
    headWrap.innerHTML = `<h4>${attribution}</h4>`;
  }
}


const generateBtn = document.querySelector(".generate-btn");
if (generateBtn) {
  generateBtn.addEventListener("click", () => {
    fetchAndSaveImage()
      .then(() => {

        displayImage();

        saveAndDisplayCurrentImage();

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
}
