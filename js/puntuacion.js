  /*<!-- SCRIPT DE ESTRELLAS INTERACTIVAS -->*/
    
        const stars = document.querySelectorAll('.rating-stars .star');
        const ratingText = document.getElementById('rating-text');
        let currentRating = 5;

        // Marcado inicial por defecto (5 estrellas)
        updateStars(currentRating);

        stars.forEach(star => {
            star.addEventListener('mouseover', () => {
                const val = parseInt(star.getAttribute('data-value'));
                highlightStars(val);
            });

            star.addEventListener('mouseout', () => {
                updateStars(currentRating);
            });

            star.addEventListener('click', () => {
                currentRating = parseInt(star.getAttribute('data-value'));
                updateStars(currentRating);
                ratingText.textContent = `${currentRating}.0 / 5 ¡Gracias por calificar!`;
            });
        });

        function highlightStars(val) {
            stars.forEach(s => {
                s.classList.toggle('hover', parseInt(s.getAttribute('data-value')) <= val);
            });
        }

        function updateStars(val) {
            stars.forEach(s => {
                s.classList.remove('hover');
                s.classList.toggle('active', parseInt(s.getAttribute('data-value')) <= val);
            });
        }
    