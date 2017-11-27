// import React from 'react';
// import { render } from 'react-dom';
// import { AppContainer } from 'react-hot-loader';
import recipeBook from './views/recipe-book';
import singleRecipe from './views/single-recipe';
import gameplay from './views/gameplay';
import bonusPopup from './views/bonus-pop-up';
import titleSplash from './views/title-splash-screen';

import App from '~/App';
import * as PIXI from 'pixi.js';
import { objectAtlasInit } from './atlases';

// Debugging
window.PIXI = PIXI;

const loader = PIXI.loader
  .add('cat', 'images/cat.png')
  .add('door', 'images/door.png')
  .add('images/kitchen.png')
  .add('counters', 'images/counters.png')
  .add('images/customer2.png')
  .add('images/pantry-misc.png')
  .add('images/chef.png')
  .add('images/jollof.png')
  .add('images/souschef.png')
  .add('images/fryingpan.png')
  .add('images/recipebook.png')
  .add('images/trashcancopy.png')
  .add('images/trashcan2.png')
  .add('images/floor.png')
  .load((loader, resources) => {
    objectAtlasInit(resources);
  })
  // .load(singleRecipe)
  .load(recipeBook)
  .load(gameplay);
// .load(bonusPopup)
// .load(titleSplash);

export const stage = new PIXI.Container();
export const gameStage = new PIXI.Container();
export const recipeBookStage = new PIXI.Container();
stage.addChild(gameStage);
stage.addChild(recipeBookStage);
recipeBookStage.visible = false;

const PIXELS_PER_TILE = window.innerWidth / 80
// stage.scale.x = PIXELS_PER_TILE;
// stage.scale.y = PIXELS_PER_TILE;

export const renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
renderer.view.style.position = 'absolute';
renderer.view.style.display = 'block';
// renderer.resize(10, 100)
// renderer.autoResize = true;
// renderer.resize(window.innerWidth, window.innerHeight);

window.R = renderer

export default loader;
