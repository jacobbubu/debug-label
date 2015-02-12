"use strict";

var domready = require('domready');
var encode = require('he').encode
var idCounter = 0;

var colorSchema = {
    debug: 'blue',
    info: 'green',
    warn: 'yellow',
    error: 'red'
};

var prefixSchema = {
    debug: 'debug',
    info: '&nbsp;info',
    warn: '&nbsp;warn',
    error: 'error'
};

var realSpace = String.fromCharCode(160);

var output = function() {
    var args = Array.prototype.slice.call(arguments);
    var label = this,
        prefix = prefixSchema[args[0]],
        text = args.slice(1).join(' ');
    var spanStyle = 'style="color: ' + colorSchema[args[0]] + ';"';

    if (!text) text = ' ' // use a blank character to keep the div's height
    text = text.replace(' ', realSpace);
    label.innerHTML = '<span ' + spanStyle + '>' + prefix + '</span>' + '&nbsp;' + encode(text);
};

var log = function() {
    var label = this,
        text = Array.prototype.slice.call(arguments).join(' ');
    if (!text) text = ' ' // use a blank character to keep the div's height
    text = text.replace(' ', realSpace);
    label.innerHTML = encode(text);
};

module.exports = function(options) {
    options = options||{};

    var debugLabelId;
    if (typeof options.id === 'string')
        debugLabelId = options.id;
    else
        debugLabelId = 'debugLabel' + idCounter++;

    var css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = 'div.debugLabelContainer {\n' +
        '    display: block;\n' +
        '    position: fixed;\n' +
        '    padding: 4px 6px;\n' +
        '    margin: 0;\n' +
        '    box-shadow: 0px 0px 15px #ccc;\n' +
        '    background-color: rgba(0, 0, 0, 0.85);\n' +
        '}\n' +
        'div.debugLabelContainer:hover {\n' +
        '   box-shadow: 0px 0px 20px #aaa;\n' +
        '}\n' +
        'div.debugLabelContainer .debugLabelTable {\n' +
        '    display: table;\n' +
        '    width: 100%;\n' +
        '}\n' +
        'div.debugLabelContainer .debugLabelCell {\n' +
        '    display: table-cell;\n' +
        '    cursor: text;\n' +
        '    text-align: left;\n' +
        '    vertical-align: middle;\n' +
        '    font-family: "Lucida Console", Monaco, monospace;\n' +
        '    font-size: 1em;\n' +
        '    overflow: hidden;\n' +
        '    color: white;\n' +
        '    box-shadow: none;\n' +
        '}';

    var debugLabelContainer = document.createElement('div');
    debugLabelContainer.setAttribute('class', 'debugLabelContainer');
    debugLabelContainer.setAttribute('id', debugLabelId);
    debugLabelContainer.style.bottom = '0px'
    debugLabelContainer.style.left = '0px'

    var debugLabelTable = document.createElement('div');
    debugLabelTable.setAttribute('class', 'debugLabelTable');

    var debugLabelCell = document.createElement('div');
    debugLabelCell.setAttribute('class', 'debugLabelCell');
    debugLabelTable.appendChild(debugLabelCell);

    debugLabelContainer.appendChild(debugLabelTable);

    debugLabelCell.innerHTML = realSpace;
    debugLabelContainer.log = log.bind(debugLabelCell);
    debugLabelContainer.debug = output.bind(debugLabelCell, 'debug');
    debugLabelContainer.info = output.bind(debugLabelCell, 'info');
    debugLabelContainer.warn = output.bind(debugLabelCell, 'warn');
    debugLabelContainer.error = output.bind(debugLabelCell, 'error');
    debugLabelContainer.cell = debugLabelCell;

    var onReady = (typeof options.onReady === 'function') ? options.onReady.bind(debugLabelContainer) : null;
    var onResize = (typeof options.onResize === 'function') ? options.onResize.bind(debugLabelContainer) : null;

    domready(function() {
        document.head.appendChild(css);
        document.body.appendChild(debugLabelContainer);
        if (onResize) {
            window.addEventListener('resize', function(){
                onResize(window.innerWidth, window.innerHeight);
            });
            onResize(window.innerWidth, window.innerHeight);
        };
        if (onReady) onReady();
    });
    return debugLabelContainer;
};