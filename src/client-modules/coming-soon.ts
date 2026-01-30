import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
    // Use event delegation to handle clicks on dynamically created elements if needed,
    // but primarily to handle the footer links.
    document.addEventListener('click', (e) => {
        const target = (e.target as HTMLElement).closest('a');

        if (target && target.getAttribute('href') === '#coming-soon') {
            e.preventDefault();

            // Remove any existing toast to avoid duplicates stacking weirdly
            const existingToast = document.querySelector('.coming-soon-toast');
            if (existingToast) {
                existingToast.remove();
            }

            // Create toast element
            const toast = document.createElement('div');
            toast.className = 'coming-soon-toast';
            toast.textContent = 'Coming Soon';

            document.body.appendChild(toast);

            // Trigger animation
            requestAnimationFrame(() => {
                toast.classList.add('show');
            });

            // Remove after 3 seconds
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 300); // Wait for transition out
            }, 3000);
        }
    });
}
