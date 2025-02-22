// Interactive glow effect for buttons
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.interaction-btn');
    
    buttons.forEach(button => {
        // Handle mouse movement for button glow effects
        button.addEventListener('mousemove', e => {
            const rect = button.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / button.offsetWidth) * 100;
            const y = ((e.clientY - rect.top) / button.offsetHeight) * 100;
            
            button.style.setProperty('--x', `${x}%`);
            button.style.setProperty('--y', `${y}%`);
        });

        // Reset glow position when mouse leaves
        button.addEventListener('mouseleave', () => {
            button.style.setProperty('--x', '50%');
            button.style.setProperty('--y', '50%');
        });

        // Add active state handling
        button.addEventListener('mousedown', () => {
            button.style.transform = 'scale(0.95)';
        });

        button.addEventListener('mouseup', () => {
            button.style.transform = 'scale(1)';
        });

        // Handle button click animations
        button.addEventListener('click', e => {
            // Add click animation class
            button.classList.add('clicked');
            
            // Update interaction count
            const countElement = button.querySelector('.interaction-count');
            if (countElement) {
                let count = parseInt(countElement.textContent);
                countElement.textContent = isNaN(count) ? '1' : (count + 1).toString();
                
                // Update progress bar
                const progressBar = button.querySelector('.bar-progress');
                if (progressBar) {
                    const currentWidth = parseInt(progressBar.style.width) || 0;
                    progressBar.style.width = `${Math.min(currentWidth + 5, 100)}%`;
                }
            }
            
            // Remove animation class after animation completes
            setTimeout(() => {
                button.classList.remove('clicked');
            }, 300);
        });
    });
});

// Initialize tooltips
document.querySelectorAll('[data-tooltip]').forEach(element => {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = element.getAttribute('data-tooltip');
    
    element.addEventListener('mouseenter', () => {
        document.body.appendChild(tooltip);
        const rect = element.getBoundingClientRect();
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
        tooltip.style.opacity = '1';
    });
    
    element.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            if (tooltip.parentNode === document.body) {
                document.body.removeChild(tooltip);
            }
        }, 200);
    });
});
