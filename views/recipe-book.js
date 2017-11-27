import * as PIXI from 'pixi.js';

const { Container, Graphics, Sprite } = PIXI;
import { gameStage, recipeBookStage } from '../main';
import { setup, objectAtlas } from '../atlases';
import loader from '../main';

const renderer = PIXI.autoDetectRenderer(256, 256);
// export const recipeBookStage = new Container();

renderer.view.style.position = 'absolute';
renderer.view.style.display = 'block';
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

export function bookUpdate() {
  //Funnel all animation updates here
  // movePlayer();
  //Rerender
  // requestAnimationFrame(bookUpdate);
  renderer.render(recipeBookStage);
}

export default function recipeBook() {
  document.body.appendChild(renderer.view);

  const cat = setup(recipeBookStage, objectAtlas.cat, { x: 50, y: 50 });

  cat.interactive = true;
  cat.buttonMode = true;
  cat.on('pointerdown', onClick);
  function onClick() {
    recipeBookStage.visible = false;
    gameStage.visible = true;
  }
  renderer.backgroundColor = 0x061639;
  bookUpdate();
}

export function Recipe(title, ingredients = [], finishedDish, steps = [], linkToRecipe) {
  this.title = title;
  this.ingredients = ingredients;
  this.finishedDish = finishedDish;
  this.steps = steps;
  this.linkToRecipe = linkToRecipe;
}

const jollof = new Recipe(
  'Jollof Rice',
  ['cookedRiceImg', 'tomatoPasteImg'],
  'public/images/jollof.png',
  [
    { type: 'mixing', waitTime: '2' },
    { type: 'spices', waitTime: '2' },
    { type: 'fryer', waitTime: '2' },
  ],
  'link',
);
