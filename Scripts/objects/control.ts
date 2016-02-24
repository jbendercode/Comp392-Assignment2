/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public zoom:number;
        public moonSpeed:number;
        public ringSpeed:number;
        public heliodSpeed:number;
        public thassaSpeed:number;
        public erebosSpeed:number;
        public purphorosSpeed:number;
        public nyleaSpeed:number;
        public changeTarget:string;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(zoom:number, moonSpeed:number, ringSpeed:number, 
        heliodSpeed:number, thassaSpeed:number, erebosSpeed:number, 
        purphorosSpeed:number, nyleaSpeed:number, changeTarget:string) {
            this.zoom = zoom;
            this.moonSpeed = moonSpeed;
            this.ringSpeed = ringSpeed;
            this.heliodSpeed = heliodSpeed;
            this.thassaSpeed = thassaSpeed;
            this.erebosSpeed = erebosSpeed;
            this.purphorosSpeed = purphorosSpeed;
            this.nyleaSpeed = nyleaSpeed;
            this.changeTarget = changeTarget;
        }
        
        //PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++
    }
}
