# MooTools - Asset.stylesheet-patch

This plugin is a working patch for MooTools 1.2 and 1.3 for the Asset.stylesheet to support the onload and onerror events.

# Requirements

- MooTools Core 1.2+
- MooTools More (Assets)

# Usage

The tool itself doesn't change anything. Continue to use Asset.stylesheet as you would normally:
```javascript
Asset.stylesheet('/path/to/file.css',{
  onload : function() { ... },
  onerror : function() { ... }
});
```

## More Info

Full explanation and demo found at

http://yearofmoo.com/2011/07/mootools-asset-stylesheet-onload-event-patch/
