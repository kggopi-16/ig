// Contact Form Handler for IGCE

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    // Get form data
    const formData = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        subject: form.subject.value,
        message: form.message.value.trim()
    };
    
    // Validate form
    if (!validateContactForm(formData)) {
        return;
    }
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="inline-block animate-spin mr-2">⏳</span> Sending...';
    
    try {
        // Simulate API call (replace with actual API endpoint)
        await simulateFormSubmission(formData);
        
        // Show success message
        showNotification('success', 'Thank you for contacting us! We will get back to you soon.');
        
        // Reset form
        form.reset();
        
    } catch (error) {
        // Show error message
        showNotification('error', 'Sorry, there was an error sending your message. Please try again or contact us directly.');
        console.error('Form submission error:', error);
    } finally {
        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }
}

function validateContactForm(data) {
    // Validate name
    if (data.name.length < 2) {
        showNotification('error', 'Please enter a valid name (at least 2 characters)');
        return false;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('error', 'Please enter a valid email address');
        return false;
    }
    
    // Validate phone (if provided)
    if (data.phone && data.phone.length > 0) {
        const phoneRegex = /^[\d\s\+\-\(\)]+$/;
        if (!phoneRegex.test(data.phone) || data.phone.length < 10) {
            showNotification('error', 'Please enter a valid phone number');
            return false;
        }
    }
    
    // Validate subject
    if (!data.subject) {
        showNotification('error', 'Please select a subject');
        return false;
    }
    
    // Validate message
    if (data.message.length < 10) {
        showNotification('error', 'Please enter a message (at least 10 characters)');
        return false;
    }
    
    return true;
}

function simulateFormSubmission(data) {
    // Simulate API call with delay
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form data submitted:', data);
            resolve();
        }, 1500);
    });
    
    // In production, replace with actual API call:
    // return fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(data)
    // });
}

function showNotification(type, message) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-4 max-w-md p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } text-white`;
    
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <div class="flex items-center">
                <i data-feather="${type === 'success' ? 'check-circle' : 'alert-circle'}" class="w-5 h-5 mr-3"></i>
                <span>${message}</span>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <i data-feather="x" class="w-5 h-5"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Initialize feather icons in notification
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Phone number formatting
document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            // Remove non-numeric characters except + and spaces
            let value = e.target.value.replace(/[^\d\s\+\-\(\)]/g, '');
            e.target.value = value;
        });
    }
});

// Character counter for message textarea
document.addEventListener('DOMContentLoaded', () => {
    const messageTextarea = document.getElementById('message');
    
    if (messageTextarea) {
        const charCountDiv = document.createElement('div');
        charCountDiv.className = 'text-sm text-gray-500 mt-1 text-right';
        charCountDiv.textContent = '0 / 500 characters';
        
        messageTextarea.parentElement.appendChild(charCountDiv);
        
        messageTextarea.addEventListener('input', (e) => {
            const length = e.target.value.length;
            const maxLength = 500;
            
            charCountDiv.textContent = `${length} / ${maxLength} characters`;
            
            if (length > maxLength) {
                charCountDiv.classList.add('text-red-500');
                e.target.value = e.target.value.substring(0, maxLength);
            } else {
                charCountDiv.classList.remove('text-red-500');
            }
        });
    }
});

// Form field animations
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
        });
    });
});