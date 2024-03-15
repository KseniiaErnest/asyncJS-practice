'use strict';

const images = document.querySelector('.images');
let currentImage;

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImg = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      images.append(img);
      currentImage = img;
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

///// Part 1
// My version
const loadNPause = async function () {
  try {
    const img = await createImg('/img/img-1.jpg');
    currentImage = await img;
    await wait(2);
    currentImage.style.display = 'none';
    const img2 = await createImg('/img/img-2.jpg');
    currentImage = await img2;
    await wait(2);
    currentImage.style.display = 'none';
  } catch (err) {
    console.log(err);
  }
};

// JS version: no need in global variable currentImage as we are in the same code block: try
const loadNPause2 = async function () {
  try {
    // Load image 1
    let img = await createImg('/img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    img.style.display = 'none';

    // Load img 2
    img = await createImg('/img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    img.style.display = 'none';
  } catch (err) {
    console.log(err);
  }
};

// loadNPause();

//// Part 2
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async img => await createImg(img));

    const allImages = await Promise.all(imgs);
    allImages.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.log(err);
  }
};

loadAll(['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg']);
