document.addEventListener('DOMContentLoaded', () => {
  // Update copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Mobile hamburger nav toggle
  const hamburger = document.getElementById('nav-hamburger');
  const mainNav  = document.getElementById('main-nav');
  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
    // Close nav on link click
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => mainNav.classList.remove('open'));
    });
  }

  // Define platform brand colors for dynamic styles
  const platformColors = {
    'linkedin':  { color: '#0077b5', glow: 'rgba(0, 119, 181, 0.3)' },
    'github':    { color: '#24292e', glow: 'rgba(36, 41, 46, 0.3)' },
    'instagram': { color: '#e1306c', glow: 'rgba(225, 48, 108, 0.3)' },
    'facebook':  { color: '#1877f2', glow: 'rgba(24, 119, 242, 0.3)' },
    'youtube':   { color: '#ff0000', glow: 'rgba(255, 0, 0, 0.3)' },
    'tiktok':    { color: '#ff0050', glow: 'rgba(255, 0, 80, 0.3)' },
    'maker':     { color: '#ff6b00', glow: 'rgba(255, 107, 0, 0.3)' },
    'mail':      { color: '#ea4335', glow: 'rgba(234, 67, 53, 0.3)' },
    'whatsapp':  { color: '#25d366', glow: 'rgba(37, 211, 102, 0.3)' }
  };

  function getPlatformKey(title, url) {
    const checkString = (title + ' ' + url).toLowerCase();
    if (checkString.includes('linkedin'))  return 'linkedin';
    if (checkString.includes('github'))    return 'github';
    if (checkString.includes('instagram')) return 'instagram';
    if (checkString.includes('facebook') || checkString.includes('sakr.makes')) return 'facebook';
    if (checkString.includes('youtube'))   return 'youtube';
    if (checkString.includes('tiktok'))    return 'tiktok';
    if (checkString.includes('maker') || checkString.includes('makerworld')) return 'maker';
    if (checkString.includes('mailto') || checkString.includes('mail')) return 'mail';
    if (checkString.includes('wa.me') || checkString.includes('whatsapp')) return 'whatsapp';
    return null;
  }

  /* ==========================================================================
     DATA HYDRATION FROM DATA.JSON
     ========================================================================== */
  const heroBio     = document.getElementById('hero-bio');
  const heroSocials = document.getElementById('hero-socials');
  const linksGrid   = document.getElementById('links-grid');

  // Hardcoded fallback data in case data.json fetch fails (e.g. running on file:// protocol)
  const fallbackData = {
    "profile": {
      "handle": "Mohamed Sakr",
      "title": "AI & ML Engineer · Computer Engineering Student",
      "bio": "I'm a Computer Engineering student with a strong passion for technology, innovation, and building solutions that turn ideas into reality. Specializing in AI, data, and 3D prototyping.",
      "avatar": "Mohamed Sakr.png",
      "role": "Founder of Sakr Makes"
    },
    "socials": [
      { "icon": "fa-brands fa-linkedin-in", "url": "https://www.linkedin.com/in/mohamed-sakr-15b674279/", "platform": "LinkedIn" },
      { "icon": "fa-brands fa-github",      "url": "https://github.com/M0hamedSakr", "platform": "Github" },
      { "icon": "fa-brands fa-instagram",   "url": "https://www.instagram.com/mohamed_sakre_______/", "platform": "Instagram" },
      { "icon": "fa-brands fa-facebook-f",  "url": "https://www.facebook.com/mohamed.m.sakrr?locale=ar_AR", "platform": "Facebook" }
    ],
    "links": [
      { "title": "Sakr Makes (Facebook)",    "icon": "fa-brands fa-facebook-f",           "url": "https://www.facebook.com/sakr.makes" },
      { "title": "Sakr Makes (Instagram)",   "icon": "fa-brands fa-instagram",            "url": "https://www.instagram.com/sakr.makes/" },
      { "title": "LinkedIn Profile",         "icon": "fa-brands fa-linkedin-in",          "url": "https://www.linkedin.com/in/mohamed-sakr-15b674279/" },
      { "title": "Github Repository",        "icon": "fa-brands fa-github",               "url": "https://github.com/M0hamedSakr" },
      { "title": "Youtube Channel",          "icon": "fa-brands fa-youtube",              "url": "https://www.youtube.com/@SAKRMAKES" },
      { "title": "TikTok Creator Page",      "icon": "fa-brands fa-tiktok",              "url": "https://www.tiktok.com/@sakr_makes" },
      { "title": "Maker World 3D Designs",   "icon": "fa-solid fa-wand-magic-sparkles",  "url": "https://makerworld.com/en/@saKR" },
      { "title": "Gmail Contact",            "icon": "fa-solid fa-envelope",             "url": "mailto:mo.sakr1400@gmail.com" },
      { "title": "WhatsApp Message",         "icon": "fa-brands fa-whatsapp",            "url": "https://wa.me/201009252592" }
    ],
    "experience": [
      {
        "id": "sakr-makes-founder",
        "title": "Founder",
        "organization": "Sakr Makes",
        "type": "Freelance",
        "startDate": "Dec 2025",
        "endDate": "Present",
        "duration": "6 mos",
        "location": "Egypt",
        "description": "Founded and lead Sakr Makes — a maker brand bringing ideas to life through 3D printing, Fusion 360 mechanical modeling, hardware prototyping, and engineering content creation.",
        "skills": ["Engineering", "AI", "3D Printing", "Fusion 360", "Content Creation"],
        "icon": "fa-solid fa-screwdriver-wrench",
        "colorClass": "exp-accent"
      },
      {
        "id": "ieee-vice-chair",
        "title": "Vice Chair",
        "organization": "IEEE MET CSC",
        "type": "Part time",
        "startDate": "Sep 2025",
        "endDate": "Present",
        "duration": "9 mos",
        "location": "El Mansoura, Ad Daqahliyah, Egypt",
        "description": "Leading IEEE MET Computer Society Chapter initiatives — coordinating technical and non-technical teams, organizing workshops, coding bootcamps, and developer competitions for students.",
        "skills": ["Leadership", "Event Organization", "Community Building", "Team Coordination"],
        "icon": "fa-solid fa-users",
        "colorClass": "exp-pink"
      },
      {
        "id": "it-support-internship",
        "title": "IT Support Specialist",
        "organization": "Let's Know Training & Consulting Center",
        "type": "Internship",
        "startDate": "Jan 2025",
        "endDate": "Jun 2025",
        "duration": "6 mos",
        "location": "El Mansoura, Ad Daqahliyah, Egypt",
        "description": "During this internship journey, I gained practical hands-on IT support and networking skills working with real enterprise systems and configurations.",
        "skills": ["DHCP", "DNS", "Networking", "IT Support", "Systems Administration"],
        "icon": "fa-solid fa-server",
        "colorClass": "exp-secondary"
      }
    ],
    "certifications": [
      { "id": "huawei-ai",     "title": "Artificial Intelligence Certification", "issuer": "HUAWEI",            "icon": "fa-solid fa-brain",            "category": "AI & ML",                  "categoryClass": "cat-ai" },
      { "id": "icpc",          "title": "International Collegiate Programming Contest", "issuer": "ICPC Foundation", "icon": "fa-solid fa-trophy",      "category": "Competitive Programming",  "categoryClass": "cat-competitive" },
      { "id": "nvidia-ml",     "title": "Machine Learning with Python",          "issuer": "NVIDIA",            "icon": "fa-solid fa-microchip",        "category": "AI & ML",                  "categoryClass": "cat-ai" },
      { "id": "sprint-python", "title": "Python & AI Development",               "issuer": "Sprint",            "icon": "fa-brands fa-python",          "category": "Programming",              "categoryClass": "cat-programming" },
      { "id": "makertech",     "title": "Python Development",                    "issuer": "MakerTech",         "icon": "fa-brands fa-python",          "category": "Programming",              "categoryClass": "cat-programming" },
      { "id": "hero-found",   "title": "Programming Foundation",                "issuer": "Programming Hero",  "icon": "fa-solid fa-code",             "category": "Programming",              "categoryClass": "cat-programming" },
      { "id": "hero-dsa",      "title": "Algorithms & Problem Solving",          "issuer": "Programming Hero",  "icon": "fa-solid fa-diagram-project",  "category": "Competitive Programming",  "categoryClass": "cat-competitive" },
      { "id": "creative",      "title": "Digital Fabrication & Content Creation","issuer": "Creative",          "icon": "fa-solid fa-wand-magic-sparkles","category": "Design",                 "categoryClass": "cat-design" }
    ],
    "projects": [
      {
        "id": "cleaner-robot",
        "title": "Cleaner Robot",
        "tagline": "Water Surface Cleaning Robot Project",
        "category": "Robotics & Hardware",
        "description": "An autonomous water-surface robot built with a team to collect and clean floating waste. Initiated with full 3D Fusion 360 models, it uses camera detection to lift trash into its cargo container automatically.",
        "components": ["4 DC motors (differential locomotion)", "Conveyor belt lift mechanism", "Relay module controllers", "Motor driver circuits", "ESP32-CAM (trash visual tracking)"],
        "skills": ["Arduino", "Autodesk Fusion", "ESP32-CAM", "Robotics"],
        "image": "fa-solid fa-robot",
        "photo": "1747401996748.jfif",
        "teamPhoto": "1748158090945.jfif"
      },
      {
        "id": "generate-qrcode",
        "title": "Generate QRCode",
        "tagline": "Excel-to-QR Automation Utility",
        "category": "AI & Software",
        "description": "A Python automation utility built with Tkinter, Pandas, and QRCode libraries. It processes input Excel rosters, cleans duplicates, and outputs high-quality, individual QR codes to streamline event registration.",
        "components": ["Tkinter GUI layout", "Pandas data cleaning parser", "QR Code generation engine", "Automated directory storage"],
        "skills": ["Python", "Tkinter", "Pandas", "Data Automation"],
        "image": "fa-solid fa-qrcode"
      },
      {
        "id": "mobile-car",
        "title": "Mobile Car",
        "tagline": "Elderly Assistive Smart Mobile Cart",
        "category": "Robotics & Hardware",
        "description": "A mechanical mobile cart designed to assist the elderly. It moves, maneuvers, and raises/lifts loads inside cramped indoor locations. Designed using Fusion 360 and built with Arduino control.",
        "components": ["Lifting scissor-jack mechanism", "Arduino microcontroller brain", "Fusion 360 chassis modeling", "High-torque gear motors"],
        "skills": ["Arduino", "Autodesk Fusion", "Hardware Prototyping", "C++"],
        "image": "fa-solid fa-car",
        "photo": "1746779083872.jfif",
        "detailPhoto": "1748158249134.jfif"
      },
      {
        "id": "my-health",
        "title": "My Health",
        "tagline": "Smart Medication Scheduler & Alerter",
        "category": "AI & Software",
        "description": "A GUI scheduler designed to help patients manage and adhere to medication times. Users log medications and reminder timings, triggering immediate speaker audio tones and Twilio phone SMS notifications.",
        "components": ["Tkinter prescription GUI", "Playsound audio playback triggers", "Twilio SMS gateway integration", "Schedule background polling thread"],
        "skills": ["Python", "Tkinter", "Twilio API", "Audio/SMS Alerters"],
        "image": "fa-solid fa-heart-pulse"
      },
      {
        "id": "triago",
        "title": "TRIAGO",
        "tagline": "Responsive Sales E-Store Front",
        "category": "Web Dev",
        "description": "A modern, responsive e-commerce showcase storefront built to replicate a digital electronics shop. Features visual hover transformations and a responsive layouts grid.",
        "components": ["HTML5 layout scaffolding", "Vanilla CSS variables & grid structure", "Interactive product showcase lists", "GitHub Pages automated deployment"],
        "skills": ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
        "image": "fa-solid fa-cart-shopping",
        "url": "https://m0hamedsakr.github.io/TRIAGO/",
        "github": "https://github.com/M0hamedSakr/TRIAGO"
      },
      {
        "id": "wheelchair",
        "title": "Smart Wheelchair",
        "tagline": "Assistive Collision-Avoidance Wheelchair",
        "category": "Robotics & Hardware",
        "description": "An upgraded electric wheelchair featuring automatic sonar collision prevention, user fall-detection triggers, and joystick control, aiming to increase independent mobility safety.",
        "components": ["Ultrasonic distance ranging arrays", "IMU sensor fall-detection algorithm", "Analog joystick steering handler", "Direct motor speed driver outputs"],
        "skills": ["Arduino", "Sensors", "Fall Detection", "Control Systems"],
        "image": "fa-solid fa-wheelchair",
        "photo": "1755630400893.jfif"
      }
    ]
  };

  const projectsGrid = document.getElementById('projects-grid');

  function renderData(data) {
    // 1. Populate Bio
    if (data.profile && data.profile.bio && heroBio) {
      heroBio.textContent = data.profile.bio;
    }

    // 2. Populate Hero Social Bar
    if (data.socials && heroSocials) {
      heroSocials.innerHTML = '';
      data.socials.forEach(social => {
        const a = document.createElement('a');
        a.href = social.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'social-icon-btn';
        a.setAttribute('aria-label', social.platform || 'Social');
        const i = document.createElement('i');
        i.className = social.icon;
        a.appendChild(i);
        heroSocials.appendChild(a);
      });
    }

    // 3. Populate Links Hub Grid
    if (data.links && linksGrid) {
      linksGrid.innerHTML = '';
      data.links.forEach(link => {
        const platformKey   = getPlatformKey(link.title, link.url);
        const platformStyle = platformColors[platformKey] || { color: 'var(--accent-color)', glow: 'var(--glow-color)' };

        const a = document.createElement('a');
        a.href   = link.url;
        a.target = '_blank';
        a.rel    = 'noopener noreferrer';
        a.className = 'link-card';
        a.style.setProperty('--card-platform-color', platformStyle.color);
        a.style.setProperty('--card-platform-glow',  platformStyle.glow);

        a.innerHTML = `
          <div class="link-card-glow"></div>
          <div class="link-icon-wrapper">
            <i class="${link.icon}"></i>
          </div>
          <div class="link-card-info">
            <span class="link-card-title">${link.title}</span>
            <span class="link-card-url">${cleanUrlDisplay(link.url)}</span>
          </div>
          <div class="link-arrow">
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </div>
        `;

        a.addEventListener('mousemove', (e) => {
          const rect = a.getBoundingClientRect();
          a.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
          a.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });

        linksGrid.appendChild(a);
      });
    }

    // 4. Populate Experience Timeline
    if (data.experience) {
      renderExperience(data.experience);
    }

    // 5. Populate Certifications
    if (data.certifications) {
      renderCertifications(data.certifications);
    }

    // 6. Populate Projects Showcase
    if (data.projects && projectsGrid) {
      renderProjects(data.projects);
      setupProjectsFilter();
    }
  }

  /* ------------------------------------------------------------------
     EXPERIENCE RENDERER
  ------------------------------------------------------------------ */
  function renderExperience(experiences) {
    const timeline = document.getElementById('experience-timeline');
    if (!timeline) return;
    timeline.innerHTML = '';

    experiences.forEach(exp => {
      const card = document.createElement('div');
      card.className = `exp-card ${exp.colorClass || ''}`;

      const skillsHTML = (exp.skills || [])
        .map(s => `<span class="exp-skill-tag">${s}</span>`)
        .join('');

      card.innerHTML = `
        <div class="exp-dot"></div>
        <div class="exp-icon"><i class="${exp.icon || 'fa-solid fa-briefcase'}"></i></div>
        <div class="exp-body">
          <div class="exp-header">
            <div>
              <div class="exp-title">${exp.title}</div>
              <div class="exp-org">${exp.organization}</div>
            </div>
            <span class="exp-type-badge">${exp.type}</span>
          </div>
          <div class="exp-meta">
            <span class="exp-meta-item">
              <i class="fa-solid fa-calendar-alt"></i>
              ${exp.startDate} — ${exp.endDate} · ${exp.duration}
            </span>
            <span class="exp-meta-item">
              <i class="fa-solid fa-location-dot"></i>
              ${exp.location}
            </span>
          </div>
          <p class="exp-desc">${exp.description}</p>
          <div class="exp-skills">${skillsHTML}</div>
        </div>
      `;

      timeline.appendChild(card);
    });
  }

  /* ------------------------------------------------------------------
     CERTIFICATIONS RENDERER
  ------------------------------------------------------------------ */
  function renderCertifications(certs) {
    const grid = document.getElementById('certifications-grid');
    if (!grid) return;
    grid.innerHTML = '';

    certs.forEach(cert => {
      const card = document.createElement('div');
      card.className = `cert-card ${cert.categoryClass || ''}`;

      card.innerHTML = `
        <div class="cert-icon-box">
          <i class="${cert.icon}"></i>
        </div>
        <div class="cert-info">
          <div class="cert-title">${cert.title}</div>
          <div class="cert-issuer"><i class="fa-solid fa-building"></i> ${cert.issuer}</div>
          <span class="cert-category-badge">${cert.category}</span>
        </div>
      `;

      grid.appendChild(card);
    });
  }

  /* ------------------------------------------------------------------
     PROJECTS RENDERER
  ------------------------------------------------------------------ */
  function renderProjects(projects) {
    projectsGrid.innerHTML = '';
    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.setAttribute('data-category', project.category);

      // --- Build photos array (main + team + detail) ---
      const photos = [];
      if (project.photo)       photos.push({ src: project.photo,       label: 'Design' });
      if (project.teamPhoto)   photos.push({ src: project.teamPhoto,   label: 'Team'   });
      if (project.detailPhoto) photos.push({ src: project.detailPhoto, label: 'Detail' });

      // --- Photo banner with optional gallery tabs ---
      let photoHTML = '';
      if (photos.length > 0) {
        const thumbsHTML = photos.length > 1
          ? `<div class="photo-thumbs">${photos.map((p, i) =>
              `<button class="photo-thumb${i === 0 ? ' active' : ''}" data-src="${p.src}">${p.label}</button>`
            ).join('')}</div>`
          : '';
        photoHTML = `
          <div class="project-photo-banner">
            <img src="${photos[0].src}" alt="${project.title} project photo" loading="lazy" class="gallery-main-img">
            <div class="project-photo-overlay">
              <div class="photo-overlay-bottom">
                <span class="project-category-badge">${project.category}</span>
                ${thumbsHTML}
              </div>
            </div>
          </div>`;
      }

      // --- Components list ---
      let componentsHTML = '';
      if (project.components && project.components.length > 0) {
        componentsHTML = `
          <div class="project-features">
            <h5 class="project-features-title">Main Components</h5>
            <ul class="project-features-list">
              ${project.components.map(comp => `<li>${comp}</li>`).join('')}
            </ul>
          </div>`;
      }

      // --- Skill tags ---
      let skillsHTML = '';
      if (project.skills && project.skills.length > 0) {
        skillsHTML = `
          <div class="project-skills">
            ${project.skills.map(skill => `<span class="project-skill-tag">${skill}</span>`).join('')}
          </div>`;
      }

      // --- Footer links (Live Demo + GitHub) ---
      const footerLinks = [];
      if (project.url) {
        footerLinks.push(`<a href="${project.url}" target="_blank" rel="noopener noreferrer" class="project-link project-link-demo"><i class="fa-solid fa-arrow-up-right-from-square"></i><span>Live Demo</span></a>`);
      }
      if (project.github) {
        footerLinks.push(`<a href="${project.github}" target="_blank" rel="noopener noreferrer" class="project-link project-link-github"><i class="fa-brands fa-github"></i><span>GitHub</span></a>`);
      }
      const footerHTML = footerLinks.length > 0
        ? `<div class="project-card-footer">${footerLinks.join('')}</div>` : '';

      // Category badge in header only when no photo (photo already has it in overlay)
      const categoryBadge = photos.length === 0
        ? `<span class="project-category">${project.category}</span>` : '';

      card.innerHTML = `
        ${photoHTML}
        <div class="project-card-body">
          <div class="project-card-header">
            <div class="project-icon-box">
              <i class="${project.image || 'fa-solid fa-gears'}"></i>
            </div>
            <div class="project-header-text">
              <h4 class="project-title">${project.title}</h4>
              ${categoryBadge}
            </div>
          </div>
          <p class="project-tagline">${project.tagline}</p>
          <p class="project-desc">${project.description}</p>
          ${componentsHTML}
          ${skillsHTML}
          ${footerHTML}
        </div>`;

      // --- Photo gallery tab switcher ---
      if (photos.length > 1) {
        const mainImg = card.querySelector('.gallery-main-img');
        card.querySelectorAll('.photo-thumb').forEach(thumb => {
          thumb.addEventListener('click', (e) => {
            e.stopPropagation();
            mainImg.style.opacity = '0';
            setTimeout(() => {
              mainImg.src = thumb.getAttribute('data-src');
              mainImg.style.opacity = '1';
            }, 200);
            card.querySelectorAll('.photo-thumb').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
          });
        });
      }

      // --- Spotlight tracking effect ---
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });

      projectsGrid.appendChild(card);
    });
  }

  function setupProjectsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const getProjectCards = () => document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const activeFilter = btn.getAttribute('data-filter');

        getProjectCards().forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (activeFilter === 'all' || cardCategory === activeFilter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => { card.style.display = 'none'; }, 300);
          }
        });
      });
    });
  }

  // Attempt to fetch data.json, otherwise fallback to local data
  fetch('data.json')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => renderData(data))
    .catch(error => {
      console.warn('CORS or file protocol error fetching data.json, using fallback data:', error);
      renderData(fallbackData);
    });

  function cleanUrlDisplay(url) {
    if (url.startsWith('mailto:')) return url.replace('mailto:', '');
    if (url.startsWith('https://wa.me/')) return '+' + url.replace('https://wa.me/', '');
    return url.replace('https://', '').replace('http://', '').split('/')[0];
  }

  /* ==========================================================================
     TYPING ANIMATION
     ========================================================================== */
  const typingElement = document.getElementById('typing-text');
  const words = ['AI & ML Engineer', 'Founder of Sakr Makes', 'Computer Engineering Student', '3D Prototyper'];
  let wordIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;
  let typeSpeed  = 100;

  function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed  = 1500;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex  = (wordIndex + 1) % words.length;
      typeSpeed  = 400;
    }

    setTimeout(typeEffect, typeSpeed);
  }

  if (typingElement) {
    setTimeout(typeEffect, 1000);
  }

  /* ==========================================================================
     THEME TOGGLE
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentTheme   = localStorage.getItem('theme') || 'dark';

  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme    = activeTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    const icon = themeToggleBtn.querySelector('i');
    icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }

  /* ==========================================================================
     3D PROFILE CARD TILT EFFECT
     ========================================================================== */
  const cardWrapper = document.getElementById('profile-card-wrapper');
  const card        = cardWrapper ? cardWrapper.querySelector('.profile-card') : null;

  if (cardWrapper && card) {
    cardWrapper.addEventListener('mousemove', (e) => {
      const rect    = cardWrapper.getBoundingClientRect();
      const x       = e.clientX - rect.left;
      const y       = e.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -24;
      const rotateY = ((x / rect.width)  - 0.5) * 24;
      card.style.transform  = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.transition = 'none';
    });

    cardWrapper.addEventListener('mouseleave', () => {
      card.style.transform  = 'rotateX(0deg) rotateY(0deg)';
      card.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  }

  /* ==========================================================================
     PARTICLE CANVAS BACKGROUND
     ========================================================================== */
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles    = [];
    let particleCount = 60;

    let mouse = { x: null, y: null, radius: 120 };

    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
    window.addEventListener('mouseout',  ()  => { mouse.x = null; mouse.y = null; });

    class Particle {
      constructor() {
        this.x       = Math.random() * canvas.width;
        this.y       = Math.random() * canvas.height;
        this.size    = Math.random() * 2 + 1;
        this.baseX   = this.x;
        this.baseY   = this.y;
        this.density = (Math.random() * 30) + 10;
        this.speedX  = Math.random() * 0.4 - 0.2;
        this.speedY  = Math.random() * 0.4 - 0.2;
      }

      draw() {
        const theme = document.documentElement.getAttribute('data-theme');
        ctx.fillStyle = theme === 'dark' ? 'rgba(99, 102, 241, 0.6)' : 'rgba(79, 70, 229, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width)  this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height)  this.speedY = -this.speedY;

        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.x -= (dx / distance) * force * this.density * 0.7;
            this.y -= (dy / distance) * force * this.density * 0.7;
          }
        }
      }
    }

    function init() {
      particles = [];
      particleCount = window.innerWidth < 600 ? 30 : window.innerWidth < 1200 ? 50 : 75;
      for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    }

    function connectParticles() {
      const theme = document.documentElement.getAttribute('data-theme');
      const connectionColor = theme === 'dark' ? 'rgba(99, 102, 241, ' : 'rgba(99, 102, 241, ';
      const maxD  = 140;
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < maxD) {
            ctx.strokeStyle = connectionColor + ((1 - d / maxD) * 0.15) + ')';
            ctx.lineWidth   = 0.8;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    function resizeCanvas() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      connectParticles();
      requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animate();
  }
});
