var lamppost_poleTexture = new THREE.TextureLoader().load('materials/lamppost_pole.jpg');
var lamppost_lightTexture = new THREE.TextureLoader().load('materials/lamppost_light.jpg');
function createLamppost(dimension, position) {

    var geometry = new THREE.CylinderGeometry(dimension.radius, dimension.radius, dimension.height, 32);
    var material = new THREE.MeshBasicMaterial({ map: lamppost_poleTexture });

    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(position.x, position.y, position.z);
    scene.add(cylinder);
    createCilinder(dimension, position.x, cylinder.position.y + (dimension.height / 2), position.z);
}

function createCilinder(dimension, x, y, z) {
    var geometry = new THREE.CylinderGeometry(dimension.radius * 2, dimension.radius, dimension.height / 4, 42);
    var material = new THREE.MeshBasicMaterial({ map: lamppost_lightTexture });

    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(x, y, z);
    scene.add(cylinder);
    var topHead = new THREE.CylinderGeometry(dimension.radius, dimension.radius * 2.5, dimension.height / 10, 42);
    var material = new THREE.MeshBasicMaterial({ map: lamppost_poleTexture });

    var top = new THREE.Mesh(topHead, material);
    top.position.set(x, cylinder.position.y + dimension.height / 6, z);
    scene.add(top);

    lighting(top.position)

}

function lighting(position) {
    var spotLight = new THREE.SpotLight(0xFFA500);
    spotLight.position.set(position.x, position.y, position.z);
    spotLight.intensity = 0.2;
    scene.add(spotLight);
}