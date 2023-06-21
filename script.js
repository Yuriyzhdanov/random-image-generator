let pictures = [];

function generateImg() {
  const container = document.querySelector('.wrap-picture');
  container.innerHTML = '';

  if (pictures.length > 0) {
    let randomIdx = getRandomIndex();
    let imageSrc = pictures[randomIdx];

    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;

    container.appendChild(imageElement);
  }

  fetchRandomImage(); // Запрашиваем новую случайную картинку при каждом вызове generateImg()
}

function getRandomIndex() {
  return Math.floor(Math.random() * pictures.length);
}

function onGenerateClickHandler() {
  generateImg();
}

function addPicToCoursel(imageSrc) {
  const coursel = document.querySelector('.wrap-coursel');
  const imageInCoursel = document.createElement('img');
  imageInCoursel.src = imageSrc;
  coursel.appendChild(imageInCoursel);
}

const generateButton = document.querySelector('.generate-btn');
generateButton.onclick = onGenerateClickHandler;


function fetchRandomImage() {
  const accessKey = 'e_b8bORlFuCeYhZrun2tsufVV9FcybWl7Kw6yhTBFLM'; // Замените на свой ключ доступа Unsplash API
  const apiUrl = 'https://api.unsplash.com/photos/random';

  axios.get(apiUrl, {
      headers: {
        'Authorization': 'Client-ID ' + accessKey
      }
    })
    .then(response => {
      const imageSrc = response.data.urls.regular;
      pictures.push(imageSrc);
      addPicToCoursel(imageSrc);
    })
    .catch(error => {
      console.error('Ошибка при запросе случайного изображения:', error);
    });
}

function displayImage(imageSrc) {
  console.log(imageSrc);
}

fetchRandomImage();
