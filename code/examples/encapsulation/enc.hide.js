'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function hide (obj) {
        var ctx = {};
        var out = {};
        Object.keys (obj).forEach (function (k) {
            if (typeof (obj[k]) === 'function') {
                mp.copy (out, obj, k);
                mp.bind (out, k, ctx);
            } else mp.copy (ctx, obj, k);
        });
        return out;
    }

    var o = hide ({ 
        x: 1,
        y: 1,
        m: function () { return this.x; },
        n: function () { return this.y; }
    });

    console.log (
        o,
        o.m(),
        o.n()
    );

})(mp);   
    