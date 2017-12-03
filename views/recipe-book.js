import * as PIXI from 'pixi.js';
import store, { addRecipe, setSousChefHolding, generateCustomer, pickRecipe } from '../store';
import recipeArray from '../recipe-constructor';

const {
  Container, Graphics, Sprite, Text,
} = PIXI;
import { gameStage, recipeBookStage, singleRecipeStage, renderer } from '../main';
import { setup, textSetup, objectAtlas } from '../atlases';
import { kitchenObjects } from './gameplay';
import singleRecipe from './single-recipe';

function backToGame() {
  recipeBookStage.visible = false;
  singleRecipeStage.visible = false;
  gameStage.visible = true;
  store.dispatch(generateCustomer());
}

export function cookRecipe(evt) {
  kitchenObjects.recipeBook.visible = false;
  kitchenObjects.recipeBook.interactive = false;
  kitchenObjects.recipeBook.buttonMode = false;
  store.dispatch(setSousChefHolding(true));
  store.dispatch(pickRecipe(evt.target.parent.selectedRecipe));
  backToGame();
}

function clickToSingleRecipe(evt) {
  recipeBookStage.visible = false;
  gameStage.visible = false;
  singleRecipeStage.visible = true;
  singleRecipeStage.selectedRecipe = evt.target.parent.selectedRecipe;
}

export default function recipeBook() {
  //document.body.appendChild(renderer.view);

  const recipes = setup(
    recipeBookStage,
    objectAtlas.recipeBookInterior,
    { x: -20, y: 0 },
    {
      x: window.innerWidth / objectAtlas.recipeBookInterior.width,
      y: window.innerHeight / objectAtlas.recipeBookInterior.height,
    },
  );
  recipes.anchor.set(0);
  const spacingX = window.innerWidth / 4;
  const spacingY = window.innerHeight / 3;

  const buttonStyling = {
    fontFamily: 'Arial',
    fontSize: '22px',
    fill: 'white',
    dropShadow: true,
    dropShadowColor: 'red',
    dropShadowDistance: 2,
    letterSpacing: 1,
  };

  for (let i = 0; i < 4; i++) {
    const rec = (i < recipeArray.length) ? new recipeArray[i]() : new recipeArray[0]();
    const imgScale = window.innerHeight / 5 / 100; //Where each dish image is 100px in height
    //Make image of finished product
    const finishedImage = setup(
      recipeBookStage,
      rec.finishedDish,
      { x: (i <= 1) ? spacingX : spacingX * 3, y: ((i % 2 == 0) ? spacingY : spacingY * 2) - 25 },
      { x: imgScale, y: imgScale },
    );
    finishedImage.selectedRecipe = rec;
    //Make text with title
    const titleText = textSetup(
      finishedImage, rec.title,
      { x: 0, y: window.innerHeight / -10 },
    );
    //Add cook button
    const cookButton = textSetup(
      finishedImage,
      'Cook',
      { x: -50, y: 50 },
      buttonStyling,
    );
    cookButton.interactive = true;
    cookButton.buttonMode = true;
    cookButton.on('pointerdown', cookRecipe);
    //Add recipe button
    const recipeButton = textSetup(
      finishedImage,
      'Recipe',
      { x: 50, y: 50 },
      buttonStyling,
    );
    recipeButton.interactive = true;
    recipeButton.buttonMode = true;
    recipeButton.on('pointerdown', clickToSingleRecipe);
  }

  const arrow = setup(
    recipeBookStage,
    objectAtlas.backArrow,
    { x: 50, y: 500 },
    { x: 0.2, y: 0.2 },
  );
  arrow.position = new PIXI.Point(arrow.width / 2 + 5, window.innerHeight - arrow.height - 5);

  arrow.interactive = true;
  arrow.buttonMode = true;
  arrow.on('pointerdown', backToGame);

  renderer.render(recipeBookStage);
}
