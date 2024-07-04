import * as THREE from 'three'

export default class Simulation{
    private _isInProgress = false;

    private _numberOfPoints = 0;
    private _lineToSimulate : THREE.Line;
    private _meshToSimulate: THREE.Mesh;
    private _scene: THREE.Scene;

    public constructor(scene: THREE.Scene,numberOfPoints:number, line: THREE.Line, object :THREE.Mesh){
        this._numberOfPoints = numberOfPoints;
        this._lineToSimulate = line;
        this._meshToSimulate = object;
        this._scene = scene;
    }

    public simulate(time: number){
        const simulationSpeed = 2000;
        const t = (time / simulationSpeed % this._numberOfPoints+1)/this._numberOfPoints+1;


    }
}