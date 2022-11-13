
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function() {
    if(!started) {
        $("#level-title").text("Level  " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPatter);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    //Call to checkAns() function 
    checkAnswer(userClickedPattern.length-1)

});

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if(userClickedPattern.length === gamePattern.length) {
            //Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {

        //In the sounds folder, there is a sound called wrong.mp3,
        // play this sound if the user got one of the answers wrong.
        playSound("wrong");

        /*In the styles.css file, there is a class called "game-over", 
        apply this class to the body of the website when the user gets 
        one of the answers wrong and then remove it after 200 milliseconds.
        */
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        //Change title of h1 to game overChange the h1 title to say
        // "Game Over, Press Any Key to Restart" if the user got the answer wrong.
        $("#level-title").text("Game Over, Press Any Key to Restart");

        //Call to startOver() function to start if the user gets the sequence wrong.
        startOver();
    }
}


function nextSequence() {

    //Write an if statement inside checkAnswer() to check if the most recent user
    // answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level  " + level);


    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Create a new function called startOver().
function startOver() {
    //Inside this function, you'll need to reset the values of level, gamePattern and started variables.
    level = 0;
    gamePattern = [];
    started = false;
}



