var
  span  = require('span'),
  stats = { responses: [] };

module.exports = function (options) {
  var defaultOptions = {
    url        : '/health',
    cacheSize  : 100,
    appVersion : 'unknown',
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
    if (req.url == options.url) {
      res.send({
        status            : options.statusCheck(req, res),
        pid               : process.pid,
        uptime            : span(process.uptime() * 1000),
        response_time_avg : Math.round(avg(stats.responses))+'ms',
        env               : process.env.NODE_ENV,
        memory            : process.memoryUsage(),
        node              : process.versions
      });
    } else {
      res.on('finish', function(data) {
        // get the response time and strip off the "ms"
        var responseTime = res.get('x-response-time').slice(0, -2);
        if (stats.responses.length == options.cacheSize) {
          stats.responses.shift();
        }
        stats.responses.push(responseTime);
      });
      return next();
    }
  };
};


// Averages the sum of all elements in an array:
var avg = function(array) {
  var sum = 0;
  for (var i = array.length - 1; i >= 0; i--) {
    sum = sum + parseInt(array[i], 10);
  }
  return sum / array.length;
};
