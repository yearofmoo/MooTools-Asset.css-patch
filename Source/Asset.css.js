(function() {

  var isIE = Browser.ie || Browser.Engine.trident;
  var isOpera = Browser.opera || Browser.Engine.presto;
  var delay = 100;
  var maxTries = 50;

  var onReady = function(element,onload,onerror) {
    var file = element.sheet;

    var pass;
    try {
      var rules = file.cssRules ? 'cssRules' : 'rules';
      pass = !(file[rules].length == 0);
    }
    catch(e) {
      pass = true;
    }

    if(file && pass) {
      onload.apply(element);
    }
    else {
      onerror.apply(element);
    }
  };

  if(!isIE && !isOpera) {

    Asset.css = function(path,options) {

      options = options || {};
      options.href = path;
      options.type = 'text/css';
      options.rel = 'stylesheet';

      var onload = options.onload || options.onLoad || function() { };
      var onerror = options.onerror || options.onError || function() { };

      var id = options.id;
      if(!id) {
        var RAND = 1000;
        id = options.id = 'Asset.css-' + Number(0,RAND) + '-' + (new Date().getTime());
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
            onReady(this.element,onload,onerror);
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

  }
  else {
    Asset._css = Asset.css;
    Asset.css = function(path,options) {
      var onload = options.onload || options.onLoad || function() { };
      var onerror = options.onerror || options.onError || function() { };
      var timer = onerror.delay(delay * maxTries);
      Asset._css(path,{
        onload : function() {
          clearTimeout(timer);
          onReady(this,onload,onerror);
        }
      });
    }
  }

})();

