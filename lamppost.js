function createLamppost(dimension, position) {

    var geometry = new THREE.CylinderGeometry(dimension.radius, dimension.radius, dimension.height, 32);
    var material = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('materials/lamppost_pole.jpg') });

    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(position.x, position.y, position.z);
    scene.add(cylinder);
    createCilinder(dimension.radius, position.x, cylinder.position.y + (dimension.height / 2), position.z);
}

function createCilinder(radius_bottom, x, y, z) {
    var geometry = new THREE.CylinderGeometry(170, radius_bottom, 200, 42);
    // var material = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('materials/lamppost_pole.jpg') });
    var material = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('materials/lamppost_light.jpg') });

    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(x, y, z);
    scene.add(cylinder);

    var topHead = new THREE.CylinderGeometry(10, 200, 200, 42);
    var material = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('materials/lamppost_pole.jpg') });

    var top = new THREE.Mesh(topHead, material);
    top.position.set(x, y + 200, z);
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