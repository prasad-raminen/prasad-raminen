// Tracking script for user interactions
document.addEventListener('DOMContentLoaded', function() {
    // Track page view when the page loads
    logEvent('view', 'page', document.title);
    
    // Track all click events
    document.addEventListener('click', function(event) {
        // Get the clicked element
        const element = event.target;
        
        // Determine what type of element was clicked
        let objectType = getElementType(element);
        
        // Log the click event
        logEvent('click', objectType, getElementDescription(element));
    });
    
    // Function to log events to console
    function logEvent(eventType, objectType, description) {
        const timestamp = new Date().toISOString();
        console.log(`${timestamp}, ${eventType}, ${objectType}${description ? ' - ' + description : ''}`);
    }
    
    // Function to determine element type
    function getElementType(element) {
        // Check tag name
        const tagName = element.tagName.toLowerCase();
        
        // Check for images
        if (tagName === 'img') {
            return 'image';
        }
        
        // Check for links
        if (tagName === 'a') {
            // Check if it's the CV download link
            if (element.classList.contains('cv-button')) {
                return 'CV download';
            }
            return 'link';
        }
        
        // Check for navigation items
        if (element.closest('nav')) {
            return 'navigation';
        }
        
        // Check for profile section
        if (element.closest('#about')) {
            if (element.closest('.profile-image')) {
                return 'profile picture';
            }
            if (element.closest('.about-text')) {
                return 'about text';
            }
            if (element.closest('.birthplace-gallery')) {
                return 'birthplace image';
            }
        }
        
        // Check for education section
        if (element.closest('#education')) {
            return 'education info';
        }
        
        // Check for skills section
        if (element.closest('#skills')) {
            if (element.closest('.skill-item')) {
                return 'skill item';
            }
            return 'skills section';
        }
        
        // Check for contact section
        if (element.closest('#contact')) {
            return 'contact info';
        }
        
        // Default
        return tagName;
    }
    
    // Function to get meaningful description of the element
    function getElementDescription(element) {
        // For images, use alt text or src filename
        if (element.tagName.toLowerCase() === 'img') {
            return element.alt || element.src.split('/').pop();
        }
        
        // For links, use the text or href
        if (element.tagName.toLowerCase() === 'a') {
            return element.textContent.trim() || element.href;
        }
        
        // For text elements, use the text content (abbreviated)
        const text = element.textContent.trim();
        if (text) {
            return text.length > 30 ? text.substring(0, 30) + '...' : text;
        }
        
        // Default
        return '';
    }
    
    // Log initial page view events for major sections
    const sections = ['about', 'education', 'skills', 'contact'];
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element && isElementInViewport(element)) {
            logEvent('view', section + ' section', '');
        }
    });
    
    // Add scroll event listener to track when sections come into view
    let viewedSections = {};
    window.addEventListener('scroll', function() {
        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element && isElementInViewport(element) && !viewedSections[section]) {
                viewedSections[section] = true;
                logEvent('view', section + ' section', '');
            }
        });
    });
    
    // Function to check if an element is in the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
});
