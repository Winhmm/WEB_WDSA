/**
 * Resources.js
 * Quản lý Logic hiển thị, điều hướng và xử lý bài tập cho trang Resources.
 * Dữ liệu bài tập (CHAPTERS) được load từ file Data.js.
 */

// ==========================================================================
// 1. CONSTANTS & STATE
// ==========================================================================
const PISTON_API_URL = 'https://emkc.org/api/v2/piston/execute';

let selectedChapterId = null;       // ID chương đang chọn
let selectedProblem = null;         // Object bài tập đang xem (nếu dùng chế độ xem chi tiết)
let currentChapterProblems = [];    // Danh sách bài tập của chương hiện tại (cache)
let userCode = '';                  // Code hiện tại của người dùng

// ==========================================================================
// 2. INITIALIZATION (Khởi tạo)
// ==========================================================================
document.addEventListener('DOMContentLoaded', init);

function init() {
    renderSidebar();

    // Khôi phục trạng thái chương từ LocalStorage (nếu có)
    const lastChapterId = localStorage.getItem('wdsa_active_chapter');
    if (lastChapterId) {
        selectChapter(parseInt(lastChapterId));
    }
    
    // Nếu muốn mặc định chọn chương đầu tiên khi không có lịch sử:
    // else if (CHAPTERS.length > 0) {
    //     selectChapter(CHAPTERS[0].id);
    // }
}

// ==========================================================================
// 3. SIDEBAR & CHAPTER LOGIC
// ==========================================================================

/** Render danh sách chương bên trái */
function renderSidebar() {
    const list = document.getElementById('chapterList');
    if (!list) return;

    list.innerHTML = CHAPTERS.map(ch => `
        <li class="res-chapter-item ${ch.id === selectedChapterId ? 'active' : ''}"
            onclick="selectChapter(${ch.id})">
            <div class="res-ch-label">${ch.title}</div>
            <span class="res-ch-count">${ch.problems.length}</span>
        </li>
    `).join('');
}

/** Xử lý khi click chọn một chương */
function selectChapter(id) {
    selectedChapterId = id;
    selectedProblem = null;

    // Lưu trạng thái để reload trang vẫn giữ nguyên
    localStorage.setItem('wdsa_active_chapter', id);

    const chapter = CHAPTERS.find(c => c.id === id);
    if (!chapter) return;

    currentChapterProblems = chapter.problems;

    renderSidebar();
    showProblemList(chapter);
    updateBreadcrumb();
}

/** Reset về màn hình danh sách chương (nút Home) */
function resetToChapterView() {
    selectedChapterId = null;
    selectedProblem = null;
    currentChapterProblems = [];
    userCode = '';

    localStorage.removeItem('wdsa_active_chapter');

    document.getElementById('problemListView').style.display = 'block';
    document.getElementById('problemDetailView').style.display = 'none';
    document.getElementById('currentChapterTitle').textContent = 'Select a Chapter';
    document.getElementById('problemCount').textContent = '';
    document.getElementById('problemGrid').innerHTML = '';

    renderSidebar();
    updateBreadcrumb();
}

// ==========================================================================
// 4. PROBLEM LIST & FILTERING
// ==========================================================================

/** Hiển thị danh sách bài tập của chương đã chọn */
function showProblemList(chapter) {
    document.getElementById('problemListView').style.display = 'block';
    document.getElementById('problemDetailView').style.display = 'none';

    document.getElementById('currentChapterTitle').textContent = chapter.title;
    document.getElementById('problemCount').textContent = `${chapter.problems.length} problems`;

    // Reset thanh tìm kiếm
    const searchInput = document.getElementById('problemSearchInput');
    if (searchInput) searchInput.value = '';

    renderProblemGrid(chapter.problems);
}

/** Render Grid các thẻ bài tập */
function renderProblemGrid(problemsToRender) {
    const grid = document.getElementById('problemGrid');
    if (!grid) return;

    if (!problemsToRender || problemsToRender.length === 0) {
        grid.innerHTML = `
            <div class="res-empty">
                <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p>No problems found.</p>
            </div>`;
        return;
    }

    grid.innerHTML = problemsToRender.map((p) => {
        // Tìm index gốc để openProblem hoạt động đúng
        const originalIndex = currentChapterProblems.indexOf(p);
        
        return `
        <div class="res-problem-card" onclick="openProblem(${originalIndex})">
            <div class="res-pc-top">
                <span class="res-pc-number">#${p.customId || p.lcNumber}</span>
                <span class="res-diff ${p.difficulty}">${p.difficulty}</span>
            </div>
            <div class="res-pc-title">${p.title}</div>
            <div class="res-pc-tags">
                ${p.tags.map(t => `<span class="res-pc-tag">${t}</span>`).join('')}
            </div>
            <div class="res-pc-footer">
                <span class="res-pc-lc">Source: Internet</span>
                <span class="res-pc-open">View →</span>
            </div>
        </div>`;
    }).join('');
}

/** Lọc bài tập theo từ khóa (gắn vào sự kiện oninput) */
function filterProblems() {
    const query = document.getElementById('problemSearchInput').value.toLowerCase().trim();

    if (!query) {
        renderProblemGrid(currentChapterProblems);
        return;
    }

    const filtered = currentChapterProblems.filter(p => {
        const titleMatch = p.title.toLowerCase().includes(query);
        const idMatch = (p.customId || p.lcNumber).toString().includes(query);
        const tagMatch = p.tags.some(t => t.toLowerCase().includes(query));
        return titleMatch || idMatch || tagMatch;
    });

    renderProblemGrid(filtered);
}

// ==========================================================================
// 5. NAVIGATION & ROUTING
// ==========================================================================

/** Chuyển hướng sang trang Editor.html */
function openProblem(idx) {
    const problem = currentChapterProblems[idx];
    if (!problem) return;

    // Chuyển hướng
    window.location.href = `Editor.html?id=${problem.lcNumber}`;
}

/** Cập nhật Breadcrumb điều hướng */
function updateBreadcrumb() {
    const bcChapter = document.getElementById('bcChapter');
    const bcSepProblem = document.getElementById('bcSepProblem');
    const bcProblem = document.getElementById('bcProblem');

    const chapter = CHAPTERS.find(c => c.id === selectedChapterId);

    if (chapter) {
        bcChapter.textContent = chapter.title;
        bcChapter.onclick = backToProblemList;
    } else {
        bcChapter.textContent = 'Topic';
    }

    if (selectedProblem) {
        bcSepProblem.classList.add('visible');
        bcProblem.classList.add('visible');
        bcProblem.textContent = selectedProblem.title;
    } else {
        bcSepProblem.classList.remove('visible');
        bcProblem.classList.remove('visible');
        bcProblem.textContent = '';
    }
}

function backToProblemList() {
    selectedProblem = null;
    userCode = '';
    const chapter = CHAPTERS.find(c => c.id === selectedChapterId);
    if (chapter) showProblemList(chapter);
    updateBreadcrumb();
}

// ==========================================================================
// 6. IN-PAGE EDITOR LOGIC (Legacy / SPA Mode Support)
// ==========================================================================

function initializeCodeEditor() {
    const editor = document.getElementById('codeEditor');
    if (!editor || !selectedProblem) return;

    if (!userCode || userCode.trim() === '') {
        userCode = selectedProblem.starterCode || '';
    }

    editor.value = userCode;

    editor.addEventListener('input', function() {
        userCode = this.value;
    });
}

function resetCode() {
    if (!selectedProblem) return;

    if (confirm('Are you sure you want to reset your code to the starter template?')) {
        userCode = selectedProblem.starterCode || '';
        document.getElementById('codeEditor').value = userCode;
        closeResults();
        renderTestCases();
    }
}

// ==========================================================================
// 7. CODE EXECUTION ENGINE (Piston API)
// ==========================================================================

/** Xử lý nút Submit */
async function submitCode() {
    if (!selectedProblem) return;

    const code = document.getElementById('codeEditor').value;
    if (!code.trim()) {
        alert('Please write some code first!');
        return;
    }

    const submitBtn = document.querySelector('.res-btn-submit');
    submitBtn.disabled = true;
    
    // Hiệu ứng Loading
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Submitting...`;

    try {
        // Chạy tuần tự các test case
        const results = await executeCode(code, selectedProblem.testCases);
        displayResults(results, true);
        
        // Gửi kết quả lên Firebase (Demo logic)
        const isSuccess = results.every(r => r.passed);
        if (typeof firebase !== 'undefined') {
            firebase.database().ref('submissions').push({
                timestamp: Date.now(),
                problemTitle: selectedProblem.title,
                userName: "Student",
                status: isSuccess ? "Accepted" : "Wrong Answer",
                runtime: (Math.random() * 0.1).toFixed(3),
                code: code
            });
        }
    } catch (error) {
        displayError(error.message);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
}

/** Gửi code lên Server Piston để chạy */
async function executeCode(userCode, testCases) {
    if (!userCode.includes('main')) {
        throw new Error("Code must contain a main() function!");
    }

    const results = [];

    // Chạy vòng lặp tuần tự (Sequential Execution)
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
                    actual: `Server Busy (${response.status})`,
                    description: tc.description
                });
                continue;
            }

            const data = await response.json();

            // 1. Kiểm tra lỗi biên dịch
            if (data.compile && data.compile.code !== 0) {
                throw new Error(data.compile.stderr || "Unknown Compilation Error");
            }

            // 2. Lấy kết quả
            const stdout = data.run.stdout ? data.run.stdout.trim() : "";
            const stderr = data.run.stderr ? data.run.stderr.trim() : "";

            // 3. Chuẩn hóa và so sánh
            const normalizedActual = stdout.replace(/\r\n/g, '\n').trim();
            const normalizedExpected = tc.expectedOutput.replace(/\r\n/g, '\n').trim();
            const isRuntimeError = data.run.code !== 0;

            const passed = !isRuntimeError && (normalizedActual === normalizedExpected);

            results.push({
                passed: passed,
                input: tc.input,
                expected: tc.expectedOutput,
                actual: isRuntimeError ? (stderr || "Runtime Error") : (stdout || "No output"),
                description: tc.description
            });

        } catch (error) {
            if (error.message.includes("Compilation Error")) {
                throw error; // Ném lỗi ra ngoài để displayError bắt
            }
            results.push({
                passed: false,
                input: tc.input,
                expected: tc.expectedOutput,
                actual: "Network Error",
                description: tc.description
            });
        }

        // Delay nhẹ để tránh bị chặn spam
        if (i < testCases.length - 1) {
            await new Promise(r => setTimeout(r, 1)); // 1ms delay (có thể tăng nếu cần)
        }
    }

    return results;
}

// ==========================================================================
// 8. UI FEEDBACK (Test Cases, Results, Errors)
// ==========================================================================

function renderTestCases() {
    if (!selectedProblem || !selectedProblem.testCases) return;

    const testList = document.getElementById('testCaseList');
    const testCount = document.getElementById('testCaseCount');

    if (testCount) {
        testCount.textContent = `${selectedProblem.testCases.length} test cases`;
    }

    if (testList) {
        testList.innerHTML = selectedProblem.testCases.map((tc, idx) => `
            <div class="res-test-case-item" id="testCase${idx}">
                <div class="res-test-case-header" style="margin-bottom: 0;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        <span class="res-test-case-label">Test Case ${idx + 1}</span>
                    </div>
                    <span class="res-test-status" id="testStatus${idx}">
                        <span style="font-size: 12px; color: #999; font-weight: 500;">Ready</span>
                    </span>
                </div>
            </div>
        `).join('');
    }
}

function displayResults(results, isSubmit) {
    const resultsPanel = document.getElementById('resultsPanel');
    const resultsContent = document.getElementById('resultsContent');

    const passedCount = results.filter(r => r.passed).length;
    const totalCount = results.length;
    const allPassed = passedCount === totalCount;

    // Cập nhật trạng thái từng dòng Test Case
    results.forEach((result, idx) => {
        const testItem = document.getElementById(`testCase${idx}`);
        const testStatus = document.getElementById(`testStatus${idx}`);

        if (testItem && testStatus) {
            testItem.classList.remove('passed', 'failed');
            if (result.passed) {
                testItem.classList.add('passed');
                testStatus.innerHTML = `
                    <span style="color:#16a34a; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg> 
                        Passed
                    </span>`;
                testStatus.className = 'res-test-status passed';
            } else {
                testItem.classList.add('failed');
                testStatus.innerHTML = `
                    <span style="color:#dc2626; display:flex; align-items:center; gap:4px;">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M18 6L6 18M6 6l12 12"/></svg> 
                        Failed
                    </span>`;
                testStatus.className = 'res-test-status failed';
            }
        }
    });

    // Hiển thị Summary
    let summaryHTML = '';
    if (allPassed) {
        summaryHTML = `
            <div class="res-result-summary success">
                <h3>All Tests Passed!</h3>
                <p>You passed ${passedCount}/${totalCount} test cases.</p>
            </div>`;
        if (isSubmit) {
            summaryHTML += `
                <div style="text-align: center; padding: 12px; background: #f0fdf4; border-radius: 8px; margin-top: 12px;">
                    <p style="margin: 0; color: #16a34a; font-weight: 600;">
                        Congratulations! Your solution is correct.
                    </p>
                </div>`;
        }
    } else {
        summaryHTML = `
            <div class="res-result-summary error">
                <h3>✗ Wrong Answer</h3>
                <p>You only passed ${passedCount}/${totalCount} test cases.</p>
                <p style="font-size: 13px; margin-top: 5px;">Please check your code logic.</p>
            </div>`;
    }

    if (resultsContent) resultsContent.innerHTML = summaryHTML;
    if (resultsPanel) {
        resultsPanel.style.display = 'block';
        resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function displayError(errorMessage) {
    const resultsPanel = document.getElementById('resultsPanel');
    const resultsContent = document.getElementById('resultsContent');

    resultsContent.innerHTML = `
        <div class="res-result-summary error">
            <h3>✗ Compilation Error</h3>
            <p>Your code failed to compile</p>
        </div>
        <div class="res-compile-error">
            <h4>Error Details:</h4>
            <pre>${escapeHtml(errorMessage)}</pre>
        </div>
    `;

    resultsPanel.style.display = 'block';
    resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function closeResults() {
    document.getElementById('resultsPanel').style.display = 'none';

    if (selectedProblem && selectedProblem.testCases) {
        selectedProblem.testCases.forEach((tc, idx) => {
            const testItem = document.getElementById(`testCase${idx}`);
            const testStatus = document.getElementById(`testStatus${idx}`);
            if (testItem && testStatus) {
                testItem.classList.remove('passed', 'failed');
                testStatus.innerHTML = '<span style="font-size: 12px; color: #999; font-weight: 500;">Ready</span>';
                testStatus.className = 'res-test-status';
            }
        });
    }
}

// ==========================================================================
// 9. UTILITIES
// ==========================================================================

function copySolution() {
    const code = document.getElementById('detailCode').textContent;
    navigator.clipboard.writeText(code).then(() => {
        const btn = document.getElementById('copyBtn');
        btn.classList.add('copied');
        btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg> Copied!`;
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`;
        }, 1800);
    });
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
}