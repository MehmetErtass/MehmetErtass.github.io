const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const skillBars = document.querySelectorAll('.skill-bar div');
const sections = document.querySelectorAll('.section');
const projectCards = document.querySelectorAll('.project-card');
const jobCards = document.querySelectorAll('.job-card');
const eduCards = document.querySelectorAll('.edu-card');
const profileImg = document.querySelector('.profile-img');
const navbarToggle = document.getElementById('navbar-toggle');
const navbarMenu = document.getElementById('navbar-menu');
const anchorLinks = document.querySelectorAll('a[href^="#"]');
const contactForm = document.getElementById('contact-form');
const projectFilterButtons = document.querySelectorAll('.project-filter button');


// THEME TOGGLE
themeToggle?.addEventListener('click', () => {
  html.classList.toggle('dark-mode');
  localStorage.setItem('theme', html.classList.contains('dark-mode') ? 'dark' : 'light');
});

if (localStorage.getItem('theme') === 'dark') {
  html.classList.add('dark-mode');
}


// NAVBAR TOGGLE (MOBILE)
navbarToggle?.addEventListener('click', () => {
  navbarMenu?.classList.toggle('open');
});


// SKILL BAR ANİMASYONU
let skillsAnimated = false;
function animateSkills() {
  skillBars.forEach(bar => {
    const targetWidth = bar.getAttribute('data-width') || '0%';
    bar.style.width = targetWidth;
  });
}

window.addEventListener('scroll', () => {
  const skillsSection = document.getElementById('skills');
  if (skillsSection && !skillsAnimated && window.scrollY + window.innerHeight > skillsSection.offsetTop + 100) {
    animateSkills();
    skillsAnimated = true;
  }
});


// SECTIONS FADE-IN ON SCROLL
function fadeInSections() {
  const windowBottom = window.scrollY + window.innerHeight - 50;
  sections.forEach(section => {
    if (windowBottom > section.offsetTop) {
      section.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', fadeInSections);


// CARD HOVER ANİMASYONU
function addCardHoverAnimation(cards, shadowColor = 'rgba(0,0,0,0.2)') {
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
      card.style.boxShadow = `0 15px 30px ${shadowColor}`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
    });
  });
}

addCardHoverAnimation(projectCards, 'rgba(0,0,0,0.3)');
addCardHoverAnimation(jobCards, 'rgba(0,0,0,0.2)');
addCardHoverAnimation(eduCards, 'rgba(0,0,0,0.15)');


// PROFILE IMAGE PARALLAX SCROLL
window.addEventListener('scroll', () => {
  if (profileImg) {
    const value = window.scrollY * 0.3;
    profileImg.style.transform = `translateY(${value}px) scale(1.05)`;
  }
});


// SMOOTH SCROLL ANCHOR LINKS
anchorLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if(target){
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if(navbarMenu.classList.contains('open')) navbarMenu.classList.remove('open');
    }
  });
});


// CONTACT FORM SUBMIT (MOCK AJAX)
if(contactForm){
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const status = document.getElementById('form-status');
    status.textContent = "Mesaj gönderiliyor...";
    status.style.color = "#007bff";

    setTimeout(() => {
      status.textContent = "Mesajınız başarıyla gönderildi!";
      status.style.color = "green";
      contactForm.reset();
    }, 1500);
  });
}


// LIST ITEM HOVER ANIMATION
function animateListItems(cards){
  cards.forEach(card => {
    const listItems = card.querySelectorAll('li');
    listItems.forEach((li, i) => {
      li.style.opacity = 0;
      li.style.transform = 'translateX(-50px)';
      li.style.transition = `all 0.5s ease ${i*0.1}s`;
    });
    card.addEventListener('mouseenter', () => {
      listItems.forEach(li => {
        li.style.opacity = 1;
        li.style.transform = 'translateX(0)';
      });
    });
  });
}
animateListItems(jobCards);
animateListItems(eduCards);


// PROJECT DESCRIPTION FADE-IN
function fadeProjectDescriptions() {
  projectCards.forEach(card => {
    const desc = card.querySelector('p');
    if (!desc) return;
    desc.style.opacity = 0;
    desc.style.transform = 'translateY(30px)';
    desc.style.transition = 'all 0.6s ease-out';
    if(window.scrollY + window.innerHeight > card.offsetTop + 50){
      desc.style.opacity = 1;
      desc.style.transform = 'translateY(0)';
    }
  });
}
window.addEventListener('scroll', fadeProjectDescriptions);


// PROJECT FILTER BUTTONS
projectFilterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filter = button.getAttribute('data-category');
    projectFilterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    projectCards.forEach(card => {
      const category = card.getAttribute('data-category');
      if(filter === 'all' || category === filter){
        card.style.display = 'block';
        setTimeout(()=>card.classList.add('visible'), 50);
      } else {
        card.style.display = 'none';
        card.classList.remove('visible');
      }
    });
  });
});


// HEADER SHADOW ON SCROLL
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if(header){
    header.style.boxShadow = window.scrollY > 50 ? '0 8px 20px rgba(0,0,0,0.2)' : '0 4px 10px rgba(0,0,0,0.05)';
  }
});


// HEADER TYPING EFFECT
const headerText = document.querySelector('header h2');
if(headerText){
  const text = headerText.textContent;
  headerText.textContent = '';
  let index = 0;
  function typeEffect(){
    if(index < text.length){
      headerText.textContent += text.charAt(index);
      index++;
      setTimeout(typeEffect, 50);
    }
  }
  typeEffect();
}


// BACK TO TOP BUTTON
const backToTop = document.createElement('button');
backToTop.id = 'back-to-top';
backToTop.textContent = '↑';
Object.assign(backToTop.style, {
  position: 'fixed', bottom: '30px', right: '30px',
  padding: '12px 16px', border: 'none', borderRadius: '50%',
  backgroundColor: '#007bff', color: '#fff', cursor: 'pointer',
  fontSize: '1.5rem', display: 'none', zIndex: '1000', transition: 'all 0.3s'
});
document.body.appendChild(backToTop);
backToTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
window.addEventListener('scroll', () => {
  backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});


// RANDOM SECTION BACKGROUND
sections.forEach(section => {
  section.addEventListener('mouseenter', () => {
    section.style.backgroundColor = `hsl(${Math.floor(Math.random()*360)}, 60%, 90%)`;
  });
  section.addEventListener('mouseleave', () => {
    section.style.backgroundColor = '';
  });
});


// RIPPLE EFFECT
const style = document.createElement('style');
style.innerHTML = `
.ripple {
  position: absolute;
  width: 20px;
  height: 20px;
  background: rgba(0,123,255,0.4);
  border-radius: 50%;
  pointer-events: none;
  transform: scale(0);
  animation: ripple-effect 0.6s linear;
}
@keyframes ripple-effect {
  to {
    transform: scale(15);
    opacity: 0;
  }
}`;


// PROJECT FILTER
document.head.appendChild(style);
document.addEventListener('DOMContentLoaded', () => {
  const projectFilterButtons = document.querySelectorAll('.project-filter button');
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach(card => {
    card.style.display = 'block';
    setTimeout(() => card.classList.add('visible'), 50);
  });

  projectFilterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.getAttribute('data-filter');

      projectFilterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if(filter === 'all' || category === filter){
          card.style.display = 'block';
          setTimeout(() => card.classList.add('visible'), 50);
        } else {
          card.classList.remove('visible');
          setTimeout(() => { card.style.display = 'none'; }, 300);
        }
      });
    });
  });
});

