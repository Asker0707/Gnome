import { Game } from '../js/Gnome.js';
describe('Game', () => {
  let game;
  let gameContainer;
  beforeEach(() => {
    gameContainer = document.createElement('div');
    gameContainer.id = 'game-container';
    document.body.appendChild(gameContainer);
  });
  afterEach(() => {
    document.body.innerHTML = '';
    if (game) {
      game.stopGame();
    }
    jest.clearAllTimers();
  });
  describe('constructor', () => {
    it('should create grid element', () => {
      game = new Game(4);
      expect(game.grid.classList.contains('grid')).toBeTruthy();
      expect(game.grid.style.position).toBe('relative');
    });
  });
  describe('createGrid', () => {
    it('should create correct number of holes', () => {
      game = new Game(4);
      expect(game.holes.length).toBe(16); // 4x4 grid
      expect(gameContainer.querySelector('.grid')).toBeTruthy();
    });
    it('should add holes with correct class', () => {
      game = new Game(4);
      const holes = gameContainer.querySelectorAll('.hole');
      expect(holes.length).toBe(16);
      holes.forEach(hole => {
        expect(hole.classList.contains('hole')).toBeTruthy();
      });
    });
  });
  describe('createGnome', () => {
    it('should create gnome element with correct properties', () => {
      game = new Game(4);
      const gnome = game.gnome;
      
      expect(gnome.tagName).toBe('IMG');
      expect(gnome.classList.contains('gnome')).toBeTruthy();
      expect(gnome.style.position).toBe('absolute');
    });
  });
  describe('cacheHolePositions', () => {
    it('should cache hole positions', () => {
      game = new Game(4);
      game.cacheHolePositions();
      
      expect(game.cachedHolePositions).toBeDefined();
      expect(Array.isArray(game.cachedHolePositions)).toBeTruthy();
      expect(game.cachedHolePositions.length).toBe(16);
    });
    it('should cache position objects with correct properties', () => {
      game = new Game(4);
      game.cacheHolePositions();
      
      game.cachedHolePositions.forEach(position => {
        expect(position).toHaveProperty('top');
        expect(position).toHaveProperty('left');
        expect(position).toHaveProperty('width');
        expect(position).toHaveProperty('height');
      });
    });
  });
  describe('moveGnome', () => {
    it('should not move gnome if cached positions are empty', () => {
      game = new Game(4);
      game.cachedHolePositions = [];
      game.moveGnome();
      
      expect(game.gnome.style.top).toBe('');
      expect(game.gnome.style.left).toBe('');
    });
    it('should move gnome to a new position', () => {
      game = new Game(4);
      game.cachedHolePositions = [{
        top: 100,
        left: 100,
        width: 100,
        height: 100
      }];
      
      game.moveGnome();
      
      expect(game.gnome.style.top).toBeDefined();
      expect(game.gnome.style.left).toBeDefined();
    });
  });
});