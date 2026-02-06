document.addEventListener("DOMContentLoaded", function () {
let slideIndex = 0;
let autoSlideInterval;

const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".testimonial-card");
const dots = document.querySelectorAll(".dot");
const sliderContainer = document.querySelector(".slider-container");

if (!track || !slides.length || !dots.length) {
    console.warn("⚠️ Slider elements not found");
    return;
}

function showSlides(n) {
    if (n >= slides.length) slideIndex = 0;
    if (n < 0) slideIndex = slides.length - 1;
    track.style.transform = `translateX(-${slideIndex * 33.3333}%)`;
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[slideIndex]) {
        dots[slideIndex].classList.add("active");
    }
}

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

showSlides(slideIndex);
startAutoSlide();

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
            
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        }
    });
});

const langItems = document.querySelectorAll(".lang-item");

langItems.forEach(item => {
    item.addEventListener("click", function(e) {
        e.preventDefault();
        
        langItems.forEach(lang => lang.classList.remove("active"));
        
        this.classList.add("active");
        
        const selectedLang = this.textContent.trim();
        console.log(`🌍 Language switched to: ${selectedLang}`);
    });
});


const logo = document.querySelector(".logo");
if (logo) {
    logo.style.cursor = "pointer";
    logo.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


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

const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation(); 
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    const navItems = navMenu.querySelectorAll('a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

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

if (searchBtn) {
    searchBtn.addEventListener('click', handleSearch);
}
if (searchInput) {
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    });
}

console.log("WDSA Website loaded successfully!");
});


window.addEventListener("scroll", function() {
const header = document.querySelector("header");
if (header) {
    header.classList.toggle("scrolled", window.scrollY > 50);
}
});


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


document.addEventListener("mousemove", (e) => {
const icons = document.querySelectorAll(".float-icon");
const x = (window.innerWidth - e.pageX * 2) / 100;
const y = (window.innerHeight - e.pageY * 2) / 100;

icons.forEach((icon, index) => {
    const speed = (index + 1) * 0.5;
    icon.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
});
});


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


(function () {
const btn = document.getElementById("scrollTopBtn");
if (!btn) return;

window.addEventListener("scroll", () => {
    btn.classList.toggle("visible", window.scrollY > 500);
});

btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
})();


(function () {
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
})();


(function () {
const wrapper = document.querySelector(".testimonial-wrapper");
if (!wrapper) return;

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
        if (typeof window.changeSlide === "function") {
            window.changeSlide(diff > 0 ? 1 : -1); 
        }
    }
}, { passive: true });
})();

(function () {
const sections = ["home", "about", "testimonials", "register"];
const navLinks = {};

sections.forEach(id => {
    const link = document.querySelector(`.nav-menu a[href="#${id}"]`);
    if (link) navLinks[id] = link;
});

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(id => {
        const section = document.getElementById(id);
        if (!section) return;
        if (window.scrollY >= section.offsetTop - 120) {
            current = id;
        }
    });
    Object.values(navLinks).forEach(link => link.classList.remove("nav-active"));
    if (current && navLinks[current]) {
        navLinks[current].classList.add("nav-active");
    }
});




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
        
        if (!name || !name.trim()) {
            showToast("error", "Lỗi nhập liệu", "Vui lòng nhập tên của bạn!");
            return;
        }
        if (!contact || !contact.trim()) {
            showToast("error", "Thiếu thông tin", "Vui lòng nhập SĐT hoặc Email để chúng tôi liên hệ!");
            return;
        }
        if(btnText) btnText.style.display = "none";
        if(btnLoading) btnLoading.style.display = "inline-flex";
        submitBtn.disabled = true;
        fetch(scriptURL, { method: 'POST', body: formData})
            .then(response => {
                showToast("success", "Đăng ký thành công!", `Chào ${name}, WDSA đã nhận thông tin và sẽ liên hệ sớm!`);
                
                form.reset();
                if(btnText) btnText.style.display = "inline";
                if(btnLoading) btnLoading.style.display = "none";
                submitBtn.disabled = false;
            })
            .catch(error => {
                console.error('Error!', error.message);
                showToast("error", "Lỗi kết nối", "Không thể gửi đơn. Vui lòng thử lại sau!");
                
                if(btnText) btnText.style.display = "inline";
                if(btnLoading) btnLoading.style.display = "none";
                submitBtn.disabled = false;
            });
    });
}


const typedElement = document.querySelector('.auto-type');

if (typedElement) {
    var typed = new Typed('.auto-type', {
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


const statsSection = document.querySelector(".stats-section");
const counters = document.querySelectorAll(".counter");
let hasRun = false;

if (statsSection && counters.length > 0) {
    const statsObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
    
        if (entry.isIntersecting && !hasRun) {
            
            counters.forEach(counter => {
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target'); 
                    const count = +counter.innerText; y
                    
                   
                    const speed = 200; 
                    const increment = target / speed;

                    if (count < target) {
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 20); 
                    } else {
                        counter.innerText = target; 
                    }
                };
                updateCount();
            });

            hasRun = true; 
        }
    }, { threshold: 0.5 }); 

    statsObserver.observe(statsSection);
}


})();