const menuToggle = document.querySelector('#menuToggle');
const mainNav = document.querySelector('#mainNav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.textContent = '☰';
}));
document.querySelector('#year').textContent = new Date().getFullYear();

const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightboxImage');
function closeLightbox() { lightbox.hidden = true; lightboxImage.src = ''; document.body.style.overflow = ''; }
document.querySelectorAll('.gallery-item').forEach(item => item.addEventListener('click', () => {
  lightboxImage.src = item.dataset.image;
  lightboxImage.alt = item.querySelector('img').alt;
  lightbox.hidden = false; document.body.style.overflow = 'hidden';
  document.querySelector('#closeLightbox').focus();
}));
document.querySelector('#closeLightbox').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });

// El número real de WhatsApp se configura cuando el negocio lo proporcione.
const WHATSAPP_NUMBER = '';
const quoteForm = document.querySelector('#quoteForm');
const formMessage = document.querySelector('#formMessage');
quoteForm.addEventListener('submit', event => {
  event.preventDefault();
  if (!quoteForm.reportValidity()) return;
  const data = new FormData(quoteForm);
  const lines = [
    '¡Hola, DecoracionesNithebia! Quisiera consultar por una decoración.',
    `Nombre: ${data.get('name')}`,
    `Teléfono: ${data.get('phone')}`,
    `Evento: ${data.get('eventType')}`,
    data.get('eventDate') ? `Fecha: ${data.get('eventDate')}` : '',
    data.get('budget') ? `Presupuesto: ${data.get('budget')}` : '',
    data.get('location') ? `Lugar: ${data.get('location')}` : '',
    data.get('details') ? `Detalles: ${data.get('details')}` : ''
  ].filter(Boolean).join('\n');
  if (!WHATSAPP_NUMBER) {
    formMessage.textContent = '¡Formulario listo! Para enviarlo directamente, falta configurar el número de WhatsApp del negocio. Por ahora puedes copiar los datos del formulario y contactarnos cuando se habilite el número.';
    let preview = document.querySelector('#messagePreview');
    if (!preview) {
      preview = document.createElement('textarea'); preview.id = 'messagePreview'; preview.readOnly = true; preview.rows = 6; preview.className = 'message-preview'; preview.setAttribute('aria-label', 'Mensaje preparado');
      formMessage.after(preview);
      const copy = document.createElement('button'); copy.type = 'button'; copy.className = 'button button-primary'; copy.textContent = 'Copiar mensaje'; copy.style.marginTop = '8px'; copy.addEventListener('click', async () => { try { await navigator.clipboard.writeText(preview.value); copy.textContent = 'Mensaje copiado ✓'; } catch { preview.select(); document.execCommand('copy'); copy.textContent = 'Mensaje seleccionado para copiar'; } });
      preview.after(copy);
    }
    preview.value = lines;
    return;
  }
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`, '_blank', 'noopener,noreferrer');
});
