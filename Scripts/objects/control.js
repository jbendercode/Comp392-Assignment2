/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(zoom, moonSpeed, ringSpeed, heliodSpeed, thassaSpeed, erebosSpeed, purphorosSpeed, nyleaSpeed, changeTarget) {
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
        return Control;
    }());
    objects.Control = Control;
})(objects || (objects = {}));

//# sourceMappingURL=control.js.map
