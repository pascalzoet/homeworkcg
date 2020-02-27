let scene, camera, renderer, loader;
var fixed_y = 0;
init();

//createTree({ x: 200, z: 100 });
//createTree({ x: -400, z: 600 });
//createTree({ x: 350, z: 200 });
initStreet();
function init() {
   // Create scene
   scene = new THREE.Scene();
   renderer = new THREE.WebGLRenderer({ antialias: true });
   renderer.setPixelRatio(window.devicePixelRatio);
   renderer.setSize(window.innerWidth, window.innerHeight);
   renderer.shadowMap.enabled = true;
   document.body.appendChild(renderer.domElement);

   camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 45, 30000);
   camera.position.set(0, 0, 5000);

   // import camera control and rotation library
   controls = new THREE.OrbitControls(camera, renderer.domElement);
   controls.maxPolarAngle = 1.5;
   controls.minDistance = 100;
   controls.maxDistance = 2000;
   controls.screenSpacePanning = false;
   controls.target.set(200, -50, 700);

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

   var groundTexture = loader.load('materials/grass.jpg');
   groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
   groundTexture.repeat.set(25, 25);
   groundTexture.anisotropy = 16;
   groundTexture.encoding = THREE.sRGBEncoding;

   var groundMaterial = new THREE.MeshLambertMaterial({ map: groundTexture });

   var mesh = new THREE.Mesh(new THREE.PlaneBufferGeometry(5000, 5000), groundMaterial);
   mesh.position.y = 0;
   mesh.rotation.x = - Math.PI / 2;
   scene.add(mesh);

   var ambient = new THREE.AmbientLight(0x404040);
   scene.add(ambient);

   var light = new THREE.DirectionalLight(0xffffff, 1.5);
   light.position.set(0, 100, 0);
   scene.add(light);
}


var render = function () {
   requestAnimationFrame(render);
   controls.update();
   renderer.render(scene, camera);
};

render();