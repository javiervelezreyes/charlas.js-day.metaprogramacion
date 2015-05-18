'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function dummy (obj) {
        mp.add (obj, 'off', false);
        mp.add (obj, 'start', function () { this.off = false; });
        mp.add (obj, 'stop' , function () { this.off = true; });
        Object.keys (obj).forEach (function (k) {
            if (typeof (obj[k]) === 'function')
                mp.provided (obj, k, function () {
                    return !this.off;
                }.bind(obj));
        });
        return obj;
    }

    var o = dummy ({ 
        m: function () { return 3; },
        n: function () { return 5; }
    });
    
    o.start(); console.log (o.m(), o.n());
    o.stop();  console.log (o.m(), o.n());

})(mp);   
    