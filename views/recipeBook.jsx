import React, { Component } from 'react';
import { gameStage, recipeBookStage } from '../main';

export default class recipeBook extends Component {
  constructor() {
    super();
    this.backToGame = this.backToGame.bind(this);
  }

  backToGame() {
    const div = document.getElementById('recipes');
    div.style.display = 'none';
    recipeBookStage.visible = false;
    gameStage.visible = true;
  }

  render() {
    return (
      <div id="recipes">
        <img id="book" src="/images/recipeBookInterior.gif" />
        <div id="flex">
          <div className="dish">
            <h3>Jollof Rice</h3>
            <img src="/images/jollof.png" />
            <div>
              <button onClick={this.backToGame}>Cook</button>
              <button>Recipe</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
