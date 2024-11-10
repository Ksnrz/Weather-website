document.addEventListener("DOMContentLoaded", () => {
  let [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
  let hourElement = document.querySelector(".hours");
  let minuteElement = document.querySelector(".minutes");
  let secondElement = document.querySelector(".seconds");
  let milliElement = document.querySelector(".milli-seconds");
  let timer = null;
  let n = 0;
  let lapDisplay = document.querySelector(".lap-table");
  let lapButton = document.querySelector(".lap");
  const startButton = document.querySelector(".start");

  const stopwatch = () => {
    // update ค่าทุกๆ 0.01 วินาที
    milliseconds += 10;
    if (milliseconds == 1000) {
      seconds++;
      milliseconds = 0;

      if (seconds == 60) {
        minutes++;
        seconds = 0;

        if (minutes == 60) {
          hours++;
          minutes = 0;
        }
      }
    }

    updateRender(); // render ค่าใน display time
  };

  const toggleTimer = () => {
    // หลังกดปุ่ม
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    } else {
      timer = setInterval(stopwatch, 10);
    }
    if (lapDisplay.hasChildNodes) {
      n = 0;
      lapDisplay.innerHTML = "";
    }
  };

  const resetTimer = () => {
    // Reset all time variables to 0
    n = 0;
    [milliseconds, seconds, minutes, hours] = [0, 0, 0, 0];
    // If the timer is running, stop it
    clearInterval(timer);
    timer = null;

    if (lapDisplay.hasChildNodes) {
      lapDisplay.innerHTML = "";
    }
    // Change the Stop button to Start if it's currently in the Stop state
    if (startButton.classList.contains("active")) {
      startButton.classList.remove("active");
      startButton.innerHTML = "Start";
      lapButton.style.display = "none"; // Hide the Lap button again
    }
    updateRender();
  };

  const updateRender = () => {
    //ถ้า เติม 0 หน้าเลขเวลา จาก 1 => 01
    if (hours >= 1) {
      hourElement.textContent = hours + ":";
    }

    minuteElement.textContent = minutes < 10 ? "0" + minutes : minutes;
    secondElement.textContent = seconds < 10 ? "0" + seconds : seconds;
    milliElement.textContent = milliseconds / 10;
  };

  const renderLap = () => {
    let m = minutes < 10 ? "0" + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    let newLap =
      hours >= 1
        ? `<p>Lap ${n} : ${hours}:${m}:${s}.${milliseconds / 10}</p>`
        : `<p>Lap ${n} : ${m}:${s}.${milliseconds / 10}</p>`;
    lapDisplay.innerHTML += newLap;
  };

  startButton.addEventListener("click", () => {
    // Toggle the active class on click
    startButton.classList.toggle("active");
    // Change the innerHTML based on the presence of the active class
    if (startButton.classList.contains("active")) {
      startButton.innerHTML = "Stop";
      lapButton.style.display = "initial";
      toggleTimer(); // Start the timer
    } else {
      lapButton.style.display = "none";
      startButton.innerHTML = "Start";
      toggleTimer(); // Stop the timer
    }
  });

  lapButton.addEventListener("click", () => {
    n += 1;
    renderLap();
  });

  const resetButton = document.querySelector(".reset");
  resetButton.addEventListener("click", resetTimer);
});
