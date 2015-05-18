'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function sink (env) {
        return function (obj) {
            var out = {};
            mp.extend (out, obj);
            Object.keys(out).forEach (function (k) {
                if (typeof (out[k]) === 'function') {
                    mp.bind (out, k, env);    
                }
            });
            return out;
        };
    }
    var dev  = { x:1, y:3 };
    var test = { x:2, y:0 };
    var prod = { x:7, y:4 };
    var o = { 
        m: function () { return this.x; },
        n: function () { return this.y; }
    };
    var Dev = sink (dev);
    var Test = sink (test);
    var Prod = sink (prod);

    var o1 = Dev (o);
    console.log (
        o1.m(),
        o1.n()
    );
    var o2 = Prod (o);
    console.log (
        o2.m(),
        o2.n()
    );

})(mp);   
    