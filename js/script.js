// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize variables and selectors
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const portfolioZoomBtns = document.querySelectorAll('.portfolio-zoom');
    const lightbox = document.querySelector('.portfolio-lightbox');
    const lightboxClose = document.querySelector('.close-lightbox');
    const lightboxImg = document.querySelector('.lightbox-img img');
    const lightboxTitle = document.querySelector('.lightbox-details h3');
    const lightboxDesc = document.querySelector('.lightbox-details p');
    const contactForm = document.getElementById('contactForm');

    // Custom cursor effect
    document.addEventListener('mousemove', (e) => {
        if (cursor && cursorFollower) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Add a slight delay to follower for smooth effect
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        }
    });

    // Links and buttons hover effect for cursor
    document.querySelectorAll('a, button, .filter-btn, .portfolio-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (cursor && cursorFollower) {
                cursor.classList.add('cursor-active');
                cursorFollower.classList.add('follower-active');
            }
        });
        
        item.addEventListener('mouseleave', () => {
            if (cursor && cursorFollower) {
                cursor.classList.remove('cursor-active');
                cursorFollower.classList.remove('follower-active');
            }
        });
    });

    // Mobile navigation toggle
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            sidebar.classList.toggle('open');
        });
    }

    // Handle navigation links click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Scroll to target section
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (sidebar.classList.contains('open')) {
                    hamburger.classList.remove('active');
                    sidebar.classList.remove('open');
                }
            }
        });
    });

    // Active section on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 300)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Portfolio filtering
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                // Show all items if filter is 'all'
                if (filterValue === 'all') {
                    item.style.display = 'block';
                } else {
                    // Show/hide items based on category
                    if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
                
                // Add animation
                setTimeout(() => {
                    item.classList.add('animated');
                }, 200);
            });
        });
    });

    // Portfolio lightbox
    portfolioZoomBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get portfolio item data
            const portfolioItem = this.closest('.portfolio-item');
            const imgSrc = portfolioItem.querySelector('.portfolio-img img').getAttribute('src');
            const title = portfolioItem.querySelector('.portfolio-info h3').textContent;
            const category = portfolioItem.querySelector('.portfolio-info p').textContent;
            
            // Set lightbox content
            lightboxImg.setAttribute('src', imgSrc);
            lightboxTitle.textContent = title;
            lightboxDesc.textContent = `Category: ${category}`;
            
            // Open lightbox
            lightbox.classList.add('open');
            
            // Disable body scroll
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', () => {
            lightbox.classList.remove('open');
            
            // Enable body scroll
            document.body.style.overflow = 'auto';
        });
    }

    // Close lightbox on outside click
    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            lightbox.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    });

    // Contact form validation and submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission (in a real application, you'd send data to a server)
            showNotification('Your message has been sent successfully!', 'success');
            contactForm.reset();
        });
    }
    
    // Function to show notifications
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <p>${message}</p>
                <span class="notification-close">&times;</span>
            </div>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Show notification with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto-remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
        
        // Close button functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    }
    
    // Add CSS for notifications
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 9999;
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        .notification-content {
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
        }
        
        .notification.success .notification-content {
            background-color: var(--secondary-color);
        }
        
        .notification.error .notification-content {
            background-color: var(--accent-color);
        }
        
        .notification-close {
            cursor: pointer;
            font-size: 20px;
            margin-left: 10px;
        }
        
        .cursor-active {
            transform: translate(-50%, -50%) scale(1.5);
            background-color: transparent;
            opacity: 0;
        }
        
        .follower-active {
            transform: translate(-50%, -50%) scale(1.2);
        }
        
        @media (max-width: 576px) {
            .notification {
                left: 20px;
                right: 20px;
            }
            
            .notification-content {
                min-width: auto;
            }
        }
    `;
    document.head.appendChild(notificationStyles);
    
    // Add animation styles for portfolio items
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .portfolio-item {
            transition: all 0.5s ease;
        }
        
        .portfolio-item.animated {
            animation: fadeInUp 0.5s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(animationStyles);
}); 