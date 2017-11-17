import * as PIXI from 'pixi.js';

const renderer = PIXI.autoDetectRenderer(256, 256);
const stage = new PIXI.Container();
const stage2 = new PIXI.Container();

renderer.view.style.position = 'absolute';
renderer.view.style.display = 'block';
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

let rectangle = new PIXI.Graphics();
rectangle.lineStyle(4, 0xff3300, 1);
rectangle.beginFill(0x66ccff);
rectangle.drawRect(170, 0, 150, 200);
rectangle.endFill();
stage2.addChild(rectangle);

stage.visible = true;
stage2.visible = false;

export default function main() {
  //Create the renderer
  //Add the canvas to the HTML document
  document.body.appendChild(renderer.view);
  //Create a container object called the `stage`

  // Renderer background color
  renderer.backgroundColor = 0x061639;

  let door = new PIXI.Sprite(PIXI.loader.resources['door.png'].texture);
  door.width = 150;
  door.height = 150;
  door.position.set(500, 0);
  stage.addChild(door);

  console.log(PIXI.loader.resources['cat.png']);
  let cat = new PIXI.Sprite(PIXI.loader.resources['cat.png'].texture);
  cat.position.set(50, 50);
  stage.addChild(cat);

  let kitchen = new PIXI.Sprite(PIXI.loader.resources['kitchen.png'].texture);
  stage.addChild(kitchen);

  cat.interactive = true;
  cat.buttonMode = true;
  cat.on('pointerdown', onClick);
  function onClick() {
    stage2.visible = true;
    stage.visible = false;
  }

  function gameLoop() {
    //Loop this function at 60 frames per second
    requestAnimationFrame(gameLoop);

    //Move the cat 1 pixel to the right each frame
    if (cat.x < 500) {
      cat.x += 1;
      cat.anchor.set(0.5);
      cat.rotation += 0.1 * 1;
    }
    //Render the stage to see the animation
    renderer.render(stage);
  }

  //Start the game loop
  gameLoop();
  paint();

  stage2.visible ? renderer.render(stage2) : gameLoop();
}

function paint() {
  requestAnimationFrame(paint);
  // renderer.render(stage);
  renderer.render(stage2);
}
