## Priorities

* Generate Customers
* Add Recipe action creator to click
* Timers
* Ending dish process
* Station animations
* Money???

## Actions

* Generate new customer
  * Randomly select dish from current active recipes
  * **Timer on customer**
  * **When timer runs out, customer leaves**
  * Customer eats (food lands in front of them for 2 seconds and then they
    devour it)
    * **leaves and money appears**
  * **User collects money (happens whenever)**
    * Once collected, slot becomes available, generate new customer with random
      delay

* Recipe Book
  - [x] When clicked, opens to recipe book view
    - [x] Click on 'cook'
      - [x] adds to the list of current active recipes
      - [x] switches back to the game play view
    - [x] In that view, click on 'recipe' and renders the single recipe view
      - [x] (link to actual recipe)
      - [x] click on 'cook now!' - players have an option to add that recipe to the list of current active recipes
      - [x] click on 'play now' - Switches back to game play view
  - [ ] **Souschef's hand appears with ingredients**
  - [ ] **Chef automatically grabs ingredients from hand upon click (i.e. clicking a stove, chopping block, station(mixing), etc.) **and then does the action**
* **Cooking - TIMER animation**
  * Chopping animation - knife up and down
  * **Mixing animation - spoon in bowl**
  * **Spicing animation - can shake**
  * **Stove animation - flame**
  * Frying animation - flame/smoke
* **Trash Can animation - switch to other trash can once food disappears inside
  him**

## State

* **List on state of current active recipes**
* **Queue of destinations**
* **Success/burned**
* **Money**
* **Available/Unavailable (customer slot, station)**

## Higher Order Functions

* Character moving animation (chef, customers)
  * Assign sprite you're moving, where it's going, whether it should disappear
    when it gets there
* Food moving animation (rotation?), in conjunction with chef moving
  * where it's going, if it should disappear once it's there (i.e. went in the
    trash, in customer's mouth)
