import * as PIXI from 'pixi.js';

const { Container, Graphics, Sprite } = PIXI;
import { gameStage, recipeBookStage } from '../main';
import { setup, objectAtlas } from '../atlases';
import { renderer } from '../main';

export function bookUpdate() {
  //Funnel all animation updates here
  // movePlayer();
  //Rerender
  // requestAnimationFrame(bookUpdate);
  renderer.render(recipeBookStage);
}

export default function recipeBook() {
  document.body.appendChild(renderer.view);

  const cat = setup(recipeBookStage, objectAtlas.cat, { x: 50, y: 50 });

  cat.interactive = true;
  cat.buttonMode = true;
  cat.on('pointerdown', onClick);
  function onClick() {
    recipeBookStage.visible = false;
    gameStage.visible = true;
  }
  renderer.backgroundColor = 0x061639;
  bookUpdate();
}
