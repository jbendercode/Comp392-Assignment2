/// <reference path="_reference.ts"/>

// TO DO LIST
// - Add self emitting light from sun
// - Zoom in to other planet(s)
// - Add background stars texture

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
import DirectionalLight = THREE.DirectionalLight;
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
    var sun2: Mesh;
    var heliod: Mesh;
    var thassa: Mesh;
    var thassaRings: Mesh;
    var erebos: Mesh;
    var purphoros: Mesh;
    var malleum: Mesh;
    var nylea: Mesh;
    var sunGeometry: SphereGeometry;
    var sunMaterial: LambertMaterial;
    var sunGeometry2: SphereGeometry;
    var sunMaterial2: LambertMaterial;
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
    var nyleaGeometry: SphereGeometry;
    var nyleaMaterial: LambertMaterial;
    var heliodPivot: Object3D;
    var thassaPivot: Object3D;
    var erebosPivot: Object3D;
    var purphorosPivot: Object3D;
    var nyleaPivot: Object3D;
    var moonPivot: Object3D;
    var ringPivot: Object3D;
    var malleumGeometry: SphereGeometry;
    var malleumMaterial: LambertMaterial;
    var nyleaGeometry: SphereGeometry;
    var nyleaMaterial: LambertMaterial;
    var ambientLight: AmbientLight;
    var directionalLight: DirectionalLight;
    var control: Control;
    var gui: GUI;
    var stats: Stats;
    var step: number = 0;
    var lookingAt: Vector3;

    function init() {

        setupRenderer(); // setup the default renderer
	
        setupCamera(); // setup the camera
    
        // Add a sun to the Scene
        sunGeometry = new SphereGeometry(10, 64, 64);
        sunMaterial = new LambertMaterial({ map: ImageUtils.loadTexture('../../Assets/planet7.jpg') });
        sun = new gameObject(sunGeometry, sunMaterial, 0, 0, 0);
        sun.name = "Theros";
        scene.add(sun);
        console.log("Added sun to the scene");
        
        // Second Layer of sun
        sunGeometry2 = new SphereGeometry(10.25, 64, 64);
        sunMaterial2 = new LambertMaterial({ transparent: true, opacity: 0.25, map: ImageUtils.loadTexture('../../Assets/planet7.jpg') });
        sun2 = new gameObject(sunGeometry2, sunMaterial2, 0, 0, 0);
        sun.add(sun2);
        console.log("Added sun2 to the scene");
        
        // Add pivots for all of the planets
        heliodPivot = new Object3D();
        heliodPivot.position = sun.position; 
        scene.add( heliodPivot );
        
        thassaPivot = new Object3D();
        thassaPivot.position = sun.position; 
        scene.add( thassaPivot );
        
        erebosPivot = new Object3D();
        erebosPivot.position = sun.position; 
        scene.add( erebosPivot );
        
        purphorosPivot = new Object3D();
        purphorosPivot.position = sun.position; 
        scene.add( purphorosPivot );
        
        nyleaPivot = new Object3D();
        nyleaPivot.position = sun.position; 
        scene.add( nyleaPivot );
        
        // add an axis helper to the scene
        axes = new AxisHelper(20);
        scene.add(axes);
        console.log("Added Axis Helper to Scene...");
        
        // Add planet "Heliod" to the scene
        heliodGeometry = new SphereGeometry(0.6, 32, 32);
        heliodMaterial = new LambertMaterial({ map: ImageUtils.loadTexture('../../Assets/planet1.jpg') });
        heliod = new gameObject(heliodGeometry, heliodMaterial, -14, 0, 0);
        heliod.castShadow = true;
        heliod.receiveShadow = true;
        heliod.name = "Heliod";
        heliodPivot.add(heliod);
        console.log("Added Heliod to the scene");
        
        // Add planet "Thassa" to the scene
        thassaGeometry = new SphereGeometry(1.3, 32, 32);
        thassaMaterial = new LambertMaterial({ map: ImageUtils.loadTexture('../../Assets/planet3.jpg') });
        thassa = new gameObject(thassaGeometry, thassaMaterial, -20, 0, 0);
        thassa.castShadow = true;
        thassa.receiveShadow = true;
        thassa.name = "Thassa";
        thassaPivot.add(thassa);
        console.log("Added Thassa to the scene");
        
        // Add a pivot for the moon to rotate around
        ringPivot = new Object3D();
        ringPivot.position = thassa.position; 
        ringPivot.rotation.x = 80;
        thassa.add( ringPivot );
        
        // Add "Thassa Rings" to the scene
        thassaRingsGeometry = new TorusGeometry(1.9, 0.35, 2, 100);
        thassaRingsMaterial = new LambertMaterial({ transparent: true, opacity: 0.85, map: ImageUtils.loadTexture('../../Assets/planet5.jpg') });
        thassaRings = new gameObject(thassaRingsGeometry, thassaRingsMaterial, 0, 0, 0);
        thassaRings.castShadow = false;
        thassaRings.receiveShadow = false;
        thassaRings.name = "Thassa Rings";
        ringPivot.add(thassaRings);
        console.log("Added Thassa Rings to the scene");
        
        // Add planet "Erebos" to the scene
        erebosGeometry = new SphereGeometry(0.9, 32, 32);
        erebosMaterial = new LambertMaterial({ map: ImageUtils.loadTexture('../../Assets/planet5.jpg') });
        erebos = new gameObject(erebosGeometry, erebosMaterial, -26, 0, 0);
        erebos.castShadow = true;
        erebos.receiveShadow = true;
        erebos.name = "Erebos";
        erebosPivot.add(erebos);
        console.log("Added Erebos to the scene");
        
        // Add planet "Purphoros" to the scene
        purphorosGeometry = new SphereGeometry(1.6, 32, 32);
        purphorosMaterial = new LambertMaterial({ map: ImageUtils.loadTexture('../../Assets/planet4.jpg') });
        purphoros = new gameObject(purphorosGeometry, purphorosMaterial, -32, 0, 0);
        purphoros.castShadow = true;
        purphoros.receiveShadow = true;
        purphoros.name = "Purphoros";
        purphorosPivot.add(purphoros);
        console.log("Added Purphoros to the scene");
        
        // Add a pivot for the moon to rotate around
        moonPivot = new Object3D();
        moonPivot.position = purphoros.position; 
        purphoros.add( moonPivot );
        
        // Add "Purphoros' moon 'Malleum'" to the scene
        malleumGeometry = new SphereGeometry(0.2, 32, 32);
        malleumMaterial = new LambertMaterial({ map: ImageUtils.loadTexture('../../Assets/planet6.jpg') });
        malleum = new gameObject(malleumGeometry, malleumMaterial, -2, 0, 0);
        malleum.castShadow = true;
        malleum.receiveShadow = true;
        malleum.name = "Malleum";
        moonPivot.add(malleum);
        console.log("Added Malleum, moon of Purphoros to the scene");
        
        // Add planet "Nylea" to the scene
        nyleaGeometry = new SphereGeometry(0.8, 32, 32);
        nyleaMaterial = new LambertMaterial({ map: ImageUtils.loadTexture('../../Assets/planet2.jpg') });
        nylea = new gameObject(nyleaGeometry, nyleaMaterial, -38, 0, 0);
        nylea.castShadow = true;
        nylea.receiveShadow = true;
        nylea.name = "Nylea";
        nyleaPivot.add(nylea);
        console.log("Added Nylea to the scene");

        // Add an AmbientLight to the scene
        ambientLight = new AmbientLight(0xFFFFFF);
        scene.add(ambientLight);
        console.log("Added an Ambient Light to Scene");
	
        // Add a DirectionalLight to the scene
        directionalLight = new DirectionalLight(0xffffff);
        directionalLight.position.set(0, 0, 0);
        directionalLight.rotation.set(0, 0, 0);
        directionalLight.intensity = 10;
        directionalLight.castShadow = true;
        directionalLight.shadowCameraNear = 1;
        directionalLight.shadowMapHeight = 2048;
        directionalLight.shadowMapWidth = 2048;
        scene.add(directionalLight);
        console.log("Added a DirectionalLight to Scene");
    
        // add controls
        gui = new GUI();
        control = new Control(0, 0.003, 0.003, 0.002, 0.0016, 0.0012, 0.0008, 0.0004, 'Sun');
        addControl(control);

        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");

        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	
        
        window.addEventListener('resize', onResize, false);

    }

    function addControl(controlObject: Control): void {
        gui.add(controlObject, 'zoom', 0, 100);
        gui.add(controlObject, 'moonSpeed', -0.1, 0.1);
        gui.add(controlObject, 'ringSpeed', -0.1, 0.1);
        gui.add(controlObject, 'heliodSpeed', -0.01, 0.01);
        gui.add(controlObject, 'thassaSpeed', -0.01, 0.01);
        gui.add(controlObject, 'erebosSpeed', -0.01, 0.01);
        gui.add(controlObject, 'purphorosSpeed', -0.01, 0.01);
        gui.add(controlObject, 'nyleaSpeed', -0.01, 0.01);
        gui.add(controlObject, 'changeTarget', [ 'Sun' , 'Heliod', 'Thassa', 'Erebos', 'Purphoros', 'Nylea' ]);
    }
    
    // Change what the camera is looking at
    function changeTarget(){
        if (control.changeTarget == 'Sun')
            lookingAt = sun.position;
        else if (control.changeTarget == 'Heliod')
            lookingAt = heliodPivot.position;
        else if (control.changeTarget == 'Thassa')
            lookingAt = ringPivot.position;
        else if (control.changeTarget == 'Erebos')
            lookingAt = erebos.position;
        else if (control.changeTarget == 'Purphoros')
            lookingAt = purphoros.position;
        else if (control.changeTarget == 'Nylea')
            lookingAt = nylea.position;
    }

    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }
    
    function onResize(): void {
        camera.aspect = window.innerWidth / window.innerHeight;
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.updateProjectionMatrix();
    }
    
    

    // Setup main game loop
    function gameLoop(): void {
        stats.update();

        // Change Target
        changeTarget();

        // Zoom Control
        camera.position.y = 100.1 - control.zoom;
        camera.position.z = 0.1 + (control.zoom * 0.6);
        camera.lookAt(lookingAt);

        // Plantary Swing
        heliodPivot.rotation.y += control.heliodSpeed;
        thassaPivot.rotation.y += control.thassaSpeed;
        erebosPivot.rotation.y += control.erebosSpeed;
        purphorosPivot.rotation.y += control.purphorosSpeed;
        nyleaPivot.rotation.y += control.nyleaSpeed;

        // Rotate Sun
        sun.rotation.y += 0.0001;
        sun.rotation.x += 0.0001;
        sun.rotation.z += 0.0001;
        
        // Rotate Sun Top Layer
        sun2.rotation.y += 0.0013;
        sun2.rotation.x += 0.0012;
        sun2.rotation.z += 0.0017;

        // Rotate Heliod
        heliod.rotation.y += 0.0004;
        heliod.rotation.x += 0.0005;
        heliod.rotation.z += 0.0003;
        
        // Rotate Thassa
        thassa.rotation.y += 0.0005;
        thassa.rotation.x += 0.0003;
        thassa.rotation.z += 0.0003;
        ringPivot.rotation.z += control.ringSpeed;
        
        // Rotate Erebos
        erebos.rotation.y += 0.0004;
        erebos.rotation.x += 0.0003;
        erebos.rotation.z += 0.0005;
        
        // Rotate Purphoros
        purphoros.rotation.y += 0.0004;
        purphoros.rotation.x += 0.0005;
        purphoros.rotation.z += 0.0003;
        moonPivot.rotation.y += control.moonSpeed;
        
        // Rotate Nylea
        nylea.rotation.y += 0.0005;
        nylea.rotation.x += 0.0005;
        nylea.rotation.z += 0.0004;
    
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
        renderer.shadowMap.enabled = true;
        renderer.shadowMapType = THREE.PCFSoftShadowMap;
        console.log("Finished setting up Renderer...");
    }

    // Setup main camera for the scene
    function setupCamera(): void {
        camera = new PerspectiveCamera(45, config.Screen.RATIO, 0.1, 1000);
        lookingAt = new Vector3(0, 0, 0);
        console.log("Finished setting up Camera...");
    }

    window.onload = init;

    return {
        scene: scene
    }

})();

