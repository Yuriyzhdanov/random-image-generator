
const pictures = [
  "./img/1.jpeg",
  "./img/2.jpeg",
  "./img/3.jpeg",
  "./img/4.jpeg",
  "./img/5.jpeg",
  "./img/6.jpeg",
  "./img/7.jpeg",
  "./img/8.jpeg",
  "./img/9.jpeg",
]

function generateImg() {
  const container = document.querySelector('.wrap-picture')
  container.innerHTML = ''

  let randomIdx = getRandomIndex()
  let imageSrc = pictures[randomIdx];

  const imageElement = document.createElement('img');
  imageElement.src = imageSrc;

  container.appendChild(imageElement);
  
  addPicToCoursel(imageSrc)
}

function getRandomIndex() {
  return Math.floor(Math.random() * pictures.length);
}

function onGenerateClickHandler (){
    generateImg()
}

function addPicToCoursel(imageSrc) {
  const coursel = document.querySelector('.wrap-coursel')
  const imageInCoursel = document.createElement ('img')
  imageInCoursel.src = imageSrc
  coursel.appendChild(imageInCoursel)
}


const generateButton = document.querySelector('.generate-btn')
generateButton.onclick = onGenerateClickHandler 



