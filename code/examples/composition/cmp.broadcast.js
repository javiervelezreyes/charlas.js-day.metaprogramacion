'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function broadcast (objs) {
        var out = {};
        Object.keys(objs[0]).forEach (function (k) {
            mp.add (out, k, function () {
                return objs.map (function (obj) {
                    return obj[k].call(obj, arguments);
                });
            })
        });
        return out;
    }

    var o1 = { 
        m: function () { return 3; },
        n: function () { return 5; }
    };
    var o2 = { 
        m: function () { return 3; },
        n: function () { return 5; }
    };
    var o3 = broadcast ([o1, o2]);
    
    console.log (
        o3.m(),
        o3.n()
    );

})(mp);   
    