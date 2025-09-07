document.addEventListener('DOMContentLoaded', function() {
    // Elements selection
    const rebelLine = document.querySelector('.rebel-line');
    const againstLine = document.querySelector('.against-line');
    const boringLine = document.querySelector('.boring-line');
    const letterO = document.querySelector('.letter-o');
    const videoContainer = document.getElementById('video-o');
    const video = videoContainer.querySelector('video');
    const introText = document.querySelector('.intro-text');
    const hoverTip = document.querySelector('.hover-tip');
    const splitTexts = document.querySelectorAll('.split-text');
    
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const gradientOverlay = document.querySelector('.gradient-overlay');
    
    let mouseX = 0;
    let mouseY = 0;
    
    // Show hover tip animation
    gsap.to(hoverTip, {
        opacity: 1,
        duration: 5,
        delay: 1,
        yoyo: true,
        repeat: 1,
        repeatDelay: 1
    });
    
    // Create split text animation
    function createSplitAnimation() {
        splitTexts.forEach((text, index) => {
            // Create the pseudo-elements for the split effect
            const styleElement = document.createElement('style');
            
            const animationName = `splitAnim${index}`;
            
            // Animation for both halves
            styleElement.innerHTML = `
                .split-text[data-text="${text.dataset.text}"]::after {
                    animation: ${animationName}Bottom 3s infinite ease-in-out;
                }
                
                .split-text[data-text="${text.dataset.text}"]::before {
                    animation: ${animationName}Top 3s infinite ease-in-out;
                }
                
                @keyframes ${animationName}Bottom {
                    0%, 100% {
                        transform: translateY(-50%) translateX(0);
                    }
                    50% {
                        transform: translateY(-50%) translateX(-10px);
                    }
                }
                
                @keyframes ${animationName}Top {
                    0%, 100% {
                        transform: translateX(0);
                    }
                    50% {
                        transform: translateX(10px);
                    }
                }
            `;
            
            document.head.appendChild(styleElement);
        });
    }
    
    // Mouse movement tracking - ONLY for gradient and cursor
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Move custom cursor
        gsap.to(cursor, {
            x: mouseX,
            y: mouseY,
            duration: 0.1
        });
        
        gsap.to(cursorFollower, {
            x: mouseX,
            y: mouseY,
            duration: 0.6
        });
        
        const posX = (mouseX / window.innerWidth) - 0.5;
        const posY = (mouseY / window.innerHeight) - 0.5;
        
        // Only move the gradient overlay, not the text
        gsap.to(gradientOverlay, {
            x: posX * 100,
            y: posY * 100,
            duration: 0.9,
            ease: "power2.out"
        });
    });
    
    // Text elements hover effects - only for cursor changes
    const textElements = document.querySelectorAll('.rebel-line, .against-line, .boring-line, .intro-text');
    
    textElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 1.5, backgroundColor: 'rgba(255, 60, 120, 0.8)' });
            gsap.to(cursorFollower, { scale: 1.2, borderColor: 'rgba(255, 60, 120, 0.5)' });
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, backgroundColor: 'rgba(255, 60, 120, 0.5)' });
            gsap.to(cursorFollower, { scale: 0.8, borderColor: 'rgba(255, 60, 120, 0.3)' });
        });
    });
    
    // Scatter animation setup (similar to the SVG example)
    const tmax_optionsGlobal = {
        repeat: -1,
        repeatDelay: 2,
        yoyo: true
    };
    
    const tl = new gsap.timeline(tmax_optionsGlobal);
    const animatedElements = document.querySelectorAll('.rebel-line, .against-line, .boring-line, .video-container, .intro-text');
    const stagger_val = 0.25;
    const duration = 2;
    
    // Function to get random values
    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    // Set initial scattered state
    animatedElements.forEach((el, i) => {
        gsap.set(el, {
            x: () => getRandom(-500, 500),
            y: () => getRandom(-500, 500),
            rotation: () => getRandom(-720, 720),
            scale: 0,
            opacity: 0
        });
    });
    
    // Animate to normal state
    const stagger_opts_to = {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        ease: "power4.inOut",
        onComplete: function() {
            // Show video when animation completes
            if (this.targets()[0] === videoContainer) {
                video.play();
            }
            
            // Start the split text animation after the scatter animation completes
            createSplitAnimation();
        }
    };
    
    tl.staggerTo(animatedElements, duration, stagger_opts_to, stagger_val);
    
    // Hover to control animation speed - only for the scatter animation
    // const heroSection = document.querySelector('.hero');
    // heroSection.addEventListener('mouseenter', () => {
    //     tl.timeScale(0.15);
    // });
    
    // heroSection.addEventListener('mouseleave', () => {
    //     tl.timeScale(1);
    // });
    
    // Original animation for the intro text
    gsap.to(introText, {
        opacity: 1,
        y: 0,
        duration: 3,
        ease: "power2.out",
        delay: 2
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const videoContainer = document.getElementById('video-o');
  const video = videoContainer.querySelector('video');
  const splitTexts = document.querySelectorAll('.split-text');

  // Split text animation setup
  function createSplitAnimation() {
    splitTexts.forEach((text, index) => {
      const styleElement = document.createElement('style');
      const animationName = `splitAnim${index}`;
      styleElement.innerHTML = `
        .split-text[data-text="${text.dataset.text}"]::after {
          animation: ${animationName}Bottom 3s infinite ease-in-out;
        }
        .split-text[data-text="${text.dataset.text}"]::before {
          animation: ${animationName}Top 3s infinite ease-in-out;
        }
        @keyframes ${animationName}Bottom {
          0%, 100% { transform: translateY(-50%) translateX(0); }
          50% { transform: translateY(-50%) translateX(-10px); }
        }
        @keyframes ${animationName}Top {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
      `;
      document.head.appendChild(styleElement);
    });
  }

  // Timeline for video animation
  function playVideoAnimation() {
    const tl = gsap.timeline({
      onStart: () => {
        video.currentTime = 0; // restart video
        video.play();
      },
      onComplete: () => {
        // When video ends, shrink back
        video.addEventListener('ended', () => {
          gsap.to(videoContainer, {
            duration: 2,
            scale: 0.8,
            x: 0,
            opacity: 0,
            ease: "power2.inOut",
            onComplete: () => {
              // restart full cycle
              playVideoAnimation();
            }
          });
        }, { once: true });
      }
    });

    tl.fromTo(videoContainer,
      { opacity: 0, scale: 0.5, x: 0 },
      { opacity: 1, scale: 1.5, x: 100, duration: 2.5, ease: "power3.out" } // grow + move right
    )
    .to(videoContainer, {
      scale: 1.2, // settle slightly smaller
      x: 80,
      duration: 1.5,
      ease: "power2.inOut"
    });

    return tl;
  }

  // Trigger animations
  createSplitAnimation();
  playVideoAnimation();
});

function playVideoAnimation() {
    const tl = gsap.timeline({
      onStart: () => {
        video.currentTime = 0; // restart video
        video.play();
      },
      onComplete: () => {
        // When video ends, shrink back
        video.addEventListener('ended', () => {
          gsap.to(videoContainer, {
            duration: 3,       // slow shrink back
            scale: 0.8,
            x: 0,
            opacity: 0,
            ease: "power3.inOut",
            onComplete: () => {
              playVideoAnimation(); // restart cycle
            }
          });
        }, { once: true });
      }
    });
  
    tl.fromTo(videoContainer,
      { opacity: 0, scale: 0.3, x: 0 },      // start very small
      { opacity: 1, scale: 3, x: 100, duration: 5, ease: "power3.out" } // very big circle slowly
    )
    .to(videoContainer, {
      scale: 2.5,   // settle slightly smaller after expanding
      x: 80,
      duration: 2,
      ease: "power2.inOut"
    });
  
    return tl;
  }
  