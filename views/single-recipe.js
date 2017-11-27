import { Container, Graphics, Sprite } from 'pixi.js';
import { renderer } from '../main';

const stage = new Container();

export default function singleRecipe() {
  document.body.appendChild(renderer.view);
  renderer.backgroundColor = 0x061639;
}
