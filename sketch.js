var Engine = Matter.Engine,

	World = Matter.World,
	Mouse = Matter.Mouse,
	Bodies = Matter.Bodies;
	MouseConstraint = Matter.MouseConstraint; // lines 3–6 assign aliases to the matter.js modules for ease of access

var engine;
var world;
var boxes = [];
var boxHeight = 70;
var boxWidth = 70;
var ground;
var wall;
var otherwall;
var mConstraint;
// lines 8–16 set necessary variables for later use (ie: boxHeight for setting the box's height in a dynamic, easy-to-adjust fashion)

function setup() {
	var canvas = createCanvas(1000,800);
	engine = Engine.create();
	world = engine.world;
	
	Engine.run(engine);

	var option = { // bundling wall options
		isStatic: true
	}

	ground = Bodies.rectangle(500, height - 50, width, 10, option);
		World.add(world,ground);
		fill(255);
		wall = Bodies.rectangle(0,500,10,height, option);
		World.add(world,wall);
		otherwall = Bodies.rectangle(980,500,10,height,option);
		World.add(world,otherwall);

	var canvasmouse = Mouse.create(canvas.elt);
	canvasmouse.pixelRatio = pixelDensity(); // this addresses any issue that may present itself due to differing pixel densities across devices
	var options = {
		mouse: canvasmouse

	}
	mConstraint = MouseConstraint.create(engine, options);
	World.add(world,mConstraint); // adds mouse interactivity to the simulation, enabling interaction with objects
	
}

function keyPressed() { // upon the press of a key, a box object will be generated

	boxes.push(new Box(mouseX,mouseY,boxWidth,boxHeight)); // passing arguments to box object)
	// object will be positioned at click location, hence mouseX, mouseY for coordinates
}

function draw() {
	background(240,247,245);
	for(var i = 0; i < boxes.length; i++) {
		boxes[i].show(); // displays the box object generated upon user input

	}


	noStroke(255);
	fill(170);
	rectMode(CENTER);
	rect(ground.position.x,ground.position.y,width,20);

	if (mConstraint.body) { 
		/* a condition which draws a line from a 
		point on the box clicked to the mouse
		*/
		var position = mConstraint.body.position;
		var m = mConstraint.mouse.position;
		var offset = mConstraint.constraint.pointB;
		stroke(216,134,130);
		line(position.x + offset.x,position.y + offset.y,m.x,m.y); // without the offset, line would always be drawn from center of body, now drawn from click location
	}

	
}