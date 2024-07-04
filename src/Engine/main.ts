import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default class Application{
    private _scene:THREE.Scene;
    private _renderer: THREE.Renderer;
    private _camera: THREE.PerspectiveCamera;
    private _controls: OrbitControls;


    public constructor(_canvas: any){
        this._scene = new THREE.Scene();
        this._renderer = new THREE.WebGLRenderer({canvas: _canvas});
        this._renderer.setSize(_canvas.clientWidth, _canvas.clientHeight);
        this._camera = new THREE.PerspectiveCamera(65, _canvas.clientWidth / _canvas.clientHeight, 0.1, 1000.0);
        this._controls = new OrbitControls(this._camera, _canvas);
    }

    public init():void {
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        this._scene.add( cube );
        
        this._camera.position.z = 5;
    
        this.animate();
    }
 

    public render():void{
        this._renderer.render(this._scene, this._camera);
    }

    public update():void{

    }

    private animate = (): void => {
        requestAnimationFrame(this.animate);
        this.update();
        this.render();
    }
}
