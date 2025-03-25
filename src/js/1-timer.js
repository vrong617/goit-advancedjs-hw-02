import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

const dateInput = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysDom = document.querySelector("[data-days]");
const hoursDom = document.querySelector("[data-hours]");
const minutesDom = document.querySelector("[data-minutes]");
const secondsDom = document.querySelector("[data-seconds]");

const container = document.querySelector(".container");
const inputGroup = document.createElement("div");
inputGroup.classList.add("input-group");

inputGroup.appendChild(dateInput);
inputGroup.appendChild(startButton);
container.insertBefore(inputGroup, container.querySelector(".timer"));

startButton.disabled = true;
let userSelectedDate = null;

const showInvalidDateToast = () => {
  iziToast.show({
    title: "Invalid Date",
    message: "Please choose a date in the future",
    backgroundColor: "#ff6666",
    position: "topRight",
  });
};

flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0]?.getTime();
    if (!userSelectedDate || userSelectedDate < Date.now()) {
      showInvalidDateToast();
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

startButton.addEventListener("click", () => {
  startButton.disabled = true;

  const intervalId = setInterval(() => {
    const diff = userSelectedDate - Date.now();
    if (diff <= 0) {
      clearInterval(intervalId);
      return;
    }

    console.log("Time remaining:", convertMs(diff));

    const { days, hours, minutes, seconds } = convertMs(diff);

    daysDom.textContent = days.toString().padStart(2, "0");
    hoursDom.textContent = hours.toString().padStart(2, "0");
    minutesDom.textContent = minutes.toString().padStart(2, "0");
    secondsDom.textContent = seconds.toString().padStart(2, "0");
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
  };
}
