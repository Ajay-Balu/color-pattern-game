
buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern =[];

var started = false;
var level =0;
$("body").keypress(function() {
    if(!started){
    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
    }
});

$(".btn").click(function(){
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});


function nextSequence(){

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    randomNumber = Math.floor(Math.random()*4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            nextSequence();
        }   

    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart")
        statOver();
    }

}

function statOver() {
    level = 0;
    started = false;
    gamePattern = [];
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass(".pressed");    

    setTimeout(function(){
        $("#" + currentColour).removeClass(".pressed");
    }, 100);
    
}

function playSound(name){
    var audio = new Audio("sounds/" + name +".mp3");
    audio.play();
}
