import * as PIXI from 'pixi.js';

const { Container, Graphics, Sprite } = PIXI;
import { gameStage, recipeBookStage } from '../main';
import { setup, objectAtlas } from '../atlases';
import { renderer } from '../main';

export default function recipeBook() {
  document.body.appendChild(renderer.view);
  const backButton = new Sprite(document.getElementById('back-button'));
  backButton.interactive = true;
  backButton.buttonMode = true;
  backButton.on('pointerdown', backToGame);

  const cat = setup(recipeBookStage, objectAtlas.cat, { x: 50, y: 50 });

  cat.interactive = true;
  cat.buttonMode = true;
  cat.on('pointerdown', backToGame);
  function backToGame() {
    const div = document.getElementById('recipes');
    div.style.display = 'none';
    recipeBookStage.visible = false;
    gameStage.visible = true;
  }
  renderer.backgroundColor = 0x061639;
}

// TODO: Move this constructor function to its own file
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
