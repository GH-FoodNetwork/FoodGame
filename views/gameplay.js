import * as PIXI from 'pixi.js';
const Container = PIXI.Container,
      Graphics = PIXI.Graphics,
      Sprite = PIXI.Sprite,
      BaseTexture = PIXI.BaseTexture;


const renderer = PIXI.autoDetectRenderer(256, 256);
const stage = new Container();

renderer.view.style.position = 'absolute';
renderer.view.style.display = 'block';
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

export default function gameplay() {
  document.body.appendChild(renderer.view);

  renderer.backgroundColor = 0xFFFFFF;

  // let cust = new Sprite(PIXI.loader.resources['images/customer2.png'].texture);
  // cust.width = 150;
  // cust.height = 150;
  // cust.position.set(500, 0);
  // stage.addChild(cust);
  //setup('images/counters.png', 0, 0, 8, 6, {x: 50, y: 50});



  let atlas = buildAtlas()


}

const buildAtlas = () => {

let xStart = 164;
let width = 64;

return {

    sinkCounter:  setup('images/counters.png', 0, 0, 8, 4.5, {x: xStart, y: 50}),
    sinkCounter2: setup('images/counters.png', 3, 0, 8, 4.5, {x: xStart + width, y: 50}),
    emptyCounter: setup('images/counters.png', 0, 1, 8, 4.5, {x: xStart + 2*width, y: 50}),
    choppingCounter: setup('images/counters.png', 1, 1, 8, 4.5, {x: xStart + 3*width, y: 50}),
    choppingCounter2: setup('images/counters.png', 1, 1, 8, 4.5, {x: xStart + 4*width, y: 50}),
    choppingCounter3: setup('images/counters.png', 1, 1, 8, 4.5, {x: xStart + 5*width, y: 50}),
    emptyCounter2: setup('images/counters.png', 0, 1, 8, 4.5, {x: xStart + 6*width, y: 50}),
    scaleCounter: setup('images/counters.png', 3, 2, 8, 4.5, {x: xStart + 7*width, y: 50}),
    sideCounter: setup('images/counters.png', 0, 3, 8, 4.5, {x: 100, y: 50}),
    sideCounter2: setup('images/counters.png', 0, 3, 8, 4.5, {x: 100, y: 146}),
    sideCounter3: setup('images/counters.png', 0, 3, 8, 4.5, {x: 100, y: 242}),
    sideCounter4: setup('images/counters.png', 0, 3, 8, 4.5, {x: 100, y: 338}),
    sideCounter5: setup('images/counters.png', 0, 3, 8, 4.5, {x: 100, y: 434}),
    sideCounter6: setup('images/counters.png', 0, 3, 8, 4.5, {x: 100, y: 530}),
    coolCustomer: setup('images/customer2.png', 1, 1, 3, 4, {x: 30, y: 50})
  }
}
// remember to load image in main.js


function setup(img, xPosition, yPosition, xWidth, yHeight, canvasPosition) {

  let texture = new PIXI.Texture(BaseTexture.fromImage(img))
  //addToCache(texture, img)



  //Create the `tileset` sprite from the texture
  //var texture = TextureCache[img];

  let width = texture.baseTexture.source.width
  let height = texture.baseTexture.source.height

  let colWidth = width / xWidth;
  let rowHeight = height / yHeight;

  //Create a rectangle object that defines the position and
  //size of the sub-image you want to extract from the texture
  var rectangle = new PIXI.Rectangle(xPosition * colWidth,
                                     yPosition * rowHeight,
                                     (width-(xPosition*colWidth) > colWidth? colWidth : width-(xPosition*colWidth)), (height-(yPosition*rowHeight) > rowHeight? rowHeight : height-(yPosition*rowHeight)));
  console.log("colWidth", colWidth)
  console.log("rowHeight", rowHeight)
  console.log("xPosition", xPosition)
  console.log("yPosition", yPosition)
  console.log("width", width)
  console.log("height", height)

  console.log(""+height+"-("+yPosition+"*"+rowHeight+") > "+ rowHeight + " => " + (height-(yPosition*rowHeight) >= rowHeight))

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

  sprite.scale.x = 2;
  sprite.scale.y = 2;

  //Add the counter to the stage
  stage.addChild(sprite);

  //Render the stage
  renderer.render(stage);

  return sprite;
}
