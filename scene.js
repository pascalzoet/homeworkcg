let scene, camera, renderer, loader;

init();
createHouse({height: 100, width: 100, depth: 100},  {x: 0, y: 50, z: 1300});

createTree({x: 200, z: 100});
createTree({x: -400, z: 600});
createTree({x: 350, z: 200});

function init() {
   // Create scene
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(25, window.innerWidth/window.innerHeight, 45, 30000);
  camera.position.set(0, 1000, 5000);

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  // import camera control and rotation library
   controls = new THREE.OrbitControls(camera, renderer.domElement);
   controls.maxPolarAngle = 1.5;
   controls.minDistance = 500;
   controls.maxDistance = 2000;
   controls.screenSpacePanning = false;

  loader = new THREE.TextureLoader();


   var directions = ["posx.jpg", "negx.jpg", "posy.jpg", "negy.jpg", "posz.jpg", "negz.jpg"];
   var materialArray = [];
   for (var i = 0; i < 6; i++) {
      materialArray.push(
         new THREE.MeshBasicMaterial({
            map: loader.load("skybox2/" + directions[i]),
            side: THREE.BackSide
         })
      );
   }

   var skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
   var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
   var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
   scene.add(skyBox);

   var groundTexture = loader.load( 'materials/grass.jpg' );
   groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
   groundTexture.repeat.set( 25, 25 );
   groundTexture.anisotropy = 16;
   groundTexture.encoding = THREE.sRGBEncoding;

   var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );

   var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 5000, 5000 ), groundMaterial );
   mesh.position.y = 0;
   mesh.rotation.x = - Math.PI / 2;
   scene.add( mesh );

   var ambient = new THREE.AmbientLight(0x404040);
   scene.add(ambient);

   var light = new THREE.DirectionalLight(0xffffff, 1.5);
   light.position.set(0, 100, 0);
   scene.add(light);
}

function createCube(dimension, position = {x: 0, y: 0, z: 0}, material =  new THREE.MeshNormalMaterial()) {
   var geometry = new THREE.CubeGeometry(dimension.height, dimension.width, dimension.depth);
   var cube = new THREE.Mesh(geometry, material);
   cube.position.set(position.x, position.y, position.z);
   scene.add(cube);
   return cube;
}

function createPyramid(dimension = {height: 4, width: 5}, position = {x: 0, y: 0, z: 0}, material =  new THREE.MeshNormalMaterial()) {
   var geometry = new THREE.CylinderGeometry(0, dimension.height, dimension.width, 4, 0)
   var pyramid = new THREE.Mesh(geometry, material);
   pyramid.position.set(position.x, position.y, position.z);
   pyramid.rotation.y = 5.5;
   scene.add(pyramid);
   return pyramid;
}

function createHouse(dimension = {height, width, depth}, position = {x: 0, y: 0, z: 0}) {
   var texture_wall = loader.load( 'materials/brick_wall.jpg' );
   var material_wall = new THREE.MeshBasicMaterial( { map: texture_wall } );

   var texture_door = loader.load( 'materials/door2.jpg' );
   var material_door = new THREE.MeshBasicMaterial( { map: texture_door } );

   // Create an array of materials to be used in a cube, one for each side
   var cubeMaterialArray = [];

   // order to add materials: x+,x-,y+,y-,z+,z-
   for (let index = 0; index < 6; index++) {
      if(index == 4) {
         cubeMaterialArray.push( material_door );
      } else {
         cubeMaterialArray.push( material_wall );
      }
   }

   var cubeMaterials = new THREE.MeshFaceMaterial( cubeMaterialArray );

   cube = createCube({width: dimension.width, height: dimension.height, depth: dimension.depth}, {x: position.x, y: position.y, z: position.z}, cubeMaterials);

   var texture_roof = loader.load( 'materials/roof.jpg' );
   texture_roof.repeat.set( 2, 1 );
   var material_roof = new THREE.MeshBasicMaterial( { map: texture_roof } );
   createPyramid({width: dimension.width - 2, height: dimension.height * 0.71},{x: position.x, y: position.y + (dimension.height - 1), z:  position.z}, material_roof);
}

function createTree(position = {x: 0, z: 0}) {
   var material_tree = new THREE.MeshBasicMaterial({color: 0x00ff00});
   if (Math.random() >= 0.5) {
      createPyramid({height: randomInt(20, 100), width: 300}, {x: position.x, y: 190, z:position.z}, material_tree);
   } else {
      var randNumb = randomInt(10, 70);
      createCube({height: randNumb, width: randNumb, depth: randNumb}, {x: position.x, y: 50, z:position.z}, material_tree)
   }

   var texture_bark = loader.load('materials/bark.jpg');
   var material_bark = new THREE.MeshBasicMaterial({map: texture_bark});
   createCube({height: 10, width: 50, depth: 10}, {x: position.x, y: 20, z:position.z}, material_bark);
}

function randomInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1) ) + min;
 }

var render = function () {
   requestAnimationFrame(render);
   controls.update();
   renderer.render(scene, camera);
};

render();