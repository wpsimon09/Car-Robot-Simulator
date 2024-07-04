import * as THREE from 'three'


export default class PathConstructor{
    private _lineStart: THREE.Vector3;

    private _points= new Array<THREE.Vector3>;

    private _isConstructingLine = true;
    private _isFirstLine = true;

    private _tempLine: THREE.Mesh

    public constructor(){
        
    }

    public processClickEvent(pointOfClick: THREE.Vector3){
        if(this._isConstructingLine){
            console.log("line startd")
            if(this._isFirstLine){
                this._lineStart = pointOfClick;
            }else{
                this._lineStart = this._points[this._points.length-1];
            }
            this._isConstructingLine = false;
            this._points.push(pointOfClick);
        }else{
            console.log("line ended")

            this._isConstructingLine = true;
            this._points.push(pointOfClick);
        }

        console.log(this._points)
    }

    public endLine(endPoint: THREE.Vector3){
    
    }

    public renderLineInProgress(){

    }

}