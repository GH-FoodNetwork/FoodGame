import * as PIXI from 'pixi.js';

const { Container, Graphics, Sprite, Text } = PIXI;
import { gameStage, recipeBookStage, singleRecipeStage, renderer } from '../main';
import { setup, textSetup, objectAtlas } from '../atlases';

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
  const spacingX = window.innerWidth / 4;
  const spacingY = window.innerHeight / 3;

  const jollofText = textSetup(recipeBookStage, 'Jollof Rice', { x: spacingX, y: spacingY - 100 });
  const jollof = setup(recipeBookStage, objectAtlas.jollof, { x: spacingX, y: spacingY }, { x: 0.4, y: 0.4 });
  const cook = textSetup(recipeBookStage, 'Cook', { x: spacingX - 50, y: spacingY + 100 });
  const recipe = textSetup(recipeBookStage, 'Recipe', { x: spacingX + 50, y: spacingY + 100 });

  const jollofText2 = textSetup(recipeBookStage, 'Jollof Rice', { x: spacingX, y: (spacingY * 2) - 100 });
  const jollof2 = setup(recipeBookStage, objectAtlas.jollof, { x: spacingX, y: spacingY * 2}, { x: 0.4, y: 0.4 });
  const cook2 = textSetup(recipeBookStage, 'Cook', { x: spacingX - 50, y: spacingY + 100 });
  const recipe2 = textSetup(recipeBookStage, 'Recipe', { x: spacingX + 50, y: spacingY + 100 });


  const jollofText3 = textSetup(recipeBookStage, 'Jollof Rice', { x: spacingX * 3, y: spacingY - 100 });
  const jollof3 = setup(recipeBookStage, objectAtlas.jollof, { x: spacingX * 3, y: spacingY }, { x: 0.4, y: 0.4 });
  const cook3 = textSetup(recipeBookStage, 'Cook', { x: spacingX - 50, y: spacingY + 100 });
  const recipe3 = textSetup(recipeBookStage, 'Recipe', { x: spacingX + 50, y: spacingY + 100 });

  const jollofText4 = textSetup(recipeBookStage, 'Jollof Rice', { x: spacingX * 3, y: (spacingY * 2) - 100 });
  const jollof4 = setup(recipeBookStage, objectAtlas.jollof, { x: spacingX * 3, y: spacingY * 2 }, { x: 0.4, y: 0.4 });
  const cook4 = textSetup(recipeBookStage, 'Cook', { x: spacingX - 50, y: spacingY + 100 });
  const recipe4 = textSetup(recipeBookStage, 'Recipe', { x: spacingX + 50, y: spacingY + 100 });




  const cookButtons = [cook, cook2, cook3, cook4];

  cookButtons.forEach(button => {
    button.interactive = true;
    button.buttonMode = true;
    button.on('pointerdown', onClick);
  })

  const recipeButtons = [recipe, recipe2, recipe3, recipe4];

  function clickToSingleRecipe() {
    recipeBookStage.visible = false;
    gameStage.visible = false;
    singleRecipeStage.visible = true;
  }

  recipeButtons.forEach(button => {
    button.interactive = true;
    button.buttonMode = true;
    button.on('pointerdown', clickToSingleRecipe);
  })




  const arrow = setup(recipeBookStage, objectAtlas.backArrow, { x: 50, y: 500 }, {x: 0.2, y: 0.2});

  arrow.interactive = true;
  arrow.buttonMode = true;
  arrow.on('pointerdown', onClick);

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
