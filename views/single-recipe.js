import { Container, Graphics, Sprite } from 'pixi.js';
import { renderer, singleRecipeStage, gameStage, recipeBookStage } from '../main';
import { setup, textSetup, objectAtlas } from '../atlases';


export default function singleRecipe() {
  document.body.appendChild(renderer.view);

  const recipes = setup(singleRecipeStage, objectAtlas.recipeBookInterior, { x: 20, y: 50 }, { x: 0.53, y: 0.53 });
  //recipes.anchor.set(0);

  const spacingX = window.innerWidth / 2;
  const jollofText = textSetup(singleRecipeStage, 'Jollof Rice\nIngredients:\nCooked Rice\nTomato Paste', { x: spacingX, y: 100 });


  const jollofLink = textSetup(singleRecipeStage, 'Link To Full Recipe', { x: spacingX, y: 200 });
  jollofLink.interactive = true;
  jollofLink.buttonMode = true;
  jollofLink.on('pointerdown', linkToRecipe);

  function linkToRecipe() {
    //window.location.href = 'https://www.epicurious.com/recipes/food/views/african-jollof-rice';
    window.open('http://www.allnigerianrecipes.com/rice/nigerian-jollof-rice.html', '_blank');
  }

  const arrow = setup(singleRecipeStage, objectAtlas.backArrow, { x: 50, y: 500 }, { x: 0.2, y: 0.2 });

  arrow.interactive = true;
  arrow.buttonMode = true;
  arrow.on('pointerdown', onClick);

  function onClick() {
    recipeBookStage.visible = true;
    singleRecipeStage.visible = false;
  }

  renderer.render(singleRecipeStage);
}
