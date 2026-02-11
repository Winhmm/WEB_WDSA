// ================================================
// Resources.js — Data + UI logic cho Resources page
// ================================================

// ============================================
// 1. DATA — chương & bài tập
//    Thêm chương mới: push vào array CHAPTERS
//    Thêm bài tập mới: push vào array problems của chương đó
// ============================================

// const CHAPTERS = [
//     {
//         id: 1,
//         title: "Sorting & Searching",
//         problems: [
//             {
//                 lcNumber: 704,
//                 customId: 1,
//                 title: "Binary Search",
//                 difficulty: "easy",
//                 tags: ["Array", "Binary Search"],
//                 lcUrl: "https://leetcode.com/problems/binary-search/",
//                 description: `Write a C++ program to search for a <strong>target</strong> value in an ascending sorted array.<br><br>
//                 <strong>Input:</strong> The first line contains an integer n (number of elements). The second line contains n integers (the sorted array). The third line contains the target value.<br><br>
//                 <strong>Output:</strong> Print the index of the target in the array (0-indexed). If not found, print -1.<br><br>
//                 <strong>Requirement:</strong> The algorithm must have a time complexity of <strong>O(log n)</strong> (using Binary Search).`,
//                 examples: [
//                     { 
//                         input: "n = 6, arr[] = {-1, 0, 3, 5, 9, 12}, target = 9", 
//                         output: "4", 
//                         explain: "Explanation: The number 9 exists at index 4 in the array." 
//                     },
//                     { 
//                         input: "n = 6, arr[] = {-1, 0, 3, 5, 9, 12}, target = 2", 
//                         output: "-1", 
//                         explain: "Explanation: The number 2 does not exist in the array, so return -1." 
//                     }
//                 ],

//                 timeComplexity: "O(log n)",
//                 spaceComplexity: "O(1)",

//                 // Test cases for code execution
//                 testCases: [
//                     {
//                         input: "6\n-1 0 3 5 9 12\n9",
//                         expectedOutput: "4",
//                         description: "Test case 1"
//                     },
//                     {
//                         input: "6\n-1 0 3 5 9 12\n2",
//                         expectedOutput: "-1",
//                         description: "Test case 2"
//                     },
//                     {
//                         input: "1\n5\n5",
//                         expectedOutput: "0",
//                         description: "Test case 3"
//                     },
//                     {
//                         input: "10\n1 2 3 4 5 6 7 8 9 10\n10",
//                         expectedOutput: "9",
//                         description: "Test case 4"
//                     },
//                     {
//                         input: "5\n2 4 6 8 10\n1",
//                         expectedOutput: "-1",
//                         description: "Test case 5"
//                     }
//                 ],
//             }
//         ]
//     }
// ];

// ============================================
// 2. STATE
// ============================================
let selectedChapterId  = null;  // chương đang chọn
let selectedProblem    = null;  // problem đang xem detail
let currentChapterProblems = []; // cache
let userCode = '';  // User's current code

// ============================================
// 3. RENDER SIDEBAR
// ============================================
function renderSidebar() {
    const list = document.getElementById('chapterList');
    list.innerHTML = CHAPTERS.map(ch => `
        <li class="res-chapter-item ${ch.id === selectedChapterId ? 'active' : ''}"
            onclick="selectChapter(${ch.id})">
            <div class="res-ch-label">${ch.title}</div>
            <span class="res-ch-count">${ch.problems.length}</span>
        </li>
    `).join('');
}

// ============================================
// 4. SELECT CHAPTER → hiện problem list
// ============================================
function selectChapter(id) {
    selectedChapterId = id;
    selectedProblem   = null;

    localStorage.setItem('wdsa_active_chapter', id); 

    const chapter = CHAPTERS.find(c => c.id === id);
    if (!chapter) return;

    currentChapterProblems = chapter.problems;

    renderSidebar();
    showProblemList(chapter);
    updateBreadcrumb();
}

// ============================================
// 5. RENDER PROBLEM LIST
// ============================================
function showProblemList(chapter) {
    // Hide detail, show list
    document.getElementById('problemListView').style.display  = 'block';
    document.getElementById('problemDetailView').style.display = 'none';

    document.getElementById('currentChapterTitle').textContent = chapter.title;
    document.getElementById('problemCount').textContent        = chapter.problems.length + ' problems';

    // Reset thanh tìm kiếm về rỗng khi chuyển chương
    const searchInput = document.getElementById('problemSearchInput');
    if (searchInput) searchInput.value = '';

    // Render toàn bộ bài tập của chương
    renderProblemGrid(chapter.problems);
}

// ============================================
// 6. OPEN PROBLEM DETAIL
// ============================================
// Trong Resources.js

// Sửa hàm openProblem
function openProblem(idx) {
    // Lấy bài tập từ biến CHAPTERS (đã có nhờ Data.js)
    const problem = currentChapterProblems[idx];
    if (!problem) return;
    
    // Chuyển hướng sang trang Editor với ID bài tập
    window.location.href = `Editor.html?id=${problem.lcNumber}`;
}

// ============================================
// 7. INITIALIZE CODE EDITOR
// ============================================
function initializeCodeEditor() {
    const editor = document.getElementById('codeEditor');
    if (!editor || !selectedProblem) return;
    
    // Set starter code if user hasn't written anything yet
    if (!userCode || userCode.trim() === '') {
        userCode = selectedProblem.starterCode || '';
    }
    
    editor.value = userCode;
    
    // Save code on change
    editor.addEventListener('input', function() {
        userCode = this.value;
    });
}

// ============================================
// 8. RENDER TEST CASES (HIDDEN MODE)
// ============================================
function renderTestCases() {
    // Kiểm tra dữ liệu an toàn
    if (!selectedProblem || !selectedProblem.testCases) return;
    
    const testList = document.getElementById('testCaseList');
    const testCount = document.getElementById('testCaseCount');
    
    // Cập nhật số lượng test case
    if (testCount) {
        testCount.textContent = `${selectedProblem.testCases.length} test cases`;
    }
    
    if (testList) {
        // Render danh sách (Chỉ hiện nhãn, ẩn chi tiết Input/Output)
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

// ============================================
// 9. RESET CODE
// ============================================
function resetCode() {
    if (!selectedProblem) return;
    
    if (confirm('Are you sure you want to reset your code to the starter template?')) {
        userCode = selectedProblem.starterCode || '';
        document.getElementById('codeEditor').value = userCode;
        
        // Clear test results
        closeResults();
        renderTestCases();
    }
}

// ============================================
// 10. RUN CODE (Test against sample test cases)
// ============================================
// async function runCode() {
//     if (!selectedProblem) return;
    
//     const code = document.getElementById('codeEditor').value;
//     if (!code.trim()) {
//         alert('Please write some code first!');
//         return;
//     }
    
//     // Disable buttons
//     const runBtn = document.querySelector('.res-btn-run');
//     const submitBtn = document.querySelector('.res-btn-submit');
//     runBtn.disabled = true;
//     submitBtn.disabled = true;
//     runBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Running...`;
    
//     try {
//         // Run against all test cases
//         const results = await executeCode(code, selectedProblem.testCases);
//         displayResults(results, false);
//     } catch (error) {
//         displayError(error.message);
//     } finally {
//         runBtn.disabled = false;
//         submitBtn.disabled = false;
//         runBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"/></svg> Run Code`;
//     }
// }

// ============================================
// 11. SUBMIT CODE (Updated: Removed Run Button Logic)
// ============================================
async function submitCode() {
    if (!selectedProblem) return;
    
    const code = document.getElementById('codeEditor').value;
    if (!code.trim()) {
        alert('Please write some code first!');
        return;
    }
    
    // Disable submit button only (Run button is gone)
    const submitBtn = document.querySelector('.res-btn-submit');
    submitBtn.disabled = true;
    
    // Save original text
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Submitting...`;
    
    try {
        // Run against all test cases using the stable sequential execution
        const results = await executeCode(code, selectedProblem.testCases);
        displayResults(results, true);
    } catch (error) {
        displayError(error.message);
    } finally {
        // Re-enable button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
    const isSuccess = results.every(r => r.passed);
    firebase.database().ref('submissions').push({
        timestamp: Date.now(),
        problemTitle: selectedProblem.title, // Lấy tên bài hiện tại
        userName: "Student",                 // Hoặc tên user đăng nhập
        status: isSuccess ? "Accepted" : "Wrong Answer",
        runtime: (Math.random() * 0.1).toFixed(3), // Giả lập time hoặc lấy thật
        code: document.getElementById('codeEditor').value
    });
}

// ============================================
// 12. EXECUTE CODE (STABLE - SEQUENTIAL)
// ============================================
const PISTON_API_URL = 'https://emkc.org/api/v2/piston/execute';

async function executeCode(userCode, testCases) {
    if (!userCode.includes('main')) {
        throw new Error("Code must contain a main() function!");
    }

    const results = [];

    // CHẠY TUẦN TỰ: Từng cái một để đảm bảo 100% không bị server chặn
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
                // Nếu server lỗi, trả về kết quả fail thay vì throw error
                results.push({
                    passed: false,
                    input: tc.input,
                    expected: tc.expectedOutput,
                    actual: `Server Busy (${response.status})`,
                    description: tc.description
                });
                continue; // Chuyển sang test case tiếp theo
            }

            const data = await response.json();

            // 1. Kiểm tra lỗi biên dịch (Chỉ cần check lần đầu là đủ, nhưng check hết cho chắc)
            if (data.compile && data.compile.code !== 0) {
                throw new Error(data.compile.stderr || "Unknown Compilation Error");
            }

            // 2. Lấy kết quả
            const stdout = data.run.stdout ? data.run.stdout.trim() : "";
            const stderr = data.run.stderr ? data.run.stderr.trim() : "";
            
            // 3. So sánh (Chuẩn hóa xuống dòng)
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
            // Bắt lỗi mạng hoặc lỗi biên dịch
            if (error.message.includes("Compilation Error")) {
                throw error; // Ném lỗi biên dịch ra ngoài để hiển thị popup đỏ
            }
            results.push({
                passed: false,
                input: tc.input,
                expected: tc.expectedOutput,
                actual: "Network Error",
                description: tc.description
            });
        }

        // QUAN TRỌNG: Nghỉ 250ms giữa các lần gửi để server không tưởng là spam
        if (i < testCases.length - 1) {
            await new Promise(r => setTimeout(r, 1));
        }
    }

    return results;
}

// ============================================
// 13. DISPLAY RESULTS (SAFE MODE)
// ============================================
function displayResults(results, isSubmit) {
    const resultsPanel = document.getElementById('resultsPanel');
    const resultsContent = document.getElementById('resultsContent');
    
    // Tính toán số lượng Pass
    const passedCount = results.filter(r => r.passed).length;
    const totalCount = results.length;
    const allPassed = passedCount === totalCount;
    
    // Cập nhật giao diện từng Test Case
    results.forEach((result, idx) => {
        const testItem = document.getElementById(`testCase${idx}`);
        const testStatus = document.getElementById(`testStatus${idx}`);
        
        // [FIX] Kiểm tra nếu phần tử tồn tại mới thao tác để tránh lỗi null
        if (testItem && testStatus) {
            // Reset class cũ
            testItem.classList.remove('passed', 'failed');
            
            if (result.passed) {
                testItem.classList.add('passed');
                testStatus.innerHTML = `<span style="color:#16a34a; display:flex; align-items:center; gap:4px;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg> 
                    Passed
                </span>`;
                testStatus.className = 'res-test-status passed';
            } else {
                testItem.classList.add('failed');
                testStatus.innerHTML = `<span style="color:#dc2626; display:flex; align-items:center; gap:4px;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M18 6L6 18M6 6l12 12"/></svg> 
                    Failed
                </span>`;
                testStatus.className = 'res-test-status failed';
            }
        }
    });
    
    // Hiển thị bảng tổng kết phía dưới
    let summaryHTML = '';
    if (allPassed) {
        summaryHTML = `
            <div class="res-result-summary success">
                <h3>All Tests Passed!</h3>
                <p>You passed ${passedCount}/${totalCount} test cases.</p>
            </div>
        `;
        if (isSubmit) {
            summaryHTML += `
                <div style="text-align: center; padding: 12px; background: #f0fdf4; border-radius: 8px; margin-top: 12px;">
                    <p style="margin: 0; color: #16a34a; font-weight: 600;">
                        Congratulations! Your solution is correct.
                    </p>
                </div>
            `;
        }
    } else {
        summaryHTML = `
            <div class="res-result-summary error">
                <h3>✗ Wrong Answer</h3>
                <p>You only passed ${passedCount}/${totalCount} test cases.</p>
                <p style="font-size: 13px; margin-top: 5px;">Please check your code logic.</p>
            </div>
        `;
    }
    
    if (resultsContent) {
        resultsContent.innerHTML = summaryHTML;
    }
    
    if (resultsPanel) {
        resultsPanel.style.display = 'block';
        resultsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ============================================
// 14. DISPLAY ERROR
// ============================================
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

// ============================================
// 15. CLOSE RESULTS
// ============================================
function closeResults() {
    document.getElementById('resultsPanel').style.display = 'none';
    
    if (selectedProblem && selectedProblem.testCases) {
        selectedProblem.testCases.forEach((tc, idx) => {
            const testItem = document.getElementById(`testCase${idx}`);
            const testStatus = document.getElementById(`testStatus${idx}`);
            
            testItem.classList.remove('passed', 'failed');
            testStatus.innerHTML = '<span style="font-size: 12px; color: #999; font-weight: 500;">Ready</span>';
            testStatus.className = 'res-test-status';
        });
    }
}

// ============================================
// 16. BACK TO PROBLEM LIST
// ============================================
function backToProblemList() {
    selectedProblem = null;
    userCode = ''; // Reset user code when going back
    const chapter = CHAPTERS.find(c => c.id === selectedChapterId);
    if (chapter) showProblemList(chapter);
    updateBreadcrumb();
}

// Reset về trạng thái ban đầu (click Home breadcrumb)
function resetToChapterView() {
    selectedChapterId = null;
    selectedProblem   = null;
    currentChapterProblems = [];
    userCode = '';
    
    // [MỚI] Xóa trạng thái đã lưu để trở về màn hình trắng
    localStorage.removeItem('wdsa_active_chapter');

    document.getElementById('problemListView').style.display  = 'block';
    document.getElementById('problemDetailView').style.display = 'none';
    document.getElementById('currentChapterTitle').textContent = 'Select a Chapter';
    document.getElementById('problemCount').textContent        = '';
    document.getElementById('problemGrid').innerHTML            = '';

    renderSidebar();
    updateBreadcrumb();
}

// ============================================
// 17. BREADCRUMB
// ============================================
function updateBreadcrumb() {
    const bcChapter     = document.getElementById('bcChapter');
    const bcSepProblem  = document.getElementById('bcSepProblem');
    const bcProblem     = document.getElementById('bcProblem');

    const chapter = CHAPTERS.find(c => c.id === selectedChapterId);

    if (chapter) {
        bcChapter.textContent = chapter.title;
        bcChapter.onclick     = backToProblemList;
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

// ============================================
// 18. COPY SOLUTION
// ============================================
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

// ============================================
// 19. UTIL
// ============================================
function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ============================================
// 20. INIT — chọn chương đầu tiên mặc định
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    renderSidebar();
    // mặc định chọn chương đầu tiên
    // if (CHAPTERS.length > 0) {
    //     selectChapter(CHAPTERS[0].id);
    // }
});

// ============================================
// 20. INIT — Khôi phục chương cũ nếu có
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    renderSidebar();

    // [MỚI] Kiểm tra xem trước đó người dùng đang ở chương nào
    const lastChapterId = localStorage.getItem('wdsa_active_chapter');

    if (lastChapterId) {
        // Nếu có lịch sử -> Mở lại chương đó
        // Cần ép kiểu về số (parseInt) vì localStorage lưu dưới dạng chuỗi
        selectChapter(parseInt(lastChapterId));
    } else {
        // Nếu không có lịch sử -> Không làm gì cả (để màn hình Select a Chapter)
    }
});

function renderProblemGrid(problemsToRender) {
    const grid = document.getElementById('problemGrid');
    
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
        // Tìm index gốc trong mảng currentChapterProblems để khi click vào mở đúng bài
        // Lưu ý: p là object bài tập, ta cần tìm vị trí của nó trong list gốc
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

// 3. THÊM HÀM LỌC BÀI TẬP (Gắn vào sự kiện oninput ở HTML)
function filterProblems() {
    const query = document.getElementById('problemSearchInput').value.toLowerCase().trim();
    
    if (!query) {
        // Nếu không nhập gì thì hiện hết
        renderProblemGrid(currentChapterProblems);
        return;
    }

    // Lọc theo Title hoặc ID hoặc Tag
    const filtered = currentChapterProblems.filter(p => {
        const titleMatch = p.title.toLowerCase().includes(query);
        const idMatch = (p.customId || p.lcNumber).toString().includes(query);
        const tagMatch = p.tags.some(t => t.toLowerCase().includes(query));
        
        return titleMatch || idMatch || tagMatch;
    });

    renderProblemGrid(filtered);
}