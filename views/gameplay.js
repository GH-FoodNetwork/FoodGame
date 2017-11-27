import * as PIXI from 'pixi.js';

const {
  Container, Graphics, Sprite, BaseTexture,
} = PIXI;
import store, { addDestination, removeDestination } from '../store';
// import { recipeBookStage } from './recipe-book';

const renderer = PIXI.autoDetectRenderer(256, 256);
export const stage = new Container();
export const gameStage = new Container();
export const recipeBookStage = new Container();
export let kitchenObjects = {};
let state;
stage.addChild(gameStage);
stage.addChild(recipeBookStage);
recipeBookStage.visible = false;
// let stage = gameStage;

renderer.view.style.position = 'absolute';
renderer.view.style.display = 'block';
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

export default function gameplay() {
  document.body.appendChild(renderer.view);

  renderer.backgroundColor = 0xffffff;

  // let cust = new Sprite(PIXI.loader.resources['images/customer2.png'].texture);
  // cust.width = 150;
  // cust.height = 150;
  // cust.position.set(500, 0);
  // gameStage.addChild(cust);
  //setup('images/counters.png', 0, 0, 8, 6, {x: 50, y: 50});

  kitchenObjects = buildkitchenObjects();
  const chef = kitchenObjects.topChef;
  const choppingBoards = [kitchenObjects.choppingCounter, kitchenObjects.choppingCounter2];
  const fryingPans = [kitchenObjects.fryingPan1, kitchenObjects.fryingPan2];
  const {
    sousChef, jollof, trashCan1, recipeBook,
  } = kitchenObjects;
  let trashCan = trashCan1;

  function animateSprite(func) {
    requestAnimationFrame(func);
    renderer.render(stage);
  }

  function movePlayer() {
    const rightOrDown = 1;
    const leftOrUp = -1;

    //Loop this function at 60 frames per second
    state = store.getState();
    animateSprite(movePlayer);
    const { destinations } = state;
    if (destinations.length) {
      destinations[0].x - chef.x > 0 ? (chef.x += rightOrDown) : (chef.x += leftOrUp);
      destinations[0].y - chef.y > 0 ? (chef.y += rightOrDown) : (chef.y += leftOrUp);

      if (chef.x === destinations[0].x && chef.y === destinations[0].y) {
        console.log('at destination!');
        console.log('destination removed');
        store.dispatch(removeDestination());
      }
    }
  }

  function clickRecipeBook() {
    gameStage.visible = false;
    recipeBookStage.visible = true;
    // stage = recipeBookStage;
  }
  recipeBook.interactive = true;
  recipeBook.buttonMode = true;
  recipeBook.on('pointerdown', clickRecipeBook);

  choppingBoards.map((board) => {
    board.interactive = true;
    board.buttonMode = true;
    board.on('pointerdown', onClick);
  });
  fryingPans.map((pan) => {
    pan.interactive = true;
    pan.buttonMode = true;
    pan.on('pointerdown', onClick);
  });
  sousChef.interactive = true;
  sousChef.buttonMode = true;
  sousChef.on('pointerdown', onClick);

  jollof.interactive = true;
  jollof.buttonMode = true;
  jollof.on('pointerdown', onClick);

  trashCan.interactive = true;
  trashCan.buttonMode = true;
  trashCan.on('pointerdown', clickOnTrash);

  function clickOnTrash() {
    kitchenObjects.trashCan2 = setup(
      'images/trashcan2.png',
      0,
      0,
      1,
      1,
      { x: 676, y: 50 },
      { x: 0.35, y: 0.35 },
    );
    const { trashCan2 } = kitchenObjects;
    trashCan1.alpha = 0;
    trashCan = trashCan2;
  }

  function onClick(evt) {
    store.dispatch(removeDestination());
    const { x, y } = evt.data.global;
    store.dispatch(addDestination({ x, y }));
    movePlayer();
  }
}

function moneyRender(amount = 10) {
  const money = new PIXI.Text(`$${amount}`, {
    fontFamily: 'journal, Arial',
    fontSize: 52,
    fill: 'black',
    stroke: 'white',
    strokeThickness: 4,
    letterSpacing: 1,
    fontStyle: 'bold',
  });
  money.anchor.set(0.5);
  money.position.set(money.width + 100, 400); //TODO: Figure how to make relative height
  gameStage.addChild(money);
  renderer.render(stage);

  return money;
}

const buildkitchenObjects = () => {
  const xStart = 164;
  const width = 64;

  //Top Counters
  kitchenObjects.sinkCounter = setup('images/counters.png', 0, 0, 8, 4.5, {
    x: xStart,
    y: 50,
  });
  kitchenObjects.sinkCounter2 = setup('images/counters.png', 3, 0, 8, 4.5, {
    x: xStart + width,
    y: 50,
  });
  kitchenObjects.choppingCounter = setup('images/counters.png', 1, 1, 8, 4.5, {
    x: xStart + 2 * width,
    y: 50,
  });
  kitchenObjects.choppingCounter2 = setup('images/counters.png', 1, 1, 8, 4.5, {
    x: xStart + 3 * width,
    y: 50,
  });
  kitchenObjects.scaleCounter = setup('images/counters.png', 3, 2, 8, 4.5, {
    x: xStart + 4 * width,
    y: 50,
  });
  kitchenObjects.emptyCounter = setup('images/counters.png', 0, 1, 8, 4.5, {
    x: xStart + 5 * width,
    y: 50,
  });
  /*spiceRack: setup('images/Spices-Complete_Rack.png', 0, 0, 1, 1, {
        x: xStart + 5 * width,
        y: 10
    }, { x: .5, y: .5 }),*/
  kitchenObjects.emptyCounter2 = setup('images/counters.png', 0, 1, 8, 4.5, {
    x: xStart + 6 * width,
    y: 50,
  });
  /*kitchenObjects[spiceRack]= setup('images/Spices-Complete_Rack.png', 0, 0, 1, 1, {
        x: xStart + 6 * width,
        y: 10
    }, { x: .5, y: .5 })*/
  kitchenObjects.wineCounter = setup('images/counters.png', 4, 2, 8, 4.5, {
    x: xStart + 7 * width,
    y: 50,
  });

  //pantry: setup('images/pantry-misc.png', 1, 0, 5, 4, {x: xStart + 9*width, y: 50}),

  //Side Counters
  kitchenObjects.sideCounter = setup('images/counters.png', 0, 3, 8, 4.5, { x: 100, y: 50 });
  kitchenObjects.sideCounter2 = setup('images/counters.png', 0, 3, 8, 4.5, {
    x: 100,
    y: 146,
  });
  kitchenObjects.sideCounter3 = setup('images/counters.png', 0, 3, 8, 4.5, {
    x: 100,
    y: 242,
  });
  kitchenObjects.sideCounter4 = setup('images/counters.png', 0, 3, 8, 4.5, {
    x: 100,
    y: 338,
  });
  kitchenObjects.sideCounter5 = setup('images/counters.png', 0, 3, 8, 4.5, {
    x: 100,
    y: 434,
  });
  kitchenObjects.sideCounter6 = setup('images/counters.png', 0, 3, 8, 4.5, {
    x: 100,
    y: 530,
  });
  //Bottom Counters
  kitchenObjects.bottomEmptyCounter1 = setup('images/counters.png', 0, 1, 8, 4.5, {
    x: xStart,
    y: 455,
  });
  kitchenObjects.bottomEmptyCounter2 = setup('images/counters.png', 0, 1, 8, 4.5, {
    x: xStart + width,
    y: 455,
  });
  kitchenObjects.bottomGrillCounter1 = setup('images/counters.png', 7, 0, 8, 4.5, {
    x: xStart + 2 * width,
    y: 455,
  });
  kitchenObjects.bottomGrillCounter2 = setup('images/counters.png', 7, 0, 8, 4.5, {
    x: xStart + 3 * width,
    y: 455,
  });
  kitchenObjects.bottomGrillCounter3 = setup('images/counters.png', 7, 0, 8, 4.5, {
    x: xStart + 4 * width,
    y: 455,
  });
  kitchenObjects.bottomFryingCounter1 = setup('images/counters.png', 7, 0, 8, 4.5, {
    x: xStart + 5 * width,
    y: 455,
  });
  kitchenObjects.fryingPan1 = setup(
    'images/fryingpan.png',
    0,
    0,
    1,
    1,
    { x: 491, y: 425 },
    { x: 0.07, y: 0.07 },
  );
  kitchenObjects.bottomFryingCounter2 = setup('images/counters.png', 7, 0, 8, 4.5, {
    x: xStart + 6 * width,
    y: 455,
  });
  kitchenObjects.fryingPan2 = setup(
    'images/fryingpan.png',
    0,
    0,
    1,
    1,
    { x: 555, y: 425 },
    { x: 0.07, y: 0.07 },
  );
  kitchenObjects.bottomEmptyCounter3 = setup('images/counters.png', 0, 1, 8, 4.5, {
    x: xStart + 7 * width,
    y: 455,
  });

  //Right side counters
  /*kitchenObjects["rightSideCounter"] = setup('images/counters.png', 0, 3, 8, 4.5, { x: xStart + 8 * width, y: 50 })*/
  kitchenObjects.rightSideCounter2 = setup('images/counters.png', 0, 3, 8, 4.5, {
    x: xStart + 8 * width,
    y: 146,
  });
  kitchenObjects.rightSideCounter3 = setup('images/counters.png', 0, 3, 8, 4.5, {
    x: xStart + 8 * width,
    y: 242,
  });
  kitchenObjects.rightSideCounter4 = setup('images/counters.png', 0, 3, 8, 4.5, {
    x: xStart + 8 * width,
    y: 338,
  });
  kitchenObjects.rightSideCounter5 = setup('images/counters.png', 0, 3, 8, 4.5, {
    x: xStart + 8 * width,
    y: 434,
  });
  kitchenObjects.rightSideCounter6 = setup('images/counters.png', 0, 3, 8, 4.5, {
    x: xStart + 8 * width,
    y: 530,
  });
  kitchenObjects.mixingBowl1 = setup(
    'images/counters.png',
    3,
    4,
    7.3,
    4.5,
    { x: xStart + 8 * width, y: kitchenObjects.rightSideCounter2.y },
    { x: 1.5, y: 1.5 },
  );
  kitchenObjects.mixingBowl2 = setup(
    'images/counters.png',
    3,
    4,
    7.3,
    4.5,
    { x: xStart + 8 * width, y: kitchenObjects.rightSideCounter3.y },
    { x: 1.5, y: 1.5 },
  );

  //Characters, etc.
  kitchenObjects.coolCustomer = setup(
    'images/customer2.png',
    1,
    1,
    3,
    4,
    { x: 30, y: 50 },
    { x: 3.5, y: 3.5 },
  );

  kitchenObjects.topChef = setup(
    'images/chef.png',
    1,
    1,
    3,
    4,
    { x: gameStage.width / 2, y: gameStage.height / 2 },
    { x: 3.5, y: 3.5 },
  );

  //   kitchenObjects.platter = setup(
  //     'images/silver-metallic-tray.jpg',
  //     0,
  //     0,
  //     1,
  //     1,
  //     { x: 0, y: 0 },
  //     { x: 0.1, y: 0.1 },
  //   );

  kitchenObjects.sousChef = setup(
    'images/souschef.png',
    0,
    0,
    1,
    1,
    { x: 700, y: 420 },
    { x: 0.25, y: 0.25 },
  );

  kitchenObjects.recipeBook = setup(
    'images/recipebook.png',
    0,
    0,
    1,
    1,
    { x: kitchenObjects.sousChef.x - 15, y: 350 },
    { x: 0.25, y: 0.25 },
  );

  kitchenObjects.trashCan1 = setup(
    'images/trashcancopy.png',
    0,
    0,
    1,
    1,
    { x: xStart + 8 * width, y: 50 },
    { x: 0.1, y: 0.1 },
  );

  kitchenObjects.jollof = setup(
    'images/jollof.png',
    0,
    0,
    1,
    1,
    { x: 100, y: 50 },
    { x: 0.15, y: 0.15 },
  );

  kitchenObjects.money = moneyRender();

  return kitchenObjects;
};

// remember to load image in main.js

export function setup(
  img,
  xPosition,
  yPosition,
  xWidth,
  yHeight,
  canvasPosition,
  spriteScale = { x: 2, y: 2 },
) {
  const texture = new PIXI.Texture(BaseTexture.fromImage(img));
  //addToCache(texture, img)

  //Create the `tileset` sprite from the texture
  //var texture = TextureCache[img];

  const { width, height } = texture.baseTexture.source;

  const colWidth = width / xWidth;
  const rowHeight = height / yHeight;

  //Create a rectangle object that defines the position and
  //size of the sub-image you want to extract from the texture
  const rectangle = new PIXI.Rectangle(
    xPosition * colWidth,
    yPosition * rowHeight,
    width - xPosition * colWidth > colWidth ? colWidth : width - xPosition * colWidth,
    height - yPosition * rowHeight > rowHeight ? rowHeight : height - yPosition * rowHeight,
  );

  //Tell the texture to use that rectangular section
  texture.frame = rectangle;
  //texture.sourceScale = 2;

  //Create the sprite from the texture
  const sprite = new Sprite(texture);

  sprite.anchor.set(0.5);
  //(width / xWidth) / 2, (height / yHeight) / 2

  //Position the rocket sprite on the canvas
  sprite.x = canvasPosition.x;
  sprite.y = canvasPosition.y;

  sprite.scale.x = spriteScale.x;
  sprite.scale.y = spriteScale.y;

  //Add the counter to the stage
  gameStage.addChild(sprite);

  //Render the stage
  renderer.render(stage);

  return sprite;
}
