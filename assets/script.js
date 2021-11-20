document.addEventListener('DOMContentLoaded', () => {
  const goHome = document.querySelector('.as-filter-button');
  goHome.addEventListener(
    'click',
    () => (window.location.href = window.location.origin),
    false
  );

  const origin = window.location.origin;
  const checkoutBtn = document.querySelector('button#checkout');
  const imageElSrc = document
    .getElementById('item-image')
    .getAttribute('src')
    .replace('./', '');
  const image = `${origin}/${imageElSrc}`;
  const title = document.getElementById('item-title').innerText;
  const price = document.getElementById('item-price').innerText;
  const unit = document.getElementById('item-unit').innerText;

  // show currency
  document.getElementById('item-price').innerText = new Intl.NumberFormat(
    'en-US',
    {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      useGrouping: false,
    }
  ).format(+price || 0);

  checkoutBtn.addEventListener(
    'click',
    async () => {
      const orderData = { image, title, price, unit, origin };
      try {
        const response = await fetch(`${origin}/api/create-reference`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderData),
        });
        console.log(await response.json());
      } catch (error) {
        console.log('Error', error);
      }
    },
    false
  );
});
