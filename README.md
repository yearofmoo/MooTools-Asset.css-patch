# MooTools - Asset.css-patch

This plugin is a working patch for MooTools 1.2 and 1.3 for the Asset.css to support the **onload** and **onerror** events when downloading css assets.

The existing MooTools code doesn't fully support the onload and onerror events for all browsers. This plugins fixes just that.

## Requirements

- MooTools Core 1.2+ (1.3+ works as well)
- MooTools More (Assets specifically)

## Browser Support

- Works with all browsers.
- Firefox doesn't support the onerror event for a missing css file that is outside the same origin policy
- Opera and IE use timed intervals to check for the onerror event so they may be a bit slower

## Usage

The tool itself doesn't change anything. Continue to use Asset.stylesheet as you would normally:

```javascript
Asset.css('/path/to/file.css',{
  onload : function() { ... },
  onerror : function() { ... }
});
```

## 99.9%

### The Asset.css-patch supports the following:

- **onload** event for a local file (within the same origin policy)
- **onerror** event for a missing local file (within the same origin policy)
- **onload** event for a missing non local file (outside of the same origin policy)
- **onerror** detection for non local files (outside of the same origin policy) **that results in a 404 error** (firefox does not support this)

### The Asset.css-patch **does not support** the following:

- **onerror** event for a missing non local file that is **not a 404 error** (outside of the same origin policy)

More than likely, you will not be downloading any CSS files outside of the same origin policy (unless if its from a static files server under a different domain/subdomain). If that's the case then so long the asset exists on the server and/or there is no custom 404 HTML page for when its not found then you're fine.

## A few things to keep in mind

- In the event that a missing css file is downloaded outside of the same origin policy, the Asset.css script will still fire onload().
- After 100 tries of a 100ms delay (which is 10 seconds) the polling script will fail and will fire the onerror() event.
