'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function locator (objs) {
        return function (keys) {
            var out = {};
            keys.forEach (function (k) {
                mp.add (out, k, objs.filter (function (obj) {
                    return (k in obj);
                })[0][k]);
                mp.bind (out, k, out);
            });
            return out;
        };
    }

    var create = locator ([
        {a: 1, b: 1},
        {b: 2, c: 2},
        {c: 3, d: 3},
        {d: 4, e: 4} 
    ]);
    
    var o1 = create (['a', 'e']);
    var o2 = create (['c', 'b']);
    var o3 = create (['a', 'd']);
    
    console.log (
        o1,
        o2,
        o3
    );
    
})(mp);   
    