import {
  Container,
  Graphics,
  Sprite,
  Texture,
  BaseTexture,
  Rectangle,
  autoDetectRenderer,
  Text,
} from 'pixi.js';

import store, {
  addDestination,
  removeDestination,
  addRecipe,
  setSousChefHolding,
  moveFromSousToChef,
  dequeueStep,
  updateRecipeState,
  currentRecipes,
  bringToFront,
} from '../store';
import { setup, textSetup, objectAtlas } from '../atlases';
import { recipeBookStage, gameStage, stage, renderer } from '../main'; // START WITH USING MOVEFROMSOUSTOCHEF!!!!!!
import { bookUpdate } from './recipe-book';
import recipeArray from '../recipe-constructor';

// export const stage = new Container();
// export const gameStage = new Container();
// export const recipeBookStage = new Container();
export let kitchenObjects = {};
export let faces;
let face = 'right';
let faceNum = 0;

window._ko = kitchenObjects;

let state;


import { foodStack, chefFoodStack } from '../store/platter';

export function update() {
  // state.platter.chefFoodStack.position = new PIXI.Point(kitchenObjects.topChef.x, kitchenObjects.topChef.y);
  state = store.getState();
  // Funnel all animation updates here
  movePlayer();
  // Rerender
  // console.log(stage);
  // window._raf =
  requestAnimationFrame(update);
  // window._renderer = renderer;
  renderer.render(stage);
}

function movePlayer() {
  const { destinations } = state;
  const chef = kitchenObjects.topChef;

  if (destinations.length) {
    const rightOrDown = 1;
    const leftOrUp = -1;
    let faceChange = face;

    if (destinations[0].y - chef.y > 0) {
      chef.y += rightOrDown;
      faceChange = 'down';
    } else if (destinations[0].y - chef.y < 0) {
      chef.y += leftOrUp;
      faceChange = 'up';
    }
    if (destinations[0].x - chef.x > 0) {
      chef.x += rightOrDown;
      faceChange = 'right';
    } else if (destinations[0].x - chef.x < 0) {
      chef.x += leftOrUp;
      faceChange = 'left';
    }
    // Use this later with a deltaTime so it's not so jittery; it makes the chef's footsteps animate
    if (faceChange !== face) {
      face = faceChange;
      faceNum = 0;
      console.log('face', face, faces[face][faceNum]);
      chef.setTexture(faces[face][faceNum]);
    } /*else{
      faceNum++;
      if(faceNum >= faces[face].length) faceNum = 0;
      chef.texture = faces[face][faceNum];
    } */

    if (
      chef.x === destinations[0].stationPosition.x &&
      chef.y === destinations[0].stationPosition.y
    ) {
      animateStation(destinations[0]);
      console.log('at destination!');
      console.log('destination removed');
      store.dispatch(removeDestination());

      // need to get clicked station instead of kitchenObjects.mixingBowl1
    }
  }
  state.platter.chefFoodStack.position = new PIXI.Point(
    chef.x + (face === 'right' ? 30 : face === 'left' ? -30 : 0),
    chef.y + (face === 'down' ? 30 : face === 'up' ? -60 : 40),
  );
  bringToFront(gameStage, state.platter.chefFoodStack);
}

function animateStation(station) {
  const chef = kitchenObjects.topChef;

  if (station.station !== 'serving') {
    if (station.station === 'frying') {
      const flame = setup(
        gameStage,
        objectAtlas.flame,
        { x: station.x - 5, y: station.y + 15 },
        { x: 0.2, y: 0.2 },
      );
      setInterval(() => {
        flame.alpha = 0;
      }, 3000);
    }

    const circle = new Graphics();
    circle.beginFill(0xeeaaff);
    circle.drawCircle(0, 0, 20);
    circle.endFill();
    circle.x = station.x + 50;
    circle.y = station.y - 50;
    gameStage.addChild(circle);

    const clockText3 = textSetup(gameStage, '3', {
      x: station.x + 50,
      y: station.y - 50,
    });
    const clockText2 = textSetup(gameStage, '2', {
      x: station.x + 50,
      y: station.y - 50,
    });
    const clockText1 = textSetup(gameStage, '1', {
      x: station.x + 50,
      y: station.y - 50,
    });
    clockText2.visible = false;
    clockText1.visible = false;

    station.rotation = 1;

    setInterval(() => {
      clockText3.visible = false;
      clockText2.visible = true;
    }, 1000);

    setInterval(() => {
      clockText2.visible = false;
      clockText2.alpha = 0;
      clockText1.visible = true;
    }, 2000);

    setInterval(() => {
      clockText1.visible = false;
      clockText1.alpha = 0;
    }, 3000);

    setInterval(() => {
      station.rotation = 0;
      circle.alpha = 0;
    }, 3000);
  }
  state.platter.chefFoodStack.position = new PIXI.Point(
    chef.x + (face === 'right' ? 30 : face === 'left' ? -30 : 0),
    chef.y + (face === 'down' ? 30 : face === 'up' ? -60 : 40),
  );
  bringToFront(gameStage, state.platter.chefFoodStack);
}

export default function gameplay() {
  window._food = foodStack;
  window._chef = chefFoodStack;

  document.body.appendChild(renderer.view);

  renderer.backgroundColor = 0x3a1145;
  state = store.getState();

  gameStage.addChild(foodStack);
  gameStage.addChild(chefFoodStack);

  faces = {
    up: [objectAtlas.chefBack1, objectAtlas.chefBack2, objectAtlas.chefBack3],
    right: [
      objectAtlas.chefRight1,
      objectAtlas.chefRight2,
      objectAtlas.chefRight3,
    ],
    down: [objectAtlas.chefDown1, objectAtlas.chefDown2, objectAtlas.chefDown3],
    left: [objectAtlas.chefLeft1, objectAtlas.chefLeft2, objectAtlas.chefLeft3],
  };

  function onClick(evt) {
    state = store.getState();
    const { recipes } = state;
    console.log('evt.target', evt.target);
    console.log('evt target station', evt.target.station);
    console.log('first step in recipe', recipes[0].steps[0].type)
    console.log(recipes[0].currentState);

    // console.log('current recipes current state', recipes[0].currentState);
    // console.log('current recipes steps', currentRecipes[0].steps);

    const filteredRecipes = recipes.filter(recipe => evt.target.station === recipe.steps[recipe.currentState].type);
    if (filteredRecipes.length) {
      store.dispatch(removeDestination());
      if (evt.target.recipeId === undefined) {
        console.log('shift', currentRecipes.slice().shift());
        evt.target.recipeId = filteredRecipes[0].id;
      }
      store.dispatch(updateRecipeState(evt.target.recipeId));
      store.dispatch(addDestination(evt.target));
    } else {
      alert('Wrong station!');
    }
  }
  //     state = store.getState();
  //     console.log('steps?', state.step);
  //   }
  //   if (!state.steps.length) {
  //     //restart
  //     //{dispatch removeCustomer}
  //   }
  // }

  /**
   * Objects activated by 'onClick' function
   */
  kitchenObjects = buildkitchenObjects();
  const {
    sousChef,
    jollof,
    trashCan1,
    recipeBook,
    wineCounter,
  } = kitchenObjects;
  let trashCan = trashCan1;
  const choppingBoards = [
    kitchenObjects.choppingCounter,
    kitchenObjects.choppingCounter2,
  ];
  const fryingPans = [kitchenObjects.fryingPan1, kitchenObjects.fryingPan2];

  // grill counters
  const grillCounters = [
    kitchenObjects.bottomGrillCounter1,
    kitchenObjects.bottomGrillCounter2,
    kitchenObjects.bottomGrillCounter3,
  ];
  // spice counter -- TO BE ANNOUNCED
  // mixing counter
  const mixingBowls = [kitchenObjects.mixingBowl1, kitchenObjects.mixingBowl2];

  // serving counters
  const customerCounters = [
    kitchenObjects.sideCounter2,
    kitchenObjects.sideCounter3,
    kitchenObjects.sideCounter4,
  ];

  choppingBoards.forEach((board) => {
    board.interactive = true;
    board.buttonMode = true;
    board.on('pointerdown', onClick);
  });
  fryingPans.forEach((pan) => {
    pan.interactive = true;
    pan.buttonMode = true;
    pan.on('pointerdown', onClick);
  });

  grillCounters.forEach((grill) => {
    grill.interactive = true;
    grill.buttonMode = true;
    grill.on('pointerdown', onClick);
  });

  customerCounters.forEach((counter) => {
    counter.interactive = true;
    counter.buttonMode = true;
    counter.on('pointerdown', onClick);
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
      store.dispatch(moveFromSousToChef());
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
    }
  }

  sousChef.interactive = true;
  sousChef.buttonMode = true;
  sousChef.on('pointerdown', clickSousChef);

  mixingBowls.forEach((bowl) => {
    bowl.interactive = true;
    bowl.buttonMode = true;
    bowl.on('pointerdown', onClick);
  });

  // jollof.interactive = true;
  // jollof.buttonMode = true;
  // jollof.on('pointerdown', onClick);

  trashCan.interactive = true;
  trashCan.buttonMode = true;
  trashCan.on('pointerdown', clickOnTrash);

  function clickOnTrash() {
    kitchenObjects.trashCan2 = setup(
      gameStage,
      objectAtlas.trashArmsCrossed,
      { x: 676, y: 50 },
      { x: 0.35, y: 0.35 },
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
    fontStyle: 'bold',
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
    kitchenObjects[`floor${i}`] = setup(gameStage, objectAtlas.floor, {
      x: floorStart,
      y: 64 * (i % 12 === 0 ? Math.floor(i / 12) - 1 : Math.floor(i / 12)) + 64,
    });
    floorStart += 64;
  }

  // wall
  floorStart = 16;
  for (let i = 1; i < 13; i++) {
    kitchenObjects[`wall${i}`] = setup(gameStage, objectAtlas.wall, {
      x: floorStart + 64 * (i - 1),
      y: 16,
    });
  }

  // kitchenObjects.floor = setup(gameStage, objectAtlas.floor, {
  //   x: 32, y: 32,
  // })
  // Top Counters
  kitchenObjects.sinkCounter = setup(gameStage, objectAtlas.sinkCounter, {
    x: xStart,
    y: 50,
  });
  kitchenObjects.sinkCounter2 = setup(gameStage, objectAtlas.sinkCounter, {
    x: xStart + width,
    y: 50,
  });

  kitchenObjects.choppingCounter = setup(
    gameStage,
    objectAtlas.choppingCounter,
    {
      x: xStart + 2 * width,
      y: 50,
    },
    { x: 2, y: 2 },
    { x: xStart + 2 * width, y: 110 },
  );
  kitchenObjects.choppingCounter.station = 'chopping';

  kitchenObjects.choppingCounter2 = setup(
    gameStage,
    objectAtlas.choppingCounter,
    {
      x: xStart + 3 * width,
      y: 50,
    },
    { x: 2, y: 2 },
    { x: xStart + 3 * width, y: 110 },
  );
  kitchenObjects.choppingCounter2.station = 'chopping';

  kitchenObjects.scaleCounter = setup(gameStage, objectAtlas.scaleCounter, {
    x: xStart + 4 * width,
    y: 50,
  });
  kitchenObjects.emptyCounter = setup(gameStage, objectAtlas.emptyCounter, {
    x: xStart + 5 * width,
    y: 50,
  });
  /* spiceRack: setup('images/Spices-Complete_Rack.png', 0, 0, 1, 1, {
        x: xStart + 5 * width,
        y: 10
    }, { x: .5, y: .5 }), */
  kitchenObjects.emptyCounter2 = setup(gameStage, objectAtlas.emptyCounter, {
    x: xStart + 6 * width,
    y: 50,
  });
  /* kitchenObjects[spiceRack]= setup('images/Spices-Complete_Rack.png', 0, 0, 1, 1, {
        x: xStart + 6 * width,
        y: 10
    }, { x: .5, y: .5 }) */
  kitchenObjects.wineCounter = setup(gameStage, objectAtlas.wineCounter, {
    x: xStart + 7 * width,
    y: 50,
  });

  // pantry: setup('images/pantry-misc.png', 1, 0, 5, 4, {x: xStart + 9*width, y: 50}),

  // Side Counters
  kitchenObjects.sideCounter = setup(gameStage, objectAtlas.sideCounter, {
    x: 100,
    y: 50,
  });
  kitchenObjects.sideCounter2 = setup(
    gameStage,
    objectAtlas.sideCounter,
    {
      x: 100,
      y: 146,
    },
    { x: 2, y: 2 },
    { x: 150, y: 125 },
  );
  kitchenObjects.sideCounter2.station = 'serving';
  kitchenObjects.sideCounter3 = setup(
    gameStage,
    objectAtlas.sideCounter,
    {
      x: 100,
      y: 242,
    },
    { x: 2, y: 2 },
    { x: 150, y: 250 },
  );
  kitchenObjects.sideCounter3.station = 'serving';
  kitchenObjects.sideCounter4 = setup(
    gameStage,
    objectAtlas.sideCounter,
    {
      x: 100,
      y: 338,
    },
    { x: 2, y: 2 },
    { x: 150, y: 375 },
  );
  kitchenObjects.sideCounter4.station = 'serving';
  kitchenObjects.sideCounter5 = setup(gameStage, objectAtlas.sideCounter, {
    x: 100,
    y: 434,
  });
  kitchenObjects.sideCounter6 = setup(gameStage, objectAtlas.sideCounter, {
    x: 100,
    y: 530,
  });
  // Bottom Counters
  const bottomCounterY = 460;
  kitchenObjects.bottomEmptyCounter1 = setup(
    gameStage,
    objectAtlas.emptyCounter,
    {
      x: xStart,
      y: bottomCounterY,
    },
  );
  kitchenObjects.bottomEmptyCounter2 = setup(
    gameStage,
    objectAtlas.emptyCounter,
    {
      x: xStart + width,
      y: bottomCounterY,
    },
  );
  kitchenObjects.bottomGrillCounter1 = setup(
    gameStage,
    objectAtlas.grillCounter,
    {
      x: xStart + 2 * width,
      y: bottomCounterY,
    },
  );
  kitchenObjects.bottomGrillCounter2 = setup(
    gameStage,
    objectAtlas.grillCounter,
    {
      x: xStart + 3 * width,
      y: bottomCounterY,
    },
  );
  kitchenObjects.bottomGrillCounter3 = setup(
    gameStage,
    objectAtlas.grillCounter,
    {
      x: xStart + 4 * width,
      y: bottomCounterY,
    },
  );
  kitchenObjects.bottomFryingCounter1 = setup(
    gameStage,
    objectAtlas.grillCounter,
    {
      x: xStart + 5 * width,
      y: bottomCounterY,
    },
  );
  kitchenObjects.fryingPan1 = setup(
    gameStage,
    objectAtlas.fryingPan,
    { x: 491, y: 425 },
    { x: 0.07, y: 0.07 },
    { x: 491, y: 355 },
  );
  kitchenObjects.fryingPan1.station = 'frying';

  kitchenObjects.bottomFryingCounter2 = setup(
    gameStage,
    objectAtlas.grillCounter,
    {
      x: xStart + 6 * width,
      y: bottomCounterY,
    },
  );
  kitchenObjects.fryingPan2 = setup(
    gameStage,
    objectAtlas.fryingPan,
    { x: 555, y: 425 },
    { x: 0.07, y: 0.07 },
    { x: 555, y: 355 },
  );
  kitchenObjects.fryingPan2.station = 'frying';

  kitchenObjects.bottomEmptyCounter3 = setup(
    gameStage,
    objectAtlas.emptyCounter,
    {
      x: xStart + 7 * width,
      y: bottomCounterY,
    },
  );
  // Right side counters
  /* kitchenObjects["rightSideCounter"] = setup('images/counters.png', 0, 3, 8, 4.5, { x: xStart + 8 * width, y: 50 }) */
  kitchenObjects.rightSideCounter2 = setup(gameStage, objectAtlas.sideCounter, {
    x: xStart + 8 * width,
    y: 146,
  });
  kitchenObjects.rightSideCounter3 = setup(gameStage, objectAtlas.sideCounter, {
    x: xStart + 8 * width,
    y: 242,
  });
  kitchenObjects.rightSideCounter4 = setup(gameStage, objectAtlas.sideCounter, {
    x: xStart + 8 * width,
    y: 338,
  });
  kitchenObjects.rightSideCounter5 = setup(gameStage, objectAtlas.sideCounter, {
    x: xStart + 8 * width,
    y: 434,
  });
  kitchenObjects.rightSideCounter6 = setup(gameStage, objectAtlas.sideCounter, {
    x: xStart + 8 * width,
    y: 530,
  });
  kitchenObjects.mixingBowl1 = setup(
    gameStage,
    objectAtlas.mixingBowl,
    { x: xStart + 8 * width, y: kitchenObjects.rightSideCounter2.y },
    { x: 1.5, y: 1.5 },
    { x: xStart + 8 * width - 50, y: kitchenObjects.rightSideCounter2.y },
  );
  kitchenObjects.mixingBowl1.station = 'mixing';
  kitchenObjects.mixingBowl2 = setup(
    gameStage,
    objectAtlas.mixingBowl,
    { x: xStart + 8 * width, y: kitchenObjects.rightSideCounter3.y },
    { x: 1.5, y: 1.5 },
    { x: xStart + 8 * width - 50, y: kitchenObjects.rightSideCounter3.y },
  );
  kitchenObjects.mixingBowl2.station = 'mixing';

  // Characters, etc.
  // kitchenObjects.coolCustomer = setup(
  //   gameStage,
  //   objectAtlas.customer2,
  //   { x: 30, y: 50 },
  //   { x: 3.5, y: 3.5 },
  // );

  // TODO: adjust padding on chef to make sure she doesn\'t overlap counters
  kitchenObjects.topChef = setup(
    gameStage,
    objectAtlas.chef,
    { x: gameStage.width / 2, y: gameStage.height / 4 },
    { x: 3.5, y: 3.5 },
  );

  kitchenObjects.sousChef = setup(
    gameStage,
    objectAtlas.hand,
    { x: 700, y: 420 },
    { x: 0.25, y: 0.25 },
  );

  kitchenObjects.recipeBook = setup(
    gameStage,
    objectAtlas.recipeBook,
    { x: kitchenObjects.sousChef.x - 15, y: 350 },
    { x: 0.25, y: 0.25 },
  );

  kitchenObjects.trashCan1 = setup(
    gameStage,
    objectAtlas.trashArmsUp,
    { x: xStart + 8 * width, y: 50 },
    { x: 0.1, y: 0.1 },
  );

  // kitchenObjects.jollof = setup(
  //   gameStage,
  //   objectAtlas.jollof,
  //   { x: 100, y: 50 },
  //   { x: 0.15, y: 0.15 },
  //   { x: 150, y: 50 },
  // );

  kitchenObjects.money = moneyRender();

  return kitchenObjects;
};
