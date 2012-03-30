# MooTools - Asset.css-patch

This plugin is a working patch for MooTools 1.2 and 1.3 for the Asset.stylesheet to support the **onLoad** and **onError** events.

IE and Opera both natively support onload and onerror events, so this patch is for the remaining browsers.

## Requirements

- MooTools Core 1.2+
- MooTools More (Assets)

## Usage

The tool itself doesn't change anything. Continue to use Asset.stylesheet as you would normally:

```javascript
Asset.css('/path/to/file.css',{
  onload : function() { ... },
  onerror : function() { ... }
});
```

## Almost 100%

The Asset.css-patch supports the following:

- onload event for a local file (within the same origin)
- onerror event for a missing local file (within the origin)
- onload event for a missing non local file (outside of the same origin policy)


The Asset.css-patch **does not support** the following:

- onerror event for a missing non local file (outside of the same origin policy)


A Few Things to keep in mind:

- In the event that a missing css file is downloaded outside of the same origin policy, the Asset.css script will still fire onload().
- After 100 tries of a 100ms delay (which is 10 seconds) the polling script will fail and will fire the onerror() event.
