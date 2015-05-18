'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function recruiter (fn) {
        return function (objs) {
            var out = {};
            Object.keys (objs[0]).forEach (function (k) {
                mp.add (out, k, function () {
                    var args = [].slice.call (arguments);
                    return objs.filter (function (obj) {
                       return fn(obj[k].apply (this, args)); 
                    }); 
                });
            });
            return out;
        };
    }

    var o1 = { 
        m: function () { return 2; },
        n: function () { return 12; }
    };
    var o2 = { 
        m: function () { return 15; },
        n: function () { return 6; }
    };

    var r = recruiter (
        function (x) { return x < 10; }
    )([o1, o2]);

    console.log (
        r.m(),
        r.n()
    );
    
})(mp);   
    