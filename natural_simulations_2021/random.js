/***********************************
 Welcome to Project: Paint Splatter!
 
 @Credit
 My dad, Baba, for helping me understand standard divsion etc. I'm only 11 and I dunno that kinda stuff.
**************************************/


// Code 💨
{
var f;
//The background (Change this for the DARK THEME)
background(0, 0, 0);

//Generates numbers
var generator = new Random(1);

var draw = function() {
    
    //Text 
    //BTW the way it flickers is purely accidental. 
    textSize(18);
    textAlign(CENTER);
    text("S P L A T T E R\nN A T U R A L   S I M U L A T I O N S", 317 ,53);
    
    //Generatator of Numbers
    var num1 = generator.nextGaussian();
    var num2 = generator.nextGaussian();
    var paintColor = generator.nextGaussian();
    var size = generator.nextGaussian();
    
    //Change this number to control how widely spread the splatters are
    var standardDeviation = 70;
    //Cahange this number to control the position of the entrie splatters
    var mean = 300;
    
    //Modfiying the nextGuassian(); to fit our canvas
    var x = standardDeviation * num1 + mean;
    var y = standardDeviation * num2 + mean;
    var col = standardDeviation * paintColor + mean;
    var radius = random(1, 20);
    
    noStroke();
    
    //This is 'Valentine Candy'
    //Add ,50 for opacity effect. 
    fill(224, col / 2, col /2 );
    
    ellipse(x, y, radius, radius);
};
}
