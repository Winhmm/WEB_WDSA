let editorInstance = null;
let currentProblem = null;
let isSubmitting = false;

const DEFAULT_TEMPLATE = `// Write your C++ code here...
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;
const long long LMAXN = 1e18;


int main() {
\tios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    
}`;


document.addEventListener('DOMContentLoaded', () => {
    try {
        if (typeof CHAPTERS === 'undefined' || !Array.isArray(CHAPTERS)) {
            throw new Error('CHAPTERS data not loaded properly');
        }

        const params = new URLSearchParams(window.location.search);
        const lcNumber = params.get('id');

        if (!lcNumber) {
            throw new Error('No problem ID specified');
        }

        CHAPTERS.forEach(chap => {
            const found = chap.problems.find(p => p.lcNumber == lcNumber);
            if (found) currentProblem = found;
        });

        if (!currentProblem) {
            showNotification("Problem not found! Redirecting...", "error");
            setTimeout(() => window.location.href = "Resources.html", 2000);
            return;
        }

        renderProblemUI();
        initMonaco();
        initResizablePanes();
        
        loadSavedCode();
        
        setInterval(saveCodeToStorage, 5000);
    } catch (error) {
        console.error('Initialization error:', error);
        showNotification(`Error loading page: ${error.message}`, "error");
    }
});


function renderProblemUI() {
    const displayNum = currentProblem.customId || currentProblem.lcNumber;
    document.getElementById('pTitle').textContent = `${displayNum}. ${currentProblem.title}`;
    
    const diffEl = document.getElementById('pDiff');
    diffEl.textContent = currentProblem.difficulty;
    diffEl.className = `badge ${currentProblem.difficulty.toLowerCase()}`;
    

    document.getElementById('pDesc').innerHTML = currentProblem.description;
    

    document.getElementById('pExamples').innerHTML = currentProblem.examples.map((ex, i) => `
        <div class="example-box">
            <strong>Example ${i + 1}:</strong><br>
            <div style="margin-top:4px">Input: <code>${escapeHtml(ex.input)}</code></div>
            <div style="margin-top:4px">Output: <code>${escapeHtml(ex.output)}</code></div>
            ${ex.explain ? `<div style="margin-top:4px; color:#64748b;">${escapeHtml(ex.explain)}</div>` : ''}
        </div>
    `).join('');
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}


function initResizablePanes() {
    const divider = document.getElementById('divider');
    const leftPane = document.querySelector('.problem-pane');
    const rightPane = document.querySelector('.editor-pane');
    const workspace = document.querySelector('.main-workspace');
    
    if (!divider || !leftPane || !rightPane || !workspace) {
        console.error('Required DOM elements not found');
        return;
    }
    
    let isResizing = false;
    
    divider.addEventListener('mousedown', startResize);
    

    divider.addEventListener('touchstart', startResize);
    
    function startResize(e) {
        isResizing = true;
        divider.classList.add('active');
        document.body.style.cursor = 'col-resize';
        document.body.style.userSelect = 'none';
        e.preventDefault();
    }
    
    function handleResize(e) {
        if (!isResizing) return;
        
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const workspaceRect = workspace.getBoundingClientRect();
        const offsetX = clientX - workspaceRect.left;
        const percentage = (offsetX / workspaceRect.width) * 100;

        if (percentage >= 25 && percentage <= 75) {
            leftPane.style.width = `${percentage}%`;
            rightPane.style.width = `${100 - percentage}%`;

            if (editorInstance) {
                editorInstance.layout();
            }
        }
    }
    
    function stopResize() {
        if (isResizing) {
            isResizing = false;
            divider.classList.remove('active');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    }
    
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('touchmove', handleResize);
    document.addEventListener('mouseup', stopResize);
    document.addEventListener('touchend', stopResize);
}


function initMonaco() {

    if (typeof require === 'undefined') {
        showNotification("Editor failed to load. Please refresh the page.", "error");
        console.error('Monaco loader not available');
        return;
    }

    require.config({ 
        paths: { 
            'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' 
        }
    });
    
    require(['vs/editor/editor.main'], function() {
        try {
            const container = document.getElementById('monaco-container');
            if (!container) {
                throw new Error('Monaco container not found');
            }

            editorInstance = monaco.editor.create(container, {
                value: currentProblem.starterCode || DEFAULT_TEMPLATE,
                language: 'cpp',
                theme: 'vs',
                fontSize: 15,
                padding: { top: 12, bottom: 12 },
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                minimap: { enabled: window.innerWidth > 768 }, 
                scrollBeyondLastLine: false,
                automaticLayout: true,
                lineNumbers: 'on',
                roundedSelection: true,
                scrollbar: { 
                    vertical: 'visible', 
                    horizontal: 'visible',
                    verticalScrollbarSize: 10,
                    horizontalScrollbarSize: 10
                },
                quickSuggestions: true,
                tabSize: 4,
                bracketPairColorization: { enabled: true },
                formatOnPaste: true,
                formatOnType: true,
                wordWrap: window.innerWidth <= 768 ? 'on' : 'off' 
            });
            
            const savedCode = getSavedCode();
            if (savedCode) {
                editorInstance.setValue(savedCode);
            }

            window.addEventListener('resize', () => {
                if (editorInstance) {
                    editorInstance.layout();
                }
            });

        } catch (error) {
            console.error('Monaco initialization error:', error);
            showNotification("Editor initialization failed", "error");
        }
    }, function(error) {
        console.error('Monaco loading error:', error);
        showNotification("Failed to load code editor", "error");
    });
}

function resetToTemplate() {
    if (!editorInstance) {
        showNotification("Editor not ready", "error");
        return;
    }

    if(confirm("Reset code to starter template? This will delete your current code.")) {
        editorInstance.setValue(currentProblem.starterCode || DEFAULT_TEMPLATE);
        showNotification("Code reset successfully", "info");
        localStorage.removeItem(`code_${currentProblem.lcNumber}`);
    }
}


function saveCodeToStorage() {
    try {
        if (!editorInstance || !currentProblem) return;
        const code = editorInstance.getValue();
        

        if (typeof localStorage === 'undefined') {
            console.warn('LocalStorage not available');
            return;
        }
        
        localStorage.setItem(`code_${currentProblem.lcNumber}`, code);
    } catch (error) {

        if (error.name === 'QuotaExceededError') {
            console.warn('LocalStorage quota exceeded');
        } else {
            console.error('Save error:', error);
        }
    }
}

function getSavedCode() {
    try {
        if (!currentProblem || typeof localStorage === 'undefined') return null;
        return localStorage.getItem(`code_${currentProblem.lcNumber}`);
    } catch (error) {
        console.error('Load error:', error);
        return null;
    }
}

function loadSavedCode() {

}


async function submitSolution() {
    const nameEl = document.getElementById('userNameInput');
    const userName = nameEl ? nameEl.value.trim() : "Anonymous";
    if (!userName) {
        showNotification("Please enter your name before submitting!", "error");
        nameInput.focus();
        return; // Dừng lại nếu chưa nhập tên
    }
    
    // Lưu tên vào máy để lần sau không phải nhập lại
    localStorage.setItem('wdsa_user_name', userName);
    // ----------------------------------
    if (isSubmitting) {
        showNotification("Please wait, submission in progress...", "info");
        return;
    }

    if (!editorInstance) {
        showNotification("Editor not ready", "error");
        return;
    }
    
    const code = editorInstance.getValue();
    if(!code.trim()) {
        showNotification("Please write some code first!", "error");
        return;
    }

    if (!code.includes('main')) {
        showNotification("Your code must contain a main() function!", "error");
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
        const startTime = performance.now();
        const results = await executeCodeParallel(code, currentProblem.testCases);
        const endTime = performance.now();
        const totalTime = ((endTime - startTime) / 1000).toFixed(2);
        
        const passedCount = results.filter(r => r.passed).length;
        const totalCount = results.length;
        const allPassed = passedCount === totalCount;

        const validResults = results.filter(r => r.executionTime !== null);
        const avgTime = validResults.length > 0 
            ? (validResults.reduce((sum, r) => sum + r.executionTime, 0) / validResults.length / 1000).toFixed(3)
            : '0.000';
        
        const avgMemory = validResults.length > 0
            ? (validResults.reduce((sum, r) => sum + (r.memory || 0), 0) / validResults.length).toFixed(2)
            : '0.00';

        const stats = {
            passedCount: passedCount,
            totalCount: totalCount,
            avgTime: avgTime,
            avgMemory: avgMemory
        };
        
        let errorDetails = null;
        if (!allPassed) {
             let firstFailed = results.find(r => !r.passed);
             errorDetails = { type: firstFailed.errorType || "Assertion Error" };
        }

        
        saveSubmissionToDB(currentProblem.lcNumber, code, allPassed, stats, errorDetails);

        if (allPassed) {
            contentDiv.innerHTML = `
                <div class="result-success-container">
                    <div class="status-header">
                        Accepted
                    </div>
                    <div class="status-subtext">${passedCount}/${totalCount} test cases passed</div>
                    
                    <div class="performance-stats">
                        <div class="stat-item">
                            <div class="stat-label">Runtime</div>
                            <div class="stat-value">${avgTime}s</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Memory</div>
                            <div class="stat-value">${avgMemory} MB</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-label">Total Time</div>
                            <div class="stat-value">${totalTime}s</div>
                        </div>
                    </div>
                </div>
            `;
            
            showNotification("All test cases passed!", "success");
        } else {
            let failedTests = results.filter(r => !r.passed);
            let firstFailed = failedTests[0];
            
            contentDiv.innerHTML = `
                <div style="color: #dc2626; font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    Failed ${failedTests.length}/${totalCount} test cases
                </div>
                
                ${firstFailed.errorType ? `
                    <div class="error-detail">
                        <div class="error-type">${firstFailed.errorType}</div>
                        <div style="color: #450a0a; font-size: 13px; line-height: 1.5;">
                            ${escapeHtml(firstFailed.actual)}
                        </div>
                    </div>
                ` : ''}
                
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
                
                ${failedTests.length > 1 ? `
                    <div style="margin-top: 12px; padding: 10px; background: #fef3c7; border-radius: 6px; border: 1px solid #fcd34d;">
                        <strong style="color: #92400e;">Note:</strong> ${failedTests.length - 1} more test case(s) failed.
                    </div>
                ` : ''}
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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
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
    const savedName = localStorage.getItem('wdsa_user_name');
    const nameInput = document.getElementById('userNameInput');
    if (savedName && nameInput) {
        nameInput.value = savedName;
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
        suggestions.push('Add the required #include directive (e.g., #include <vector>, #include <string>)');
        suggestions.push('Check spelling of type names');
    }
    
    if (msg.includes("invalid use of") || msg.includes("cannot convert")) {
        suggestions.push('Check data type compatibility');
        suggestions.push('Make sure you\'re using the correct operators for the data types');
    }
    
    if (msg.includes("Segmentation fault") || msg.includes("SIGSEGV")) {
        suggestions.push('Check array bounds - you may be accessing an index out of range');
        suggestions.push('Verify pointer operations and null pointer dereferences');
        suggestions.push('Ensure you\'re not accessing freed or uninitialized memory');
    }
    
    if (msg.includes('error:') && suggestions.length === 0) {
        suggestions.push('Read the error message carefully - it usually points to the exact line');
        suggestions.push('Check syntax around the line number mentioned in the error');
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

const PISTON_API_URL = 'https://emkc.org/api/v2/piston/execute';
const MAX_CONCURRENT = 2; 
const BATCH_DELAY = 800; 

async function executeCodeParallel(userCode, testCases) {
    if (!userCode.includes('main')) {
        throw new Error("Code must contain a main() function!");
    }

    const results = [];
    
    for (let i = 0; i < testCases.length; i += MAX_CONCURRENT) {
        const batch = testCases.slice(i, i + MAX_CONCURRENT);
        const batchPromises = batch.map((tc, idx) => executeTestCase(userCode, tc, i + idx));
        const batchResults = await Promise.all(batchPromises);
        results.push(...batchResults);
        
        if (i + MAX_CONCURRENT < testCases.length) {
            await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
        }
    }

    return results;
}

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

        // Handle Rate Limit (429)
        if (response.status === 429) {
            if (retryCount < MAX_RETRIES) {
                const backoffDelay = RETRY_DELAY * Math.pow(2, retryCount);
                console.log(`Rate limited. Retrying test ${index + 1} in ${backoffDelay}ms...`);
                await new Promise(resolve => setTimeout(resolve, backoffDelay));
                return executeTestCase(userCode, testCase, index, retryCount + 1);
            } else {
                return {
                    passed: false,
                    input: testCase.input,
                    expected: testCase.expectedOutput,
                    actual: `Rate Limit Exceeded - Please try again`,
                    executionTime: null,
                    memory: null,
                    errorType: 'Rate Limit'
                };
            }
        }

        if (!response.ok) throw new Error(`Server Error (${response.status})`);

        const data = await response.json();

        // Check Compilation Error
        if (data.compile && data.compile.code !== 0) {
            throw new Error(data.compile.stderr || data.compile.output || "Unknown Compilation Error");
        }

        let memoryUsageMB = 0;
        
        // 1. Ưu tiên lấy từ API (nếu có)
        // Piston v2 trả về 'memory' (bytes) trong object 'run' nếu runtime hỗ trợ
        if (data.run && typeof data.run.memory === 'number' && data.run.memory > 0) {
            memoryUsageMB = data.run.memory / 1024 / 1024;
        } 
        // 2. Nếu không, dùng ước lượng thực tế (Heuristic)
        else {
            // Chương trình C++ tối thiểu thường chiếm ~3.2MB RAM (Shared Libs, Stack...)
            // Cộng thêm kích thước code của người dùng
            const baseMemory = 3.24; 
            const codeOverhead = userCode.length / (1024 * 1024); // Đổi code length ra MB
            memoryUsageMB = baseMemory + codeOverhead;
        }
        
        const finalMemory = parseFloat(memoryUsageMB.toFixed(2));
        // ---------------------------------------------------

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

        const passed = !isRuntimeError && (normalizedActual === normalizedExpected);

        return {
            passed: passed,
            input: testCase.input,
            expected: testCase.expectedOutput,
            actual: actualOutput,
            executionTime: executionTime,
            memory: finalMemory, // Sử dụng giá trị memory đã nâng cấp
            errorType: errorType
        };

    } catch (error) {
        if (error.message.includes("error:") || error.message.includes("syntax")) {
            throw error;
        }
        
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


function showNotification(message, type = 'info') {
    // Remove existing notification
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
    }, 4000); // Increased from 3000 to 4000ms
}


window.addEventListener('beforeunload', () => {
    saveCodeToStorage();
    
    if (editorInstance) {
        editorInstance.dispose();
    }
});

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


function saveSubmissionToDB(problemId, code, isPassed, stats, errorDetails) {
    try {
        // Lấy tên người dùng hiện tại từ Input
        const userName = document.getElementById('userNameInput').value.trim() || "Anonymous";

        let userId = localStorage.getItem('wdsa_user_id');
        if (!userId) {
            userId = 'user_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('wdsa_user_id', userId);
        }

        const submissionData = {
            problemId: problemId,
            problemTitle: currentProblem ? currentProblem.title : "Unknown",
            userId: userId,
            userName: userName, 
            code: code,
            status: isPassed ? "Accepted" : "Wrong Answer",
            passCount: stats.passedCount,
            totalCount: stats.totalCount,
            runtime: stats.avgTime,
            memory: stats.avgMemory,
            timestamp: firebase.database.ServerValue.TIMESTAMP, 
            errorType: errorDetails ? errorDetails.type : null
        };

        // Ghi vào Firebase
        db.ref('submissions').push(submissionData);
        
    } catch (error) {
        console.error("Error saving to DB:", error);
    }
}