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

    // ==========================================
    // 2. DARK MODE TOGGLE FUNCTIONALITY
    // ==========================================
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;

    // Check the browser's local storage to see if the user previously chose dark mode
    const currentTheme = localStorage.getItem('theme');
    
    // If they did, apply the dark mode class immediately and change the icon
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️'; // Change moon to sun
    }

    // Listen for clicks on the dark mode button
    darkModeToggle.addEventListener('click', () => {
        // Toggle the 'dark-mode' class on the body tag
        body.classList.toggle('dark-mode');

        // Check if dark mode is now on or off, update the icon, and save to storage
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark'); // Save preference
            darkModeToggle.textContent = '☀️';     // Show sun icon for light mode
        } else {
            localStorage.setItem('theme', 'light'); // Save preference
            darkModeToggle.textContent = '🌙';      // Show moon icon for dark mode
        }
    });
});
