/*****************************************************************
FAQ:

1. The game just isn't loading. What do I do?

Well, you could wait or check your internet connection. If you're sure that's not it, then follow these steps:
o Control X the entire code.
o Paste some other code.
o Delte that code, and Control V the original code.

OR

Delete these FAQ
and then copy paste them again. 

2.  I clicked play, and my character doesn't move. Ugh!

Yep that's a bug.
I find making some minor change in the code (eg. adding a space, clicking enter) works best.

3. I tried to do hard mode, but when I clicked the button I was still in medium!

You should probably have clicked each button twice. 
Still doesn't work, then click it ten times for all I care.

4. How do I get on the leaderboard? Spin-Off proof or should I post my score?

Here are the steps:
o Make a spin-off.
o Play your run. 
o Copy paste the line in the println and post that in the T&T "HighScore" thread.
o Close the tab
o DO NOT CLICK RESTART. THE SCREEN ON THE GAME SHOULD BE THE GAME OVER SCREEN!!!

Now, the thumbnail of that project should be "It was one hit too many. But at least you got ..... points!"

5. The Q key booster doesn't work.

Sorry!
That should work by pressing it when a block comes near (timing!), then releasing.
As I said, pressing the Q key continously will do nothing.

6. Does the highscore text just diplay 0 or actually something?

Yes it does work. Restarting will set it to 0 again soooo...
tbh its kinda useless

7. Two player... I don't get it?
Yeah OK.
So two player is like, you team up together (NOT a competition tho could be) and score as much as ya can.
Its a wip so not really

8. I'd like to mute the sound. How to?
Ok, so you know when you see all of your tabs up there?
So right click on your tab, and click MUTE SITE.
To unmute do the same thing and click UNMUTE SITE.

                                                                

Credits:

𝕊ภɑrkყ Gհσst/Lin Gh (Candlelight): For the awesome font
https://www.khanacademy.org/computer-programming/my-custom-font/6524826748747776 <-- Lin Gh
https://www.khanacademy.org/computer-programming/spin-off-of-my-custom-font/5558701415940096 <-- Snarky

Gray Wolf: For the tutorial
https://www.khanacademy.org/computer-programming/creating-a-dodge-game/5347594564747264

Kiwi: For the picker
https://www.khanacademy.org/computer-programming/character-creator-2/5595610185940992

CyberWolf: For the 2 player idea
https://www.khanacademy.org/computer-programming/iso-dodge-game/4656985852035072

Me: For being generally awesome.
>:)
https://www.khanacademy.org/profile/zoyaAzfar/
(that link may or may not work)
(so sub below ok)

                                                              

Usability:

If the code is distracting add this to your link:
?editor=no

                                                             

Tips:
i have none
i suck at this game .
#poeticjustise.

BE SURE TO ALLOW sound
****************************************************************/


var colorOfPlayer = color(255, 0, 30);
var highscore=0;

/**************
CUSTOMIZABLE: 
**************/
//Don't know code?
//No prob!  
//change the green text in here for your name.
var name = "Rehan";

//These are customizables you can access through the settings Fee free to change these here. it makes life easir tbh
var difficulty = "h";
var inverted = false;

//does nothing
var Shape;

//ennemy speed
var enemySpeed;

//determines enemy speed on difficulty lvl
if (difficulty==="m") {
      enemySpeed=  random(2, 4);
} else if (difficulty ==="e"){


      enemySpeed=  random(1, 3);
        
} else if (difficulty === "h"){
      enemySpeed=  random(3, 6);
        
}






//no idea.
rectMode(CENTER);
textAlign(LEFT, CENTER);

//snarky's text thingy : https://www.khanacademy.org/computer-programming/fixed-texting-simulator-wait-why-is-this-being-ghost-voted-o-/4731201435680768
var c = "";
var tbs = [];

function tB(t, y){
    this.t = t;
    this.y = y;
}
tB.prototype.display = function(){
    stroke(255, 255, 255);
    strokeWeight(25);
    textSize(12);
    fill(212, 151, 252);
    
    pushMatrix();
    translate(10, 20);
    
    line(10, this.y, textWidth(this.t)+10, this.y);
   text(this.t, 10, this.y);
    popMatrix();
};
//thx snarky

//used to track what key was pressed for moving the player
var keys = [];
keyPressed = function () {
    keys[keyCode] = true;
};
keyReleased = function () {
    keys[keyCode] = false;
};

//the font / me likey
textFont(createFont("Trebuchet MS Bold"));

//create the player object
// i can do oop but graywolf didnt so i dont want to either.
//also me little lazy
var player = {
    x: 329,
    y: 513,
    w: 35,
    h: 37,
    vx: 5,
    health: 100,
    color: color(colorOfPlayer),
    direction: 0,
    gravity : 0,
    canJump : false,
};

//probabilty for the medipacks to come. learn this in the ad js natural sim course.
var stuff = [];
stuff[0] = 1;
stuff[1] = 1;
stuff[2] = 1;
stuff[3] = 1;
stuff[4] = 1;

var index = floor(random(stuff.length));

//an array to hold all the enemy objects
var enemies = [];

//the colr of the medipacks
var col;

//dtrmes color of medi
if (stuff[index] === 1) {col=color(0, 9, 255); }
else if (stuff[index] === 2) {col=color(0, 213, 255);}

//an array to hold all the health objects
var  healthpack = [];

//also does nothing i think i have no idea tbr
var allowBoost = false;

//typing effect i think
var s = 0;

//set the initial frequency that enemies are added
var enemyFrequency;


//set the initial score to 0
var score = 0;

//set the initial state of the game
var gameOver = false;

var gameMode = "main"; //gameMode

var started = false; //start?

var reduce = 10; //the damage from the blocks

//dont know
var draw2;
stroke(255);
background(107, 105, 107);
var updated = false;

//this loads your score and prints it.
var loadScore = function() {
        var saveString = floor(score) + "|" + inverted + "|"+difficulty+"|"+name+"\n\nPost the above line in the tips and thanks to get on the leaderboard.";
        
        println(saveString);
};

//life saver button stuff i use everywehere. 
var Button = function(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 115;
    this.height = config.height || 53;
    this.label = config.label || "Click";
    this.labelX = config.labelX || 0;
    this.onClick = config.onClick || function() {};
    this.hover = config.hover || function() {};
    this.col = config.col || color(255);
};

Button.prototype.draw = function() {
    strokeWeight(5);
    stroke(this.col);
    noFill();
    ellipse(this.x + 51, this.y + 33, this.width, this.height);
    fill(0, 0, 0);
    textSize(27);
    fill(this.col);
    textFont(createFont("Trebuchet MS Bold"));
    textAlign(LEFT, TOP);
    text(this.label, this.labelX, this.y+this.height/7.7);
};
Button.prototype.isMouseInside = function() {
    
    return mouseX > this.x &&
           mouseX < (this.x + this.width) &&
           mouseY > this.y &&
           mouseY < (this.y + this.height);
           
};
Button.prototype.handleMouseClick = function() {
    
    
    
    
    if (this.isMouseInside()) {
        
        this.onClick();
    }
};
//ooh this is new.
Button.prototype.handleHoverThingy= function() {
    if (this.isMouseInside()) {
        this.width = 134;
        this.height = 134;
        
    } else {
        this.width = 110;
        this.height = 110;
        this.col = color(255);
    }
};

//ok not a good explosion.
//but me no want to put effort in it. :P
var explode= function(x, y){
        noStroke();
        
        pushMatrix();
        translate(9,4);
        fill(255, 251, 0);
        ellipse(x +9, y + 9, 40, 40);
        ellipse(x +35, y + 9, 40, 40);
        ellipse(x +24, y + 32, 40, 40);
        
        fill(255, 204, 0);
        ellipse(x +9, y + 9, 30, 30);
        ellipse(x +35, y + 9, 30, 30);
        ellipse(x +24, y + 32, 30, 30);
        
        fill(247, 15, 61);
        
        ellipse(x +14, y + 12, 20, 20);
        ellipse(x +32, y + 12, 20, 20);
        ellipse(x +22, y + 24, 20, 20);
        
        rotate(-60);
        popMatrix();
};

//Thank you to @Kiwi for this. View their awesome stuff here: https://www.khanacademy.org/profile/kaid_747554134914263599526629
var mouseInRect = function(x,y,width,height){
    if(mouseX > x && mouseX < x + width & mouseY > y && mouseY < y + height){
        return true;
    }
    return false;
};
var primaryCols = [
    color(255, 0, 0),
    color(255, 0, 255),
    color(0, 0, 255),
    color(0, 255, 255),
    color(0, 255, 0),
    color(255, 255, 0),
    color(255, 0, 0)
    ];
var colourPicker = function(x,y){
    this.from1 = color(255, 255, 255);
    this.to1 = color(0, 0, 0);
    this.to2 = color(255, 0, 0);
    this.x=x;
    this.y=y; 
    this.res=10;
    this.wid= 150;
    this.hei= 150;
    this.picking = "";
    
    this.draw = function() {
        noStroke();
        fill(0, 0, 0);
        
  //      rect(this.x-2,this.y-2,184,155);
        for (var c = 0; c < 150; c+=this.res){
            for (var i = 0; i < 150; i+=this.res){
                var xv =this.mouseColor(i,c);
                fill(xv);
                rect(this.x+i-i%this.res, this.y+c-c%this.res,this.res, this.res);
            }
        }
        noStroke();
        for(var e = 0; e < primaryCols.length-1; e ++){
        for(var i = 0; i < 10; i ++){
            var col = lerpColor(primaryCols[e],primaryCols[e+1],i/10);
            fill(col);
           rect(this.x+152,this.y+i*2.5+e*25,28,2.5);
        }
        }
        fill(255, 255, 255);
        if(mouseIsPressed && mouseInRect(this.x+152,this.y-30,30,30)){
            this.picking = "";
        }
    };
    
    this.mouseColor = function(X,Y) {
        return lerpColor(lerpColor(this.from1, this.to2, X/(this.wid)),this.to1, Y/(this.hei));
    };
    this.inBounds = function(mx,my){
        var bool = false;
        if (mx>this.x&&mx<this.x+this.wid&&my>this.y&&my<this.y+this.hei){bool=true;}
        return bool;
    };
    this.inPrimaryPicker = function(mx,my){
        var bool = false;
        if (mx>this.x+this.wid&&mx<this.x+this.wid+30&&my>this.y&&my<this.y+this.hei){bool=true;}
        return bool;
    };
    
};
var picker = new colourPicker(396,392);
//Thanks again Kiwi! If you'd like I can delete this and make a new one, but I'm not that advanced in coding yet, so it's easier if i can use this.

//ok ngl there is no need for this awesome font.
//but lin gh made it and now i love it soooo
var upper_case = function(char) {
    var U_CASE = /[A-Z]/; //a regular expression containing all capital words
    return U_CASE.test(char); //is the character upper case?
};
var Letter = function(letter, x, y) {
    
    //draw the letter
    switch (letter) {
        case "A":
            rect(x, y, 5, 30, 5);
            line(x+7, y+0, x+25, y+30);
            line(x+7, y+15, x+15, y+15);
        break;
        case "B":
            rect(x, y, 5, 30, 5);
            arc(x+9, y+8, 23, 15, -107, 90);
            arc(x+9, y+22, 30, 15, -98, 103);
        break;
        case "C":
            arc(x + 17, y + 15, 30, 29, 49, 308);
            arc(x + 17, y + 15, 13, 26, 82, 282);
        break;
        case "D":
            rect(x, y, 5, 30, 5);
            arc(x + 10, y + 15, 36, 31, -126, 112);
        break;
        case "E":
            rect(x, y, 5, 30, 5);
            line(x + 5, 30 + y, x + 24, 30 + y);
            line(x + 5, 15 + y, x + 23, 15 + y);
            line(x + 6, 0 + y, x + 25, 0 + y);
        break;
        case "F":
            rect(x, y, 5, 30, 5);
            line(x + 4, 15 + y, x + 18, 15 + y);
            line(x + 4, 0 + y, x + 24, 0 + y);
        break;
        case "G":
            arc(x + 17, y + 15, 27, 30, 46, 301);
            arc(x + 17, y + 15, 13, 26, 82, 282);
            line(x + 21, 17 + y, x + 27, 17 + y);
            line(x + 27, 25 + y, x + 27, 18 + y);
        break;
        case "H":
            rect(x, y, 5, 30, 5);
            line(x + 3, 15 + y, x + 28, 15 + y);
            line(x + 26, 0 + y, x + 26, 30 + y);
        break;
        case "I":
            rect(x+7, y, 5, 30, 5);
            line(x + 3, 0 + y, x + 17, 0 + y);
            line(x + 3, 30 + y, x + 17, 30 + y);
        break;
        case "J":
            bezier(x + 18, 0 + y, x + 37, 35 + y, x + 5, 38 + y, x + 7, 23 + y);
            line(x + 9, 0 + y, x + 28, 0 + y);
        break;
        case "K":
            rect(x, y, 5, 30, 5);
            line(x + 24, 0 + y, x + 9, 17 + y);
            line(x + 27, 30 + y, x + 7, 15 + y);
        break;
        case "L":
            rect(x, y, 5, 30, 5);
            line(x + 7, 30 + y, x + 26, 30 + y);
        break;
        case "M":
            rect(x, y, 5, 30, 5);
            line(x + 6, 0 + y, x + 15, 20 + y);
            line(x + 24, 0 + y, x + 15, 20 + y);
            line(x + 24, 0 + y, x + 27, 30 + y);
        break;
        case "N":
            rect(x, y, 5, 30, 5);
            line(x + 6, 0 + y, x + 24, 30 + y);
            line(x + 24, 0 + y, x + 24, 30 + y);
        break;
        case "O":
            ellipse(x + 15, y + 15, 25, 30);
            arc(x + 17, y + 15, 13, 26, 82, 282);
        break;
        case "P":
            rect(x, y, 5, 30, 5);
            bezier(x + 5, 18 + y, x + 39, 25 + y, x + 35, -12 + y, x + 4, 2 + y);
        break;
        case "Q":
            ellipse(x + 15, y + 15, 27, 30);
            arc(x + 17, y + 15, 13, 26, 82, 282);
            line(x + 18, y + 28, x + 30, 30 + y);
        break;
        case "R":
            rect(x, y, 5, 30, 5);
            arc(x + 8, y + 8, 38, 19, -98, 97);
            line(x + 26, 30 + y, x + 6, 16 + y);
        break;
        case "S":
            bezier(x + 25, 7 + y, x + 18, -11 + y, x + -17, 7 + y, x + 15, 16 + y);
            bezier(x + 1, 24 + y, x + 9, 44 + y, x + 40, 23 + y, x + 15, 16 + y);
            arc(x + 17, y + 8, 13, 14, 139, 301);
        break;
        case "T":
            rect(x+7, y, 5, 30, 5);
            line(x + -2, 0 + y, x + 22, 0 + y);
        break;
        case "U":
            rect(x+4, y, 5, 27, 5);
            bezier(x + 4, 20 + y, x + 2, 36 + y, x + 28, 36 + y, x + 26, 20 + y);
            line(x + 4, 0 + y, x + 4, 20 + y);
            line(x + 26, 0 + y, x + 26, 20 + y);
        break;
        case "V":
            rect(x, y, 5, 30, 5);
            line(x + 25, 0 + y, x + 7, 30 + y);
        break;
        case "W":
            rect(x, y, 5, 30, 5);
            line(x + 15, 5 + y, x + 6, 30 + y);
            line(x + 15, 5 + y, x + 24, 30 + y);
            line(x + 28, 0 + y, x + 24, 30 + y);
        break;
        case "X":
            pushMatrix();
            translate(x+3, y+2);
            rotate(-35);
            rect(0, 0, 5, 36, 5);
            popMatrix();
            line(x + 26, 0 + y, x + 4, 30 + y);
        break;
        case "Y":
            line(x + 2, -1 + y, x + 12, 17 + y);
            line(x + 23, -1 + y, x + 12, 17 + y);
            rect(x+9, y+17, 5, 14, 5);
        break;
        case "Z":
            pushMatrix();
            translate(x+24, y-2);
            rotate(35);
            rect(0, 0, 5, 36, 5);
            popMatrix();
            line(x + 4, 0 + y, x + 25, 0 + y);
            line(x + 5, 30 + y, x + 26, 30 + y);
        break;
        
        case "a":
            bezier(x + 16, 30 + y, x + -6, 35 + y, x + 1, 10 + y, x + 14, 17 + y);
            bezier(x + 16, 17 + y, x + 14, 29 + y, x + 17, 25 + y, x + 16, 32 + y);
        break;
        case "b":
            line(x + 4, 0 + y, x + 4, 29 + y);
            bezier(x + 5, 28 + y, x + 25, 40 + y, x + 12, -4 + y, x + 4, 20 + y);
        break;
        case "c":
            bezier(x + 16, 28 + y, x + -6, 41 + y, x + 2, 7 + y, x + 16, 18 + y);
        break;
        case "d":
            line(x + 16, 0 + y, x + 16, 29 + y);
            bezier(x + 16, 28 + y, x + -3, 36 + y, x + 2, 7 + y, x + 16, 18 + y);
        break;
        case "e":
            bezier(x + 4, 23 + y, x, 17 + y, x + 16, 10 + y, x + 18, 23 + y);
            bezier(x + 3, 23 + y, x + 2, 28 + y, x + 7, 33 + y, x + 17, 29 + y);
            line(x + 3, 23 + y, x + 18, 23 + y);
        break;
        case "f":
            line(x + 2, 7 + y, x + 2, 30 + y);
            line(x - 1, 16 + y, x + 7, 16 + y);
            arc(x + 5, y + 8, 6, 13, 180, 355);
        break;
        case "g":
            ellipse(x + 10, y + 22, 13, 17);
            bezier(x + 17, 15 + y, x + 22, 66 + y, x + -2, 47 + y, x + 3, 37 + y);
        break;
        case "h":
            line(x + 3, 2 + y, x + 3, 29 + y);
            bezier(x + 17, 30 + y, x + 20, 11 + y, x + 3, 7 + y, x + 3, 30 + y);
        break;
        case "i":
            line(x + 5, 20 + y, x + 5, 29 + y);
            ellipse(x + 5, y + 11, 1, 1);
        break;
        case "j":
            bezier(x + 5, 19 + y, x + 13, 33 + y, x + 1, 51 + y, x + -1, 35 + y);
            ellipse(x + 5, y + 10, 1, 1);
        break;
        case "k":
            line(x + 5, 2 + y, x + 5, 30 + y);
            line(x + 15, 5 + y, x + 7, 20 + y);
            line(x + 19, 30 + y, x + 7, 20 + y);
        break;
        case "l":
            line(x + 5, 0 + y, x + 5, 30 + y);
        break;
        case "m":
            line(x + 3, 14 + y, x + 3, 30 + y);
            bezier(x + 10, 30 + y, x + 10, 6 + y, x + 1, 18 + y, x + 3, 30 + y);
            bezier(x + 17, 30 + y, x + 20, 6 + y, x + 8, 18 + y, x + 10, 30 + y);
        break;
        case "n":
            line(x + 3, 17 + y, x + 3, 30 + y);
            bezier(x + 16, 30 + y, x + 20, 11 + y, x + 2, 11 + y, x + 4, 30 + y);
        break;
        case "o":
            ellipse(x + 10, y + 22, 14, 15);
        break;
        case "p":
            line(x + 4, 18 + y, x + 4, 44 + y); 
            bezier(x + 4, 30 + y, x + 21, 38 + y, x + 24, 12 + y, x + 4, 18 + y);
        break;
        case "q":
            line(x + 17, 18 + y, x + 17, 38 + y); 
            ellipse(x + 11, y + 20, 12, 15);
        break;
        case "r":
            line(x + 4, 18 + y, x + 4, 30 + y);
            bezier(x + 18, 19 + y, x + 14, 14 + y, x + 4, 13 + y, x + 4, 30 + y);
        break;
        case "s":
            bezier(x + 16, 18 + y, x + 12, 8 + y, x + -5, 20 + y, x + 10, 22 + y);
            bezier(x + 3, 28 + y, x + 6, 33 + y, x + 25, 28 + y, x + 10, 22 + y);
        break;
        case "t":
            line(x + 4, 2 + y, x + 4, 30 + y);
            line(x + 0, 13 + y, x + 10, 14 + y);
        break;
        case "u":
            bezier(x + 4, 16 + y, x + 3, 38 + y, x + 16, 31 + y, x + 16, 16 + y);
            line(x + 16, 16 + y, x + 16, 30 + y);
        break;
        case "v":
            line(x + 4, 15 + y, x + 10, 30 + y);
            line(x + 16, 15 + y, x + 10, 30 + y);
        break;
        case "w":
            line(x + 2, 15 + y, x + 6, 30 + y);
            line(x + 10, 15 + y, x + 6, 30 + y);
            line(x + 10, 15 + y, x + 14, 30 + y);
            line(x + 18, 15 + y, x + 14, 30 + y);
        break;
        case "x":
            line(x + 3, 15 + y, x + 17, 30 + y);
            line(x + 17, 15 + y, x + 3, 30 + y);
        break;
        case "y":
            bezier(x + 4, 18 + y, x, 36 + y, x + 21, 29 + y, x + 15, 17 + y);
            bezier(x + 15, 19 + y, x + 21, 45 + y, x + 5, 50 + y, x + 3, 39 + y);
        break;
        case "z":
            line(x + 4, 15 + y, x + 15, 15 + y);
            line(x + 5, 30 + y, x + 15, 30 + y);
            line(x + 16, 15 + y, x + 5, 30 + y);
        break;
        case ".":
            ellipse(x + 5, y + 30, 2, 2);
        break;
        case "!":
            line(x + 5, y, x + 4, 21 + y);
            ellipse(x + 4, y + 30, 2, 2);
        break;
        case "?":
            bezier(x + 6, 16 + y, x + 25, -8 + y, x + -1, -7 + y, x + 3, 4 + y);
            line(x + 6, 16 + y, x + 5, 25 + y);
            ellipse(x + 5, y + 30, 2, 2);
        break;
        case ",":
            line(x + 4, 26 + y, x + 2, 32 + y);
        break;
        case "'":
            line(x + 6, 2 + y, x + 4, 11 + y);
        break;
        case "/":
            line(x + 3, 30 + y, x + 17, 0 + y);
        break;
        case "-":
            line(x + 8, 15 + y, x + 2, 15 + y);
        break;
        case "0":
            ellipse(x + 10, y + 15, 17, 28);
        break;
        case "1":
            line(x + 7, y + 2, x + 7, y + 28);
            line(x + 7, y + 2, x + 3, y + 8);
        break;
        case "2":
            bezier(x + 5, y + 10, x + 7, y + -8, x + 31, y + 5, x + 4, y + 28);
            line(x + 4, y + 28, x + 18, y + 28);
        break;
        case "3":
            bezier(x + 4, y + 8, x + 10, y + -12, x + 27, y + 11, x + 11, y + 15);
            bezier(x + 4, y + 26, x + 10, y + 36, x + 27, y + 20, x + 11, y + 15);
        break;
        case "4":
            line(x + 15, y + 1, x + 15, y + 28);
            line(x + 15, y + 1, x + 2, y + 20);
            line(x + 19, y + 17, x + 2, y + 20);
        break;
        case "5":
            line(x + 4, y + 3, x + 15, y + 3);
            line(x + 4, y + 3, x + 5, y + 12);
            bezier(x + 4, y + 26, x + 16, y + 33, x + 22, y + 9, x + 5, y + 12);
        break;
        case "6":
            bezier(x + 9, y + 28, x + -6, y + 27, x + 1, y + 3, x + 14, y + 2);
            ellipse(x + 9, y + 20, 15, 16);
        break;
        case "7":
            line(x + 18, y + 2, x + 6, y + 28);
            line(x + 17, y + 2, x + 2, y + 3);
        break;
        case "8":
            ellipse(x + 10, y + 6, 12, 12);
            ellipse(x + 10, y + 20, 14, 16);
        break;
        case "9":
            ellipse(x + 9, y + 7, 13, 15);
            line(x + 11, y + 29, x + 16, y + 8);
        break;
        case ":":
            ellipse(x + 5, y + 7, 2, 2);
            ellipse(x + 5, y + 23, 2, 2);
        break;
    }
};
var Text = function(txt, x, y, size, color) {
    
    var t, //used later in splitting a sentence to an array containing the letters (even spaces)
    txtLine = txt.split("\n"), //make an array of multiple lines (if \n is not used, it'll return an array containing the whole sentence)
    space = 0, //space between words
    scaleTxt = size/40, //amount of scale
    lineDis = 0, //distance between lines
    n = 0, l; //while loop variables
    
    stroke(color); 
    
    pushMatrix();
    
    translate(x, y);
    scale(scaleTxt);
    
    noFill();
    strokeWeight(2);
    
    //loop through lines
    while (n < txtLine.length) {
        
        t = txtLine[n].split(""); //split them to arrays containing letters
        space = 0; //reset spacing
        l = 0; //reset loop
        
        //loop through letters
        while (l < t.length) {

            
            if (upper_case(t[l]) && t[l] !== "T" && t[l] !=="Y" && t[l] !== "I") { //check if the letter is upper case (with exception of some letters)
                
                Letter(t[l], l * 20 + space, lineDis);
                space += 14; //increase space
                
            } else if (t[l] === "f" || t[l] === "i" || t[l] === "j" || t[l] === "l" || t[l] === "t" || t[l] === " " || t[l] === "." || t[l] === "," || t[l] === "'" || t[l] === "!" || t[l] === "-" || t[l] === "1" || t[l] === ":") { //check for certain thin letters (or spaces, punctuation marks, etc.)
                
                Letter(t[l], l * 20 + space, lineDis, size);
                space -= 3; //decrease space
                
            } else { //the rest of the letters
                
                Letter(t[l], l * 20 + space, lineDis, size);
            }
            
            l ++;
        }
        
        lineDis += 56; //increase line distance when we get to the next line
        
        n ++;
    }
    
    popMatrix();
};
//thanks!

var play = new Button ({
        x : 241,
        y : 316,
        label : "Play",
        labelX: 263,
        width:138,
        height:140,
        onClick : function() {
                started = true;
                
        }
});
var how = new Button ({
        x : 88,
        y : 376,
        label : "How",
        labelX : 111,
        width:109,
        height:108,
        onClick : function() {
            gameMode = "how";
                
        }
});
var leaders = new Button ({
        x : 404,
        y : 382,
        label : "Leaders",
        width:108,
        height:109,
        labelX: 407,
        onClick : function() {
               gameMode = "leader";
                
        }
});
var cust = new Button ({
        x : 241,
        y : 463,
        label : "Setting",
        width:108,
        height:109,
        labelX: 246,
        onClick : function() {
               gameMode = "custom";
                
        }
});
fill(255);
var goBack = new Button ({
    x : -16,
        y : 553,
        label : "Back",
        width:108,
        height:108,
        labelX: -12 + 23,
        onClick : function() {
               gameMode = "main";
                
        }
});

var e = new Button ({
        x : 152,
        y : 240,
        label : "Easy",
        width:108,
        height:109,
        labelX: 176, //NO!
        onClick : function() {
            difficulty= "e";
                
        }
});
var m = new Button ({
        x : 38,
        y : 240,
        label : "Medium",
        labelX : 44,
        width:109,
        height:108,
        onClick : function() {
            difficulty= "m";
        }
});
var h = new Button ({
        x : 267,
        y : 239,
        label : "Hard",
        width:108,
        height:109,
        labelX: 282,
        onClick : function() {
            difficulty= "h";
              
        }
});

var f = new Button ({
        x : 20,
        y : 390,
        label : "No",
        labelX : 55,
        width:91,
        height:91,
        onClick : function() {
            inverted = false;
                
        }
});
var t = new Button ({
        x : 124,
        y : 391,
        label : "OK",
        width:91,
        height:91,
        labelX: 155,
        onClick : function() {
            inverted = true;
              
        }
});

//how scene. tbh not nessicary. i belive you should jst start the game and expect them to learn it. >:)
var howToScene = function() {
    background(0, 0, 0);
    
    background(0);
    textSize(23);
    textAlign(CENTER);
    fill(255, 255, 255);
    Text("You are a dodger, part of an experiment onyour kind. \nYour job? To dodge those blocks falling from the sky.\n\nUse AD or the arrows to move.\nRemember, get hit more than 10 times, and you're out \n- permenantly. \nNot all blocks are bad, however. \nDark blue  ones will take away 10 lives.\nLight blue ones will give you 5.\n\nIf you get to 6000 points, you'll get a booster.\nPress the Q key to reduce damage.Then release it to turn it\noff. Continuosly pressing the Q key  will do nothing.\n\nSo will you survive?\nThere's only one way to find out.\n\nAlso, be sure the amp up the sound and allow this site to \nplay sound. To learn how, see the code.", 29, 14, 20);
   
};
//settings scene. one of my fav cus it has a coloor picker innint. 
var customize = function(){

        background(0, 0, 0);
 
        textSize(56);
        fill(255, 255, 255);
        textFont(createFont("Trebuchet MS Bold"));
        textAlign(CENTER);
        text("Settings", 235, 85);
        textSize(21);
        textAlign(LEFT);
        text("Diffculty: \n(Be sure to click the button twice!) \n\n\n\n\n\n\nInverted:                                  Pick your character color: ", 33, 183);
        m.draw();
        h.draw();
        e.draw();
        
        t.draw();
        f.draw();
        picker.draw();
        
        goBack.draw();
        fill(colorOfPlayer);
        noStroke();
        rect(322, 414, 40, 40);
        
       
    
    
    

   
};
//game over scene. this one is one you can see after you lose hehe. that's y i like this game - you can lose but you cant win :D
var gameOverScreen = function() {
    background(0, 0, 0);
    
    fill(colorOfPlayer);
    noStroke();
    triangle(0, width, 0, 0, height, 0);
    textAlign(CENTER);
    textSize(30);
    fill(255, 255, 255);
    text(".. And you are full of loser sad sauce,\nEh, at least you got "+floor(score)+" points.\nBut there's always a next time!\n\nClick to playeth again.", 283, 300);
    
    textSize(54);
    text("You Kicked The Bucket".substring(s, 0), 302, 195);
    
    
    s+=0.05;
    
};
//leaderboard - just my family on it becuase i am in mmy child account days (#2021)
var leaderScene = function() {
    background(0, 0, 0);
    
    
    background(0);
    textSize(56);
    textFont(createFont("Trebuchet MS Bold"));
    textAlign(CENTER);
    fill(245, 226, 19);
    text("Leaderboard", 297, 146);
    textSize(21);
    fill(255, 255, 255);
    text("Azfar as Nothing - 8790\nAzfar as Nothing - 6290\nzainAzfar as chickenButts - 5723\nzainAzfar as chickenButts - 5160\nzainAzfar as chickenButts - 4676\nAyesha as Mama - 4560\nzoyaAzfar as HELP! - 3595", 297, 183);
    
    textSize(31);
    text("Do you think you can get a spot?\nRestart, and PLAY!", 297, 435);
    
    
};
//the main scene with all of them buttons and navigation whatever.
var mainScene = function() {
    background(0, 0, 0);
    fill(colorOfPlayer);
    noStroke();
    triangle(0, width, 0, 0, height, 0);

    textSize(56);
    textFont(createFont("Trebuchet MS Bold"));
    textAlign(CENTER);
    fill(255);
    text("Dodger.io", 297, 146);
    textSize(21);
    text("A game of speed and skill", 297, 183);
    textSize(14);
    text("Highscore:" + highscore, 300, 204);
    text("Tip: Make sure to allow sound! (See how in the code)", 178, 29);
    
    play.draw();
    how.draw();
    leaders.draw();
    cust.draw();
};

//basically the navigation, color picking, difficulty, frequrncy and game scene rolled into one.
draw = function() {
    background(0, 0, 0);
    
    if (gameMode === "main") {
        mainScene();
    } else if (gameMode === "how") {
        howToScene();
    } else if (gameMode ==="leader") {
        leaderScene();
    } else if (gameMode==="custom"){
        customize();
    } 
    
    
           
    
if (difficulty === "m") {
    enemyFrequency = 70;
} else if (difficulty === "h") {
    enemyFrequency = 30;
} else if (difficulty === "e") {
    enemyFrequency = 60;
}

  if(mouseIsPressed){
    if(picker.inBounds(mouseX,mouseY)){
        colorOfPlayer = get(mouseX, mouseY);
    }
    if(picker.inPrimaryPicker(mouseX,mouseY)){
            picker.to2 = get(mouseX,mouseY);
    }
    }
    
    if (started) {
        noStroke();
        background(0, 0, 0);
        
        
        fill(255, 255, 255);
        rect(0, -28, width + 900, 205, 5);
        
        
        
        //display the player's health and score
        textAlign(CENTER);
        textSize(22);
        fill(36, 36, 36);
        
        text("Health: " + player.health, 87, 34);
        text("Score: " + floor(score), 92, 64);
        text("Difficulty: " + difficulty, 515, 36);
        text("Booster:", 300, 66);
        
        
        
        //move the player
        if(inverted === false) {
        if(keys[LEFT] || keys[65]) { //Left arrow or A
            //move the player to the left
            player.x = constrain(player.x - player.vx, 0, width - player.w);
//            player.x++;
            player.direction = -1;
        }
        if(keys[RIGHT] || keys[68]) { //Right arrow or D
            //move the player to the right
            player.x = constrain(player.x + player.vx, 0, width - player.w);
            player.direction = 1;
        }
            
      
        } else if (inverted){
            
        if(keys[LEFT] || keys[65]) { //Left arrow or A
            //move the player to the right
            player.x = constrain(player.x + player.vx, 0, width - player.w);
            //set the direction
            player.direction = 1;
        }
        if(keys[RIGHT] || keys[68]) { //Right arrow or D
        //move the player to the left
            player.x = constrain(player.x - player.vx, 0, width - player.w);
            //set the direction
            player.direction = -1;
            
        
            } 
        
        
        }
        
        //make it so it  cant go past the edges.
        
        //draw the player
        noStroke();
        fill(colorOfPlayer);
        rect(player.x, player.y, player.w, player.h);
        fill(255, 255, 255);
        textSize(20);
        text(name, player.x, player.y + -19);
        fill(0);
        textAlign(CENTER);
        fill(0);
        ellipse(player.x + player.w * 0.2 + (player.direction * player.w * 0.1),
                player.y + player.h * -0.17,
                player.w * 0.15,
                player.h * 0.15
        );
        fill(0, 0, 0);
        ellipse(player.x + player.w * -0.3 + (player.direction * player.w * 0.1),
                player.y + player.h * -0.21,
                player.w * 0.15,
                player.h * 0.15
        );
        fill(colorOfPlayer);
        
       
        
        //reset the direction of the player to 0
        player.direction = 0;
        
        //if game over
        if(gameOver) {
            gameOverScreen();
        }
        //else (not game over)
        else {
            
            //add a new enemy object to the enemies array
            if(frameCount % enemyFrequency === 0) {
                //add a new enemy object to the enemies array
                enemies.push(
                    {
                        x: random(width),
                        y: random(-100, -70),
                        w: random(30, 50),
                        h: random(30, 50),
                        vy: enemySpeed,
                        color: col,
                    }
                );
                
                //change the frequency of the enemies
                enemyFrequency = constrain(enemyFrequency -10, 10, enemyFrequency);
                translate(random(-5, 5), random(-5, 5));
            }
  
            //loop through the enemies array
            for(var i = enemies.length - 1; i >= 0; i--) {
                //get the enemy at the current index
                var enemy = enemies[i];
                
                //move the enemy
                enemy.y+= enemy.vy;
                
                //draw the enemy
                noStroke();
                fill(enemy.color);
                
                rect(enemy.x, enemy.y, enemy.w, enemy.h);
                
                noStroke();
                //remove the enemy if it goes off the screen
                if(enemy.y > height) {
                    enemies.splice(i, 1);
                    
                }
                //check for collision between the player and the enemy
                else if(player.x < enemy.x + enemy.w && 
                        player.x + player.w > enemy.x && 
                        player.y < enemy.y + enemy.h && 
                        player.y + player.h > enemy.y && enemy.color  ===color(0, 9, 255)) {
                
                
                    //reduce the player's health
                    player.health = constrain(player.health - reduce, 0, 100);
                    
                    explode(player.x, player.y);
                  
    playSound(getSound("retro/hit2"));
                    
                    
                    //remove the enemy
                    enemies.splice(i, 1);
                    
                        }
                
                if(player.x < enemy.x + enemy.w && 
                        player.x + player.w > enemy.x && 
                        player.y < enemy.y + enemy.h && 
                        player.y + player.h > enemy.y && enemy.color === color(0, 213, 255)) {
                        player.health = constrain(player.health +5, 0, 100);
                        
                    enemies.splice(i, 1);
                    
                     playSound(getSound("retro/coin"));
                
                }
                 if (score > 400 && score < 500) {
                    fill(48, 145, 35);
              text("RUSH HOUR!", 516, 65);
              enemy.color =color(0, 213, 255);
              
            } 
            }
            
            if (score > 700) {
              fill(250, 40, 201);
              text("Damage Reduce (Click Q)", 467, 65);
            }   
            if (score > 6000 && keyCode === UP && keyIsPressed || key.toString() === "q" || key.toString() === "Q") {
                reduce = 5;
            } else if (keyReleased) {
                reduce = 10;
            }
            
            
            
            
            //increase the score
           
            score +=0.14;
            
            //check if the player runs out of health
            if(player.health === 0) {
                gameOver = true;
                loadScore();
                if(score > highscore){
                            highscore = score;
                        }
            }
            
            //score bonus
        }
        
        //draw the ground
        fill(176, 176, 176);
        rect(33, 565, width + 600, 68);
        } else {
    }
    
    
};

//mouse clicked func for the buttons
mouseClicked = function() {
    if (gameMode === "main"){
    how.handleMouseClick();
    play.handleMouseClick();
    leaders.handleMouseClick();
    cust.handleMouseClick();
    }
    
   
        e.handleMouseClick();
        m.handleMouseClick();
        h.handleMouseClick();
        t.handleMouseClick();
        f.handleMouseClick();
        
        
       goBack.handleMouseClick();

    
    if (gameOver) {
           
            
        
        //set the score back to 0
        score = 0;
        
        //set the game over state back to false
        gameOver = false;
        
        //set the player's health back to 100
        player.health = 100;
        
        //clear the enemies array
        enemies.length = 0;
        
    //    enemyFrequency;
    }
    
    
};
//mouse over func for the buttons hover effect
mouseMoved= function() {
    h.handleHoverThingy();
    e.handleHoverThingy();
    m.handleHoverThingy();
    t.handleHoverThingy();
    f.handleHoverThingy();
    goBack.handleHoverThingy();
    cust.handleHoverThingy();
    leaders.handleHoverThingy();
    how.handleHoverThingy();
    play.handleHoverThingy();
    
};


//tbh this is my first 1300+ lines thingy
//thjis is even higher than my chess rating!
//which ngl is not a lot.