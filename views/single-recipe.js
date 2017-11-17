import * as PIXI from 'pixi.js';
const Container = PIXI.Container,
      Graphics = PIXI.Graphics,
      Sprite = PIXI.Sprite;

const renderer = PIXI.autoDetectRenderer(256, 256);
const stage = new Container();

renderer.view.style.position = 'absolute';
renderer.view.style.display = 'block';
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

export default function singleRecipe() {
  document.body.appendChild(renderer.view);
  renderer.backgroundColor = 0x061639;
}
