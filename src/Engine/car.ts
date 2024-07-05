import * as THREE from 'three'

import gsap from 'gsap';

import { loadModel } from './modelLoader';



export default class Car {

    private _car: THREE.Mesh;

    private _orders: String[];

    private _rotatingRight: boolean;

    private _targetRotation: number;

    private _orderStarted: boolean;

    private _duration: number;

    private _lastTime: number;

    private _currentTime: number;

    private _deltaTime: number;

    private _shouldMove: boolean;

    private currentOrder: number;

    private _shouldSetTimeout: boolean



    public constructor(scene: THREE.Scene) {

        loadModel("/models/red_lego_car.glb").then((loadedModel) => {

            this._car = (loadedModel.scene.children[0] as THREE.Mesh).clone()

            this._car.scale.set(0.5, 0.5, 0.5);

            this._car.rotateY(90 * Math.PI / 180);

            this._car.rotateZ(90 * Math.PI / 180)

            // this._car.rotateX(90*Math.PI/180)

            scene.add(this._car);



        });

        let degree = 90;

        this._duration = 2000;

        this._rotatingRight = true

        this._targetRotation = ((Math.PI * degree) / 180);

        this._orderStarted = true;



        this._deltaTime = 0

        this._currentTime = 0

        this._lastTime = 0

        this._shouldMove = true

        this.currentOrder = 0

        this._shouldSetTimeout = true;



    }



    public update(time: number) {

        if (time != undefined) {

            this._currentTime = time;

            this._deltaTime = this._currentTime - this._lastTime

            this._lastTime = time

            this._duration -= this._deltaTime;

        }




        this.translateToOrders(this._orders)

    }



    public setOrders(orders: String[]) {

        this._orders = orders;

        console.log(this._orders)

    }



    private translateToOrders(orders: String[]) {

        this._duration -= this._deltaTime;

        if (this._duration < 0) {

            this._duration = 2000;

            this._shouldMove = false

            if (this._shouldSetTimeout) {

                setTimeout(() => {

                    this._shouldMove = true

                }, 50)

                this.currentOrder += 1

            }

        } else if (this._shouldMove) {

            this._shouldSetTimeout = true

            this.selectOrder(this._orders[this.currentOrder])

        }

    }




    private selectOrder(order) {



        switch (order) {

            case "left":

                this.rotate90Degrees("left")

                break;

            case "right":

                this.rotate90Degrees("right")

                break;

            case "forward":

                this.forward(); // Call forward when "go forward" is in orders

                break;

            case "backward":

                this.backward()

                break;

            default:

                break;

        }



    }




    private forward() {



        const currentRotation = -this._car.rotation.y;



        const speed = 0.01;

        const dx = -Math.sin(currentRotation) * speed;

        const dz = -Math.cos(currentRotation) * speed;



        this._car.position.x += dx;

        this._car.position.z -= dz;

    }




    private backward() {

        const currentRotation = -this._car.rotation.y;

        const speed = 0.01;

        const dx = Math.sin(currentRotation) * speed; // Reverse direction compared to forward()

        const dz = Math.cos(currentRotation) * speed; // Reverse direction compared to forward()



        this._car.position.x += dx;

        this._car.position.z -= dz;

    }



    private rotate90Degrees(direction: 'left' | 'right') {



        if (direction == "left") {

            gsap.to(this._car.rotation, { duration: 0.5, y: this._car.rotation.y + (this._targetRotation / 9) })

        } else if (direction == "right") {

            gsap.to(this._car.rotation, { duration: 0.5, y: this._car.rotation.y - (this._targetRotation / 9) })



        }

        console.log(this._car.rotation.y)

    }

}