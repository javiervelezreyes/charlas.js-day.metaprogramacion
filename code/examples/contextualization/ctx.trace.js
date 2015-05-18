'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function trace (format) {
        return function (obj) {
            Object.keys(obj).forEach (function (k) {
                if (typeof (obj[k]) === 'function')
                    mp.before (obj, k, function () {
                        console.log (format, k);
                    });    
            }); 
            return obj;
        };
    }

    var o = trace ('[CALL] - %s') ({ 
        m: function () { return 3; },
        n: function () { return 5; }
    });

    console.log (
        o.m(),
        o.n()
    );

})(mp);   
    