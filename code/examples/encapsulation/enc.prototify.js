'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function prototify (obj) {
        var ctx  = mp.context ();
        var out  = {};
        out[ctx] = {};
        Object.keys (obj).forEach (function (k) {
            if (typeof (obj[k]) === 'function')
                    mp.outerDelegate (out, obj, k, out[ctx]);
            else mp.copy (out[ctx], obj, k);
          });    
        return out;
    }

    var p = { 
        x: 1,
        y: 1,
        m: function () { return this.x; },
        n: function () { return this.y; }
    };
    p.x = 3; p.y=3; var p1 = prototify (p);
    p.x = 5; p.y=5; var p2 = prototify (p);
    console.log (
        p1,
        p1.m(),
        p1.n()
    );
    console.log (
        p2,
        p2.m(),
        p2.n()
    );
    
})(mp);   
    