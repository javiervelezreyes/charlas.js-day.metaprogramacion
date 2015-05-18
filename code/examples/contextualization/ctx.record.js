'use strict';

var mp = require ('../../lib/mp.js');

(function (mp) { 

    function record (db) {
        return function (obj) {
            mp.add (obj, 'load', function () { 
                var data = db.find (obj.id); 
                mp.extend (obj, data);
            });
            mp.add (obj, 'save', function () {
                db.save (obj); 
            });
            return obj;
        };
    }

    var db = {
        find: function (id) { return { x: 3, y: 3 }; },
        save: function (o)  { console.log ('saved', o); }
    };
    var storable = record (db);
    
    var o = storable({ 
        x: 1,
        y: 1
    });
    console.log (o); o.load ();
    console.log (o); o.save ();

})(mp);   
    