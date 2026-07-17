document.addEventListener('DOMContentLoaded', function () {

  // Ouvre / ferme le menu sur mobile
  var menuToggle = document.getElementById('menuToggle');
  var mainNav = document.getElementById('mainNav');

  menuToggle.addEventListener('click', function () {
    var isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  // Redirige vers la version FR ou EN de la MEME page
  var langSelect = document.getElementById('lang');

  langSelect.addEventListener('change', function () {
    var path = window.location.pathname;
    var isFr = path.indexOf('/fr') === 0;
    var target;

    if (this.value === 'fr') {
      target = isFr ? path : '/fr' + path;
    } else {
      target = isFr ? (path.replace(/^\/fr/, '') || '/') : path;
    }

    window.location.href = target;
  });

});



 // Form mail 
document.addEventListener('DOMContentLoaded', function () {

  var form = document.getElementById('contactForm');
  if (!form) return; // ce script ne s'exécute que sur la page contact

  var status = document.getElementById('formStatus');
  var submitBtn = document.getElementById('submitBtn');
  var isFr = document.documentElement.lang === 'fr';

  var messages = {
    sending: isFr ? 'Envoi en cours...' : 'Sending...',
    success: isFr
      ? 'Merci ! Votre message a bien été envoyé — je vous répondrai rapidement.'
      : "Thanks! Your message has been sent — I'll get back to you soon.",
    error: isFr
      ? "Une erreur s'est produite. Merci de réessayer ou de m'écrire directement par email."
      : 'Something went wrong. Please try again or email me directly.',
    send: isFr ? 'Envoyer le message' : 'Send message'
  };

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = messages.sending;
    status.textContent = '';
    status.className = 'form-status';

    var formData = new FormData(form);

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData
    })
      .then(function (response) { return response.json(); })
      .then(function (data) {
        if (data.success) {
          status.textContent = messages.success;
          status.classList.add('form-status--success');
          form.reset();
        } else {
          status.textContent = messages.error;
          status.classList.add('form-status--error');
        }
      })
      .catch(function () {
        status.textContent = messages.error;
        status.classList.add('form-status--error');
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = messages.send;
      });
  });

});