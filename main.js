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
  .load(function(loader, resources){
    objectAtlasInit(resources);
  })
  // .load(recipeBook)
  // .load(singleRecipe)
  .load(gameplay);
  // .load(bonusPopup)
  // .load(titleSplash);
// const renderer = PIXI.autoDetectRenderer(256, 256);
// const stage = new PIXI.Container();

// renderer.view.style.position = 'absolute';
// renderer.view.style.display = 'block';
// renderer.autoResize = true;
// renderer.resize(window.innerWidth, window.innerHeight);

// let rectangle = new PIXI.Graphics();
// rectangle.lineStyle(4, 0xff3300, 1);
// rectangle.beginFill(0x66ccff);
// rectangle.drawRect(170, 0, 150, 200);
// rectangle.endFill();
// stage.addChild(rectangle);

export default loader;
