let editorInstance = null;
let currentProblem = null;
let isSubmitting = false; // Fix bug 3: Prevent spam submission

// Default template constant
const DEFAULT_TEMPLATE = `// Write your C++ code here...
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;
const int LMAXN = 1e18;


int main() {
\tios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    
}`;

// ==========================================
// 1. INIT
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const lcNumber = params.get('id');

    if (lcNumber) {
        CHAPTERS.forEach(chap => {
            const found = chap.problems.find(p => p.lcNumber == lcNumber);
            if (found) currentProblem = found;
        });
    }

    if (!currentProblem) {
        showNotification("Problem not found! Redirecting...", "error");
        setTimeout(() => window.location.href = "Resources.html", 2000);
        return;
    }

    renderProblemUI();
    initMonaco();
    
    // Load saved code from localStorage
    loadSavedCode();
    
    // Auto-save code every 3 seconds
    setInterval(saveCodeToStorage, 3000);
});

// ==========================================
// 2. RENDER UI
// ==========================================
function renderProblemUI() {
    // Nếu có customId thì dùng, không thì mới dùng lcNumber
    const displayNum = currentProblem.customId || currentProblem.lcNumber;
    document.getElementById('pTitle').textContent = `${displayNum}. ${currentProblem.title}`;
    
    const diffEl = document.getElementById('pDiff');
    diffEl.textContent = currentProblem.difficulty;
    diffEl.className = `badge ${currentProblem.difficulty.toLowerCase()}`;
    
    document.getElementById('pDesc').innerHTML = currentProblem.description;
    
    // Fix bug 2: Escape HTML in examples
    document.getElementById('pExamples').innerHTML = currentProblem.examples.map((ex, i) => `
        <div class="example-box">
            <strong>Example ${i + 1}:</strong><br>
            <div style="margin-top:4px">Input: <code>${escapeHtml(ex.input)}</code></div>
            <div style="margin-top:4px">Output: <code>${escapeHtml(ex.output)}</code></div>
        </div>
    `).join('');
}

function escapeHtml(text) {
    if (!text) return text;
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================================
// 3. MONACO SETUP
// ==========================================
function initMonaco() {
    require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }});
    
    require(['vs/editor/editor.main'], function() {
        editorInstance = monaco.editor.create(document.getElementById('monaco-container'), {
            value: currentProblem.starterCode || DEFAULT_TEMPLATE,
            language: 'cpp',
            theme: 'vs-dark',
            fontSize: 15,
            padding: { top: 12, bottom: 12 },
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            lineNumbers: 'on',
            roundedSelection: true,
            scrollbar: { vertical: 'visible', horizontal: 'visible' },
            quickSuggestions: true,
            tabSize: 4,
            bracketPairColorization: { enabled: true }
        });
        
        // Load saved code after editor is ready
        const savedCode = getSavedCode();
        if (savedCode) {
            editorInstance.setValue(savedCode);
        }
    });
}

// Fix bug 1: Reset button with proper fallback
function resetToTemplate() {
    if(confirm("Reset code to starter template?")) {
        editorInstance.setValue(currentProblem.starterCode || DEFAULT_TEMPLATE);
        showNotification("Code reset successfully", "info");
        // Clear saved code
        localStorage.removeItem(`code_${currentProblem.lcNumber}`);
    }
}

// ==========================================
// 4. LOCALSTORAGE - AUTO SAVE
// ==========================================
function saveCodeToStorage() {
    if (!editorInstance || !currentProblem) return;
    const code = editorInstance.getValue();
    localStorage.setItem(`code_${currentProblem.lcNumber}`, code);
}

function getSavedCode() {
    if (!currentProblem) return null;
    return localStorage.getItem(`code_${currentProblem.lcNumber}`);
}

function loadSavedCode() {
    // This will be called after Monaco is initialized
}

// ==========================================
// 5. SUBMIT LOGIC (API THẬT)
// ==========================================
async function submitSolution() {
    // Fix bug 3: Prevent spam submission
    if (isSubmitting) {
        showNotification("Please wait, submission in progress...", "info");
        return;
    }
    
    const code = editorInstance.getValue();
    if(!code.trim()) {
        showNotification("Please write some code first!", "error");
        return;
    }

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
        const results = await executeCode(code, currentProblem.testCases);
        
        const passedCount = results.filter(r => r.passed).length;
        const totalCount = results.length;
        const allPassed = passedCount === totalCount;

        resultDiv.style.display = 'block';
        
        if(allPassed) {
            showNotification("Accepted!", "success");
            contentDiv.innerHTML = `
                <div style="font-family: 'Space Grotesk', sans-serif; color:#16a34a; font-weight:700; font-size: 18px; margin-bottom: 8px; letter-spacing: -0.5px;">
                    All ${totalCount} test cases passed!
                </div>
                <div style="font-family: 'Inter', sans-serif; color: #555;">Great job! Your solution is correct.</div>
            `;
        } else {
            showNotification("Wrong Answer", "error");
            
            // Show all failed test cases, not just the first one
            const failedTests = results.filter(r => !r.passed);
            const failedHTML = failedTests.slice(0, 3).map((fail, idx) => `
                <div style="background: #fef2f2; border: 1px solid #fee2e2; padding: 10px; border-radius: 6px; margin-top: 8px;">
                    <strong>Failed Test Case ${results.indexOf(fail) + 1}:</strong><br>
                    <span style="color: #666;">Input:</span> <code>${escapeHtml(String(fail.input))}</code><br>
                    <span style="color: #666;">Expected:</span> <code>${escapeHtml(String(fail.expected))}</code><br>
                    <span style="color: #dc2626;">Actual:</span> <code>${escapeHtml(String(fail.actual))}</code>
                </div>
            `).join('');
            
            contentDiv.innerHTML = `
                <div style="color:#dc2626; font-weight:bold; font-size: 16px; margin-bottom: 8px;">
                    ✕ Passed ${passedCount}/${totalCount} test cases
                </div>
                ${failedHTML}
                ${failedTests.length > 3 ? `<div style="color: #666; margin-top: 8px; font-size: 13px;">... and ${failedTests.length - 3} more failed test(s)</div>` : ''}
            `;
        }

    } catch (e) {
        showNotification("Execution Error", "error");
        resultDiv.style.display = 'block';
        contentDiv.innerHTML = `
            <div style="color:#dc2626; font-weight:bold;">Compilation/Runtime Error:</div>
            <pre style="white-space: pre-wrap; background: #eee; padding: 10px; margin-top: 5px; border-radius: 4px;">${escapeHtml(e.message)}</pre>
        `;
    } finally {
        btn.disabled = false;
        isSubmitting = false;
        btn.innerHTML = originalText;
    }
}

// ==========================================
// 6. HELPER: NOTIFICATION TOAST
// ==========================================
function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    let icon = '';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '✕';
    if (type === 'info') icon = 'ℹ';
    
    notification.innerHTML = `<span>${icon}</span> ${escapeHtml(message)}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==========================================
// 7. CORE: EXECUTE CODE (PISTON API)
// ==========================================
const PISTON_API_URL = 'https://emkc.org/api/v2/piston/execute';

async function executeCode(userCode, testCases) {
    if (!userCode.includes('main')) {
        throw new Error("Code must contain a main() function!");
    }

    const results = [];

    for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        
        try {
            const payload = {
                language: "cpp",
                version: "10.2.0",
                files: [{ name: "main.cpp", content: userCode }],
                stdin: tc.input,
                run_timeout: 3000,
                compile_timeout: 10000
            };

            const response = await fetch(PISTON_API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                results.push({
                    passed: false,
                    input: tc.input,
                    expected: tc.expectedOutput,
                    actual: `Server Busy (${response.status})`
                });
                continue;
            }

            const data = await response.json();

            if (data.compile && data.compile.code !== 0) {
                throw new Error(data.compile.stderr || "Unknown Compilation Error");
            }

            const stdout = data.run.stdout ? data.run.stdout.trim() : "";
            const stderr = data.run.stderr ? data.run.stderr.trim() : "";
            
            const normalizedActual = stdout.replace(/\r\n/g, '\n').trim();
            const normalizedExpected = tc.expectedOutput.replace(/\r\n/g, '\n').trim();
            const isRuntimeError = data.run.code !== 0;

            const passed = !isRuntimeError && (normalizedActual === normalizedExpected);

            results.push({
                passed: passed,
                input: tc.input,
                expected: tc.expectedOutput,
                actual: isRuntimeError ? (stderr || "Runtime Error") : (stdout || "No output")
            });

        } catch (error) {
            if (error.message.includes("Compilation Error")) {
                throw error;
            }
            results.push({
                passed: false,
                input: tc.input,
                expected: tc.expectedOutput,
                actual: "Network/System Error"
            });
        }

        // Rate limiting delay
        if (i < testCases.length - 1) {
            await new Promise(r => setTimeout(r, 200));
        }
    }

    return results;
}

// ==========================================
// 8. CLEANUP ON PAGE UNLOAD
// ==========================================
window.addEventListener('beforeunload', () => {
    // Save code one last time
    saveCodeToStorage();
    
    // Dispose Monaco editor to prevent memory leaks
    if (editorInstance) {
        editorInstance.dispose();
    }
});

// Add CSS animation for spinning icon
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);