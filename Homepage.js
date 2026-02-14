document.addEventListener("DOMContentLoaded", function () {
    console.log("WDSA Website loaded successfully!");

    /* =========================================
       1. GLOBAL UTILITIES (TOAST, SCROLL)
       ========================================= */
    
    // --- Toast Notification ---
    function showToast(type, title, message, duration = 4000) {
        const container = document.getElementById("toastContainer");
        if (!container) return;

        const icons = {
            success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>`,
            error:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg>`
        };

        const toast = document.createElement("div");
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-icon">${icons[type] || icons.success}</div>
            <div class="toast-body">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("toast-hide");
            toast.addEventListener("animationend", () => toast.remove());
        }, duration);
    }

    // --- Scroll To Top Button ---
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* =========================================
       2. HEADER & NAVIGATION
       ========================================= */

    // --- Sticky Header Effect ---
    const header = document.querySelector("header");
    
    // --- Logo Click to Top ---
    const logo = document.querySelector(".logo");
    if (logo) {
        logo.style.cursor = "pointer";
        logo.addEventListener("click", function() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const href = this.getAttribute("href");
            
            if (href === "#" || this.classList.contains("lang-item")) {
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 80; 
                window.scrollTo({ top: offsetTop, behavior: "smooth" });
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation(); 
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking links
        const navItems = navMenu.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }

    // --- Mobile Dropdown Toggle ---
    document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
        toggle.addEventListener("click", function (e) {
            if (window.innerWidth > 991) return; 
            e.preventDefault();
            e.stopPropagation();

            const parentLi = this.closest("li.dropdown");
            const isOpen = parentLi.classList.contains("active");

            document.querySelectorAll("li.dropdown.active").forEach(li => {
                if (li !== parentLi) li.classList.remove("active");
            });

            parentLi.classList.toggle("active", !isOpen);
        });
    });

    // --- Language Switcher (UI Only) ---
    const langItems = document.querySelectorAll(".lang-item");
    langItems.forEach(item => {
        item.addEventListener("click", function(e) {
            e.preventDefault();
            langItems.forEach(lang => lang.classList.remove("active"));
            this.classList.add("active");
            console.log(`🌍 Language switched to: ${this.textContent.trim()}`);
        });
    });

    // --- View Switcher (PC <-> Mobile) ---
    const viewSwitcher = document.getElementById('viewSwitcher');
    if (viewSwitcher) {
        viewSwitcher.addEventListener('click', function(e) {
            e.preventDefault();
            const currentPath = window.location.pathname;
            const isMobilePage = currentPath.includes('mobile.html');

            if (isMobilePage) {
                localStorage.setItem('prefer_mode', 'pc');
                window.location.href = 'index.html';
            } else {
                localStorage.setItem('prefer_mode', 'mobile');
                window.location.href = 'mobile.html';
            }
        });
    }

    // --- Active Link Highlighter on Scroll ---
    const sections = ["home", "about", "testimonials", "register"];
    const sectionLinks = {};
    sections.forEach(id => {
        const link = document.querySelector(`.nav-menu a[href="#${id}"]`);
        if (link) sectionLinks[id] = link;
    });

    /* =========================================
       3. SEARCH FUNCTIONALITY
       ========================================= */
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    const courseMap = [
        { keywords: ['dsa', 'data structure', 'algorithm', 'cây', 'đồ thị', 'tree', 'graph', 'sort'], anchor: '#about', label: 'Data Structures & Algorithms' },
        { keywords: ['c++', 'cpp', 'cplusplus'], anchor: '#about', label: 'C++ Fundamentals' },
        { keywords: ['java', 'oop', 'object'], anchor: '#about', label: 'Java OOP Mastery' },
        { keywords: ['database', 'db', 'sql', 'mysql'], anchor: '#about', label: 'Database Systems' },
        { keywords: ['testimonial', 'review', 'student', 'đánh giá'], anchor: '#testimonials', label: 'Student Reviews' },
        { keywords: ['register', 'đăng ký', 'consult', 'tư vấn', 'contact'], anchor: '#register', label: 'Register for Consultation' }
    ];

    function handleSearch() {
        const query = searchInput.value.trim().toLowerCase();
        if (!query) return;

        const match = courseMap.find(course =>
            course.keywords.some(kw => query.includes(kw))
        );

        if (match) {
            const target = document.querySelector(match.anchor);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
            searchInput.value = '';
        } else {
            searchInput.style.borderColor = '#ef4444';
            searchInput.placeholder = 'No results found...';
            setTimeout(() => {
                searchInput.style.borderColor = '';
                searchInput.placeholder = 'Search courses...';
            }, 1800);
        }
    }

    if (searchBtn) searchBtn.addEventListener('click', handleSearch);
    if (searchInput) {
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
            }
        });
    }

    /* =========================================
       4. HERO SECTION EFFECTS
       ========================================= */
    
    // --- Typed.js Animation ---
    const typedElement = document.querySelector('.auto-type');
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('.auto-type', {
            strings: ["Sharing", "C++", "Algorithms", "Data Structures"],
            typeSpeed: 100, 
            backSpeed: 50,  
            backDelay: 1500, 
            loop: true,     
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true, 
        });
    }

    // --- Floating Icons Mouse Effect ---
    document.addEventListener("mousemove", (e) => {
        const icons = document.querySelectorAll(".float-icon");
        if (icons.length === 0) return;
        
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        icons.forEach((icon, index) => {
            const speed = (index + 1) * 0.5;
            icon.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
        });
    });

    /* =========================================
       5. TESTIMONIALS SLIDER
       ========================================= */
    let slideIndex = 0;
    let autoSlideInterval;

    const track = document.querySelector(".slider-track");
    const slides = document.querySelectorAll(".testimonial-card");
    const dots = document.querySelectorAll(".dot");
    const sliderContainer = document.querySelector(".slider-container");

    if (track && slides.length && dots.length) {
        function showSlides(n) {
            if (n >= slides.length) slideIndex = 0;
            if (n < 0) slideIndex = slides.length - 1;
            track.style.transform = `translateX(-${slideIndex * 33.3333}%)`;
            dots.forEach(dot => dot.classList.remove("active"));
            if (dots[slideIndex]) {
                dots[slideIndex].classList.add("active");
            }
        }

        // Expose function globally for HTML onclick attributes
        window.changeSlide = function (n) {
            slideIndex += n;
            showSlides(slideIndex);
            resetAutoSlide(); 
        };

        window.currentSlide = function (n) {
            slideIndex = n - 1;
            showSlides(slideIndex);
            resetAutoSlide(); 
        };

        function startAutoSlide() {
            autoSlideInterval = setInterval(() => {
                slideIndex++;
                showSlides(slideIndex);
            }, 7000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        function resetAutoSlide() {
            stopAutoSlide();
            startAutoSlide();
        }

        if (sliderContainer) {
            sliderContainer.addEventListener("mouseenter", stopAutoSlide);
            sliderContainer.addEventListener("mouseleave", startAutoSlide);
        }

        // Initialize Slider
        showSlides(slideIndex);
        startAutoSlide();

        // --- Swipe Gesture for Mobile ---
        const wrapper = document.querySelector(".testimonial-wrapper");
        if (wrapper) {
            let touchStartX = 0;
            let touchEndX = 0;
            const SWIPE_THRESHOLD = 50;

            wrapper.addEventListener("touchstart", (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });

            wrapper.addEventListener("touchend", (e) => {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;

                if (Math.abs(diff) > SWIPE_THRESHOLD) {
                    window.changeSlide(diff > 0 ? 1 : -1); 
                }
            }, { passive: true });
        }
    } else {
        console.warn("⚠️ Slider elements not found or incomplete.");
    }

    /* =========================================
       6. SCROLL ANIMATIONS & STATS
       ========================================= */
    
    // --- Reveal Elements on Scroll ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll(".feature-card, .teacher-card, .section-header");
    animatedElements.forEach(el => {
        el.classList.add("reveal"); 
        observer.observe(el);
    });

    // --- Stats Counter Animation ---
    const statsSection = document.querySelector(".stats-section");
    const counters = document.querySelectorAll(".counter");
    let hasStatsRun = false;

    if (statsSection && counters.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            const [entry] = entries;
            if (entry.isIntersecting && !hasStatsRun) {
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; 
                    const stepTime = 20;   
                    const increment = target / (duration / stepTime);

                    let currentCount = 0;
                    const updateCount = () => {
                        currentCount += increment;
                        if (currentCount < target) {
                            counter.innerText = Math.ceil(currentCount);
                            setTimeout(updateCount, stepTime); 
                        } else {
                            counter.innerText = target; 
                        }
                    };
                    updateCount();
                });
                hasStatsRun = true; 
            }
        }, { threshold: 0.2 });

        statsObserver.observe(statsSection);
    }

    /* =========================================
       7. GLOBAL SCROLL HANDLER
       ========================================= */
    // Combine all scroll logic into one listener for performance
    /* --- TỐI ƯU SCROLL HANDLER (Dùng requestAnimationFrame) --- */
    let isScrolling = false;
    window.addEventListener("scroll", function() {
        if (!isScrolling) {
            window.requestAnimationFrame(function() {
                const scrollY = window.scrollY;

                // 1. Xử lý Header
                if (header) {
                    header.classList.toggle("scrolled", scrollY > 50);
                }

                // 2. Xử lý Nút Scroll Top
                if (scrollTopBtn) {
                    scrollTopBtn.classList.toggle("visible", scrollY > 500);
                }

                // 3. Xử lý Active Link (Scroll Spy)
                let current = "";
                sections.forEach(id => {
                    const section = document.getElementById(id);
                    if (section && scrollY >= section.offsetTop - 120) {
                        current = id;
                    }
                });
                Object.values(sectionLinks).forEach(link => link.classList.remove("nav-active"));
                if (current && sectionLinks[current]) {
                    sectionLinks[current].classList.add("nav-active");
                }

                isScrolling = false;
            });
            isScrolling = true;
        }
    }, { passive: true }); // passive: true giúp cuộn mượt hơn trên mobile


    /* --- TỐI ƯU MOUSE MOVE (Hiệu ứng icon bay) --- */
    let isMouseMoving = false;

    document.addEventListener("mousemove", (e) => {
        if (!isMouseMoving) {
            window.requestAnimationFrame(() => {
                const icons = document.querySelectorAll(".float-icon");
                if (icons.length > 0) {
                    const x = (window.innerWidth - e.pageX * 2) / 100;
                    const y = (window.innerHeight - e.pageY * 2) / 100;

                    icons.forEach((icon, index) => {
                        const speed = (index + 1) * 0.5;
                        // Sử dụng translate3d để kích hoạt GPU (Hardware Acceleration)
                        icon.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
                    });
                }
                isMouseMoving = false;
            });
            isMouseMoving = true;
        }
    });

    /* =========================================
       8. CONSULTATION FORM SUBMISSION
       ========================================= */
    const form = document.querySelector(".mad-lib-form");
    const submitBtn = document.getElementById("submitBtn");
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwKF7XeICcMf_BKukqLU42LYBDEeoSo8hydn4ccBZGgpjj8fUB8xxFd1cTz0QJV5onPFQ/exec';

    if (form && submitBtn) {
        const btnText = submitBtn.querySelector(".btn-text");
        const btnLoading = submitBtn.querySelector(".btn-loading");
        
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const name = formData.get("fullname");
            const contact = formData.get("phone") || formData.get("email");
            
            // Validation
            if (!name || !name.trim()) {
                showToast("error", "Lỗi nhập liệu", "Vui lòng nhập tên của bạn!");
                return;
            }
            if (!contact || !contact.trim()) {
                showToast("error", "Thiếu thông tin", "Vui lòng nhập SĐT hoặc Email để chúng tôi liên hệ!");
                return;
            }

            // Loading State
            if (btnText) btnText.style.display = "none";
            if (btnLoading) btnLoading.style.display = "inline-flex";
            submitBtn.disabled = true;

            // Submit
            fetch(scriptURL, { method: 'POST', body: formData})
                .then(response => {
                    showToast("success", "Đăng ký thành công!", `Chào ${name}, WDSA đã nhận thông tin và sẽ liên hệ sớm!`);
                    form.reset();
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    showToast("error", "Lỗi kết nối", "Không thể gửi đơn. Vui lòng thử lại sau!");
                })
                .finally(() => {
                    if (btnText) btnText.style.display = "inline";
                    if (btnLoading) btnLoading.style.display = "none";
                    submitBtn.disabled = false;
                });
        });
    }

    /* =========================================
       16. FIREBASE AUTHENTICATION (GOOGLE SIGN-IN)
       ========================================= */
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();

    const desktopAuth = document.querySelector('.desktop-auth');
    const mobileAuth = document.querySelector('.mobile-auth');

    // Hàm chung để vẽ UI người dùng
    // Hàm chung để vẽ UI người dùng
    const renderUserUI = (container, user) => {
        if (!container) return;
        if (user) {
            // Lấy tên ngắn gọn (Từ cuối cùng trong chuỗi tên, thường là Tên chính)
            const shortName = user.displayName ? user.displayName.split(' ').pop() : 'User';

            container.innerHTML = `
                <div class="user-profile-group">
                    <div class="user-info-modern">
                        <img src="${user.photoURL}" alt="Avatar" class="user-avatar-modern" referrerpolicy="no-referrer">
                        <span class="user-name-modern">Hi, ${shortName}</span>
                    </div>
                    <div class="user-divider"></div>
                    <button onclick="googleSignOut()" class="btn-logout-modern" title="Logout">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        Logout
                    </button>
                </div>
            `;
        } else {
            container.innerHTML = `
                <a href="javascript:void(0)" onclick="googleSignIn()" class="btn btn-login">Sign In</a>
                <a href="#register" class="btn btn-register">Get Started</a>
            `;
        }
    };

    // 1. TỐI ƯU HIỂN THỊ TỨC THÌ (CHỐNG NHÁY 1 GIÂY)
    const cachedUser = JSON.parse(localStorage.getItem('wdsa_user'));
    if (cachedUser) {
        renderUserUI(desktopAuth, cachedUser);
        renderUserUI(mobileAuth, cachedUser);
    }

    // 2. CÁC HÀM XỬ LÝ CLICK
    window.googleSignIn = function() {
        auth.signInWithPopup(provider).then((result) => {
            // Lưu vào cache ngay lập tức
            localStorage.setItem('wdsa_user', JSON.stringify({
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            }));
            showToast("success", "Login Successful", `Welcome back, ${result.user.displayName}!`);
        }).catch((error) => {
            showToast("error", "Login Failed", error.message);
        });
    };

    window.googleSignOut = function() {
        auth.signOut().then(() => {
            localStorage.removeItem('wdsa_user'); // Xóa cache
            renderUserUI(desktopAuth, null);
            renderUserUI(mobileAuth, null);
            showToast("info", "Logged Out", "You have been logged out successfully.");
        });
    };

    // 3. FIREBASE XÁC THỰC LẠI NGẦM BÊN DƯỚI
    auth.onAuthStateChanged((user) => {
        if (user) {
            // Cập nhật lại cache cho chắc chắn
            localStorage.setItem('wdsa_user', JSON.stringify({
                displayName: user.displayName,
                photoURL: user.photoURL
            }));
            renderUserUI(desktopAuth, user);
            renderUserUI(mobileAuth, user);
        } else {
            localStorage.removeItem('wdsa_user');
            renderUserUI(desktopAuth, null);
            renderUserUI(mobileAuth, null);
        }
    });
});

