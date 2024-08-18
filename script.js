document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");

    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const themeToggleButton = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const icons = document.querySelectorAll('.icon-item i'); // Get all icon elements

    console.log("Burger element:", burger);
    console.log("Nav Links element:", navLinks);
    console.log("Theme Toggle Button:", themeToggleButton);

    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            console.log("Burger clicked");
            navLinks.classList.toggle('nav-active');
            burger.classList.toggle('toggle');
        });
    }

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateIcon(newTheme);
        });
    }

    function updateIcon(theme) {
        const sunIcon = themeToggleButton.querySelector('.fa-sun');
        const moonIcon = themeToggleButton.querySelector('.fa-moon');

        if (sunIcon && moonIcon) {
            if (theme === 'dark') {
                sunIcon.style.display = 'inline';
                moonIcon.style.display = 'none';
            } else {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'inline';
            }
        }
    }

    // Initialize theme and icon on load
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateIcon(currentTheme);

    // Add event listeners to each icon
    icons.forEach(icon => {
        icon.addEventListener('click', () => {
            const targetId = icon.getAttribute('data-target'); // Get target ID from data attribute
            const targetCard = document.querySelector(targetId); // Select the target card

            // script.js
            if (targetCard) {
                // Add highlight class to change color
                targetCard.classList.add('highlight');

                // Smooth scroll to the target card
                targetCard.scrollIntoView({ behavior: 'smooth' });

                // Remove highlight class after 5 seconds
                setTimeout(() => {
                    targetCard.classList.remove('highlight');
                }, 2000); // 5000 milliseconds = 5 seconds
            }


        });
    });

    
})
