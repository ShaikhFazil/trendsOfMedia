// Typewriter effect
document.addEventListener('DOMContentLoaded', function() {
  const typewriterElement = document.getElementById('typewriter');
  const words = ['Websites', 'Templates', 'Designs', 'Experiences'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 150;
  
  function type() {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
          typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
          charIndex--;
          typeSpeed = 100;
      } else {
          typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
          charIndex++;
          typeSpeed = 150;
      }
      
      if (!isDeleting && charIndex === currentWord.length) {
          typeSpeed = 2000; // Pause at end
          isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          typeSpeed = 500; // Pause before new word
      }
      
      setTimeout(type, typeSpeed);
  }
  
  type();
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
      navbar.style.padding = '10px 0';
      navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  } else {
      navbar.style.padding = '15px 0';
      navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
          window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
          });
      }
  });
});