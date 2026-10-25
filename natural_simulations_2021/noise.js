
{
enableContextMenu();
noiseSeed(1);
randomSeed(1);
var drawRange = function(incAmount, h, col, xOff) 
{
   
    for (var t = 0; t < incAmount*width; t += incAmount) {
        var n = noise(t + xOff);
        var y = map(n, 0, 1, 41, h);
        stroke(col);
        fill(153, 0, 255);
        rect(t*199, height-y, 1, y);
    }
};

var drawTrees = function(incAmount, h, xOff, col) 
{
   
    for (var t = 0; t < incAmount*width; t += incAmount) {
        var n = noise(t + xOff);
        var y = map(n, 0, 1, 0, h);
        stroke(col);
        rect(t*10, height-y, 1, y);
    }
};

var drawBack = function() 
{
    var xOff = 0.0;
    for (var x = 0; x < 717; x++) {
        var yOff = 0.0;
        for (var y = 0; y < 516; y++) {
            var bright = map(noise(xOff, yOff), 0, 1, 0, 255);
            stroke(bright + 230, bright + 210, bright + 9);
            point(x, y);
            yOff += 0.01;
        }
        xOff += 0.01;
        
    }

};

var drawBrid = function(x, y, s) 
{

    pushMatrix();
            translate(x, y);
            scale(s);
            stroke(50);
            strokeWeight(2);
            noFill();
            arc(10, 10, 12, 10, -100, 10);
            arc(23, 10, 12, 10, 170, 260);
    popMatrix();
};

background(0, 0, 0); //Color the background
drawBack(); //Draw the back

//Mountains:
drawRange(0.01, 569, color(159, 242, 242), 6.8); // Fourth