const mainScreen = document.querySelector('main');

const changeScreen = (screen) => {
  mainScreen.innerHTML = '';
  mainScreen.appendChild(screen);
};

export default changeScreen;
