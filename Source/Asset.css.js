if(!Browser.ie && !Browser.opera) {

(function() {

  var T = typeOf;
  if(!T) {
    T = $type;
  }

  var delay = 100;
  var maxTries = 100;

  Asset.css = function(path,options) {

    if(T(options) == 'function') {
      options = {
        onload : options
      }
    }
    else {
      options = options || {};
    }

    options.href = path;
    options.type = 'text/css';
    options.rel = 'stylesheet';

    var onload = options.onload || options.onLoad || function() { };
    var onerror = options.onerror || options.onError || function() { };
    var isFromOrigin = !path.contains('//');
    if(!isFromOrigin) {
      var matches = path.match(/^(.+?:)\/\/(.+?)(:\d+)?(?:\/|\Z)/);
      var protocol = matches[1].toLowerCase();
      var hostname = matches[2].toLowerCase();
      var port = matches[3] || '';
      isFromOrigin = protocol == window.location.protocol && hostname == window.location.hostname.toLowerCase() && (window.location.port || '') == port;
    }

    var id = options.id;
    if(!id) {
      id = options.id = 'Asset.css-' + Number(0,1000) + '-' + (new Date().getTime());
    }

    this.element = new Element('link',options).inject(document.getElementsByTagName('head')[0]);

    var tries = 0;
    this.checker = (function() {
      clearInterval(this.timer);

      var sheets = document.styleSheets;
      for(var i=0;i<sheets.length;i++) {
        var file = sheets[i];
        var owner = file.ownerNode ? file.ownerNode : file.owningElement;
        if(owner && owner.id == id) {
          var pass = true;

          if(isFromOrigin) {
            var rules = file.cssRules ? 'cssRules' : 'rules';
            pass = file[rules] && file[rules].length > 0;
          }
          else if(!Browser.firefox) {
            var rules = file.cssRules ? 'cssRules' : 'rules';
            try {
              pass = !(file[rules].length == 0);
            }
            catch(e) { }
          }

         if(pass) {
            onload.apply(this.element);
          }
          else {
            onerror.apply(this.element);
          }
          return;
        }

        tries++;
        if(tries >= maxTries) {
          onerror.apply(this.element);
          return;
        }
      }

      this.timer = this.checker.delay(delay,this);

    }.bind(this));

    this.timer = this.checker.delay(1,this);
  }

})();

}
