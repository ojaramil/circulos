document.addEventListener('DOMContentLoaded', function() {
  const container = document.getElementById('site-header');
  if (container) {
    fetch('/templates/base.html')
      .then(response => response.text())
      .then(data => {
        container.innerHTML = data;
      })
      .catch(err => console.error('Error cargando la cabecera:', err));
  }
});
