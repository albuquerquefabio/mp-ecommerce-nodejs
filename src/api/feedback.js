exports.route = async (app) => {
  app.get('/feedback', function (req, res) {
    console.dir(req.query);
    res.json({
      Payment: req.query.payment_id,
      Status: req.query.status,
      MerchantOrder: req.query.merchant_order_id,
    });
  });
  app.get('/feedback-success', (req, res) => {
    console.dir(req.query);
    res.render('success', req.query);
  });
  app.get('/feedback-failure', (req, res) => res.render('failure', req.query));
  app.get('/feedback-pending', (req, res) => res.render('pending', req.query));
};
