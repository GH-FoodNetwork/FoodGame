import { objectAtlas, setup } from './atlases';
import { gameplayStage } from './main';

class Recipe {
  constructor(title, ingredients = [], finishedDish, steps = [], linkToRecipe) {
    this.title = title;
    this.ingredients = ingredients;
    this.finishedDish = finishedDish;
    this.steps = steps;
    this.linkToRecipe = linkToRecipe;
    this.currentState = 0;
    this.id = Math.random();
  }
}

class Jollof extends Recipe {
  constructor() {
    super(
      'Jollof Rice',
      [objectAtlas.cookedRice, objectAtlas.tomatoPaste],
      objectAtlas.jollof,
      [
        { type: 'mixing', waitTime: '3' },
        { type: 'frying', waitTime: '4' },
        { type: 'serving', waitTime: '0' },
      ],
      'https://www.epicurious.com/recipes/food/views/african-jollof-rice',
    );
  }
}

class TaiwanNoodles extends Recipe {
  constructor() {
    super(
      'Taiwanese Beef Soup',
      [objectAtlas.noodles, objectAtlas.beefSoup, objectAtlas.scallions],
      objectAtlas.TaiwanNoodles,
      [
        { type: 'chopping', waitTime: '3' },
        { type: 'mixing', waitTime: '3' },
        { type: 'serving', waitTime: '0' },
      ],
      'http://tworedbowls.com/2017/01/18/spicy-beef-noodle-soup/',
    );
  }
}

class Vareniki extends Recipe {
  constructor() {
    super(
      'Vareniki Dumplings',
      [objectAtlas.onion, objectAtlas.potato],
      objectAtlas.Vareniki,
      [
        { type: 'chopping', waitTime: '2' },
        { type: 'frying', waitTime: '4' },
        { type: 'serving', waitTime: '0' },
      ],
      'https://www.foodiewithfamily.com/potato-and-caramelized-onion-stuffed-dumplings-vareniki/',
    );
  }
}

class Arepas extends Recipe {
  constructor() {
    super(
      'Colombian Arepas',
      [objectAtlas.corn, objectAtlas.cheese],
      objectAtlas.arepa,
      [
        { type: 'mixing', waitTime: '4'},
        { type: 'frying', waitTime: '2'},
        { type: 'serving', waitTime: '0'},
      ],
      'http://www.seriouseats.com/recipes/2012/04/colombian-style-arepas-griddled-or-grilled-corn-cakes-recipe.html',
    );
  }
}

/*
 * NOTE: When calling a recipe from the recipeArray, you must use the `new` keyword to activate the constructor.
 * For example, to add a recipe to the store, you must call `store.dispatch(addRecipe(new recipeArray[idx]()))`
 * to add a new recipe Object to the store
 */

const recipeArray = [Jollof, TaiwanNoodles, Vareniki, Arepas];

export default recipeArray;
