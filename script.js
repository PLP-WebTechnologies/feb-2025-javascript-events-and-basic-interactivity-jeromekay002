document.addEventListener('DOMContentLoaded', function () {
    // opted to create the control btns dynamincally
    const controls = document.createElement('div');
    controls.className = 'slider-controls';

    // prev controls
    const prevBtn = document.createElement('button');
    prevBtn.id = 'prevBtn';
    prevBtn.textContent = 'Prev';

    // next controls
    const nextBtn = document.createElement('button');
    nextBtn.id = 'nextBtn';
    nextBtn.textContent = 'Next';

    // appending the controls to the slider
    controls.appendChild(prevBtn);
    controls.appendChild(nextBtn);

    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.appendChild(controls); // Append controls inside the slider
    } else {
        console.error('Hero slider not found');
    }

    // background images for the slides
    const slideImage = [
        'images/slide3.avif',
        'images/slide2.avif',
        'images/slide1.avif'
    ];
    const heroSlides = document.querySelectorAll('.hero-slide');

    heroSlides.forEach((slide, index) => {
        slide.style.backgroundImage = `url(${slideImage[index]})`;
    });

    let currentSlide = 0;
    const totalSlides = heroSlides.length;

    function showSlide(index) {
        heroSlides.forEach((slide, i) => {
            slide.classList.remove('active');
        });
        heroSlides[index].classList.add('active');
        console.log(`Showing slide ${index + 1}`);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    showSlide(currentSlide)
    console.log(heroSlider);


    // live feedback when typing 
    const liveInput = document.getElementById('live-input');
    const liveDisplay = document.getElementById('live-display');

    liveInput.addEventListener('input', function () {
        const value = liveInput.value;
        liveDisplay.textContent = value;

        // also added this effect to the active slide and update the h2
        const activeSlide = document.querySelector('.hero-slide.active');
        if (activeSlide) {
            const heading = activeSlide.querySelector('.hero-content h2');
            if (heading) {
                heading.textContent = value || 'Default Heading'; // default heading if input is empty
            }
        }
    });

    // change the theme of the page to dark
    const themeButtons = document.querySelectorAll('.theme-toggle');

    themeButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            document.body.classList.toggle('dark-theme');
            console.log("Theme toggled:", document.body.classList.contains('dark-theme') ? "Dark" : "Light");
        });
    });

    // add a hover effect to the card hover
    const hoverBox = document.querySelector('.hover-box');

    hoverBox.addEventListener('mouseover', function () {
        hoverBox.classList.add('hover-effect');
    });
    hoverBox.addEventListener('mouseout', function () {
        hoverBox.classList.remove('hover-effect');
    });


    // opening and closing the modal
    const formModal = document.getElementById('form-modal');
    const openModalBtn = document.getElementById('open-form');
    const closeModalBtn = document.getElementById('close-form');
    const emailInput = document.getElementById('email');
    const emailFeedback = document.getElementById('email-feedback');
    const passwordInput = document.getElementById('password');
    const checkLength = document.getElementById('check-length');
    const checkSymbol = document.getElementById('check-symbol');
    const form = document.getElementById('signup-form');
    const submitBtn = document.getElementById('submit-btn');

    openModalBtn.addEventListener('click', function () {
        formModal.style.display = 'block';
        console.log("Modal opened");
    });

    closeModalBtn.addEventListener('click', function () {
        formModal.style.display = 'none';
        console.log("Modal closed");
    });

    // close the modal when clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target === formModal) {
            formModal.style.display = 'none';
            console.log("Modal closed by clicking outside");
        }
    });

    // email validation
    emailInput.addEventListener('input', function () {
        const emailValue = emailInput.value;
        if (emailValue.includes('@') && emailValue.includes('.')) {
            emailFeedback.textContent = 'Valid Email';
            emailFeedback.style.color = 'green';

        } else {
            emailFeedback.textContent = 'Invalid Email';
            emailFeedback.style.color = 'red';

        }
    });

    // password validation
    passwordInput.addEventListener('input', function () {
        const passwordValue = passwordInput.value;

        let isLengthValid = false;
        let hasSpecialChar = false;

        // 1. Check the length
        if (passwordValue.length >= 8) {
            checkLength.textContent = '✔ Password length is valid';
            checkLength.style.color = 'green';
            isLengthValid = true;
        } else {
            checkLength.textContent = '✖ Password must be at least 8 characters';
            checkLength.style.color = 'red';
        }

        // 2. Special character check
        if (/[!@#$%^&*(),.?":{}|<>]/.test(passwordValue)) {
            checkSymbol.textContent = '✔ Contains at least one special character';
            checkSymbol.style.color = 'green';
            hasSpecialChar = true;
        } else {
            checkSymbol.textContent = '✖ Must include at least one special character';
            checkSymbol.style.color = 'red';
        }

        // 3. Password strength check (both conditions must be true)
        if (isLengthValid && hasSpecialChar) {
            passwordInput.style.borderColor = 'green';
        } else {
            passwordInput.style.borderColor = 'red';
        }
    });

    // form submission
    form.addEventListener('submit', function (event) {
        event.preventDefault(); 

        // Check if the email and password are valid before submitting
        if (emailFeedback.textContent === 'Valid Email' && passwordInput.style.borderColor === 'green') {
            console.log("Form submitted successfully!");
            alert("Form submitted successfully!");
            formModal.style.display = 'none'; // Close the modal after submission
        } else {
            alert("Error: Please check your email and password before submitting.");
            console.log("Form submission failed due to validation errors.");
        }
    });
    
});
