'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function undo (obj) {
        var states = [];
        var off    = false;
        Object.keys (obj).forEach (function (k) {
            if (typeof (obj[k]) !== 'function')
                mp.beforeAtt (obj, k, {
                    set: function (ov, nv) {
                        if ((ov !== nv) && !off)  
                            states.push (function () {
                                off = true;
                                obj[k] = ov;
                                off = false;
                            });
                    }
                });
        });
        mp.add (obj, 'undo', function () {
            var state = states.pop ();
            if (state) state ();
        });
        return obj;
    }

    var o = undo ({
        x: 0,
        m: function (v) { return this.x = this.x + v; },
        n: function (v) { return this.x = this.x - v; }
    });

    o.m (1); console.log (o.x);
    o.m (1); console.log (o.x);
    o.m (1); console.log (o.x);
    o.n (1); console.log (o.x);
    o.n (1); console.log (o.x);
    o.n (1); console.log (o.x);
 
    o.undo (); console.log (o.x);
    o.undo (); console.log (o.x);
    o.undo (); console.log (o.x);
    o.undo (); console.log (o.x);
    o.undo (); console.log (o.x);
    o.undo (); console.log (o.x);


})(mp);

                
    