if(!Browser.ie && !Browser.opera) {

(function() {

  var delay = 100;
  var maxTries = 100;

  Asset.stylesheet = function(path,options) {

    options = options || {};
    options.href = path;
    options.type = 'text/css';
    options.rel = 'stylesheet';

    var onload = options.onload || options.onLoad || function() { };
    var onload = options.onerror || options.onError || function() { };
    var onrequest = options.onrequest || options.onRequest || function() { };

    this.id = options.id;
    if(!this.id) {
      this.id = options.id = 'Asset.stylesheet-'+$stamp();
    }

    onrequest();
    this.element = new Element('link',options).inject(document.getElementsByTagName('head')[0]);

    var tries = 0;
    this.checker = (function() {
      clearInterval(this.timer);

      var sheets = document.styleSheets;
      for(var i=0;i<sheets.length;i++) {
        var file = sheets[i];
        var owner = file.ownerNode ? file.ownerNode : file.owningElement;
        if(owner && owner.id == this.id) {
          onload();
          return;
        }
        tries++;
        if(tries >= maxTries) {
          onerror();
          return;
        }
      }

      this.timer = this.checker.delay(delay,this);

    }.bind(this));

    this.timer = this.checker.delay(1,this);
  }

})();

}
