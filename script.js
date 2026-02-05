// Menu hamburguesa
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        // Reflect state in aria-expanded for accessibility
        hamburger.setAttribute('aria-expanded', String(isOpen));
        if (!isOpen) {
            // ensure focusable elements inside menu are not accidentally focused when closed
            hamburger.focus();
        }
    });
}

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
    });
});

// Manejo del formulario de contacto
function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const nombre = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const telefono = form.querySelector('input[type="tel"]').value;
    const mensaje = form.querySelector('textarea').value;
    
    // Simular envío del formulario
    console.log('Formulario enviado:', { nombre, email, telefono, mensaje });
    
    // Mostrar mensaje de éxito
    alert('¡Gracias por tu solicitud! Nos pondremos en contacto pronto.');
    form.reset();
}

// Manejo del formulario de newsletter
function handleNewsletterSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    
    console.log('Suscripción a newsletter:', { email });
    alert('¡Gracias por suscribirte! Recibirás nuestras novedades.');
    form.reset();
}

// Efecto de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Animación al hacer scroll (lazy loading de elementos)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos de galería y tarjetas
document.querySelectorAll('.galeria-item, .coleccion-card, .servicio-item, .testimonio-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Cambiar navbar al hacer scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = 'var(--shadow)';
    }
});

// Carousel: autoplay, controls, indicators, swipe and accessibility
(function () {
    const carousel = document.getElementById('servicesCarousel');
    if (!carousel) return;

    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const prevBtn = carousel.querySelector('.carousel-btn--prev');
    const nextBtn = carousel.querySelector('.carousel-btn--next');
    const indicators = Array.from(carousel.querySelectorAll('.carousel-indicator'));

    let current = 0;
    const total = slides.length;
    const AUTOPLAY_MS = 4000;
    let timer = null;
    let isPaused = false;

    function updatePosition() {
        // slides are 100% width each
        track.style.transform = `translateX(-${current * 100}%)`;
        indicators.forEach((btn, i) => btn.setAttribute('aria-selected', String(i === current)));
        slides.forEach((s, i) => s.setAttribute('aria-hidden', String(i !== current)));
    }

    function goTo(index) {
        current = ((index % total) + total) % total;
        updatePosition();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAutoplay() {
        if (timer) return;
        timer = setInterval(() => { if (!isPaused) next(); }, AUTOPLAY_MS);
    }

    function stopAutoplay() {
        if (!timer) return;
        clearInterval(timer);
        timer = null;
    }

    function restartAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Controls
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); restartAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restartAutoplay(); });

    // Indicators
    indicators.forEach((btn, i) => {
        btn.addEventListener('click', () => { goTo(i); restartAutoplay(); });
        btn.setAttribute('role', 'tab');
    });

    // Pause on hover / focus
    carousel.addEventListener('mouseenter', () => { isPaused = true; });
    carousel.addEventListener('mouseleave', () => { isPaused = false; });
    carousel.addEventListener('focusin', () => { isPaused = true; });
    carousel.addEventListener('focusout', () => { isPaused = false; });

    // Touch / swipe support
    let touchStartX = 0;
    let touchDeltaX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchDeltaX = 0;
    }, { passive: true });

    carousel.addEventListener('touchmove', (e) => {
        touchDeltaX = e.touches[0].clientX - touchStartX;
    }, { passive: true });

    carousel.addEventListener('touchend', () => {
        if (Math.abs(touchDeltaX) > 50) {
            if (touchDeltaX < 0) next(); else prev();
            restartAutoplay();
        }
        touchStartX = 0; touchDeltaX = 0;
    });

    // Keyboard navigation when carousel or its controls have focus
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { prev(); restartAutoplay(); }
        if (e.key === 'ArrowRight') { next(); restartAutoplay(); }
    });

    // Make sure layout responds on resize
    window.addEventListener('resize', updatePosition);

    // Initialize accessibility attributes and start
    slides.forEach((s, i) => {
        s.setAttribute('role', 'group');
        s.setAttribute('aria-roledescription', 'slide');
        s.setAttribute('aria-label', `${i + 1} de ${total}`);
        s.setAttribute('aria-hidden', String(i !== current));
    });
    carousel.setAttribute('aria-live', 'polite');

    updatePosition();
    startAutoplay();
})();

console.log('Script de Bordados Castellanos cargado correctamente');
