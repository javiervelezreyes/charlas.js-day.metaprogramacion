'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function throttle (obj, ms) {
        Object.keys(obj).forEach (function (k) {
            mp.add (obj, k, (function (fn) {
                var throttling;
                return function () {
                    if (!throttling) {
                        throttling = setTimeout (function () {
                            throttling = void 0;
                        }, ms);
                        return fn.call(obj, arguments);
                    }
                };
            })(obj[k]));  
        });
        return obj;
    }

    var o = throttle ({ 
        m: function () { return 3; },
        n: function () { return 5; }
    }, 1000);

    console.log (
        o.m(), o.m(), o.m(),
        o.n(), o.n(), o.n()
    );
    setTimeout (function () {
        console.log (
            o.m(),
            o.n()
        );
    }, 1000);

})(mp);   
    