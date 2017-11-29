import {
  Container,
  Graphics,
  Sprite,
  Texture,
  BaseTexture,
  Rectangle,
  autoDetectRenderer,
  Text
} from 'pixi.js';

import store, { addDestination, removeDestination, addRecipe, setSousChefHolding, moveFromSousToChef, dequeueStep } from '../store';
import { setup, objectAtlas } from '../atlases';
import { recipeBookStage, gameStage, stage, renderer } from '../main'; //START WITH USING MOVEFROMSOUSTOCHEF!!!!!!
import { bookUpdate } from './recipe-book';
import recipeArray from '../recipe-constructor';

// export const stage = new Container();
// export const gameStage = new Container();
// export const recipeBookStage = new Container();
export let kitchenObjects = {};
let state;
// stage.addChild(gameStage);
// stage.addChild(recipeBookStage);
// recipeBookStage.visible = false;
// let stage = gameStage;

export function update() {
  state = store.getState();
  gameStage.addChild(state.platter.foodStack);
  // Funnel all animation updates here
  movePlayer();
  // Rerender
  // console.log(stage);
  requestAnimationFrame(update);
  renderer.render(stage);
}

function movePlayer() {
  const { destinations } = state;
  if (destinations.length) {
    const rightOrDown = 1;
    const leftOrUp = -1;
    const chef = kitchenObjects.topChef;

    destinations[0].x - chef.x > 0
      ? (chef.x += rightOrDown)
      : (chef.x += leftOrUp);
    destinations[0].y - chef.y > 0
      ? (chef.y += rightOrDown)
      : (chef.y += leftOrUp);

    if (chef.x === destinations[0].x && chef.y === destinations[0].y) {
      console.log('at destination!');
      console.log('destination removed');
      store.dispatch(removeDestination());
    }
  }
}

export default function gameplay() {
  document.body.appendChild(renderer.view);

  renderer.backgroundColor = 0xffffff;



  function onClick(evt) {
    state = store.getState()
    if (evt.target.station !== state.steps[0]) {
      alert("Wrong station!")
    } else {
      console.log(evt.target)
    store.dispatch(removeDestination());
    // TODO: add stationPosition for all objects
    const { x, y } = evt.target.stationPosition;
    store.dispatch(addDestination({ x, y }));
    movePlayer();
    store.dispatch(dequeueStep());
    state = store.getState();
    console.log("steps?", state.steps)
    }
  }

  /**
   * Objects activated by 'onClick' function
   */
  kitchenObjects = buildkitchenObjects();
  const {
    sousChef,
    jollof,
    trashCan1,
    recipeBook,
    wineCounter
  } = kitchenObjects;
  let trashCan = trashCan1;
  const choppingBoards = [
    kitchenObjects.choppingCounter,
    kitchenObjects.choppingCounter2
  ];
  const fryingPans = [kitchenObjects.fryingPan1, kitchenObjects.fryingPan2];

  // grill counters
  const grillCounters = [
    kitchenObjects.bottomGrillCounter1,
    kitchenObjects.bottomGrillCounter2,
    kitchenObjects.bottomGrillCounter3
  ];
  // spice counter -- TO BE ANNOUNCED
  // mixing counter
  const mixingBowls = [kitchenObjects.mixingBowl1, kitchenObjects.mixingBowl2];

  choppingBoards.forEach(board => {
    board.interactive = true;
    board.buttonMode = true;
    board.on('pointerdown', onClick);
  });
  fryingPans.forEach(pan => {
    pan.interactive = true;
    pan.buttonMode = true;
    pan.on('pointerdown', onClick);
  });

  grillCounters.forEach(grill => {
    grill.interactive = true;
    grill.buttonMode = true;
    grill.on('pointerdown', onClick);
  });

  wineCounter.interactive = true;
  wineCounter.buttonMode = true;
  wineCounter.on('pointerdown', onClick);

  // recipeBook onClick
  function clickRecipeBook() {
    gameStage.visible = false;
    recipeBookStage.visible = true;
  }
  recipeBook.interactive = true;
  recipeBook.buttonMode = true;
  recipeBook.on('pointerdown', clickRecipeBook);

  // sousChef onClick
  function clickSousChef() {
    state = store.getState();
    const { sousChefHolding } = state.platter;
    if (sousChefHolding) {
      console.log('isHolding!');

      recipeBook.visible = true;
      recipeBook.interactive = true;
      recipeBook.buttonMode = true;
      store.dispatch(setSousChefHolding(false));
    } else {
      // TODO: Remove foodStack from gameStage

      recipeBook.visible = false;
      recipeBook.interactive = false;
      recipeBook.buttonMode = false;
      store.dispatch(addRecipe(new recipeArray[0]()));
      store.dispatch(setSousChefHolding(true));
      state = store.getState();
      console.log(state.recipes[0].steps)
    }
  }

  sousChef.interactive = true;
  sousChef.buttonMode = true;
  sousChef.on('pointerdown', clickSousChef);

  mixingBowls.forEach(bowl => {
    bowl.interactive = true;
    bowl.buttonMode = true;
    bowl.on('pointerdown', onClick);
  });

  jollof.interactive = true;
  jollof.buttonMode = true;
  jollof.on('pointerdown', onClick);

  trashCan.interactive = true;
  trashCan.buttonMode = true;
  trashCan.on('pointerdown', clickOnTrash);

  function clickOnTrash() {
    kitchenObjects.trashCan2 = setup(
      gameStage,
      objectAtlas.trashArmsCrossed,
      { x: 676, y: 50 },
      { x: 0.35, y: 0.35 }
    );
    const { trashCan2 } = kitchenObjects;
    trashCan1.alpha = 0;
    trashCan = trashCan2;
  }

  update();

}

function moneyRender(amount = 10) {
  const money = new Text(`$${amount}`, {
    fontFamily: 'journal, Arial',
    fontSize: 52,
    fill: 'black',
    stroke: 'white',
    strokeThickness: 4,
    letterSpacing: 1,
    fontStyle: 'bold'
  });
  money.anchor.set(0.5);
  money.position.set(money.width + 100, 400); // TODO: Figure how to make relative height
  gameStage.addChild(money);
  renderer.render(gameStage);

  return money;
}

const buildkitchenObjects = () => {
  const xStart = 164;
  const width = 64;
  let floorStart = 16;

  // floor
  for (let i = 1; i < 97; i++) {
    if (floorStart > 12 * 64) {
      floorStart = 16;
    }
    kitchenObjects['floor' + i] = setup(gameStage, objectAtlas.floor, {
      x: floorStart,
      y: (64 * (i % 12 === 0 ? Math.floor(i / 12) - 1 : Math.floor(i / 12))) + 64,
    });
    floorStart += 64
  }

  // wall
  floorStart = 16;
  for (let i = 1; i < 13; i++) {
    kitchenObjects['wall' + i] = setup(gameStage, objectAtlas.wall, {
      x: floorStart + 64*(i-1),
      y: 16,
    });
  }

  // kitchenObjects.floor = setup(gameStage, objectAtlas.floor, {
  //   x: 32, y: 32,
  // })
  // Top Counters
  kitchenObjects.sinkCounter = setup(gameStage, objectAtlas.sinkCounter, {
    x: xStart,
    y: 50
  });
  kitchenObjects.sinkCounter2 = setup(gameStage, objectAtlas.sinkCounter, {
    x: xStart + width,
    y: 50
  });
  kitchenObjects.choppingCounter = setup(
    gameStage,
    objectAtlas.choppingCounter,
    {
      x: xStart + 2 * width,
      y: 50
    }
  );
  kitchenObjects.choppingCounter.station = 'chopping';

  kitchenObjects.choppingCounter2 = setup(
    gameStage,
    objectAtlas.choppingCounter,
    {
      x: xStart + 3 * width,
      y: 50
    }
  );
  kitchenObjects.choppingCounter2.station = 'chopping';

  kitchenObjects.scaleCounter = setup(gameStage, objectAtlas.scaleCounter, {
    x: xStart + 4 * width,
    y: 50
  });
  kitchenObjects.emptyCounter = setup(gameStage, objectAtlas.emptyCounter, {
    x: xStart + 5 * width,
    y: 50
  });
  /* spiceRack: setup('images/Spices-Complete_Rack.png', 0, 0, 1, 1, {
        x: xStart + 5 * width,
        y: 10
    }, { x: .5, y: .5 }),*/
  kitchenObjects.emptyCounter2 = setup(gameStage, objectAtlas.emptyCounter, {
    x: xStart + 6 * width,
    y: 50
  });
  /* kitchenObjects[spiceRack]= setup('images/Spices-Complete_Rack.png', 0, 0, 1, 1, {
        x: xStart + 6 * width,
        y: 10
    }, { x: .5, y: .5 })*/
  kitchenObjects.wineCounter = setup(gameStage, objectAtlas.wineCounter, {
    x: xStart + 7 * width,
    y: 50
  });

  // pantry: setup('images/pantry-misc.png', 1, 0, 5, 4, {x: xStart + 9*width, y: 50}),

  // Side Counters
  kitchenObjects.sideCounter = setup(gameStage, objectAtlas.sideCounter, {
    x: 100,
    y: 50
  });
  kitchenObjects.sideCounter2 = setup(gameStage, objectAtlas.sideCounter, {
    x: 100,
    y: 146
  });
  kitchenObjects.sideCounter3 = setup(gameStage, objectAtlas.sideCounter, {
    x: 100,
    y: 242
  });
  kitchenObjects.sideCounter4 = setup(gameStage, objectAtlas.sideCounter, {
    x: 100,
    y: 338
  });
  kitchenObjects.sideCounter5 = setup(gameStage, objectAtlas.sideCounter, {
    x: 100,
    y: 434
  });
  kitchenObjects.sideCounter6 = setup(gameStage, objectAtlas.sideCounter, {
    x: 100,
    y: 530
  });
  // Bottom Counters
  const bottomCounterY = 460;
  kitchenObjects.bottomEmptyCounter1 = setup(
    gameStage,
    objectAtlas.emptyCounter,
    {
      x: xStart,
      y: bottomCounterY
    }
  );
  kitchenObjects.bottomEmptyCounter2 = setup(
    gameStage,
    objectAtlas.emptyCounter,
    {
      x: xStart + width,
      y: bottomCounterY
    }
  );
  kitchenObjects.bottomGrillCounter1 = setup(
    gameStage,
    objectAtlas.grillCounter,
    {
      x: xStart + 2 * width,
      y: bottomCounterY
    }
  );
  kitchenObjects.bottomGrillCounter2 = setup(
    gameStage,
    objectAtlas.grillCounter,
    {
      x: xStart + 3 * width,
      y: bottomCounterY
    }
  );
  kitchenObjects.bottomGrillCounter3 = setup(
    gameStage,
    objectAtlas.grillCounter,
    {
      x: xStart + 4 * width,
      y: bottomCounterY
    }
  );
  kitchenObjects.bottomFryingCounter1 = setup(
    gameStage,
    objectAtlas.grillCounter,
    {
      x: xStart + 5 * width,
      y: bottomCounterY
    }
  );
  kitchenObjects.fryingPan1 = setup(
    gameStage,
    objectAtlas.fryingPan,
    { x: 491, y: 425 },
    { x: 0.07, y: 0.07 },
    { x: 491, y: 365 }
  );
  kitchenObjects.fryingPan1.station = 'frying';

  kitchenObjects.bottomFryingCounter2 = setup(
    gameStage,
    objectAtlas.grillCounter,
    {
      x: xStart + 6 * width,
      y: bottomCounterY
    }
  );

  kitchenObjects.fryingPan2 = setup(
    gameStage,
    objectAtlas.fryingPan,
    { x: 555, y: 425 },
    { x: 0.07, y: 0.07 },
    { x: 555, y: 365 }
  );
  kitchenObjects.fryingPan2.station = 'frying';

  kitchenObjects.bottomEmptyCounter3 = setup(
    gameStage,
    objectAtlas.emptyCounter,
    {
      x: xStart + 7 * width,
      y: bottomCounterY
    }
  );

  // Right side counters
  /*kitchenObjects["rightSideCounter"] = setup('images/counters.png', 0, 3, 8, 4.5, { x: xStart + 8 * width, y: 50 }) */
  kitchenObjects.rightSideCounter2 = setup(gameStage, objectAtlas.sideCounter, {
    x: xStart + 8 * width,
    y: 146
  });
  kitchenObjects.rightSideCounter3 = setup(gameStage, objectAtlas.sideCounter, {
    x: xStart + 8 * width,
    y: 242
  });
  kitchenObjects.rightSideCounter4 = setup(gameStage, objectAtlas.sideCounter, {
    x: xStart + 8 * width,
    y: 338
  });
  kitchenObjects.rightSideCounter5 = setup(gameStage, objectAtlas.sideCounter, {
    x: xStart + 8 * width,
    y: 434
  });
  kitchenObjects.rightSideCounter6 = setup(gameStage, objectAtlas.sideCounter, {
    x: xStart + 8 * width,
    y: 530
  });
  kitchenObjects.mixingBowl1 = setup(
    gameStage,
    objectAtlas.mixingBowl,
    { x: xStart + 8 * width, y: kitchenObjects.rightSideCounter2.y },
    { x: 1.5, y: 1.5 },
    { x: (xStart + 8 * width) - 50, y: kitchenObjects.rightSideCounter2.y }
  );
  kitchenObjects.mixingBowl1.station = 'mixing';
  kitchenObjects.mixingBowl2 = setup(
    gameStage,
    objectAtlas.mixingBowl,
    { x: xStart + 8 * width, y: kitchenObjects.rightSideCounter3.y },
    { x: 1.5, y: 1.5 },
    { x: (xStart + 8 * width) - 50, y: kitchenObjects.rightSideCounter3.y }
  );
  kitchenObjects.mixingBowl2.station = 'mixing';

  // Characters, etc.
  kitchenObjects.coolCustomer = setup(
    gameStage,
    objectAtlas.customer2,
    { x: 30, y: 50 },
    { x: 3.5, y: 3.5 }
  );

  // TODO: adjust padding on chef to make sure she doesn\'t overlap counters
  kitchenObjects.topChef = setup(
    gameStage,
    objectAtlas.chef,
    { x: gameStage.width / 2, y: gameStage.height / 4 },
    { x: 3.5, y: 3.5 }
  );

  kitchenObjects.sousChef = setup(
    gameStage,
    objectAtlas.hand,
    { x: 700, y: 420 },
    { x: 0.25, y: 0.25 }
  );

  kitchenObjects.recipeBook = setup(
    gameStage,
    objectAtlas.recipeBook,
    { x: kitchenObjects.sousChef.x - 15, y: 350 },
    { x: 0.25, y: 0.25 }
  );

  kitchenObjects.trashCan1 = setup(
    gameStage,
    objectAtlas.trashArmsUp,
    { x: xStart + 8 * width, y: 50 },
    { x: 0.1, y: 0.1 }
  );

  kitchenObjects.jollof = setup(
    gameStage,
    objectAtlas.jollof,
    { x: 100, y: 50 },
    { x: 0.15, y: 0.15 },
    { x: 150, y: 50}
  );
  kitchenObjects.jollof.station = 'serving';

  kitchenObjects.money = moneyRender();

  return kitchenObjects;
};
