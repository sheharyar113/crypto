// script.js

document.addEventListener('DOMContentLoaded', function() {

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800, // Animation duration
        once: true,    // Whether animation should happen only once
        offset: 100,   // Offset (in px) from the original trigger point
    });

    // Initialize particles.js (copied from original)
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 60, // Reduced density slightly
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#3B82F6" // var(--primary-light)
                },
                "shape": {
                    "type": "circle"
                },
                "opacity": {
                    "value": 0.4, // Slightly less opaque
                    "random": true, // Make opacity random
                    "anim": {
                        "enable": true,
                        "speed": 0.5,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 2.5, // Slightly smaller
                    "random": true,
                    "anim": {
                        "enable": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 120, // Slightly shorter links
                    "color": "#3B82F6",
                    "opacity": 0.15, // More subtle links
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1.5, // Slower speed
                    "direction": "none",
                    "random": true, // Random direction
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab" // Changed to grab for subtle effect
                    },
                    "onclick": {
                        "enable": false, // Disabled click effect
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 100, // Shorter grab distance
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                     // Removed other modes not used
                }
            },
            "retina_detect": true
        });
    }


    // --- Navbar Active Link highlighting on scroll --- (Optional but good UX)
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');

    function changeActiveLink() {
        let index = sections.length;
        const offset = 150; // Adjust offset as needed

        while(--index >= 0 && window.scrollY + offset < sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));

        // Check if the corresponding link exists before trying to add 'active'
        let activeLinkFound = false;
        if (index >= 0) {
            const activeSectionId = sections[index].id;
            const activeLink = document.querySelector(`.navbar-nav .nav-link[href="#${activeSectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                activeLinkFound = true;
            }
        }

        // If no section is active (e.g., at the very top), make 'Home' active
        if (!activeLinkFound) {
             const homeLink = document.querySelector('.navbar-nav .nav-link[href="#"]'); // Or specific ID like #home
             if(homeLink) homeLink.classList.add('active');
        }
    }

    // Initial call and event listener
    if (sections.length > 0 && navLinks.length > 0) {
         changeActiveLink(); // Set initial active link
         window.addEventListener('scroll', changeActiveLink);
    }


    // --- Simple chat message simulation --- (Optional: Basic version)
    const chatSendButton = document.querySelector('.chat-send-button');
    const chatInput = document.querySelector('.chat-input');
    const chatMessagesContainer = document.querySelector('.chat-messages');

    function addChatMessage(user, text, isUser) {
        if (!chatMessagesContainer) return;

        const bubble = document.createElement('div');
        bubble.classList.add('chat-bubble', isUser ? 'user-bubble' : 'other-bubble', 'mb-3');
        bubble.setAttribute('data-aos', 'fade-up'); // Add animation
        bubble.setAttribute('data-aos-anchor', '.chat-messages'); // Anchor to container

        const userDiv = document.createElement('div');
        userDiv.classList.add('bubble-user', 'fw-semibold', 'mb-1');
        userDiv.textContent = user;

        const textDiv = document.createElement('div');
        textDiv.classList.add('bubble-text');
        textDiv.textContent = text; // Use textContent to prevent XSS

        const timeDiv = document.createElement('div');
        timeDiv.classList.add('bubble-time', 'text-muted', 'small', 'text-end', 'mt-1');
        timeDiv.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        bubble.appendChild(userDiv);
        bubble.appendChild(textDiv);
        bubble.appendChild(timeDiv);
        chatMessagesContainer.appendChild(bubble);

        // Scroll to bottom
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
         // Re-initialize AOS for the new element (might be needed if added after initial load)
         // AOS.refreshHard(); // Use if needed, but might be performance intensive
    }

    if (chatSendButton && chatInput) {
        chatSendButton.addEventListener('click', function() {
            const messageText = chatInput.value.trim();
            if (messageText !== '') {
                addChatMessage('You', messageText, true);
                chatInput.value = '';

                // Simulate a reply (optional)
                setTimeout(() => {
                    const replies = ["Interesting point!", "Could you elaborate?", "I agree.", "Hmm, not sure about that.", "Got it."];
                    const randomReply = replies[Math.floor(Math.random() * replies.length)];
                    addChatMessage('AI_Helper', randomReply, false);
                }, 1500);
            }
        });

        // Allow sending with Enter key
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent form submission if it were in a form
                chatSendButton.click();
            }
        });
    }


    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

});