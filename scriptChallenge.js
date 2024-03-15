'use strict';

// The Event Loop in Practice
// console.log('Test start');
// setTimeout(() => console.log('0 sec timer', 0));
// Promise.resolve('Resolved promise 1').then(res => console.log(res));
// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 10000; i++) {
//     console.log(res);
//   }
// })
// console.log('Test end');
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const images = document.querySelector('.images');
let currentImage;

const createImg = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');

    // img.setAttribute('src', imgPath); below does the same
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

createImg('/img/img-1.jpg').then(() => {
return wait(2);
}).then(() => {
  currentImage.style.display = 'none';
  return createImg('/img/img-2.jpg');
}).then(() => {
  return wait(2);
}).then(() => {
  currentImage.style.display = 'none';
})
.catch(err => {
  console.log(err);
})


// JS solution
createImg('/img/img-1.jpg')
.then((img) => {
  currentImage = img;
  return wait(2);
  }).then(() => {
    currentImage.style.display = 'none';
    return createImg('/img/img-2.jpg');
  }).then((img) => {
    currentImage = img;
    return wait(2);
  }).then(() => {
    currentImage.style.display = 'none';
  })
  .catch(err => {
    console.log(err);
  })

