function createLamppost(dimension, position) {

    var geometry = new THREE.CylinderGeometry(dimension.radius, dimension.radius, dimension.height, 32);
    var material = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('materials/lamppost_pole.jpg') });

    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(position.x, position.y, position.z);
    scene.add(cylinder);
    createCilinder(dimension, position.x, cylinder.position.y + (dimension.height / 2), position.z);
}

function createCilinder(dimension, x, y, z) {
    var geometry = new THREE.CylinderGeometry(dimension.radius * 2, dimension.radius, dimension.height / 4, 42);
    var material = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('materials/lamppost_light.jpg') });

    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(x, y, z);
    scene.add(cylinder);
    var topHead = new THREE.CylinderGeometry(dimension.radius, dimension.radius * 2.5, dimension.height / 10, 42);
    var material = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('materials/lamppost_pole.jpg') });

    var top = new THREE.Mesh(topHead, material);
    top.position.set(x, cylinder.position.y + dimension.height / 6, z);
    scene.add(top);

    lighting(top.position)

}

function lighting(position) {
    var spotLight = new THREE.SpotLight(0xFFA500);
    spotLight.position.set(position.x, position.y, position.z);
    spotLight.intensity = 5;
    scene.add(spotLight);

    // var spotLightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(spotLightHelper);
}