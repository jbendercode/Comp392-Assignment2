/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var TorusGeometry = THREE.TorusGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var ImageUtils = THREE.ImageUtils;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var CScreen = config.Screen;
//Custom Game Objects
var gameObject = objects.gameObject;
// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (function () {
    var scene = new Scene();
    var renderer;
    var camera;
    var axes;
    var sun;
    var heliod;
    var thassa;
    var thassaRings;
    var erebos;
    var purphoros;
    var malleum;
    var nylea;
    var sunGeometry;
    var sunMaterial;
    var heliodGeometry;
    var heliodMaterial;
    var thassaGeometry;
    var thassaMaterial;
    var thassaRingsGeometry;
    var thassaRingsMaterial;
    var erebosGeometry;
    var erebosMaterial;
    var purphorosGeometry;
    var purphorosMaterial;
    var malleumGeometry;
    var malleumMaterial;
    var nyleaGeometry;
    var nyleaMaterial;
    var ambientLight;
    var spotLight;
    var control;
    var gui;
    var stats;
    var step = 0;
    function init() {
        setupRenderer(); // setup the default renderer
        setupCamera(); // setup the camera
        // Add a sun to the Scene
        sunGeometry = new SphereGeometry(10, 64, 64);
        sunMaterial = new LambertMaterial({ map: ImageUtils.loadTexture('../../Assets/planet7.jpg') });
        sun = new gameObject(sunGeometry, sunMaterial, -26, 0, 0);
        sun.name = "Theros";
        scene.add(sun);
        console.log("Added sun to the scene");
        // add an axis helper to the scene
        //axes = new AxisHelper(20);
        //scene.add(axes);
        //console.log("Added Axis Helper to Scene...");
        // Add planet "Heliod" to the scene
        heliodGeometry = new SphereGeometry(0.6, 32, 32);
        heliodMaterial = new LambertMaterial({ map: ImageUtils.loadTexture('../../Assets/planet1.jpg') });
        heliod = new gameObject(heliodGeometry, heliodMaterial, -12, 0, 0);
        heliod.name = "Heliod";
        scene.add(heliod);
        console.log("Added Heliod to the scene");
        // Add planet "Thassa" to the scene
        thassaGeometry = new SphereGeometry(1.3, 32, 32);
        thassaMaterial = new LambertMaterial({ map: ImageUtils.loadTexture('../../Assets/planet3.jpg') });
        thassa = new gameObject(thassaGeometry, thassaMaterial, -8, 0, 0);
        thassa.name = "Thassa";
        scene.add(thassa);
        console.log("Added Thassa to the scene");
        // Add "Thassa Rings" to the scene
        thassaRingsGeometry = new TorusGeometry(1.9, 0.35, 2, 100);
        thassaRingsMaterial = new LambertMaterial({ transparent: true, opacity: 0.85, map: ImageUtils.loadTexture('../../Assets/planet5.jpg') });
        thassaRings = new gameObject(thassaRingsGeometry, thassaRingsMaterial, -8, 0, 0);
        thassaRings.castShadow = false;
        thassaRings.receiveShadow = false;
        thassaRings.name = "Thassa Rings";
        scene.add(thassaRings);
        console.log("Added Thassa Rings to the scene");
        // Add planet "Erebos" to the scene
        erebosGeometry = new SphereGeometry(0.9, 32, 32);
        erebosMaterial = new LambertMaterial({ map: ImageUtils.loadTexture('../../Assets/planet5.jpg') });
        erebos = new gameObject(erebosGeometry, erebosMaterial, -4, 0, 0);
        erebos.name = "Erebos";
        scene.add(erebos);
        console.log("Added Erebos to the scene");
        // Add planet "Purphoros" to the scene
        purphorosGeometry = new SphereGeometry(1.6, 32, 32);
        purphorosMaterial = new LambertMaterial({ map: ImageUtils.loadTexture('../../Assets/planet4.jpg') });
        purphoros = new gameObject(purphorosGeometry, purphorosMaterial, 0, 0, 0);
        purphoros.name = "Purphoros";
        scene.add(purphoros);
        console.log("Added Purphoros to the scene");
        // Add "Purphoros' moon 'Malleum'" to the scene
        malleumGeometry = new SphereGeometry(0.2, 32, 32);
        malleumMaterial = new LambertMaterial({ map: ImageUtils.loadTexture('../../Assets/planet6.jpg') });
        malleum = new gameObject(malleumGeometry, malleumMaterial, -2, 0, 0);
        malleum.name = "Malleum";
        scene.add(malleum);
        console.log("Added Malleum moon of Purphoros to the scene");
        // Add planet "Nylea" to the scene
        nyleaGeometry = new SphereGeometry(0.8, 32, 32);
        nyleaMaterial = new LambertMaterial({ map: ImageUtils.loadTexture('../../Assets/planet2.jpg') });
        nylea = new gameObject(nyleaGeometry, nyleaMaterial, 4, 0, 0);
        nylea.name = "Nylea";
        scene.add(nylea);
        console.log("Added Nylea to the scene");
        // Add an AmbientLight to the scene
        ambientLight = new AmbientLight(0xFFFFFF);
        scene.add(ambientLight);
        console.log("Added an Ambient Light to Scene");
        // Add a SpotLight to the scene
        spotLight = new SpotLight(0xffffff);
        spotLight.position.set(5.6, 23.1, 5.4);
        spotLight.rotation.set(-0.8, 42.7, 19.5);
        spotLight.intensity = 1.5;
        spotLight.angle = 60 * (Math.PI / 180);
        spotLight.distance = 200;
        spotLight.castShadow = true;
        spotLight.shadowCameraNear = 1;
        spotLight.shadowMapHeight = 2048;
        spotLight.shadowMapWidth = 2048;
        scene.add(spotLight);
        console.log("Added a SpotLight Light to Scene");
        // add controls
        gui = new GUI();
        control = new Control(0.01);
        addControl(control);
        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");
        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	
    }
    function addControl(controlObject) {
        gui.add(controlObject, 'rotationSpeed', -0.5, 0.5);
    }
    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }
    // Setup main game loop
    function gameLoop() {
        stats.update();
        // sun.rotation.y += control.rotationSpeed;
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
        // render the scene
        renderer.render(scene, camera);
    }
    // Setup default renderer
    function setupRenderer() {
        renderer = new Renderer();
        renderer.setClearColor(0x090909, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMapType = THREE.PCFSoftShadowMap;
        console.log("Finished setting up Renderer...");
    }
    // Setup main camera for the scene
    function setupCamera() {
        camera = new PerspectiveCamera(45, config.Screen.RATIO, 0.1, 1000);
        camera.position.x = 0.5;
        camera.position.y = 16;
        camera.position.z = -10.5;
        camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }
    window.onload = init;
    return {
        scene: scene
    };
})();

//# sourceMappingURL=game.js.map
