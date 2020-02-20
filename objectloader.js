function myLoader(entity, scale = {x: 1, y: 1, z: 1}) {
    return new Promise(function(resolve, reject)
    {
        var loader = new THREE.ObjectLoader();
        loader.load('models/'+entity+'.json', function (obj) {
            obj.scale.set(scale.x, scale.y, scale.z);
            scene.add(obj);
            resolve(obj);
        });
    });
}

var loader = new THREE.ObjectLoader();

var jupiter = myLoader('jupiter/jupiter', {x: 20, y: 20, z: 20});

let jupiterObj = null;

jupiter.then(function (object) {
   jupiterObj = object;
   object.position.z = -2500;
   object.position.y = 2000;
   object.position.x = 1000;
});

//rotation code
/*
time = clock.getElapsedTime() * 0.1 * Math.PI;
jupiterObj.rotation.y = time;
*/