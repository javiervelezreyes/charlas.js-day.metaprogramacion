'use strict';

var fp = require ('./fp');
var mp = require ('./mp');

var x  = 'x';
var y  = 'y';
var m  = 'm';
var n  = 'n';
var p  = 'p';
var q  = 'q';

var tests = fp.describe ('test suite')(

    fp.it('add test', function () {

        return (
            equals (mp.add ({}, x, 1)    , {x: 1}) &&
            equals (mp.add ({x: 0}, x, 1), {x: 1}) &&
            equals (mp.add ({y: 0}, x, 1), {x: 1, y: 0})
        );

    }),
    
    fp.it('remove test', function () {

        return ( 
            equals (mp.remove ({}, x)    , {}) &&
            equals (mp.remove ({x: 0}, x), {}) &&
            equals (mp.remove ({y: 0}, x), {y: 0})
        );

    }),
    
    fp.it('update test', function () {

        return (
            equals (mp.update ({}, x, 1)    , {})     &&
            equals (mp.update ({x: 0}, x, 1), {x: 1}) &&
            equals (mp.update ({y: 0}, x, 1), {y: 0})
        );

    }),
    
    fp.it('rename test', function () {

        return ( 
            equals (mp.rename ({}, x, y)    , {})     &&
            equals (mp.rename ({x: 0}, x, y), {y: 0}) &&
            equals (mp.rename ({y: 0}, y, y), {y: 0}) &&
            equals (mp.rename ({y: 0}, x, y), {y: 0})
        );

    }),
    
    fp.it('copy test', function () {

        return ( 
            equals (mp.copy ({}, {}, x)        , {})     &&
            equals (mp.copy ({}, {x: 1}, x)    , {x: 1}) &&
            equals (mp.copy ({x: 0}, {x: 1}, x), {x: 1}) &&
            equals (mp.copy ({x: 0}, {x: 1}, y), {x: 0}) &&
            equals (mp.copy ({x: 0}, {y: 1}, y), {x: 0, y: 1})
        );

    }),
    
    fp.it('move test', function () {
        
        var o1 = {}    , o2 = {};
        var o3 = {}    , o4 = {x: 1};
        var o5 = {x: 0}, o6 = {x: 1};
        var o7 = {y: 0}, o8 = {x: 1};
        var o9 = {y: 0}, o0 = {x: 1};

        return ( 
            equals (mp.move (o1, o2, x), {})           && equals (o2, {}) &&
            equals (mp.move (o3, o4, x), {x: 1})       && equals (o4, {}) &&
            equals (mp.move (o5, o6, x), {x: 1})       && equals (o6, {}) &&
            equals (mp.move (o7, o8, x), {x: 1, y: 0}) && equals (o8, {}) &&
            equals (mp.move (o9, o0, y), {y: 0})       && equals (o0, {x: 1})
        );

    }),
    
    fp.it('extend test', function () {

        return ( 
            equals (mp.extend ({}, {})        , {})     &&
            equals (mp.extend ({}, {x: 1})    , {x: 1}) &&
            equals (mp.extend ({x: 0}, {x: 1}), {x: 1}) &&
            equals (mp.extend ({x: 0}, {y: 1}), {x: 0, y: 1}) 
        );

    }),
    
    fp.it('setPrototype test', function () {

        var o1 = mp.setPrototype ({}    , {});
        var o2 = mp.setPrototype ({}    , {x: 1});
        var o3 = mp.setPrototype ({x: 0}, {x: 1});
        var o4 = mp.setPrototype ({x: 0}, {y: 1});
        
        return ( 
            equals (mp.getPrototype (o1), {})     &&
            equals (mp.getPrototype (o2), {x: 1}) &&
            equals (mp.getPrototype (o3), {x: 1}) &&
            equals (mp.getPrototype (o4), {y: 1})
        );

    }),
    
    fp.it('removePrototype test', function () {

        var o1 = mp.setPrototype ({}    , {});
        var o2 = mp.setPrototype ({}    , {x: 1});
        var o3 = mp.setPrototype ({x: 0}, {x: 1});
        var o4 = mp.setPrototype ({x: 0}, {y: 1});
        var o5 = mp.removePrototype (o1);
        var o6 = mp.removePrototype (o2);
        var o7 = mp.removePrototype (o3);
        var o8 = mp.removePrototype (o4);

        return ( 
            (mp.getPrototype (o5) === null) &&
            (mp.getPrototype (o6) === null) &&
            (mp.getPrototype (o7) === null) &&
            (mp.getPrototype (o8) === null)
        );

    }),
    
    fp.it('reversePrototype test', function () {

        var o1 = mp.setPrototype ({}    , {});
        var o2 = mp.setPrototype ({}    , {x: 1});
        var o3 = mp.setPrototype ({x: 0}, {x: 1});
        var o4 = mp.setPrototype ({x: 0}, {y: 1});
        var o5 = mp.reversePrototype (o1);
        var o6 = mp.reversePrototype (o2);
        var o7 = mp.reversePrototype (o3);
        var o8 = mp.reversePrototype (o4);
    
        return ( 
            equals (mp.getPrototype (o5), {})     &&
            equals (mp.getPrototype (o6), {})     &&
            equals (mp.getPrototype (o7), {x: 0}) &&
            equals (mp.getPrototype (o8), {x: 0})
        );
        
    }),
    
    fp.it('copyUp test', function () {

        var o1 = mp.setPrototype ({}    , {});
        var o2 = mp.setPrototype ({}    , {x: 1});
        var o3 = mp.setPrototype ({x: 0}, {x: 1});
        var o4 = mp.setPrototype ({x: 0}, {y: 1});                                   
        var o5 = mp.copyUp (o1, x);
        var o6 = mp.copyUp (o2, x);
        var o7 = mp.copyUp (o3, x);
        var o8 = mp.copyUp (o4, x);
         
        return (
            equals (mp.getPrototype (o5), {})     &&
            equals (mp.getPrototype (o6), {x: 1}) &&
            equals (mp.getPrototype (o7), {x: 0}) &&
            equals (mp.getPrototype (o8), {x: 0, y: 1})
        );

    }),
    
    fp.it('copyDown test', function () {

        var o1 = mp.setPrototype ({}    , {});
        var o2 = mp.setPrototype ({}    , {x: 1});
        var o3 = mp.setPrototype ({x: 0}, {x: 1});
        var o4 = mp.setPrototype ({x: 0}, {y: 1});
        var o5 = mp.copyDown (o1, x);
        var o6 = mp.copyDown (o2, x);
        var o7 = mp.copyDown (o3, x);
        var o8 = mp.copyDown (o4, x);
        
        return (
            equals (o5, {})     &&
            equals (o6, {x: 1}) &&
            equals (o7, {x: 1}) &&
            equals (o8, {x: 0})
        );

    }),
    
    fp.it('moveUp test', function () {

        var o1 = mp.setPrototype ({}    , {});
        var o2 = mp.setPrototype ({}    , {x: 1});
        var o3 = mp.setPrototype ({x: 0}, {x: 1});
        var o4 = mp.setPrototype ({x: 0}, {y: 1});
        var o5 = mp.setPrototype ({x: 0}, {y: 1});
        var o6 = mp.moveUp (o1, x);
        var o7 = mp.moveUp (o2, x);
        var o8 = mp.moveUp (o3, x);
        var o9 = mp.moveUp (o4, x);
        var o0 = mp.moveUp (o5, y);

        return (
            equals (mp.getPrototype (o6), {})           && equals (o6, {}) &&
            equals (mp.getPrototype (o7), {x: 1})       && equals (o7, {}) &&
            equals (mp.getPrototype (o8), {x: 0})       && equals (o8, {}) &&
            equals (mp.getPrototype (o9), {x: 0, y: 1}) && equals (o9, {}) &&
            equals (mp.getPrototype (o0), {y: 1})       && equals (o0, {x: 0})
        );

    }),
    
    fp.it('moveDown test', function () {

        var o1 = mp.setPrototype ({}    , {});
        var o2 = mp.setPrototype ({}    , {x: 1});
        var o3 = mp.setPrototype ({x: 0}, {x: 1});
        var o4 = mp.setPrototype ({x: 0}, {y: 1});
        var o5 = mp.setPrototype ({x: 0}, {y: 1});
        var o6 = mp.moveDown (o1, x);
        var o7 = mp.moveDown (o2, x);
        var o8 = mp.moveDown (o3, x);
        var o9 = mp.moveDown (o4, x);
        var o0 = mp.moveDown (o5, y);

        return (
            equals (mp.getPrototype (o6), {})     && equals (o6, {})     &&
            equals (mp.getPrototype (o7), {})     && equals (o7, {x: 1}) &&
            equals (mp.getPrototype (o8), {})     && equals (o8, {x: 1}) &&
            equals (mp.getPrototype (o9), {y: 1}) && equals (o9, {x: 0}) &&
            equals (mp.getPrototype (o0), {})     && equals (o0, {x: 0, y: 1})
        );

    }),
    
    fp.it('before test', function () {
        
        var o = {
            m: function (x, r) { return x * r; },
            n: function (x, r) { return x + r; }
        };
        var fn = function (x) { return x + 1; };
        var gn = function (x) { return x - 1; };
        
        mp.before (o, m, fn);
        mp.before (o, n, gn);
        
        return (
            equals (o.m (5), 30) &&
            equals (o.n (5), 9)
        );

    }),
    
    fp.it('after test', function () {
        
        var a, b;
        var o = {
            m: function (x) { return x + 1; },
            n: function (x) { return x - 1; }
        };
        var fn = function (x, r) { a = r; };
        var gn = function (x, r) { b = r; };
        
        mp.after (o, m, fn);
        mp.after (o, n, gn);

        return (
            equals (o.m (5), 6) && equals (a, 6) &&
            equals (o.n (5), 4) && equals (b, 4)
        );

    }),
    
    fp.it('provided test', function () {
        
        var o = {
            m: function (x) { return x + 1; },
            n: function (x) { return x - 1; }
        };
        var pn = function (x) { return  (x%2); };
        var qn = function (x) { return !(x%2); };
        
        mp.provided (o, m, pn);
        mp.provided (o, n, qn);

        return (
            equals (o.m (2), void 0) &&
            equals (o.m (3), 4)      &&
            equals (o.n (2), 1)      &&
            equals (o.n (3), void 0)
        );

    }),
    
    fp.it('except test', function () {
        
        var o = {
            m: function (x) { return x + 1; },
            n: function (x) { return x - 1; }
        };
        var pn = function (x) { return  (x%2); };
        var qn = function (x) { return !(x%2); };
        
        mp.except (o, m, pn);
        mp.except (o, n, qn);

        return (
            equals (o.m (2), 3)      &&
            equals (o.m (3), void 0) &&
            equals (o.n (2), void 0) &&
            equals (o.n (3), 2)
        );

    }),
    
    fp.it('around test', function () {
        
        var o = {
            m: function (fn, x) { return fn (x + 1); },
            n: function (fn, x) { return fn (x - 1); }
        };
        var fn = function (x) { return x * x; };
        var gn = function (x) { return -x;    };
        
        mp.around (o, m, fn);
        mp.around (o, n, gn);

        return (
            equals (o.m (2),  9) &&
            equals (o.n (3), -2)
        );

    }),
        
    fp.it('beforeAtt test', function () {
        
        var a, b;
        var o = mp.beforeAtt ({
            x: 0, 
            y: 0
        }, x, { 
            get: function (v)      { return a = v+1;  },
            set: function (ov, nv) { return b = nv+1; } 
        });

        return (
            equals (o.x  , 0) && equals (a, 1) && equals (b, void 0) &&
            equals (o.x=1, 1) && equals (a, 1) && equals (b, 2) &&
            equals (o.y  , 0) && equals (a, 1) && equals (b, 2) &&
            equals (o.y=1, 1) && equals (a, 1) && equals (b, 2)
        );

    }),
    
    fp.it('afterAtt test', function () {
        
        var a, b;
        var o = mp.afterAtt ({
            x: 0, 
            y: 0
        }, x, { 
            get: function (v)      { return a = v+1;  },
            set: function (ov, nv) { return b = nv+1; } 
        });

        return (
            equals (o.x  , 0) && equals (a, 1) && equals (b, void 0) &&
            equals (o.x=1, 1) && equals (a, 1) && equals (b, 2) &&
            equals (o.y  , 0) && equals (a, 1) && equals (b, 2) &&
            equals (o.y=1, 1) && equals (a, 1) && equals (b, 2)
        );

    }),
        
    fp.it('innerDelegate test', function () {
        
        var o = mp.innerDelegate ({
            p: function (x) { return x + 1; },
            q: function (x) { return x - 1; }
        }, p, m);

        return (
            equals (o.p (5), 6) &&
            equals (o.q (5), 4) &&
            equals (o.m (5), 6)
        );

    }),
    
    fp.it('outerDelegate test', function () {
        
        var o = mp.outerDelegate ({
            y: 4,
            m: function (x) { return x + this.y; },
            n: function (x) { return x - this.y; }
        }, {
            y: 5,
            m: function (x) { return x * this.y; },
            n: function (x) { return this.y - x; }
        }, m, {y: 3});

        return (
            equals (o.m (5), 15) &&
            equals (o.n (5),  1)
        );

    }),
    
    fp.it('forward test', function () {
        
        var o = mp.forward ({
            y: 4,
            m: function (x) { return x + this.y; },
            n: function (x) { return x - this.y; }
        }, {
            y: 3,
            m: function (x) { return x * this.y; },
            n: function (x) { return this.y - x; }
        }, m);

        return (
            equals (o.m (5), 15) &&
            equals (o.n (5),  1)
        );

    }),
    
    fp.it('forwardProxy test', function () {
        
        var o = mp.forwardProxy ({
            y: 4,
            m: function (x) { return x + this.y; },
            n: function (x) { return x - this.y; }
        }, {
            y: 3,
            p: function (x) { return x * this.y; },
            q: function (x) { return this.y - x; }
        }, m);

        return (
            equals (o.m (5),  9) &&
            equals (o.n (5),  1) &&
            equals (o.p (5), 15) &&
            equals (o.q (5), -2)
        );

    }),
    
    fp.it('delegate test', function () {
        
        var o = mp.delegate ({
            y: 4,
            m: function (x) { return x + this.y; },
            n: function (x) { return x - this.y; }
        }, {
            y: 3,
            m: function (x) { return x * this.y; },
            n: function (x) { return this.y - x; }
        }, m);

        return (
            equals (o.m (5), 20) &&
            equals (o.n (5),  1)
        );

    }),
    
    fp.it('delegateProxy test', function () {
        
        var o = mp.delegateProxy ({
            y: 4,
            m: function (x) { return x + this.y; },
            n: function (x) { return x - this.y; }
        }, {
            y: 3,
            p: function (x) { return x * this.y; },
            q: function (x) { return this.y - x; }
        }, m);

        return (
            equals (o.m (5),  9) &&
            equals (o.n (5),  1) &&
            equals (o.p (5), 20) &&
            equals (o.q (5), -1)
        );

    })
    
);

console.log (tests);

function equals (o1, o2) {
    if (typeof (o1) === 'function') return typeof (o2) === 'function';
    if (typeof (o1) === 'object')
        return Object.keys (o1).every (function (k) {
           return o1.hasOwnProperty (k) &&
                  o2.hasOwnProperty (k) &&
                  equals (o1[k], o2[k]);
        }) && Object.keys (o2).every (function (k) {
           return o1.hasOwnProperty (k) &&
                  o2.hasOwnProperty (k) &&
                  equals (o1[k], o2[k]);
        });
    return o1 === o2;
};