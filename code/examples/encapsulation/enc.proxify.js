'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function proxify (obj) {
        var out = {};
        Object.keys (obj).forEach (function (k) {
            if (typeof (obj[k]) === 'function')
                mp.forward (out, obj, k);    
        });
        return out;
    }

    var o = { 
        x: 1,
        y: 1,
        m: function () { return this.x; },
        n: function () { return this.y; }
    };
    var p = proxify (o);
    console.log (
        p,
        p.m(),
        p.n()
    );

})(mp);   
    