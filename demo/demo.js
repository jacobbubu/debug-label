"use strict";

var debugLabel = require('../index.js');

var label = debugLabel({
    onResize: function(width, height) {
        label.info(width, height);
    }
});

label.style.right = 0;
label.cell.style.textAlign = 'right';