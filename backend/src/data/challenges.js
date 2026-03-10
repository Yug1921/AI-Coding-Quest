export const challengeSeed = [
  {
    id: 'max-number-array',
    title: 'Largest Number in an Array',
    description:
      'Write a function `solve(arr)` that returns the largest number in an array of integers.',
    difficulty: 'Easy',
    xp: 10,
    starterCode: 'function solve(arr) {\n  // your code here\n}\n\nmodule.exports = solve;\n',
    testCases: [
      { input: [[3, 7, 2, 9]], output: 9 },
      { input: [[-2, -8, -1]], output: -1 },
      { input: [[42]], output: 42 }
    ],
    tags: ['arrays', 'loops']
  },
  {
    id: 'palindrome-check',
    title: 'Palindrome Checker',
    description:
      'Write a function `solve(text)` that returns true if a string is palindrome (ignoring case), otherwise false.',
    difficulty: 'Medium',
    xp: 20,
    starterCode: 'function solve(text) {\n  // your code here\n}\n\nmodule.exports = solve;\n',
    testCases: [
      { input: ['Level'], output: true },
      { input: ['mentor'], output: false },
      { input: ['RaceCar'], output: true }
    ],
    tags: ['strings', 'two-pointers']
  },
  {
    id: 'pair-sum-target',
    title: 'Pair Sum Target',
    description:
      'Write a function `solve(nums, target)` that returns true if any two numbers add up to target.',
    difficulty: 'Hard',
    xp: 40,
    starterCode:
      'function solve(nums, target) {\n  // your code here\n}\n\nmodule.exports = solve;\n',
    testCases: [
      { input: [[2, 7, 11, 15], 9], output: true },
      { input: [[1, 2, 3, 4], 8], output: false },
      { input: [[-1, 0, 1], 0], output: true }
    ],
    tags: ['hashing', 'arrays']
  }
];

export const xpByDifficulty = {
  Easy: 10,
  Medium: 20,
  Hard: 40
};
