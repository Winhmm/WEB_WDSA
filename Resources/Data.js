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
                description: `Write a C++ program to search for a <strong>target</strong> value in an ascending sorted array.<br><br>
                <strong>Input:</strong> The first line contains an integer n (number of elements). The second line contains n integers (the sorted array). The third line contains the target value.<br><br>
                <strong>Output:</strong> Print the index of the target in the array (0-indexed). If not found, print -1.<br><br>
                <strong>Requirement:</strong> The algorithm must have a time complexity of <strong>O(log n)</strong> (using Binary Search).`,
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
                        input: "6\n-1 0 3 5 9 12\n9",
                        expectedOutput: "4",
                        description: "Test case 1: Basic search - found"
                    },
                    {
                        input: "6\n-1 0 3 5 9 12\n2",
                        expectedOutput: "-1",
                        description: "Test case 2: Basic search - not found"
                    },
                    {
                        input: "1\n5\n5",
                        expectedOutput: "0",
                        description: "Test case 3: Single element - found"
                    },
                    {
                        input: "10\n1 2 3 4 5 6 7 8 9 10\n10",
                        expectedOutput: "9",
                        description: "Test case 4: Last element"
                    },
                    {
                        input: "5\n2 4 6 8 10\n1",
                        expectedOutput: "-1",
                        description: "Test case 5: Smaller than all elements"
                    }
                ],
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
                description: `The <strong>n-queens</strong> puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.<br><br>
                Given an integer <strong>n</strong>, return <em>the number of distinct solutions to the n-queens puzzle</em>.<br><br>
                <strong>Input:</strong> A single integer n (1 ≤ n ≤ 9).<br>
                <strong>Output:</strong> A single integer representing the total number of distinct solutions.<br><br>
                <strong>Note:</strong> Queens can attack horizontally, vertically, and diagonally.`,
                examples: [
                    {
                        input: "n = 4", 
                        output: "2", 
                        explain: "Explanation: There are two distinct solutions for the 4-queens puzzle."
                    },
                    {
                        input: "n = 1", 
                        output: "1", 
                        explain: "Explanation: There is only one position possible on a 1x1 board."
                    }, {
                        input: "n = 8",
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
            }
        ]
    }
];

// Validate data structure
if (typeof CHAPTERS === 'undefined' || !Array.isArray(CHAPTERS)) {
    console.error('CHAPTERS data is invalid!');
}

// Export for global access
if (typeof window !== 'undefined') {
    window.CHAPTERS = CHAPTERS;
}