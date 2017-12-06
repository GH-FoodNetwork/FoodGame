import { Container, Graphics, Sprite } from 'pixi.js';
import { renderer, singleRecipeStage, gameStage, recipeBookStage } from '../main';
import { setup, textSetup, objectAtlas } from '../atlases';
import store, { addRecipe } from '../store';
import recipeArray from '../recipe-constructor';
import { cookRecipe } from './recipe-book';

function clickToPlay() {
  singleRecipeStage.visible = false;
  gameStage.visible = true;
}

const singleRecipeObjects = {};

export default function singleRecipe() {
  //document.body.appendChild(renderer.view);

  const recipesBackground = setup(
    singleRecipeStage,
    objectAtlas.recipeBookInterior,
    { x: -20, y: 0 },
    {
      x: window.innerWidth / objectAtlas.recipeBookInterior.width * 2,
      y: window.innerHeight / objectAtlas.recipeBookInterior.height * 2,
    },
  );
  recipesBackground.anchor.set(0.5, 0);

  const buttonStyling = {
    fontFamily: 'Arial',
    fontSize: '22px',
    fill: 'white',
    dropShadow: true,
    dropShadowColor: 'red',
    dropShadowDistance: 2,
    letterSpacing: 1,
  };

  const spacingX = window.innerWidth / 2;
  const spacingY = 100;


  //Recipe title
  singleRecipeObjects.titleText = textSetup(singleRecipeStage, 'Title', { x: spacingX, y: 0 });
  singleRecipeObjects.titleText.y = singleRecipeObjects.titleText.height;

  //Recipe images
  const imgScaleByHeight = window.innerHeight / 8 / 100;
  singleRecipeObjects.finishedDishImg = setup(
    singleRecipeStage,
    objectAtlas.jollof,
    { x: spacingX + 150, y: spacingY + 75 },
    { x: imgScaleByHeight, y: imgScaleByHeight },
  );
  singleRecipeObjects.finishedDishImg.position = new PIXI.Point(
    window.innerWidth - singleRecipeObjects.finishedDishImg.width,
    singleRecipeObjects.titleText.y + (singleRecipeObjects.titleText.height * 2),
  );
  singleRecipeObjects.equals = textSetup(
    singleRecipeStage, '=',
    { x: singleRecipeObjects.finishedDishImg.x - 50, y: singleRecipeObjects.finishedDishImg.y },
  );
  singleRecipeObjects.standardInst = textSetup(
    singleRecipeStage, "Collect the ingredients from the Sous Chef's platter.\nThen visit the following stations in order:",
    { x: spacingX, y: singleRecipeObjects.finishedDishImg.y + singleRecipeObjects.finishedDishImg.height + 5 },
  );
  singleRecipeObjects.steps = textSetup(
    singleRecipeStage, "steps",
    { x: spacingX, y: singleRecipeObjects.standardInst.y + singleRecipeObjects.standardInst.height + 5 },
  );

  const fullRecipeLink = textSetup(singleRecipeStage, 'Link To Full Recipe', {
    x: spacingX,
    y: spacingY + 385,
  });
  fullRecipeLink.interactive = true;
  fullRecipeLink.buttonMode = true;
  fullRecipeLink.on('pointerdown', linkToRecipe);
  fullRecipeLink.y = window.innerHeight - fullRecipeLink.height - 15;

  function linkToRecipe() {
    //window.location.href = 'https://www.epicurious.com/recipes/food/views/african-jollof-rice';
    window.open(singleRecipeObjects.selectedRecipe.linkToRecipe, '_blank');
  }

  const cookButton = textSetup(
    singleRecipeStage,
    'Add Recipe!',
    { x: spacingX, y: spacingY + 350 },
    buttonStyling,
  );
  cookButton.interactive = true;
  cookButton.buttonMode = true;
  cookButton.on('pointerdown', cookRecipe);
  cookButton.y = fullRecipeLink.y - cookButton.height - 5;

  const arrow = setup(
    singleRecipeStage,
    objectAtlas.backArrow,
    { x: 50, y: 500 },
    { x: 0.2, y: 0.2 },
  );
  arrow.position = new PIXI.Point(arrow.width / 2 + 5, window.innerHeight - arrow.height - 5);
  arrow.interactive = true;
  arrow.buttonMode = true;
  arrow.on('pointerdown', backToRecipeBook);

  function backToRecipeBook() {
    recipeBookStage.visible = true;
    singleRecipeStage.visible = false;
  }

  const play = setup(
    singleRecipeStage,
    objectAtlas.playButton,
    { x: 920, y: 500 },
    { x: 0.5, y: 0.5 },
  );
  play.position = new PIXI.Point(window.innerWidth - (play.width / 2) - 15, window.innerHeight - (play.height / 2) - 15);

  play.interactive = true;
  play.buttonMode = true;
  play.on('pointerdown', clickToPlay);

  renderer.render(singleRecipeStage);
}

export function populate(selectedRecipe) {
  singleRecipeObjects.selectedRecipe = selectedRecipe;
  singleRecipeObjects.titleText.text = selectedRecipe.title;
  singleRecipeObjects.finishedDishImg.texture = selectedRecipe.finishedDish;
  //width = ingredients.length * xwidth + ingredients.length - 1 * xwidth
  const xwidth = window.innerWidth / ((selectedRecipe.ingredients.length + 1) * 2);
  const xheight = window.innerHeight / 8;
  const imgScaleByHeight = xheight / 50;
  singleRecipeStage.removeChild(singleRecipeObjects.ingredientListing);
  singleRecipeObjects.ingredientListing = new PIXI.Container();
  singleRecipeStage.addChild(singleRecipeObjects.ingredientListing);
  singleRecipeObjects.ingredientListing.y = singleRecipeObjects.titleText.y +
    (xheight / 2) + (singleRecipeObjects.titleText.height / 2) + 5;
  singleRecipeObjects.standardInst.y = singleRecipeObjects.ingredientListing.y + xheight + 10;
  console.log(singleRecipeObjects.standardInst);
  //For each ingredient, add images to the ingredientListing equation
  for (let i = 0; i < selectedRecipe.ingredients.length + 1; i++) {
    //operator
    if (i == selectedRecipe.ingredients.length) {
      singleRecipeObjects.equals.x = i * 2 * xwidth;
      singleRecipeObjects.finishedDishImg.x = xwidth + (i * 2 * xwidth);
    } else {
      textSetup(singleRecipeObjects.ingredientListing, '+', { x: i * 2 * xwidth, y: 0 });
      //ingredient sprite
      const ing = setup(
        singleRecipeObjects.ingredientListing, selectedRecipe.ingredients[i],
        { x: xwidth + (i * 2 * xwidth), y: 0 },
      );
      const ingScale = xwidth / ing.width;
      ing.scale.x = ingScale > imgScaleByHeight ? imgScaleByHeight : ingScale;
      ing.scale.y = ingScale > imgScaleByHeight ? imgScaleByHeight : ingScale;
    }
  }
  //For each step, add text below the Standard Instructions line
  singleRecipeObjects.steps.text = "";
  for(let j=0; j<selectedRecipe.steps.length; j++) {
  singleRecipeObjects.steps.text += "Step " + (j+1) + ": " + selectedRecipe.steps[j].type + "\n\n";
  }
  singleRecipeObjects.steps.anchor.set(0.5, 0);
}
