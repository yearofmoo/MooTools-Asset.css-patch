if(!Browser.ie && !Browser.opera) {

  Asset.stylesheet = function(path,options) {

    options = options || {};
    options.href = path;
    options.type = 'text/css';
    options.rel = 'stylesheet';

    this.id = options.id;
    if(!this.id) {
      this.id = options.id = 'Asset.stylesheet-'+$stamp();
    }
    this.element = new Element('link',options).inject(document.getElementsByTagName('head')[0]);
    var onload = options.onload || function() { };

    var delay = 100;
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
      }

      this.timer = this.checker.delay(delay,this);
    }.bind(this));
    this.timer = this.checker.delay(1,this);
  }

}
