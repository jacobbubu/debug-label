"use strict";

var debugLabel = require('../index.js');
var label1 = debugLabel()

label1.style.top = '0px';
label1.style.bottom = '';
label1.cell.style.fontSize = '2em';
label1.cell.style.fontFamily = 'Courier New';

setInterval(function(){
    var rnd = Math.floor(Math.random() * 5);
    var dt = new Date();
    switch (rnd) {
        case 0:
            label1.debug(dt.getSeconds());
            break;
        case 1:
            label1.info(dt.getSeconds());
            break;
        case 2:
            label1.warn(dt.getSeconds());
            break;
        case 3:
            label1.error(dt.getSeconds());
            break;
        case 4:
            label1.log('plain text', dt.getSeconds());
            break;
    };

}, 500);

var label2 = debugLabel({
    onResize: function(width, height) {
        this.log('Window Size:', '<' + width + ',', height + '>');
    }
});

label2.style.right = 0;
label2.cell.style.textAlign = 'right';
label2.cell.style.color = 'MistyRose';

