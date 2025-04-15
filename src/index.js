import { Game } from './js/Gnome.js';
document.addEventListener('DOMContentLoaded', () => {
  const game = new Game(4);
  game.startGame();
});