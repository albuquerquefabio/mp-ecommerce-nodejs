const mercadopago = require('mercadopago');

// REPLACE WITH YOUR ACCESS TOKEN AVAILABLE IN: https://developers.mercadopago.com/panel
mercadopago.configure({
  access_token:
    'APP_USR-334491433003961-030821-12d7475807d694b645722c1946d5ce5a-725736327', //Test User
  integrator_id: 'dev_24c65fb163bf11ea96500242ac130004', // Test User
});

exports.route = async (app) => {
  app.post('/api/create-reference', async (req, res) => {
    const { image, title, price, unit, origin } = req.body;

    const dateFrom = new Date().toISOString();
    new Date().setHours(new Date().getHours() - 4);
    const dateTo = new Date(
      new Date().setDate(new Date().getDate() + 3)
    ).toISOString();
    let preference = {
      items: [
        {
          id: '1234',
          title: title,
          description: 'Celular de Tienda e-commerce',
          category_id: 'smartphone',
          picture_url: image,
          unit_price: +price,
          quantity: +unit,
          currency_id: 'BRL',
        },
      ],
      payer: {
        name: 'Lalo',
        surname: 'Landa',
        email: 'test_user_92801501@testuser.com',
        phone: {
          area_code: '55',
          number: Number('98529-8743'),
        },
        // identification: {
        //   type: 'CPF',
        //   number: '19119119100',
        // },
        address: {
          street_name: 'Insurgentes Sur',
          street_number: 1602,
          zip_code: '78134-190',
        },
      },
      back_urls: {
        success: `${origin}/feedback-success`,
        failure: `${origin}/feedback-failure`,
        pending: `${origin}/feedback-pending`,
      },
      auto_return: 'approved',
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
      date_of_expiration: dateTo.replace('Z', '-04:00'),
      // expiration_date_from: dateFrom.replace('Z', '-04:00'),
      // expiration_date_to: dateTo.replace('Z', '-04:00'),
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
