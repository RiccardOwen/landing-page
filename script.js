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
  // Carousel functionality
  const track = document.querySelector('.carousel-track');
  if (track) {
    const images = Array.from(track.querySelectorAll('.carousel-img'));
    const carouselPrevBtn = document.querySelector('.carousel-btn.prev');
    const carouselNextBtn = document.querySelector('.carousel-btn.next');
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

    carouselPrevBtn.addEventListener('click', showPrev);
    carouselNextBtn.addEventListener('click', showNext);

    // Inicializar: mostrar la primera imagen como activa
    images[0].classList.add('active');
  }

  // Menú desplegable
  const navToggle2 = document.getElementById('navToggle');
  const nav2 = document.getElementById('nav');
  navToggle2.addEventListener('click', function () {
    nav2.classList.toggle('nav-open');
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
      
      // Si estamos en gallery.html, activar el link a gallery.html
      if (currentPage.includes('gallery.html') && href === 'gallery.html') {
        link.classList.add('active');
      }
      // Si estamos en about.html, activar el link a about.html
      else if (currentPage.includes('about.html') && href === 'about.html') {
        link.classList.add('active');
      }
      // Si estamos en index.html, activar según la sección visible
      else if (currentPage.includes('index.html') || currentPage === '/' || (!currentPage.includes('about') && !currentPage.includes('gallery'))) {
        if (href === `#${currentSection}` && currentSection !== '') {
          link.classList.add('active');
        }
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink(); // Ejecutar al cargar la página

  // Lightbox functionality for gallery
  const gallery = document.getElementById('gallery');
  if (gallery) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeBtn = document.getElementById('closeBtn');
    const lightboxPrevBtn = document.getElementById('prevBtn');
    const lightboxNextBtn = document.getElementById('nextBtn');
    const galleryItems = gallery.querySelectorAll('.gallery-item');
    let currentImageIndex = 0;

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        currentImageIndex = index;
        openLightbox();
      });
    });

    function openLightbox() {
      const img = galleryItems[currentImageIndex].querySelector('img');
      lightboxImage.src = img.src;
      lightboxImage.alt = img.alt;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }

    function showPrevImage() {
      currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
      openLightbox();
    }

    function showNextImage() {
      currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
      openLightbox();
    }

    closeBtn.addEventListener('click', closeLightbox);
    lightboxPrevBtn.addEventListener('click', showPrevImage);
    lightboxNextBtn.addEventListener('click', showNextImage);

    // Cerrar lightbox al hacer click en el fondo
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Navegación con teclas del teclado
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'ArrowLeft') showPrevImage();
      if (e.key === 'ArrowRight') showNextImage();
      if (e.key === 'Escape') closeLightbox();
    });
  }
});
