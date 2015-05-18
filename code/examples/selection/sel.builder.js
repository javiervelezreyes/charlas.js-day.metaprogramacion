'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function builder (proto) {
        var out  = Object.create (proto || null);
        return {
            add    : function (obj) { mp.extend (out, obj); return this; },
            create : function () { return out; }
        };
    }

    var o = builder ({
        x: 1,
        y: 0,
        m: function () { return this.x++; },
        n: function () { return this.y++; }
    })
    .add ({x: 2, y: 3})
    .add ({y: 5, z: 4})
    .add ({
        p: function () { return this.m () * 2; },
        q: function () { return this.n () * 3; }
    })
    .create ();
    
    console.log (
        o.x, o.y, o.z,
        o.m(), o.m(),
        o.n(), o.n(),
        o.p(), o.p(),
        o.q(), o.q()
    );


})(mp);   
    