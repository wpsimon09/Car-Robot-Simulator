import * as THREE from 'three'

export default class Simulation{
    private _isInProgress = false;

    private _numberOfPoints = 0;
    private _path : THREE.CatmullRomCurve3;
    private _meshToSimulate: THREE.Mesh;
    private _scene: THREE.Scene

    public constructor(scene: THREE.Scene,numberOfPoints:number, object :THREE.Mesh, path:THREE.CatmullRomCurve3){
        this._numberOfPoints = numberOfPoints;
        this._meshToSimulate = object;
        scene.add(this._meshToSimulate);
        this._path = path;
        this._scene = scene;
        
    }

    public simulate(time: number){
        const simulationSpeed = 2000;
        const t = ((time / simulationSpeed) % this._numberOfPoints + 1) / (this._numberOfPoints + 1);        
        const position = this._path.getPointAt(t);
        
        
        this._meshToSimulate.position.copy(position);
    }

    public reset(){
        this._scene.remove(this._meshToSimulate);
    }
}