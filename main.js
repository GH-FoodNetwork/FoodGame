import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import App from '~/App';
import * as PIXI from 'pixi.js';

// Debugging
window.PIXI = PIXI;

PIXI.loader.add('cat.png').load(main);
const renderer = PIXI.autoDetectRenderer(256, 256);
const stage = new PIXI.Container();

function main() {
  //Create the renderer
  //Add the canvas to the HTML document
  document.body.appendChild(renderer.view);
  //Create a container object called the `stage`

  renderer.backgroundColor = 0x061639;
  console.log(PIXI.loader.resources['cat.png']);
  var sprite = new PIXI.Sprite(PIXI.loader.resources['cat.png'].texture);
  stage.addChild(sprite);

  paint();
}

function paint() {
  requestAnimationFrame(paint);
  renderer.render(stage);
}
