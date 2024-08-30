var scene, camera, renderer, mesh;
var meshFloor;
var meshBorder1, meshBorder2, meshBorder3, meshBorder4;
var blockUpdated = false;

var keyboard = {};
var player = { height:1.8, speed:0.2, turnSpeed:Math.PI*0.02 };

var meshArray = [];
var	suspicious = [];
var suspicious_y = [];

var jumped = false;
var coolDown = 0;
var notK;
var jumped_vel_y = 1.57;
var current_vel_y = 0;
var gravity = 0.1;
var maxy = 0;

var currentSuspicious = [];


function init(){
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(90, 1280/720, 0.1, 1000);
	mesh = new THREE.Mesh(
		new THREE.BoxGeometry(1, 1, 1),
		new THREE.MeshPhongMaterial({color:0xffffff, wireframe: false})
	);

	scene.add(mesh);

	meshBorder1 = new THREE.Mesh(
		new THREE.PlaneGeometry(100, 15, 1),
		new THREE.MeshPhongMaterial({color:0xff0000, wireframe: false})
	);

	meshBorder1.position.y += 7;
	meshBorder1.position.z = 50;
	meshBorder1.rotation.y += Math.PI;

	scene.add(meshBorder1)

	meshBorder2 = new THREE.Mesh(
		new THREE.PlaneGeometry(100, 15, 1),
		new THREE.MeshPhongMaterial({color:0xff0000, wireframe: false})
	);

	meshBorder2.position.y += 7;
	meshBorder2.position.z = -50;

	scene.add(meshBorder2)

	meshBorder3 = new THREE.Mesh(
		new THREE.PlaneGeometry(100, 15, 1),
		new THREE.MeshPhongMaterial({color:0xff0000, wireframe: false})
	);

	meshBorder3.position.y += 7;
	meshBorder3.position.x = 50;
	meshBorder3.rotation.y -= Math.PI / 2;

	scene.add(meshBorder3)

	meshBorder4 = new THREE.Mesh(
		new THREE.PlaneGeometry(100, 15, 1),
		new THREE.MeshPhongMaterial({color:0xff0000, wireframe: false})
	);

	meshBorder4.position.y += 7;
	meshBorder4.position.x = -50;
	meshBorder4.rotation.y += Math.PI / 2;

	scene.add(meshBorder4)


	meshFloor = new THREE.Mesh(
		new THREE.PlaneGeometry(100, 100, 10, 10),
		new THREE.MeshPhongMaterial({color:0xffffff, wireframe: false})
	);

	mesh.position.y += 1;
	mesh.receiveShadow = true;
	mesh.castShadow = true;
	meshFloor.rotation.x -= Math.PI / 2;
	meshFloor.receiveShadow = true;
	scene.add(meshFloor);

	ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
	scene.add(ambientLight);

	light = new THREE.PointLight(0xffffff, 0.8, 10);
	light.position.set(-3, 6, -3);
	light.castShadow = true;
	light.shadow.camera.near = 0.1;
	light.shadow.camera.far = 25;
	scene.add(light);

	camera.position.set(0, player.height, -5);
	camera.lookAt(new THREE.Vector3(0, player.height, 0));

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(1280, 720);

	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.BasicShadowMap;
	document.body.appendChild(renderer.domElement);
	animate();
}

function createBox(x, y, z){
		meshUser = new THREE.Mesh(
		new THREE.BoxGeometry(1, 1, 1),
		new THREE.MeshPhongMaterial({color:0x0000ff, wireframe: false})
	);

	meshUser.position.set(x, y, z);
	meshArray.push(meshUser);
	scene.add(meshUser);
	blockUpdated = true;

	currentSuspicious.push(meshUser);
}


function checkJump(){
	if(true){
		//change y suspicious
		suspicious_y = [];
		maxy = 0;
		for(i = 0; i < meshArray.length; i++){
			if(current_vel_y < 0){
				//check for bottom
				//check correct x-z coordinates
				if(camera.position.x > meshArray[i].position.x - 0.5 && camera.position.x < meshArray[i].position.x + 0.5 && camera.position.z > meshArray[i].position.z - 0.5 && camera.position.z < meshArray[i].position.z + 0.5 && meshArray[i].position.y < camera.position.y){
					suspicious_y.push(meshArray[i]);
				}

				//add player height with bottom y of a block

			}
		}

	}
}

function grav(){
	if(current_vel_y !== 0.00000000){
	//	console.log("k");
		////jumped = true;
		if(camera.position.y + current_vel_y < player.height){
			camera.position.y = player.height ;
			current_vel_y = 0;
			jumped = false;
			console.log(maxy);
			//console.log("IIII")
		}else{
			//console.log("iii")
			checkJump();
			/*allBelow = []
			for(i = 0; i < suspicious_y.length; i++){
				if(camera.position.y + current_vel_y < player.height + suspicious_y[i].position.y && suspicious_y[i].position.y < camera.position.y  && camera.position.y + current_vel_y > 0){
					allBelow.push(suspicious_y[i]);
				}
			}*/

		//var max = 0;

		for (var i = 0; i < suspicious_y.length; i++) {
			curr = suspicious_y[i].position.y;

			if(curr + 1 > maxy){
				maxy = curr + 1;
				console.log(maxy);
			}
		}

		console.log(maxy)

		if (maxy > 0){

			if(camera.position.y - player.height  < maxy ){
			camera.position.y = maxy + player.height;
			jumped = false;
			current_vel_y = 0;
			console.log(maxy + " done");
		}else{
		//	console.log("Problem Found " + maxy);
			camera.position.y += current_vel_y;
			current_vel_y -= gravity;
		}
	}else{

		camera.position.y += current_vel_y;
		current_vel_y -= gravity;
		//console.log(max);
	
		}

	}
	}else{
		
		//console.log("i")

		//check if any block beneath
		checkJump();

			for (var i = 0; i < suspicious_y.length; i++) {
			curr = suspicious_y[i].position.y;

			if(curr + 1 > maxy){
				maxy = curr + 1;
				console.log(maxy);
			}
		}

			if(camera.position.y > maxy + player.height){
				current_vel_y -= gravity;
			}else{
				jumped = false;
			}
	}
}

function animate(){
	requestAnimationFrame(animate);


	grav();

	coolDown -= 1;

	mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;

	// Keyboard movement inputs
	if(keyboard[87]){ // W key
		//camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
		//camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;

		moveForwards(camera.position.x - Math.sin(camera.rotation.y) * player.speed, camera.position.z - -Math.cos(camera.rotation.y) * player.speed);
	}
	if(keyboard[83]){ // S key
		//camera.position.x += Math.sin(camera.rotation.y) * player.speed;
		//camera.position.z += -Math.cos(camera.rotation.y) * player.speed;

		moveForwards(camera.position.x + Math.sin(camera.rotation.y) * player.speed, camera.position.z + -Math.cos(camera.rotation.y) * player.speed);
	}
	if(keyboard[65]){ // A key
		// Redirect motion by 90 degrees
		//camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * player.speed;
		//camera.position.z += -Math.cos(camera.rotation.y + Math.PI/2) * player.speed;

		moveForwards(camera.position.x + Math.sin(camera.rotation.y + Math.PI/2) * player.speed, camera.position.z + -Math.cos(camera.rotation.y + Math.PI/2) * player.speed);
	}
	if(keyboard[68]){ // D key
		//camera.position.x += Math.sin(camera.rotation.y - Math.PI/2) * player.speed;
		//camera.position.z += -Math.cos(camera.rotation.y - Math.PI/2) * player.speed;

		moveForwards(camera.position.x + Math.sin(camera.rotation.y - Math.PI/2) * player.speed, camera.position.z + -Math.cos(camera.rotation.y - Math.PI/2) * player.speed);
	}

	if(keyboard[37]){  // left arrow key
		camera.rotation.y -= player.turnSpeed;
	}

	if(keyboard[38]){  // top arrow key
		camera.rotation.x -= player.turnSpeed;
	}

	if(keyboard[39]){  // right arrow key
		camera.rotation.y += player.turnSpeed;
	}

	if(keyboard[40]){  // down arrow key
		camera.rotation.x += player.turnSpeed;
	}




	renderer.render(scene, camera);
}

function jump(){
	if(current_vel_y == 0){
		//suspicious y is for checking collision in y axis

		current_vel_y = jumped_vel_y;
		jumped = true;
	}
}

function moveForwards(a, b){
	//check walls

	if( a > 50 || a < -50 || b > 50 || b < -50 ){

	}else{

		//now check for user created meshes
		if(blockUpdated){

			if(current_vel_y != 0){
		for (var i = 0; i < meshArray.length; i++) {
			//check y
			suspicious = []
			if(camera.position.y <= meshArray[i].position.y + player.height && camera.position.y >= meshArray[i].position.y){
				suspicious.push(meshArray[i]);
				//console.log(suspicious);
			}

		}

		//jumped = false;
		}else{
			for (var i = 0; i < currentSuspicious.length; i++) {
			//check y
			if(camera.position.y <= currentSuspicious[i].position.y + player.height && camera.position.y >= currentSuspicious[i].position.y){
				suspicious.push(currentSuspicious[i]);
			//	console.log(suspicious);
				currentSuspicious = [];
			}

		}

		}

		blockUpdated = false;
	}

	//collision b/w suspicious x and z and user
	notK = true;
	for (var i = 0; i < suspicious.length; i++) {
		if( a > suspicious[i].position.x - 0.5 && a < suspicious[i].position.x + 0.5 && b > suspicious[i].position.z - 0.5 && b < suspicious[i].position.z + 0.5 ){
			notK = false;
			//console.log(notK)
		}
	}

	if(notK){
		camera.position.x = a;
		camera.position.z = b;
		//console.log(suspicious);
		//maxy = 1;
		grav();
	}
	}
}

function keyDown(event){
	keyboard[event.keyCode] = true;
	if(event.keyCode == 80){ //p

		if(coolDown < 1){
		createBox(camera.position.x - Math.sin(camera.rotation.y) * player.speed * 3, camera.position.y - player.height + 1, camera.position.z - -Math.cos(camera.rotation.y) * player.speed * 3 );
		coolDown = 10;
	}
	}


	if(event.keyCode == 32){
		jump();
		grav();
	}
}

function keyUp(event){
	keyboard[event.keyCode] = false;
}

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

window.onload = init;

