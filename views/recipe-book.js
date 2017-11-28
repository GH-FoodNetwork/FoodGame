import * as PIXI from 'pixi.js';

const { Container, Graphics, Sprite, Text } = PIXI;
import { gameStage, recipeBookStage } from '../main';
import { setup, textSetup, objectAtlas } from '../atlases';
import { renderer } from '../main';

export function bookUpdate() {
  //Funnel all animation updates here
  // movePlayer();
  //Rerender
  // requestAnimationFrame(bookUpdate);
  renderer.render(recipeBookStage);
}

export default function recipeBook() {
  document.body.appendChild(renderer.view);

  const recipes = setup(recipeBookStage, objectAtlas.recipeBookInterior, { x: -20, y: 0 }, { x: 0.28, y: 0.28 });
  recipes.anchor.set(0);

  const jollofText = textSetup(recipeBookStage, 'Jollof Rice', { x: 100, y: 100 });

  jollofText.interactive = true;
  jollofText.buttonMode = true;
  jollofText.on('pointerdown', onClick);


  const jollof = setup(recipeBookStage, objectAtlas.jollof, { x: 150, y: 150 }, { x: 0.3, y: 0.3 });
  const jollof2 = setup(recipeBookStage, objectAtlas.jollof, { x: 500, y: 300 }, { x: 0.3, y: 0.3 });
  const jollof3 = setup(recipeBookStage, objectAtlas.jollof, { x: 500, y: 300 }, { x: 0.3, y: 0.3 });
  const jollof4 = setup(recipeBookStage, objectAtlas.jollof, { x: 500, y: 300 }, { x: 0.3, y: 0.3 });




  const cat = setup(recipeBookStage, objectAtlas.cat, { x: 50, y: 500 });

  cat.interactive = true;
  cat.buttonMode = true;
  //cat.on('pointerdown', onClick);
  function onClick() {
    recipeBookStage.visible = false;
    gameStage.visible = true;
  }
  renderer.backgroundColor = 0x061639;
  bookUpdate();
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
