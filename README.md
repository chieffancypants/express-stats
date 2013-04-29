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
  app.use(stats({app:app}));
  app.use(app.router);
});

// Start server
app.listen(3000, function() {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

```

## License 
MIT License: See the [LICENSE](https://github.com/chieffancypants/express-stats/blob/master/LICENSE) file.