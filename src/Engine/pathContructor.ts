import * as THREE from 'three'


export default class PathConstructor{
    private _scene;
    private _lineStart = undefined;

    private _points: Array<THREE.Vector3>

    private _isConstructingLine = false;
    private _isFirstLine = true;

    public constructor(){
        
    }

    public startLine(startPoint: THREE.Vector3){
        this._isConstructingLine = true;
        this._points.push(startPoint)
    }

    public endLine(endPoint: THREE.Vector3){
        this._isConstructingLine = false;
        this._isFirstLine = false;
        this._points.push(endPoint);
    }

    public renderLineInProgress(endPointTemp: THREE.Vector3, scene: THREE.Scene){
        if(this._isConstructingLine){
            
            const from = this._points[this._points.length-1];
            const to = endPointTemp;
            
            const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
            const geometry = new THREE.BufferGeometry().setFromPoints( [from, to] );
            const line = new THREE.Line( geometry, material );
            scene.add(line);
        }
    }

}