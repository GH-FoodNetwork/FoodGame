// import React from 'react';
// import { render } from 'react-dom';
// import { AppContainer } from 'react-hot-loader';
import main from './test';
import recipeBook from './views/recipe-book';
import singleRecipe from './views/single-recipe';
import gameplay from './views/gameplay';
import bonusPopup from './views/bonus-pop-up';
import titleSplash from './views/title-splash-screen';

import App from '~/App';
import * as PIXI from 'pixi.js';

// Debugging
window.PIXI = PIXI;

PIXI.loader
  .add('cat.png')
  .add('door.png')
  .add('kitchen.png')
  .add('images/counters.png')
  .add('images/customer2.png')
  .add('images/pantry-misc.png')
  .load(main)
  // .load(recipeBook)
  // .load(singleRecipe)
  .load(gameplay)
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

// function main() {
//   //Create the renderer
//   //Add the canvas to the HTML document
//   document.body.appendChild(renderer.view);
//   //Create a container object called the `stage`

//   renderer.backgroundColor = 0x061639;
//   console.log(PIXI.loader.resources['cat.png']);
//   let cat = new PIXI.Sprite(PIXI.loader.resources['cat.png'].texture);
//   stage.addChild(cat);

//   let door = new PIXI.Sprite(PIXI.loader.resources['door.png'].texture);
//   stage.addChild(door);

//   let kitchen = new PIXI.Sprite(PIXI.loader.resources['kitchen.png'].texture);
//   stage.addChild(kitchen);

//   paint();
// }

// function paint() {
//   requestAnimationFrame(paint);
//   renderer.render(stage);
// }
