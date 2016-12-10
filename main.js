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

const cubeSize = 5;
const e = 0.5;
var gravity = [0, -9.8, 0];
var balls = [];

physics();

function physics(){
	// physics
	balls.forEach(function(v, i){
		if(v.dent){ return; }
		if(v.coordinate[0] < -(cubeSize - v.radius)){ v.verocity[0] *= -1 * e; v.dent = true; }
		if(v.coordinate[0] > (cubeSize - v.radius)){ v.verocity[0] *= -1 * e; v.dent = true; }
		if(v.coordinate[1] < -(cubeSize - v.radius)){ v.verocity[1] *= -1 * e; v.dent = true; }
		if(v.coordinate[1] > (cubeSize - v.radius)){ v.verocity[1] *= -1 * e; v.dent = true; }
		if(v.coordinate[2] < -(cubeSize - v.radius)){ v.verocity[2] *= -1 * e; v.dent = true; }
		if(v.coordinate[2] > (cubeSize - v.radius)){ v.verocity[2] *= -1 * e; v.dent = true; }
		if(v.coordinate[0] > -(cubeSize - v.radius) && v.coordinate[0] < (cubeSize - v.radius) && v.coordinate[1] > -(cubeSize - v.radius) && v.coordinate[1] < (cubeSize - v.radius) && v.coordinate[2] > -(cubeSize - v.radius) && v.coordinate[2] < (cubeSize - v.radius)){ v.dent = false; }
	});
	balls.forEach(function(v, i){
		if(v.coordinate[1] >= -(cubeSize - v.radius)){
			v.verocity = vectorVectorAddition(v.verocity, vectorScalarDivision(gravity, 1000));
		}
		console.log(v.verocity, v.coordinate);
		v.update();
		gr("#main")("#sphere" + i).setAttribute("position", v.coordinate[0] + "," + v.coordinate[1] + "," + v.coordinate[2]);
	});

	requestAnimationFrame(physics);
}

class Ball{
	constructor(){
		// [x, y, z]
		this.coordinate = [0, 0, 0];
		this.verocity = [0, 0, 0];
		this.mass = 1;
		this.e = 1;
		this.radius = 1;
		this.dent = false;
	}
	update(){
		this.coordinate = vectorVectorAddition(this.coordinate, this.verocity);
	}
}

function ballCollision(ball1, ball2){	// bal1, bal2: Instance
	ball1.verocity = vectorScalarDivision(vectorVectorAddition(scalarVectorMultiplication(ball1.mass, ball1.verocity), vectorVectorAddition(scalarVectorMultiplication(ball2.mass, ball2.verocity), scalarVectorMultiplication(ball2.mass * e, vectorVectorSubtracion(ball1.verocity, ball2.verocity)))), ball1.mass + ball2.mass);
	ball2.verocity = vectorScalarDivision(vectorVectorAddition(scalarVectorMultiplication(ball1.mass, ball1.verocity), vectorVectorAddition(scalarVectorMultiplication(ball2.mass, ball2.verocity), scalarVectorMultiplication(ball2.mass * e, vectorVectorSubtracion(ball1.verocity, ball2.verocity)))), ball1.mass + ball2.mass);
}

function scalarVectorMultiplication(scalar, vector){
	var result = [];
	vector.forEach(function(v, i){
		result[i] = scalar * v;
	});
	return result;
}

function vectorScalarDivision(vector, scalar){
	var result = [];
	vector.forEach(function(v, i){
		result[i] = v / scalar;
	});
	return result;
}

function vectorVectorAddition(vector1, vector2){
	var result = [];
	if(vector1.length !== vector2.length){ return null; }
	vector1.forEach(function(v, i){
		result[i] = v + vector2[i];
	});
	return result;
}

function vectorVectorSubtracion(vector1, vector2){
	var result = [];
	if(vector1.length !== vector2.length){ return null; }
	vector1.forEach(function(v, i){
		result[i] = v - vector2[i];
	});
	return result;
}

function vectorMagnitude(vector){
	var result = 0;
	var sum = 0;
	vector.forEach(function(v, i){

	})
}