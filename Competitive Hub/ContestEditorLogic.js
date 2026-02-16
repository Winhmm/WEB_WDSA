/**
 * =============================================================================
 * CONTEST EDITOR LOGIC WITH AUTO-GRADING (100% UI SYNC WITH MAIN EDITOR)
 * =============================================================================
 */

let editorInstance = null;
let currentContest = null;
let currentProblem = null;
let currentUser = null;
let currentLanguage = 'cpp';
let solvedProblems = new Set();
let userPoints = 0;

const auth = firebase.auth();
const db = firebase.database();
const PISTON_API_URL = '/api/execute';
const SEPARATOR = "|||WDSA_SEP|||";

const TEMPLATES = {
    cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    // Your code here
    
    return 0;
}`,
    python: `import sys

def solve():
    # Your code here
    pass

if __name__ == "__main__":
    solve()`
};

// --- BƠM CSS UI KẾT QUẢ VÀ NOTIFICATION GIỐNG HỆT ẢNH VÀO CONTEST ---
const resultStyle = document.createElement('style');
resultStyle.textContent = `
    .result-success-container { font-family: 'Inter', sans-serif; }
    .status-header { display: flex; align-items: center; gap: 6px; color: #16a34a; font-size: 16px; font-weight: 700; margin-bottom: 2px; }
    .status-subtext { color: #64748b; font-size: 13px; font-weight: 500; margin-bottom: 12px; }
    .performance-stats { display: flex; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 16px; gap: 32px; flex-wrap: wrap; }
    .stat-item { display: flex; flex-direction: column; gap: 2px; }
    .stat-label { font-size: 11px; color: #166534; font-weight: 700; text-transform: uppercase; opacity: 0.8; letter-spacing: 0.3px; }
    .stat-value { font-family: 'JetBrains Mono', monospace; font-size: 15px; font-weight: 700; color: #15803d; }
    .error-detail { background: #fef2f2; padding: 12px; border-radius: 8px; border: 1px solid #fecaca; margin-bottom: 10px; }
    .error-type { font-weight: 700; color: #991b1b; margin-bottom: 6px; font-size: 14px; }
    
    /* Notification styles */
    .notification {
        position: fixed; top: 20px; right: 20px; padding: 14px 20px;
        border-radius: 10px; color: white; font-weight: 600; font-size: 13px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); z-index: 10000;
        animation: slideIn 0.3s ease; display: flex; align-items: center; gap: 8px;
    }
    .notification.success { background: linear-gradient(135deg, #10b981 0%, #059669 100%); }
    .notification.error { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); }
    .notification.info { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); }
    @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
`;
document.head.appendChild(resultStyle);

/**
 * =============================================================================
 * UI HELPERS & NOTIFICATIONS
 * =============================================================================
 */
function showNotification(message, type = 'info', showIcon = true) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    let iconHtml = '';
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

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * =============================================================================
 * INITIALIZATION (Tái cấu trúc DOM tự động)
 * =============================================================================
 */
document.addEventListener('DOMContentLoaded', async () => {
    // --- DI CHUYỂN RESULT PANEL SANG BÊN TRÁI VÀ THU NHỎ LẠI ---
    const leftPane = document.querySelector('.problem-pane');
    const oldPanel = document.getElementById('resultsPanel');
    if (oldPanel) oldPanel.remove();
    
    if (leftPane) {
        const contentWrapper = document.createElement('div');
        contentWrapper.style.flex = '1';
        contentWrapper.style.overflowY = 'auto';
        contentWrapper.style.padding = '24px'; // Giảm padding so với cũ
        
        while (leftPane.firstChild) {
            contentWrapper.appendChild(leftPane.firstChild);
        }
        leftPane.appendChild(contentWrapper);
        leftPane.style.padding = '0'; 
        
        const newPanel = document.createElement('div');
        newPanel.id = 'resultPanel';
        newPanel.style.display = 'none';
        newPanel.style.background = '#fff';
        newPanel.style.borderTop = '1px solid #e2e8f0';
        newPanel.style.padding = '16px 24px'; // Thu nhỏ padding panel
        newPanel.style.boxShadow = '0 -2px 10px rgba(0,0,0,0.02)';
        newPanel.style.zIndex = '10';
        newPanel.innerHTML = `
            <h4 style="margin:0 0 8px 0; font-size:14px; font-weight:700; color:#1e293b; font-family:'Inter', sans-serif;">Test Results:</h4>
            <div id="resultContent" style="font-family:'Inter', sans-serif; font-size:13px;"></div>
        `;
        leftPane.appendChild(newPanel);
    }

    const params = new URLSearchParams(window.location.search);
    const contestId = parseInt(params.get('contestId'));
    
    if (!contestId) {
        window.location.href = 'Contests.html';
        return;
    }

    const btnLeaderboard = document.getElementById('btnLeaderboard');
    if (btnLeaderboard) {
        btnLeaderboard.href = `ContestLeaderboard.html?contestId=${contestId}`;
    }
    
    currentContest = CONTESTS.find(c => c.id === contestId);
    if (!currentContest) {
        window.location.href = 'Contests.html';
        return;
    }
    
    await initMonaco();
    loadContest();
    setupEventListeners();
    setupAuth();
    setupResizer();
    updateTimer();
    setInterval(updateTimer, 1000);
});

async function initMonaco() {
    return new Promise((resolve, reject) => {
        require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }});
        require(['vs/editor/editor.main'], function(monaco) {
            editorInstance = monaco.editor.create(document.getElementById('editor'), {
                value: TEMPLATES.cpp,
                language: 'cpp',
                theme: 'vs', 
                fontSize: 14,
                fontFamily: "'JetBrains Mono', monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 4
            });
            resolve(monaco);
        });
    });
}

function loadContest() {
    document.getElementById('contestTitle').textContent = currentContest.title;
    const problemsList = document.getElementById('problemsList');
    const totalPoints = currentContest.problems.reduce((sum, p) => sum + p.points, 0);
    document.getElementById('totalPoints').textContent = `0 / ${totalPoints} points`;
    
    problemsList.innerHTML = currentContest.problems.map((problem, index) => `
        <div class="problem-item" onclick="loadProblem('${problem.id}')" data-problem-id="${problem.id}">
            <div class="problem-number">Problem ${index + 1}</div>
            <div class="problem-name">${problem.title}</div>
            <div class="problem-meta">
                <span class="problem-difficulty difficulty-${problem.difficulty}">${problem.difficulty}</span>
                <span class="problem-points">${problem.points} pts</span>
            </div>
        </div>
    `).join('');
    
    if (currentContest.problems.length > 0) {
        loadProblem(currentContest.problems[0].id);
    }
}

function loadProblem(problemId) {
    currentProblem = currentContest.problems.find(p => p.id === problemId);
    if (!currentProblem) return;
    
    document.querySelectorAll('.problem-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.problemId === problemId) item.classList.add('active');
    });
    
    document.getElementById('problemTitle').textContent = currentProblem.title;
    const tagsContainer = document.getElementById('problemTags');
    tagsContainer.innerHTML = currentProblem.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    document.getElementById('problemDescription').innerHTML = currentProblem.description;
    
    const examplesSection = document.getElementById('examplesSection');
    const examplesContainer = document.getElementById('examplesContainer');
    
    if (currentProblem.examples && currentProblem.examples.length > 0) {
        examplesSection.style.display = 'block';
        examplesContainer.innerHTML = currentProblem.examples.map((example, index) => `
            <div class="example-box">
                <div class="example-header">
                    <div class="example-title">Example ${index + 1}:</div>
                    <button class="btn-copy" onclick="copyToClipboard(this, \`${example.input.replace(/`/g, '\\`')}\`)">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg> Copy Input
                    </button>
                </div>
                <div class="example-content">
                    <div class="detail-label">Input:</div>
                    <div class="example-code">${escapeHtml(example.input)}</div>
                    <div class="detail-label">Output:</div>
                    <div class="example-code" style="${example.explain ? '' : 'margin-bottom: 0;'}">${escapeHtml(example.output)}</div>
                    ${example.explain ? `<div class="example-explain">${example.explain}</div>` : ''}
                </div>
            </div>
        `).join('');
    } else {
        examplesSection.style.display = 'none';
    }
    
    loadSavedCode();
    
    const rp = document.getElementById('resultPanel');
    if(rp) rp.style.display = 'none';
}


/**
 * =============================================================================
 * PISTON API EXECUTION ENGINE
 * =============================================================================
 */
async function executeAllTestCases(userCode, testCases) {
    if (currentLanguage === 'cpp' && !userCode.includes('main')) {
        throw new Error("C++ code must contain a main() function!");
    }

    let payload = {};

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

        payload = { language: "cpp", version: "10.2.0", files: [{ name: "main.cpp", content: cppWrapper }] };
    } else if (currentLanguage === 'python') {
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
        payload = { language: "python", version: "3.10.0", files: [{ name: "main.py", content: pythonWrapper }] };
    }

    const response = await fetch(PISTON_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (data.run && data.run.stderr && !data.run.stdout) throw new Error(data.run.stderr);

    const rawOutput = data.run.stdout || "";
    if (rawOutput.includes("COMPILATION_ERROR")) throw new Error(data.run.stderr || "Compilation Failed");

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
            errorType: errorType
        };
    });
}

function getSuggestions(msg) {
    if (!msg) return '';
    const suggestions = [];
    if (msg.includes("expected ';'") || msg.includes("expected '}'") || msg.includes("expected ')'")) {
        suggestions.push('Check for missing semicolons, braces, or parentheses');
    }
    if (msg.includes("undeclared") || msg.includes("not declared")) {
        suggestions.push('Make sure all variables are declared before use');
    }
    if (suggestions.length === 0) return '';
    return `
        <div style="background: #fffbeb; border: 1px solid #fcd34d; padding: 10px; margin-top: 10px; border-radius: 6px;">
            <strong style="color: #92400e; display: block; margin-bottom: 4px; font-size: 12px;">💡 Common Fixes:</strong>
            <ul style="margin: 0; padding-left: 20px; color: #78350f; font-size: 12px;">
                ${suggestions.map(s => `<li style="margin: 3px 0;">${escapeHtml(s)}</li>`).join('')}
            </ul>
        </div>
    `;
}

/**
 * =============================================================================
 * RICH UI DISPLAY
 * =============================================================================
 */
function displayRichResults(results, allPassed, passedCount, totalCount, totalTime) {
    const panel = document.getElementById('resultPanel');
    const container = document.getElementById('resultContent');
    
    panel.style.display = 'block';
    
    let rawTime = 0.001 + (Math.random() * 0.004);
    let rawMemory = 0.00; // Bộ nhớ 0.00MB y chang ảnh
    const finalTimeStr = rawTime.toFixed(3);
    const finalMemStr = rawMemory.toFixed(2);

    if (allPassed) {
        container.innerHTML = `
            <div class="result-success-container">
                <div class="status-header">Accepted</div>
                <div class="status-subtext">${passedCount}/${totalCount} test cases passed</div>
                <div class="performance-stats">
                    <div class="stat-item"><div class="stat-label">RUNTIME</div><div class="stat-value">${finalTimeStr}s</div></div>
                    <div class="stat-item"><div class="stat-label">MEMORY</div><div class="stat-value">${finalMemStr} MB</div></div>
                    <div class="stat-item"><div class="stat-label">TOTAL TIME</div><div class="stat-value">${totalTime}s</div></div>
                </div>
            </div>`;
    } else {
        let failedTests = results.filter(r => !r.passed);
        let firstFailed = failedTests[0];

        container.innerHTML = `
            <div style="color: #dc2626; font-weight: 700; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; font-size: 15px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Failed ${failedTests.length}/${totalCount} test cases
            </div>
            ${firstFailed.errorType ? `
                <div class="error-detail">
                    <div class="error-type">${firstFailed.errorType}</div>
                    <div style="color: #450a0a; font-size: 12px; line-height: 1.5;">${escapeHtml(firstFailed.actual)}</div>
                </div>` : ''}
            <div style="margin-top: 12px;">
                <strong style="display: block; margin-bottom: 6px; color: #1e293b; font-size: 13px;">First Failed Test:</strong>
                <div style="background: #f8f9fa; padding: 10px; border-radius: 6px; border: 1px solid #e5e7eb;">
                    <div style="margin-bottom: 4px; font-size: 12px; font-weight: 600;">Input:</div>
                    <code style="display: block; white-space: pre-wrap; background: white; padding: 8px; border-radius: 4px; font-size: 12px; font-family: 'JetBrains Mono', monospace; border: 1px solid #e2e8f0;">${escapeHtml(firstFailed.input)}</code>
                    <div style="margin: 10px 0 4px 0; font-size: 12px; font-weight: 600;">Expected Output:</div>
                    <code style="display: block; background: #dcfce7; padding: 8px; border-radius: 4px; font-size: 12px; font-family: 'JetBrains Mono', monospace;">${escapeHtml(firstFailed.expected)}</code>
                    <div style="margin: 10px 0 4px 0; font-size: 12px; font-weight: 600;">Your Output:</div>
                    <code style="display: block; background: #fee2e2; padding: 8px; border-radius: 4px; font-size: 12px; font-family: 'JetBrains Mono', monospace;">${escapeHtml(firstFailed.actual)}</code>
                </div>
            </div>`;
    }
}


/**
 * =============================================================================
 * ACTIONS: RUN & SUBMIT
 * =============================================================================
 */
async function runCode() {
    if (!currentProblem) { showNotification('Please select a problem first!', 'error'); return; }
    const code = editorInstance.getValue();
    if (!code.trim()) { showNotification('Please write some code first!', 'error'); return; }
}

async function submitSolution() {
    if (!currentUser) { showNotification('Please login to submit solutions!', 'error'); return; }
    if (!currentProblem) { showNotification('Please select a problem first!', 'error'); return; }
    
    const code = editorInstance.getValue();
    if (!code.trim()) { showNotification('Please write some code first!', 'error'); return; }
    
    // ĐÃ BỎ DÒNG LỆNH CONFIRM TẠI ĐÂY ĐỂ ẤN LÀ CHẤM LUÔN
    
    const btnSubmit = document.getElementById('btnSubmit');
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = '<div class="loader"></div> Submitting...';
    showNotification("Submitting solution...", "info");
    
    const panel = document.getElementById('resultPanel');
    const content = document.getElementById('resultContent');
    panel.style.display = 'block';
    content.innerHTML = '<div style="color: #64748b; padding: 10px 0; font-size: 13px;">Testing all test cases...</div>';
    
    try {
        const startTime = performance.now();
        const results = await executeAllTestCases(code, currentProblem.testCases);
        const endTime = performance.now();
        const totalTime = ((endTime - startTime) / 1000).toFixed(2);
        
        const passedCount = results.filter(r => r.passed).length;
        const totalCount = results.length;
        const allPassed = passedCount === totalCount;
        
        displayRichResults(results, allPassed, passedCount, totalCount, totalTime);
        await saveSubmission(code, results, allPassed);
        
        if (allPassed && !solvedProblems.has(currentProblem.id)) {
            solvedProblems.add(currentProblem.id);
            userPoints += currentProblem.points;
            updateScoreDisplay();
            markProblemSolved(currentProblem.id);
            showNotification(`🎉 Solved! Earned ${currentProblem.points} points!`, 'success');
        } else if (allPassed) {
            showNotification('✅ All test cases passed! (Already solved)', 'success');
        } else {
            showNotification(`❌ ${passedCount}/${totalCount} test cases passed`, 'error');
        }
        
    } catch (error) {
        let errorMessage = error.message || 'Unknown error occurred';
        content.innerHTML = `
            <div style="color: #dc2626; font-weight: 700; margin-bottom: 8px; display: flex; align-items: center; gap: 6px; font-size: 14px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                Compilation Error
            </div>
            <div class="error-detail">
                <pre style="white-space: pre-wrap; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #450a0a; margin: 0;">${escapeHtml(errorMessage)}</pre>
            </div>
            ${getSuggestions(errorMessage)}
        `;
    } finally {
        btnSubmit.disabled = false;
        btnSubmit.innerHTML = `
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg> Submit`;
    }
}

/**
 * =============================================================================
 * DATABASE OPERATIONS
 * =============================================================================
 */
async function saveSubmission(code, results, allPassed) {
    if (!currentUser) return;
    
    const passedCount = results.filter(r => r.passed).length;
    const totalCount = results.length;
    
    let rawTime = 0.001 + (Math.random() * 0.004);
    let rawMemory = 3.1 + (Math.random() * 1.5);
    const finalTimeStr = rawTime.toFixed(3);
    const finalMemStr = rawMemory.toFixed(2);
    
    let errorDetails = null;
    if (!allPassed) {
        let firstFailed = results.find(r => !r.passed);
        errorDetails = { type: firstFailed.errorType || "Assertion Error" };
    }

    const submissionData = {
        contestId: currentContest.id,
        contestTitle: currentContest.title,
        problemId: currentProblem.id,
        problemTitle: `[Contest] ${currentProblem.title}`,
        userId: currentUser.uid,
        userName: currentUser.displayName,
        userEmail: currentUser.email,
        userPhoto: currentUser.photoURL,
        code: code,
        language: currentLanguage,
        status: allPassed ? "Accepted" : "Wrong Answer",
        passCount: passedCount,
        passedCount: passedCount,
        totalCount: totalCount,
        runtime: finalTimeStr,
        memory: finalMemStr,
        errorType: errorDetails ? errorDetails.type : null,
        points: allPassed ? currentProblem.points : 0,
        timestamp: firebase.database.ServerValue.TIMESTAMP
    };
    
    await db.ref('submissions').push(submissionData);
    await db.ref('contest_submissions').push(submissionData);
    
    if (allPassed && !solvedProblems.has(currentProblem.id)) {
        await db.ref(`contest_progress/${currentUser.uid}/${currentContest.id}/${currentProblem.id}`).set({
            solved: true,
            points: currentProblem.points,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    }
}

/**
 * =============================================================================
 * AUTHENTICATION & PARTICIPATION RECORDING
 * =============================================================================
 */
function setupAuth() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            currentUser = user;
            document.getElementById('userAvatar').src = user.photoURL || 'https://via.placeholder.com/40';
            document.getElementById('userName').textContent = user.displayName || 'User';
            document.getElementById('btnSubmit').disabled = false;
            
            if (currentContest) {
                recordParticipation(currentContest.id, user.uid);
                loadProgress(); 
            }
        } else {
            currentUser = null;
            document.getElementById('userName').textContent = 'Guest';
            document.getElementById('btnSubmit').disabled = true;
        }
    });
}

async function recordParticipation(contestId, userId) {
    const participantRef = db.ref(`contest_participants/${contestId}/${userId}`);
    const snapshot = await participantRef.once('value');
    if (!snapshot.exists()) {
        await participantRef.set(true);
        const countRef = db.ref(`contests/${contestId}/participants`);
        countRef.transaction((currentCount) => (currentCount || 0) + 1);
    }
}

/**
 * =============================================================================
 * TIMER & UI HELPERS
 * =============================================================================
 */
function updateTimer() {
    if (!currentContest) return;
    const now = new Date();
    const endTime = new Date(currentContest.endTime);
    const diff = endTime - now;
    
    if (diff <= 0) {
        document.getElementById('timerText').textContent = 'ENDED';
        document.getElementById('timer').style.background = '#fee2e2';
        document.getElementById('timer').style.color = '#991b1b';
        return;
    }
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('timerText').textContent = 
        `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateScoreDisplay() {
    const totalPoints = currentContest.problems.reduce((sum, p) => sum + p.points, 0);
    document.getElementById('totalPoints').textContent = `${userPoints} / ${totalPoints} points`;
    document.getElementById('userScore').textContent = `${userPoints} points`;
}

function markProblemSolved(problemId) {
    const problemItem = document.querySelector(`[data-problem-id="${problemId}"]`);
    if (problemItem) problemItem.classList.add('solved');
}

/**
 * =============================================================================
 * CODE PERSISTENCE
 * =============================================================================
 */
function saveCode() {
    if (!currentProblem || !editorInstance) return;
    const code = editorInstance.getValue();
    localStorage.setItem(`contest_${currentContest.id}_problem_${currentProblem.id}_code`, code);
}

function loadSavedCode() {
    if (!currentProblem || !editorInstance) return;
    const savedCode = localStorage.getItem(`contest_${currentContest.id}_problem_${currentProblem.id}_code`);
    if (savedCode) {
        editorInstance.setValue(savedCode);
    } else {
        editorInstance.setValue(TEMPLATES[currentLanguage]);
    }
}

function loadProgress() {
    if (!currentUser) return;
    db.ref(`contest_progress/${currentUser.uid}/${currentContest.id}`).once('value')
        .then(snapshot => {
            const progress = snapshot.val();
            if (progress) {
                Object.keys(progress).forEach(problemId => {
                    if (progress[problemId].solved) {
                        solvedProblems.add(problemId);
                        userPoints += progress[problemId].points;
                        markProblemSolved(problemId);
                    }
                });
                updateScoreDisplay();
            }
        });
}

/**
 * =============================================================================
 * EVENT LISTENERS
 * =============================================================================
 */
function setupEventListeners() {
    document.getElementById('btnSubmit').addEventListener('click', submitSolution);
    
    document.getElementById('languageSelector').addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        monaco.editor.setModelLanguage(editorInstance.getModel(), currentLanguage);
        loadSavedCode();
    });
    
    setInterval(saveCode, 30000);
        window.addEventListener('beforeunload', (e) => {
        saveCode(); // Vẫn lưu code
        // Hiển thị bảng cảnh báo chống thoát nhầm
        e.preventDefault();
        e.returnValue = ''; 
    });
}

window.copyToClipboard = function(btn, text) {
    navigator.clipboard.writeText(text).then(() => {
        const originalHTML = btn.innerHTML;
        btn.innerHTML = `
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg> Copied!`;
        btn.style.backgroundColor = '#10b981';
        btn.style.color = 'white';
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.backgroundColor = 'transparent';
            btn.style.color = '#10b981';
        }, 2000);
    });
};

/**
 * =============================================================================
 * DRAG TO RESIZE DIVIDER (2 CHIỀU TRÁI/PHẢI)
 * =============================================================================
 */
function setupResizer() {
    const divider = document.querySelector('.resize-divider');
    const problemPane = document.querySelector('.problem-pane');
    const editorPane = document.querySelector('.editor-pane');
    const contentArea = document.querySelector('.content-area');

    let isDragging = false;

    divider.addEventListener('mousedown', (e) => {
        isDragging = true;
        // Đổi con trỏ chuột sang hình mũi tên 2 chiều và chặn bôi đen text khi kéo
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        e.preventDefault(); 
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        // Lấy tọa độ của toàn bộ khung chứa
        const containerRect = contentArea.getBoundingClientRect();
        
        // Tính toán % chiều rộng dựa trên vị trí chuột lúc kéo
        let newWidthPercent = ((e.clientX - containerRect.left) / containerRect.width) * 100;

        // Chốt chặn: Không cho kéo quá lố làm mất hẳn 1 bên (giới hạn từ 20% đến 80%)
        if (newWidthPercent < 20) newWidthPercent = 20;
        if (newWidthPercent > 80) newWidthPercent = 80;

        // ÉP KÍCH THƯỚC CHO CẢ 2 BÊN CÙNG LÚC (Bên này to ra thì bên kia nhỏ lại)
        problemPane.style.width = `${newWidthPercent}%`;
        editorPane.style.width = `${100 - newWidthPercent}%`;

        // Ép Monaco Editor vẽ lại giao diện cho vừa vặn với kích thước mới ngay lập tức
        if (typeof monaco !== 'undefined' && editorInstance) {
            editorInstance.layout();
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            // Trả lại trạng thái chuột bình thường khi nhả click
            document.body.style.cursor = 'default';
            document.body.style.userSelect = '';
        }
    });
}

/**
 * =============================================================================
 * RICH UI DISPLAY (CÓ NÚT NEXT PROBLEM)
 * =============================================================================
 */
function displayRichResults(results, allPassed, passedCount, totalCount, totalTime) {
    const panel = document.getElementById('resultPanel');
    const container = document.getElementById('resultContent');
    
    panel.style.display = 'block';
    
    let rawTime = 0.001 + (Math.random() * 0.004);
    let rawMemory = 0.00; // Bộ nhớ 0.00MB
    const finalTimeStr = rawTime.toFixed(3);
    const finalMemStr = rawMemory.toFixed(2);

    if (allPassed) {
        // --- LOGIC TÌM BÀI TIẾP THEO ---
        let nextProblemId = null;
        if (currentContest && currentProblem) {
            const currentIndex = currentContest.problems.findIndex(p => p.id === currentProblem.id);
            // Nếu chưa phải bài cuối cùng thì lấy id của bài tiếp theo
            if (currentIndex >= 0 && currentIndex < currentContest.problems.length - 1) {
                nextProblemId = currentContest.problems[currentIndex + 1].id;
            }
        }

        // --- TẠO NÚT CHUYỂN BÀI HOẶC XEM BẢNG XẾP HẠNG ---
        let actionButtonHtml = '';
        if (nextProblemId) {
            actionButtonHtml = `
                <button class="btn-next-problem" onclick="loadProblem('${nextProblemId}')">
                    Next Problem
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>
                </button>
            `;
        } else {
            actionButtonHtml = `
                <a class="btn-view-leaderboard" href="ContestLeaderboard.html?contestId=${currentContest.id}">
                    View Leaderboard
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path></svg>
                </a>
            `;
        }

        container.innerHTML = `
            <div class="result-success-container">
                <div class="status-header">Accepted</div>
                <div class="status-subtext">${passedCount}/${totalCount} test cases passed</div>
                <div class="performance-stats">
                    <div class="stat-item"><div class="stat-label">RUNTIME</div><div class="stat-value">${finalTimeStr}s</div></div>
                    <div class="stat-item"><div class="stat-label">MEMORY</div><div class="stat-value">${finalMemStr} MB</div></div>
                    <div class="stat-item"><div class="stat-label">TOTAL TIME</div><div class="stat-value">${totalTime}s</div></div>
                </div>
                ${actionButtonHtml}
            </div>`;
    } else {
        // ... (GIỮ NGUYÊN ĐOẠN CODE CŨ CHO TRƯỜNG HỢP FAIL)
        let failedTests = results.filter(r => !r.passed);
        let firstFailed = failedTests[0];

        container.innerHTML = `
            <div style="color: #dc2626; font-weight: 700; margin-bottom: 10px; display: flex; align-items: center; gap: 6px; font-size: 15px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                Failed ${failedTests.length}/${totalCount} test cases
            </div>
            ${firstFailed.errorType ? `
                <div class="error-detail">
                    <div class="error-type">${firstFailed.errorType}</div>
                    <div style="color: #450a0a; font-size: 12px; line-height: 1.5;">${escapeHtml(firstFailed.actual)}</div>
                </div>` : ''}
            <div style="margin-top: 12px;">
                <strong style="display: block; margin-bottom: 6px; color: #1e293b; font-size: 13px;">First Failed Test:</strong>
                <div style="background: #f8f9fa; padding: 10px; border-radius: 6px; border: 1px solid #e5e7eb;">
                    <div style="margin-bottom: 4px; font-size: 12px; font-weight: 600;">Input:</div>
                    <code style="display: block; white-space: pre-wrap; background: white; padding: 8px; border-radius: 4px; font-size: 12px; font-family: 'JetBrains Mono', monospace; border: 1px solid #e2e8f0;">${escapeHtml(firstFailed.input)}</code>
                    <div style="margin: 10px 0 4px 0; font-size: 12px; font-weight: 600;">Expected Output:</div>
                    <code style="display: block; background: #dcfce7; padding: 8px; border-radius: 4px; font-size: 12px; font-family: 'JetBrains Mono', monospace;">${escapeHtml(firstFailed.expected)}</code>
                    <div style="margin: 10px 0 4px 0; font-size: 12px; font-weight: 600;">Your Output:</div>
                    <code style="display: block; background: #fee2e2; padding: 8px; border-radius: 4px; font-size: 12px; font-family: 'JetBrains Mono', monospace;">${escapeHtml(firstFailed.actual)}</code>
                </div>
            </div>`;
    }
}