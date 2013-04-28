
module.exports = function (options) {
  var defaultOptions = {
    url: '/health',
    appVersion: 'unknown',
    statusCheck: function() {
      return 'ok';
    }
  };


  // extend the options with defaults:
  options = options || {};
  for (var i in defaultOptions) {
    if (!options[i] && !options.hasOwnProperty(i)) {
      options[i] = defaultOptions[i];
    }
  }

  return function(req, res, next) {
    // TODO: make a pretty version of this as well as json
    // TODO: add auth
    // TODO: add stats (like avg resp time)

    if (req.url == options.url) {
      res.send({
        status: options.statusCheck(req, res),
        pid: process.pid,
        uptime: process.uptime(),
        NODE_ENV: process.env.NODE_ENV,
        memory: process.memoryUsage(),
        node: process.versions
      });
    } else {
      next();
    }
  };
};
