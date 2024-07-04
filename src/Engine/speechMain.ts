import * as THREE from 'three'
import { MapControls } from 'three/addons/controls/MapControls.js';
import PathConstructor from './pathContructor';
import Car from './car';

export default class Application {
    private _scene: THREE.Scene;
    private _renderer: THREE.Renderer;
    private _camera: THREE.PerspectiveCamera;
    private _controls: MapControls;

    private _car: Car;
    
    private _mousePosX = 0;
    private _mousePosY = 0;

    private _mousePointInWorld = new THREE.Vector3;

    private _planeOfIntersection: THREE.Mesh;

    private _testObject: THREE.Mesh;

    private _pathConstructor: PathConstructor

    private _isValidIntersection = false;
    private _stratButton;

    public constructor(_canvas: any) {
        this._scene = new THREE.Scene();
        this._renderer = new THREE.WebGLRenderer({ canvas: _canvas, antialias: true });
        this._renderer.setSize(_canvas.clientWidth, _canvas.clientHeight);

        this._camera = new THREE.PerspectiveCamera(65, _canvas.clientWidth / _canvas.clientHeight, 0.1, 1000.0);
        this._controls = new MapControls(this._camera, _canvas);

        // creating car i guess
        this._car = new Car(this._scene)
        this._processMouseMove = this._processMouseMove.bind(this);
        this._processMouseClick = this._processMouseClick.bind(this);
        this._start = this._start.bind(this);
        
        // this._pathConstructor = new PathConstructor(this._scene);
        this._stratButton = document.getElementById("start")?.addEventListener('click',this._start)

        this._renderer.domElement.addEventListener("mousemove", this._processMouseMove);
        // this._renderer.domElement.addEventListener("click", this._processMouseClick);

    }

    public init(orders:String[]): void {
        this._car.setOrders(orders)
        this._setUpLight();
        this._setUpFloor();
        this._setUpBox();
        this._camera.position.set(0, 5, 5); // Position the camera above the plane
        this._camera.lookAt(0, 0, 0); // Look at the center of the plane

        this._controls.target.set(0, 0, 0); // Set the target for the controls to the center of the plane


        this._animate();
        this._controls.target.set(0.0, 2.0, 3.0);

        this._animate();
    }


    public render(): void {
        this._renderer.render(this._scene, this._camera);
    }

    public update(time:number): void {
        this._testObject.rotation.x += 0.01;
        this._testObject.rotation.y += 0.01;
        this._car.update(time)
        
        this._testObject.position.copy(this._mousePointInWorld);
    }

    public getMousePosInWorldSpace():THREE.Vector3{
        const rayCaster = new THREE.Raycaster();
        rayCaster.setFromCamera(new THREE.Vector2(this._mousePosX, this._mousePosY), this._camera);       
    
        const intersections = rayCaster.intersectObject(this._planeOfIntersection,true);
        if (intersections.length > 0) {
            this._mousePointInWorld = intersections[0].point;
            this._isValidIntersection = true;
            return new THREE.Vector3(intersections[0].point.x,1.0 ,intersections[0].point.z);
        } else {
            this._isValidIntersection = false;
            console.warn('No intersection found with the plane.');
            return new THREE.Vector3(); 
        }
    }

    private _animate = (time:number): void => {
        requestAnimationFrame(this._animate);
        this.update(time);
        this.render();
    }

    private _setUpFloor() {
        const geometry = new THREE.PlaneGeometry(10,10);
        const material = new THREE.MeshPhysicalMaterial({ color: THREE.Color.NAMES.orange });
        const planeMesh = new THREE.Mesh(geometry, material);
        planeMesh.rotation.x = -Math.PI / 2;

        this._scene.add(planeMesh);

        this._planeOfIntersection = planeMesh;
    }

    private _setUpLight() {
        const ambientLight = new THREE.AmbientLight();
        const directionalLight = new THREE.DirectionalLight(THREE.Color.NAMES.white, 3);
        directionalLight.position.set(0, 2, 0);
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
        if(this._isValidIntersection)
            this._pathConstructor.processMouseMove(this._mousePointInWorld);
    }

    private _processMouseClick(event: any): void {
        console.log("click")
        if(this._isValidIntersection)
            this._pathConstructor.processClickEvent(this._mousePointInWorld);
    }

    private _start(){
        console.log("start");
    }

   private _setUpBox(){
        const box = new THREE.BoxGeometry(1,1,1);
        const mat = new THREE.MeshPhysicalMaterial();
        this._testObject = new THREE.Mesh(box, mat);

        this._scene.add(this._testObject);
   }
}