'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function delay (obj, ms) {
        Object.keys (obj).forEach (function (k) {
            mp.add (obj, k, (function (fn) {
                return function () {
                    var args = [].slice (arguments-1);
                    var cb   = arguments[arguments.length-1];
                    setTimeout (function () {
                        cb (fn.call(obj, args));
                    }, ms);
                };
            })(obj[k]));  
        });
        return obj;
    }

    var o = delay ({ 
        m: function () { return 3; },
        n: function () { return 5; }
    }, 1000);
    
    o.m(console.log),
    o.n(console.log)

})(mp);   
    