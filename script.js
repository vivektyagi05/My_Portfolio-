const isLowEnd = navigator.hardwareConcurrency <= 4;

if (isLowEnd) {
    document.body.classList.add('low-end');
}


// ===== Advanced Theme System (Dark/Light + Accent) =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

const themes = [
    { mode: 'light', accent: 'default' },
    { mode: 'dark', accent: 'purple' },
    { mode: 'dark', accent: 'green' },
    { mode: 'dark', accent: 'gold' },
    { mode: 'dark', accent: 'pink' }
];

let themeIndex = parseInt(localStorage.getItem('themeIndex')) || 0;
applyTheme();

themeToggle.addEventListener('click', () => {
    themeIndex = (themeIndex + 1) % themes.length;
    localStorage.setItem('themeIndex', themeIndex);
    applyTheme();
});

function applyTheme() {
    const { mode, accent } = themes[themeIndex];

    html.setAttribute('data-theme', mode);
    html.setAttribute('data-accent', accent);

    themeIcon.className = mode === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}




// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 90;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Active Section Highlighting =====
const sections = document.querySelectorAll('section[id]');
const navLinksArray = document.querySelectorAll('.nav-link');

function highlightActiveSection() {
    const scrollY = window.pageYOffset + 150;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinksArray.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// ===== Header Scroll Effect =====
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    }
});

// ===== Auto Greeting Based on Time =====
// ===== Accurate Time-Based Greeting =====
const greetingEl = document.getElementById("autoGreeting");

if (greetingEl) {
    const hour = new Date().getHours();
    let greeting = "Hello, I'm";

    if (hour >= 4 && hour <= 11) {
        greeting = "Good Morning, I'm";
    } 
    else if (hour >= 12 && hour <= 16) {
        greeting = "Good Afternoon, I'm";
    } 
    else if (hour >= 17 && hour <= 19) {
        greeting = "Good Evening, I'm";
    } 
    else {
        greeting = "Good Night, I'm";
    }

    greetingEl.textContent = greeting;
}


// ===== Typing Effect for Hero Role =====
const roleText = document.getElementById('roleText');
const roles = ['Full Stack Developer', 'Web Designer', 'UI/UX Enthusiast', 'Problem Solver', 'Creative Coder', 'Cyber Enthusiast'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        roleText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        roleText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }

    setTimeout(typeRole, typingSpeed);
}

// Start typing effect after page load
setTimeout(typeRole, 1000);

// ===== Animated Counter for Stats =====
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            statNumbers.forEach(stat => {
                animateCounter(stat);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    statsObserver.observe(heroSection);
}

// ===== Skill Progress Animation =====
const skillBars = document.querySelectorAll('.skill-progress');

const animateSkills = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.style.width;
            progressBar.style.width = '0';
            setTimeout(() => {
                progressBar.style.width = width;
            }, 200);
            observer.unobserve(progressBar);
        }
    });
};

const skillsObserver = new IntersectionObserver(animateSkills, {
    threshold: 0.5
});

skillBars.forEach(bar => {
    skillsObserver.observe(bar);
});

// ===== Fade In Animation on Scroll =====
const fadeElements = document.querySelectorAll('.project-card, .timeline-item, .cert-card, .skill-category');

const fadeInOnScroll = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
};

const fadeObserver = new IntersectionObserver(fadeInOnScroll, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(element);
});

// ===== Project Filter Functionality =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ===== Contact Form Validation and Submission =====
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    formMessage.className = 'form-message';
    formMessage.textContent = '';

    if (!name || !email || !message) {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Please fill in all fields.';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Please enter a valid email address.';
        return;
    }

    // Success animation
    formMessage.className = 'form-message success';
    formMessage.textContent = 'Thank you! Your message has been sent successfully. ✨';
    
    // Reset form
    contactForm.reset();
    
    // Hide success message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
        formMessage.textContent = '';
    }, 5000);
});

// ===== Resume Download =====
const downloadResumeBtn = document.getElementById('download-resume');

if (downloadResumeBtn) {
    downloadResumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Replace this with your actual resume PDF path
        alert('Resume download: Replace this with actual PDF download link in script.js');
        
        // Uncomment and add your resume file:
        // const link = document.createElement('a');
        // link.href = 'resume.pdf';
        // link.download = 'Resume.pdf';
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);
    });
}
// chat boot
const toggle = document.getElementById("chatbotToggle")
const windowBot = document.getElementById("chatbotWindow")
const closeBtn = document.getElementById("chatbotClose")

const input = document.getElementById("chatbotInput")
const send = document.getElementById("chatbotSend")
const messages = document.getElementById("chatbotMessages")

const voiceBtn = document.getElementById("voiceBtn")

toggle.onclick=()=>{
windowBot.classList.toggle("active")
}

closeBtn.onclick=()=>{
windowBot.classList.remove("active")
}

send.onclick=sendMessage

input.addEventListener("keypress",e=>{
if(e.key==="Enter") sendMessage()
})

async function sendMessage(){

const text = input.value.trim()

if(!text) return

addMessage(text,"user-message")

input.value=""

addTyping()

try{

const response = await fetch("http://localhost:3000/chat",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
message:text
})
})

const data = await response.json()

removeTyping()

addMessage(data.reply,"bot-message")

}catch(err){

removeTyping()

addMessage("Server connection failed.","bot-message")

}

}

function addMessage(text,type){

const msg=document.createElement("div")

msg.className=type

msg.innerHTML=text

messages.appendChild(msg)

messages.scrollTop=messages.scrollHeight

}

function addTyping(){

const t=document.createElement("div")
t.id="typing"
t.className="bot-message"
t.innerHTML="AI typing..."
messages.appendChild(t)

}

function removeTyping(){

const t=document.getElementById("typing")
if(t) t.remove()

}

/* Voice input */

const recognition = new webkitSpeechRecognition()

voiceBtn.onclick=()=>{
recognition.start()
}

recognition.onresult=(e)=>{
input.value=e.results[0][0].transcript
}


// ===== Parallax Effect for Hero Section =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / window.innerHeight;
    }
});

// ===== Console Message =====
console.log('%c👋 Welcome to my Ultra-Modern Portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript | Features: Dark Mode, AI Chatbot, Smooth Animations', 'color: #764ba2; font-size: 14px;');
console.log('%cCheck out the code on GitHub!', 'color: #f093fb; font-size: 12px;');

/* ================= HERO IMAGE SCROLL BLUR ================= */

// ===== Hero Image Scroll Blur (Optimized) =====
const heroImages = document.querySelectorAll('.hero-img');

window.addEventListener('scroll', () => {
    const y = window.scrollY;
    heroImages.forEach(img => {
        img.style.filter = `blur(${Math.min(y / 120, 14)}px)`;
        img.style.opacity = Math.max(0.7 - y / 1200, 0.15);
    });
});

// ===== Hero Cinematic Light Movement =====
const hero = document.querySelector('.hero');
const heroLight = document.querySelector('.hero-light');

if (hero && heroLight) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        heroLight.style.setProperty('--x', `${x}%`);
        heroLight.style.setProperty('--y', `${y}%`);
    });
}

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            highlightActiveSection();
            ticking = false;
        });
        ticking = true;
    }
});
