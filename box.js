function Box(x, y, w,h) {
	
	var options = { // bundling object options for ease of access
		friction: 0.1,
		restitution: 0,
		frictionAir: 0.01,
	}
	this.body = Bodies.rectangle(x,y,w,h,options); // setting box parameters
	this.w = w;
	this.h = h;
	World.add(world, this.body); // adding body object to the world

	this.show = function () {
		var pos = this.body.position;
		var angle = this.body.angle;

		push();
		translate(pos.x,pos.y); 
		rotate(angle); // enabling rotation of the object
		rectMode(CENTER); // centers the object at the location of the user's click

		strokeWeight(1);
		stroke(255);
		fill(53,79,95);
		rect(0,0,this.w,this.h); // lines 22–23 set visual characteristics of the box object
		pop();

	}
}