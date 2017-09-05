var inquirer = require('inquirer');

var userHitpoints = 15;
var zombieHitpoints = 1;

var weapon1 = {
  type: "sword",
  damage: 4,
  variance: 2,
}

var userDamage = 5;
var zombieDamage = 1;

function healthCheck(){
  console.log("You have "+ userHitpoints+ " remaining");
  console.log("The zombie has "+ zombieHitpoints+ " remaining");
}

function checkRound(){
  if(zombieHitpoints <= 0){
    console.log("you win");
    process.exit();
  }else if (userHitpoints <= 0){
    console.log("you lose");
    process.exit();
  }else{
    console.log("The battle rages on")
    playRound();
  }
}

var hitLocations = ["Head", "chest", "legs", "arms"];

function playRound(){
  inquirer.prompt([{
    type:"list",
    name: "targetArea",
    message: "where do you want to strike?",
    choices: hitLocations
  }]).then(function(results){
    var vulnerableIndex = Math.floor(Math.random()*hitLocations.length);
    if(results.targetArea === hitLocations[vulnerableIndex]){
      console.log("you got'em in the "+hitLocations[vulnerableIndex].toUpperCase());
      zombieHitpoints -= userDamage;
    }else {
      console.log("You miss the " + results.targetArea);
      userHitpoints -= zombieDamage;

    }
    healthCheck();
    checkRound();
  });
}
playRound();
