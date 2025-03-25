import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const inputValue = document.querySelector('input[name="delay"]');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const delay = Number(inputValue.value);
  const selectedOption = document.querySelector('input[name="state"]:checked');

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedOption.value === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  })
    .then((value) => {
      console.log(value);
      iziToast.show({
        title: 'Success', message: value, backgroundColor: '#00cc66', position: 'topRight',
      });
    })
    .catch((error) => {
      console.log(error);
      iziToast.show({
        title: 'Rejected', message: error, backgroundColor: '#ff6666', position: 'topRight',
      });
    });
});
