document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // Função para fechar o menu
    const closeMenu = () => {
        hamburgerBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('active');
        body.style.overflow = 'auto';
    };

    // Abrir/fechar menu
    hamburgerBtn.addEventListener('click', () => {
        const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
        hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
        body.style.overflow = isExpanded ? 'auto' : 'hidden';
    });

    // Scroll suave + fechar menu
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Impede o comportamento padrão
            closeMenu();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Scroll suave com offset para o header
                window.scrollTo({
                    top: targetElement.offsetTop -0.01,
                    behavior: 'smooth'
                });
            }
        });
    });
    // Detecção de touch
    document.body.classList.add(
        'ontouchstart' in window || navigator.maxTouchPoints > 0 
        ? 'touch' 
        : 'no-touch'
    );

    // Fechar menu ao scrollar (com delay)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (navMenu.classList.contains('active')) {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(closeMenu, 100); // Fecha após 100ms de scroll
        }
    });

    // Fechar menu ao redimensionar
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) closeMenu();
    });
});