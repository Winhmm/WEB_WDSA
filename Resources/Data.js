/**
 * =============================================================================
 * UTILITY FUNCTIONS
 * =============================================================================
 */
// Helper to generate a matrix string for test cases
const gen = (n, m) => {
    const row = Array(m).fill(1).join(" ");
    const matrix = Array(n).fill(row).join("\n");
    return `${n} ${m}\n${matrix}`;
};

/**
 * =============================================================================
 * PROBLEM DATA STRUCTURE
 * =============================================================================
 */
const CHAPTERS = [
    // -------------------------------------------------------------------------
    // CHAPTER 1: SORTING & SEARCHING
    // -------------------------------------------------------------------------
    {
        id: 1,
        title: "Sorting & Searching",
        problems: [
            {
                lcNumber: 704,
                customId: 1,
                title: "Binary Search",
                difficulty: "easy",
                tags: ["Array", "Binary Search"],
                lcUrl: "https://leetcode.com/problems/binary-search/",
                description: `
                    <p>Write a C++ program to search for a <strong>target</strong> value in an ascending sorted array.</p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>Line 1: An integer n (number of elements)</li>
                        <li>Line 2: The target value</li>
                        <li>Line 3: n space-separated integers (the sorted array)</li>
                    </ul>
                    
                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print the index of the target (0-indexed). If not found, print -1.</li>
                    </ul>
                    
                    <strong>Requirement:</strong>
                    <ul>
                        <li>Time complexity must be <strong>O(log n)</strong> (Binary Search)</li>
                    </ul>
                `,
                examples: [
                    { 
                        input: "6 9\n1 -1 0 3 5 9 12", 
                        output: "5", 
                        explain: "Explanation: The number 9 exists at index 5 in the array." 
                    },
                    { 
                        input: "6 2\n1 -1 0 3 5 9 12", 
                        output: "-1", 
                        explain: "Explanation: The number 2 does not exist in the array, so return -1." 
                    }
                ],
                testCases: [
                    { input: "6\n9\n-1 0 3 5 9 12", expectedOutput: "4" },
                    { input: "6\n2\n-1 0 3 5 9 12", expectedOutput: "-1" },
                    { input: "1\n5\n5", expectedOutput: "0" },
                    { input: "10\n10\n1 2 3 4 5 6 7 8 9 10", expectedOutput: "9" },
                    { input: "5\n1\n2 4 6 8 10", expectedOutput: "-1" },
                    { input: "3\n7\n5 7 9", expectedOutput: "1" },
                    { input: "3\n4\n5 7 9", expectedOutput: "-1" },
                    { input: "4\n-3\n-5 -3 -1 0", expectedOutput: "1" },
                    { input: "4\n-6\n-5 -3 -1 0", expectedOutput: "-1" },
                    { input: "5\n100\n10 20 30 40 50", expectedOutput: "-1" },
                    { input: "5\n10\n10 20 30 40 50", expectedOutput: "0" },
                    { input: "5\n50\n10 20 30 40 50", expectedOutput: "4" },
                    { input: "6\n4\n1 2 3 4 5 6", expectedOutput: "3" },
                    { input: "6\n5\n1 2 3 4 5 6", expectedOutput: "4" },
                    { input: "7\n1\n1 3 5 7 9 11 13", expectedOutput: "0" },
                    { input: "7\n13\n1 3 5 7 9 11 13", expectedOutput: "6" },
                    { input: "7\n8\n1 3 5 7 9 11 13", expectedOutput: "-1" },
                    { input: "8\n6\n1 2 3 4 5 6 7 8", expectedOutput: "5" },
                    { input: "8\n0\n1 2 3 4 5 6 7 8", expectedOutput: "-1" },
                    { input: "8\n9\n1 2 3 4 5 6 7 8", expectedOutput: "-1" },
                    { input: "10\n42\n1 5 10 20 30 40 42 50 60 70", expectedOutput: "6" },
                    { input: "10\n41\n1 5 10 20 30 40 42 50 60 70", expectedOutput: "-1" },
                    { input: "9\n15\n-20 -10 -5 0 5 10 15 20 25", expectedOutput: "6" },
                    { input: "9\n-15\n-20 -10 -5 0 5 10 15 20 25", expectedOutput: "-1" },
                    { input: "1\n0\n0", expectedOutput: "0" },
                    { input: "2\n1\n1 2", expectedOutput: "0" },
                    { input: "2\n2\n1 2", expectedOutput: "1" },
                    { input: "2\n3\n1 2", expectedOutput: "-1" },
                    { input: "9\n4\n1 2 3 4 5 6 7 8 9", expectedOutput: "3" },
                    { input: "8\n5\n1 2 3 4 5 6 7 8", expectedOutput: "4" },
                    { input: "0\n5\n", expectedOutput: "-1" },
                    { input: "7\n0\n0 0 0 0 0 0 0", expectedOutput: "3" },
                    { input: "5\n7\n1 3 5 7 9", expectedOutput: "3" },
                    { input: "4\n2\n2 4 6 8", expectedOutput: "0" },
                    { input: "4\n8\n2 4 6 8", expectedOutput: "3" },
                    { input: "4\n5\n2 4 6 8", expectedOutput: "-1" },
                    { input: "5\n3\n1 3 5 7 9", expectedOutput: "1" },
                    { input: "5\n7\n1 3 5 7 9", expectedOutput: "3" },
                    { input: "6\n-1\n-5 -3 -1 1 3 5", expectedOutput: "2" },
                    { input: "6\n0\n-5 -3 -1 1 3 5", expectedOutput: "-1" },
                    { input: "8\n15\n1 3 6 10 15 21 28 36", expectedOutput: "4" },
                    { input: "8\n14\n1 3 6 10 15 21 28 36", expectedOutput: "-1" },
                    { input: "3\n1000000000\n1 500000000 1000000000", expectedOutput: "2" },
                    { input: "4\n100\n10 20 30 40", expectedOutput: "-1" },
                    { input: "5\n-10\n-10 -5 0 5 10", expectedOutput: "0" },
                    { input: "10\n300\n50 100 150 200 250 300 350 400 450 500", expectedOutput: "5" },
                    { input: "8\n175\n25 75 125 175 225 275 325 375", expectedOutput: "3" },
                    { input: "7\n900\n100 200 300 400 500 600 700", expectedOutput: "-1" },
                    { input: "9\n700\n100 200 300 400 500 600 700 800 900", expectedOutput: "6" },
                    { input: "6\n50\n100 200 300 400 500 600", expectedOutput: "-1" }
                ]
            }
        ]
    },

    // -------------------------------------------------------------------------
    // CHAPTER 2: BACKTRACKING
    // -------------------------------------------------------------------------
    {
        id: 2,
        title: "Backtracking",
        problems: [
            {
                lcNumber: 52,
                customId: 1,
                title: "N-Queens",
                difficulty: "hard",
                tags: ["Backtracking", "Matrix"],
                lcUrl: "https://leetcode.com/problems/n-queens-ii/",
                description: `
                    <p>The <strong>n-queens</strong> puzzle is the problem of placing <strong>n</strong> queens on an <strong>n × n</strong> chessboard such that no two queens attack each other.</p>
                    <p>Given an integer <strong>n</strong>, return the <em>number of distinct solutions</em> to the n-queens puzzle.</p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing a positive integer <strong>n</strong></li>
                    </ul>
                    
                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print a single integer: the total number of distinct solutions</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 ≤ n ≤ 12</li>
                    </ul>
                `,
                examples: [
                    { input: "4", output: "2", explain: "Explanation: There are two distinct solutions for the 4-queens puzzle." },
                    { input: "1", output: "1", explain: "Explanation: There is only one position possible on a 1x1 board." },
                    { input: "8", output: "92", explain: "Explanation: For a standard 8x8 chessboard, there are 92 distinct ways to place the queens." }
                ],
                timeComplexity: "O(N!)",
                spaceComplexity: "O(N)",
                testCases: [
                    { input: "1", expectedOutput: "1" },
                    { input: "2", expectedOutput: "0" },
                    { input: "3", expectedOutput: "0" },
                    { input: "4", expectedOutput: "2" },
                    { input: "5", expectedOutput: "10" },
                    { input: "6", expectedOutput: "4" },
                    { input: "7", expectedOutput: "40" },
                    { input: "8", expectedOutput: "92" },
                    { input: "9", expectedOutput: "352" },
                    { input: "10", expectedOutput: "724" },
                    { input: "11", expectedOutput: "2680" },
                    { input: "12", expectedOutput: "14200" },
                    { input: "13", expectedOutput: "73712" }
                ]
            },
            {
                lcNumber: 2000,
                customId: 2,
                title: "Find all sets of numbers with sum S",
                difficulty: "medium",
                tags: ["Backtracking", "Array"],
                lcUrl: "#",
                description: `
                    <p>Consider all sets of <strong>distinct positive integers</strong> whose elements are not greater than a given number <strong>n</strong>.</p>
                    <p>Your task is to count how many such sets contain exactly <strong>k</strong> elements and have a total sum equal to <strong>s</strong>.</p>
                    <p><em>Note: Two sets that differ only in the order of elements are considered the same set.</em></p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing three integers: n, k, s</li>
                    </ul>
                    
                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print a single integer: the count of valid sets</li>
                    </ul>
                    
                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 ≤ k ≤ n ≤ 20</li>
                        <li>1 ≤ s ≤ 1000</li>
                    </ul>
                `,
                examples: [
                    { input: "16 8 91", output: "28", explain: "There are 28 different sets consisting of 8 distinct numbers from 1 to 16 whose total sum is exactly 91." },
                    { input: "9 3 23", output: "1", explain: "The only valid set is {6, 8, 9}." }
                ],
                timeComplexity: "O(C(n, k))",
                spaceComplexity: "O(k)",
                testCases: [
                    { input: "9 3 23", expectedOutput: "1", description: "Test case 1: Example (n=9, k=3, s=23)" },
                    { input: "16 8 91", expectedOutput: "28", description: "Test case 2: Larger inputs (n=16, k=8, s=91)" },
                    { input: "10 2 5", expectedOutput: "2", description: "Test case 3: Small inputs ({1,4}, {2,3})" },
                    { input: "5 3 20", expectedOutput: "0", description: "Test case 4: Impossible sum" },
                    { input: "20 10 155", expectedOutput: "1", description: "Test case 5: Max boundary ({11,12,...,20})" },
                    { input: "7 3 6", expectedOutput: "1" },
                    { input: "7 3 9", expectedOutput: "3" },
                    { input: "8 3 6", expectedOutput: "1" },
                    { input: "8 3 7", expectedOutput: "1" },
                    { input: "8 3 15", expectedOutput: "6" },
                    { input: "8 4 10", expectedOutput: "1" },
                    { input: "9 1 9", expectedOutput: "1" },
                    { input: "9 1 10", expectedOutput: "0" },
                    { input: "9 2 5", expectedOutput: "2" },
                    { input: "9 3 6", expectedOutput: "1" },
                    { input: "10 2 3", expectedOutput: "1" },
                    { input: "10 3 6", expectedOutput: "1" },
                    { input: "10 3 9", expectedOutput: "3" },
                    { input: "10 4 10", expectedOutput: "1" },
                    { input: "10 4 15", expectedOutput: "6" },
                    { input: "10 4 30", expectedOutput: "5" },
                    { input: "12 3 6", expectedOutput: "1" },
                    { input: "12 4 10", expectedOutput: "1" },
                    { input: "15 3 6", expectedOutput: "1" },
                ]
            },
            {
                lcNumber: 2001,
                customId: 3,
                title: "Rat in a Maze",
                difficulty: "medium",
                tags: ["Backtracking", "Matrix", "Recursion"],
                lcUrl: "#",
                description: `
                    <p>A maze is represented as a binary matrix of size <strong>N × N</strong>.</p>
                    <p>A rat starts at cell <strong>(1, 1)</strong> and wants to reach cell <strong>(N, N)</strong>.</p>
                    <p>The rat can only move <strong>down (D)</strong> or <strong>right (R)</strong>, and can only move to a cell if that cell has a value of <strong>1</strong>.</p>
                    <p><strong>Note:</strong> On each path, the rat can visit each cell at most once.</p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>First line: An integer <strong>N</strong> (size of the matrix)</li>
                        <li>Next <strong>N</strong> lines: Each line contains <strong>N</strong> integers (0 or 1)</li>
                    </ul>
                    
                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print all valid paths in lexicographically increasing order, one path per line</li>
                        <li>If the rat cannot reach cell (N, N), print -1</li>
                        <li>In the path: <strong>R</strong> = move right, <strong>D</strong> = move down</li>
                    </ul>
                    
                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 ≤ N ≤ 12</li>
                        <li>The starting cell (1, 1) is guaranteed to be 1</li>
                    </ul>
                `,
                examples: [
                    {
                        input: "4\n1 1 0 1\n1 1 1 1\n1 0 1 1\n1 1 1 1", 
                        output: "DDDRRR\nDRRDDR\nDRRDRD\nDRRRDD\nRDRDDR\nRDRDRD\nRDRRDD", 
                        explain: "There are 7 valid paths from (1,1) to (4,4), sorted in lexicographical order."
                    },
                    {
                        input: "2\n1 0\n0 1", 
                        output: "-1", 
                        explain: "There is no valid path from (1,1) to (2,2)."
                    },
                    {
                        input: "3\n1 1 1\n1 1 1\n1 1 1", 
                        output: "DDRR\nDRDR\nDRRD\nRDDR\nRDRD\nRRDD", 
                        explain: "There are 6 valid paths in a matrix of all 1s."
                    }
                ],
                timeComplexity: "O(2^(N²))",
                spaceComplexity: "O(N²)",
                testCases: [
                    { input: "4\n1 1 0 1\n1 1 1 1\n1 0 1 1\n1 1 1 1", expectedOutput: "DDDRRR\nDRRDDR\nDRRDRD\nDRRRDD\nRDRDDR\nRDRDRD\nRDRRDD" },
                    { input: "2\n1 0\n0 1", expectedOutput: "-1" },
                    { input: "3\n1 1 1\n1 1 1\n1 1 1", expectedOutput: "DDRR\nDRDR\nDRRD\nRDDR\nRDRD\nRRDD" },
                    { input: "1\n1", expectedOutput: "" },
                    { input: "5\n1 1 1 1 1\n1 0 0 0 1\n1 1 1 0 1\n1 0 1 1 1\n1 1 1 1 1", expectedOutput: "DDDDRRRR\nDDRRDDRR\nDDRRDRDR\nDDRRDRRD\nRRRRDDDD" },
                    { input: "3\n1 1 0\n1 1 0\n0 1 1", expectedOutput: "DRDR\nRDDR" },
                    { input: "3\n1 1 1\n1 0 1\n1 1 0", expectedOutput: "-1" },
                    { input: "4\n1 0 0 0\n1 1 0 0\n0 1 1 0\n0 0 1 1", expectedOutput: "DRDRDR" },
                    { input: "2\n1 1\n1 1", expectedOutput: "DR\nRD" },
                    { input: "5\n1 1 1 0 0\n0 0 1 0 0\n0 0 1 1 0\n0 0 0 1 1\n0 0 0 0 1", expectedOutput: "RRDDRDRD" },
                    { input: "2\n1 1\n1 0", expectedOutput: "-1" },
                    { input: "2\n1 0\n1 1", expectedOutput: "DR" },
                    { input: "2\n1 1\n0 1", expectedOutput: "RD" },
                    { input: "3\n1 0 0\n1 1 0\n0 1 1", expectedOutput: "DRDR" },
                    { input: "3\n1 1 1\n0 1 0\n0 1 1", expectedOutput: "RDDR" },
                    { input: "3\n1 1 1\n1 0 1\n1 1 1", expectedOutput: "DDRR\nRRDD" },
                    { input: "4\n1 1 1 1\n1 0 0 1\n1 0 0 1\n1 1 1 1", expectedOutput: "DDDRRR\nRRRDDD" },
                    { input: "4\n1 0 0 0\n1 1 0 0\n0 1 0 0\n0 1 1 1", expectedOutput: "DRDDRR" },
                    { input: "4\n1 1 0 0\n0 1 1 0\n0 0 1 1\n0 0 0 1", expectedOutput: "RDRDRD" },
                    { input: "5\n1 0 0 0 0\n1 1 0 0 0\n0 1 1 0 0\n0 0 1 1 0\n0 0 0 1 1", expectedOutput: "DRDRDRDR" },
                    { input: "5\n1 0 0 0 1\n1 0 0 0 1\n1 0 0 0 1\n1 0 0 0 1\n1 1 1 1 1", expectedOutput: "DDDDRRRR" },
                    { input: "4\n1 1 1 1\n1 1 1 1\n1 1 1 1\n1 1 1 1", expectedOutput: "DDDRRR\nDDRDRR\nDDRRDR\nDDRRRD\nDRDDRR\nDRDRDR\nDRDRRD\nDRRDDR\nDRRDRD\nDRRRDD\nRDDDRR\nRDDRDR\nRDDRRD\nRDRDDR\nRDRDRD\nRDRRDD\nRRDDDR\nRRDDRD\nRRDRDD\nRRRDDD" },
                    { input: "3\n1 0 1\n1 0 1\n1 1 1", expectedOutput: "DDRR" },
                    { input: "3\n1 1 1\n0 0 1\n0 0 1", expectedOutput: "RRDD" },
                    { input: "4\n1 1 0 0\n1 0 0 0\n1 1 1 0\n0 0 1 1", expectedOutput: "DDRRDR" },
                    { input: "6\n1 1 0 0 0 0\n0 1 1 0 0 0\n0 0 1 1 0 0\n0 0 0 1 1 0\n0 0 0 0 1 1\n0 0 0 0 0 1", expectedOutput: "RDRDRDRDRD" }, 
                    { input: "3\n1 1 1\n1 1 0\n1 0 1", expectedOutput: "-1" },
                    { input: "3\n1 0 1\n0 1 0\n1 0 1", expectedOutput: "-1" },
                    { input: "3\n1 1 1\n0 1 0\n1 1 1", expectedOutput: "RDDR" },
                    { input: "4\n1 0 0 0\n1 1 0 1\n1 1 0 0\n0 1 1 1", expectedOutput: "DDRDRR\nDRDDRR" },
                    { input: "4\n1 0 0 0\n1 0 0 0\n1 0 0 0\n1 1 1 1", expectedOutput: "DDDRRR" }
                ]
            },
            {   
                lcNumber: 62,
                customId: 4,
                title: "Count All Paths",
                difficulty: "medium",
                tags: ["Backtracking", "Matrix", "Dynamic Programming"],
                lcUrl: "https://leetcode.com/problems/unique-paths/",
                description: `
                    <p>Given a matrix <strong>A</strong> with <strong>N</strong> rows and <strong>M</strong> columns. Your task is to count all possible paths from the top-left cell <strong>A[0][0]</strong> to the bottom-right cell <strong>A[N-1][M-1]</strong>.</p>
                    <p>You are only allowed to move <strong>down</strong> or to the <strong>right</strong> to an adjacent cell.</p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>Line 1: Two integers <strong>N</strong> and <strong>M</strong>.</li>
                        <li>Next N lines: The elements of the matrix <strong>A</strong> (space-separated).</li>
                    </ul>
                    
                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print the total number of valid paths.</li>
                    </ul>
                    
                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 ≤ N, M ≤ 10</li>
                        <li>A[i][j] ≤ 10000</li>
                    </ul>
                `,
                examples: [
                    {
                        input: "3 5\n4 6 8 3 1\n9 8 8 9 1\n10 6 3 4 5",
                        output: "15",
                        explain: "Explanation: There are 15 distinct paths from the top-left to the bottom-right in a 3x5 grid."
                    }
                ],
                timeComplexity: "O(2^(N+M))",
                spaceComplexity: "O(N*M)",
                testCases: [
                    { input: "3 5\n4 6 8 3 1\n9 8 8 9 1\n10 6 3 4 5", expectedOutput: "15" },
                    { input: "2 2\n1 2\n3 4", expectedOutput: "2" },
                    { input: "1 5\n1 2 3 4 5", expectedOutput: "1" },
                    { input: "5 1\n1\n2\n3\n4\n5", expectedOutput: "1" },
                    { input: "3 3\n1 1 1\n1 1 1\n1 1 1", expectedOutput: "6" },
                    { input: "3 7\n1 2 3 4 5 6 7\n8 9 10 11 12 13 14\n15 16 17 18 19 20 21", expectedOutput: "28" },
                    { input: "7 3\n1 1 1\n1 1 1\n1 1 1\n1 1 1\n1 1 1\n1 1 1\n1 1 1", expectedOutput: "28" },
                    { input: "10 10\n" + Array(10).fill(Array(10).fill(1).join(" ")).join("\n"), expectedOutput: "48620" },
                    { input: gen(1, 1), expectedOutput: "1" },
                    { input: gen(1, 2), expectedOutput: "1" },
                    { input: gen(1, 5), expectedOutput: "1" },
                    { input: gen(5, 1), expectedOutput: "1" },
                    { input: gen(1, 10), expectedOutput: "1" },
                    { input: gen(10, 1), expectedOutput: "1" },
                    { input: gen(2, 2), expectedOutput: "2" },
                    { input: gen(3, 3), expectedOutput: "6" },
                    { input: gen(4, 4), expectedOutput: "20" },
                    { input: gen(5, 5), expectedOutput: "70" },
                    { input: gen(2, 3), expectedOutput: "3" },
                    { input: gen(3, 2), expectedOutput: "3" },
                    { input: gen(2, 4), expectedOutput: "4" },
                    { input: gen(4, 2), expectedOutput: "4" },
                    { input: gen(2, 5), expectedOutput: "5" },
                    { input: gen(5, 2), expectedOutput: "5" },
                    { input: gen(2, 10), expectedOutput: "10" },
                    { input: gen(10, 2), expectedOutput: "10" },
                    { input: gen(3, 4), expectedOutput: "10" },
                    { input: gen(4, 3), expectedOutput: "10" },
                    { input: gen(3, 5), expectedOutput: "15" },
                    { input: gen(5, 3), expectedOutput: "15" },
                    { input: gen(3, 6), expectedOutput: "21" },
                    { input: gen(6, 3), expectedOutput: "21" },
                    { input: gen(3, 7), expectedOutput: "28" }, 
                    { input: gen(4, 5), expectedOutput: "35" },
                    { input: gen(5, 4), expectedOutput: "35" },
                    { input: gen(4, 6), expectedOutput: "56" },
                    { input: gen(6, 4), expectedOutput: "56" },
                    { input: gen(6, 6), expectedOutput: "252" },
                    { input: gen(8, 8), expectedOutput: "3432" },
                    { input: gen(10, 10), expectedOutput: "48620" },
                ]
            },
            {
                lcNumber: 2002,
                customId: 5,
                title: "Binary Strings of Length N",
                difficulty: "easy",
                tags: ["Backtracking", "Recursion", "Bit Manipulation"],
                lcUrl: "#",
                description: `
                    <p>Write a program to generate all binary strings of length <strong>n</strong>.</p>
                    <p>A binary string is a sequence consisting only of <strong>0</strong>s and <strong>1</strong>s.</p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single integer <strong>n</strong> (n ≥ 1)</li>
                    </ul>
                    
                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print all binary strings of length n in <strong>lexicographically increasing order</strong>.</li>
                        <li>Each string must be printed on a new line.</li>
                    </ul>
                    
                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 ≤ n ≤ 15</li>
                    </ul>
                `,
                examples: [
                    { input: "3", output: "000\n001\n010\n011\n100\n101\n110\n111", explain: "All 8 possible binary strings of length 3, sorted." },
                    { input: "2", output: "00\n01\n10\n11", explain: "All 4 possible binary strings of length 2." }
                ],
                testCases: [
                    { input: "3", expectedOutput: "000\n001\n010\n011\n100\n101\n110\n111" },
                    { input: "2", expectedOutput: "00\n01\n10\n11" },
                    { input: "1", expectedOutput: "0\n1" },
                    { input: "4", expectedOutput: "0000\n0001\n0010\n0011\n0100\n0101\n0110\n0111\n1000\n1001\n1010\n1011\n1100\n1101\n1110\n1111" },
                    { input: "5", expectedOutput: "00000\n00001\n00010\n00011\n00100\n00101\n00110\n00111\n01000\n01001\n01010\n01011\n01100\n01101\n01110\n01111\n10000\n10001\n10010\n10011\n10100\n10101\n10110\n10111\n11000\n11001\n11010\n11011\n11100\n11101\n11110\n11111" }
                ]
            },
            {
                lcNumber: 2003,
                customId: 6,
                title: "Combination C(n, k)",
                difficulty: "easy",
                tags: ["Recursion", "Math"],
                lcUrl: "#",
                description: `
                    <p>Write a program to calculate the binomial coefficient <strong>C(n, k)</strong> using recursion.</p>
                    <p>The formula is defined as:</p>
                    <p style="text-align:center; font-weight:bold;">C(n, k) = C(n-1, k) + C(n-1, k-1)</p>
                    
                    <p><strong>Base Cases:</strong></p>
                    <ul>
                        <li>C(n, n) = 1</li>
                        <li>C(n, 1) = n</li>
                    </ul>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>Two space-separated integers: <strong>n</strong> and <strong>k</strong></li>
                    </ul>
                    
                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print the value of C(n, k).</li>
                    </ul>
                    
                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 ≤ k ≤ n ≤ 25</li>
                    </ul>
                `,
                examples: [
                    { input: "5 3", output: "10", explain: "Explanation: C(5, 3) = 10" },
                    { input: "4 4", output: "1", explain: "Explanation: C(4, 4) = 1 (Base case)" },
                    { input: "6 2", output: "15", explain: "Explanation: C(6, 2) = 15" }
                ],
                timeComplexity: "O(2^n)",
                spaceComplexity: "O(n)",
                testCases: [
                    { input: "5 3", expectedOutput: "10" },
                    { input: "4 4", expectedOutput: "1" },
                    { input: "6 1", expectedOutput: "6" },
                    { input: "6 2", expectedOutput: "15" },
                    { input: "7 3", expectedOutput: "35" },
                    { input: "10 5", expectedOutput: "252" },
                    { input: "1 1", expectedOutput: "1" },
                    { input: "20 10", expectedOutput: "184756" },
                    { input: "7 1", expectedOutput: "7" },
                    { input: "8 3", expectedOutput: "56" },
                    { input: "25 12", expectedOutput: "5200300" }
                ]
            },
            {
                lcNumber: 2005,
                customId: 7,
                title: "Subset Sum Problem",
                difficulty: "medium",
                tags: ["Backtracking", "Recursion", "Array"],
                lcUrl: "#",
                description: `
                    <p>Given an array of integers <strong>A</strong> containing <strong>N</strong> distinct positive integers and a target sum <strong>K</strong>.</p>
                    <p>Your task is to find all <strong>subsets</strong> of A such that the sum of elements in the subset equals <strong>K</strong>.</p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>Line 1: Two integers <strong>N</strong> (number of elements) and <strong>K</strong> (target sum).</li>
                        <li>Line 2: <strong>N</strong> space-separated distinct integers representing array A.</li>
                    </ul>
                    
                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print all valid subsets in <strong>lexicographical order</strong>.</li>
                        <li>Each subset should be enclosed in brackets, e.g., [x y z].</li>
                        <li>The elements inside each subset must also be sorted in ascending order.</li>
                        <li>If no such subset exists, print -1.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 ≤ N ≤ 15</li>
                        <li>1 ≤ A[i], K ≤ 100</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Subset Sum Problem
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;

int n, target;
int a[1000];
int x[1000];

void result(int i) {
    cout<<"[";
    for(int j = 1; j <= i; j++) {
        cout<<a[x[j]];
        if(j < i) {
            cout<<" ";
        }
    }
    cout<<"]"<<endl;
}

void Try(int i, int start, int sum) {
    for(int j = start; j <= n; j++) {
        if(sum + a[j] <= target) {
            x[i] = j;
            if(sum + a[j] == target) {
                result(i);
            } else {
                Try(i + 1, j + 1, sum + a[j]);
            }
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
 
    cin>>n>>target;
    
    for(int i = 1; i <= n; i++) {
        cin>>a[i];
    }
    
    sort(a + 1, a + n + 1);
    Try(1, 1, 0);
}`,
                examples: [
                    {
                        input: "10 26\n12 11 9 10 6 8 14 7 5 13", 
                        output: "[5 6 7 8]\n[5 7 14]\n[5 8 13]\n[5 9 12]\n[5 10 11]\n[6 7 13]\n[6 8 12]\n[6 9 11]\n[7 8 11]\n[7 9 10]\n[12 14]", 
                        explain: "These are all the subsets drawn from the input array that sum up to 26, sorted lexicographically."
                    },
                    {
                        input: "5 50\n5 10 15 20 25", 
                        output: "[5 10 15 20]\n[5 20 25]\n[10 15 25]", 
                        explain: "Example with 3 valid subsets."
                    }
                ],
                testCases: [
                    { input: "10 26\n12 11 9 10 6 8 14 7 5 13", expectedOutput: "[5 6 7 8]\n[5 7 14]\n[5 8 13]\n[5 9 12]\n[5 10 11]\n[6 7 13]\n[6 8 12]\n[6 9 11]\n[7 8 11]\n[7 9 10]\n[12 14]" },
                    { input: "5 50\n5 10 15 20 25", expectedOutput: "[5 10 15 20]\n[5 20 25]\n[10 15 25]" },
                    { input: "4 5\n1 2 3 4", expectedOutput: "[1 4]\n[2 3]" },
                    { input: "5 10\n10 1 2 3 4", expectedOutput: "[1 2 3 4]\n[10]" },
                    { input: "8 94\n3 9 19 29 30 39 42 43", expectedOutput: "[3 9 39 43]\n[3 19 29 43]\n[3 19 30 42]\n[9 42 43]" },
                    { input: "11 74\n4 12 20 21 22 24 27 34 36 37 49", expectedOutput: "[4 12 21 37]\n[4 12 22 36]\n[4 12 24 34]\n[4 21 22 27]\n[4 21 49]\n[4 34 36]" },
                    { input: "14 43\n1 6 10 14 19 20 21 22 27 31 41 43 46 48", expectedOutput: "[1 6 14 22]\n[1 20 22]\n[6 10 27]\n[10 14 19]\n[21 22]\n[43]" },
                    { input: "6 2\n2 7 14 19 20 27", expectedOutput: "[2]" },
                    { input: "6 99\n6 9 11 24 36 37", expectedOutput: "[6 9 11 36 37]" },
                    { input: "11 14\n3 4 5 9 13 17 19 31 36 45 47", expectedOutput: "[5 9]" },
                    { input: "5 64\n4 16 21 37 43", expectedOutput: "[21 43]" },
                    { input: "11 54\n2 6 7 9 10 12 19 36 38 44 45", expectedOutput: "[2 6 10 36]\n[2 7 9 36]\n[2 7 45]\n[6 7 10 12 19]\n[6 10 38]\n[6 12 36]\n[7 9 38]\n[9 45]\n[10 44]" },
                    { input: "7 82\n2 3 14 29 32 49 50", expectedOutput: "[3 29 50]\n[32 50]" },
                    { input: "5 49\n12 16 17 20 29", expectedOutput: "[12 17 20]\n[20 29]" },
                    { input: "7 94\n5 24 28 30 36 39 42", expectedOutput: "[24 28 42]\n[28 30 36]" },
                    { input: "6 29\n7 8 17 21 25 36", expectedOutput: "[8 21]" },
                    { input: "7 86\n8 18 20 30 40 47 48", expectedOutput: "[8 18 20 40]\n[8 30 48]\n[18 20 48]" },
                    { input: "7 96\n19 23 24 30 37 44 49", expectedOutput: "[19 23 24 30]\n[23 24 49]" },
                    { input: "10 46\n7 10 25 28 41 46 49 55 61 73", expectedOutput: "[46]" },
                    { input: "10 77\n7 10 13 15 21 27 38 49 57 72", expectedOutput: "[7 13 57]\n[7 21 49]\n[13 15 49]" }
                ]
            }, 
            {
                lcNumber: 3001,
                customId: 8,
                title: "ATM Money Change",
                difficulty: "medium",
                tags: ["Backtracking", "Recursion", "Meet-in-the-middle"],
                lcUrl: "#",
                description: `
                    <p>An ATM machine currently holds <strong>n</strong> banknotes with values a[1], a[2], ..., a[n].</p>
                    <p>Your task is to find the <strong>minimum number of banknotes</strong> needed to pay an exact amount <strong>S</strong>.</p>
                    <p><em>Note: Each banknote can be used only once. The values of the banknotes can be arbitrary and may be equal.</em></p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>Line 1: Two integers <strong>n</strong> and <strong>S</strong> (number of banknotes and the target amount).</li>
                        <li>Line 2: <strong>n</strong> space-separated integers representing the values of the banknotes.</li>
                    </ul>
                    
                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print a single integer: the minimum number of banknotes required.</li>
                        <li>If it is impossible to pay exactly the amount S, print -1.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 ≤ n ≤ 30</li>
                        <li>0 ≤ S ≤ 10^9</li>
                        <li>1 ≤ a[i] ≤ 10^9</li>
                    </ul>
                `,
                sampleSolution: `// Solution for ATM Money Change
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;

int n, target;
int a[1000];
int x[1000];
int min_cnt = INT_MAX;

void Try(int i, int start, int sum) {
    if(i >= min_cnt) {
        return; 
    }
    
    for(int j = start; j <= n; j++) {
        if(sum + a[j] <= target) {
            x[i] = j;
            if(sum + a[j] == target) {
                min_cnt = min(min_cnt, i);
            } else {
                Try(i + 1, j + 1, sum + a[j]);
            }
        }
    }   
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    cin>>n>>target;
    for(int i = 1; i <= n; i++) {
        cin>>a[i];
    }
    
    sort(a + 1, a + n + 1);
    Try(1, 1, 0);
    if(min_cnt == INT_MAX) {
        cout<<-1;
    } else {
        cout<<min_cnt;
    }
}`,
                examples: [
                    {
                        input: "6 30\n10 4 10 5 8 8", 
                        output: "4", 
                        explain: "Explanation: We can use 4 banknotes: 10 + 8 + 8 + 4 = 30."
                    },
                    {
                        input: "5 12\n1 1 6 6 10", 
                        output: "2", 
                        explain: "Explanation: The best way is to choose two notes of value 6 (6 + 6 = 12)."
                    }
                ],
                timeComplexity: "O(2^(n/2))",
                spaceComplexity: "O(2^(n/2))",
                testCases: [
                    { input: "6\n30\n10 4 10 5 8 8", expectedOutput: "4" },
                    { input: "5\n100\n1 2 3 4 5", expectedOutput: "-1" },
                    { input: "5\n12\n1 1 6 6 10", expectedOutput: "2" },
                    { input: "3\n10\n2 4 6", expectedOutput: "2" },
                    { input: "1\n5\n5", expectedOutput: "1" },
                    { input: "1\n5\n4", expectedOutput: "-1" },
                    { input: "5\n15\n1 2 3 4 5", expectedOutput: "5" },
                    { input: "4\n1000000000\n250000000 250000000 250000000 250000000", expectedOutput: "4" },
                    { input: "10\n50\n1 2 4 8 16 32 64 128 256 512", expectedOutput: "3" },
                    { input: "7\n20\n1 3 5 7 9 11 13", expectedOutput: "2" },
                    { input: "8\n19\n2 2 2 2 2 5 5 5", expectedOutput: "5" },
                    { input: "4\n30\n25 10 10 10", expectedOutput: "3" },
                    { input: "10\n55\n1 2 3 4 5 6 7 8 9 10", expectedOutput: "10" },
                    { input: "20\n999\n2 4 6 8 10 12 14 16 18 20 22 24 26 28 30 32 34 36 38 40", expectedOutput: "-1" },
                    { input: "5\n21\n1 2 5 10 20", expectedOutput: "2" },
                    { input: "4\n6\n1 3 4 5", expectedOutput: "2" },
                    { input: "4\n6\n1 3 3 4", expectedOutput: "2" },
                    { input: "4\n10\n1 5 6 9", expectedOutput: "2" },
                    { input: "4\n11\n1 5 6 9", expectedOutput: "2" },
                    { input: "3\n30\n1 15 25", expectedOutput: "-1" },
                    { input: "5\n41\n2 10 10 20 20", expectedOutput: "-1" },
                    { input: "5\n100\n20 20 20 20 19", expectedOutput: "-1" },
                    { input: "5\n100\n20 20 20 20 18", expectedOutput: "-1" },
                    { input: "5\n1000000000\n1 1 1 1 1", expectedOutput: "-1" },
                    { input: "6\n1000000000\n500000000 500000000 1 1 1 1", expectedOutput: "2" },
                    { input: "7\n12\n3 3 3 3 3 3 3", expectedOutput: "4" },
                    { input: "6\n14\n1 2 4 8 16 32", expectedOutput: "3" },
                    { input: "5\n31\n1 2 4 8 16", expectedOutput: "5" },
                    { input: "10\n100\n11 11 11 11 11 11 11 11 11 1", expectedOutput: "10" },
                    { input: "10\n100\n11 11 11 11 11 11 11 11 11 2", expectedOutput: "-1" },
                    { input: "20\n200\n10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10", expectedOutput: "20" },
                    { input: "20\n150\n10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10 10", expectedOutput: "15" }
                ]
            },
            {
                lcNumber: 3002,
                customId: 9,
                title: "Partition Equal Subset Sum",
                difficulty: "medium",
                tags: ["Backtracking", "Recursion", "Array"],
                lcUrl: "#",
                description: `
                    <p>Given an array <strong>A</strong> consisting of <strong>n</strong> integers. Your task is to determine whether the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.</p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>Line 1: An integer <strong>n</strong> (number of elements).</li>
                        <li>Line 2: <strong>n</strong> space-separated integers representing the array A.</li>
                    </ul>
                    
                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print <strong>1</strong> if the array can be partitioned into two subsets with equal sum.</li>
                        <li>Otherwise, print <strong>0</strong>.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 ≤ n ≤ 20</li>
                        <li>1 ≤ A[i] ≤ 100</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Partition Equal Subset Sum
#include <bits/stdc++.h>
using namespace std;

int n;
int a[25];
int totalSum = 0;

// Backtracking function to check if a subset with sum = target exists
bool tryPartition(int index, int currentSum, int target) {
    if (currentSum == target) return true;
    if (currentSum > target || index > n) return false;

    // Option 1: Include a[index]
    if (tryPartition(index + 1, currentSum + a[index], target)) return true;

    // Option 2: Exclude a[index]
    if (tryPartition(index + 1, currentSum, target)) return true;

    return false;
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    cin >> n;
    for (int i = 1; i <= n; i++) {
        cin >> a[i];
        totalSum += a[i];
    }

    if (totalSum % 2 != 0) {
        cout << 0;
    } else {
        if (tryPartition(1, 0, totalSum / 2)) cout << 1;
        else cout << 0;
    }
    return 0;
}`,
                examples: [
                    { input: "5\n9 9 4 4 5", output: "0", explain: "Total sum is 31 (Odd), impossible." },
                    { input: "4\n1 5 11 5", output: "1", explain: "Partition: [1, 5, 5] and [11]." }
                ],
                timeComplexity: "O(2^n)",
                spaceComplexity: "O(n)",
                testCases: [
                    { input: "5\n9 9 4 4 5", expectedOutput: "0" },
                    { input: "4\n1 5 11 5", expectedOutput: "1" },
                    { input: "3\n1 2 5", expectedOutput: "0" },
                    { input: "2\n100 100", expectedOutput: "1" },
                    { input: "1\n5", expectedOutput: "0" },
                    { input: "4\n2 2 2 2", expectedOutput: "1" },
                    { input: "3\n2 2 2", expectedOutput: "0" },
                    { input: "5\n2 2 3 5 6", expectedOutput: "1" },
                    { input: "7\n1 2 3 4 5 6 7", expectedOutput: "1" },
                    { input: "6\n1 2 5 10 20 50", expectedOutput: "0" },
                    { input: "5\n10 20 30 40 100", expectedOutput: "1" },
                    { input: "20\n1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1", expectedOutput: "1" },
                    { input: "19\n1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1", expectedOutput: "0" },
                    { input: "10\n1 2 3 4 5 6 7 8 9 45", expectedOutput: "1" },
                    { input: "5\n3 3 3 4 5", expectedOutput: "1" },
                    { input: "6\n1 1 3 4 7 12", expectedOutput: "1" },
                    { input: "5\n2 2 2 2 100", expectedOutput: "0" },
                    { input: "4\n1 2 4 8", expectedOutput: "0" },
                    { input: "5\n2 4 8 16 30", expectedOutput: "1" },
                    { input: "8\n10 12 15 18 20 22 25 30", expectedOutput: "0" },
                    { input: "20\n100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100", expectedOutput: "1" },
                    { input: "19\n100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100 100", expectedOutput: "0" },
                    { input: "20\n19 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1", expectedOutput: "1" },
                    { input: "7\n2 3 5 7 11 13 17", expectedOutput: "1" },
                    { input: "6\n1 1 2 3 5 8", expectedOutput: "1" },
                    { input: "4\n2 4 8 12", expectedOutput: "0" },
                    { input: "3\n3 6 11", expectedOutput: "0" },
                    { input: "5\n10 10 10 10 30", expectedOutput: "0" },
                    { input: "6\n5 15 20 25 35 40", expectedOutput: "1" },
                    { input: "8\n1 2 3 4 5 6 7 29", expectedOutput: "0" },
                    { input: "4\n3 3 3 3", expectedOutput: "1" },
                    { input: "3\n3 3 3", expectedOutput: "0" },
                    { input: "3\n1 2 100", expectedOutput: "0" },
                    { input: "3\n1 2 5", expectedOutput: "0" },
                    { input: "3\n1 2 3", expectedOutput: "1" },
                    { input: "4\n1 5 5 11", expectedOutput: "1" },
                    { input: "6\n1 2 3 4 5 6", expectedOutput: "0" },
                    { input: "6\n1 2 3 4 5 5", expectedOutput: "1" },
                    { input: "5\n10 20 30 40 80", expectedOutput: "1" },
                    { input: "5\n10 20 30 40 90", expectedOutput: "0" },
                    { input: "10\n10 20 10 20 10 20 10 20 10 20", expectedOutput: "0" },
                    { input: "4\n7 7 7 7", expectedOutput: "1" },
                    { input: "5\n7 7 7 7 7", expectedOutput: "0" },
                    { input: "6\n2 3 5 7 11 28", expectedOutput: "1" },
                    { input: "4\n2 3 5 7", expectedOutput: "0" },
                    { input: "4\n10 10 10 31", expectedOutput: "0" },
                    { input: "4\n10 10 10 32", expectedOutput: "0" },
                    { input: "5\n50 50 50 50 100", expectedOutput: "1" },
                    { input: "6\n2 2 2 2 2 10", expectedOutput: "1" },
                    { input: "4\n20 10 5 5", expectedOutput: "1" }
                ]
            },
            {
                lcNumber: 3003,
                customId: 10,
                title: "Distant Numbers",
                difficulty: "medium",
                tags: ["Backtracking", "Permutation"],
                lcUrl: "#",
                description: `
                    <p>Given a positive integer <strong>N</strong>. An integer <strong>K</strong> with <strong>N</strong> digits is called a "Distant Number" if it satisfies the following conditions:</p>
                    <ul>
                        <li><strong>K</strong> does not contain the digit 0.</li>
                        <li>All digits from <strong>1</strong> to <strong>N</strong> appear in <strong>K</strong> exactly once.</li>
                        <li>No two adjacent digits in <strong>K</strong> have a difference of exactly 1 (i.e., |a[i] - a[i+1]| ≠ 1).</li>
                    </ul>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing the integer <strong>N</strong>.</li>
                    </ul>
                    
                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print all satisfying numbers in <strong>increasing order</strong>.</li>
                        <li>Each number should be printed on a new line.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>0 ≤ N ≤ 9</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Distant Numbers
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;

int n;
int x[1000];
bool used[1000];

void result() {
    for(int i = 1; i <= n; i++) {
        cout<<x[i];
    }
    cout<<endl;
}

void Try(int i) {
    for(int j = 1; j <= n; j++) {
        if(used[j] == false && abs(j - x[i - 1]) != 1) {
            x[i] = j;
            used[j] = true;
            if(i == n) {
                result();
            } else {
                Try(i + 1);
            }
            used[j] = false;
        }
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    cin>>n;
    x[0] = -1;
    Try(1);
}`,
                examples: [
                    { input: "4", output: "2413\n3142", explain: "For N=4, strictly increasing permutations where no adjacent digits have difference of 1." },
                    { input: "3", output: "", explain: "For N=3, there are no permutations satisfying the condition." }
                ],
                testCases: [
                    { input: "0", expectedOutput: "" },
                    { input: "1", expectedOutput: "1" },
                    { input: "2", expectedOutput: "" },
                    { input: "3", expectedOutput: "" },
                    { input: "4", expectedOutput: "2413\n3142" },
                    { input: "5", expectedOutput: "13524\n14253\n24135\n24153\n25314\n31425\n31524\n35142\n35241\n41352\n42513\n42531\n52413\n53142" }
                ]
            }
        ]
    },

    // -------------------------------------------------------------------------
    // CHAPTER 3: DYNAMIC PROGRAMMING
    // -------------------------------------------------------------------------
    {
        id: 3,
        title: "Dynamic Programming",
        problems: [
            {
                lcNumber: 509,
                customId: 1,
                title: "Fibonacci Number",
                difficulty: "easy",
                tags: ["Dynamic Programming", "Math", "Memoization"],
                lcUrl: "https://leetcode.com/problems/fibonacci-number/",
                description: `
                    <p>The <strong>Fibonacci numbers</strong>, commonly denoted F(n) form a sequence, called the <strong>Fibonacci sequence</strong>, such that each number is the sum of the two preceding ones, starting from 0 and 1.</p>
                    <p>That is:</p>
                    <ul>
                        <li>F(0) = 0</li>
                        <li>F(1) = 1</li>
                        <li>F(n) = F(n - 1) + F(n - 2), for n > 1.</li>
                    </ul>

                    <p>Given an integer n, calculate F(n).</p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single integer <strong>n</strong>.</li>
                    </ul>
                    
                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print the value of F(n).</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>0 ≤ n ≤ 92 (Result fits in a 64-bit signed integer)</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Fibonacci Number
#include <bits/stdc++.h>
using namespace std;

// Using Iteration (Optimized Space)
// Time Complexity: O(n)
// Space Complexity: O(1)

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    if (!(cin >> n)) return 0;

    if (n == 0) {
        cout << 0;
        return 0;
    }
    if (n == 1) {
        cout << 1;
        return 0;
    }

    long long prev2 = 0; // F(i-2)
    long long prev1 = 1; // F(i-1)
    long long current = 0;

    for (int i = 2; i <= n; i++) {
        current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }

    cout << current;
    return 0;
}`,
                examples: [
                    { input: "2", output: "1", explain: "F(2) = F(1) + F(0) = 1 + 0 = 1." },
                    { input: "3", output: "2", explain: "F(3) = F(2) + F(1) = 1 + 1 = 2." },
                    { input: "4", output: "3", explain: "F(4) = F(3) + F(2) = 2 + 1 = 3." }
                ],
                timeComplexity: "O(n)",
                spaceComplexity: "O(1)",
                testCases: [
                    { input: "0", expectedOutput: "0" },
                    { input: "1", expectedOutput: "1" },
                    { input: "2", expectedOutput: "1" },
                    { input: "3", expectedOutput: "2" },
                    { input: "4", expectedOutput: "3" },
                    { input: "5", expectedOutput: "5" },
                    { input: "6", expectedOutput: "8" },
                    { input: "7", expectedOutput: "13" },
                    { input: "8", expectedOutput: "21" },
                    { input: "9", expectedOutput: "34" },
                    { input: "10", expectedOutput: "55" },
                    { input: "11", expectedOutput: "89" },
                    { input: "12", expectedOutput: "144" },
                    { input: "13", expectedOutput: "233" },
                    { input: "14", expectedOutput: "377" },
                    { input: "15", expectedOutput: "610" },
                    { input: "16", expectedOutput: "987" },
                    { input: "17", expectedOutput: "1597" },
                    { input: "18", expectedOutput: "2584" },
                    { input: "19", expectedOutput: "4181" },
                    { input: "20", expectedOutput: "6765" },
                    { input: "21", expectedOutput: "10946" },
                    { input: "22", expectedOutput: "17711" },
                    { input: "23", expectedOutput: "28657" },
                    { input: "24", expectedOutput: "46368" },
                    { input: "25", expectedOutput: "75025" },
                    { input: "26", expectedOutput: "121393" },
                    { input: "27", expectedOutput: "196418" },
                    { input: "28", expectedOutput: "317811" },
                    { input: "29", expectedOutput: "514229" },
                    { input: "30", expectedOutput: "832040" },
                    { input: "31", expectedOutput: "1346269" },
                    { input: "32", expectedOutput: "2178309" },
                    { input: "33", expectedOutput: "3524578" },
                    { input: "34", expectedOutput: "5702887" },
                    { input: "35", expectedOutput: "9227465" },
                    { input: "36", expectedOutput: "14930352" },
                    { input: "37", expectedOutput: "24157817" },
                    { input: "38", expectedOutput: "39088169" },
                    { input: "39", expectedOutput: "63245986" },
                    { input: "40", expectedOutput: "102334155" },
                    { input: "41", expectedOutput: "165580141" },
                    { input: "42", expectedOutput: "267914296" },
                    { input: "43", expectedOutput: "433494437" },
                    { input: "44", expectedOutput: "701408733" },
                    { input: "45", expectedOutput: "1134903170" },
                    { input: "46", expectedOutput: "1836311903" },
                    { input: "80", expectedOutput: "23416728348467685" },
                    { input: "85", expectedOutput: "259695496911122585" },
                    { input: "92", expectedOutput: "7540113804746346429" }
                ]
            }
        ]
    }
];

/**
 * =============================================================================
 * EXPORT
 * =============================================================================
 */
if (typeof CHAPTERS === 'undefined' || !Array.isArray(CHAPTERS)) {
    console.error('CHAPTERS data is invalid!');
}

if (typeof window !== 'undefined') {
    window.CHAPTERS = CHAPTERS;
}