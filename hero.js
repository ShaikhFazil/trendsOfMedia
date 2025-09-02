document.addEventListener('DOMContentLoaded', function() {
    const rebelLine = document.querySelector('.rebel-line');
    const againstLine = document.querySelector('.against-line');
    const boringLine = document.querySelector('.boring-line');
    const letterO = document.querySelector('.letter-o');
    const videoContainer = document.getElementById('video-o');
    const video = videoContainer.querySelector('video');
    const introText = document.querySelector('.intro-text');
    
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    const gradientOverlay = document.querySelector('.gradient-overlay');
    
    let mouseX = 0;
    let mouseY = 0;
    
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
        
        gsap.to(gradientOverlay, {
            x: posX * 100,
            y: posY * 100,
            duration: 0.5,
            ease: "power2.out"
        });
        
        gsap.to([rebelLine, againstLine, boringLine], {
            x: posX * 10,
            y: posY * 10,
            duration: 1,
            ease: "power2.out",
            stagger: 0.1
        });
    });
    
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
    
    const masterTL = gsap.timeline();
    
    masterTL
        .fromTo(rebelLine, 
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
        )
        .fromTo(againstLine, 
            { opacity: 0, x: -100 },
            { opacity: 1, x: 0, duration: 1.5, ease: "power2.out" },
            "-=1"
        )
        .fromTo(boringLine, 
            { opacity: 0, x: -100 },
            { 
                opacity: 1, 
                x: 0, 
                duration: 1.5, 
                ease: "power2.out",
                onComplete: function() {
                    // Show video
                    gsap.to(videoContainer, {
                        opacity: 1,
                        scale: 1,
                        duration: 1.5,
                        ease: "elastic.out(1, 0.5)"
                    });
                    video.play();
                }
            },
            "-=1"
        )
        // Show intro text
        .to(introText, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out"
        }, "-=0.5");
});