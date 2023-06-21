const accessKey = "e_b8bORlFuCeYhZrun2tsufVV9FcybWl7Kw6yhTBFLM"; // Замените на свой ключ доступа Unsplash API
const apiUrl = "https://api.unsplash.com/photos/random";

// Константы для доступа к элементам DOM
const imageContainer = document.getElementById("imageContainer");
const courselWrap = document.querySelector(".wrap-coursel");
const headWrap = document.querySelector(".wrap-head");

// Массив для хранения полученных изображений
const pictures = [];

// Функция для асинхронного получения и сохранения изображения
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
    console.error("Ошибка при получении изображения:", error);
    throw error;
  }
}

// Функция для отображения изображения с классом "wrap-picture"
function displayImage() {
  const lastImageIndex = pictures.length - 1;
  const image = pictures[lastImageIndex];

  if (imageContainer) {
    imageContainer.innerHTML = `<img src="${image.urls.regular}" class="wrap-picture" alt="${image.alt_description}">`;
  }
}

// Функция для сохранения текущего изображения с классом "wrap-coursel"
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
    headWrap.innerHTML = `<h4>${currentImage.alt_description} by ${currentImage.user.name}</h4>`;
  }
}

// Обработчик события для кнопки "Generate"
const generateBtn = document.querySelector(".generate-btn");
if (generateBtn) {
  generateBtn.addEventListener("click", () => {
    fetchAndSaveImage()
      .then(() => {
        // Вызываем функцию displayImage для отображения изображения
        displayImage();

        // Вызываем функцию saveAndDisplayCurrentImage для сохранения и отображения данных изображения
        saveAndDisplayCurrentImage();
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  });
}
