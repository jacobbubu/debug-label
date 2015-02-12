# debug-label

This module provides a very simple debug label for your demos and prototypes up and running. Ideal for use with Beefy.

# Example

```js
var debugLabel = require('debug-label');
var label = debugLabel({
    onResize: function(width, height) {
        label.info(width, height);
    }
});
```

## apis

```js
label.log('plain text', Date.now());
label.debug('size', window.innerWidth, window.innerHeight);
label.info('size', window.innerWidth, window.innerHeight);
label.warn('size', window.innerWidth, window.innerHeight);
label.error('size', window.innerWidth, window.innerHeight);
```

### change the styles

```js
label.style.right = 0;
label.cell.style.textAlign = 'right';
label2.cell.style.color = 'MistyRose';
```

# play with beefy

Clone to your computer.

```
git clone https://github.com/jacobbubu/debug-label.git debug-label
cd debug-label
npm install
```

And then:

```
npm start demo/demo.js
```

And open up `localhost:9966` in your browser.

Also, you could try

```
npm start demo/multiLabelsWithStyles.js
```