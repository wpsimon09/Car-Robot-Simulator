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
        this._path = path;
        this._scene = scene;
        
        scene.add(this._meshToSimulate);
    }

    public simulate(time: number){
        const simulationSpeed = 2000;
        const t = ((time / simulationSpeed) % this._numberOfPoints + 1) / (this._numberOfPoints + 1);        
        const position = this._path.getPointAt(t);
        const tangent = this._path.getTangentAt(t).normalize();
                
        this._meshToSimulate.position.copy(position);
        this._meshToSimulate.lookAt(position.clone().add(tangent));
    }

    public reset(){
        this._scene.remove(this._meshToSimulate);
    }
}