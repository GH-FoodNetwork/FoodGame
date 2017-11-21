# Code Review

### November 21, 2017

***Note***: Webpack has reconfigured our gameplay stage so that everything will fit on the screen

All of the movement is pre-scripted based on where the player can go.

Ashi
* We might be able to refactor the setup function in gameplay.js to make use of a grid function.
* Recommends making an offscreen reference to the atlas we've made in gameplay.js in to separate that information from the screen. (low priority)
* Make an eslintrc.json for the project.
* Typically, you'd want just one function that runs the requestAnimationFrame function, and that function calls other functions that update the redux store.
* Receive timestamps as animations, and dispatch an action after a certain amount of time has passed
* Might consider making a list of side effect actions that will happen upon an action being dispatched
* The reducer store can be though of as receiving an event and the reducer state has functions which get called every frame to



TODO
- [ ] Add redux to project
- [ ] Make list of all animations that we'll need
- [ ] spend some time figuring out what the redux actions should look like
- [ ] Work on animation reducer
  - [ ] keep stage in the redux state
- [ ] Refactor the atlas in gameplay (maybe hold off until later)
- [ ] clean up codebase
