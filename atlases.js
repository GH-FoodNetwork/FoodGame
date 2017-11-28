import { Sprite, Texture, BaseTexture, Rectangle, addChild } from 'pixi.js';
//import loader from './main';

function textureSetup(img, xPosition = 0, yPosition = 0, xWidth = 1, yHeight = 1) {
  const texture =
    typeof img === 'string' ? new Texture(BaseTexture.fromImage(img)) : new Texture(img.texture);
  //addToCache(texture, img)
  //Create the `tileset` sprite from the texture
  //var texture = TextureCache[img];

  const { width, height } = texture.baseTexture.source;

  const colWidth = width / xWidth;
  const rowHeight = height / yHeight;

  //Create a rectangle object that defines the position and
  //size of the sub-image you want to extract from the texture
  const rectangle = new Rectangle(
    xPosition * colWidth,
    yPosition * rowHeight,
    width - xPosition * colWidth > colWidth ? colWidth : width - xPosition * colWidth,
    height - yPosition * rowHeight > rowHeight ? rowHeight : height - yPosition * rowHeight,
  );

  //Tell the texture to use that rectangular section
  texture.frame = rectangle;
  return texture;
}

export let objectAtlas = {}; // = objectAtlasInit();

export function objectAtlasInit(resources) {
  const result = {};
  //Make a texture with rectangle for each object we'll need
  // remember to load image in main.js
  result.sinkCounter = textureSetup(resources.counters, 0, 0, 8, 4.5);
  result.choppingCounter = textureSetup(resources.counters, 1, 1, 8, 4.5);
  result.scaleCounter = textureSetup(resources.counters, 3, 2, 8, 4.5);
  result.emptyCounter = textureSetup(resources.counters, 0, 1, 8, 4.5);
  result.wineCounter = textureSetup(resources.counters, 4, 2, 8, 4.5);
  result.sideCounter = textureSetup(resources.counters, 0, 3, 8, 4.5);
  result.grillCounter = textureSetup(resources.counters, 7, 0, 8, 4.5);
  result.mixingBowl = textureSetup(resources.counters, 3, 4, 7.3, 4.5);
  result.fryingPan = textureSetup('images/fryingpan.png');
  result.customer1 = textureSetup('images/customer1.png', 1, 1, 3, 4);
  result.customer2 = textureSetup('images/customer2.png', 1, 1, 3, 4);
  result.customer3 = textureSetup('images/customer3.png', 1, 1, 3, 4);
  result.chef = textureSetup('images/chef.png', 1, 1, 3, 4);
  result.hand = textureSetup('images/souschef.png');
  result.recipeBook = textureSetup('images/recipebook.png');
  result.trashArmsUp = textureSetup('images/trashcancopy.png');
  result.trashArmsCrossed = textureSetup('images/trashcan2.png');
  result.jollof = textureSetup('images/jollof.png');
  result.gold = textureSetup('images/gold.gif');
  result.cat = textureSetup('images/cat.png');
  result.cookedRice = textureSetup(resources.cookedRice);
  result.tomatoPaste = textureSetup(resources.tomatoPaste);

  objectAtlas = result;
  return result;
}
const PIXELS_PER_TILE = window.innerWidth / 80

export function setup(
  stage,
  texture,
  canvasPosition = { x: 0, y: 0 },
  spriteScale = { x: 2, y: 2 },
  stationPosition,
) {
  //Create the sprite from the texture
  const sprite = new Sprite(texture);

  sprite.anchor.set(0.5);
  //(width / xWidth) / 2, (height / yHeight) / 2

  //Position the rocket sprite on the canvas
  sprite.x = canvasPosition.x /*/ PIXELS_PER_TILE*/;  // TODO: Remove me after specifying actor positions in tile coordinates.
  sprite.y = canvasPosition.y /*/ PIXELS_PER_TILE*/;

  sprite.scale.x = spriteScale.x /*/ PIXELS_PER_TILE*/;
  sprite.scale.y = spriteScale.y /*/ PIXELS_PER_TILE*/;

  // where the chef should stand upon click
  sprite.stationPosition = stationPosition;

  //Add the sprite to the stage -- IMPORTANT: THIS is the stage
  stage.addChild(sprite);

  return sprite;
}