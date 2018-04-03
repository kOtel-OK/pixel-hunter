import changeScreen from './module_render';

const nextScreen = (element, event, screen) => {
  element.addEventListener(event, function () {
    changeScreen(screen());

  });
};

export default nextScreen;

