Bineos = function (containerId, containerDomain) {
  this.containerId = containerId;
  this.containerDomain = containerDomain;
  this.data = {};
};

Bineos.prototype.set = function (data) {
  if (data instanceof Object) this.data = data;

  return this;
};

Bineos.prototype.overlay = function (data) {
  var self = new Bineos(this.containerId, this.containerDomain);
  self.data = this._clone(this.data);

  if (data instanceof Object) {
    for (var key in data) self.data[key] = data[key];
  }

  return self;
};

Bineos.prototype.send = function (action) {
  if (action === undefined) action = "init";

  var data = this._clone(this.data);
  data["action"] = action;

  var ntmName = "_bineos" + Math.random().toString(16).slice(2);
  window[ntmName] = [data];

  var script = document.createElement("script");
  script.text =
    "(function(n,e,o,r,y){n[r]=n[r]||[];n[r].push({'event':'ntmInit','t':new Date().getTime()});var f=e.getElementsByTagName(o)[0],s=e.createElement(o),d=r!='ntmData'?'&ntmData='+r:'';s.async=true;s.src='http'+(document.location.protocol=='https:'?'s':'')+'://" +
    this.containerDomain +
    "/tm/a/container/init/'+y+'.js?'+d+'&rnd='+Math.floor(Math.random()*100000000);f.parentNode.insertBefore(s,f);})(window,document,'script','" +
    ntmName +
    "','" +
    this.containerId +
    "')";

  var node = document.getElementsByTagName("script")[0];
  node.parentNode.insertBefore(script, node);

  return this;
};

Bineos.prototype._clone = function (obj) {
  if (typeof JSON === "object" && typeof JSON.parse === "function")
    return JSON.parse(JSON.stringify(obj));
};
