import * as THREE from 'three'
import { MapControls } from 'three/addons/controls/MapControls.js';
import PathConstructor from './pathContructor';
import { color } from 'three/examples/jsm/nodes/Nodes.js';
import Simulation from './simulation';
import { loadModel } from './modelLoader';

export default class Application {
    private _scene: THREE.Scene;
    private _renderer: THREE.WebGLRenderer;
    private _camera: THREE.PerspectiveCamera;
    private _controls: MapControls;

    private _isSimulationRunning = false;
    private _simulation: Simulation

    private _mousePosX = 0;
    private _mousePosY = 0;

    private _mousePointInWorld = new THREE.Vector3;

    private _planeOfIntersection: THREE.Mesh;

    private _testObject: THREE.Mesh;

    private _pathConstructor: PathConstructor

    private _isValidIntersection = false;
    private _endButton;
    private _stratButton;
    private _meshToSimulate: THREE.Mesh;
    private _simulationSpeed = 2000;

    

    public constructor(_canvas: any) {
        this._scene = new THREE.Scene();
        this._renderer = new THREE.WebGLRenderer({ canvas: _canvas, antialias: true, alpha :true  });
        this._renderer.setSize(_canvas.clientWidth, _canvas.clientHeight);
        
        //shadow mapping
        this._renderer.shadowMap.enabled = true;
        this._renderer.shadowMap.type = THREE.PCFShadowMap;


        this._camera = new THREE.PerspectiveCamera(65, _canvas.clientWidth / _canvas.clientHeight, 0.1, 1000.0);
        this._controls = new MapControls(this._camera, _canvas);

        this._processMouseMove = this._processMouseMove.bind(this);
        this._processMouseClick = this._processMouseClick.bind(this);
        this._start = this._start.bind(this);
        
        this._pathConstructor = new PathConstructor(this._scene);
        this._stratButton = document.getElementById("start")?.addEventListener('click',this._start);

        this._renderer.domElement.addEventListener("mousemove", this._processMouseMove);
        this._renderer.domElement.addEventListener("click", this._processMouseClick);
        
        this._pathConstructor = new PathConstructor(this._scene);


        loadModel("/models/red_lego_car.glb").then((loadedModel) => {
            this._meshToSimulate = (loadedModel.scene.children[0] as THREE.Mesh).clone()
            this._meshToSimulate.castShadow = true;
            this._meshToSimulate.receiveShadow = true;
            this._meshToSimulate.scale.set(0.5, 0.5, 0.5);
         });

    }

    public init(): void {
        this._setUpFloor();
        this._setUpLight();
        this._camera.position.set(0, 5, 5); 
        this._camera.lookAt(0, 0, 0); 

        this._controls.target.set(0.0, 2.0, 3.0);

        this._animate();
    }


    public render(): void {
        this._renderer.render(this._scene, this._camera);
    }

    public update(time): void {
        if(this._isSimulationRunning){
            this._simulation.simulate(time, this._simulationSpeed)
        }
    }

    public getMousePosInWorldSpace(): THREE.Vector3 {
        const rayCaster = new THREE.Raycaster();
        rayCaster.setFromCamera(new THREE.Vector2(this._mousePosX, this._mousePosY), this._camera);

        const intersections = rayCaster.intersectObject(this._planeOfIntersection, true);
        if (intersections.length > 0) {
            this._mousePointInWorld = intersections[0].point;
            this._isValidIntersection = true;
            return new THREE.Vector3(intersections[0].point.x, 1.0, intersections[0].point.z);
        } else {
            this._isValidIntersection = false;
            console.warn('No intersection found with the plane.');
            return new THREE.Vector3();
        }
    }

    private _animate = (time): void => {
        requestAnimationFrame(this._animate);
        this.update(time);
        this.render();
    }

    private _setUpFloor() {

        const loadingManager = new THREE.LoadingManager();

        const textureLoader = new THREE.TextureLoader(loadingManager);

        const colorTexture = textureLoader.load('/textures/gravel_stones_diff_2k.jpg')
        const ambientOclusion = textureLoader.load('/textures/gravel_stones_ao_2k.jpg')
        const normalTexture = textureLoader.load('/textures/gravel_stones_nor_gl_2k.jpg')
        const roughtTexture = textureLoader.load('/textures/gravel_stones_rough_2k.jpg')

        colorTexture.colorSpace = THREE.SRGBColorSpace;
        colorTexture.wrapS = THREE.MirroredRepeatWrapping
        colorTexture.wrapT = THREE.MirroredRepeatWrapping
        colorTexture.generateMipmaps = false
        colorTexture.minFilter = THREE.NearestFilter
        colorTexture.magFilter = THREE.NearestFilter

        const geometry = new THREE.PlaneGeometry(10, 10);
        const material = new THREE.MeshPhysicalMaterial({ map: colorTexture, roughnessMap: roughtTexture, normalMap:normalTexture, aoMap: ambientOclusion  });
        const planeMesh = new THREE.Mesh(geometry, material);
        planeMesh.rotation.x = -Math.PI / 2;
        planeMesh.receiveShadow = true;
        planeMesh.castShadow = true;
        this._planeOfIntersection = planeMesh;
     
        this._scene.add(planeMesh);

    }

    private _setUpLight() {
        const ambientLight = new THREE.AmbientLight(THREE.Color.NAMES.white, 0.2)   ;
        const directionalLight = new THREE.DirectionalLight(THREE.Color.NAMES.white, 4);
        directionalLight.position.set(12, 10, 0);
        directionalLight.castShadow = true;
        
        directionalLight.shadow.camera.near = 2;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -10;
        directionalLight.shadow.camera.right = 10;
        directionalLight.shadow.camera.top = 10;
        directionalLight.shadow.camera.bottom = -10;

        directionalLight.shadow.camera.scale.set(2, 2, 2);
        const helper = new THREE.CameraHelper( directionalLight.shadow.camera );

        //this._scene.add( helper );  
        this._scene.add(ambientLight);
        this._scene.add(directionalLight);
    }

    private _processMouseMove(event: any): void {
        this._mousePosX =
            ((event.clientX - this._renderer.domElement.offsetLeft) /
                this._renderer.domElement.clientWidth) * 2 - 1;

        this._mousePosY =
            ((event.clientY - this._renderer.domElement.offsetTop) /
                this._renderer.domElement.clientHeight) *
            -2 +
            1;

        this.getMousePosInWorldSpace();
        if (this._isValidIntersection)
            this._pathConstructor.processMouseMove(this._mousePointInWorld);
    }

    private _processMouseClick(event: any): void {
        console.log("click")
        if (this._isValidIntersection)
            this._pathConstructor.processClickEvent(this._mousePointInWorld);
    }

    private _start(){
        const numOfPoints = this._pathConstructor.getNumberOfPoints();
        if(numOfPoints > 0 && !this._isSimulationRunning){
            const spehere = new THREE.SphereGeometry(0.2);
            const mat = new THREE.MeshPhysicalMaterial();
            this._pathConstructor.constructCurve();
            const curveToSimulate = this._pathConstructor.getCurveToSimulate();
            this._simulation = new Simulation(this._scene,numOfPoints, this._meshToSimulate, curveToSimulate);
            this._isSimulationRunning = true;
        }
        else{
            console.log("reset");
            this._isSimulationRunning = false;
            this._pathConstructor.reset()        
            this._simulation.reset();
        }
    }

   private _setUpBox(){
        const box = new THREE.BoxGeometry(1,1,1);
        const mat = new THREE.MeshPhysicalMaterial();
        this._testObject = new THREE.Mesh(box, mat);
        this._scene.add(this._testObject);
    }
}
