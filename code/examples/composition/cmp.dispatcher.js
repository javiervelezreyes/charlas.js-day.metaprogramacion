'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function dispatcher (key, routes) {
        return function (objs) {
            var out = {};
            Object.keys (objs[0]).forEach (function (k) {
                if (typeof (objs[0][k]) === 'function') {
                    mp.add (out, k, function (data) {
                        var target = routes[data[key]];
                        return target[k].call (target, data);
                    });
                }
            });
            return out;
        };
    }

    var o1 = { m: function () { return 1; } };
    var o2 = { m: function () { return 2; } };

    var d = dispatcher ('sex', {
        'M' : o1,
        'F' : o2
    }) ([o1, o2]);
    
    console.log (
       d.m({sex: 'F'}),
       d.m({sex: 'M'}),
       d.m({sex: 'F'})
    );

})(mp);   
    