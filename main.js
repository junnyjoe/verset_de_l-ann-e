/**
 * Bible Verse Drawing Application
 * Main JavaScript - User interactions
 */

// ============== DOM ELEMENTS ==============
const drawSection = document.getElementById('draw-section');
const verseSection = document.getElementById('verse-section');
const drawForm = document.getElementById('draw-form');
const emailInput = document.getElementById('email');
const submitBtn = document.getElementById('submit-btn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoader = submitBtn.querySelector('.btn-loader');
const errorMessage = document.getElementById('error-message');
const verseText = document.getElementById('verse-text');
const verseReference = document.getElementById('verse-reference');
const alreadyDrawnNotice = document.getElementById('already-drawn-notice');
const newDrawBtn = document.getElementById('new-draw-btn');

// ============== EMAIL VALIDATION ==============
/**
 * Validate email format using regex
 * @param {string} email - Email address to validate
 * @returns {boolean} - True if email is valid
 */
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// ============== UI STATE MANAGEMENT ==============
/**
 * Show loading state on submit button
 */
function showLoading() {
    submitBtn.disabled = true;
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');
}

/**
 * Hide loading state on submit button
 */
function hideLoading() {
    submitBtn.disabled = false;
    btnText.classList.remove('hidden');
    btnLoader.classList.add('hidden');
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');

    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 5000);
}

/**
 * Hide error message
 */
function hideError() {
    errorMessage.classList.add('hidden');
}

/**
 * Display the drawn verse
 * @param {object} verse - Verse object with text and reference
 * @param {boolean} alreadyDrawn - Whether this verse was already drawn
 */
function displayVerse(verse, alreadyDrawn) {
    // Hide draw section, show verse section
    drawSection.classList.add('hidden');
    verseSection.classList.remove('hidden');

    // Show/hide already drawn notice
    if (alreadyDrawn) {
        alreadyDrawnNotice.classList.remove('hidden');
    } else {
        alreadyDrawnNotice.classList.add('hidden');
    }

    // Populate verse content
    verseText.textContent = `"${verse.text}"`;
    verseReference.textContent = `— ${verse.reference}`;

    // Scroll to verse section
    verseSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Reset to initial state (show draw form)
 */
function resetToDrawForm() {
    verseSection.classList.add('hidden');
    drawSection.classList.remove('hidden');
    emailInput.value = '';
    emailInput.focus();
}

// ============== API CALLS ==============
/**
 * Draw a verse for the given email
 * @param {string} email - User's email address
 */
async function drawVerse(email) {
    try {
        const response = await fetch('/api/draw-verse', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        });

        const data = await response.json();

        if (data.success) {
            displayVerse(data.verse, data.already_drawn);
        } else {
            showError(data.error || 'Une erreur est survenue. Veuillez réessayer.');
        }
    } catch (error) {
        console.error('API Error:', error);
        showError('Erreur de connexion. Veuillez vérifier votre connexion internet.');
    }
}

// ============== EVENT LISTENERS ==============

// Form submission
drawForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    // Client-side validation
    if (!email) {
        showError('Veuillez entrer votre adresse e-mail.');
        emailInput.focus();
        return;
    }

    if (!isValidEmail(email)) {
        showError('Veuillez entrer une adresse e-mail valide.');
        emailInput.focus();
        return;
    }

    // Hide any existing errors
    hideError();

    // Show loading state
    showLoading();

    // Call API
    await drawVerse(email);

    // Hide loading state
    hideLoading();
});

// New draw button (try with different email)
newDrawBtn.addEventListener('click', () => {
    resetToDrawForm();
});

// Real-time email validation feedback
emailInput.addEventListener('input', () => {
    const email = emailInput.value.trim();

    if (email && !isValidEmail(email)) {
        emailInput.style.borderColor = '#ea4335';
    } else {
        emailInput.style.borderColor = '';
    }
});

// Hide error on new input
emailInput.addEventListener('focus', () => {
    hideError();
});

// ============== INITIALIZATION ==============
document.addEventListener('DOMContentLoaded', () => {
    // Focus on email input
    emailInput.focus();

    console.log('🙏 Bible Verse Drawing App initialized');
});
