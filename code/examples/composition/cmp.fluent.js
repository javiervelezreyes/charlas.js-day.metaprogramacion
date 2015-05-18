'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function fluent (obj, hn) {
        Object.keys (obj).forEach (function (k) {
            if (typeof (obj[k]) === 'function') {
                var fn = obj[k];
                mp.add (obj, k, function (data) {
                    hn (fn.call (this, data));
                    return this;
                });
            } 
        }, this);
        return obj;
    }
    
    var o = fluent ({ 
        p: function (x) { return x + 1; },
        q: function (x) { return x - 1; }
    }, console.log);

    o
    .p(5)
    .q(3);
        
})(mp);   
    