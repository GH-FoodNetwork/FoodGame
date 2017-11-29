import * as PIXI from 'pixi.js';
import store from '../store';
import { addRecipe } from '../store/recipes';
import recipeArray from '../recipe-constructor';

const {
  Container, Graphics, Sprite, Text,
} = PIXI;
import { gameStage, recipeBookStage, singleRecipeStage, renderer } from '../main';
import { setup, textSetup, objectAtlas } from '../atlases';

export default function recipeBook() {
  document.body.appendChild(renderer.view);

  const recipes = setup(
    recipeBookStage,
    objectAtlas.recipeBookInterior,
    { x: -20, y: 0 },
    { x: 0.28, y: 0.28 },
  );
  recipes.anchor.set(0);
  const spacingX = window.innerWidth / 4;
  const spacingY = window.innerHeight / 3;

  const jollofText = textSetup(recipeBookStage, 'Jollof Rice', { x: spacingX, y: spacingY - 125 });
  const jollof = setup(
    recipeBookStage,
    objectAtlas.jollof,
    { x: spacingX, y: spacingY - 25 },
    { x: 0.4, y: 0.4 },
  );
  const cook = textSetup(recipeBookStage, 'Cook', { x: spacingX - 50, y: spacingY + 50 });
  const recipe = textSetup(recipeBookStage, 'Recipe', { x: spacingX + 50, y: spacingY + 50 });

  const jollofText2 = textSetup(recipeBookStage, 'Jollof Rice', {
    x: spacingX,
    y: spacingY * 2 - 75,
  });
  const jollof2 = setup(
    recipeBookStage,
    objectAtlas.jollof,
    { x: spacingX, y: spacingY * 2 + 25 },
    { x: 0.4, y: 0.4 },
  );
  const cook2 = textSetup(recipeBookStage, 'Cook', { x: spacingX - 50, y: spacingY * 2 + 100 });
  const recipe2 = textSetup(recipeBookStage, 'Recipe', { x: spacingX + 50, y: spacingY * 2 + 100 });

  const jollofText3 = textSetup(recipeBookStage, 'Jollof Rice', {
    x: spacingX * 3,
    y: spacingY - 125,
  });
  const jollof3 = setup(
    recipeBookStage,
    objectAtlas.jollof,
    { x: spacingX * 3, y: spacingY - 25 },
    { x: 0.4, y: 0.4 },
  );
  const cook3 = textSetup(recipeBookStage, 'Cook', { x: spacingX * 3 - 50, y: spacingY + 50 });
  const recipe3 = textSetup(recipeBookStage, 'Recipe', { x: spacingX * 3 + 50, y: spacingY + 50 });

  const jollofText4 = textSetup(recipeBookStage, 'Jollof Rice', {
    x: spacingX * 3,
    y: spacingY * 2 - 75,
  });
  const jollof4 = setup(
    recipeBookStage,
    objectAtlas.jollof,
    { x: spacingX * 3, y: spacingY * 2 + 25 },
    { x: 0.4, y: 0.4 },
  );
  const cook4 = textSetup(recipeBookStage, 'Cook', { x: spacingX * 3 - 50, y: spacingY * 2 + 100 });
  const recipe4 = textSetup(recipeBookStage, 'Recipe', {
    x: spacingX * 3 + 50,
    y: spacingY * 2 + 100,
  });

  const cookButtons = [cook, cook2, cook3, cook4];

  cookButtons.forEach((button) => {
    button.interactive = true;
    button.buttonMode = true;
    button.on('pointerdown', cookRecipe);
    // TODO: create func that dispatches selected recipe to store and calls the backToGame
  });

  function cookRecipe() {
    // FIXME: refactor this code to (a) link 'cook' buttons to recipes and (b) pass that linked recipe to dispatch action
    store.dispatch(addRecipe(new recipeArray[0]() ));
    backToGame();
  }

  const recipeButtons = [recipe, recipe2, recipe3, recipe4];

  function clickToSingleRecipe() {
    recipeBookStage.visible = false;
    gameStage.visible = false;
    singleRecipeStage.visible = true;
  }

  recipeButtons.forEach((button) => {
    button.interactive = true;
    button.buttonMode = true;
    button.on('pointerdown', clickToSingleRecipe);
  });

  const arrow = setup(
    recipeBookStage,
    objectAtlas.backArrow,
    { x: 50, y: 500 },
    { x: 0.2, y: 0.2 },
  );

  arrow.interactive = true;
  arrow.buttonMode = true;
  arrow.on('pointerdown', backToGame);

  function backToGame() {
    recipeBookStage.visible = false;
    gameStage.visible = true;
  }
  renderer.render(recipeBookStage);
}
