import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

const fallbackHint = ({ challenge, result }) => {
  const failedTest = result.testResults?.find((test) => !test.passed);
  return {
    conceptualHint: `Focus on the core pattern for ${challenge.title.toLowerCase()}. Break the problem into a repeatable step.`,
    debuggingHint: failedTest
      ? `One test failed for input ${JSON.stringify(failedTest.input)}. Compare expected ${JSON.stringify(
          failedTest.expected
        )} with your actual output ${JSON.stringify(failedTest.actual)}.`
      : 'Check whether your function is exported using module.exports and handles edge cases.',
    improvementTip: 'After it works, consider readability: clear variable names and one focused loop often help.'
  };
};

export const generateHint = async ({ challenge, code, result, askMode = 'submission' }) => {
  if (!openai) {
    return {
      source: 'fallback',
      ...fallbackHint({ challenge, result })
    };
  }

  const prompt = `You are an AI coding mentor. The student is solving:\nTitle: ${challenge.title}\nDescription: ${challenge.description}\nDifficulty: ${challenge.difficulty}\n\nStudent code:\n${code}\n\nExecution result:\n${JSON.stringify(result)}\n\nMode: ${askMode}\n\nRules:\n1) Never provide full solution code.\n2) Provide only hints and guidance.\n3) Keep tone encouraging and concise.\n4) Return valid JSON: {"conceptualHint":"...","debuggingHint":"...","improvementTip":"..."}`;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: 'You are a mentor for coding interview practice.' },
      { role: 'user', content: prompt }
    ]
  });

  const parsed = JSON.parse(completion.choices[0].message.content);
  return { source: 'openai', ...parsed };
};
