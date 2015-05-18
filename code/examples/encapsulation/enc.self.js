'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function self (obj) {
        var out = {};
        var ctx = { self : out };
        Object.keys (obj).forEach (function (k) {
            if (typeof (obj[k]) === 'function') {
                mp.copy (out, obj, k);
                mp.bind (out, k, ctx);
            } else mp.copy (ctx, obj, k);
        });
        return out;
    }

    var o = self ({ 
        x: 2,
        y: 3,
        m: function (v) { return v + this.self.n (this.x); },
        n: function (v) { return v * this.y; }
    });

    console.log (
        o,
        o.m(5), // 5 + n(2) = 5 + 6 = 11
        o.n(5)  // 5 * 3 = 15
    );

})(mp);   
    