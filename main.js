const Vector3 = gr.lib.math.Vector3;
const Quaternion = gr.lib.math.Quaternion;
console.log(Vector3);
gr(function(){
	var $$ = gr("#main");

	var world = new CANNON.World();

	var lastGravityVector = [[0], [-9.82], [0], [1]];
	world.gravity.set(lastGravityVector[0][0], lastGravityVector[1][0], lastGravityVector[2][0]);

	var planes = [];
	for(let i = 0; i < 6; i++){
		planes[i] = new CANNON.Body({
		    mass: 0, // mass == 0 makes the body static
		});
		var planeShape = new CANNON.Plane();
		planes[i].addShape(planeShape);
	}
	planes.forEach(function(v, i){
		switch(i){
			case 0:
				v.position = new CANNON.Vec3(5, 0, 0);
				v.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2);
				break;
			case 1:
				v.position = new CANNON.Vec3(-5, 0, 0);
				v.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2);
				break;
			case 2:
				v.position = new CANNON.Vec3(0, 5, 0);
				v.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
				break;
			case 3:
				v.position = new CANNON.Vec3(0, -5, 0);
				v.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
				break;
			case 4:
				v.position = new CANNON.Vec3(0, 0, 5);
				v.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI);
				break;
			case 5:
				v.position = new CANNON.Vec3(0, 0, -5);
				break;
		}
		world.addBody(v);
	});

	var balls = [];
	for(let i = 0; i < 3; i++){
		var radius = 1;
		balls[i] = new CANNON.Body({
		   mass: 1.2,
		   position: new CANNON.Vec3(0, 0, 0),
		   shape: new CANNON.Sphere(radius),
		});
		switch(i){
			case 0:
				balls[i].position = new CANNON.Vec3(3, 0, 0);
				break;
			case 1:
				balls[i].position = new CANNON.Vec3(0, 3, 0);
				break;
			case 2:
				balls[i].position = new CANNON.Vec3(0, 0, 3);
				break;
		}
		world.addBody(balls[i]);
	}

	var fixedTimeStep = 1.0 / 60.0; // seconds
	var maxSubSteps = 3;

	var lastTime;
	var lastCameraEularAngles;
	physics();

	function physics(time){
		if(lastTime !== undefined){
			var dt = (time - lastTime) / 1000;
			world.step(fixedTimeStep, dt, maxSubSteps);
		}
		balls.forEach(function(v, i){
			gr("#main")("#sphere" + i).setAttribute("position", v.position.x + "," + v.position.y + "," + v.position.z);
		});
		lastTime = time;

		// console.log(gr("#main")("#camera").getAttribute("rotation").eularAngles.rawElements);
		var camera = gr("#main")("#camera").get(0);
		var t =camera.getComponent("Transform");
		var d = t.up.negateThis().multiplyWith(9.82);
		// cameraEularAngles[1] += 0.5 * Math.PI;
		if(d){

			// console.log(lastCameraEularAngles);
			// debugger;

			// =========== Eular angles ===========
			// var angleMatrix = [
			// 	[Math.cos(cameraEularAngles[0]) * Math.cos(cameraEularAngles[1]) * Math.cos(cameraEularAngles[2]) - Math.sin(cameraEularAngles[0]) * Math.sin(cameraEularAngles[2]), -Math.cos(cameraEularAngles[0]) * Math.cos(cameraEularAngles[1]) * Math.sin(cameraEularAngles[2]) - Math.sin(cameraEularAngles[0]) * Math.cos(cameraEularAngles[2]), Math.cos(cameraEularAngles[0]) * Math.sin(cameraEularAngles[1]), 0],
			// 	[Math.sin(cameraEularAngles[0]) * Math.cos(cameraEularAngles[1]) * Math.cos(cameraEularAngles[2]) + Math.cos(cameraEularAngles[0]) * Math.sin(cameraEularAngles[2]), -Math.sin(cameraEularAngles[0]) * Math.cos(cameraEularAngles[1]) * Math.sin(cameraEularAngles[2]) + Math.cos(cameraEularAngles[0]) * Math.cos(cameraEularAngles[2]), Math.sin(cameraEularAngles[0]) * Math.sin(cameraEularAngles[1]), 0],
			// 	[-Math.sin(cameraEularAngles[1]) * Math.cos(cameraEularAngles[2]), Math.sin(cameraEularAngles[1]) * Math.sin(cameraEularAngles[2]), Math.cos(cameraEularAngles[1]), 0],
			// 	[0, 0, 0, 1]];

			// x ↔ y
			// var angleMatrix = [
			// 	[Math.cos(cameraEularAngles[1]) * Math.cos(cameraEularAngles[0]) * Math.cos(cameraEularAngles[2]) - Math.sin(cameraEularAngles[1]) * Math.sin(cameraEularAngles[2]), -Math.cos(cameraEularAngles[1]) * Math.cos(cameraEularAngles[0]) * Math.sin(cameraEularAngles[2]) - Math.sin(cameraEularAngles[1]) * Math.cos(cameraEularAngles[2]), Math.cos(cameraEularAngles[1]) * Math.sin(cameraEularAngles[0]), 0],
			// 	[Math.sin(cameraEularAngles[1]) * Math.cos(cameraEularAngles[0]) * Math.cos(cameraEularAngles[2]) + Math.cos(cameraEularAngles[1]) * Math.sin(cameraEularAngles[2]), -Math.sin(cameraEularAngles[1]) * Math.cos(cameraEularAngles[0]) * Math.sin(cameraEularAngles[2]) + Math.cos(cameraEularAngles[1]) * Math.cos(cameraEularAngles[2]), Math.sin(cameraEularAngles[1]) * Math.sin(cameraEularAngles[0]), 0],
			// 	[-Math.sin(cameraEularAngles[0]) * Math.cos(cameraEularAngles[2]), Math.sin(cameraEularAngles[0]) * Math.sin(cameraEularAngles[2]), Math.cos(cameraEularAngles[0]), 0],
			// 	[0, 0, 0, 1]];


			// =========== RollPitchYoe ===========
			// var angleMatrix = [
			// 	[Math.cos(cameraEularAngles[2]) * Math.cos(cameraEularAngles[0]), Math.cos(cameraEularAngles[2]) * Math.sin(cameraEularAngles[0]) * Math.sin(cameraEularAngles[1]) - Math.sin(cameraEularAngles[2]) * Math.cos(cameraEularAngles[1]), Math.cos(cameraEularAngles[2]) * Math.sin(cameraEularAngles[0]) * Math.cos(cameraEularAngles[1]) + Math.sin(cameraEularAngles[2]) * Math.sin(cameraEularAngles[1]), 0],
			// 	[Math.sin(cameraEularAngles[2]) * Math.cos(cameraEularAngles[0]), Math.sin(cameraEularAngles[2]) * Math.sin(cameraEularAngles[0]) * Math.sin(cameraEularAngles[1]) + Math.cos(cameraEularAngles[2]) * Math.cos(cameraEularAngles[1]), Math.sin(cameraEularAngles[2]) * Math.sin(cameraEularAngles[0]) * Math.cos(cameraEularAngles[1]) - Math.cos(cameraEularAngles[2]) * Math.sin(cameraEularAngles[1]), 0],
			// 	[-Math.sin(cameraEularAngles[0]), Math.cos(cameraEularAngles[0]) * Math.sin(cameraEularAngles[1]), Math.cos(cameraEularAngles[0]) * Math.cos(cameraEularAngles[1]), 0],
			// 	[0, 0, 0, 1]];

			// x ↔ y
			// var angleMatrix = [
			// 	[Math.cos(cameraEularAngles[2]) * Math.cos(cameraEularAngles[1]), Math.cos(cameraEularAngles[2]) * Math.sin(cameraEularAngles[1]) * Math.sin(cameraEularAngles[0]) - Math.sin(cameraEularAngles[2]) * Math.cos(cameraEularAngles[0]), Math.cos(cameraEularAngles[2]) * Math.sin(cameraEularAngles[1]) * Math.cos(cameraEularAngles[0]) + Math.sin(cameraEularAngles[2]) * Math.sin(cameraEularAngles[0]), 0],
			// 	[Math.sin(cameraEularAngles[2]) * Math.cos(cameraEularAngles[1]), Math.sin(cameraEularAngles[2]) * Math.sin(cameraEularAngles[1]) * Math.sin(cameraEularAngles[0]) + Math.cos(cameraEularAngles[2]) * Math.cos(cameraEularAngles[0]), Math.sin(cameraEularAngles[2]) * Math.sin(cameraEularAngles[1]) * Math.cos(cameraEularAngles[0]) - Math.cos(cameraEularAngles[2]) * Math.sin(cameraEularAngles[0]), 0],
			// 	[-Math.sin(cameraEularAngles[1]), Math.cos(cameraEularAngles[1]) * Math.sin(cameraEularAngles[0]), Math.cos(cameraEularAngles[1]) * Math.cos(cameraEularAngles[0]), 0],
		// 	// 	[0, 0, 0, 1]];

		// 	var gravityVector = matrixMultiplication(angleMatrix, lastGravityVector);
		// 	gravityVector.forEach(function(v, i){
		// 		v.forEach(function(w, j){
		// 			switch(j){
		// 				case 0:
		// 					w *= 1;
		// 					break;
		// 				case 1:
		// 					w *= 1;
		// 					break;
		// 				case 2:
		// 					w *= 1;
		// 					break;
		// 				case 3:
		// 					break;
		// 			}
		// 		})
		// 	});

		// 	// console.log(gravityVector[0][0], gravityVector[1][0], gravityVector[2][0]);
			world.gravity.set(d.X,d.Y,d.Z);
		// 	gr("#main")("#gravityDisplay").setAttribute("position", gravityVector[0][0] / 9.82 + "," + gravityVector[1][0] / 9.82 + "," + gravityVector[2][0] / 9.82);

		// 	lastGravityVector = gravityVector;
		// 	lastCameraEularAngles = cameraEularAngles;
		// }else{
		// 	console.log("おやすみ！");
		// 	lastCameraEularAngles = cameraEularAngles;
		// }
	}
		requestAnimationFrame(physics);
	}
});
