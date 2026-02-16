/**
 * =============================================================================
 * CONTESTS LOGIC
 * =============================================================================
 */

// Auth Management
auth.onAuthStateChanged((user) => {
    const loginBtn = document.getElementById('btnLogin');
    const logoutBtn = document.getElementById('btnLogout');
    const userInfo = document.getElementById('userInfo');

    if (user) {
        currentUser = user;
        loginBtn.style.display = 'none';
        userInfo.style.display = 'flex';
        logoutBtn.style.display = 'block';
        
        document.getElementById('userAvatar').src = user.photoURL || 'https://via.placeholder.com/50';
        document.getElementById('userName').textContent = user.displayName || 'User';
        document.getElementById('userEmail').textContent = user.email || '';
    } else {
        currentUser = null;
        loginBtn.style.display = 'block';
        userInfo.style.display = 'none';
        logoutBtn.style.display = 'none';
    }
});

// Login with Google
document.getElementById('btnLogin').addEventListener('click', () => {
    auth.signInWithPopup(provider)
        .then((result) => {
            console.log('Logged in successfully:', result.user);
        })
        .catch((error) => {
            console.error('Login error:', error);
            alert('Login failed: ' + error.message);
        });
});

// Logout
document.getElementById('btnLogout').addEventListener('click', () => {
    auth.signOut()
        .then(() => {
            console.log('Logged out successfully');
        })
        .catch((error) => {
            console.error('Logout error:', error);
        });
});

/**
 * =============================================================================
 * CONTEST RENDERING
 * =============================================================================
 */

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
}

function getContestStatus(contest) {
    const now = new Date();
    const startTime = new Date(contest.startTime);
    const endTime = new Date(contest.endTime);

    if (now < startTime) return 'upcoming';
    if (now >= startTime && now <= endTime) return 'live';
    return 'ended';
}

function renderContestCard(contest) {
    const status = getContestStatus(contest);
    const statusClass = `status-${status}`;
    
    return `
        <div class="contest-card" data-status="${status}" data-difficulty="${contest.difficulty}">
            <span class="contest-status ${statusClass}">${status}</span>
            
            <div class="contest-header">
                <h2 class="contest-title">${contest.title}</h2>
                <p class="contest-description">${contest.description}</p>
            </div>

            <div class="contest-meta">
                <div class="meta-item">
                    <span class="meta-label">Start Time</span>
                    <span class="meta-value">${formatDate(contest.startTime)}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Duration</span>
                    <span class="meta-value">${contest.duration}</span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Difficulty</span>
                    <span class="meta-value">
                        <span class="difficulty-badge difficulty-${contest.difficulty.toLowerCase()}">${contest.difficulty}</span>
                    </span>
                </div>
                <div class="meta-item">
                    <span class="meta-label">Problems</span>
                    <span class="meta-value">${contest.problems.length} Problems</span>
                </div>
            </div>

            <div class="contest-stats">
                <div class="stat-item">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                    </svg>
                    <span><strong id="participant-count-${contest.id}">${contest.participants}</strong> participants</span>
                </div>
                <div class="stat-item">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
                    </svg>
                    <span>${formatDate(contest.endTime).split(',')[0]}</span>
                </div>
            </div>

            <div class="contest-actions">
                ${status === 'live' ? 
                    `<button onclick="attemptEnterContest(${contest.id})" class="btn btn-primary">Enter Contest</button>` :
                    status === 'upcoming' ?
                    `<button class="btn btn-primary" disabled>Starts ${getTimeUntil(contest.startTime)}</button>` :
                    `<a href="ContestEditor.html?contestId=${contest.id}" class="btn btn-primary">View Problems</a>`
                }
                <a href="ContestLeaderboard.html?contestId=${contest.id}" class="btn btn-secondary">Leaderboard</a>
            </div>
        </div>
    `;
}

function getTimeUntil(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = date - now;
    
    if (diff < 0) return 'now';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `in ${days}d ${hours}h`;
    if (hours > 0) return `in ${hours}h`;
    return 'soon';
}

function renderContests() {
    const grid = document.getElementById('contestsGrid');
    const emptyState = document.getElementById('emptyState');
    
    let filteredContests = CONTESTS;
    
    // Apply status filter
    if (currentStatusFilter !== 'all') {
        filteredContests = filteredContests.filter(contest => 
            getContestStatus(contest) === currentStatusFilter
        );
    }
    
    // Apply difficulty filter
    if (currentDifficultyFilter !== 'all') {
        filteredContests = filteredContests.filter(contest => 
            contest.difficulty === currentDifficultyFilter
        );
    }
    
    if (filteredContests.length === 0) {
        grid.style.display = 'none';
        emptyState.style.display = 'block';
    } else {
        grid.style.display = 'grid';
        emptyState.style.display = 'none';
        grid.innerHTML = filteredContests.map(contest => renderContestCard(contest)).join('');
    }
}

function filterContests(status) {
    currentStatusFilter = status;
    
    // Update active button
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${status}"]`).classList.add('active');
    
    renderContests();
}

function filterDifficulty(difficulty) {
    currentDifficultyFilter = difficulty;
    
    // Update active button
    document.querySelectorAll('[data-difficulty]').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-difficulty="${difficulty}"]`).classList.add('active');
    
    renderContests();
}

function listenToParticipantCounts() {
    CONTESTS.forEach(contest => {
        db.ref(`contests/${contest.id}/participants`).on('value', (snapshot) => {
            // Nếu có dữ liệu trên Firebase thì lấy, không thì dùng số mặc định trong tĩnh
            const realTimeCount = snapshot.val();
            const countToDisplay = realTimeCount !== null ? realTimeCount : contest.participants;
            
            // Cập nhật DOM trực tiếp không cần load lại list
            const countElement = document.getElementById(`participant-count-${contest.id}`);
            if (countElement) {
                // Tạo hiệu ứng chớp nhẹ khi có người mới vào
                if (countElement.textContent != countToDisplay) {
                    countElement.textContent = countToDisplay;
                    countElement.style.color = '#3d9b6a';
                    setTimeout(() => countElement.style.color = '', 500);
                }
            }
        });
    });
}

/**
 * =============================================================================
 * PASSWORD MODAL LOGIC
 * =============================================================================
 */

let pendingContestId = null;

window.attemptEnterContest = function(contestId) {
    if (!currentUser) {
        alert("Vui lòng đăng nhập bằng Google để tham gia cuộc thi!");
        return;
    }
    
    const contest = CONTESTS.find(c => c.id === contestId);
    
    if (contest && contest.requiresPassword) {
        pendingContestId = contestId;
        document.getElementById('passwordModal').style.display = 'flex';
        document.getElementById('contestPassword').value = '';
        document.getElementById('passwordError').style.display = 'none';
        
        // Tự động focus vào ô nhập pass sau khi modal mở
        setTimeout(() => document.getElementById('contestPassword').focus(), 100);
    } else {
        // Không yêu cầu mật khẩu, vào thẳng trang thi
        window.location.href = `ContestEditor.html?contestId=${contestId}`;
    }
};

window.closePasswordModal = function() {
    document.getElementById('passwordModal').style.display = 'none';
    pendingContestId = null;
};

window.verifyPassword = function() {
    const input = document.getElementById('contestPassword').value;
    const contest = CONTESTS.find(c => c.id === pendingContestId);
    
    if (contest && input === contest.password) {
        window.location.href = `ContestEditor.html?contestId=${pendingContestId}`;
    } else {
        document.getElementById('passwordError').style.display = 'block';
        document.getElementById('contestPassword').style.borderColor = '#dc2626';
    }
};

// Cho phép nhấn phím 'Enter' để gửi mật khẩu
document.addEventListener('DOMContentLoaded', () => {
    const pwdInput = document.getElementById('contestPassword');
    if (pwdInput) {
        pwdInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                verifyPassword();
            }
        });
        
        // Reset viền đỏ khi người dùng bắt đầu gõ lại
        pwdInput.addEventListener('input', function() {
            this.style.borderColor = '#e5e7eb';
            document.getElementById('passwordError').style.display = 'none';
        });
    }
});

/**
 * =============================================================================
 * INITIALIZATION
 * =============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    renderContests();
    
    // Kích hoạt lắng nghe Firebase Realtime
    listenToParticipantCounts();
    
    // Update contest statuses every minute
    setInterval(() => {
        renderContests();
        // Cần gọi lại lắng nghe sau khi render lại giao diện
        listenToParticipantCounts(); 
    }, 60000);
});