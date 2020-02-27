var sidewalkTexture = new THREE.TextureLoader().load('materials/sidewalk.jpg');
var roadTexture = new THREE.TextureLoader().load('materials/asphalt_black.jpg');
var crossroadTexture = new THREE.TextureLoader().load('materials/asphalt_plain.jpg');
var gardenPath = new THREE.TextureLoader().load('materials/garden_path.jpg');
var texture_wall = new THREE.TextureLoader().load('materials/brick_wall.jpg');
var texture_door = new THREE.TextureLoader().load('materials/door2.jpg');
var texture_roof = new THREE.TextureLoader().load('materials/roof.jpg');
var texture_bark = new THREE.TextureLoader().load('materials/bark.jpg');

var ROTATIONS = {
    north: Math.PI / 2,
    east: 0,
    south: (3 * Math.PI) / 2,
    west: Math.PI
}

function initStreet() {
    var start = 2500;
    var dimensions = { x: 100, y: fixed_y, z: start, width: 250 };
    for (i = 0; i < 10; i++) {
        if (i % 3 == 0) {
            roadbuilder(dimensions, roadTexture, true, true, true);
        } else {
            roadbuilder(dimensions, roadTexture);
        }
        start -= 250;
        dimensions.z = start;


    }
    roadbuilder(dimensions, crossroadTexture, false, false);
    dimensions.x = -150;
    roadbuilder(dimensions, roadTexture, false, false);
    dimensions.x = 350;
    roadbuilder(dimensions, roadTexture, false, false);
    initHouseBlock();
}

function initHouseBlock() {
    var myZ = 1800;
    for (i = 0; i < 5; i++) {
        createHouse({ height: 100, width: 100, depth: 100 }, { x: -125, y: 60, z: myZ });
        createHouse({ height: 100, width: 100, depth: 100 }, { x: 325, y: 60, z: myZ }, ROTATIONS.south);
        myZ -= 300;
    }
}

function roadbuilder(dimensions, texture, rotate = true, sidewalk = true, lamppost = false) {
    var geometry = new THREE.BoxGeometry(dimensions.width, 10, dimensions.width);
    var material = new THREE.MeshBasicMaterial({ map: texture });
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(dimensions.x, dimensions.y, dimensions.z)
    if (rotate) {
        cube.rotation.y = (Math.PI / 2);
    }
    scene.add(cube);
    if (sidewalk == true) {
        spawnSidewalk(-50, dimensions.z - 100);
        spawnSidewalk(-50, dimensions.z - 50);
        spawnSidewalk(-50, dimensions.z);
        spawnSidewalk(-50, dimensions.z + 50);
        spawnSidewalk(-50, dimensions.z + 100);

        spawnSidewalk(250, dimensions.z - 100);
        spawnSidewalk(250, dimensions.z - 50);
        spawnSidewalk(250, dimensions.z);
        spawnSidewalk(250, dimensions.z + 50);
        spawnSidewalk(250, dimensions.z + 100);
        if (lamppost) {
            spawnLamppost(240, dimensions.z + 50);
            spawnLamppost(-40, dimensions.z + 50);

        }
    }
}

function spawnSidewalk(x, z) {
    var geometry = new THREE.BoxGeometry(50, 20, 50);
    var material = new THREE.MeshLambertMaterial({ map: sidewalkTexture });
    var sidewalk = new THREE.Mesh(geometry, material);
    sidewalk.position.set(x, 0, z)
    scene.add(sidewalk);
}

function spawnLamppost(x, z) {
    createLamppost({ radius: 5, height: 70 }, { x: x, y: 30, z: z });
}

/**
 * building houses
 */

function createCube(dimension, position = { x: 0, y: 0, z: 0 }, material = new THREE.MeshNormalMaterial(), rotation = ROTATIONS.north) {
    var geometry = new THREE.CubeGeometry(dimension.height, dimension.width, dimension.depth);
    var cube = new THREE.Mesh(geometry, material);
    cube.position.set(position.x, position.y, position.z);
    cube.rotation.y = rotation;
    scene.add(cube);
    return cube;
}

function createPyramid(dimension = { height: 4, width: 5 }, position = { x: 0, y: 0, z: 0 }, material = new THREE.MeshNormalMaterial()) {
    var geometry = new THREE.CylinderGeometry(0, dimension.height, dimension.width, 4, 0)
    var pyramid = new THREE.Mesh(geometry, material);
    pyramid.position.set(position.x, position.y, position.z);
    pyramid.rotation.y = 5.5;
    scene.add(pyramid);
    return pyramid;
}

function createHouse(dimension = { height, width, depth }, position = { x: 0, y: 0, z: 0 }, rotation = ROTATIONS.north) {
    var material_wall = new THREE.MeshBasicMaterial({ map: texture_wall });

    var material_door = new THREE.MeshBasicMaterial({ map: texture_door });

    // Create an array of materials to be used in a cube, one for each side
    var cubeMaterialArray = [];

    // order to add materials: x+,x-,y+,y-,z+,z-
    for (let index = 0; index < 6; index++) {
        if (index == 4) {
            cubeMaterialArray.push(material_door);
        } else {
            cubeMaterialArray.push(material_wall);
        }
    }

    var cubeMaterials = new THREE.MeshFaceMaterial(cubeMaterialArray);

    cube = createCube({ width: dimension.width, height: dimension.height, depth: dimension.depth }, { x: position.x, y: position.y, z: position.z }, cubeMaterials, rotation);

    texture_roof.repeat.set(2, 1);
    var material_roof = new THREE.MeshBasicMaterial({ map: texture_roof });
    createPyramid({ width: dimension.width - 2, height: dimension.height * 0.71 }, { x: position.x, y: position.y + (dimension.height - 1), z: position.z }, material_roof);
}

function createTree(position = { x: 0, z: 0 }) {
    var material_tree = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    if (Math.random() >= 0.5) {
        createPyramid({ height: randomInt(20, 100), width: 300 }, { x: position.x, y: 190, z: position.z }, material_tree);
    } else {
        var randNumb = randomInt(10, 70);
        createCube({ height: randNumb, width: randNumb, depth: randNumb }, { x: position.x, y: 50, z: position.z }, material_tree)
    }

    var material_bark = new THREE.MeshBasicMaterial({ map: texture_bark });
    createCube({ height: 10, width: 50, depth: 10 }, { x: position.x, y: 20, z: position.z }, material_bark);
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
