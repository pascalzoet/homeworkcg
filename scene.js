var scene, camera, renderer;

init();

// createCube({width: 5, height: 5, depth: 5}, {x: 0, y: 1, z: 0});
// createPyramid({x: 10, y:10, z: 10});

createHouse({height: 100, width: 100, depth: 100},  {x: -50, y: -200, z: -100});
createHouse({height: 50, width: 50, depth: 50},  {x: 100, y: -200, z: -100});


function init() {
   // Create scene
   scene = new THREE.Scene();

   // Create camera
   camera = new THREE.PerspectiveCamera(
      75, // fov — Camera frustum vertical field of view.
      window.innerWidth / window.innerHeight, // aspect — Camera frustum aspect ratio.
      0.1, // near — Camera frustum near plane.
      5000); // far — Camera frustum far plane. 

   // Create renderer
   renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
   });

   renderer.setSize(window.innerWidth, window.innerHeight);
   document.body.appendChild(renderer.domElement);

   var directions = ["posx.jpg", "negx.jpg", "posy.jpg", "negy.jpg", "posz.jpg", "negz.jpg"];
   var materialArray = [];
   for (var i = 0; i < 6; i++) {
      materialArray.push(
         new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture("skybox/" + directions[i]),
            side: THREE.BackSide
         })
      );
   }

   var skyGeometry = new THREE.CubeGeometry(5000, 5000, 5000);
   var skyMaterial = new THREE.MeshFaceMaterial(materialArray);
   var skyBox = new THREE.Mesh(skyGeometry, skyMaterial);
   scene.add(skyBox);

   var ambient = new THREE.AmbientLight(0x404040);
   scene.add(ambient);

   var light = new THREE.DirectionalLight(0xffffff, 1.5);
   light.position.set(0, 0, 1);
   scene.add(light);

   // move camera from center
   camera.position.x = 0; //move right from center of scene
   camera.position.y = 50; //move up from center of scene
   camera.position.z = 10; //move camera away from center of scene
}

function createCube(dimension, position = {x: 0, y: 0, z: 0}, material =  new THREE.MeshNormalMaterial()) {
   var geometry = new THREE.CubeGeometry(dimension.height, dimension.width, dimension.depth);
   var cube = new THREE.Mesh(geometry, material);
   cube.position.set(position.x, position.z, position.y);
   scene.add(cube);
   return cube;
}

function createPyramid(dimension = {height: 4, width: 5}, position = {x: 0, y: 0, z: 0}, material =  new THREE.MeshNormalMaterial()) {
   var geometry = new THREE.CylinderGeometry(0, dimension.height, dimension.width, 4, 0)
   var pyramid = new THREE.Mesh(geometry, material);
   pyramid.position.set(position.x, position.z , position.y);
   pyramid.rotation.y = 5.5;
   scene.add(pyramid);
   return pyramid;
}

function createHouse(dimension = {height, width, depth}, position = {x: 0, y: 0, z: 0}) {
   var texture_wall = new THREE.TextureLoader().load( 'materials/brick_wall.jpg' );
   var material_wall = new THREE.MeshBasicMaterial( { map: texture_wall } );

   var texture_door = new THREE.TextureLoader().load( 'materials/door2.jpg' );
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
   createPyramid({width: dimension.width - 2, height: dimension.height * 0.71},{x: position.x, y: position.y, z:  position.z + (dimension.height - 1)});
}

var render = function () {
   requestAnimationFrame(render);
   controls.update();
   renderer.render(scene, camera);
};

// import camera control and rotation library
controls = new THREE.OrbitControls(camera);
controls.autoRotate = false;
controls.noKeys = true;


render();