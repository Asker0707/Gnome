import '../style.css';
import gnomeImage from '../gnome.png';
export class Game {
  constructor(gridSize) {
    this.gridSize = gridSize;
    this.holes = [];
    this.intervalId = null;
    this.score = 0;
    this.missedAttempts = 0;
    this.missedAttemptsDisplay = null;
    this.scoreDisplay = null; 
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
    this.setupEventListeners();
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
    

    this.gnome.classList.remove('gnome-disappear');
    

    const top = cell.top + (cell.height - gnomeHeight) / 2;
    const left = cell.left + (cell.width - gnomeWidth) / 2;
    this.gnome.style.top = `${top}px`;
    this.gnome.style.left = `${left}px`;
    this.gnome.style.display = 'block'; 
}
  startGame() {
    this.intervalId = setInterval(() => this.moveGnome(), 1000);
  }
  setupEventListeners() {
    this.gnome.addEventListener('click', (e) => {
      e.stopPropagation();
      this.handleGnomeClick();
    });
    
    this.grid.addEventListener('click', (e) => {
      if (e.target !== this.gnome) {
        this.handleMissedAttempt();
      }
    });
  }
  handleMissedAttempt() {
    this.missedAttempts++;
    if (this.missedAttempts >= 5) {
      this.stopGame();
      alert(`Игра окончена! Ваш счёт: ${this.score}`);
      return;
    }
    if (!this.missedAttemptsDisplay) {
      this.missedAttemptsDisplay = this.createMissedAttemptsDisplay();
    }
    this.missedAttemptsDisplay.textContent = `Промахи: ${this.missedAttempts}`;
  }
  createMissedAttemptsDisplay() {
    const missedAttemptsDisplay = document.createElement('div');
    missedAttemptsDisplay.classList.add('misses');
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
      gameContainer.prepend(missedAttemptsDisplay);
    }
    return missedAttemptsDisplay;
  }
  handleGnomeClick() {
    this.score++;
    if (!this.scoreDisplay) {
        this.scoreDisplay = this.createScoreDisplay();
    }
    this.scoreDisplay.textContent = `Счёт: ${this.score}`;
    
    this.gnome.classList.add('gnome-disappear');

    setTimeout(() => {
        this.gnome.classList.remove('gnome-disappear');
        this.moveGnome();
    }, 300); 
}
  createScoreDisplay() {
    const scoreDisplay = document.createElement('div');
    scoreDisplay.classList.add('score');
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
      gameContainer.prepend(scoreDisplay);
    }
    return scoreDisplay;
  }
  stopGame() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    // Очистка обработчиков событий
    this.gnome.removeEventListener('click', this.handleGnomeClick);
    this.grid.removeEventListener('click', this.handleMissedAttempt);
    this.gnome.style.display = 'none';
  }
}
export default Game;