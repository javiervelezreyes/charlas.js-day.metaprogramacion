'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function singleton (obj) {
        return function () {
            return mp.forwardProxy ({}, obj);
        };
    }

    var create = singleton ({
        x: 1,
        y: 0,
        m: function () { return this.x; },
        n: function () { return this.y; }
    });
    var o1 = create ();
    var o2 = create ();

    console.log (
        o1, o2,
        o1.m(), o2.m(),
        o1.n(), o2.m()
    );

})(mp);   
    