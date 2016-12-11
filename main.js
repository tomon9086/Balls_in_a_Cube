gr(function(){
	var $$ = gr("#main");
	for(let i = 0; i < 3; i++){
		balls[i] = new Ball();
	}
	// coordinate initialize
	balls.forEach(function(v, i){
		v.coordinate[i] = 3;
	});
});


physics();

function physics(){
	

	requestAnimationFrame(physics);
}

class Ball{
	constructor(){
		// [x, y, z]
		this.coordinate = [0, 0, 0];
		this.velocity = [0, 0, 0];
		this.mass = 1;
		this.e = 1;
		this.radius = 1;
		this.dent = false;
		this.noDent = true;
	}
	update(){
		this.coordinate = vectorVectorAddition(this.coordinate, this.velocity);
	}
}