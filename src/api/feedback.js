exports.route = async (app) => {
  app.get('/feedback', function (req, res) {
    console.dir(req.query);
    res.json({
      Payment: req.query.payment_id,
      Status: req.query.status,
      MerchantOrder: req.query.merchant_order_id,
    });
  });
};
