/** For my computational creatures project, I have made my own creature. While I have not given it a name,I have endowed it with behaviour. 

@Evaluation {
Here's my self evaluation:
1. Creates a creature like object in the code, with a constructor and methods.
    Yes. It has 1 constructor, with 5 methods: Attract, update, display,          checkEdge and age. (Determines age) I have edited them all. For display,      I changed up the colors and size. For update, I have added different          behaviours. For check edges, I just contrained the ball, not make it          teleport.
    
2. Endows the creature with unique behavior (besides what was in the example code, like basic mouse following).
    Yes. As I said, one is attraction. One is hesitancy. And the other is the     flight response. Try it out yourself.
    
3. Includes comments that clearly describe the creature behavior.
    Yes.
    
4. Doesn't have any syntax errors or program logic errors.
   Yes, I have no errors. On Noes isn't going crazy, is he?
   
5. I certify that this is all my original work. If I took any parts from elsewhere, then they were non-essential parts of the project, and they are clearly attributed at the top. I will show I agree to this honor code by typing "Yes".

    Yes. NO part of this project was taken from elsewhere. Unless you count my brother suggessting some ideas, which I then implemeted into code. 
}

@DescriptionAndPlans{
1. Love the light
2. Retreat from mice
3. Are hesitant when offered food
4. Like to move. (As you can see) -->
5. Kids, younger, retreat from enemies. Elders don't. 
6. As time passes, they grow.

PLAN FOR THE FUTURE:
o Kids go away, mice attack kids. Parents protect kid.If parent alone go away
o Make these 'mouse types' availible in the wild.
}

@HowTo {
        I wanted to make this super interactive:
        1. Click the buttons to change mouse type
        2. Refresh to make the age restart
}

**/ //<-- Read that

var mouseType = "normal";
var name;

var Mouse = function() {
    this.position = new PVector(width/2, height/2); //The position; the center
    this.velocity = new PVector(0, 0); //The velocity. 0 right now.
    this.acceleration = new PVector(0, 0); //The accelration, also 0
    this.size = new PVector(28, 28); //The size, it makes my life easier. :)
    this.col = color(17, 0, 255);  //The color. 
    this.old = this.age(); //It's age, determined by the method below.
};

Mouse.prototype.age = function() {
    
    //If it's been 60000 milliseconds since the program started, make it older
    if (millis() > 60000) {
           // Program.restart();
        this.old = 2; //Old
       
    //Otherwise, let it be young.
    } else if (millis() < 60000) {
        this.old = 1; //Young
        this.size.x = 15;  this.size.y = 15;
        this.col = color(0, 230, 255);

    }
};
Mouse.prototype.update = function() {
    
    //Now, the Mouse knows how old it is.
    this.age();
    
    //Make the cursor as a new PVector();
    var cursor = new PVector(mouseX, mouseY);
    //And it's direction = to the diff between the cursor and pos.
    var dir = PVector.sub(cursor, this.position);
    
    //The biggest vector possible
    var maxDir = (new PVector(width-1, height-1));
    //The magnitude of that.
    var maxMag = maxDir.mag();
    
    //It's closeness = the max. magnitude - the diff between cusor and pos / maximum mag of the biggest vector.
    var closeness = ((maxMag - dir.mag()) / maxMag);
    
    if (mouseType === "light") {
            
            //Normalize
            dir.normalize();
            dir.mult(closeness);
            
            this.acceleration = dir;
            this.velocity.add(this.acceleration);
            this.velocity.limit(5);
            this.position.add(this.velocity);
    
    } else if (mouseType === "food") {
    
            dir.normalize();
            dir.mult(0.1);
            
            this.acceleration = dir;
            this.velocity.add(this.acceleration);
            this.velocity.limit(5);
            this.position.add(this.velocity);
    } else if (mouseType === "mouse") {
                
                if (this.old === 1) {
                    dir.normalize();
                    dir.mult(-closeness/2);
                    this.acceleration = dir;
                    this.velocity.add(this.acceleration);
                    this.velocity.limit(1);
                    this.position.add(this.velocity);
                } //flight
             
                else if (this.old === 2) {
                    dir.normalize();
                    dir.mult(closeness*2);
                    this.acceleration = dir;
                    this.velocity.add(this.acceleration);
                    this.velocity.limit(2);
                    this.position.add(this.velocity);
                } //fight
                
            
    } else {
        this.acceleration = PVector.random2D();
        this.acceleration.mult(random(2));
        this.velocity.add(this.acceleration);
        this.velocity.limit(5);
        this.position.add(this.velocity);
    }
    
};
Mouse.prototype.display = function() {
    noStroke();
    fill(this.col);
    ellipse(this.position.x, this.position.y, this.size.x, this.size.y);
    
    textSize(21);
    fill(255, 255, 255);
    text("Creature\n",this.position.x- 44, this.position.y  -47);
};
Mouse.prototype.checkEdges = function() {

  if (this.position.x > width) {
    this.position.x = width;
  } 
  else if (this.position.x < 0) {
    this.position.x = 0;
  }

  if (this.position.y > height) {
    this.position.y = height;
  } 
  else if (this.position.y < 0) {
    this.position.y = 0;
  }
};

var Button = function(config) {
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.width = config.width || 115;
    this.height = config.height || 53;
    this.label = config.label || "Click";
    this.onClick = config.onClick || function() {};
    this.hover = config.hover || function() {};
};

Button.prototype.draw = function() {
    stroke(255, 255, 255);
    noFill();
    rect(this.x, this.y, this.width, this.height, 15);
    fill(0, 0, 0);
    textSize(27);
    fill(255, 255, 255);
    textFont(createFont("Rockwell"));
    textAlign(LEFT, TOP);
    text(this.label, this.x+25, this.y+this.height/4.8);
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

var mouse = new Mouse();

var btn1 = new Button ({
        x : 57,
        y : 390,
        label : "Light",
        onClick : function() {
                mouseType = "light";
                
        }
}); //Light
var btn2 = new Button ({
        x : 332,
        y : 390,
        label : "Food",
        onClick : function() {
                
                mouseType = "food";
                
        }
}); //Food
var btn3 = new Button ({
        x : 188,
        y : 390,
        label : "Enemy",
        width:127,
        onClick : function() {
                
                mouseType = "mouse";
                
        }
}); //Enemy


draw = function() {
    background(0, 0, 0);
    
    mouse.update();
    mouse.display(); 
    mouse.checkEdges();
       
    if (mouseType === "light") {
            cursor('none');
            fill(255, 247, 0);
            ellipse(mouseX, mouseY, 30, 30);
            fill(255, 247, 0,90);
            ellipse(mouseX, mouseY, 40, 40);
            fill(255, 247, 0,100);
            ellipse(mouseX, mouseY, 50, 50);
            
    } else if (mouseType === "food") {
            cursor('none');
            fill(112, 79, 36);
            rect(mouseX - 2, mouseY  -23, 4, 30);
            
            fill(255, 0, 0);
            ellipse(mouseX, mouseY, 30, 30);
            
    } else if (mouseType === "mouse") {
            cursor('none');
            fill(87, 87, 87);
            ellipse(mouseX, mouseY, 30, 30);
            
            fill(252, 154, 154);
            ellipse(mouseX + 1, mouseY - 16, 10, 10);
            
    } else if (mouseType === "normal") {
            cursor('auto');
            
    } 
    
    btn1.draw();    
    btn2.draw();
    btn3.draw();
    
    textSize(14);
    if(mouse.old === 1) {name=" (Young)";} 
    if(mouse.old===2){name=" (Old)";}
    text("Age:  "+ mouse.old + name, 17 ,16); //Displays age
    //Displays hunger
    //Displays speed
};
mouseClicked = function() {
        btn1.handleMouseClick();
        btn2.handleMouseClick();
        btn3.handleMouseClick();
};
