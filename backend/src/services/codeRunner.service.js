import vm from 'node:vm';

const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

export const runAgainstTests = ({ code, testCases }) => {
  const sandbox = { module: { exports: null }, exports: {} };

  try {
    vm.createContext(sandbox);
    vm.runInContext(code, sandbox, { timeout: 1200 });

    const solve = sandbox.module.exports || sandbox.exports;
    if (typeof solve !== 'function') {
      return {
        passed: false,
        error: 'Your submission must export a function with `module.exports = solve;`',
        testResults: []
      };
    }

    const testResults = testCases.map((testCase) => {
      try {
        const actual = solve(...testCase.input);
        const passed = deepEqual(actual, testCase.output);
        return {
          input: testCase.input,
          expected: testCase.output,
          actual,
          passed
        };
      } catch (error) {
        return {
          input: testCase.input,
          expected: testCase.output,
          actual: null,
          passed: false,
          error: error.message
        };
      }
    });

    return {
      passed: testResults.every((test) => test.passed),
      testResults,
      error: null
    };
  } catch (error) {
    return {
      passed: false,
      error: error.message,
      testResults: []
    };
  }
};
