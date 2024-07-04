import * as THREE from 'three'

export default class PathConstructor{

    private _scene: THREE.Scene;

    private _lineStart: THREE.Vector3;
    private _lineEnd: THREE.Vector3;

    private _points= new Array<THREE.Vector3>;

    private _isConstructingLine = true;
    private _isFirstLine = true;

    private _tempLine: THREE.Line

    public constructor(scene: THREE.Scene){
        this._scene = scene

        const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
        const points = [new THREE.Vector3(),new THREE.Vector3()];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        this._tempLine = new THREE.Line(geometry, material);

        this._scene.add(this._tempLine);
    }

    public processClickEvent(pointOfClick: THREE.Vector3){
        if(this._isConstructingLine){
            console.log("line startd")
            if(this._isFirstLine){
                this._lineStart = pointOfClick;
                this._isFirstLine = false;
            }else{
                this._lineStart = this._points[this._points.length-1];
            }   
            this._isConstructingLine = false;
            this._points.push(pointOfClick);

        }else{
            this._isConstructingLine = true;
            this._points.push(pointOfClick);
        }   

    }

    public processMouseMove(tempEndPoint: THREE.Vector3){
        if(this._isConstructingLine)
            this._tempLine.geometry = new THREE.BufferGeometry().setFromPoints([this._lineStart, tempEndPoint]);
    }

    public endLine(endPoint: THREE.Vector3){
    
    }

}