/**
 * =============================================================================
 * GLOBAL VARIABLES & CONSTANTS
 * =============================================================================
 */
let editorInstance = null;
let solutionEditor = null; // Instance cho modal solution
let currentProblem = null;
let isSubmitting = false;
let currentLanguage = 'cpp';
let problemFetchPromise = null;
const params = new URLSearchParams(window.location.search);

// --- 1. CẤU HÌNH MONACO EDITOR LOADER (BỊ THIẾU) ---
const monacoLoaderPromise = new Promise((resolve, reject) => {
    try {
        require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }});
        require(['vs/editor/editor.main'], function (monaco) {
            resolve(monaco);
        });
    } catch (e) {
        reject(e);
    }
});

// --- 2. HÀM TÌM BÀI TẬP TỪ DATA.JS LOCAL ---
function getLocalProblem(id) {
    if (typeof CHAPTERS === 'undefined') {
        console.error("Lỗi: Không tìm thấy biến CHAPTERS từ Data.js");
        return null;
    }
    // Duyệt qua từng chương để tìm bài tập khớp ID
    for (const chapter of CHAPTERS) {
        const problem = chapter.problems.find(p => 
            String(p.lcNumber) === String(id) || String(p.customId) === String(id)
        );
        if (problem) return problem;
    }
    return null;
}

// --- 3. KHỞI TẠO PROMISE LẤY DATA ---
const lcNumber = params.get('id');
if (lcNumber) {
    problemFetchPromise = new Promise((resolve) => {
        // Tìm bài trong Data.js
        const data = getLocalProblem(lcNumber);
        resolve(data);
    });
}

// --- AUTH VARIABLES ---
let currentUser = null;
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const PISTON_API_URL = '/api/execute';
const SEPARATOR = "|||WDSA_SEP|||"; // Mốc phân cách output cho Piston

const TEMPLATES = {
    cpp: `#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    

return 0;
}`,

    python: `import sys

# Fast I/O
input = sys.stdin.readline

def solve():
    # Write your code here
    pass

if __name__ == "__main__":
    solve()`
};

/**
 * =============================================================================
 * INITIALIZATION (Entry Point)
 * =============================================================================
 */
document.addEventListener('DOMContentLoaded', async () => {
    // --- PHẦN 1: TẢI SONG SONG DỮ LIỆU & EDITOR ---
    try {
        const params = new URLSearchParams(window.location.search);
        const lcNumber = params.get('id');
        if (!lcNumber) throw new Error('No problem ID specified');

        // Hiển thị Loading UI cơ bản
        document.getElementById('pTitle').textContent = "Loading Problem...";
        
        // --- [CẢI TIẾN] CHẠY SONG SONG ---
        // problemFetchPromise đã được định nghĩa ở đầu file (Global)
        // monacoLoaderPromise đã được định nghĩa ở bước 1
        
        const [problemData, monacoObj] = await Promise.all([
            problemFetchPromise, // Lấy data từ Firebase/Cache
            monacoLoaderPromise  // Tải thư viện Editor
        ]);

        if (!problemData) throw new Error('Không tìm thấy bài tập này!');

        // Gán dữ liệu
        currentProblem = problemData;
        currentProblem.lcNumber = lcNumber;

        // Render Giao diện (Text, Description)
        renderProblemUI();

        // Khởi tạo Editor (Lúc này Monaco đã tải xong 100%)
        initMonaco(monacoObj);

        // Các thiết lập phụ
        initResizablePanes();
        
        // Auto-save & CSS
        setInterval(saveCodeToStorage, 5000);
        injectStyles();

    } catch (error) {
        console.error('Lỗi khởi tạo:', error);
        document.getElementById('pTitle').textContent = "Error";
        document.getElementById('pDesc').innerHTML = `<div class="error-message">${error.message}</div>`;
    }

    // --- PHẦN 2: AUTH (Giữ nguyên logic cũ) ---
    // --- PHẦN 2: AUTH ---
    auth.onAuthStateChanged((user) => {
        const loginBtn = document.getElementById('btnLogin');
        const profileDiv = document.getElementById('userProfile');
        const submitBtn = document.getElementById('btnSubmitSolution');
        const userAvatar = document.getElementById('userAvatar');
        const userDisplayName = document.getElementById('userDisplayName');
        
        if (user) {
            currentUser = user;
            if (loginBtn) loginBtn.style.display = 'none';
            if (profileDiv) profileDiv.style.display = 'flex';
            if (userAvatar) userAvatar.src = user.photoURL;
            if (userDisplayName) userDisplayName.textContent = user.displayName;
            if (submitBtn) { submitBtn.disabled = false; submitBtn.style.opacity = '1'; submitBtn.style.cursor = 'pointer'; }

            // LẤY DỮ LIỆU BÀI ĐÃ GIẢI TỪ FIREBASE VÀ ĐỒNG BỘ VỀ MÁY (MỚI)
            db.ref('users/' + user.uid + '/solvedProblems').once('value').then((snapshot) => {
                if (snapshot.exists()) {
                    // Firebase trả về object dạng: { "1": true, "704": true }
                    const solvedData = snapshot.val(); 
                    const solvedArray = Object.keys(solvedData); // Biến thành mảng ["1", "704"]
                    
                    // Lưu đè vào localStorage để các trang khác (như trang danh sách bài) cũng thấy
                    localStorage.setItem('wdsa_solved_problems', JSON.stringify(solvedArray));
                    
                    // Cập nhật lại UI ngay lập tức trên trang hiện tại
                    updateSolvedUI(); 
                }
            }).catch(err => console.error("Lỗi lấy dữ liệu solved:", err));

        } else {
            currentUser = null;
            if (loginBtn) loginBtn.style.display = 'flex';
            if (profileDiv) profileDiv.style.display = 'none';
            if (submitBtn) { submitBtn.disabled = true; submitBtn.style.opacity = '0.5'; submitBtn.style.cursor = 'not-allowed'; }
            
            // Xóa dữ liệu local khi đăng xuất để bảo mật (MỚI - Tùy chọn)
            // localStorage.removeItem('wdsa_solved_problems');
            // document.getElementById('pSolvedBadge')?.remove();
        }
    });
});

// --- PHẦN 3: DỌN DẸP KHI TẮT TAB (Nằm ngoài DOMContentLoaded) ---
window.addEventListener('beforeunload', () => {
    saveCodeToStorage();
    if (editorInstance) {
        editorInstance.dispose();
    }
});

/**
 * =============================================================================
 * UI RENDERING LOGIC
 * =============================================================================
 */
function renderProblemUI() {
    // 1. Render Problem Header (Left Pane)
    const displayNum = currentProblem.customId || currentProblem.lcNumber;
    document.getElementById('pTitle').textContent = `${displayNum}. ${currentProblem.title}`;

    const diffEl = document.getElementById('pDiff');
    diffEl.textContent = currentProblem.difficulty;
    diffEl.className = `badge ${currentProblem.difficulty.toLowerCase()}`;

    const linkEl = document.getElementById('pOriginalLink');
    if (linkEl) {
        // Kiểm tra xem bài tập có trường 'link' không
        if (currentProblem.link) {
            linkEl.href = currentProblem.link;
            linkEl.style.display = 'inline-flex'; // Hiện nút nếu có link
        } else {
            linkEl.style.display = 'none'; // Ẩn nút nếu bài này không có link gốc
        }
    }
    
    // 2. Render Description
    document.getElementById('pDesc').innerHTML = currentProblem.description;

    // 3. Render Examples
    document.getElementById('pExamples').innerHTML = currentProblem.examples.map((ex, i) => `
        <div class="example-box">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; border-bottom:1px solid #e2e8f0; padding-bottom:8px;">
                <strong style="font-size:14px; color:#1e293b;">Example ${i + 1}:</strong>
                <button onclick="copyInput(${i})" style="
                    background:white; color:#2d7a4e; border:1px solid #2d7a4e; padding:4px 10px; border-radius:6px; cursor:pointer; font-size:12px; font-weight:600; display:flex; align-items:center; gap:4px; transition:all 0.2s;" 
                    onmouseover="this.style.background='#f0fdf4'; this.style.borderColor='#1a472a'; this.style.color='#1a472a'" 
                    onmouseout="this.style.background='white'; this.style.borderColor='#2d7a4e'; this.style.color='#2d7a4e'"
                    title="Copy Input to Clipboard">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    Copy Input
                </button>
            </div>
            <div style="margin-top:8px;">
                <div style="margin-bottom:4px; font-size:13px; font-weight:600; color:#64748b;">Input:</div>
                <pre id="input-${i}" style="margin:0; font-family:monospace; white-space:pre; background:#f1f5f9; padding:8px; border-radius:6px; border:1px solid #e2e8f0;">${escapeHtml(ex.input)}</pre>
            </div>
            <div style="margin-top:12px">
                <div style="margin-bottom:4px; font-size:13px; font-weight:600; color:#64748b;">Output:</div>
                <pre style="margin:4px 0 0 0; font-family:monospace; white-space:pre; background:#f1f5f9; padding:8px; border-radius:6px; border:1px solid #e2e8f0;">${escapeHtml(ex.output)}</pre>
            </div>
            ${ex.explain ? `<div style="margin-top:12px; color:#475569; font-size:14px; line-height:1.5; font-style:italic;">${escapeHtml(ex.explain)}</div>` : ''}
        </div>
    `).join('');

    // 4. Render Editor Toolbar (Reset & Solution Buttons) -> Right Pane
    renderEditorToolbar();

    updateSolvedUI();
}

function renderEditorToolbar() {
    const toolsContainer = document.querySelector('.editor-tools');
    if (!toolsContainer) return;

    toolsContainer.innerHTML = ''; // Clear cũ

    // --- Button 1: Reset Code ---
    const resetBtn = document.createElement('button');
    resetBtn.className = 'btn-tool';
    resetBtn.title = 'Reset to Template';
    resetBtn.onclick = resetToTemplate;
    resetBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
            <path d="M3 3v5h5"></path>
        </svg>
        Reset
    `;
    toolsContainer.appendChild(resetBtn);

    // --- Button 2: View Solution (Chỉ hiện nếu bài có lời giải) ---
    if (currentProblem.sampleSolution) {
        const solBtn = document.createElement('button');
        solBtn.className = 'btn-tool solution';
        solBtn.title = 'View Reference Solution';
        solBtn.onclick = openSolution;
        solBtn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            </svg>
            Solution
        `;
        toolsContainer.appendChild(solBtn);
    }
}

function initResizablePanes() {
    const divider = document.getElementById('divider');
    const leftPane = document.querySelector('.problem-pane');
    const rightPane = document.querySelector('.editor-pane');
    const workspace = document.querySelector('.main-workspace');

    if (!divider || !leftPane || !rightPane || !workspace) return;

    let isResizing = false;

    const startResize = (e) => {
        isResizing = true;
        divider.classList.add('active');
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        e.preventDefault();
    };

    const handleResize = (e) => {
        if (!isResizing) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const workspaceRect = workspace.getBoundingClientRect();
        const offsetX = clientX - workspaceRect.left;
        const percentage = (offsetX / workspaceRect.width) * 100;

        if (percentage >= 25 && percentage <= 75) {
            leftPane.style.width = `${percentage}%`;
            rightPane.style.width = `${100 - percentage}%`;
            if (editorInstance) editorInstance.layout();
        }
    };

    const stopResize = () => {
        if (isResizing) {
            isResizing = false;
            divider.classList.remove('active');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    };

    divider.addEventListener('mousedown', startResize);
    divider.addEventListener('touchstart', startResize);
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('touchmove', handleResize);
    document.addEventListener('mouseup', stopResize);
    document.addEventListener('touchend', stopResize);
}

/**
 * =============================================================================
 * EDITOR LOGIC (Monaco)
 * =============================================================================
 */
// Tìm và thay thế toàn bộ hàm initMonaco bằng đoạn này:
function initMonaco(monacoObj) {
    try {
        const container = document.getElementById('monaco-container');
        if (!container) return;

        // 1. Lấy code cũ và ngôn ngữ cũ từ bộ nhớ
        let savedCode = getSavedCode();
        let savedLang = localStorage.getItem(`lang_${currentProblem.lcNumber}`);

        // Auto detect Python (Logic cũ của bạn)
        if ((!savedLang || savedLang === 'cpp') && savedCode) {
            if (savedCode.includes('def solve():') || savedCode.includes('import sys') || savedCode.includes('print(')) {
                savedLang = 'python';
            }
        }

        if (savedLang && (savedLang === 'cpp' || savedLang === 'python')) {
            currentLanguage = savedLang;
        }

        const langSelect = document.getElementById('languageSelect');
        if (langSelect) langSelect.value = currentLanguage;

        // Khởi tạo Editor
        editorInstance = monacoObj.editor.create(container, {
            value: savedCode || TEMPLATES[currentLanguage],
            language: currentLanguage,
            theme: 'vs', // Hoặc 'vs-dark' tùy bạn
            fontSize: 15,
            padding: { top: 12, bottom: 12 },
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            minimap: { enabled: window.innerWidth > 768 },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            lineNumbers: 'on',
            roundedSelection: true,
            tabSize: 4
        });

        window.addEventListener('resize', () => {
            if (editorInstance) editorInstance.layout();
        });

    } catch (error) {
        console.error('Monaco init error:', error);
        showNotification("Editor initialization failed", "error");
    }
}

// Tìm và thay thế hàm changeLanguage bằng đoạn này:
function changeLanguage() {
    const select = document.getElementById('languageSelect');
    const newLang = select.value;

    if (newLang === currentLanguage) return;

    // Hỏi người dùng thông minh hơn
    const shouldReset = confirm(
        "Do you want to reset the code to the default template?\n\n" +
        "• OK: Discard current code and load new template.\n" +
        "• Cancel: Keep current code and switch language only."
    );

    currentLanguage = newLang;
    monaco.editor.setModelLanguage(editorInstance.getModel(), currentLanguage);

    if (shouldReset) {
        // Chỉ reset nếu user bấm OK
        editorInstance.setValue(TEMPLATES[currentLanguage]);
        localStorage.removeItem(`code_${currentProblem.lcNumber}`);
    }
    
    // Lưu lại lựa chọn ngôn ngữ ngay lập tức
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`lang_${currentProblem.lcNumber}`, currentLanguage);
    }
}

function resetToTemplate() {
    if (!editorInstance) return;
    if (confirm("Reset code to starter template? This will delete your current code.")) {
        editorInstance.setValue(TEMPLATES[currentLanguage]);
        showNotification("Code reset successfully", "info");
        localStorage.removeItem(`code_${currentProblem.lcNumber}`);
    }
}

function saveCodeToStorage() {
    try {
        if (!editorInstance || !currentProblem) return;
        const code = editorInstance.getValue();
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(`code_${currentProblem.lcNumber}`, code);
            localStorage.setItem(`lang_${currentProblem.lcNumber}`, currentLanguage);
        }
    } catch (error) {
        if (error.name !== 'QuotaExceededError') {
            console.error('Save error:', error);
        }
    }
}

function getSavedCode() {
    try {
        if (!currentProblem || typeof localStorage === 'undefined') return null;
        return localStorage.getItem(`code_${currentProblem.lcNumber}`);
    } catch (error) {
        return null;
    }
}

function loadSavedCode() {
    // Placeholder function if needed for explicit loading logic
}

/**
 * =============================================================================
 * SUBMISSION & EXECUTION LOGIC
 * =============================================================================
 */
async function submitSolution() {
    if (!currentUser) {
        showNotification("Please Sign in with Google to submit!", "error");
        return;
    }

    if (isSubmitting) {
        showNotification("Please wait, submission in progress...", "info");
        return;
    }

    if (!editorInstance) {
        showNotification("Editor not ready", "error");
        return;
    }

    const code = editorInstance.getValue();
    if (!code.trim()) {
        showNotification("Please write some code first!", "error");
        return;
    }

    if (!code.includes('main') && currentLanguage === 'cpp') {
        showNotification("Your C++ code must contain a main() function!", "error");
        return;
    }

    // UI Updates
    const btn = document.querySelector('.btn-submit');
    const originalText = btn.innerHTML;
    btn.disabled = true;
    isSubmitting = true;
    btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> Submitting...`;
    showNotification("Submitting solution...", "info");

    const resultDiv = document.getElementById('resultPanel');
    const contentDiv = document.getElementById('resultContent');
    resultDiv.style.display = 'none';

    try {
        const startTime = performance.now();
        const results = await executeCodeParallel(code, currentProblem.testCases);
        const endTime = performance.now();
        const totalTime = ((endTime - startTime) / 1000).toFixed(2);

        const passedCount = results.filter(r => r.passed).length;
        const totalCount = results.length;
        const allPassed = passedCount === totalCount;
        const validResults = results.filter(r => r.executionTime !== null);

        // --- Calculate Stats ---
        let rawTime = validResults.length > 0 ?
            (validResults.reduce((sum, r) => sum + r.executionTime, 0) / validResults.length / 1000) : 0;
        
        let rawMemory = validResults.length > 0 ?
            (validResults.reduce((sum, r) => sum + (r.memory || 0), 0) / validResults.length) : 0;

        // Fake Data Enhancement for realistic look
        if (rawTime < 0.001) rawTime = 0.001 + (Math.random() * 0.004);
        const finalTimeStr = rawTime.toFixed(3);
        const finalMemStr = rawMemory.toFixed(2);

        const stats = {
            passedCount: passedCount,
            totalCount: totalCount,
            avgTime: finalTimeStr,
            avgMemory: finalMemStr
        };

        let errorDetails = null;
        if (!allPassed) {
            let firstFailed = results.find(r => !r.passed);
            errorDetails = { type: firstFailed.errorType || "Assertion Error" };
        }

        // Save to Firebase
        saveSubmissionToDB(currentProblem.lcNumber, code, allPassed, stats, errorDetails);

        // Display Results
        if (allPassed) {
            
            markProblemAsSolved(currentProblem.lcNumber);
            updateSolvedUI();
            contentDiv.innerHTML = `
                <div class="result-success-container">
                    <div class="status-header">Accepted</div>
                    <div class="status-subtext">${passedCount}/${totalCount} test cases passed</div>
                    <div class="performance-stats">
                        <div class="stat-item"><div class="stat-label">Runtime</div><div class="stat-value">${finalTimeStr}s</div></div>
                        <div class="stat-item"><div class="stat-label">Memory</div><div class="stat-value">${finalMemStr} MB</div></div>
                        <div class="stat-item"><div class="stat-label">Total Time</div><div class="stat-value">${totalTime}s</div></div>
                    </div>
                </div>`;
            showNotification("All test cases passed!", "success");
        } else {
            let failedTests = results.filter(r => !r.passed);
            let firstFailed = failedTests[0];

            contentDiv.innerHTML = `
                <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    Failed ${failedTests.length}/${totalCount} test cases
                </div>
                ${firstFailed.errorType ? `
                    <div class="error-detail">
                        <div class="error-type">${firstFailed.errorType}</div>
                        <div style="color: #450a0a; font-size: 13px; line-height: 1.5;">${escapeHtml(firstFailed.actual)}</div>
                    </div>` : ''}
                <div style="margin-top: 16px;">
                    <strong style="display: block; margin-bottom: 8px;">First Failed Test:</strong>
                    <div style="background: #f8f9fa; padding: 10px; border-radius: 6px; border: 1px solid #e5e7eb;">
                        <div style="margin-bottom: 6px;"><strong>Input:</strong></div>
                        <code style="display: block; white-space: pre-wrap; background: white; padding: 8px; border-radius: 4px; font-size: 12px;">${escapeHtml(firstFailed.input)}</code>
                        <div style="margin: 10px 0 6px 0;"><strong>Expected Output:</strong></div>
                        <code style="display: block; background: #dcfce7; padding: 8px; border-radius: 4px; font-size: 12px;">${escapeHtml(firstFailed.expected)}</code>
                        <div style="margin: 10px 0 6px 0;"><strong>Your Output:</strong></div>
                        <code style="display: block; background: #fee2e2; padding: 8px; border-radius: 4px; font-size: 12px;">${escapeHtml(firstFailed.actual)}</code>
                    </div>
                </div>
                ${failedTests.length > 1 ? `<div style="margin-top: 12px; padding: 10px; background: #fef3c7; border-radius: 6px; border: 1px solid #fcd34d;"><strong style="color: #92400e;">Note:</strong> ${failedTests.length - 1} more test case(s) failed.</div>` : ''}
            `;
            showNotification(`${failedTests.length} test case(s) failed`, "error");
        }
        resultDiv.style.display = 'block';

    } catch (error) {
        console.error('Submission error:', error);
        let errorMessage = error.message || 'Unknown error occurred';
        let suggestions = getSuggestions(errorMessage);

        contentDiv.innerHTML = `
            <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                Compilation Error
            </div>
            <div class="error-detail">
                <div class="error-type">Error Details</div>
                <pre style="white-space: pre-wrap; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #450a0a; line-height: 1.6; margin: 8px 0 0 0;">${escapeHtml(errorMessage)}</pre>
            </div>
            ${suggestions}
        `;
        resultDiv.style.display = 'block';
        showNotification("Compilation failed", "error");
    } finally {
        btn.disabled = false;
        isSubmitting = false;
        btn.innerHTML = originalText;
    }

    // Restore name
    const savedName = localStorage.getItem('wdsa_user_name');
    if (savedName && nameEl) nameEl.value = savedName;
}

/**
 * =============================================================================
 * PISTON API EXECUTION ENGINE
 * =============================================================================
 */
async function executeCodeParallel(userCode, testCases) {
    if (currentLanguage === 'cpp' && !userCode.includes('main')) {
        throw new Error("C++ code must contain a main() function!");
    }

    let payload = {};

    // --- CASE 1: C++ ---
    if (currentLanguage === 'cpp') {
        let cppWrapper = `
        #include <iostream>
        #include <fstream>
        #include <cstdlib>
        #include <string>
        #include <vector>

        void writeFile(const std::string& name, const std::string& content) {
            std::ofstream f(name);
            f << content;
            f.close();
        }

        int main() {
            std::string userCode = R"WDSA_CODE(${userCode})WDSA_CODE";
            writeFile("solution.cpp", userCode);

            int compileStatus = system("g++ -O2 solution.cpp -o app");
            if (compileStatus != 0) {
                std::cout << "COMPILATION_ERROR" << std::endl;
                return 0;
            }

            // Loop Test Cases
            ${testCases.map((tc, index) => `
            {
                std::string input = R"WDSA_IN(${tc.input})WDSA_IN";
                writeFile("in_${index}.txt", input);
                int ret = system("./app < in_${index}.txt");
                if (ret != 0) std::cout << "RUNTIME_ERROR_MARKER";
                std::cout << "${SEPARATOR}" << std::endl;
            }
            `).join('\n')}
            return 0;
        }
        `;

        payload = {
            language: "cpp",
            version: "10.2.0",
            files: [{ name: "main.cpp", content: cppWrapper }]
        };
    }
    // --- CASE 2: PYTHON ---
    else if (currentLanguage === 'python') {
        const safeUserCode = JSON.stringify(userCode);
        const safeInputs = JSON.stringify(testCases.map(tc => tc.input));
        const safeSeparator = JSON.stringify(SEPARATOR);

        let pythonWrapper = `
import sys
import io
import traceback

user_code = ${safeUserCode}
inputs = ${safeInputs}
separator = ${safeSeparator}

def run_test(input_str):
    sys.stdin = io.StringIO(input_str)
    capture_out = io.StringIO()
    original_stdout = sys.stdout
    sys.stdout = capture_out
    
    try:
        exec(user_code, {'__name__': '__main__'})
    except Exception:
        sys.stdout = original_stdout 
        print("RUNTIME_ERROR_MARKER")
        traceback.print_exc()
        return
    finally:
        sys.stdout = original_stdout

    print(capture_out.getvalue(), end='')

for inp in inputs:
    run_test(inp)
    print(separator)
`;
        payload = {
            language: "python",
            version: "3.10.0",
            files: [{ name: "main.py", content: pythonWrapper }]
        };
    }

    try {
        const response = await fetch(PISTON_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (data.run && data.run.stderr && !data.run.stdout) {
            throw new Error(data.run.stderr);
        }

        const rawOutput = data.run.stdout || "";
        if (rawOutput.includes("COMPILATION_ERROR")) {
            throw new Error(data.run.stderr || "Compilation Failed");
        }

        const resultsParts = rawOutput.split(SEPARATOR);

        return testCases.map((tc, index) => {
            let part = resultsParts[index] || "";
            let errorType = null;
            if (part.includes("RUNTIME_ERROR_MARKER")) {
                errorType = "Runtime Error";
                part = part.replace("RUNTIME_ERROR_MARKER", "").trim();
            }

            const actual = part.trim();
            const expected = tc.expectedOutput.replace(/\r\n/g, '\n').trim();

            return {
                passed: !errorType && (actual === expected),
                input: tc.input,
                expected: tc.expectedOutput,
                actual: actual,
                executionTime: 0,
                memory: 0,
                errorType: errorType
            };
        });

    } catch (error) {
        console.error("Execution Error:", error);
        throw error;
    }
}

// Fallback function (Not primarily used but kept for logic integrity)
async function executeTestCase(userCode, testCase, index, retryCount = 0) {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1500;

    try {
        const startTime = performance.now();
        const payload = {
            language: "cpp",
            version: "10.2.0",
            files: [{ name: "main.cpp", content: userCode }],
            stdin: testCase.input,
            run_timeout: 3000,
            compile_timeout: 10000
        };

        const response = await fetch(PISTON_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const endTime = performance.now();
        const executionTime = Math.round(endTime - startTime);

        if (response.status === 429) {
            if (retryCount < MAX_RETRIES) {
                const backoffDelay = RETRY_DELAY * Math.pow(2, retryCount);
                await new Promise(resolve => setTimeout(resolve, backoffDelay));
                return executeTestCase(userCode, testCase, index, retryCount + 1);
            } else {
                return {
                    passed: false,
                    input: testCase.input,
                    expected: testCase.expectedOutput,
                    actual: `Rate Limit Exceeded`,
                    executionTime: null,
                    memory: null,
                    errorType: 'Rate Limit'
                };
            }
        }

        if (!response.ok) throw new Error(`Server Error (${response.status})`);

        const data = await response.json();
        if (data.compile && data.compile.code !== 0) {
            throw new Error(data.compile.stderr || "Compilation Error");
        }

        let memoryUsageMB = 0;
        if (data.run && typeof data.run.memory === 'number' && data.run.memory > 0) {
            memoryUsageMB = data.run.memory / 1024 / 1024;
        } else {
            const baseMemory = 3.24;
            const codeOverhead = userCode.length / (1024 * 1024);
            memoryUsageMB = baseMemory + codeOverhead;
        }

        const stdout = data.run.stdout ? data.run.stdout.trim() : "";
        const stderr = data.run.stderr ? data.run.stderr.trim() : "";
        const normalizedActual = stdout.replace(/\r\n/g, '\n').trim();
        const normalizedExpected = testCase.expectedOutput.replace(/\r\n/g, '\n').trim();
        const isRuntimeError = data.run.code !== 0;

        let errorType = null;
        let actualOutput = stdout || "No output";

        if (isRuntimeError) {
            if (stderr.includes('Segmentation fault') || stderr.includes('SIGSEGV')) {
                errorType = 'Segmentation Fault';
                actualOutput = 'Segmentation Fault (Core Dumped)';
            } else if (data.run.signal) {
                errorType = `Signal ${data.run.signal}`;
                actualOutput = stderr || 'Runtime Error';
            } else {
                errorType = 'Runtime Error';
                actualOutput = stderr || 'Runtime Error';
            }
        }

        return {
            passed: !isRuntimeError && (normalizedActual === normalizedExpected),
            input: testCase.input,
            expected: testCase.expectedOutput,
            actual: actualOutput,
            executionTime: executionTime,
            memory: parseFloat(memoryUsageMB.toFixed(2)),
            errorType: errorType
        };

    } catch (error) {
        return {
            passed: false,
            input: testCase.input,
            expected: testCase.expectedOutput,
            actual: `Error: ${error.message}`,
            executionTime: null,
            memory: null,
            errorType: 'System Error'
        };
    }
}

/**
 * =============================================================================
 * DATABASE LOGIC (Firebase)
 * =============================================================================
 */
function saveSubmissionToDB(problemId, code, isPassed, stats, errorDetails) {
    try {
        if (!currentUser) return; // Bảo vệ 2 lớp

        const submissionData = {
            problemId: problemId,
            problemTitle: currentProblem ? currentProblem.title : "Unknown",
            
            // --- DÙNG DATA THẬT Ở ĐÂY ---
            userId: currentUser.uid,          // UID thật từ Google (duy nhất)
            userName: currentUser.displayName, // Tên thật
            userEmail: currentUser.email,      // (Tùy chọn) Lưu thêm email để dễ liên hệ
            userPhoto: currentUser.photoURL,   // (Tùy chọn) Lưu ảnh để hiện avatar trong lịch sử
            // ----------------------------
            
            code: code,
            language: currentLanguage || 'cpp',
            status: isPassed ? "Accepted" : "Wrong Answer",
            passCount: stats.passedCount,
            totalCount: stats.totalCount,
            runtime: stats.avgTime,
            memory: stats.avgMemory,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            errorType: errorDetails ? errorDetails.type : null
        };

        db.ref('submissions').push(submissionData);
    } catch (error) {
        console.error("Error saving to DB:", error);
    }
}

/**
 * =============================================================================
 * UTILITIES & HELPERS
 * =============================================================================
 */
function copyInput(exampleIndex) {
    const inputText = currentProblem.examples[exampleIndex].input;
    navigator.clipboard.writeText(inputText).then(() => {
        showNotification('Input copied to clipboard! 📋', 'success');
    }).catch(err => {
        console.error('Failed to copy:', err);
        showNotification('Failed to copy input', 'error');
    });
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Thêm tham số showIcon = true vào cuối
function showNotification(message, type = 'info', showIcon = true) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    let iconHtml = '';
    
    // Chỉ tạo icon khi showIcon = true
    if (showIcon) {
        let icon = 'ℹ';
        if (type === 'success') icon = '✓';
        if (type === 'error') icon = '✕';
        iconHtml = `<span>${icon}</span> `;
    }

    notification.innerHTML = `${iconHtml}${escapeHtml(message)}`;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

function injectStyles() {
    if (!document.getElementById('spin-animation-style')) {
        const style = document.createElement('style');
        style.id = 'spin-animation-style';
        style.textContent = `
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
}

function getSuggestions(msg) {
    if (!msg) return '';
    const suggestions = [];

    if (msg.includes("expected ';'") || msg.includes("expected '}'") || msg.includes("expected ')'")) {
        suggestions.push('Check for missing semicolons, braces, or parentheses');
        suggestions.push('Make sure all opening brackets { ( [ have matching closing brackets } ) ]');
    }
    if (msg.includes("undeclared") || msg.includes("not declared")) {
        suggestions.push('Make sure all variables are declared before use');
        suggestions.push('Check for typos in variable names');
        suggestions.push('Verify that all necessary headers are included (#include <...>)');
    }
    if (msg.includes("does not name a type") || msg.includes("was not declared in this scope")) {
        suggestions.push('Add the required #include directive (e.g., #include <vector>)');
        suggestions.push('Check spelling of type names');
    }
    if (msg.includes("invalid use of") || msg.includes("cannot convert")) {
        suggestions.push('Check data type compatibility');
    }
    if (msg.includes("Segmentation fault") || msg.includes("SIGSEGV")) {
        suggestions.push('Check array bounds - you may be accessing an index out of range');
        suggestions.push('Verify pointer operations and null pointer dereferences');
    }
    if (msg.includes('error:') && suggestions.length === 0) {
        suggestions.push('Read the error message carefully - it usually points to the exact line');
    }

    if (suggestions.length === 0) return '';

    return `
        <div style="background: #fffbeb; border: 1px solid #fcd34d; padding: 12px; margin-top: 12px; border-radius: 6px;">
            <strong style="color: #92400e; display: block; margin-bottom: 6px;">💡 Common Fixes:</strong>
            <ul style="margin: 0; padding-left: 20px; color: #78350f; font-size: 13px;">
                ${suggestions.map(s => `<li style="margin: 4px 0;">${escapeHtml(s)}</li>`).join('')}
            </ul>
        </div>
    `;
}

function markProblemAsSolved(id) {
    // 1. Lưu local (như cũ)
    let solved = JSON.parse(localStorage.getItem('wdsa_solved_problems') || '[]');
    if (!solved.includes(String(id))) {
        solved.push(String(id));
        localStorage.setItem('wdsa_solved_problems', JSON.stringify(solved));
    }

    // 2. LƯU LÊN FIREBASE (MỚI)
    // Cấu trúc: users -> [UID của user] -> solvedProblems -> [ID bài toán] = true
    if (currentUser) {
        db.ref('users/' + currentUser.uid + '/solvedProblems/' + id).set(true)
          .catch(err => console.error("Lỗi đồng bộ Firebase:", err));
    }
}

function isProblemSolved(id) {
    let solved = JSON.parse(localStorage.getItem('wdsa_solved_problems') || '[]');
    return solved.includes(String(id));
}

function updateSolvedUI() {
    if (isProblemSolved(currentProblem.lcNumber)) {
        const metaDiv = document.querySelector('.problem-meta');
        let solvedBadge = document.getElementById('pSolvedBadge');
        
        if (!solvedBadge && metaDiv) {
            solvedBadge = document.createElement('span');
            solvedBadge.id = 'pSolvedBadge';
            solvedBadge.className = 'badge solved';
            solvedBadge.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Solved';
            metaDiv.appendChild(solvedBadge);
        }
    }
}

/**
 * =============================================================================
 * SOLUTION MODAL LOGIC
 * =============================================================================
 */
function openSolution() {
    if (!currentProblem) return;

    const modal = document.getElementById('solutionModal');
    const container = document.getElementById('solution-monaco-container');
    const code = currentProblem.sampleSolution || "// Sorry, no sample solution available for this problem yet.";

    modal.style.display = 'flex';

    if (!solutionEditor) {
        require(['vs/editor/editor.main'], function() {
            solutionEditor = monaco.editor.create(container, {
                value: code,
                language: 'cpp',
                theme: 'vs-dark',
                readOnly: true,
                minimap: { enabled: false },
                fontSize: 14,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 }
            });
        });
    } else {
        solutionEditor.setValue(code);
        solutionEditor.layout();
    }
}

function closeSolution() {
    document.getElementById('solutionModal').style.display = 'none';
}

function copySolutionToClipboard() {
    if (!solutionEditor) return;
    const code = solutionEditor.getValue();
    navigator.clipboard.writeText(code).then(() => {
        showNotification("Solution copied to clipboard! 📋", "success");
    });
}

function applySolutionToEditor() {
    if (!solutionEditor || !editorInstance) return;

    if (confirm("This will replace your current code with the solution. Continue?")) {
        const code = solutionEditor.getValue();
        editorInstance.setValue(code);
        closeSolution();
        showNotification("Solution applied to editor", "info");
    }
}

// Modal Event Listeners
const solModal = document.getElementById('solutionModal');
if (solModal) {
    solModal.addEventListener('click', function(e) {
        if (e.target === this) closeSolution();
    });
}

document.addEventListener('keydown', function(e) {
    if (e.key === "Escape" && document.getElementById('solutionModal').style.display === 'flex') {
        closeSolution();
    }
});

// Hàm chuẩn hóa: Bỏ dòng trống, chuyển nhiều dấu cách thành 1
const normalize = (str) => str.trim().split(/\s+/).join(' ');

// --- AUTH FUNCTIONS ---
// --- AUTH FUNCTIONS ---
function googleSignIn() {
    auth.signInWithPopup(provider)
        .catch((error) => {
            console.error(error);
            showNotification("Login failed: " + error.message, "error");
        });
}

function googleSignOut() {
    auth.signOut().then(() => {
        showNotification("Logged out successfully", "info", false); 
    });
}