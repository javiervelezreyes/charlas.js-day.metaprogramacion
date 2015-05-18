'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function cache (obj) {
        Object.keys(obj).forEach (function (k) {
            if (typeof (obj[k]) === 'function') {
                var fn = obj[k];
                mp.add (obj, k, (function () {
                    var cache = {};
                    return function () {
                        var args = [].slice.call (arguments);
                        var r = cache[args] || fn.apply (this, args);
                        cache[args] = r;
                        return r;
                    };
                }.bind(this))());    
            }
        }, this); 
        return obj;
    }

    var idx = 0;
    var o = cache ({ 
        m: function (x) { return idx = idx + x; },
        n: function (x) { return idx = idx - x; }
    });

    console.log (
        o.m(1), o.m(1), o.m(1), o.m(1),
        o.m(2), o.m(2), o.m(1), o.m(1),
        o.n(1), o.n(1), o.n(1), o.n(1),
        o.n(2), o.n(2), o.n(1), o.n(1)
    );

})(mp);   
    