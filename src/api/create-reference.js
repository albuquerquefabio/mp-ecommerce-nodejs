const mercadopago = require('mercadopago');

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
  access_token:
    'TEST-5125011723873109-061202-994eb5ad480aed2de6c316735318f23a-170122687',
});

exports.route = async (app) => {
  app.post('/api/create-reference', async (req, res) => {
    const { image, title, price, unit, origin } = req.body;

    let preference = {
      items: [
        {
          id: '1234',
          title: title,
          picture_url: image,
          unit_price: +price,
          quantity: +unit,
        },
      ],
      payer: {
        name: 'João',
        surname: 'Silva',
        email: '97bde90d-a43c-4c95-9e6b-a6959ada7dcf@email.webhook.site',
        phone: {
          area_code: '11',
          number: 44444444,
        },
        // identification: {
        //   type: 'CPF',
        //   number: '19119119100',
        // },
        address: {
          street_name: 'Street',
          street_number: 123,
          zip_code: '06233200',
        },
      },
      back_urls: {
        success: 'http://localhost:8080/feedback',
        failure: 'http://localhost:8080/feedback',
        pending: 'http://localhost:8080/feedback',
      },
      auto_return: 'all',
      payment_methods: {
        excluded_payment_methods: [
          {
            id: 'amex',
          },
        ],
        installments: 6,
      },
      notification_url:
        'https://webhook.site/97bde90d-a43c-4c95-9e6b-a6959ada7dcf',
      statement_descriptor: 'Tienda e-commerce',
      external_reference: 'Reference_1234',
      expires: false,
    };

    try {
      const response = await mercadopago.preferences.create(preference);
      console.log(response.body);
      res.send(response.body);
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  });
};
