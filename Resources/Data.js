const CHAPTERS = [
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
                        <li>Line 1: An integer <code>n</code> (number of elements)</li>
                        <li>Line 2: The target value</li>
                        <li>Line 3: <code>n</code> space-separated integers (the sorted array)</li>
                    </ul>
                    
                    <strong>Output Format:</strong>
                    <ul>
                        <li>Print the index of the target (0-indexed). If not found, print <code>-1</code>.</li>
                    </ul>
                    
                    <strong>Requirement:</strong>
                    <ul>
                        <li>Time complexity must be <strong>O(log n)</strong> (Binary Search)</li>
                    </ul>
                `,
                examples: [
                    { 
                        input: "n = 6, arr[] = {-1, 0, 3, 5, 9, 12}, target = 9", 
                        output: "4", 
                        explain: "Explanation: The number 9 exists at index 4 in the array." 
                    },
                    { 
                        input: "n = 6, arr[] = {-1, 0, 3, 5, 9, 12}, target = 2", 
                        output: "-1", 
                        explain: "Explanation: The number 2 does not exist in the array, so return -1." 
                    }
                ],

                timeComplexity: "O(log n)",
                spaceComplexity: "O(1)",
                // Test cases for code execution
                testCases: [
                    {
                        // Thứ tự: n -> target -> mảng
                        input: "6\n9\n-1 0 3 5 9 12", 
                        expectedOutput: "4",
                        description: "Test case 1: Basic search - found"
                    },
                    {
                        input: "6\n2\n-1 0 3 5 9 12",
                        expectedOutput: "-1",
                        description: "Test case 2: Basic search - not found"
                    },
                    {
                        input: "1\n5\n5",
                        expectedOutput: "0",
                        description: "Test case 3: Single element - found"
                    },
                    {
                        input: "10\n10\n1 2 3 4 5 6 7 8 9 10",
                        expectedOutput: "9",
                        description: "Test case 4: Last element"
                    },
                    {
                        input: "5\n1\n2 4 6 8 10",
                        expectedOutput: "-1",
                        description: "Test case 5: Smaller than all elements"
                    }
                ]
            }
        ]
    },
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
                    {
                        input: "4", 
                        output: "2", 
                        explain: "Explanation: There are two distinct solutions for the 4-queens puzzle."
                    },
                    {
                        input: "1", 
                        output: "1", 
                        explain: "Explanation: There is only one position possible on a 1x1 board."
                    }, {
                        input: "8",
                        output: "92",
                        explain: "Explanation: For a standard 8x8 chessboard, there are 92 distinct ways to place the queens."
                    }
                ],
                timeComplexity: "O(N!)",
                spaceComplexity: "O(N)",
                testCases: [
                    {
                        input: "4",
                        expectedOutput: "2",
                        description: "Test case 1: n = 4"
                    },
                    {
                        input: "8",
                        expectedOutput: "92",
                        description: "Test case 3: Standard n = 8 (Classic)"
                    },
                    {
                        input: "5",
                        expectedOutput: "10",
                        description: "Test case 4: n = 5"
                    },
                    {
                        input: "9",
                        expectedOutput: "352",
                        description: "Test case 5: Max constraint n = 9"
                    },
                    {
                        input: "1",
                        expectedOutput: "1",
                        description: "Test case 2: n = 1"
                    }
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
                        <li>A single line containing three integers: <code>n</code>, <code>k</code>, <code>s</code></li>
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
                    {
                        input: "16 8 9", 
                        output: "28", 
                        explain: "There are 28 different sets consisting of 8 distinct numbers from 1 to 16 whose total sum is exactly 91."
                    },
                    {
                        input: "9 3 23", 
                        output: "1", 
                        explain: "The only valid set is {6, 8, 9}."
                    }
                ],
                timeComplexity: "O(C(n, k))",
                spaceComplexity: "O(k)",
                testCases: [
                    {
                        input: "9 3 23",
                        expectedOutput: "1",
                        description: "Test case 1: Example (n=9, k=3, s=23)"
                    },
                    {
                        input: "16 8 91",
                        expectedOutput: "28",
                        description: "Test case 2: Larger inputs (n=16, k=8, s=91)"
                    },
                    {
                        input: "10 2 5",
                        expectedOutput: "2",
                        description: "Test case 3: Small inputs ({1,4}, {2,3})"
                    },
                    {
                        input: "5 3 20",
                        expectedOutput: "0",
                        description: "Test case 4: Impossible sum"
                    },
                    {
                        input: "20 10 155",
                        expectedOutput: "1",
                        description: "Test case 5: Max boundary ({11,12,...,20})"
                    }
                ]
            },
        ]
    },
];


if (typeof CHAPTERS === 'undefined' || !Array.isArray(CHAPTERS)) {
    console.error('CHAPTERS data is invalid!');
}


if (typeof window !== 'undefined') {
    window.CHAPTERS = CHAPTERS;
}