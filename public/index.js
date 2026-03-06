// Wait for the HTML document to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. MOBILE MENU (HAMBURGER) FUNCTIONALITY
    // ==========================================
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const navLinksContainer = document.querySelector('.nav-links-container');
    const navLinks = document.querySelectorAll('.nav-links');
    const hamburgerIcon = hamburgerBtn.querySelector('i'); // Gets the FontAwesome icon

    // Listen for clicks on the hamburger button
    hamburgerBtn.addEventListener('click', () => {
        // Toggle the 'active' class on both the button and the menu container
        hamburgerBtn.classList.toggle('active');
        navLinksContainer.classList.toggle('active');

        // Swap the FontAwesome icon between 'bars' (hamburger) and 'xmark' (close)
        if (hamburgerIcon.classList.contains('fa-bars')) {
            hamburgerIcon.classList.remove('fa-bars');
            hamburgerIcon.classList.add('fa-xmark');
        } else {
            hamburgerIcon.classList.remove('fa-xmark');
            hamburgerIcon.classList.add('fa-bars');
        }
    });

    // Close the menu automatically when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Remove the 'active' class to hide the menu
            hamburgerBtn.classList.remove('active');
            navLinksContainer.classList.remove('active');
            
            // Reset the icon back to the hamburger bars
            hamburgerIcon.classList.remove('fa-xmark');
            hamburgerIcon.classList.add('fa-bars');
        });
    });

    
