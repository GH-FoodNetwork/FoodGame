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

export default function singleRecipe() {
  //document.body.appendChild(renderer.view);
  
  const recipes = setup(
    singleRecipeStage,
    objectAtlas.recipeBookInterior,
    { x: -20, y: 0 },
    {
      x: window.innerWidth / objectAtlas.recipeBookInterior.width * 2,
      y: window.innerHeight / objectAtlas.recipeBookInterior.height * 2,
    },
  );
  recipes.anchor.set(0.5, 0);

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
    const titleText = textSetup(singleRecipeStage, "Title", { x: spacingX, y: spacingY });

    const rice = setup(
      singleRecipeStage,
      objectAtlas.cookedRice,
      { x: spacingX - 150, y: spacingY + 75 },
      { x: 1, y: 1 },
    );
    const plus = textSetup(singleRecipeStage, '+', { x: spacingX - 75, y: spacingY + 75 });
    const tomato = setup(
      singleRecipeStage,
      objectAtlas.tomatoPaste,
      { x: spacingX, y: spacingY + 75 },
      { x: 1, y: 1 },
    );
    const equals = textSetup(singleRecipeStage, '=', { x: spacingX + 75, y: spacingY + 75 });
    const jollof = setup(
      singleRecipeStage,
      objectAtlas.jollof,
      { x: spacingX + 150, y: spacingY + 75 },
      { x: 0.2, y: 0.2 },
    );

    /*
   * Recipe steps
   */
    const step1 = textSetup(singleRecipeStage, 'Step 1: Pick up ingredients from Sous Chef', {
      x: spacingX,
      y: spacingY + 150,
    });
    const step2 = textSetup(singleRecipeStage, 'Step 2: Take ingredients to mixing station', {
      x: spacingX,
      y: spacingY + 180,
    });
    const step3 = textSetup(
      singleRecipeStage,
      'Step 3: When timer is up, retrieve mixed ingredients',
      {
        x: spacingX,
        y: spacingY + 210,
      },
    );
    const step4 = textSetup(singleRecipeStage, 'Step 4: Take ingredients to frying station', {
      x: spacingX,
      y: spacingY + 240,
    });
    const step5 = textSetup(singleRecipeStage, 'Step 5: When timer is up, retrieve finished dish', {
      x: spacingX,
      y: spacingY + 270,
    });
    const step6 = textSetup(singleRecipeStage, 'Step 6: Serve finished dish to customer', {
      x: spacingX,
      y: spacingY + 300,
    });

    const cook = textSetup(
      singleRecipeStage,
      'Add Recipe!',
      { x: spacingX, y: spacingY + 350 },
      buttonStyling,
    );
    cook.interactive = true;
    cook.buttonMode = true;
    cook.on('pointerdown', cookRecipe);    

    const jollofLink = textSetup(singleRecipeStage, 'Link To Full Recipe', {
      x: spacingX,
      y: spacingY + 385,
    });
    jollofLink.interactive = true;
    jollofLink.buttonMode = true;
    jollofLink.on('pointerdown', linkToRecipe);

    function linkToRecipe() {
    //window.location.href = 'https://www.epicurious.com/recipes/food/views/african-jollof-rice';
      window.open('http://www.vegannigerian.com/2013/02/jollof-rice.html', '_blank');
    }
  

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

export const populate = function(selectedRecipe){
  
}