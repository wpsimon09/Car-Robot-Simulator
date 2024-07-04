import * as THREE from 'three'

export default class PathConstructor{

    private _isAllowed = true;
    private _pathObject: THREE.Line;

    private _scene: THREE.Scene;
    private _lineStart: THREE.Vector3;
    private _lineEnd: THREE.Vector3;

    private _points= new Array<THREE.Vector3>;
    private _isConstructingLine = true;
    private _isFirstLine = true;

    private _tempLine: THREE.Line;

    private _finalLine: THREE.Line;
    private _pathOfSimulation: THREE.CatmullRomCurve3;

    private _curveToSimulate: THREE.Line;

    public constructor(scene: THREE.Scene){
        this._scene = scene

        const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        const points = [new THREE.Vector3(),new THREE.Vector3()];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        this._tempLine = new THREE.Line(geometry, material);
        this._finalLine = new THREE.Line(geometry, material);

        this._scene.add(this._tempLine);
        this._scene.add(this._finalLine);
    }

    public processClickEvent(pointOfClick: THREE.Vector3){
        if(this._isAllowed){
            if(this._isConstructingLine){
                console.log("line startd")
                if(this._isFirstLine){
                    this._lineStart = pointOfClick;
                    this._isFirstLine = false;
                    this._isConstructingLine = true;
                }  
                this._isConstructingLine = false;
                this._points.push(pointOfClick);
                
            }else{
                this._isConstructingLine = true; 
                this._lineStart = pointOfClick;
                this._points.push(pointOfClick);
                this._finalLine.geometry = new THREE.BufferGeometry().setFromPoints(this._points);
            }   
        }
    }

    public processMouseMove(tempEndPoint: THREE.Vector3 ){
        if(tempEndPoint != undefined)
            if(this._isConstructingLine)
                this._tempLine.geometry = new THREE.BufferGeometry().setFromPoints([this._lineStart, tempEndPoint]);
    }

    public getCurveToSimulate(): THREE.CatmullRomCurve3{
        return this._pathOfSimulation;
    }

    public constructCurve(){
        this._pathOfSimulation = new THREE.CatmullRomCurve3(this._points);
        const pathGeometry = new THREE.BufferGeometry().setFromPoints(this._pathOfSimulation.getPoints(100));
        const pathMaterial = new THREE.LineBasicMaterial({color:0xff0000});
        this._pathObject = new THREE.Line(pathGeometry);

        this._isAllowed = false;

        this._scene.remove(this._finalLine);
        this._scene.remove(this._tempLine);
        this._scene.add(this._pathObject);
    }

    public getNumberOfPoints():number{
       return this._points.length;
    }

    public reset():void{
        this._isAllowed = true;
        this._isConstructingLine = false;
        this._isFirstLine = true;
        this._points = [];
        this._scene.remove(this._pathObject);

        const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
        const points = [new THREE.Vector3(),new THREE.Vector3()];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        this._tempLine = new THREE.Line(geometry, material);
        this._finalLine = new THREE.Line(geometry, material);

        this._scene.add(this._tempLine);
        this._scene.add(this._finalLine);
    }
}