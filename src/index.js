import './style.css';
import gnomeImage from './gnome.png';
export class Game {
constructor(gridSize) {
    this.gridSize = gridSize;
    this.holes = [];
    this.intervalId = null;
    
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) {
      console.error('Элемент с id "game-container" не найден.');
      return;
    }
    
    this.grid = document.createElement('div');
    this.grid.classList.add('grid');
    this.grid.style.position = 'relative';
    this.createGrid(gameContainer);
    
    this.gnome = this.createGnome();
    this.grid.appendChild(this.gnome);
    
    this.cacheHolePositions();
    this.startGame();
  }
createGrid(gameContainer) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < this.gridSize * this.gridSize; i++) {
      const hole = document.createElement('div');
      hole.classList.add('hole');
      fragment.appendChild(hole);
      this.holes.push(hole);
    }
    this.grid.appendChild(fragment);
    gameContainer.appendChild(this.grid);
  }
  // Предварительное вычисление и кэширование позиций ячеек
  cacheHolePositions() {
    const gridRect = this.grid.getBoundingClientRect();
    this.cachedHolePositions = this.holes.map(hole => {
      const rect = hole.getBoundingClientRect();
      return {
        top: rect.top - gridRect.top,
        left: rect.left - gridRect.left,
        width: rect.width,
        height: rect.height
      };
    });
  }
  createGnome() {
    const gnome = document.createElement('img');
    gnome.src = gnomeImage;
    gnome.classList.add('gnome');
    gnome.style.position = 'absolute';
    return gnome;
  }
  moveGnome() {
    if (!this.cachedHolePositions || this.cachedHolePositions.length === 0) {
      return;
    }
    const randomIndex = Math.floor(Math.random() * this.cachedHolePositions.length);
    const cell = this.cachedHolePositions[randomIndex];
    const gnomeWidth = this.gnome.offsetWidth;
    const gnomeHeight = this.gnome.offsetHeight;
    // Позиционируем гнома по центру выбранной ячейки
    const top = cell.top + (cell.height - gnomeHeight) / 2;
    const left = cell.left + (cell.width - gnomeWidth) / 2;
    this.gnome.style.top = `${top}px`;
    this.gnome.style.left = `${left}px`;
  }
  startGame() {
    this.intervalId = setInterval(() => this.moveGnome(), 1000);
  }
  stopGame() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Game(4);
});

export default Game;