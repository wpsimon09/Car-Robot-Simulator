import * as THREE from 'three'

export default class Car{
    
    public init(){
    
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

        const currentRotation = -this.car.rotation.y;

        const speed = 0.01;
        const dx = Math.sin(currentRotation) * speed;
        const dz = Math.cos(currentRotation) * speed;

        this.car.position.x += dx;
        this.car.position.z -= dz;
    }


    private backward() {
        const currentRotation = -this.car.rotation.y;
        const speed = 0.01;
        const dx = -Math.sin(currentRotation) * speed; // Reverse direction compared to forward()
        const dz = -Math.cos(currentRotation) * speed; // Reverse direction compared to forward()

        this.car.position.x += dx;
        this.car.position.z -= dz;
    }
// teehee
    private rotate90Degrees(direction: 'left' | 'right') {
        
        if(direction=="left"){
            gsap.to(this.car.rotation,{duration:0.5,y:this.car.rotation.y+ (this._targetRotation/9)})
        }else if(direction=="right"){
            gsap.to(this.car.rotation,{duration:0.5,y:this.car.rotation.y - (this._targetRotation/9)})

        }
        console.log(this.car.rotation.y)


    }
}