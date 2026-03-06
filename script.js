// Simple interactivity for nav toggle and year
const nav = document.getElementById('nav');
const navToggle = document.getElementById('navToggle');
const yearEl = document.getElementById('year');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// Close nav on small screens when a link is clicked
nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') nav.classList.remove('open');
});

yearEl.textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.carousel-track');
  const images = Array.from(track.querySelectorAll('.carousel-img'));
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let currentIndex = 0;

  // Actualiza el carousel con animación de fade
  function updateCarousel() {
    images.forEach((img, i) => {
      if (i === currentIndex) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  }

  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  // Inicializar: mostrar la primera imagen como activa
  images[0].classList.add('active');
  // Menú desplegable
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  navToggle.addEventListener('click', function () {
    nav.classList.toggle('nav-open');
  });
  // Marcar el link activo según la página actual o sección visible
  const navLinks = document.querySelectorAll('.nav a');
  const sections = document.querySelectorAll('section[id]');
  const currentPage = window.location.pathname;

  function updateActiveLink() {
    let currentSection = '';
    
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      
      // Si estamos en about.html, activar el link a about.html
      if (currentPage.includes('about.html') && href === 'about.html') {
        link.classList.add('active');
      }
      // Si estamos en index.html, activar según la sección visible
      else if (currentPage.includes('index.html') || currentPage === '/' || !currentPage.includes('about')) {
        if (href === `#${currentSection}` && currentSection !== '') {
          link.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Ejecutar al cargar la página
});
