'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function idempotent (obj) {
        mp.add (obj, 'fired', {});
        mp.add (obj, 'reset', function () { this.fired = {}; });
        Object.keys(obj).forEach (function (k) {
            if (typeof (obj[k]) === 'function') {
                mp.after (obj, k, function () {
                    this.fired[k] = true;
                });
                mp.except (obj, k, function () {
                    return this.fired[k];
                });
            }
       });
       return obj;
    }

    var o = idempotent ({ 
        m: function () { return 3; },
        n: function () { return 5; }
    });
    
    console.log (
        o.m(), o.m(), 
        o.n(), o.n()
    );
    o.reset();
    console.log (
        o.m(), o.m(), 
        o.n(), o.n()
    );
    
})(mp);   
    