'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function filter (objs) {
        objs.reverse ().forEach (function (obj, idx) {
            if (idx > 0) {
                Object.keys (obj).forEach (function (k) {
                    if (typeof (obj[k]) === 'function') {
                        var fn = obj[k];
                        var gn = objs[idx-1][k];
                        mp.add (obj, k, function (data) {
                            var r = fn.call (this, data);
                            return gn.call (this, r);
                        });
                    }
                }, this);
            }            
        }, this);
        return objs.reverse()[0];
    }
    
    var o = filter ([{ 
        p: function (x) { return x + 1; },
        q: function (x) { return x - 1; }
    }, { 
        p: function (x) { return 2 * x; },
        q: function (x) { return 3 * x; }
    }]);
    
    console.log (
        o.p (5), // 2 * (5 + 1)
        o.q (5)  // 3 * (5 - 1)
    );

})(mp);   
    