'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function chain (objs) {
        objs.reverse ().forEach (function (obj, idx) {
            if (idx > 0) {
                Object.keys (obj).forEach (function (k) {
                    if (typeof (obj[k]) === 'function') {
                        var fn = obj[k];
                        var gn = objs[idx-1][k];
                        mp.add (obj, k, function (data) {
                            return fn.call (this, data) || 
                                   gn.call (this, data);
                        });
                    }
                }, this);
            }            
        }, this);
        return objs.reverse()[0];
    }
    
    var o = chain ([{ 
        p: function (x) { return void 0; },
        q: function (x) { return x - 1; }
    }, { 
        p: function (x) { return 2 * x; },
        q: function (x) { return 3 * x; }
    }]);
    
    console.log (
        o.p (5), // 2 * 5
        o.q (5)  // 5 - 1
    );

})(mp);   
    