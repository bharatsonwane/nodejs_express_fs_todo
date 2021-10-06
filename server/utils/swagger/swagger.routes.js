const express = require('express');
const router = express.Router({ mergeParams: true });
const swaggerUi = require('swagger-ui-express');

// const swaggerDocument = require('./docs/test/swagger.json');
// const swaggerDocument = require('./docs/test/swaggerReferenceDoNotDelete');
const swaggerDocument = require('./docs/index');

router.use('/swagger', function (req, res, next) {
  swaggerDocument.host = req.get('host');
  req.swaggerDoc = swaggerDocument;
  next();
}, swaggerUi.serve, swaggerUi.setup());

router.use('/api-docs', function (req, res, next) {
  swaggerDocument.host = req.get('host');
  res.send(swaggerDocument);
});

router.use("/test", function (req, res, next) {
  res.send(`<html><body><h1>nodejs_express_fs project testing.</h1></body></html>`)
})

module.exports = router;
