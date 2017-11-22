import * as PIXI from 'pixi.js';
const Container = PIXI.Container,
  Graphics = PIXI.Graphics,
  Sprite = PIXI.Sprite,
  BaseTexture = PIXI.BaseTexture;
import store, { addDestination, removeDestination } from '../store';

const renderer = PIXI.autoDetectRenderer(256, 256);
const stage = new Container();
let state;

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
  // stage.addChild(cust);
  //setup('images/counters.png', 0, 0, 8, 6, {x: 50, y: 50});

  let atlas = buildAtlas();
  let chef = atlas.topChef;
  let choppingBoards = [
    atlas.choppingCounter,
    atlas.choppingCounter2,
    atlas.choppingCounter3
  ];
  let fryingPans = [atlas.fryingPan, atlas.fryingPan2];

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
    let { destinations } = state;
    if (destinations.length) {
      destinations[0].x - chef.x > 0
        ? (chef.x += rightOrDown)
        : (chef.x += leftOrUp);
      destinations[0].y - chef.y > 0
        ? (chef.y += rightOrDown)
        : (chef.y += leftOrUp);

        if (chef.x === destinations[0].x && chef.y === destinations[0].y) {
          console.log('at destination!')
          console.log('destination removed');
          store.dispatch(removeDestination());
        }
    }

  }

  choppingBoards.map(board => {
    board.interactive = true;
    board.buttonMode = true;
    board.on('pointerdown', onClick);
  });
  fryingPans.map(pan => {
    pan.interactive = true;
    pan.buttonMode = true;
    pan.on('pointerdown', onClick);
  });
  function onClick(evt) {
    store.dispatch(removeDestination());
    const { x, y } = evt.data.global;
    store.dispatch(addDestination({ x, y }));
    movePlayer();
  }
}

function moneyRender(amount = 10) {
  var money = new PIXI.Text('$' + amount, {
    fontFamily: 'journal, Arial',
    fontSize: 52,
    fill: 'black',
    stroke: 'white',
    strokeThickness: 4,
    letterSpacing: 1,
    fontStyle: 'bold'
  });

  money.position.set(800, 20);
  stage.addChild(money);
  renderer.render(stage);

  return money;
}

const buildAtlas = () => {
  let xStart = 164;
  let width = 64;

  return {
    sinkCounter: setup('images/counters.png', 0, 0, 8, 4.5, {
      x: xStart,
      y: 50
    }),
    sinkCounter2: setup('images/counters.png', 3, 0, 8, 4.5, {
      x: xStart + width,
      y: 50
    }),
    emptyCounter: setup('images/counters.png', 0, 1, 8, 4.5, {
      x: xStart + 2 * width,
      y: 50
    }),
    choppingCounter: setup('images/counters.png', 1, 1, 8, 4.5, {
      x: xStart + 3 * width,
      y: 50
    }),
    choppingCounter2: setup('images/counters.png', 1, 1, 8, 4.5, {
      x: xStart + 4 * width,
      y: 50
    }),
    choppingCounter3: setup('images/counters.png', 1, 1, 8, 4.5, {
      x: xStart + 5 * width,
      y: 50
    }),
    emptyCounter2: setup('images/counters.png', 0, 1, 8, 4.5, {
      x: xStart + 6 * width,
      y: 50
    }),
    scaleCounter: setup('images/counters.png', 3, 2, 8, 4.5, {
      x: xStart + 7 * width,
      y: 50
    }),

    //pantry: setup('images/pantry-misc.png', 1, 0, 5, 4, {x: xStart + 9*width, y: 50}),

    sideCounter: setup('images/counters.png', 0, 3, 8, 4.5, { x: 100, y: 50 }),
    sideCounter2: setup('images/counters.png', 0, 3, 8, 4.5, {
      x: 100,
      y: 146
    }),
    sideCounter3: setup('images/counters.png', 0, 3, 8, 4.5, {
      x: 100,
      y: 242
    }),
    sideCounter4: setup('images/counters.png', 0, 3, 8, 4.5, {
      x: 100,
      y: 338
    }),
    sideCounter5: setup('images/counters.png', 0, 3, 8, 4.5, {
      x: 100,
      y: 434
    }),
    sideCounter6: setup('images/counters.png', 0, 3, 8, 4.5, {
      x: 100,
      y: 530
    }),

    bottomCounter: setup('images/counters.png', 0, 1, 8, 4.5, {
      x: xStart,
      y: 455
    }),
    bottomCounter2: setup('images/counters.png', 0, 1, 8, 4.5, {
      x: xStart + width,
      y: 455
    }),
    bottomCounter3: setup('images/counters.png', 7, 0, 8, 4.5, {
      x: xStart + 2 * width,
      y: 455
    }),
    bottomCounter4: setup('images/counters.png', 7, 0, 8, 4.5, {
      x: xStart + 3 * width,
      y: 455
    }),
    bottomCounter5: setup('images/counters.png', 7, 0, 8, 4.5, {
      x: xStart + 4 * width,
      y: 455
    }),
    bottomCounter6: setup('images/counters.png', 7, 0, 8, 4.5, {
      x: xStart + 5 * width,
      y: 455
    }),
    bottomCounter7: setup('images/counters.png', 7, 0, 8, 4.5, {
      x: xStart + 6 * width,
      y: 455
    }),
    bottomCounter8: setup('images/counters.png', 0, 1, 8, 4.5, {
      x: xStart + 7 * width,
      y: 455
    }),

    coolCustomer: setup(
      'images/customer2.png',
      1,
      1,
      3,
      4,
      { x: 30, y: 50 },
      { x: 3.5, y: 3.5 }
    ),

    topChef: setup(
      'images/chef.png',
      1,
      1,
      3,
      4,
      { x: stage.width / 2, y: stage.height / 2 },
      { x: 3.5, y: 3.5 }
    ),

    sousChef: setup(
      'images/souschef.png',
      0,
      0,
      1,
      1,
      { x: 750, y: 420 },
      { x: 0.25, y: 0.25 }
    ),

    fryingPan: setup(
      'images/fryingpan.png',
      0,
      0,
      1,
      1,
      { x: 555, y: 425 },
      { x: 0.07, y: 0.07 }
    ),
    fryingPan2: setup(
      'images/fryingpan.png',
      0,
      0,
      1,
      1,
      { x: 491, y: 425 },
      { x: 0.07, y: 0.07 }
    ),

    trashCan: setup(
      'images/trashcancopy.png',
      0,
      0,
      1,
      1,
      { x: xStart + 9 * width, y: 50 },
      { x: 0.1, y: 0.1 }
    ),

    jollof: spriteSetup('images/jollof.png', 40, 40, 100, 50),

    recipeBook: setup(
      'images/recipebook.png',
      0,
      0,
      1,
      1,
      { x: 735, y: 350 },
      { x: 0.25, y: 0.25 }
    ),

    money: moneyRender()
  };
};
// remember to load image in main.js

function spriteSetup(img, spriteWidth, spriteHeight, x, y) {
  var sprite = new Sprite(PIXI.loader.resources[img].texture);

  sprite.anchor.set(0.5);

  sprite.width = spriteWidth;
  sprite.height = spriteHeight;
  sprite.position.set(x, y);

  //Add the counter to the stage
  stage.addChild(sprite);

  //Render the stage
  renderer.render(stage);

  return sprite;
}

function setup(
  img,
  xPosition,
  yPosition,
  xWidth,
  yHeight,
  canvasPosition,
  spriteScale = { x: 2, y: 2 }
) {
  let texture = new PIXI.Texture(BaseTexture.fromImage(img));
  //addToCache(texture, img)

  //Create the `tileset` sprite from the texture
  //var texture = TextureCache[img];

  let width = texture.baseTexture.source.width;
  let height = texture.baseTexture.source.height;

  let colWidth = width / xWidth;
  let rowHeight = height / yHeight;

  //Create a rectangle object that defines the position and
  //size of the sub-image you want to extract from the texture
  var rectangle = new PIXI.Rectangle(
    xPosition * colWidth,
    yPosition * rowHeight,
    width - xPosition * colWidth > colWidth
      ? colWidth
      : width - xPosition * colWidth,
    height - yPosition * rowHeight > rowHeight
      ? rowHeight
      : height - yPosition * rowHeight
  );

  //Tell the texture to use that rectangular section
  texture.frame = rectangle;
  //texture.sourceScale = 2;

  //Create the sprite from the texture
  var sprite = new Sprite(texture);

  sprite.anchor.set(0.5);
  //(width / xWidth) / 2, (height / yHeight) / 2

  //Position the rocket sprite on the canvas
  sprite.x = canvasPosition.x;
  sprite.y = canvasPosition.y;

  sprite.scale.x = spriteScale.x;
  sprite.scale.y = spriteScale.y;

  //Add the counter to the stage
  stage.addChild(sprite);

  //Render the stage
  renderer.render(stage);

  return sprite;
}
