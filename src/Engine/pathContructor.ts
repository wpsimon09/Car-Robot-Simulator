import * as THREE from 'three'


export default class PathConstructor{
    private _scene;
    private _lineStart = undefined;

    public constructor(scene: THREE.Scene){
        this._scene = scene;
    }

    public getLineStart(mouseX: number, mouseY: number):THREE.Vector2{
        return new THREE.Vector2(mouseX, mouseY);
    }

}