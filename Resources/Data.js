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
                        description: "Test case 1"
                    },
                    {
                        input: "6\n-1 0 3 5 9 12\n2",
                        expectedOutput: "-1",
                        description: "Test case 2"
                    },
                    {
                        input: "1\n5\n5",
                        expectedOutput: "0",
                        description: "Test case 3"
                    },
                    {
                        input: "10\n1 2 3 4 5 6 7 8 9 10\n10",
                        expectedOutput: "9",
                        description: "Test case 4"
                    },
                    {
                        input: "5\n2 4 6 8 10\n1",
                        expectedOutput: "-1",
                        description: "Test case 5"
                    }
                ],
            }
        ]
    }
];