/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import TorusGeometry = THREE.TorusGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import ImageUtils = THREE.ImageUtils;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;
import CScreen = config.Screen;

//Custom Game Objects
import gameObject = objects.gameObject;

// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (() => {

    var scene: Scene = new Scene();
    var renderer: Renderer;
    var camera: PerspectiveCamera;
    var axes: AxisHelper;
    var sun: Mesh;
    var heliod: Mesh;
    var thassa: Mesh;
    var thassaRings: Mesh;
    var erebos: Mesh;
    var purphoros: Mesh;
    var malleum: Mesh;
    var nylea: Mesh;
    var sunGeometry: SphereGeometry;
    var sunMaterial: LambertMaterial;
    var heliodGeometry: SphereGeometry;
    var heliodMaterial: LambertMaterial;
    var thassaGeometry: SphereGeometry;
    var thassaMaterial: LambertMaterial;
    var thassaRingsGeometry: TorusGeometry;
    var thassaRingsMaterial: LambertMaterial;
    var erebosGeometry: SphereGeometry;
    var erebosMaterial: LambertMaterial;
    var purphorosGeometry: SphereGeometry;
    var purphorosMaterial: LambertMaterial;
    var malleumGeometry: SphereGeometry;
    var malleumMaterial: LambertMaterial;
    var nyleaGeometry: SphereGeometry;
    var nyleaMaterial: LambertMaterial;
    var ambientLight: AmbientLight;
    var spotLight: SpotLight;
    var control: Control;
    var gui: GUI;
    var stats: Stats;
    var step: number = 0;

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

    function addControl(controlObject: Control): void {
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
    function gameLoop(): void {
        stats.update();

        // sun.rotation.y += control.rotationSpeed;
    
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
	
        // render the scene
        renderer.render(scene, camera);
    }

    // Setup default renderer
    function setupRenderer(): void {
        renderer = new Renderer();
        renderer.setClearColor(0x090909, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        renderer.shadowMapType = THREE.PCFSoftShadowMap;
        console.log("Finished setting up Renderer...");
    }

    // Setup main camera for the scene
    function setupCamera(): void {
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
    }

})();

