'use strict';

const whereAmI = function (lat, lng) {
  // Reverse geocoding
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Something went wrong ${response.status}`);
      }

      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      const country = data.country;
    })
    .catch(err => {
      console.log(err);
    });
};

whereAmI(52.508, 13.381);