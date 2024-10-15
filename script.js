  // Initialize Swiper
  const swiper = new Swiper('.swiper-container', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

// Dark Mode Toggle
const toggleDarkModeButton = document.getElementById('toggle-dark-mode');
toggleDarkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Fetch API Data
document.getElementById('fetch-data').addEventListener('click', async () => {
    const apiDataDiv = document.getElementById('api-data');
    apiDataDiv.textContent = 'Loading...';
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        apiDataDiv.innerHTML = data.slice(0, 5).map(post => `<p><strong>${post.title}</strong>: ${post.body}</p>`).join('');
    } catch (error) {
        apiDataDiv.textContent = 'Failed to fetch data.';
    }
});





// Smooth Scrolling for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Image Gallery Filter
const filterButtons = document.querySelectorAll('.filter-button');
const galleryImages = document.querySelectorAll('#gallery img');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        galleryImages.forEach(image => {
            image.style.display = (filter === 'all' || image.classList.contains(filter)) ? 'block' : 'none';
        });
    });
});

// Form Validation
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputs = form.querySelectorAll('input, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            isValid = false;
            input.style.borderColor = 'red'; // Highlight empty fields
            input.placeholder = 'This field is required';
        } else {
            input.style.borderColor = ''; // Reset if valid
        }
    });

    if (isValid) {
        alert('Form submitted successfully!');
        form.reset(); // Reset form after successful submission
    }
});

// Image Hover Effect (Dynamic)
galleryImages.forEach(image => {
    image.addEventListener('mouseenter', () => {
        image.style.transform = 'scale(1.1)';
        image.style.transition = 'transform 0.3s ease';
    });

    image.addEventListener('mouseleave', () => {
        image.style.transform = 'scale(1)';
    });
});

// Automatic Image Carousel
let currentIndex = 0;
const slides = document.querySelectorAll('.swiper-slide');
const totalSlides = slides.length;

const showSlide = (index) => {
    slides.forEach((slide, i) => {
        slide.style.display = (i === index) ? 'block' : 'none';
    });
};

const nextSlide = () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    showSlide(currentIndex);
};

const prevSlide = () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    showSlide(currentIndex);
};

document.querySelector('.next-button').addEventListener('click', nextSlide);
document.querySelector('.prev-button').addEventListener('click', prevSlide);

// Automatic slideshow every 5 seconds
setInterval(nextSlide, 5000);

// Initialize the first slide
showSlide(currentIndex);

// Scroll Animation for Elements
const scrollElements = document.querySelectorAll('.scroll-animate');
const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
};

const displayScrollElement = (element) => {
    element.classList.add('show');
};

const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
        if (elementInView(el, 1.5)) {
            displayScrollElement(el);
        }
    });
};

window.addEventListener('scroll', handleScrollAnimation);

// Accordion Effect
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        header.classList.toggle('active');
        const content = header.nextElementSibling;

        if (header.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.style.maxHeight = 0;
        }
    });
});

// Scroll to Top Button
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerText = '↑';
scrollToTopButton.id = 'scrollToTopButton';
scrollToTopButton.style.position = 'fixed';
scrollToTopButton.style.bottom = '20px';
scrollToTopButton.style.right = '20px';
scrollToTopButton.style.padding = '10px';
scrollToTopButton.style.display = 'none'; // Hidden by default
document.body.appendChild(scrollToTopButton);

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show or hide the button based on scroll position
window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

// Modal Popup
const modal = document.createElement('div');
modal.id = 'modal';
modal.style.display = 'none'; // Hidden by default
modal.style.position = 'fixed';
modal.style.top = '0';
modal.style.left = '0';
modal.style.width = '100%';
modal.style.height = '100%';
modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
modal.style.color = '#fff';
modal.style.justifyContent = 'center';
modal.style.alignItems = 'center';
modal.style.zIndex = '1001';
modal.style.transition = 'opacity 0.5s ease';
document.body.appendChild(modal);

const modalContent = document.createElement('div');
modalContent.style.padding = '20px';
modalContent.style.background = '#333';
modalContent.style.borderRadius = '10px';
modal.appendChild(modalContent);

const closeModalButton = document.createElement('button');
closeModalButton.innerText = 'Close';
closeModalButton.style.marginTop = '20px';
closeModalButton.style.background = '#f39c12';
closeModalButton.style.color = '#fff';
closeModalButton.style.border = 'none';
closeModalButton.style.borderRadius = '5px';
modalContent.appendChild(closeModalButton);

document.querySelectorAll('#gallery img').forEach(image => {
    image.addEventListener('click', () => {
        modalContent.insertBefore(image.cloneNode(), closeModalButton); // Clone the clicked image
        modal.style.display = 'flex'; // Show modal
        modal.style.opacity = '1'; // Fade in effect
    });
});

closeModalButton.addEventListener('click', () => {
    modal.style.opacity = '0'; // Fade out effect
    setTimeout(() => {
        modal.style.display = 'none'; // Hide modal after fade out
        modalContent.removeChild(modalContent.childNodes[0]); // Remove the cloned image
    }, 500);
});
