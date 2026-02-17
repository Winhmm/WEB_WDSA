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
    },

    // -------------------------------------------------------------------------
    // CHAPTER 4: String
    // -------------------------------------------------------------------------

    {
        id: 4,
        title: "String",
        problems:[
            {
                lcNumber: 2006,
                customId: 1,
                link: "https://drive.google.com/file/d/1P-u3q_0tJHxUuFvQYTLhGkHQ5AxkO1D6/view?usp=sharing",
                title: "Middle Digit of a Number",
                difficulty: "easy",
                tags: ["Math", "String"],
                description: `
                    <p>Given a non-negative integer <strong>N</strong>, determine the <strong>middle digit</strong> of N.</p>
                    
                    <ul>
                        <li>If N has an <strong>odd number of digits</strong>, print the middle digit.</li>
                        <li>If N has an <strong>even number of digits</strong>, print <strong>"NOT FOUND"</strong>.</li>
                    </ul>

                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing a non-negative integer N.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>0 ≤ N ≤ 10<sup>18</sup></li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print the middle digit of N or <strong>NOT FOUND</strong> if it does not exist.</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Middle Digit of a Number
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;

int main() {
	ios_base::sync_with_stdio(false);
    cin.tie(NULL);
	
	string s;
	cin>>s;
	
	if(s.size() % 2 == 0) {
		cout<<"NOT FOUND";
		return 0;
	}
	
	int middleIndex = s.size() / 2;
	cout<<s[middleIndex];
}`,
                examples: [
                    { 
                        input: "12345", 
                        output: "3", 
                        explain: "Explanation: The number has 5 digits (odd), so the middle digit is 3." 
                    },
                    { 
                        input: "2213", 
                        output: "NOT FOUND", 
                        explain: "Explanation: The number has 4 digits (even), so there is no middle digit." 
                    },
                    { 
                        input: "999996472", 
                        output: "9", 
                        explain: "Explanation: The number has 9 digits, so the middle digit is the 5th digit, which is 9." 
                    }
                ],
                testCases: [
                    { input: "0", expectedOutput: "0" },
                    { input: "5", expectedOutput: "5" },
                    { input: "7", expectedOutput: "7" },
                    { input: "11", expectedOutput: "NOT FOUND" },
                    { input: "12", expectedOutput: "NOT FOUND" },
                    { input: "13", expectedOutput: "NOT FOUND" },
                    { input: "1001", expectedOutput: "NOT FOUND" },
                    { input: "12321", expectedOutput: "3" },
                    { input: "123321", expectedOutput: "NOT FOUND" },
                    { input: "987654321", expectedOutput: "5" },
                    { input: "11111", expectedOutput: "1" },
                    { input: "222222", expectedOutput: "NOT FOUND" },
                    { input: "101", expectedOutput: "0" },
                    { input: "222", expectedOutput: "2" },
                    { input: "345", expectedOutput: "4" },
                    { input: "909", expectedOutput: "0" },
                    { input: "12345", expectedOutput: "3" },
                    { input: "10001", expectedOutput: "0" },
                    { input: "54321", expectedOutput: "3" },
                    { input: "99999", expectedOutput: "9" },
                    { input: "10000", expectedOutput: "0" },
                    { input: "45678", expectedOutput: "6" },
                    { input: "80808", expectedOutput: "8" },
                    { input: "13579", expectedOutput: "5" },
                    { input: "24680", expectedOutput: "6" },
                    { input: "100001", expectedOutput: "NOT FOUND" },
                    { input: "500005", expectedOutput: "NOT FOUND" },
                    { input: "1234567", expectedOutput: "4" },
                    { input: "7654321", expectedOutput: "4" },
                    { input: "999999", expectedOutput: "NOT FOUND" },
                    { input: "1515151", expectedOutput: "5" },
                    { input: "1616161", expectedOutput: "6" },
                    { input: "1717171", expectedOutput: "7" },
                    { input: "1212121", expectedOutput: "2" },
                    { input: "1313131", expectedOutput: "3" },
                    { input: "1414141", expectedOutput: "4" },
                    { input: "600006", expectedOutput: "NOT FOUND" },
                    { input: "700007", expectedOutput: "NOT FOUND" },
                    { input: "800008", expectedOutput: "NOT FOUND" },
                    { input: "900009", expectedOutput: "NOT FOUND" },
                    { input: "110011", expectedOutput: "NOT FOUND" },
                    { input: "1000000", expectedOutput: "0" },
                    { input: "1200000", expectedOutput: "0" },
                    { input: "1999999", expectedOutput: "9" },
                    { input: "5000000", expectedOutput: "0" },
                    { input: "333333", expectedOutput: "NOT FOUND" },
                    { input: "123432", expectedOutput: "NOT FOUND" },
                    { input: "4999994", expectedOutput: "9" },
                    { input: "2222222", expectedOutput: "2" },
                    { input: "3333333", expectedOutput: "3" },
                    { input: "4444444", expectedOutput: "4" },
                    { input: "2000002", expectedOutput: "0" },
                    { input: "2345432", expectedOutput: "5" },
                    { input: "3456543", expectedOutput: "6" },
                    { input: "4567654", expectedOutput: "7" }
                ]
            },
            {
                lcNumber: 2007,
                customId: 2,
                title: "Custom String Operations",
                link: "https://drive.google.com/file/d/1bgvsVBFj7V25TveTSY7RLg0-Vq0uZtM4/view?usp=sharing",
                difficulty: "easy",
                tags: ["String", "Implementation"],
                description: `
                    <p>Given a string <strong>S</strong> containing at most 10,000 characters. The string <strong>S</strong> may consist of uppercase letters, lowercase letters, digits, and special characters.</p>
                    <p>Your task is to write 3 custom functions to:</p>
                    <ol>
                        <li>Reverse the string <strong>S</strong>.</li>
                        <li>Convert the string <strong>S</strong> to lowercase.</li>
                        <li>Convert the string <strong>S</strong> to uppercase.</li>
                    </ol>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing the string <strong>S</strong>.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 &le; length of S &le; 10000</li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>Line 1: Print the <strong>reversed</strong> string.</li>
                        <li>Line 2: Print the string in <strong>lowercase</strong>.</li>
                        <li>Line 3: Print the string in <strong>uppercase</strong>.</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Custom String Operations
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;

int main() {
	ios_base::sync_with_stdio(false);
    cin.tie(NULL);
	
	string s;
	cin>>s;
	
	for(auto it = s.rbegin(); it != s.rend(); it++) {
		cout<<*it;
	}
	cout<<endl;
	
	for(char &x : s) {
		if(isalpha(x)) {
			x = tolower(x);
		}
	}
	
	cout<<s<<endl;
	
	for(char &x : s) {
		if(isalpha(x)) {
			x = toupper(x);
		}
	}
	
	cout<<s<<endl;	
}`,
                examples: [
                    { 
                        input: "hjweXafgbDeGxEa", 
                        output: "aExGeDbgfaXewjh\nhjwexafgbdegxea\nHJWEXAFGBDEGXEA", 
                        explain: "Explanation: The first line is the string reversed. The second is entirely lowercase, and the third is entirely uppercase." 
                    }
                ],
                testCases: [
                    { input: "hjweXafgbDeGxEa", expectedOutput: "aExGeDbgfaXewjh\nhjwexafgbdegxea\nHJWEXAFGBDEGXEA" },
                    { input: "hjweXafgbDeGxEa", expectedOutput: "aExGeDbgfaXewjh\nhjwexafgbdegxea\nHJWEXAFGBDEGXEA" },
                    { input: "AbC123", expectedOutput: "321CbA\nabc123\nABC123" },
                    { input: "a123", expectedOutput: "321a\na123\nA123" },
                    { input: "Z123", expectedOutput: "321Z\nz123\nZ123" },
                    { input: "1234567890", expectedOutput: "0987654321\n1234567890\n1234567890" },
                    { input: "HelloWORLD", expectedOutput: "DLROWolleH\nhelloworld\nHELLOWORLD" },
                    { input: "x123", expectedOutput: "321x\nx123\nX123" },
                    { input: "a1B2c3D4e5", expectedOutput: "5e4D3c2B1a\na1b2c3d4e5\nA1B2C3D4E5" },
                    { input: "CODE", expectedOutput: "EDOC\ncode\nCODE" },
                    { input: "ptit", expectedOutput: "titp\nptit\nPTIT" },
                    { input: "Python3", expectedOutput: "3nohtyP\npython3\nPYTHON3" },
                    { input: "AaBbCcDdEe", expectedOutput: "eEdDcCbBaA\naabbccddee\nAABBCCDDEE" },
                    { input: "1a2B3c4D", expectedOutput: "D4c3B2a1\n1a2b3c4d\n1A2B3C4D" },
                    { input: "zZ123", expectedOutput: "321Zz\nzz123\nZZ123" },
                ]
            },
            {
                lcNumber: 2009,
                customId: 3,
                title: "Sum of Digits in a String",
                link: "https://drive.google.com/file/d/1t3i6reTEFFiuyklE3FwoC9vcB6hViGqc/view?usp=sharing",
                difficulty: "easy",
                tags: ["String", "Math"],
                lcUrl: "#",
                description: `
                    <p>Given a string <strong>S</strong> consisting only of alphanumeric characters (letters and digits). Your task is to calculate the total sum of all the digits appearing in the string.</p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing the string <strong>S</strong>.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 &le; length of S &le; 10000</li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print a single integer: the sum of the digits in the string.</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Sum of Digits in a String
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;


int main() {
	ios_base::sync_with_stdio(false);
    cin.tie(NULL);
	
	string s;
	cin>>s;
	int tong = 0;
	
	for(char x : s) {
		if(isdigit(x)) {
			tong += x - '0';
		}
	}
	
	cout<<tong;
}`,
                examples: [
                    { 
                        input: "28tech28techtechdsacpp", 
                        output: "20", 
                        explain: "Explanation: The digits present in the string are 2, 8, 2, and 8. Their sum is 2 + 8 + 2 + 8 = 20." 
                    }
                ],

                testCases: [
                    { input: "28tech28techtechdsacpp", expectedOutput: "20" },
                    { input: "abc", expectedOutput: "0" },
                    { input: "12345", expectedOutput: "15" },
                    { input: "a1b2c3d4e5", expectedOutput: "15" },
                    { input: "00000", expectedOutput: "0" },
                    { input: "999", expectedOutput: "27" },
                    { input: "HelloWorld", expectedOutput: "0" },
                    { input: "1a2b3c", expectedOutput: "6" },
                    { input: "A10B20", expectedOutput: "3" },
                    { input: "z9y8x7", expectedOutput: "24" },
                    { input: "9876543210", expectedOutput: "45" },
                    { input: "a0b0c0", expectedOutput: "0" },
                    { input: "7", expectedOutput: "7" },
                    { input: "Z", expectedOutput: "0" },
                    { input: "1111111111", expectedOutput: "10" },
                    { input: "55555", expectedOutput: "25" },
                    { input: "a1", expectedOutput: "1" },
                    { input: "1a", expectedOutput: "1" },
                    { input: "A1b2C3d4E5f6G7h8I9j0", expectedOutput: "45" },
                    { input: "9a9b9c9", expectedOutput: "36" },
                    { input: "x0y0z0", expectedOutput: "0" },
                    { input: "CODE1234PTIT", expectedOutput: "10" },
                    { input: "2023", expectedOutput: "7" },
                    { input: "abc123def456", expectedOutput: "21" },
                    { input: "qwertyuiop", expectedOutput: "0" },
                    { input: "123456789", expectedOutput: "45" },
                    { input: "m1n2o3p4q5", expectedOutput: "15" },
                    { input: "99a99", expectedOutput: "36" },
                    { input: "b1c2d3", expectedOutput: "6" },
                    { input: "x9y9z9", expectedOutput: "27" },
                    { input: "5a5b5c5", expectedOutput: "20" },
                    { input: "0123456789", expectedOutput: "45" },
                    { input: "test0case", expectedOutput: "0" },
                    { input: "t3stc4s3", expectedOutput: "10" },
                    { input: "0a0b0c0d", expectedOutput: "0" },
                    { input: "1000000000", expectedOutput: "1" },
                    { input: "987000", expectedOutput: "24" },
                    { input: "abc999def", expectedOutput: "27" },
                    { input: "1x2y3z", expectedOutput: "6" },
                    { input: "314159", expectedOutput: "23" },
                    { input: "271828", expectedOutput: "28" },
                    { input: "161803", expectedOutput: "19" },
                    { input: "602214", expectedOutput: "15" },
                    { input: "a1a1a1", expectedOutput: "3" },
                    { input: "b2b2b2", expectedOutput: "6" },
                    { input: "c3c3c3", expectedOutput: "9" },
                    { input: "d4d4d4", expectedOutput: "12" },
                    { input: "e5e5e5", expectedOutput: "15" },
                    { input: "f6f6f6", expectedOutput: "18" },
                    { input: "g7g7g7", expectedOutput: "21" }
                ]
            },
            {
                lcNumber: 2010,
                customId: 4,
                title: "Beautiful Number",
                link: "https://drive.google.com/file/d/1c1_5QbZbDlq2sNOvlwaUbjTb5VvSgck-/view?usp=sharing",
                difficulty: "easy",
                tags: ["String", "Math"],
                lcUrl: "#",
                description: `
                    <p>Given a positive integer <strong>N</strong> with at least 2 digits. A number is considered a <strong>"beautiful number"</strong> if the absolute difference between every two adjacent digits is exactly 1.</p>
                    <p>Examples of beautiful numbers: 12345, 121212, 78987.</p>
                    <p>Your task is to check if <strong>N</strong> is a beautiful number.</p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing the positive integer <strong>N</strong>.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>10 &le; N &le; 10<sup>18</sup></li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print <strong>YES</strong> if N is a beautiful number, otherwise print <strong>NO</strong>.</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Beautiful Number
#include <bits/stdc++.h>
using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    
    string s;
    if (cin >> s) {
        bool isBeautiful = true;
        for (size_t i = 1; i < s.length(); i++) {
            // Check if the absolute difference between adjacent digits is exactly 1
            if (abs(s[i] - s[i - 1]) != 1) {
                isBeautiful = false;
                break;
            }
        }
        
        if (isBeautiful) {
            cout << "YES";
        } else {
            cout << "NO";
        }
    }
    return 0;
}`,
                examples: [
                    { 
                        input: "244", 
                        output: "NO", 
                        explain: "Explanation: The difference between 2 and 4 is 2 (not 1), and the difference between 4 and 4 is 0 (not 1)." 
                    },
                    { 
                        input: "1232", 
                        output: "YES", 
                        explain: "Explanation: |1-2|=1, |2-3|=1, and |3-2|=1. All adjacent digits differ by exactly 1." 
                    }
                ],
                timeComplexity: "O(L)",
                spaceComplexity: "O(1)",
                testCases: [
                    { input: "244", expectedOutput: "NO" },
                    { input: "1232", expectedOutput: "YES" },
                    { input: "98", expectedOutput: "YES" },
                    { input: "11", expectedOutput: "NO" },
                    { input: "10", expectedOutput: "YES" },
                    { input: "90", expectedOutput: "NO" },
                    { input: "101", expectedOutput: "YES" },
                    { input: "121", expectedOutput: "YES" },
                    { input: "123", expectedOutput: "YES" },
                    { input: "321", expectedOutput: "YES" },
                    { input: "111", expectedOutput: "NO" },
                    { input: "124", expectedOutput: "NO" },
                    { input: "987", expectedOutput: "YES" },
                    { input: "989", expectedOutput: "YES" },
                    { input: "1234", expectedOutput: "YES" },
                    { input: "4321", expectedOutput: "YES" },
                    { input: "1212", expectedOutput: "YES" },
                    { input: "2345", expectedOutput: "YES" },
                    { input: "5432", expectedOutput: "YES" },
                    { input: "1235", expectedOutput: "NO" },
                    { input: "1223", expectedOutput: "NO" },
                    { input: "12345", expectedOutput: "YES" },
                    { input: "54321", expectedOutput: "YES" },
                    { input: "12121", expectedOutput: "YES" },
                    { input: "78987", expectedOutput: "YES" },
                    { input: "98789", expectedOutput: "YES" },
                    { input: "12346", expectedOutput: "NO" },
                    { input: "10101", expectedOutput: "YES" },
                    { input: "10123", expectedOutput: "YES" },
                    { input: "10100", expectedOutput: "NO" },
                    { input: "123456", expectedOutput: "YES" },
                    { input: "654321", expectedOutput: "YES" },
                    { input: "121212", expectedOutput: "YES" },
                    { input: "123454", expectedOutput: "YES" },
                    { input: "898989", expectedOutput: "YES" },
                    { input: "898988", expectedOutput: "NO" },
                    { input: "1234567", expectedOutput: "YES" },
                    { input: "7654321", expectedOutput: "YES" },
                    { input: "1212121", expectedOutput: "YES" },
                    { input: "9876543", expectedOutput: "YES" },
                    { input: "1234568", expectedOutput: "NO" },
                    { input: "12345678", expectedOutput: "YES" },
                    { input: "87654321", expectedOutput: "YES" },
                    { input: "123456789", expectedOutput: "YES" },
                    { input: "987654321", expectedOutput: "YES" },
                    { input: "1234567890", expectedOutput: "NO" },
                    { input: "101010101010101010", expectedOutput: "YES" },
                    { input: "123456789876543210", expectedOutput: "YES" },
                    { input: "23456789876543212", expectedOutput: "YES" },
                    { input: "12121212121212121", expectedOutput: "YES" },
                    { input: "12121212121212122", expectedOutput: "NO" },
                    { input: "12321232123212321", expectedOutput: "YES" },
                    { input: "54545454545454545", expectedOutput: "YES" },
                    { input: "98765456789876567", expectedOutput: "YES" },
                    { input: "989898989898989870", expectedOutput: "NO" },
                ]
            },
            {
                lcNumber: 2011,
                customId: 5,
                title: "Format Number with Commas",
                link: "https://drive.google.com/file/d/1GnksqNe8MEFC-mau6MAnjAQlo1n_QwH_/view?usp=sharing",
                difficulty: "easy",
                tags: ["String", "Implementation"],
                lcUrl: "#",
                description: `
                    <p>When writing a very large positive integer, people often add commas between the digits to make it easier to read.</p>
                    <p>For example: the number <strong>N = 123456789</strong> is written as <strong>123,456,789</strong>, and <strong>N = 12345</strong> is written as <strong>12,345</strong>.</p>
                    <p>Your task is to properly insert commas into the given number <strong>N</strong>.</p>
                    
                    <p><em>Hint: Iterate through the string representation of N from right to left. Append the characters to a result string, and keep a counter. Every time you count 3 characters (and it's not the last character), append a comma. Finally, reverse the result string.</em></p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing the positive integer <strong>N</strong>.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 &le; N &le; 10<sup>18</sup></li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print the number <strong>N</strong> formatted with commas.</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Format Number with Commas
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;


int main() {
	ios_base::sync_with_stdio(false);
    cin.tie(NULL);
	
	string s;
	cin>>s;
	int dem = 0;
	string res = "";

	for(int i = s.size() - 1; i >= 0; i--) {
		res += s[i];
		++dem;
		if(dem % 3 == 0 && i != 0) {
			res += ",";
		}
	}

	reverse(res.begin(), res.end());
	cout<<res;
}`,
                examples: [
                    { 
                        input: "999970094", 
                        output: "999,970,094", 
                        explain: "Explanation: Commas are added every 3 digits from the right." 
                    },
                    { 
                        input: "12345", 
                        output: "12,345", 
                        explain: "Explanation: Commas are added every 3 digits from the right." 
                    }
                ],
                timeComplexity: "O(L)",
                spaceComplexity: "O(L)",
                testCases: [
                    { input: "999970094", expectedOutput: "999,970,094" },
                    { input: "12345", expectedOutput: "12,345" },
                    { input: "1", expectedOutput: "1" },
                    { input: "12", expectedOutput: "12" },
                    { input: "123", expectedOutput: "123" },
                    { input: "1234", expectedOutput: "1,234" },
                    { input: "1000", expectedOutput: "1,000" },
                    { input: "123456", expectedOutput: "123,456" },
                    { input: "1000000", expectedOutput: "1,000,000" },
                    { input: "9876543210", expectedOutput: "9,876,543,210" },
                    { input: "1000000000000000000", expectedOutput: "1,000,000,000,000,000,000" },
                    { input: "987654321987654321", expectedOutput: "987,654,321,987,654,321" },
                    { input: "50", expectedOutput: "50" },
                    { input: "500", expectedOutput: "500" },
                    { input: "10000000", expectedOutput: "10,000,000" },
                    { input: "10000000000000000", expectedOutput: "10,000,000,000,000,000" },
                    { input: "1234567890123456", expectedOutput: "1,234,567,890,123,456" },
                    { input: "999999", expectedOutput: "999,999" },
                    { input: "100000", expectedOutput: "100,000" },
                    { input: "314159265358979323", expectedOutput: "314,159,265,358,979,323" }
                ]
            },
            {
                lcNumber: 2012,
                customId: 6,
                title: "Sort Digits",
                link: "https://drive.google.com/file/d/1lGV36O_Dd7B_Dwqq6Ka8hmfsA9cf6D5r/view?usp=sharing",
                difficulty: "easy",
                tags: ["String", "Sorting", "Math"],
                lcUrl: "#",
                description: `
                    <p>Given a non-negative integer <strong>N</strong>, sort its digits in ascending order and print the resulting number.</p>
                    <p>If the number contains leading zeros after sorting, do not print these meaningless leading zeros.</p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing the non-negative integer <strong>N</strong>.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>0 &le; N &le; 10<sup>18</sup></li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print the number <strong>N</strong> after sorting its digits without meaningless leading zeros.</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Sort Digits
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;


int main() {
	ios_base::sync_with_stdio(false);
    cin.tie(NULL);
	
	string s;
	cin>>s;
	sort(s.begin(), s.end());
	string res = "";
	
	for(char x : s) {
		if(x != '0') {
			res += x;
		}
	}
	
	if(res.empty()) {
		cout<<0;
	} else {
		cout<<res;
	}
}`,
                examples: [
                    { 
                        input: "999968677", 
                        output: "667789999", 
                        explain: "Explanation: The digits sorted in ascending order are 6, 6, 7, 7, 8, 9, 9, 9, 9." 
                    },
                    { 
                        input: "2828000", 
                        output: "2288", 
                        explain: "Explanation: After sorting, we get 0002288. Removing the meaningless leading zeros gives 2288." 
                    }
                ],
                timeComplexity: "O(L log L)",
                spaceComplexity: "O(L)",
                testCases: [
                    { input: "999968677", expectedOutput: "667789999" },
                    { input: "2828000", expectedOutput: "2288" },
                    { input: "0", expectedOutput: "0" },
                    { input: "100", expectedOutput: "1" },
                    { input: "543210", expectedOutput: "12345" },
                    { input: "123", expectedOutput: "123" },
                    { input: "987654321", expectedOutput: "123456789" },
                    { input: "101010", expectedOutput: "111" },
                    { input: "80808080", expectedOutput: "8888" },
                    { input: "1000000000000000000", expectedOutput: "1" },
                    { input: "400400400", expectedOutput: "444" },
                    { input: "11111", expectedOutput: "11111" },
                    { input: "909090909", expectedOutput: "99999" },
                    { input: "200200200", expectedOutput: "222" },
                    { input: "1234567890", expectedOutput: "123456789" },
                    { input: "987650", expectedOutput: "56789" },
                    { input: "50005", expectedOutput: "55" },
                    { input: "102030", expectedOutput: "123" },
                    { input: "998877665544332211", expectedOutput: "112233445566778899" },
                    { input: "100000000000000000", expectedOutput: "1" }
                ]
            },
            {
                lcNumber: 2013,
                customId: 7,
                title: "Separate Digits and Letters",
                link: "https://drive.google.com/file/d/1dSBvwXbwgWzBTCwNq4plp9O1WwzTU1zw/view?usp=sharing",
                difficulty: "easy",
                tags: ["String", "Implementation"],
                lcUrl: "#",
                description: `
                    <p>Given a string <strong>S</strong> consisting of letters and digits, your task is to separate the digits and the letters from the string.</p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing the string <strong>S</strong>.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 &le; length of S &le; 10000</li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>Line 1: Print all the digits appearing in <strong>S</strong> in their original order.</li>
                        <li>Line 2: Print all the letters appearing in <strong>S</strong> in their original order.</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Separate Digits and Letters
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;


int main() {
	ios_base::sync_with_stdio(false);
    cin.tie(NULL);
	
	string s;
	cin>>s;
	
	string res1 = "";
	string res2 = "";
	
	for(char x : s) {
		if(isdigit(x)) {
			res1 += x;
		} else if(isalpha(x)) {
			res2 += x;
		}
	}
	
	cout<<res1<<endl<<res2;
}`,
                examples: [
                    { 
                        input: "28tech2828techcpp", 
                        output: "282828\ntechtechcpp", 
                        explain: "Explanation: The digits in the string are extracted in order to form '282828', and the letters are extracted to form 'techtechcpp'." 
                    }
                ],
                timeComplexity: "O(L)",
                spaceComplexity: "O(L)",
                testCases: [
                    { input: "28tech2828techcpp", expectedOutput: "282828\ntechtechcpp" },
                    { input: "abc123def456", expectedOutput: "123456\nabcdef" },
                    { input: "12345", expectedOutput: "12345\n" },
                    { input: "abcdef", expectedOutput: "\nabcdef" },
                    { input: "a1b2c3d4e5", expectedOutput: "12345\nabcde" },
                    { input: "9876543210", expectedOutput: "9876543210\n" },
                    { input: "Z", expectedOutput: "\nZ" },
                    { input: "0", expectedOutput: "0\n" },
                    { input: "HelloWorld2024", expectedOutput: "2024\nHelloWorld" },
                    { input: "A10B20C30", expectedOutput: "102030\nABC" },
                    { input: "x9y8z7", expectedOutput: "987\nxyz" },
                    { input: "000aaa000", expectedOutput: "000000\naaa" },
                    { input: "test0case", expectedOutput: "0\ntestcase" },
                    { input: "1a1a1a1a", expectedOutput: "1111\naaaa" },
                    { input: "CODE1234PTIT", expectedOutput: "1234\nCODEPTIT" },
                    { input: "2023ptit", expectedOutput: "2023\nptit" },
                    { input: "m1n2o3p4q5", expectedOutput: "12345\nmnopq" },
                    { input: "99a99b", expectedOutput: "9999\nab" },
                    { input: "x9y9z9", expectedOutput: "999\nxyz" },
                    { input: "5a5b5c5", expectedOutput: "5555\nabc" },
                    { input: "A1B2C3D4E5F6G7H8I9J0", expectedOutput: "1234567890\nABCDEFGHIJ" },
                    { input: "onlyletters", expectedOutput: "\nonlyletters" },
                    { input: "1357924680", expectedOutput: "1357924680\n" },
                    { input: "aA1bB2cC3", expectedOutput: "123\naAbBcC" },
                    { input: "0a0b0c0d", expectedOutput: "0000\nabcd" },
                    { input: "100000000000000000", expectedOutput: "100000000000000000\n" },
                    { input: "a1a1a1a1a1", expectedOutput: "11111\naaaaa" },
                    { input: "abc999def", expectedOutput: "999\nabcdef" },
                    { input: "1x2y3z", expectedOutput: "123\nxyz" },
                    { input: "t3stc4s3", expectedOutput: "343\ntstcs" }
                ]
            },
            {
                lcNumber: 2014,
                customId: 8,
                title: "Insert Substring",
                link: "https://drive.google.com/file/d/17bODW3tf4ZGn6HM9f2ye7A1WCpzw0mGH/view?usp=sharing",
                difficulty: "easy",
                tags: ["String", "Implementation"],
                lcUrl: "#",
                description: `
                    <p>Given a string <strong>S</strong> and an integer <strong>K</strong>. You are required to insert the string <strong>"wdsa"</strong> into <strong>S</strong> exactly at index <strong>K</strong>.</p>
                    <p><em>Note: The string is 0-indexed, meaning the insertion happens just before the character currently at index K.</em></p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>Line 1: Contains the string <strong>S</strong>.</li>
                        <li>Line 2: Contains the integer <strong>K</strong>.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 &le; length of S &le; 10000</li>
                        <li>0 &le; K &lt; length of S</li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print the string <strong>S</strong> after inserting "wdsa".</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Insert Substring
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;


int main() {
	ios_base::sync_with_stdio(false);
    cin.tie(NULL);
	
	string s;
	int k;
	cin>>s>>k;
	s.insert(k, "wdsa");
	cout<<s;
}`,
                examples: [
                    { 
                        input: "ClhiSYBOSg5Re\n10", 
                        output: "ClhiSYBOSgwdsa5Re", 
                        explain: "Explanation: The character at index 10 is '5'. We insert 'wdsa' right before '5', resulting in 'ClhiSYBOSgwdsa5Re'." 
                    }
                ],
                timeComplexity: "O(L)",
                spaceComplexity: "O(L)",
                testCases: [
                    { input: "ClhiSYBOSg5Re\n10", expectedOutput: "ClhiSYBOSgwdsa5Re" },
                    { input: "abc\n0", expectedOutput: "wdsaabc" },
                    { input: "abc\n1", expectedOutput: "awdsabc" },
                    { input: "abc\n2", expectedOutput: "abwdsac" },
                    { input: "a\n0", expectedOutput: "wdsaa" },
                    { input: "programming\n3", expectedOutput: "prowdsagramming" },
                    { input: "1234567890\n9", expectedOutput: "123456789wdsa0" },
                    { input: "testcase\n4", expectedOutput: "testwdsacase" },
                    { input: "28tech\n2", expectedOutput: "28wdsatech" },
                    { input: "HelloWorld\n5", expectedOutput: "HellowdsaWorld" },
                    { input: "Cplusplus\n1", expectedOutput: "Cwdsaplusplus" },
                    { input: "data\n0", expectedOutput: "wdsadata" },
                    { input: "structures\n9", expectedOutput: "structurewdsas" },
                    { input: "algorithm\n4", expectedOutput: "algowdsarithm" },
                    { input: "xyz\n2", expectedOutput: "xywdsaz" },
                    { input: "javascript\n4", expectedOutput: "javawdsascript" },
                    { input: "python\n3", expectedOutput: "pytwdsahon" },
                    { input: "competitve\n6", expectedOutput: "competwdsaitve" },
                    { input: "insert\n3", expectedOutput: "inswdsaert" },
                    { input: "A\n0", expectedOutput: "wdsaA" }
                ]
            },
            {
                lcNumber: 2015,
                customId: 9,
                title: "Teo Hates \"wdsa\"",
                link: "https://drive.google.com/file/d/17bODW3tf4ZGn6HM9f2ye7A1WCpzw0mGH/view?usp=sharing",
                difficulty: "easy",
                tags: ["String", "Implementation"],
                lcUrl: "#",
                description: `
                    <p>Teo hates the word <strong>"wdsa"</strong> because he thinks it gives him too many difficult exercises that cause headaches.</p>
                    <p>Because of this, he hates all the individual characters that appear in the word "wdsa" (i.e., 'w', 'd', 's', and 'a'). Teo wants your help to delete <strong>all occurrences of these characters</strong> from a given string <strong>S</strong>.</p>
                    <p>If the string <strong>S</strong> becomes completely empty after the deletion, you must print <strong>EMPTY</strong>.</p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing the string <strong>S</strong>.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 &le; length of S &le; 10000</li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print the string <strong>S</strong> after deleting the characters, or print <strong>EMPTY</strong> if no characters are left.</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Teo Hates "wdsa"
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;


int main() {
	ios_base::sync_with_stdio(false);
    cin.tie(NULL);
	
	string s;
	cin>>s;
	string res = "";
	
	for(char x : s) {
		if(x != 'w' && x != 'd' && x != 's' && x != 'a') {
			res += x;
		}
	}
	
	if(res == "") {
		cout<<"EMPTY";
		return 0;
	}
	cout<<res;
}`,
                examples: [
                    { 
                        input: "wdsacpp288", 
                        output: "cpp288", 
                        explain: "Explanation: The characters 'w', 'd', 's', and 'a' are removed from the string, leaving 'cpp288'." 
                    },
                    { 
                        input: "wdsa", 
                        output: "EMPTY", 
                        explain: "Explanation: All characters in the string are removed, so the output is EMPTY." 
                    }
                ],
                timeComplexity: "O(L)",
                spaceComplexity: "O(L)",
                testCases: [
                    { input: "wdsacpp288", expectedOutput: "cpp288" },
                    { input: "wdsa", expectedOutput: "EMPTY" },
                    { input: "awdsawdsa", expectedOutput: "EMPTY" },
                    { input: "hello", expectedOutput: "hello" },
                    { input: "world", expectedOutput: "orl" },
                    { input: "w", expectedOutput: "EMPTY" },
                    { input: "d", expectedOutput: "EMPTY" },
                    { input: "s", expectedOutput: "EMPTY" },
                    { input: "a", expectedOutput: "EMPTY" },
                    { input: "12345", expectedOutput: "12345" },
                    { input: "w1d2s3a4", expectedOutput: "1234" },
                    { input: "WdSa", expectedOutput: "WS" },
                    { input: "WWDDSSAA", expectedOutput: "WWDDSSAA" },
                    { input: "aassddww", expectedOutput: "EMPTY" },
                    { input: "wdsawdsawdsaxyz", expectedOutput: "xyz" },
                    { input: "xwyzd", expectedOutput: "xyz" },
                    { input: "testing", expectedOutput: "teting" },
                    { input: "apple", expectedOutput: "pple" },
                    { input: "software", expectedOutput: "oftre" },
                    { input: "data", expectedOutput: "t" },
                    { input: "algorithm", expectedOutput: "lgorithm" },
                    { input: "structures", expectedOutput: "tructure" },
                    { input: "javascript", expectedOutput: "jvcript" },
                    { input: "python", expectedOutput: "python" },
                    { input: "cpp", expectedOutput: "cpp" },
                    { input: "competitive", expectedOutput: "competitive" },
                    { input: "programming", expectedOutput: "progrmming" },
                    { input: "wds", expectedOutput: "EMPTY" },
                    { input: "dsa", expectedOutput: "EMPTY" },
                    { input: "awd", expectedOutput: "EMPTY" }
                ]
            },
            {
                lcNumber: 2016,
                customId: 10,
                title: "First Repeated Character",
                difficulty: "easy",
                tags: ["String", "Hash Table"],
                lcUrl: "#",
                description: `
                    <p>Given a string <strong>S</strong>, your task is to find the first repeated character in the string. The "first repeated character" is the first character you encounter while reading from left to right that has already appeared earlier in the string.</p>
                    <p>If the string <strong>S</strong> does not contain any repeated characters, print <strong>NONE</strong>.</p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing the string <strong>S</strong>.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 &le; length of S &le; 10000</li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print the first repeated character, or <strong>NONE</strong> if all characters are unique.</li>
                    </ul>
                `,
                sampleSolution: `// Solution for First Repeated Character
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;


int main() {
	ios_base::sync_with_stdio(false);
    cin.tie(NULL);
	
	string s;
	cin>>s;
	set<char> se;
	
	for(char x : s) {
		if(se.count(x)) {
			cout<<x;
			return 0;
		}
		se.insert(x);
	}
	
	cout<<"NONE";
}`,
                examples: [
                    { 
                        input: "5nLQokt1QgU7nnn5", 
                        output: "Q", 
                        explain: "Explanation: Reading from left to right, the character 'Q' appears for the second time before 'n' or '5' appear again. So 'Q' is the first repeated character." 
                    }
                ],
                timeComplexity: "O(L)",
                spaceComplexity: "O(1)",
                testCases: [
                    { input: "5nLQokt1QgU7nnn5", expectedOutput: "Q" },
                    { input: "abcdef", expectedOutput: "NONE" },
                    { input: "aab", expectedOutput: "a" },
                    { input: "aba", expectedOutput: "a" },
                    { input: "abcba", expectedOutput: "b" },
                    { input: "abcdeff", expectedOutput: "f" },
                    { input: "12345678901", expectedOutput: "1" },
                    { input: "zZ", expectedOutput: "NONE" },
                    { input: "programming", expectedOutput: "r" },
                    { input: "hello", expectedOutput: "l" },
                    { input: "world", expectedOutput: "NONE" },
                    { input: "algorithm", expectedOutput: "NONE" },
                    { input: "datastructures", expectedOutput: "a" },
                    { input: "javascript", expectedOutput: "a" },
                    { input: "python3", expectedOutput: "NONE" },
                    { input: "cplusplus", expectedOutput: "p" },
                    { input: "developer", expectedOutput: "e" },
                    { input: "competitive", expectedOutput: "t" },
                    { input: "abcCBA", expectedOutput: "NONE" },
                    { input: "12345678900", expectedOutput: "0" },
                    { input: "11234567890", expectedOutput: "1" },
                    { input: "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz", expectedOutput: "a" },
                    { input: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ", expectedOutput: "NONE" },
                    { input: "teotungtang", expectedOutput: "t" },
                    { input: "x", expectedOutput: "NONE" },
                    { input: "xx", expectedOutput: "x" },
                    { input: "123123", expectedOutput: "1" },
                    { input: "qwertyuiopasdfghjklzxcvbnmq", expectedOutput: "q" },
                    { input: "!@#$%^&*()!@#", expectedOutput: "!" },
                    { input: "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZzA", expectedOutput: "A" }
                ]
            },
            {
                lcNumber: 2017,
                customId: 11,
                title: "Standardize Date of Birth",
                link: "https://drive.google.com/file/d/1jpASFH8WC7jswDD4gGc4-QK5Nx9r-hvm/view?usp=sharing",
                difficulty: "easy",
                tags: ["String", "Implementation"],
                lcUrl: "#",
                description: `
                    <p>Given a person's date of birth in the format <strong>day/month/year</strong>. Your task is to standardize this date of birth to the exact <strong>dd/mm/yyyy</strong> format.</p>
                    <p>For example: if the date of birth is <code>1/10/2002</code>, it should be standardized to <code>01/10/2002</code>. If it is <code>5/2/2002</code>, it should be standardized to <code>05/02/2002</code>.</p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing a string that describes the date of birth.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>The day, month, and year are separated by the <code>/</code> character.</li>
                        <li>The year is always guaranteed to be a 4-digit number.</li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print the standardized date of birth.</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Standardize Date of Birth
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;


int main() {
	ios_base::sync_with_stdio(false);
    cin.tie(NULL);
	
	string s;
	cin>>s;
	
	if(s[2] != '/') {
		s.insert(0, 1, '0');
	}
	
	if(s[5] != '/') {
		s.insert(3, 1, '0');
	}
	
	cout<<s;
}`,
                examples: [
                    { 
                        input: "30/7/1991", 
                        output: "30/07/1991", 
                        explain: "Explanation: The month '7' is missing a leading zero. We add '0' to make it '07'." 
                    },
                    { 
                        input: "5/2/2002", 
                        output: "05/02/2002", 
                        explain: "Explanation: Both the day '5' and month '2' need a leading zero. The standardized date becomes '05/02/2002'." 
                    }
                ],
                timeComplexity: "O(1)",
                spaceComplexity: "O(1)",
                testCases: [
                    { input: "30/7/1991", expectedOutput: "30/07/1991" },
                    { input: "1/10/2002", expectedOutput: "01/10/2002" },
                    { input: "5/2/2002", expectedOutput: "05/02/2002" },
                    { input: "15/10/2005", expectedOutput: "15/10/2005" },
                    { input: "1/1/2000", expectedOutput: "01/01/2000" },
                    { input: "5/12/1999", expectedOutput: "05/12/1999" },
                    { input: "9/9/9999", expectedOutput: "09/09/9999" },
                    { input: "29/2/2024", expectedOutput: "29/02/2024" },
                    { input: "31/1/2023", expectedOutput: "31/01/2023" },
                    { input: "2/11/2022", expectedOutput: "02/11/2022" },
                    { input: "10/1/1990", expectedOutput: "10/01/1990" },
                    { input: "1/11/1991", expectedOutput: "01/11/1991" },
                    { input: "12/3/1980", expectedOutput: "12/03/1980" },
                    { input: "3/12/1980", expectedOutput: "03/12/1980" },
                    { input: "9/10/1000", expectedOutput: "09/10/1000" },
                    { input: "10/9/2000", expectedOutput: "10/09/2000" },
                    { input: "1/2/3000", expectedOutput: "01/02/3000" },
                    { input: "20/2/2020", expectedOutput: "20/02/2020" },
                    { input: "7/7/1777", expectedOutput: "07/07/1777" },
                    { input: "8/8/1888", expectedOutput: "08/08/1888" },
                    { input: "31/12/2099", expectedOutput: "31/12/2099" },
                    { input: "1/12/2100", expectedOutput: "01/12/2100" },
                    { input: "12/1/2200", expectedOutput: "12/01/2200" },
                    { input: "4/4/2004", expectedOutput: "04/04/2004" },
                    { input: "14/4/2014", expectedOutput: "14/04/2014" },
                    { input: "9/11/2001", expectedOutput: "09/11/2001" },
                    { input: "11/9/2001", expectedOutput: "11/09/2001" },
                    { input: "22/2/2022", expectedOutput: "22/02/2022" },
                    { input: "6/8/1995", expectedOutput: "06/08/1995" },
                    { input: "25/5/1985", expectedOutput: "25/05/1985" }
                ]
            },
            {
                lcNumber: 2018,
                customId: 12,
                title: "Count Uppercase Words",
                link: "https://drive.google.com/file/d/1qkUusePCYz438deFPg1skXphUMXkQOWE/view?usp=sharing",
                difficulty: "easy",
                tags: ["String", "Counting"],
                lcUrl: "#",
                description: `
                    <p>Given a string <strong>S</strong> consisting of English letters and spaces. Your task is to count the number of <strong>fully uppercase words</strong> in the string.</p>
                    <p><em>Note: A word is considered "fully uppercase" if every single character in that word is an uppercase letter.</em></p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing the string <strong>S</strong>.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 &le; length of S &le; 10000</li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print a single integer: the count of fully uppercase words in the string.</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Count Uppercase Words
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;

bool check(string s) {
	for(char x : s) {
		if(!isupper(x)) {
			return false;
		}
	}
	return true;
}

int main() {
	ios_base::sync_with_stdio(false);
    cin.tie(NULL);
	
	string s;
	int dem = 0;
	while(cin>>s) {
		if(check(s)) {
			++dem;
		}
	}
	
	cout<<dem;
}`,
                examples: [
                    { 
                        input: "Tech Dev DSA CPP", 
                        output: "2", 
                        explain: "Explanation: There are 4 words in total. 'DSA' and 'CPP' are fully uppercase words, so the output is 2." 
                    },
                    { 
                        input: "HELLO WORLD", 
                        output: "2", 
                        explain: "Explanation: Both 'HELLO' and 'WORLD' are fully uppercase." 
                    }
                ],
                timeComplexity: "O(L)",
                spaceComplexity: "O(L)",
                testCases: [
                    { input: "Tech Dev DSA CPP", expectedOutput: "2" },
                    { input: "HELLO WORLD", expectedOutput: "2" },
                    { input: "hello world", expectedOutput: "0" },
                    { input: "THIS is A test STRING", expectedOutput: "3" },
                    { input: "ONE TWO THREE FOUR FIVE", expectedOutput: "5" },
                    { input: "one TWO three FOUR five", expectedOutput: "2" },
                    { input: "ONLY", expectedOutput: "1" },
                    { input: "only", expectedOutput: "0" },
                    { input: "MixedCase Word HERE", expectedOutput: "1" },
                    { input: "I love CPLUSPLUS", expectedOutput: "2" },
                    { input: "A B C D E F", expectedOutput: "6" },
                    { input: "a b c d e f", expectedOutput: "0" },
                    { input: "The QUICK brown FOX jumps OVER the LAZY DOG", expectedOutput: "5" },
                    { input: "a A b B c C", expectedOutput: "3" },
                    { input: "PROGRAMMING is FUN", expectedOutput: "2" },
                    { input: "no UPPER case words HERE", expectedOutput: "2" },
                    { input: "ABC def GHI jkl MNO", expectedOutput: "3" },
                    { input: "abc DEF ghi JKL mno", expectedOutput: "2" },
                    { input: "I AM A STUDENT", expectedOutput: "4" },
                    { input: "i am a student", expectedOutput: "0" },
                    { input: "lowercase UPPERCASE", expectedOutput: "1" },
                    { input: "UPPERCASE lowercase", expectedOutput: "1" },
                    { input: "word WORD Word wORd WorD", expectedOutput: "1" },
                    { input: "X y Z", expectedOutput: "2" },
                    { input: "Aa Bb Cc Dd", expectedOutput: "0" },
                    { input: "AA BB CC DD", expectedOutput: "4" },
                    { input: "aa bb cc dd", expectedOutput: "0" },
                    { input: "SOME words ARE upper SOME are LOWER", expectedOutput: "4" },
                    { input: "XYZ", expectedOutput: "1" },
                    { input: "a b c D E F g h i J K L", expectedOutput: "6" }
                ]
            },
            {
                lcNumber: 2019,
                customId: 13,
                title: "Extract Words",
                link: "https://drive.google.com/file/d/1ydV8jUFMKxEjXKA1RqVWwtEmlFfwvAXz/view?usp=sharing",
                difficulty: "easy",
                tags: ["String", "Parsing"],
                lcUrl: "#",
                description: `
                    <p>Given a string <strong>S</strong> consisting of multiple words. The words are separated by spaces or punctuation marks including: <code>.</code>, <code>,</code>, <code>!</code>, <code>?</code>.</p>
                    <p>Your task is to extract and list all the words that appear in the string, separated by a single space.</p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing the string <strong>S</strong>.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 &le; length of S &le; 10000</li>
                        <li><strong>S</strong> only contains English letters, spaces, and the specified punctuation marks (., !, ?).</li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>List all the words in the string, separated by a single space.</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Extract Words
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;


int main() {
	ios_base::sync_with_stdio(false);
    cin.tie(NULL);
	
	string s;
	getline(cin, s);
	
	for(char &x : s) {
		if(x == '.' || x == ',' || x == '!' || x == '?') {
			x = ' ';
		}
	}
	
	stringstream ss(s);
	string res = "";
	while(ss>>res) {
		cout<<res<<" ";
	}
}`,
                examples: [
                    { 
                        input: "oSAz ?oiiaz iSaSz SDA ,bbW oWA AIIia .", 
                        output: "oSAz oiiaz iSaSz SDA bbW oWA AIIia", 
                        explain: "Explanation: Punctuation marks '?', ',', and '.' are treated as separators along with spaces. The extracted words are printed with a single space between them." 
                    }
                ],
                timeComplexity: "O(L)",
                spaceComplexity: "O(L)",
                testCases: [
                    { input: "oSAz ?oiiaz iSaSz SDA ,bbW oWA AIIia .", expectedOutput: "oSAz oiiaz iSaSz SDA bbW oWA AIIia" },
                    { input: "Hello, world!", expectedOutput: "Hello world" },
                    { input: "a.b,c!d?e", expectedOutput: "a b c d e" },
                    { input: "C is fun, right?", expectedOutput: "C is fun right" },
                    { input: "Wait... What?!", expectedOutput: "Wait What" },
                    { input: "apple, banana, cherry.", expectedOutput: "apple banana cherry" },
                    { input: "no punctuations here", expectedOutput: "no punctuations here" },
                    { input: " , . ! ? ", expectedOutput: "" },
                    { input: "A! B? C, D.", expectedOutput: "A B C D" },
                    { input: "   Leading and trailing   ", expectedOutput: "Leading and trailing" },
                    { input: "Multiple,,,commas...here", expectedOutput: "Multiple commas here" },
                    { input: "Word.Word,Word!Word?Word", expectedOutput: "Word Word Word Word Word" },
                    { input: "JustOneWord", expectedOutput: "JustOneWord" },
                    { input: "?!?!?!", expectedOutput: "" },
                    { input: "a B c D e F", expectedOutput: "a B c D e F" },
                    { input: "test.case,number!sixteen?", expectedOutput: "test case number sixteen" },
                    { input: "A.B.C.D.E", expectedOutput: "A B C D E" },
                    { input: "Z", expectedOutput: "Z" },
                    { input: "hello...world!!!", expectedOutput: "hello world" },
                    { input: ",start with comma", expectedOutput: "start with comma" },
                    { input: "end with period.", expectedOutput: "end with period" },
                    { input: "question mark? inside", expectedOutput: "question mark inside" },
                    { input: "exclamation! mark", expectedOutput: "exclamation mark" },
                    { input: "mix . of , everything ! here ?", expectedOutput: "mix of everything here" },
                    { input: "a,b.c?d!e,f.g?h!i", expectedOutput: "a b c d e f g h i" },
                    { input: "one.two.three.four.five.six", expectedOutput: "one two three four five six" },
                    { input: "ALL UPPERCASE. WORDS, HERE!", expectedOutput: "ALL UPPERCASE WORDS HERE" },
                    { input: "all lowercase. words, here!", expectedOutput: "all lowercase words here" },
                    { input: "  a  ,  b  .  c  ?  d  !  ", expectedOutput: "a b c d" },
                    { input: "   ?   .   ,   !   Word   ", expectedOutput: "Word" }
                ]
            },
            {
                lcNumber: 2020,
                customId: 14,
                title: "Ti Loves \"wdsa\"",
                link: "https://drive.google.com/file/d/1uX4RiacKsZAXoxdcu4WR_RQNM5-5HPSJ/view?usp=sharing",
                difficulty: "easy",
                tags: ["String", "Counting"],
                lcUrl: "#",
                description: `
                    <p>Although they are best friends, Ti and Teo are very different when it comes to <strong>"wdsa"</strong>. Unlike Teo, Ti really loves "wdsa".</p>
                    <p>Therefore, Ti asks you to count how many times the word <strong>"wdsa"</strong> appears in a given string <strong>S</strong>.</p>
                    <p><em>Note: The counting must be <strong>case-insensitive</strong>. This means words like <code>WDsa</code>, <code>wDsA</code>, <code>WdSa</code>, etc., are all accepted as valid occurrences of "wdsa".</em></p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing the string <strong>S</strong>.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 &le; length of S &le; 10000</li>
                        <li>Words are separated by spaces.</li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print a single integer: the number of times the word "wdsa" (case-insensitive) appears in the string.</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Ti Loves "wdsa"
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;


int main() {
	ios_base::sync_with_stdio(false);
    cin.tie(NULL);
	
	string s;
	int dem = 0;
	
	while(cin>>s) {
		for(char &x : s) {
			x = tolower(x);
		}
		if(s == "wdsa") {
			++dem;
		}
	}
	
	cout<<dem;
}`,
                examples: [
                    { 
                        input: "zzA WdSa AAAa AAW Dobc czo wDsA zIo bic", 
                        output: "2", 
                        explain: "Explanation: The words 'WdSa' and 'wDsA' both match 'wdsa' case-insensitively. They appear 2 times in total." 
                    }
                ],
                timeComplexity: "O(L)",
                spaceComplexity: "O(L)",
                testCases: [
                    { input: "zzA WdSa AAAa AAW Dobc czo wDsA zIo bic", expectedOutput: "2" },
                    { input: "wdsa WDSA WdSa wDsA wdsA Wdsa", expectedOutput: "6" },
                    { input: "hello world wdsa", expectedOutput: "1" },
                    { input: "no match here wds dsa awdsa wdsawdsa", expectedOutput: "0" },
                    { input: "wdsa wdsa wdsa", expectedOutput: "3" },
                    { input: "WDSA", expectedOutput: "1" },
                    { input: "WdsA", expectedOutput: "1" },
                    { input: "wDSA", expectedOutput: "1" },
                    { input: "wdsa", expectedOutput: "1" },
                    { input: "Wdsa wDsa wdSa wdsA", expectedOutput: "4" },
                    { input: "I love WDSA very much", expectedOutput: "1" },
                    { input: "Teo hates wdsa but Ti loves wDsA", expectedOutput: "2" },
                    { input: "a b c d e f g wdsa", expectedOutput: "1" },
                    { input: "W D S A wdsa w d s a", expectedOutput: "1" },
                    { input: "WDSAwdsa", expectedOutput: "0" },
                    { input: "wdsa_is_great", expectedOutput: "0" },
                    { input: "learning wdsa everyday wDsA", expectedOutput: "2" },
                    { input: "WDSA WDSA WDSA WDSA", expectedOutput: "4" },
                    { input: "wdsA Wdsa wDSA WdSA wdSa wDsA WdsA WDsa", expectedOutput: "8" },
                    { input: "just random words here nothing to see", expectedOutput: "0" },
                    { input: "w d s a wd sa w dsa", expectedOutput: "0" },
                    { input: "wdsa", expectedOutput: "1" },
                    { input: "WDsA WDsA WDsA", expectedOutput: "3" },
                    { input: "this is WDSA testing wDsa", expectedOutput: "2" },
                    { input: "awdsa wdsaw wdsa", expectedOutput: "1" },
                    { input: "wDsa! wdsa? wdsa.", expectedOutput: "0" }, // Dấu câu liền vào từ sẽ làm từ đó khác "wdsa", output 0 là đúng chuẩn C++ cin >> word
                    { input: "1234 wdsa 5678", expectedOutput: "1" },
                    { input: "wdsawdsa wdsawdsa wdsawdsa", expectedOutput: "0" },
                    { input: "WDSA is not wdsaawdsa it is just wdsa", expectedOutput: "2" },
                    { input: "W D S A wdsa WDSA wdsa", expectedOutput: "3" }
                ]
            },
            {
                lcNumber: 2021,
                customId: 15,
                title: "Reverse Words at Even Positions",
                link: "https://drive.google.com/file/d/16WrvVG5gz_di_ZJ31OqyZ9HG2Awh7sJF/view?usp=sharing",
                difficulty: "easy",
                tags: ["String", "Implementation"],
                lcUrl: "#",
                description: `
                    <p>Given a string <strong>S</strong> containing multiple words separated by one or more spaces.</p>
                    <p>Your task is to process the words based on their positions (1-indexed):</p>
                    <ul>
                        <li>If a word is at an <strong>odd position</strong> (1st, 3rd, 5th, etc.), print it exactly as it is.</li>
                        <li>If a word is at an <strong>even position</strong> (2nd, 4th, 6th, etc.), you must <strong>reverse</strong> the word before printing it.</li>
                    </ul>
                    <p><em>Note: The words in the final output must be separated by exactly one single space.</em></p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing the string <strong>S</strong>.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 &le; length of S &le; 10000</li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print the processed words separated by a single space.</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Reverse Words at Even Positions
#include <bits/stdc++.h>
using namespace std;

int main() {
	string s;
	int dem = 0;
	while(cin>>s) {
		++dem;
		if(dem % 2 != 0) {
			cout<<s<<" ";
		} else {
			reverse(s.begin(), s.end());
			cout<<s<<" ";
		}
	}
return 0;
}`,
                examples: [
                    { 
                        input: "bWo    ziD cWS DIi    bzA zADzi aIio", 
                        output: "bWo Diz cWS iID bzA izDAz aIio", 
                        explain: "Explanation: \nWord 1: 'bWo' (odd) -> 'bWo'\nWord 2: 'ziD' (even) -> reversed to 'Diz'\nWord 3: 'cWS' (odd) -> 'cWS'\nWord 4: 'DIi' (even) -> reversed to 'iID'\nAnd so on." 
                    }
                ],
                timeComplexity: "O(L)",
                spaceComplexity: "O(L)",
                testCases: [
                    { input: "bWo    ziD cWS DIi    bzA zADzi aIio", expectedOutput: "bWo Diz cWS iID bzA izDAz aIio" },
                    { input: "hello world", expectedOutput: "hello dlrow" },
                    { input: "one two three four five", expectedOutput: "one owt three ruof five" },
                    { input: "ab cd ef gh", expectedOutput: "ab dc ef hg" },
                    { input: "abc def ghi jkl", expectedOutput: "abc fed ghi lkj" },
                    { input: "onlyoneword", expectedOutput: "onlyoneword" },
                    { input: "   leading and trailing spaces   ", expectedOutput: "leading dna trailing secaps" },
                    { input: "123 456 789 000", expectedOutput: "123 654 789 000" },
                    { input: "apple banana orange kiwi", expectedOutput: "apple ananab orange iwik" },
                    { input: "cplusplus java python javascript", expectedOutput: "cplusplus avaj python tpircsavaj" },
                    { input: "I love competitive programming", expectedOutput: "I evol competitive gnimmargorp" },
                    { input: "a bc def ghij klmno", expectedOutput: "a cb def jihg klmno" },
                    { input: "1 22 333 4444 55555", expectedOutput: "1 22 333 4444 55555" },
                    { input: "xyz zyx abc cba", expectedOutput: "xyz xyz abc abc" },
                    { input: "reverse THIS string NOW", expectedOutput: "reverse SIHT string WON" },
                    { input: "Hello    World   Test   Case", expectedOutput: "Hello dlroW Test esaC" },
                    { input: "  first second   third fourth  fifth ", expectedOutput: "first dnoces third htruof fifth" },
                    { input: "one", expectedOutput: "one" },
                    { input: "two words", expectedOutput: "two sdrow" },
                    { input: "ABC DEF GHI JKL MNO PQR STU", expectedOutput: "ABC FED GHI LKJ MNO RQP STU" },
                    { input: "1234 5678", expectedOutput: "1234 8765" },
                    { input: "a b c d e f g h i j", expectedOutput: "a b c d e f g h i j" },
                    { input: "W X Y Z", expectedOutput: "W X Y Z" },
                    { input: "odd EVEN odd EVEN odd", expectedOutput: "odd NEVE odd NEVE odd" },
                    { input: "test1 test2 test3 test4", expectedOutput: "test1 2tset test3 4tset" },
                ]
            },
            {
                lcNumber: 2022,
                customId: 16,
                title: "Sort Characters in a String",
                link: "https://drive.google.com/file/d/1Nzi3qJe0qAXqoGUjdq7swDFuXn2HVi_r/view?usp=sharing",
                difficulty: "easy",
                tags: ["String", "Sorting"],
                lcUrl: "#",
                description: `
                    <p>Given a string <strong>S</strong>. Your task is to sort the characters in the string in <strong>lexicographically ascending</strong> order and then in <strong>lexicographically descending</strong> order, and print both results.</p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing the string <strong>S</strong>.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 &le; length of S &le; 1000</li>
                        <li><strong>S</strong> contains only alphanumeric characters (uppercase letters, lowercase letters, and digits).</li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>Line 1: Print the string <strong>S</strong> after sorting its characters in <strong>ascending</strong> order.</li>
                        <li>Line 2: Print the string <strong>S</strong> after sorting its characters in <strong>descending</strong> order.</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Sort Characters in a String
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;
int main() {
	
	string s;
	cin>>s;
	sort(s.begin(), s.end());
	cout<<s;
	cout<<endl;
	sort(s.rbegin(), s.rend());
	cout<<s;
	
return 0;
}`,
                examples: [
                    { 
                        input: "wFJvCFumWtOt7U", 
                        output: "7CFFJOUWmttuvw\nwvuttmWUOJFFC7", 
                        explain: "Explanation: Digits come before uppercase letters, and uppercase letters come before lowercase letters in ASCII/lexicographical order." 
                    }
                ],
                timeComplexity: "O(L log L)",
                spaceComplexity: "O(1)",
                testCases: [
                    { input: "wFJvCFumWtOt7U", expectedOutput: "7CFFJOUWmttuvw\nwvuttmWUOJFFC7" },
                    { input: "abc", expectedOutput: "abc\ncba" },
                    { input: "cba", expectedOutput: "abc\ncba" },
                    { input: "a", expectedOutput: "a\na" },
                    { input: "Z", expectedOutput: "Z\nZ" },
                    { input: "123", expectedOutput: "123\n321" },
                    { input: "321", expectedOutput: "123\n321" },
                    { input: "aA1", expectedOutput: "1Aa\naA1" },
                    { input: "hello", expectedOutput: "ehllo\nollhe" },
                    { input: "WORLD", expectedOutput: "DLORW\nWROLD" },
                    { input: "programming", expectedOutput: "aggimmnoprr\nrrponmmigga" },
                    { input: "1a2b3c", expectedOutput: "123abc\ncba321" },
                    { input: "zZ", expectedOutput: "Zz\nzZ" },
                    { input: "0000", expectedOutput: "0000\n0000" },
                    { input: "aaaa", expectedOutput: "aaaa\naaaa" },
                    { input: "AaBbCc", expectedOutput: "ABCabc\ncbaCBA" },
                    { input: "9876543210", expectedOutput: "0123456789\n9876543210" },
                    { input: "TestCASE123", expectedOutput: "123ACESTest\ntseTSECA321" },
                    { input: "python3", expectedOutput: "3hnopty\nytponh3" },
                    { input: "CodePTIT2024", expectedOutput: "0224CIPTTdeo\noedTTPIC4220" },
                    { input: "AbCdEfGh1234", expectedOutput: "1234ACEGbdfh\nhfdbGECA4321" },
                    { input: "xYz12XyZ", expectedOutput: "12XYZxyz\nzyxZYX21" },
                    { input: "aB3dE2", expectedOutput: "23BEad\ndaEB32" },
                    { input: "algorithm", expectedOutput: "aghilmort\ntromlihga" },
                    { input: "Data123", expectedOutput: "123Daat\ntaaD321" },
                    { input: "ZzZz00", expectedOutput: "00ZZzz\nzzZZ00" },
                    { input: "a1b2c3d4", expectedOutput: "1234abcd\ndcba4321" },
                    { input: "1q2w3e4r", expectedOutput: "1234eqrw\nwrqe4321" },
                    { input: "mNoPqR", expectedOutput: "NPRmoq\nqomRPN" },
                    { input: "Tien123xyz", expectedOutput: "123Teinxyz\nzyxnieT321" }
                ]
            },
            {
                lcNumber: 2023,
                customId: 17,
                title: "Sort Words by Length",
                link: "https://drive.google.com/file/d/1o55X2gsuGYKexfGu1B0lO1tTJES2syXC/view?usp=sharing",
                difficulty: "easy",
                tags: ["String", "Sorting"],
                lcUrl: "#",
                description: `
                    <p>Given a string <strong>S</strong> consisting of multiple words separated by one or more spaces.</p>
                    <p>Your task is to sort the words in the string based on their <strong>length in ascending order</strong>. If two words have the exact same length, they should be sorted in <strong>lexicographically ascending order</strong>.</p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing the string <strong>S</strong>.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 &le; length of S &le; 10000</li>
                        <li><strong>S</strong> contains only alphanumeric characters (letters and digits) and spaces.</li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print the words after sorting, separated by a single space.</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Sort Words by Length
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;

bool cmp(string x, string y) {
	if(x.size() != y.size()) {
		return x.size() < y.size();
	}
	return x < y;
}

int main() {
	
	string s;
	vector<string> v;
	
	while(cin>>s) {
		v.push_back(s);
	}
	
	sort(v.begin(), v.end(), cmp);
	for(string x : v) {
		cout<<x<<" ";
	}
}`,
                examples: [
                    { 
                        input: "28tech dev c", 
                        output: "c dev 28tech", 
                        explain: "Explanation:\n- 'c' has length 1.\n- 'dev' has length 3.\n- '28tech' has length 6.\nSorted by length: c -> dev -> 28tech." 
                    }
                ],
                timeComplexity: "O(W log W * L)", // W = number of words, L = max length of a word
                spaceComplexity: "O(N)", // N = length of the string
                testCases: [
                    { input: "28tech dev c", expectedOutput: "c dev 28tech" },
                    { input: "apple banana cherry date", expectedOutput: "date apple banana cherry" },
                    { input: "a b c d e f", expectedOutput: "a b c d e f" },
                    { input: "aa bb cc dd ee ff", expectedOutput: "aa bb cc dd ee ff" },
                    { input: "python java c cpp js ruby", expectedOutput: "c js cpp java ruby python" },
                    { input: "code ptit 2024 ptit 2023", expectedOutput: "2023 2024 code ptit ptit" },
                    { input: "zz yyy xxxx w", expectedOutput: "w zz yyy xxxx" },
                    { input: "abc ab a", expectedOutput: "a ab abc" },
                    { input: "123 12 1 1234 12345", expectedOutput: "1 12 123 1234 12345" },
                    { input: "z y x c b a", expectedOutput: "a b c x y z" },
                    { input: "Hello World test case", expectedOutput: "case test Hello World" },
                    { input: "algorithm data structure", expectedOutput: "data algorithm structure" },
                    { input: "A B C AA BB CC AAA BBB CCC", expectedOutput: "A B C AA BB CC AAA BBB CCC" },
                    { input: "short longer longest", expectedOutput: "short longer longest" },
                    { input: "1 22 333 4444", expectedOutput: "1 22 333 4444" },
                    { input: "4444 333 22 1", expectedOutput: "1 22 333 4444" },
                    { input: "one two three four five six", expectedOutput: "one six two five four three" },
                    { input: "apple pie is very good", expectedOutput: "is pie good very apple" },
                    { input: "1a 2b 3c 1A 2B 3C", expectedOutput: "1A 1a 2B 2b 3C 3c" },
                    { input: "testing the sorting algorithm", expectedOutput: "the sorting testing algorithm" },
                    { input: "I am a student at PTIT", expectedOutput: "I a am at PTIT student" },
                    { input: "ab ba cd dc", expectedOutput: "ab ba cd dc" },
                    { input: "x xy xyz xyza", expectedOutput: "x xy xyz xyza" },
                    { input: "100 10 1 0", expectedOutput: "0 1 10 100" },
                    { input: "z zzz zz zzzz", expectedOutput: "z zz zzz zzzz" }
                ]
            },
            {
                lcNumber: 2024,
                customId: 18,
                title: "Count Unique Words",
                link: "https://drive.google.com/file/d/1e5qwaTaX3rxcPdVtq0wZ_dL3JNiLJOEf/view?usp=sharing",
                difficulty: "easy",
                tags: ["String", "Hash Table"],
                lcUrl: "#",
                description: `
                    <p>Given a string <strong>S</strong> consisting of multiple words separated by one or more spaces.</p>
                    <p>Your task is to count the number of <strong>unique words</strong> in the string. The counting should be <strong>case-insensitive</strong>. For example, "WdSa" and "wDsA" are considered the exact same word.</p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing the string <strong>S</strong>.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 &le; length of S &le; 10000</li>
                        <li><strong>S</strong> contains only alphanumeric characters (letters and digits) and spaces.</li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print a single integer representing the number of unique words (case-insensitive) in the string.</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Count Unique Words
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;
int main() {
	
	string s;
	set<string> se;
	while(cin>>s) {
		for(char &x : s) {
			x = tolower(x);
		}
		se.insert(s);
	}
	cout<<se.size();
	
return 0;
}`,
                examples: [
                    { 
                        input: "wdsa WDSA wDSA dev", 
                        output: "2", 
                        explain: "Explanation: After converting to lowercase, we have 'wdsa', 'wdsa', 'wdsa', and 'dev'. There are exactly 2 unique words: 'wdsa' and 'dev'." 
                    }
                ],
                timeComplexity: "O(L log W)", // L is the total length of the string, W is the number of words.
                spaceComplexity: "O(L)", // To store the unique words in the set
                testCases: [
                    { input: "wdsa WDSA wDSA dev", expectedOutput: "2" },
                    { input: "A a B b C c", expectedOutput: "3" },
                    { input: "Hello hello HeLlO", expectedOutput: "1" },
                    { input: "abc 123 ABC 123", expectedOutput: "2" },
                    { input: "one TWO three FOUR five", expectedOutput: "5" },
                    { input: "word", expectedOutput: "1" },
                    { input: "W w W w", expectedOutput: "1" },
                    { input: "1 1 1 1 1", expectedOutput: "1" },
                    { input: "123a 123A 123b", expectedOutput: "2" },
                    { input: "Python java C CPP JS Ruby", expectedOutput: "6" },
                    { input: "ptit PTIT Ptit pTiT", expectedOutput: "1" },
                    { input: "a B c D e F g H i J", expectedOutput: "10" },
                    { input: "Zebra zebra ZEBRA", expectedOutput: "1" },
                    { input: "test TEST Test test1", expectedOutput: "2" },
                    { input: "1a 1A 2b 2B 3c 3C", expectedOutput: "3" },
                    { input: "apple banana cherry date", expectedOutput: "4" },
                    { input: "mixed CASE words MIXED case WORDS", expectedOutput: "3" },
                    { input: "A b C d E f G h I j K l M n O p Q r S t U v W x Y z", expectedOutput: "26" },
                    { input: "Aa aA AA aa Bb bB BB bb", expectedOutput: "2" },
                    { input: "code ptit 2024 ptit 2023", expectedOutput: "4" },
                    { input: "same same same same same", expectedOutput: "1" },
                    { input: "D1ff3r3nt ca5e", expectedOutput: "2" },
                    { input: "Z zZ Zz zz", expectedOutput: "2" },
                    { input: "abc ABC aBc AbC abC", expectedOutput: "1" },
                    { input: "100 10 1 0", expectedOutput: "4" }
                ]
            },
            {
                lcNumber: 2025,
                customId: 19,
                title: "Sort Palindromic Words",
                link: "https://drive.google.com/file/d/14QJDvSbIE_t3eE96nOEgIGnjCK1B0w49/view?usp=sharing",
                difficulty: "easy",
                tags: ["String", "Sorting", "Two Pointers"],
                lcUrl: "#",
                description: `
                    <p>Given a string <strong>S</strong> consisting of multiple words separated by one or more spaces.</p>
                    <p>Your task is to extract all the <strong>palindromic words</strong> from the string, sort them in <strong>lexicographically ascending order</strong>, and print the result.</p>
                    <p><em>Note: A palindromic word is a word that reads the same forwards and backwards (e.g., "madam", "12321", "a"). The sorting is case-sensitive based on ASCII values. If a palindrome appears multiple times, print all its occurrences.</em></p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing the string <strong>S</strong>.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 &le; length of S &le; 10000</li>
                        <li><strong>S</strong> contains only alphanumeric characters (letters and digits) and spaces.</li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print the sorted palindromic words separated by a single space. If there are no palindromic words, print nothing.</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Sort Palindromic Words
#include <bits/stdc++.h>
using namespace std;

bool tn (string s){
    string lat = s;
    reverse (lat.begin(),lat.end());
    if (s == lat){
        return true;
    } else {
        return false;
    }
}

int main(){
    vector<string> v;
    string s;
    while (cin >> s){
        if (tn(s)){
            v.push_back(s);
        }
    }
    
    sort(v.begin(),v.end());
    
    for (string x : v){
        cout <<x<<" ";
    }
}`,
                examples: [
                    { 
                        input: "IAzbbzAI   ocoS iIA ccAAAAAAcc izzbb   aoI iIiAWWAiIi", 
                        output: "IAzbbzAI ccAAAAAAcc iIiAWWAiIi", 
                        explain: "Explanation: The palindromic words in the string are 'IAzbbzAI', 'ccAAAAAAcc', and 'iIiAWWAiIi'. After sorting them lexicographically, we get the output." 
                    }
                ],
                timeComplexity: "O(W \\log W \\cdot L)", // W = number of palindromes, L = max length
                spaceComplexity: "O(N)", // N = length of the string to store the array
                testCases: [
                    { input: "IAzbbzAI   ocoS iIA ccAAAAAAcc izzbb   aoI iIiAWWAiIi", expectedOutput: "IAzbbzAI ccAAAAAAcc iIiAWWAiIi" },
                    { input: "aba cba xyz zyz", expectedOutput: "aba zyz" },
                    { input: "a b c aa bb cc", expectedOutput: "a aa b bb c cc" },
                    { input: "hello world programming", expectedOutput: "" },
                    { input: "racecar level radar civic madam", expectedOutput: "civic level madam racecar radar" },
                    { input: "121 123 12321 22 33 45", expectedOutput: "121 12321 22 33" },
                    { input: "A a B b", expectedOutput: "A B a b" },
                    { input: "wow wow wow", expectedOutput: "wow wow wow" },
                    { input: "a aa aaa aaaa aaaaa", expectedOutput: "a aa aaa aaaa aaaaa" },
                    { input: "abcde edcba", expectedOutput: "" },
                    { input: "aBAca abcba", expectedOutput: "abcba" },
                    { input: "AaaA bBBb cCcc", expectedOutput: "AaaA bBBb" },
                    { input: "11 222 3333 44444", expectedOutput: "11 222 3333 44444" },
                    { input: "12321 121 11 1", expectedOutput: "1 11 121 12321" },
                    { input: "z y x w v u t s r q p o n m l k j i h g f e d c b a", expectedOutput: "a b c d e f g h i j k l m n o p q r s t u v w x y z" },
                    { input: "code ptit 2024 codeptit", expectedOutput: "" },
                    { input: "XYX ABBA QWERTY YTREWQ", expectedOutput: "ABBA XYX" },
                    { input: "0 00 000 0000", expectedOutput: "0 00 000 0000" },
                    { input: "1a1 2b2 3c3 4d4 5e5 5e5", expectedOutput: "1a1 2b2 3c3 4d4 5e5 5e5" },
                    { input: "z zz zzz zzzz zzzzz", expectedOutput: "z zz zzz zzzz zzzzz" },
                    { input: "noon rotator stats tenet", expectedOutput: "noon rotator stats tenet" },
                    { input: "AaA bBb cCc DdD EeE", expectedOutput: "AaA DdD EeE bBb cCc" },
                    { input: "1001 2002 3003 1010", expectedOutput: "1001 2002 3003" },
                    { input: "kayak deified repaper", expectedOutput: "deified kayak repaper" },
                    { input: "xyz zyx racecar aabaa test aabaa bob", expectedOutput: "aabaa aabaa bob racecar" }
                ]
            },
            {
                lcNumber: 2026,
                customId: 20,
                title: "Custom to_string Function",
                link: "https://drive.google.com/file/d/1kNufGZGkZ-WoJrdL0Bixlp1B7b7cl6nF/view?usp=sharing",
                difficulty: "easy",
                tags: ["String", "Math", "Implementation"],
                lcUrl: "#",
                description: `
                    <p>Given an integer <strong>N</strong>, your task is to convert it into a string representation.</p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>A single line containing the integer <strong>N</strong>.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>-10<sup>18</sup> &le; N &le; 10<sup>18</sup></li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print the string representation of the integer <strong>N</strong>.</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Custom to_string Function
#include <bits/stdc++.h>
using namespace std;

int main() {
	
	long long n;
	cin>>n;
	string s = to_string(n);
	cout<<s;
	
}`,
                examples: [
                    { 
                        input: "28282828282", 
                        output: "28282828282", 
                        explain: "Explanation: The integer 28282828282 is successfully converted to the string \"28282828282\" and printed." 
                    }
                ],
                timeComplexity: "O(\\log_{10}|N|)", // The number of digits in N
                spaceComplexity: "O(\\log_{10}|N|)", // The space required to store the string
                testCases: [
                    { input: "28282828282", expectedOutput: "28282828282" },
                    { input: "0", expectedOutput: "0" },
                    { input: "1", expectedOutput: "1" },
                    { input: "-1", expectedOutput: "-1" },
                    { input: "123456789", expectedOutput: "123456789" },
                    { input: "-123456789", expectedOutput: "-123456789" },
                    { input: "1000000000000000000", expectedOutput: "1000000000000000000" },
                    { input: "-1000000000000000000", expectedOutput: "-1000000000000000000" },
                    { input: "9223372036854775807", expectedOutput: "9223372036854775807" },
                    { input: "-9223372036854775808", expectedOutput: "-9223372036854775808" },
                    { input: "10", expectedOutput: "10" },
                    { input: "-10", expectedOutput: "-10" },
                    { input: "999999999999", expectedOutput: "999999999999" },
                    { input: "-999999999999", expectedOutput: "-999999999999" },
                    { input: "100", expectedOutput: "100" },
                    { input: "-100", expectedOutput: "-100" },
                    { input: "5050505050", expectedOutput: "5050505050" },
                    { input: "-5050505050", expectedOutput: "-5050505050" },
                    { input: "98765432101234567", expectedOutput: "98765432101234567" },
                    { input: "-98765432101234567", expectedOutput: "-98765432101234567" },
                    { input: "5", expectedOutput: "5" },
                    { input: "-5", expectedOutput: "-5" },
                    { input: "20242024", expectedOutput: "20242024" },
                    { input: "-20232023", expectedOutput: "-20232023" },
                    { input: "123000456000", expectedOutput: "123000456000" }
                ]
            },
            {
                lcNumber: 2027,
                customId: 21,
                title: "Char Array to String",
                link: "https://drive.google.com/file/d/19KF2NP6iGO0uFHHtMQChMghnnHGZrn8W/view?usp=sharing",
                difficulty: "easy",
                tags: ["String", "Array", "Implementation"],
                lcUrl: "#",
                description: `
                    <p>Given a char array <strong>A[]</strong> consisting of <strong>N</strong> characters, your task is to concatenate these characters to form a single string.</p>
                     
                    <strong>Input Format:</strong>
                    <ul>
                        <li>Line 1: An integer <strong>N</strong> representing the number of characters.</li>
                        <li>Line 2: <strong>N</strong> characters separated by a single space.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 &le; N &le; 10000</li>
                        <li>The characters in the array <strong>A[]</strong> are lowercase English letters or digits.</li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print the resulting concatenated string.</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Char Array to String
#include <bits/stdc++.h>
using namespace std;

int main() {
	
	int n;
	cin>>n;
	char a[n];
	string s = "";
	for(int i = 0; i < n; i++) {
		cin>>a[i];
		s += a[i];
	}
	cout<<s;
	
return 0;
}`,
                examples: [
                    { 
                        input: "4\nw d s a", 
                        output: "wdsa", 
                        explain: "Explanation: The characters 'w', 'd', 's', and 'a' are concatenated together to form the string 'wdsa'." 
                    }
                ],
                timeComplexity: "O(N)",
                spaceComplexity: "O(N)",
                testCases: [
                    { input: "6\n2 8 t e c h", expectedOutput: "28tech" },
                    { input: "1\na", expectedOutput: "a" },
                    { input: "5\n1 2 3 4 5", expectedOutput: "12345" },
                    { input: "10\na b c d e f g h i j", expectedOutput: "abcdefghij" },
                    { input: "4\nc o d e", expectedOutput: "code" },
                    { input: "4\np t i t", expectedOutput: "ptit" },
                    { input: "3\nc p p", expectedOutput: "cpp" },
                    { input: "7\nj a v a 1 2 3", expectedOutput: "java123" },
                    { input: "8\na l g o r i t h", expectedOutput: "algorith" },
                    { input: "2\nx y", expectedOutput: "xy" },
                    { input: "5\n0 0 0 0 0", expectedOutput: "00000" },
                    { input: "6\nx y z 1 2 3", expectedOutput: "xyz123" }
                ]
            }
        ]
    },

    // -------------------------------------------------------------------------
    // CHAPTER 5: DATA STRUCTURES
    // -------------------------------------------------------------------------

    {
        id: 5,
        title: "Vector",
        problems: [
            {
                lcNumber: 2100,
                customId: 1,
                title: "Push And Pop",
                difficulty: "easy",
                tags: ["Array", "Data Structure", "Implementation", "Vector"],
                lcUrl: "#",
                description: `
                    <p>You are given a vector and two types of operations:</p>
                    <ul>
                        <li><strong>Operation 1:</strong> Add an element to the end of the vector.</li>
                        <li><strong>Operation 2:</strong> Remove the last element from the vector (if the vector is not empty).</li>
                    </ul>
                    <p>Your task is to perform a series of these operations and print the vector after all operations are completed.</p>
                    
                    <strong>Input Format:</strong>
                    <ul>
                        <li>Line 1: An integer <strong>N</strong> representing the number of operations.</li>
                        <li>Next <strong>N</strong> lines: Each line describes an operation. If it is <strong>1</strong>, it will be followed by a space and the integer to be added. If it is <strong>2</strong>, it means remove the last element.</li>
                    </ul>

                    <strong>Constraints:</strong>
                    <ul>
                        <li>1 &le; N &le; 200</li>
                        <li>The elements added to the vector are 32-bit signed integers.</li>
                    </ul>

                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print <strong>EMPTY</strong> if the vector is empty. Otherwise, print the elements in the vector space-separated on a single line.</li>
                    </ul>
                `,
                sampleSolution: `// Solution for Vector Operations
#include <bits/stdc++.h>
using namespace std;
const int MOD = 1e9 + 7;


int main() {
	ios_base::sync_with_stdio(false);
    cin.tie(NULL);
	
	vector<int> v;
	int q;
	cin>>q;
	
	while(q--) {
		int t;
		cin>>t;
		if(t == 1) {
			int x;
			cin>>x;
			v.push_back(x);
		} else if(t == 2) {
			if(!v.empty()) {
				v.pop_back();
			}
		}
	}
	
	if(v.empty()) {
		cout<<"EMPTY";
	} else {
		for(int x : v) {
			cout<<x<<" ";
		}
	}
}`,
                examples: [
                    { 
                        input: "7\n1 58\n2\n2\n1 52\n1 81\n1 12\n1 2", 
                        output: "52 81 12 2", 
                        explain: "Explanation:\n- Add 58 -> [58]\n- Remove last -> []\n- Remove last -> [] (Vector is already empty, so nothing happens)\n- Add 52 -> [52]\n- Add 81 -> [52, 81]\n- Add 12 -> [52, 81, 12]\n- Add 2 -> [52, 81, 12, 2]" 
                    }
                ],
                timeComplexity: "O(N)",
                spaceComplexity: "O(N)",
                testCases: [
                    { input: "7\n1 58\n2\n2\n1 52\n1 81\n1 12\n1 2", expectedOutput: "52 81 12 2" },
                    { input: "4\n1 10\n1 20\n2\n2", expectedOutput: "EMPTY" },
                    { input: "3\n2\n2\n2", expectedOutput: "EMPTY" },
                    { input: "5\n1 1\n1 2\n1 3\n1 4\n1 5", expectedOutput: "1 2 3 4 5" },
                    { input: "6\n1 100\n2\n1 -5\n1 0\n2\n1 42", expectedOutput: "-5 42" },
                    { input: "1\n1 999", expectedOutput: "999" },
                    { input: "1\n2", expectedOutput: "EMPTY" },
                    { input: "10\n1 5\n1 10\n2\n1 15\n1 20\n2\n2\n1 25\n1 30\n2", expectedOutput: "5 25" },
                    { input: "8\n2\n2\n1 1000000\n1 -1000000\n2\n1 0\n1 50\n2", expectedOutput: "1000000 0" },
                    { input: "5\n1 7\n1 7\n1 7\n2\n1 7", expectedOutput: "7 7 7" },
                    { input: "6\n2\n1 15\n2\n2\n1 99\n1 100", expectedOutput: "99 100" },
                    { input: "8\n1 10\n1 20\n1 30\n1 40\n2\n2\n2\n2", expectedOutput: "EMPTY" },
                    { input: "3\n1 2147483647\n1 -2147483648\n2", expectedOutput: "2147483647" },
                    { input: "10\n1 1\n2\n1 2\n2\n1 3\n2\n1 4\n2\n1 5\n2", expectedOutput: "EMPTY" },
                    { input: "7\n1 8\n1 8\n2\n1 8\n1 8\n2\n1 9", expectedOutput: "8 8 9" },
                    { input: "5\n1 0\n1 0\n1 0\n2\n1 0", expectedOutput: "0 0 0" },
                    { input: "9\n1 123\n2\n2\n1 456\n2\n1 789\n1 101\n2\n1 202", expectedOutput: "789 202" },
                    { input: "2\n1 -1\n1 -2", expectedOutput: "-1 -2" },
                    { input: "4\n1 99\n2\n1 100\n2", expectedOutput: "EMPTY" },
                    { input: "6\n1 5\n1 10\n1 15\n2\n1 20\n1 25", expectedOutput: "5 10 20 25" }
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