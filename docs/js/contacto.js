document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // evita el reload
  
    const headers = new Headers();
    headers.append('content-type', 'multipart/form-data');

    const form = e.target;
    const data = new FormData();
    const body = form.full_name.value + "<br>" + form.Email.value + "<br>" + form.website.value + "<br>" + form.message.value;
    
    data.append('Asunto', "Contacto WEB WMS");
    data.append('bodyWhitutHtml', body);
    data.append('Body', body);

  
    fetch('https://api.dev.liberasoft.cloud/mail/SEND_contact', {
      method: 'POST',
      body: data,   
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en el envío');
      }
      return response.json();
    })
    .then(result => {
      form.style.display = 'none';
      document.getElementById('success-message').style.display = 'block';
      form.reset();
    })
    .catch(error => {
      document.getElementById('respuesta').textContent = 'Hubo un error al enviar el mensaje ❌';
      console.error(error);
    });
  });