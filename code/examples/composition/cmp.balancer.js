'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function balancer (objs) {
        var idx = 0;
        var out = {};
        Object.keys(objs[0]).forEach (function (k) {
            if (typeof (objs[0][k]) === 'function')
                mp.add (out, k, function () {
                    var r = objs[idx][k].call (objs[idx], arguments);
                    idx   = (idx+1) % objs.length;
                    return r;
                });
        });
        return out;
    }

    var o1 = { m: function () { return 1; } };
    var o2 = { m: function () { return 2; } };
    var o3 = { m: function () { return 3; } };
    var b  = balancer ([o1, o2, o3]);

    console.log (
        b.m(), b.m(), b.m(),
        b.m(), b.m(), b.m(),
        b.m(), b.m(), b.m()
    );

})(mp);   
    