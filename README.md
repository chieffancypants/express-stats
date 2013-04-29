# Express-stats
Express middleware that exposes statistical information, status and other useful information to an express-backed application.

This software is currently early alpha -- not all functionality is present and is subject to change.


## Example

```js
var
  express = require('express'),
  stats   = require('express-stats'),
  app     = module.exports = express();

app.configure(function() {
  app.use(express.responseTime());
  app.use(stats());
  app.use(app.router);
});

// Start server
app.listen(3000, function() {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

```

This will output the following json:

```json
{
  "status": "ok",
  "pid": 6674,
  "uptime": "2m 3s",
  "response_time_avg": "62ms",
  "env": "development",
  "memory": {
    "rss": 37130240,
    "heapTotal": 32159232,
    "heapUsed": 18477064
  },
  "node": {
    "http_parser": "1.0",
    "node": "0.10.5",
    "v8": "3.14.5.8",
    "ares": "1.9.0-DEV",
    "uv": "0.10.5",
    "zlib": "1.2.3",
    "modules": "11",
    "openssl": "1.0.1e"
  }
}
```


## License 
MIT License: See the [LICENSE](https://github.com/chieffancypants/express-stats/blob/master/LICENSE) file.