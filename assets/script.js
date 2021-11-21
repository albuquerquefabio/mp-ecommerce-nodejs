document.addEventListener('DOMContentLoaded', () => {
  const origin = window.location.origin;

  const goHome = document.querySelector('.as-filter-button');
  if (!!goHome)
    goHome.addEventListener(
      'click',
      () => (window.location.href = origin),
      false
    );

  const checkoutBtn = document.querySelector('button#checkout');
  const imageElSrc = document.getElementById('item-image')
    ? document
        .getElementById('item-image')
        .getAttribute('src')
        .replace('./', '')
    : null;
  const image = `${origin}/${imageElSrc}`;
  const title = document.getElementById('item-title')
    ? document.getElementById('item-title').innerText
    : null;
  const price = document.getElementById('item-price')
    ? document.getElementById('item-price').innerText
    : null;
  const total = document.getElementById('item-total')
    ? document.getElementById('item-total').innerText
    : null;
  const unit = document.getElementById('item-unit')
    ? document.getElementById('item-unit').innerText
    : null;

  // show currency
  if (!!price)
    document.getElementById('item-price').innerText = new Intl.NumberFormat(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 2,
        useGrouping: false,
      }
    ).format(+price || 0);
  if (!!total)
    document.getElementById('item-total').innerText = new Intl.NumberFormat(
      'pt-BR',
      {
        style: 'currency',
        currency: 'BRL',
        maximumFractionDigits: 2,
        useGrouping: false,
      }
    ).format(+total || 0);
  if (!!checkoutBtn)
    checkoutBtn.addEventListener(
      'click',
      async () => {
        checkoutBtn.disabled = true;
        checkoutBtn.innerText = 'Aguarde...';
        localStorage.setItem('last-cart', window.location.search);
        const orderData = { image, title, price, unit, origin };
        try {
          const response = await fetch(`${origin}/api/create-reference`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
          });
          const data = await response.json();
          if (!!data.id)
            window.location.href = `${origin}/checkout${window.location.search}&id=${data.id}`;
        } catch (error) {
          alert('Erro ao finalizar pedido.');
          checkoutBtn.disabled = false;
          checkoutBtn.innerText = 'Tentar novamente';

          console.log('Error', error);
        }
      },
      false
    );

  // CHECKOUT

  const goBackBtn = document.getElementById('go-back-btn');
  goBackBtn.addEventListener(
    'click',
    () => {
      const lastCart = localStorage.getItem('last-cart');
      window.location.href = `${origin}/detail${lastCart}`;
    },
    false
  );

  const checkoutId = document.getElementById('checkout-id');
  if (!!checkoutId) {
    console.log(checkoutId.value);
    const mercadopago = new MercadoPago(
      'TEST-8b57ba0c-e87b-4e99-853f-068d44c2a97d',
      {
        locale: 'pt-BR', // The most common are: 'pt-BR', 'es-AR' and 'en-US'
      }
    );

    mercadopago.checkout({
      preference: {
        id: checkoutId.value,
      },
      render: {
        container: '#do-payment', // Class name where the payment button will be displayed
        label: 'Pague a compra', // Change the payment button text (optional)
      },
    });
  }
});
