document.addEventListener('DOMContentLoaded', () => {
    // Slider functionality
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        stopAutoSlide();
        slideInterval = setInterval(nextSlide, 5000); // changes slide every 5 seconds
    }

    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoSlide(); // reset timer on user interaction
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoSlide(); // reset timer on user interaction
        });
    }

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            showSlide(idx);
            startAutoSlide(); // reset timer on user interaction
        });
    });

    // Start auto slide initially
    if (slides.length > 0) {
        startAutoSlide();
    }

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    const movieCards = document.querySelectorAll('.movie-card');
    const movieGrid = document.querySelector('.movie-grid');

    // Create a "No movies found" message block
    let noResultsMsg = document.createElement('div');
    noResultsMsg.className = 'no-results';
    noResultsMsg.innerHTML = `
        <div class="no-results-content">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <p>No movies match your search.</p>
        </div>
    `;
    noResultsMsg.style.display = 'none';
    
    // Add noResultsMsg in the main content or insert it in the DOM
    if (movieGrid) {
        movieGrid.parentNode.insertBefore(noResultsMsg, movieGrid.nextSibling);
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            let visibleCount = 0;

            movieCards.forEach(card => {
                const title = card.querySelector('.movie-info h3').textContent.toLowerCase();
                const category = card.querySelector('.movie-info p').textContent.toLowerCase();

                if (title.includes(query) || category.includes(query)) {
                    card.classList.remove('hidden');
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                }
            });

            // Adjust grid formatting when layout changes
            if (visibleCount === 0) {
                movieGrid.style.display = 'none';
                noResultsMsg.style.display = 'block';
            } else {
                movieGrid.style.display = 'flex';
                noResultsMsg.style.display = 'none';
            }
        });
    }
});
