import displayGreeting from './module_greeting';
import nextScreen from './module_next_screen';

export function backToStart(template) {
  nextScreen(template.querySelector('.header__back'), 'click', displayGreeting);
}
