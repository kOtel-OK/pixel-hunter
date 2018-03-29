const screens = document.querySelectorAll('template');
const mainScreen = document.querySelector('main');
let currentScreen = 0;

const changeScreen = (screenNum = 0) => {
  mainScreen.innerHTML = screens[screenNum].innerHTML;
};

document.addEventListener('keydown', function (event) {
  if (event.altKey === true) {
    if (event.keyCode === 39) {
      if (currentScreen < screens.length - 1 && currentScreen >= 0) {
        currentScreen++;
        changeScreen(currentScreen);
      } else {
        currentScreen;
      }
    }
    if (event.keyCode === 37) {
      if (currentScreen <= screens.length - 1 && currentScreen > 0) {
        currentScreen--;
        changeScreen(currentScreen);
      } else {
        currentScreen;
      }
    }
  }
});

changeScreen();
