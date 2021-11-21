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
          description: 'Celular de Tienda e-commerce',
          picture_url: image,
          unit_price: +price,
          quantity: +unit,
        },
      ],
      payer: {
        name: 'Lalo',
        surname: 'Landa',
        email: '97bde90d-a43c-4c95-9e6b-a6959ada7dcf@email.webhook.site',
        phone: {
          area_code: '55',
          number: Number('98529-8743'),
        },
        identification: {
          type: 'CPF',
          number: '19119119100',
        },
        address: {
          street_name: 'Insurgentes Sur',
          street_number: 1602,
          zip_code: '78134-190',
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
      external_reference: 'fabiosk881@gmail.com',
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
