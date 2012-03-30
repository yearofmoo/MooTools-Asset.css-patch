# MooTools - Asset.css-patch

This plugin is a working patch for MooTools 1.2 and 1.3 for the Asset.stylesheet to support the **onLoad** and **onError** events.

IE and Opera both natively support onload and onerror events, so this patch is for the remaining browsers.

# Requirements

- MooTools Core 1.2+
- MooTools More (Assets)

# Usage

The tool itself doesn't change anything. Continue to use Asset.stylesheet as you would normally:

```javascript
Asset.css('/path/to/file.css',{
  onload : function() { ... },
  onerror : function() { ... }
});
```

# Almost 100%

The Asset.css-patch supports the following:
- Loading a local CSS file (within the origin)

# More Info

Full explanation and demo found at

http://yearofmoo.com/2011/07/mootools-asset-stylesheet-onload-event-patch/
