/* ==========================================================================
   DevPulse — script.js
   Vanilla JS only. No frameworks, no build step.
   Sections: Data → Rendering → Navbar/Menu → Theme → Search/Filter →
             FAQ → Forms → Scroll Reveal → Back to top → Init
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     1. BLOG POST DATA
     A single source of truth used to render cards, trending list & search.
     ------------------------------------------------------------------------ */
  const POSTS = [
    {
      id: 1,
      title: "Zero Trust Isn't Optional Anymore — Here's Where to Start",
      category: "Cyber Security",
      catClass: "cat-security",
      excerpt: "A practical, no-jargon roadmap for teams migrating away from perimeter-based security models.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=60",
      author: "Daniel Osei",
      avatar: "https://i.pravatar.cc/64?img=33",
      date: "June 18, 2026",
      read: "6 min read",
    },
    {
      id: 2,
      title: "Why Server Components Changed How I Think About React",
      category: "Web Development",
      catClass: "cat-web",
      excerpt: "A deep look at rendering boundaries, streaming, and what actually moves to the client.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=60",
      author: "Lina Torres",
      avatar: "https://i.pravatar.cc/64?img=45",
      date: "June 16, 2026",
      read: "8 min read",
    },
    {
      id: 3,
      title: "Rust for JavaScript Developers: A Gentle On-Ramp",
      category: "Programming",
      catClass: "cat-programming",
      excerpt: "Ownership and borrowing explained through analogies every JS developer already understands.",
      image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600&q=60",
      author: "Samuel Okafor",
      avatar: "https://i.pravatar.cc/64?img=51",
      date: "June 14, 2026",
      read: "10 min read",
    },
    {
      id: 4,
      title: "The Real Cost of Skipping Code Reviews",
      category: "Career",
      catClass: "cat-career",
      excerpt: "Data from 40 engineering teams on how review culture correlates with incident rates.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=60",
      author: "Maria Chen",
      avatar: "https://i.pravatar.cc/64?img=12",
      date: "June 12, 2026",
      read: "5 min read",
    },
    {
      id: 5,
      title: "Building Offline-First Mobile Apps with SQLite and Sync",
      category: "Mobile Apps",
      catClass: "cat-mobile",
      excerpt: "A field-tested pattern for syncing local data reliably across flaky networks.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=60",
      author: "Ayesha Raza",
      avatar: "https://i.pravatar.cc/64?img=20",
      date: "June 10, 2026",
      read: "7 min read",
    },
    {
      id: 6,
      title: "A Beginner's Guide to Writing Your First CLI Tool",
      category: "Tutorials",
      catClass: "cat-tutorials",
      excerpt: "Step by step: arguments, flags, piping and packaging — using nothing but Node.js.",
      image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=600&q=60",
      author: "Daniel Osei",
      avatar: "https://i.pravatar.cc/64?img=33",
      date: "June 8, 2026",
      read: "9 min read",
    },
    {
      id: 7,
      title: "Edge Computing in 2026: Hype vs Reality",
      category: "Technology",
      catClass: "cat-technology",
      excerpt: "Where edge deployment genuinely saves latency — and where it's just marketing.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=60",
      author: "Maria Chen",
      avatar: "https://i.pravatar.cc/64?img=12",
      date: "June 6, 2026",
      read: "6 min read",
    },
    {
      id: 8,
      title: "Fine-Tuning vs RAG: Choosing the Right Tool for Your AI Feature",
      category: "AI",
      catClass: "cat-ai",
      excerpt: "A decision framework for product teams deciding how to ground an LLM in their own data.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=600&q=60",
      author: "Ayesha Raza",
      avatar: "https://i.pravatar.cc/64?img=20",
      date: "June 4, 2026",
      read: "8 min read",
    },
  ];

  const TRENDING = [POSTS[7], POSTS[1], POSTS[0], POSTS[2]];

  /* ------------------------------------------------------------------------
     2. RENDERING
     ------------------------------------------------------------------------ */
  const postsGrid = document.getElementById("postsGrid");
  const trendingList = document.getElementById("trendingList");
  const noResults = document.getElementById("noResults");

  function postCardHTML(post) {
    return `
      <article class="post-card" data-category="${post.category}" data-title="${post.title.toLowerCase()}">
        <div class="post-thumb">
          <img src="${post.image}" alt="${post.title}" loading="lazy" />
          <span class="post-category ${post.catClass}">${post.category}</span>
        </div>
        <div class="post-content">
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <div class="post-meta">
            <img class="avatar" src="${post.avatar}" alt="${post.author}" loading="lazy" />
            <div class="meta-text">
              <span class="meta-author">${post.author}</span>
              <span class="meta-date">${post.date} · ${post.read}</span>
            </div>
          </div>
          <a href="#" class="read-more">Read More <i class="fa-solid fa-arrow-right"></i></a>
        </div>
      </article>`;
  }

  function renderPosts(list) {
    if (!postsGrid) return;
    postsGrid.innerHTML = list.map(postCardHTML).join("");
    if (noResults) noResults.hidden = list.length !== 0;
  }

  function renderTrending() {
    if (!trendingList) return;
    trendingList.innerHTML = TRENDING.map(
      (post, i) => `
      <li class="trending-item">
        <span class="trending-rank">0${i + 1}</span>
        <div>
          <h5>${post.title}</h5>
          <span>${post.category} · ${post.read}</span>
        </div>
      </li>`
    ).join("");
  }

  /* ------------------------------------------------------------------------
     3. NAVBAR: sticky state + mobile hamburger menu
     ------------------------------------------------------------------------ */
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  function handleNavbarScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  function toggleMobileMenu() {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("open");
  }

  // Close mobile menu when a link is clicked, and highlight active section link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      hamburger.classList.remove("active");
      document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("active-link"));
      link.classList.add("active-link");
    });
  });

  /* ------------------------------------------------------------------------
     4. DARK / LIGHT MODE TOGGLE (persisted in localStorage)
     ------------------------------------------------------------------------ */
  const themeToggle = document.getElementById("themeToggle");
  const THEME_KEY = "devpulse-theme";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const icon = themeToggle.querySelector("i");
    icon.className = theme === "light" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    localStorage.setItem(THEME_KEY, theme);
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const preferred = saved || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    applyTheme(preferred);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
    applyTheme(current === "light" ? "dark" : "light");
  }

  /* ------------------------------------------------------------------------
     5. SEARCH BAR + LIVE FILTER + CATEGORY CHIPS
     ------------------------------------------------------------------------ */
  const searchToggle = document.getElementById("searchToggle");
  const searchBar = document.getElementById("searchBar");
  const closeSearch = document.getElementById("closeSearch");
  const searchInput = document.getElementById("searchInput");
  const filterBar = document.getElementById("filterBar");

  let activeCategory = "all";
  let activeQuery = "";

  function toggleSearchBar() {
    searchBar.classList.toggle("open");
    if (searchBar.classList.contains("open")) searchInput.focus();
  }

  function applyFilters() {
    const filtered = POSTS.filter((post) => {
      const matchesCategory = activeCategory === "all" || post.category === activeCategory;
      const matchesQuery =
        activeQuery === "" ||
        post.title.toLowerCase().includes(activeQuery) ||
        post.category.toLowerCase().includes(activeQuery) ||
        post.author.toLowerCase().includes(activeQuery);
      return matchesCategory && matchesQuery;
    });
    renderPosts(filtered);
  }

  function handleSearchInput(e) {
    activeQuery = e.target.value.trim().toLowerCase();
    applyFilters();
    // Scroll to blog section so results are visible
    if (activeQuery.length > 0) {
      document.getElementById("blog").scrollIntoView({ behavior: "smooth" });
    }
  }

  function handleChipClick(e) {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    activeCategory = chip.dataset.filter;
    applyFilters();
  }

  // Category cards scroll to blog + apply that category's filter
  document.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", () => {
      const cat = card.dataset.scrollTo;
      activeCategory = cat;
      activeQuery = "";
      searchInput.value = "";
      document.querySelectorAll(".chip").forEach((c) => {
        c.classList.toggle("active", c.dataset.filter === cat);
      });
      applyFilters();
      document.getElementById("blog").scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ------------------------------------------------------------------------
     6. FAQ ACCORDION
     ------------------------------------------------------------------------ */
  function initFAQ() {
    document.querySelectorAll(".faq-item").forEach((item) => {
      const question = item.querySelector(".faq-question");
      question.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
        if (!isOpen) item.classList.add("open");
      });
    });
  }

  /* ------------------------------------------------------------------------
     7. FORM VALIDATION — Newsletter, Contact, Mini newsletter forms
     ------------------------------------------------------------------------ */
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function initNewsletterForm() {
    const form = document.getElementById("newsletterForm");
    const emailInput = document.getElementById("newsletterEmail");
    const msg = document.getElementById("newsletterMsg");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!emailPattern.test(emailInput.value.trim())) {
        msg.textContent = "Please enter a valid email address.";
        msg.className = "form-msg error";
        return;
      }
      msg.textContent = "You're subscribed! Check your inbox to confirm.";
      msg.className = "form-msg success";
      form.reset();
    });
  }

  function initMiniNewsletterForms() {
    document.querySelectorAll("[data-mini-newsletter]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = form.querySelector("input[type='email']");
        if (!emailPattern.test(input.value.trim())) {
          input.style.borderColor = "#F87171";
          return;
        }
        input.style.borderColor = "";
        const btn = form.querySelector("button");
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i>';
        setTimeout(() => (btn.innerHTML = original), 2000);
        form.reset();
      });
    });
  }

  function initContactForm() {
    const form = document.getElementById("contactForm");
    const msg = document.getElementById("contactMsg");
    if (!form) return;

    const fields = {
      cName: { required: true, label: "Please enter your name." },
      cEmail: { required: true, email: true, label: "Please enter a valid email address." },
      cSubject: { required: true, label: "Please enter a subject." },
      cMessage: { required: true, minLength: 10, label: "Message should be at least 10 characters." },
    };

    function validateField(id) {
      const input = document.getElementById(id);
      const group = input.closest(".form-group");
      const errorSpan = group.querySelector(".error-msg");
      const rule = fields[id];
      let valid = true;
      let message = "";

      const value = input.value.trim();
      if (rule.required && value === "") {
        valid = false;
        message = rule.label;
      } else if (rule.email && !emailPattern.test(value)) {
        valid = false;
        message = rule.label;
      } else if (rule.minLength && value.length < rule.minLength) {
        valid = false;
        message = rule.label;
      }

      group.classList.toggle("invalid", !valid);
      errorSpan.textContent = valid ? "" : message;
      return valid;
    }

    Object.keys(fields).forEach((id) => {
      const input = document.getElementById(id);
      input.addEventListener("blur", () => validateField(id));
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const allValid = Object.keys(fields)
        .map(validateField)
        .every(Boolean);

      if (!allValid) {
        msg.textContent = "Please fix the highlighted fields.";
        msg.className = "form-msg error";
        return;
      }

      msg.textContent = "Message sent! We'll get back to you within 2 business days.";
      msg.className = "form-msg success";
      form.reset();
      document.querySelectorAll(".form-group").forEach((g) => g.classList.remove("invalid"));
    });
  }

  /* ------------------------------------------------------------------------
     8. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
     ------------------------------------------------------------------------ */
  function initScrollReveal() {
    const revealEls = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => observer.observe(el));
  }

  /* ------------------------------------------------------------------------
     9. BACK TO TOP BUTTON
     ------------------------------------------------------------------------ */
  const backToTop = document.getElementById("backToTop");
  function handleBackToTopVisibility() {
    backToTop.classList.toggle("show", window.scrollY > 500);
  }
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  /* ------------------------------------------------------------------------
     10. SCROLL-SPY: highlight nav link matching current section
     ------------------------------------------------------------------------ */
  function initScrollSpy() {
    const sections = ["home", "categories", "blog", "about", "contact"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            document.querySelectorAll(".nav-link").forEach((link) => {
              link.classList.toggle("active-link", link.getAttribute("href") === `#${id}`);
            });
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((section) => spy.observe(section));
  }

  /* ------------------------------------------------------------------------
     11. INIT
     ------------------------------------------------------------------------ */
  function init() {
    renderPosts(POSTS);
    renderTrending();
    initFAQ();
    initNewsletterForm();
    initMiniNewsletterForms();
    initContactForm();
    initScrollReveal();
    initScrollSpy();
    initTheme();

    document.getElementById("year").textContent = new Date().getFullYear();

    window.addEventListener("scroll", () => {
      handleNavbarScroll();
      handleBackToTopVisibility();
    });

    hamburger.addEventListener("click", toggleMobileMenu);
    themeToggle.addEventListener("click", toggleTheme);
    searchToggle.addEventListener("click", toggleSearchBar);
    closeSearch.addEventListener("click", toggleSearchBar);
    searchInput.addEventListener("input", handleSearchInput);
    filterBar.addEventListener("click", handleChipClick);
    backToTop.addEventListener("click", scrollToTop);

    // Run once on load in case page is already scrolled (e.g. reload)
    handleNavbarScroll();
    handleBackToTopVisibility();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
