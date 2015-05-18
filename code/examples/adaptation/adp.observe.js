'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function observe (obj, emitter) {
        Object.keys(obj).forEach (function (k) {
            if (typeof (obj[k]) === 'function')
                mp.before (obj, k, function () {
                    emitter.emit ('CALL');
                });
            else {
                mp.beforeAtt (obj, k, {
                    get: function () { emitter.emit ('GET'); },
                    set: function () { emitter.emit ('SET'); }
                });
            }
        });
        return obj;
    }

    var o = observe ({ 
        x: 1,
        y: 1,
        m: function () { return 5; }
    }, {emit: console.log});
     
    o.x,
    o.y = 3;
    o.m ();

})(mp);   
    