'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// Render Country Function
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.currencies)[0].name
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.languages)[0]
            }</p>
          </div>
        </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
};

// Render Error Message Funtion
const renderError = function (message) {
  countriesContainer.insertAdjacentText('beforeend', message);
};

///////////////////////////////////////
// Old school XTMLHttp Request
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `
    <article class="country">
            <img class="country__img" src="${data.flags.png}" />
            <div class="country__data">
              <h3 class="country__name">${data.name.common}</h3>
              <h4 class="country__region">${data.region}</h4>
              <p class="country__row"><span>👫</span>${(
                +data.population / 1000000
              ).toFixed(1)}</p>
              <p class="country__row"><span>🗣️</span>${data.languages[0]}</p>
              <p class="country__row"><span>💰</span>${data.currencies[0]}</p>
            </div>
          </article>
    `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('portugal');
getCountryData('japan');
getCountryData('usa');
*/
////////////////////////////////////////////////////////////////////
// Callback Hell
/*
const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.currencies)[0].name
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.languages)[0]
            }</p>
          </div>
        </article>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  // Ajax call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    console.log(this.responseText);

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country 2
    const neighbour = data.borders?.[0]; // optional chainning to account for countries with no borders property
    // Ajax call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);
      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('portugal');
*/
/*
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/

// How we used to do it
/*
const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();
  */

////////////////////////////////////////////////////////////////////////////////////
// Promises and Fetch
// const request = fetch('https://restcountries.com/v3.1/name/portugal');
// console.log(request);

/*
const getCountryData = function(country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`).then(function(response){
    console.log(response);
   return response.json();
  }).then(function(data) {
    console.log(data);
    renderCountry(data[0])
    
  })
};
*/
/*
const getCountryData = function (country) {
  // Country 2
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      // Country 2
     return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
    }).then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'));
};
getCountryData('portugal');
*/
/////// Do not chain promise inside promise!!!!
/*
const getCountryData = function (country) {
  // Country 2
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      // Country 2
     return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`).then(response => response.json())
     .then(data => renderCountry(data[0], 'neighbour'));
    })
};
*/
/////////////////////////////////////////////////////////////////////////
// Handling Rejected Promises
/*
const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.log(err);
      renderError(`Something went wrong ${err.message}`)
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    })
};

btn.addEventListener('click', function () {
  getCountryData('gfdgdfgd');
});
*/

/////////////////////////////////////////////////////////////////////

const getJSON = function (url, errorMessage = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMessage} ${response.status}`);

    return response.json();
  });
};

// Throwing Errors Manually
/*
const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => {
      if (!response.ok) throw new Error(`Country not found ${response.status}`);
      return response.json()
    })
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];

      // Country 2
      return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
    })
    .then(response => response.json())
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.log(err);
      renderError(`Something went wrong ${err.message}`)
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    })
};

btn.addEventListener('click', function () {
  getCountryData('gfdgdfgd');
});
*/
/////////////////////////////////////////////////
// Refactore the code by adding getJSON helper function

const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders?.[0];
      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })
    .then(data => renderCountry(data[0], 'neighbour'))
    .catch(err => {
      console.log(err);
      renderError(`Something went wrong ${err.message}`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

// btn.addEventListener('click', function () {
//   getCountryData('australia');
// });

// getCountryData('australia');

////////////////////////
// Challenge 1
/*
const whereAmI = function (lat, lng) {
  getPosition().then(pos => {
    const {latitude: lat, longitute: lng} = pos.coords;

    return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  }).then(response => {
      if (!response.ok) {
        throw new Error(`Something went wrong ${response.status}`);
      }

      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      const countryName = data.country;

      return getCountryData(countryName);
    })
    .catch(err => {
      console.log(err);
      renderError(`Something went wrong ${err.message}`);
    });
};

whereAmI(-33.933, 18.474);
*/

////////////////////////////////////////////////////////////////
// Building a simple Promise
/*
const lotteryPromise = new Promise(function(resolve, reject) {

console.log("Lottery draw is happening ⭐🎉⭐");

setTimeout(function() {
  if (Math.random() >= 0.5) {
    resolve("You WIN 💲✨💲");
  } else {
    reject(new Error("You lost your money ❌❌❌"));
  }
}, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.log(err));

// Promisifying setTimeout
const wait = function(seconds) {
return new Promise(function(resolve) {
  setTimeout(resolve, seconds * 1000)
})
}

wait(2).then(() => {
  console.log('I waited for 2 seconds');
  return wait(1);
}).then(() => console.log('I waited for 1 second'))
*/
/*
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/
/*
Promise.resolve("abc").then(x => console.log(x));
Promise.reject('abc').catch(x => console.log(x));
*/

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// navigator.geolocation.getCurrentPosition(position => console.log(position), err => console.log(err));

// const getPosition = function() {
//   return new Promise(function(resolve, reject) {
//     navigator.geolocation.getCurrentPosition(position => resolve(position), err => reject(err));
//   })
// }

/*
const getPosition = function() {
  return new Promise(function(resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  })
};

// getPosition.then(pos => console.log(pos));

const whereAmI = function () {
  getPosition().then(pos => {
    console.log(pos);
    const {
      latitude: lat, longitude: lng} = pos.coords;

    return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
  }).then(response => {
      if (!response.ok) {
        throw new Error(`Something went wrong ${response.status}`);
      }

      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      const countryName = data.country;

      return getCountryData(countryName);
    })
    .catch(err => {
      console.log(err);
      renderError(`Something went wrong ${err.message}`);
    });
};

btn.addEventListener('click', whereAmI);
*/

//////////////////////////////////////////////////////////////
// Async/Await
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  // Geolocation
  try {
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');
    const dataGeo = await resGeo.json();

    // Country data
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${dataGeo.country}`
    );
    if (!res.ok) throw new Error('Problem getting country');
    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    renderError(err.message);

    // Reject promise returned from async function
    throw err;
  }
};
// whereAmI();
// console.log('FIRST');

// try {
//   let y = 1;
//   const x = 2;
//   x = 3
// } catch(err) {
//   alert(err.message);
// }

// console.log('1: Will get location');
// // const city = whereAmI();
// // console.log(city);
// whereAmI()
//   .then(city => console.log(city))
//   .catch(err => console.log(`2: ${err.message}`))
//   .finally(() => console.log('3: Finished getting location'));

(async function () {
  try {
    const city = await whereAmI();
    console.log(city);
  } catch (err) {
    console.log(err.message);
  } finally {
    console.log('something');
  }
})();
*/

///////////////////////////////////////////////////////////////////
// Running Promises in Parallel
/*
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(`https://restcountries.com/v3.1/name/${c1}`);
    // const [data2] = await getJSON(`https://restcountries.com/v3.1/name/${c2}`);
    // const [data3] = await getJSON(`https://restcountries.com/v3.1/name/${c3}`);

    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);

    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.log(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');
*/

/////////////////////////////////////////////////////////////////////////////////////////////
// Promise.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/italy`),
    getJSON(`https://restcountries.com/v3.1/name/egypt`),
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = function (seconds) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, seconds * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.com/v3.1/name/tanzania`),
  timeout(0.1),
])
  .then(res => console.log(res[0]))
  .catch(err => console.log(err));

// Promise.allSettled
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Anothe Success'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));

// Promise.any
Promise.any([
  Promise.resolve('Success ANY'),
  Promise.reject('Error ANY'),
  Promise.resolve('Another Success ANY'),
])
  .then(res => console.log(res))
  .catch(err => console.log(err));
