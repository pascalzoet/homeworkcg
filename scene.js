// Create scene
var scene = new THREE.Scene();

// Create camera
var camera = new THREE.PerspectiveCamera(
	75, // fov — Camera frustum vertical field of view.
	window.innerWidth/window.innerHeight, // aspect — Camera frustum aspect ratio.
	0.1, // near — Camera frustum near plane.
	5000); // far — Camera frustum far plane. 

// Create renderer
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


var geometry = new THREE.BoxGeometry(1,1,1);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var directions  = ["posx.jpg", "negx.jpg", "posy.jpg", "negy.jpg", "posz.jpg", "negz.jpg"];
var materialArray = [];
for (var i = 0; i < 6; i++)
{
   materialArray.push(
      new THREE.MeshBasicMaterial({
         map: THREE.ImageUtils.loadTexture( "skybox/"+directions[i]),
         side: THREE.BackSide})
   );
}
	
var skyGeometry = new THREE.CubeGeometry( 5000, 5000, 5000 );	
var skyMaterial = new THREE.MeshFaceMaterial( materialArray );
var skyBox = new THREE.Mesh( skyGeometry, skyMaterial );
scene.add( skyBox );

var ambient = new THREE.AmbientLight( 0x404040 );
scene.add( ambient );

var light = new THREE.DirectionalLight( 0xffffff, 1.5 );
light.position.set(0, 0, 1 );
scene.add( light );

// move camera from center
camera.position.x = 2; //move right from center of scene
camera.position.y = 1; //move up from center of scene
camera.position.z = 5; //move camera away from center of scene

// import camera control and rotation library
controls = new THREE.OrbitControls( camera ); 
controls.autoRotate = false;
controls.noKeys = true;

var render = function () {
   requestAnimationFrame(render);

   controls.update();
   renderer.render(scene, camera);
};

render();