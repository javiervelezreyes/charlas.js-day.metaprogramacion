'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function alias (obj, trd) {
        Object.keys (trd).forEach (function (k) {
            mp.innerDelegate (obj, k, trd[k]);    
        });
        return obj;
    }

    var o = alias ({ 
        m: function () { return 3; },
        n: function () { return 5; }
    }, {
        m: 'p',
        n: 'q'
    });
   
    console.log (
        o.p(),
        o.q()
    );

})(mp);   
    