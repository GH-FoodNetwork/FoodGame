import * as PIXI from 'pixi.js';

const { Container, Graphics, Sprite } = PIXI;
import { gameStage, recipeBookStage } from './gameplay';

const renderer = PIXI.autoDetectRenderer(256, 256);
// export const recipeBookStage = new Container();
const stage = recipeBookStage;

renderer.view.style.position = 'absolute';
renderer.view.style.display = 'block';
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

export default function recipeBook() {
  document.body.appendChild(renderer.view);

  const cat = new Sprite(PIXI.loader.resources['cat.png'].texture);
  cat.position.set(50, 50);
  recipeBookStage.addChild(cat);

  cat.interactive = true;
  cat.buttonMode = true;
  cat.on('pointerdown', onClick);
  function onClick() {
    recipeBookStage.visible = false;
    gameStage.visible = true;
  }

  renderer.backgroundColor = 0x061639;
  renderer.render(stage);
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
