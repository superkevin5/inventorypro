// Simplified JavaScript for SupplyChain ERP
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initSmoothScrolling();
    initScrollEffects();
    initContactForm();
    initModuleInteractions();
    initAnimations();
    initCounters();
    initAIChat();
    initERPAIChat();
    initSalesDashboard();
    initEmailModal();
    checkForSuccessMessage();
});

// Mobile Navigation Toggle
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Smooth scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll effects
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .module-card, .pricing-card, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Get form data for validation
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validation
            if (!data.name || !data.email || !data.phone || !data.company || !data.interest) {
                e.preventDefault();
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                e.preventDefault();
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Submit to Formspree using fetch to avoid redirect
            e.preventDefault();
            
            fetch('https://formspree.io/f/mzzjdgnq', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Show success message
                    const successMessage = document.getElementById('success-message');
                    if (successMessage) {
                        successMessage.style.display = 'block';
                        contactForm.style.display = 'none';
                        successMessage.scrollIntoView({ behavior: 'smooth' });
                    }
                    // Reset form
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification('There was an error sending your message. Please try again.', 'error');
            })
            .finally(() => {
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
}

// Module interactions
function initModuleInteractions() {
    const moduleItems = document.querySelectorAll('.module-item');
    moduleItems.forEach(item => {
        item.addEventListener('click', function() {
            const module = this.getAttribute('data-module');
            showModuleInfo(module);
        });

        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-3px)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });

    // Card hover effects
    const cards = document.querySelectorAll('.feature-card, .module-card, .pricing-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Animations
function initAnimations() {
    // Add stagger animation to cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// Counter animations
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            </div>
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : 
                    type === 'error' ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' : 
                    'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

    // Add notification styles to head if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            .notification-content {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 1rem;
            }
            .notification-icon {
                font-size: 1.2rem;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                margin-left: 1rem;
                transition: transform 0.3s ease;
            }
            .notification-close:hover {
                transform: scale(1.2);
            }
        `;
        document.head.appendChild(style);
    }

    // Add to page
    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Module information display
function showModuleInfo(module) {
    const moduleInfo = {
        client: {
            title: 'Client Company Management',
            description: 'Comprehensive client relationship management with contract tracking and communication history.',
            features: ['Client profiles and history', 'Contract management', 'Communication tracking', 'Performance analytics'],
            icon: 'fas fa-building'
        },
        equipment: {
            title: 'Equipment Management',
            description: 'Complete asset tracking and maintenance management system.',
            features: ['Asset tracking', 'Maintenance scheduling', 'Equipment history', 'Cost analysis'],
            icon: 'fas fa-tools'
        },
        inventory: {
            title: 'Inventory Management',
            description: 'Real-time inventory control with forecasting and optimization.',
            features: ['Real-time stock levels', 'Demand forecasting', 'Automated reordering', 'Multi-location support'],
            icon: 'fas fa-warehouse'
        },
        procurement: {
            title: 'Procurement Management',
            description: 'End-to-end procurement process from requisition to payment.',
            features: ['Purchase requisitions', 'Vendor management', 'Cost optimization', 'Approval workflows'],
            icon: 'fas fa-shopping-cart'
        },
        sales: {
            title: 'Sales Management',
            description: 'Complete sales process management with CRM integration.',
            features: ['Lead management', 'Opportunity tracking', 'Sales pipeline', 'Performance analytics'],
            icon: 'fas fa-handshake'
        },
        supply: {
            title: 'Supply Company Management',
            description: 'Strategic supplier relationship and performance management.',
            features: ['Supplier profiles', 'Performance metrics', 'Strategic partnerships', 'Risk assessment'],
            icon: 'fas fa-industry'
        },
        user: {
            title: 'User Management',
            description: 'Comprehensive user administration with role-based access control.',
            features: ['Role management', 'Access control', 'Security policies', 'Audit trails'],
            icon: 'fas fa-users'
        },
        repair: {
            title: 'Repairment Management',
            description: 'Complete repair and maintenance tracking system.',
            features: ['Repair tracking', 'Warranty management', 'Service history', 'Cost tracking'],
            icon: 'fas fa-wrench'
        }
    };

    const info = moduleInfo[module];
    if (info) {
        const modal = document.createElement('div');
        modal.className = 'module-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <div class="modal-header">
                        <div class="modal-icon">
                            <i class="${info.icon}"></i>
                        </div>
                        <h3>${info.title}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>${info.description}</p>
                        <h4>Key Features:</h4>
                        <ul>
                            ${info.features.map(feature => `<li><i class="fas fa-check"></i> ${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-primary">Learn More</button>
                        <button class="btn btn-outline modal-close">Close</button>
                    </div>
                </div>
            </div>
        `;

        // Add modal styles
        if (!document.querySelector('#modal-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-styles';
            style.textContent = `
                .module-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10000;
                    animation: fadeIn 0.3s ease;
                }
                .modal-overlay {
                    background: rgba(0, 0, 0, 0.6);
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                }
                .modal-content {
                    background: white;
                    border-radius: 20px;
                    max-width: 600px;
                    width: 100%;
                    max-height: 80vh;
                    overflow-y: auto;
                    animation: slideInUp 0.3s ease;
                    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
                }
                .modal-header {
                    padding: 2rem;
                    border-bottom: 1px solid #e5e7eb;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
                    border-radius: 20px 20px 0 0;
                }
                .modal-icon {
                    width: 50px;
                    height: 50px;
                    background: var(--gradient-primary);
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 1.2rem;
                }
                .modal-header h3 {
                    margin: 0;
                    color: #1f2937;
                    font-size: 1.5rem;
                    font-weight: 700;
                    flex: 1;
                }
                .modal-close {
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    color: #6b7280;
                    transition: color 0.3s ease;
                }
                .modal-close:hover {
                    color: #ef4444;
                }
                .modal-body {
                    padding: 2rem;
                }
                .modal-body h4 {
                    margin: 1.5rem 0 1rem 0;
                    color: #1f2937;
                    font-size: 1.2rem;
                    font-weight: 600;
                }
                .modal-body ul {
                    list-style: none;
                    padding: 0;
                }
                .modal-body li {
                    padding: 0.75rem 0;
                    border-bottom: 1px solid #f3f4f6;
                    color: #6b7280;
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                .modal-body li:last-child {
                    border-bottom: none;
                }
                .modal-body li i {
                    color: var(--primary-color);
                    font-size: 0.9rem;
                }
                .modal-footer {
                    padding: 2rem;
                    border-top: 1px solid #e5e7eb;
                    display: flex;
                    gap: 1rem;
                    justify-content: flex-end;
                    background: #f9fafb;
                    border-radius: 0 0 20px 20px;
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(modal);

        // Close modal functionality
        const closeButtons = modal.querySelectorAll('.modal-close');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                modal.remove();
            });
        });

        // Close on overlay click
        modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                modal.remove();
            }
        });
    }
}

// Add mobile menu styles
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background: white;
            width: 100%;
            text-align: center;
            transition: 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            padding: 1rem 0;
            border-top: 1px solid #e5e7eb;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .nav-menu li {
            margin: 0.5rem 0;
        }
        
        .nav-menu a {
            display: block;
            padding: 0.8rem 2rem;
            margin: 0 1rem;
            border-radius: 6px;
            font-size: 1rem;
        }
        
        .hamburger {
            display: flex;
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(5px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-5px) rotate(-45deg);
        }
    }
`;

// Add mobile menu styles to head
if (!document.querySelector('#mobile-menu-styles')) {
    const style = document.createElement('style');
    style.id = 'mobile-menu-styles';
    style.textContent = mobileMenuStyles;
    document.head.appendChild(style);
}

// AI Chat Functionality
function initAIChat() {
    const chatWidget = document.getElementById('ai-chat-widget');
    const chatToggle = document.getElementById('chat-toggle');
    const aiChatToggle = document.getElementById('ai-chat-toggle');
    const chatClose = document.getElementById('chat-close');
    const chatMinimize = document.getElementById('chat-minimize');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');

    let isMinimized = false;
    let isTyping = false;

    // AI Knowledge Base
    const aiKnowledge = {
        modules: {
            keywords: ['modules', 'module', 'features', 'what modules', 'what features'],
            response: `Inventory Pro includes 16 comprehensive modules:

1. **Client Company Management** - Manage client relationships and contracts
2. **Equipment Management** - Track and maintain all equipment assets
3. **Inventory Management** - Real-time inventory control with forecasting
4. **Inventory Search** - Advanced search and filtering capabilities
5. **Inbound Management** - Streamline receiving processes
6. **Inbound Inventory Search** - Specialized search for incoming inventory
7. **Outbound Management** - Optimize shipping and fulfillment
8. **Outbound Inventory Search** - Track outgoing shipments
9. **Procurement Management** - End-to-end procurement process
10. **Procurement Data Management** - Centralized procurement analytics
11. **Product Management** - Complete product lifecycle management
12. **Repairment Management** - Track and manage repair processes
13. **Sales Data Management** - Comprehensive sales analytics
14. **Sales Management** - Complete sales process management
15. **Supply Company Management** - Manage supplier relationships
16. **User Management** - User administration with role-based access

All modules work seamlessly together with real-time data synchronization!`
        },
        pricing: {
            keywords: ['price', 'cost', 'pricing', 'how much', 'costs', 'expensive', 'cheap'],
            response: `Our pricing is simple and transparent:

**All-Inclusive Plan: $400/month**
- Unlimited users (no per-user fees!)
- All 16 modules enabled
- 24/7 anytime service
- Full customization capabilities
- Advanced analytics & reporting
- API access & integrations
- Mobile responsive interface
- Cloud hosting & security
- Priority support
- Regular updates & maintenance

**Annual Payment: $4,800/year**
- Same great features
- No hidden fees or limitations
- One plan with everything included

This is incredibly cost-effective compared to traditional ERP systems that charge per user and per module!`
        },
        trial: {
            keywords: ['trial', 'demo', 'test', 'free', 'try', 'sample'],
            response: `Yes! We offer a comprehensive demo and trial experience:

**Free Demo:**
- Schedule a personalized demo with our team
- See all 16 modules in action
- Customized to your business needs
- No commitment required

**Trial Period:**
- 30-day free trial available
- Full access to all features
- Personal onboarding and training
- Dedicated support during trial
- Easy setup and migration assistance

**Contact us at:**
- Phone: 0450137057
- Address: 50 Walker St, Rhodes, NSW, 2138
- Or fill out the contact form on this page

We're confident you'll love Inventory Pro once you see it in action!`
        },
        support: {
            keywords: ['support', 'help', 'assistance', 'contact', 'phone', 'email'],
            response: `We provide comprehensive support for all our clients:

**24/7 Support:**
- Round-the-clock assistance
- Multiple contact methods
- Priority support for all users
- Quick response times

**Contact Information:**
- Phone: 0450137057
- Address: 50 Walker St, Rhodes, NSW, 2138
- Contact form available on this website

**Support Services:**
- Technical support
- Training and onboarding
- Customization assistance
- Regular updates and maintenance
- Migration support
- API integration help

**Training:**
- Comprehensive user training
- Video tutorials
- Documentation
- Best practices guidance

We're here to ensure your success with Inventory Pro!`
        },
        features: {
            keywords: ['features', 'capabilities', 'what can', 'benefits', 'advantages'],
            response: `Inventory Pro offers enterprise-grade features:

**Core Capabilities:**
- Real-time data synchronization across all modules
- Advanced analytics and reporting
- Mobile-responsive interface
- Unlimited users (no per-user licensing)
- Full customization capabilities
- API access for integrations

**Security & Reliability:**
- Bank-level security
- Role-based access control
- Comprehensive audit trails
- 99% uptime guarantee
- Cloud hosting with backup

**User Experience:**
- Intuitive interface design
- Mobile-ready access
- Customizable dashboards
- Advanced search capabilities
- Automated workflows

**Integration:**
- API access for third-party integrations
- Real-time data sync
- Cloud-based architecture
- Scalable infrastructure

**Support:**
- 24/7 anytime service
- Priority support
- Regular updates
- Training and onboarding

This makes Inventory Pro the complete solution for modern supply chain management!`
        },
        default: {
            response: `I'd be happy to help you with Inventory Pro! I can assist with:

- **Module information** - Learn about our 16 integrated modules
- **Pricing details** - Understand our transparent pricing
- **Trial and demo** - Schedule a demo or start a free trial
- **Support** - Get help with technical questions
- **Features** - Explore our capabilities and benefits

What would you like to know more about? You can also ask me specific questions about supply chain management, inventory control, or any other aspect of our system!`
        }
    };

    // Toggle chat widget
    function toggleChat() {
        if (isMinimized) {
            chatWidget.style.height = '500px';
            isMinimized = false;
        } else {
            chatWidget.classList.toggle('active');
        }
    }

    // Minimize chat
    function minimizeChat() {
        if (isMinimized) {
            chatWidget.style.height = '500px';
            isMinimized = false;
        } else {
            chatWidget.style.height = '60px';
            isMinimized = true;
        }
    }

    // Close chat
    function closeChat() {
        chatWidget.classList.remove('active');
        isMinimized = false;
        chatWidget.style.height = '500px';
    }

    // Add message to chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.innerHTML = `<i class="fas ${isUser ? 'fa-user' : 'fa-robot'}"></i>`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageText = document.createElement('p');
        messageText.textContent = content;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Show typing indicator
    function showTypingIndicator() {
        if (isTyping) return;
        
        isTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Hide typing indicator
    function hideTypingIndicator() {
        const typingIndicator = chatMessages.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        isTyping = false;
    }

    // Get AI response
    function getAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Check each knowledge category
        for (const [category, data] of Object.entries(aiKnowledge)) {
            if (category === 'default') continue;
            
            for (const keyword of data.keywords) {
                if (message.includes(keyword)) {
                    return data.response;
                }
            }
        }
        
        return aiKnowledge.default.response;
    }

    // Send message
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, true);
        chatInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Simulate AI thinking time
        setTimeout(() => {
            hideTypingIndicator();
            const aiResponse = getAIResponse(message);
            addMessage(aiResponse);
        }, 1000 + Math.random() * 2000); // 1-3 seconds delay
    }

    // Event listeners
    if (chatToggle) {
        chatToggle.addEventListener('click', toggleChat);
    }
    
    if (aiChatToggle) {
        aiChatToggle.addEventListener('click', (e) => {
            e.preventDefault();
            toggleChat();
        });
    }
    
    if (chatClose) {
        chatClose.addEventListener('click', closeChat);
    }
    
    if (chatMinimize) {
        chatMinimize.addEventListener('click', minimizeChat);
    }
    
    if (chatSend) {
        chatSend.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Suggestion buttons
    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const suggestion = btn.getAttribute('data-suggestion');
            chatInput.value = suggestion;
            sendMessage();
        });
    });

    // Auto-open chat on first visit (optional)
    const hasVisited = localStorage.getItem('inventory-pro-visited');
    if (!hasVisited) {
        setTimeout(() => {
            chatWidget.classList.add('active');
            localStorage.setItem('inventory-pro-visited', 'true');
        }, 3000); // Open after 3 seconds
    }
}

// ERP AI Chat Functionality
function initERPAIChat() {
    const erpChatWidget = document.getElementById('erp-ai-chat');
    const erpChatTrigger = document.querySelector('.ai-chat-trigger');
    const erpChatClose = document.getElementById('erp-chat-close');
    const erpChatInput = document.getElementById('erp-chat-input');
    const erpChatSend = document.getElementById('erp-chat-send');
    const erpChatMessages = document.getElementById('erp-chat-messages');
    const erpSuggestionBtns = document.querySelectorAll('.erp-suggestion-btn');

    let isERPChatOpen = false;
    let isERPTyping = false;

    // ERP-specific AI Knowledge Base
    const erpAIKnowledge = {
        procurement: {
            keywords: ['procurement', 'purchase', 'order', 'supplier', 'vendor'],
            response: `Here's your current procurement status:

**Active Purchase Orders: 424**
• Pending Review: 156 orders
• Approved: 268 orders
• Total Value: $2.4M

**Recent Activity:**
• Order #424: Digital Temperature Gauge (TG-001) - Submitted
• Order #423: Explosion-proof components - Submitted
• Order #422: Glyoxal Solution (GL-049) 9750kg - Under Review
• Order #421: Tert-butylamine (TBA-030) 8370kg - Under Review

**Supplier Performance:**
• SafetyTech Electrical Co.: 94% on-time delivery
• ChemSupply Trading Ltd.: 89% quality rating
• PetroChem Solutions Inc.: 92% cost efficiency

**AI Recommendations:**
1. Expedite review of raw material orders
2. Consider bulk discounts for frequent suppliers
3. Set up automated reorder points for critical items

Would you like me to generate a procurement report or help with supplier management?`
        },
        inventory: {
            keywords: ['inventory', 'stock', 'items', 'products', 'warehouse'],
            response: `Current inventory overview:

**Stock Levels:**
• Total SKUs: 2,847
• Low Stock Items: 23 (urgent)
• Out of Stock: 5 items
• Recently Added: 12 items this week

**Critical Alerts:**
• Digital Temperature Gauges (TG-001): Only 3 units left
• Explosion-proof components: Reorder needed
• Raw materials: 4 items below minimum

**Inventory Value:**
• Total Value: $4.2M
• Slow Moving: $340K (8%)
• Fast Moving: $2.1M (50%)

**AI Insights:**
• Peak demand: 2-4 PM daily
• Seasonal trends: +23% in Q4
• Optimal reorder point: 15 units for fast movers

Would you like detailed inventory analysis or help setting up automated alerts?`
        },
        reports: {
            keywords: ['report', 'reports', 'analytics', 'data'],
            response: `Available reports and analytics:

**Procurement Reports:**
• Purchase Order Summary
• Supplier Performance Analysis
• Cost Trend Analysis
• Contract Compliance Report

**Inventory Reports:**
• Stock Level Analysis
• Turnover Rate Report
• ABC Analysis
• Demand Forecasting

**Financial Reports:**
• Procurement Cost Analysis
• Budget vs Actual
• ROI Analysis
• Cost Savings Opportunities

**Quick Actions:**
1. Generate monthly procurement summary
2. Create supplier performance dashboard
3. Export inventory data to Excel
4. Schedule automated reports

**Recent Reports:**
• Procurement Summary: Generated 2 hours ago
• Inventory Analysis: Scheduled for tomorrow
• Supplier Performance: Sent to management

Which report would you like me to generate?`
        },
        workflow: {
            keywords: ['workflow', 'process', 'how to'],
            response: `Here are common workflow processes:

**Creating Purchase Orders:**
1. Navigate to Procurement → Purchase Orders
2. Click "Create Purchase Order"
3. Select supplier from dropdown
4. Add products and quantities
5. Review pricing and terms
6. Submit for approval

**Managing Suppliers:**
1. Go to Supplier Management
2. Add new supplier information
3. Set up payment terms
4. Configure delivery schedules
5. Monitor performance metrics

**Inventory Management:**
1. Access Inventory module
2. Check stock levels
3. Set reorder points
4. Process incoming goods
5. Update quantities

**Approval Workflow:**
• Orders under $10K: Auto-approved
• Orders $10K-$50K: Manager approval
• Orders over $50K: Director approval

What specific process would you like help with?`
        },
        support: {
            keywords: ['help', 'support', 'error', 'issue'],
            response: `I'm here to help with any system issues:

**Common Solutions:**
• Login problems → Clear browser cache
• Data sync issues → Check network connection
• Report errors → Verify permissions
• Slow performance → Check system resources

**System Status:**
• All modules: Online ✅
• Database: Connected ✅
• API Services: Running ✅
• Backup: Last successful 2 hours ago ✅

**Quick Fixes:**
1. Refresh page (Ctrl+F5)
2. Clear browser cache
3. Check internet connection
4. Restart application

**Contact Support:**
• Email: support@inventoryproapp.com.au
• Phone: 0450137057
• Knowledge Base: help.inventoryproapp.com.au

What specific issue are you experiencing?`
        },
        default: {
            response: `I'm your ERP assistant! I can help you with:

**Procurement Management:**
• Purchase order processing
• Supplier relationship management
• Contract management
• Cost optimization

**Inventory Control:**
• Stock level monitoring
• Reorder point management
• Product catalog maintenance
• Warehouse operations

**Analytics & Reporting:**
• Performance metrics
• Trend analysis
• Custom reports
• Data insights

**System Operations:**
• Workflow guidance
• Process optimization
• Troubleshooting
• Best practices

What would you like to work on today?`
        }
    };

    // Toggle ERP chat
    function toggleERPChat() {
        isERPChatOpen = !isERPChatOpen;
        if (isERPChatOpen) {
            erpChatWidget.classList.add('active');
        } else {
            erpChatWidget.classList.remove('active');
        }
    }

    // Add message to ERP chat
    function addERPMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `erp-message ${isUser ? 'erp-user-message' : 'ai-message'}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'erp-message-avatar';
        avatar.innerHTML = `<i class="fas ${isUser ? 'fa-user' : 'fa-robot'}"></i>`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'erp-message-content';
        
        const messageText = document.createElement('p');
        messageText.textContent = content;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'erp-message-time';
        messageTime.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageContent.appendChild(messageText);
        messageContent.appendChild(messageTime);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        erpChatMessages.appendChild(messageDiv);
        erpChatMessages.scrollTop = erpChatMessages.scrollHeight;
    }

    // Show ERP typing indicator
    function showERPTypingIndicator() {
        if (isERPTyping) return;
        
        isERPTyping = true;
        const typingDiv = document.createElement('div');
        typingDiv.className = 'erp-message ai-message typing-indicator';
        typingDiv.innerHTML = `
            <div class="erp-message-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;
        
        erpChatMessages.appendChild(typingDiv);
        erpChatMessages.scrollTop = erpChatMessages.scrollHeight;
    }

    // Hide ERP typing indicator
    function hideERPTypingIndicator() {
        const typingIndicator = erpChatMessages.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        isERPTyping = false;
    }

    // Get ERP AI response
    function getERPAIResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Check each knowledge category
        for (const [category, data] of Object.entries(erpAIKnowledge)) {
            if (category === 'default') continue;
            
            for (const keyword of data.keywords) {
                if (message.includes(keyword)) {
                    return data.response;
                }
            }
        }
        
        return erpAIKnowledge.default.response;
    }

    // Send ERP message
    function sendERPMessage() {
        const message = erpChatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addERPMessage(message, true);
        erpChatInput.value = '';
        
        // Show typing indicator
        showERPTypingIndicator();
        
        // Simulate AI thinking time
        setTimeout(() => {
            hideERPTypingIndicator();
            const aiResponse = getERPAIResponse(message);
            addERPMessage(aiResponse);
        }, 1000 + Math.random() * 2000); // 1-3 seconds delay
    }

    // Event listeners
    if (erpChatTrigger) {
        erpChatTrigger.addEventListener('click', toggleERPChat);
    }
    
    if (erpChatClose) {
        erpChatClose.addEventListener('click', toggleERPChat);
    }
    
    if (erpChatSend) {
        erpChatSend.addEventListener('click', sendERPMessage);
    }
    
    if (erpChatInput) {
        erpChatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendERPMessage();
            }
        });
    }
    
    // ERP Suggestion buttons
    erpSuggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const suggestion = btn.getAttribute('data-suggestion');
            erpChatInput.value = suggestion;
            sendERPMessage();
        });
    });
}

// Sales Dashboard Functionality
function initSalesDashboard() {
    const salesChart = document.getElementById('salesChart');
    if (!salesChart) return;

    // Sales data matching the image
    const salesData = {
        labels: ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07', '2025-08', '2025-09'],
        datasets: [{
            label: 'Sales Amount ($)',
            data: [7059000, 23967596, 4755650, 25138697.5, 11100665, 12937005, 14067972, 9120717.5, 9993845],
            backgroundColor: '#3b82f6',
            borderColor: '#1d4ed8',
            borderWidth: 1,
            borderRadius: 4,
            borderSkipped: false,
        }]
    };

    // Chart configuration
    const config = {
        type: 'bar',
        data: salesData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return 'Sales: $' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 26000000,
                    ticks: {
                        stepSize: 2000000,
                        callback: function(value) {
                            return (value / 1000000) + 'M';
                        }
                    },
                    grid: {
                        color: '#f3f4f6'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        }
    };

    // Create the chart
    new Chart(salesChart, config);

    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Time selector functionality
    const timeSelect = document.querySelector('.time-select');
    if (timeSelect) {
        timeSelect.addEventListener('change', (e) => {
            console.log('Time period changed to:', e.target.value);
            // Here you would typically update the chart data based on the selected time period
        });
    }

    // Reset button functionality
    const resetBtn = document.querySelector('.reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            timeSelect.value = 'This Year';
            console.log('Dashboard reset to default view');
        });
    }
}

// Check for success message from Formspree
function checkForSuccessMessage() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const successMessage = document.getElementById('success-message');
        const contactForm = document.getElementById('contactForm');
        
        if (successMessage && contactForm) {
            // Hide the form and show success message
            contactForm.style.display = 'none';
            successMessage.style.display = 'block';
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth' });
            
            // Clean up URL (remove success parameter)
            const newUrl = window.location.pathname;
            window.history.replaceState({}, document.title, newUrl);
        }
    }
}

// Form submission handling for Formspree
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            console.log('Form submitted to Formspree');
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Reset button after 3 seconds (in case of slow response)
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 3000);
            }
        });
    }

    // Request Demo nav button - auto-select "Request Demo" in contact form
    const requestDemoNav = document.getElementById('request-demo-nav');
    const interestSelect = document.getElementById('interest');
    if (requestDemoNav && interestSelect) {
        requestDemoNav.addEventListener('click', function(e) {
            const interest = this.getAttribute('data-interest');
            if (interest) {
                interestSelect.value = interest;
                interestSelect.dispatchEvent(new Event('change'));
            }
        });
    }
});

// Email Modal Functionality
function initEmailModal() {
    const emailModal = document.getElementById('emailModal');
    const closeModal = document.getElementById('closeModal');
    const cancelEmail = document.getElementById('cancelEmail');
    const emailForm = document.getElementById('emailForm');

    // Close modal functions
    function closeEmailModal() {
        emailModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
        emailForm.reset(); // Clear form
    }

    if (closeModal) {
        closeModal.addEventListener('click', closeEmailModal);
    }

    if (cancelEmail) {
        cancelEmail.addEventListener('click', closeEmailModal);
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === emailModal) {
            closeEmailModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && emailModal.style.display === 'block') {
            closeEmailModal();
        }
    });

    // Handle email form submission
    if (emailForm) {
        emailForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(emailForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const company = formData.get('company');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Create mailto link
            const emailBody = `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nSubject: ${subject}\n\nMessage:\n${message}`;
            const mailtoLink = `mailto:inventorypro55@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            
            // Open default email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('Email client opened! Please send your message.', 'success');
            
            // Close modal after a short delay
            setTimeout(() => {
                closeEmailModal();
            }, 1000);
        });
    }
}

// Notification function
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        font-weight: 500;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(100%);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}
