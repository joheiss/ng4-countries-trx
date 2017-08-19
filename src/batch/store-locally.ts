import {writeFile} from 'fs';
import fetch from 'node-fetch';

fetch('https://restcountries.eu/rest/v2/all', {
  method: 'get'
})
  .then(response => response.json())
  .then(body => {
    writeFile('countries.json', JSON.stringify(body), 'utf-8', err => {
      if (err) {
        console.error(err);
      }
      console.log('Success: > countries.json');
    });
  })
  .catch(function (err) {
    console.error(err);
  });

console.log('batch finished ...');
