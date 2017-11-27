import { Container, Graphics, Sprite } from 'pixi.js';
import { renderer } from '../main';

const stage = new Container();

export default function titleSplash() {
  document.body.appendChild(renderer.view);
}
