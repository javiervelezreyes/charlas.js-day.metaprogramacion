'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function hungarian (obj, pn) {
        var out = {};
        var ctx = { self : out };
        var isPublic = pn || function (k) { return k[0] !== '_'; };
        Object.keys (obj).forEach (function (k) { 
            if (isPublic(k)) {
                mp.copy (out, obj, k);
                mp.bind (out, k, ctx);
            }
            else {
                mp.copy (ctx, obj, k);
                mp.bind (ctx, k, ctx);
            }  
        });
        return out;
    }

    var o = hungarian ({ 
        y: 3,
        m: function (v) { return v + this._r(); },
        n: function (v) { return v * this._r(); },
        
        _x: 2,
        _r: function () { return this.self.y + this._x }
    });

    console.log (
        o,
        o.m(5), // 5 + _r() = 5 + 5 = 10
        o.n(5)  // 5 * _r() = 5 * 5 = 25
    );

})(mp);   
    