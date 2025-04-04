document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');

    // Abre/fecha menu
    hamburger.addEventListener('click', function() {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
    });

    // Fecha menu ao clicar nos links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Remove se estiver usando âncoras
            hamburger.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Adicione esta linha se quiser rolar suave:
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });
});