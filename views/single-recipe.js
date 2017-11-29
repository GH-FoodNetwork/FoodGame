import { Container, Graphics, Sprite } from 'pixi.js';
import { renderer, singleRecipeStage, gameStage, recipeBookStage } from '../main';
import { setup, textSetup, objectAtlas } from '../atlases';

export default function singleRecipe() {
  document.body.appendChild(renderer.view);

  const recipes = setup(
    singleRecipeStage,
    objectAtlas.recipeBookInterior,
    { x: 20, y: 50 },
    { x: 0.53, y: 0.53 },
  );

  const spacingX = window.innerWidth / 2;
  const spacingY = 100;

  const jollofText = textSetup(singleRecipeStage, 'Jollof Rice', { x: spacingX, y: spacingY });

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

  const jollofLink = textSetup(singleRecipeStage, 'Link To Full Recipe', {
    x: spacingX,
    y: spacingY + 375,
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

  arrow.interactive = true;
  arrow.buttonMode = true;
  arrow.on('pointerdown', onClick);

  function onClick() {
    recipeBookStage.visible = true;
    singleRecipeStage.visible = false;
  }

  const play = setup(
    singleRecipeStage,
    objectAtlas.playButton,
    { x: 920, y: 500 },
    { x: 0.5, y: 0.5 },
  );

  play.interactive = true;
  play.buttonMode = true;
  play.on('pointerdown', clickToGame);

  function clickToGame() {
    singleRecipeStage.visible = false;
    gameStage.visible = true;
  }

  renderer.render(singleRecipeStage);
}
