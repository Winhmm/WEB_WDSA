/**
 * =============================================================================
 * WDSA CONTESTS DATA
 * =============================================================================
 * Structure: Each contest contains multiple problems
 * Each problem has test cases for auto-grading
 */

const CONTESTS = [
    // -------------------------------------------------------------------------
    // CONTEST 1: BASIC ALGORITHMS
    // -------------------------------------------------------------------------
    {
        id: 1,
        title: "WDSA Contest Week 1",
        description: "String Processing",
        startTime: "2026-02-15T16:00:00", 
        endTime: "2026-02-16T19:00:00",
        duration: "3 hours",
        difficulty: "Easy",
        status: "live", 
        participants: 0,
        requiresPassword: true,  
        password: "wdsa",
        problems: [
            {
                id: "C1P1",
                contestId: 1,
                title: "Middle Digit of a Number",
                difficulty: "Easy",
                points: 100,
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
                id: "C1P2",
                contestId: 1,
                title: "Custom String Operations",
                difficulty: "Easy",
                points: 100,
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
                id: "C1P3",
                contestId: 1,
                title: "Sum of Digits in a String",
                difficulty: "Easy",
                points: 100,
                tags: ["String", "Math"],
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
                id: "C1P4",
                contestId: 1,
                title: "Beautiful Number",
                difficulty: "Easy",
                points: 100,
                tags: ["String", "Math"],
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
            }
        ]
    }
];

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONTESTS };
}