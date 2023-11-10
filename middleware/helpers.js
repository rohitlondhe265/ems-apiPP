export const generateData = async (input) => {
  let paragraphs = input.split(/#[0-9]+\.\s+/);
  paragraphs = paragraphs
    .filter(function (str) {
      return str.trim() !== "";
    })
    .map(function (str) {
      return str.replace(/\s+/g, " ").trim();
    });

  const Data = [];

  paragraphs.forEach((inputString) => {
    let jsonData = {
      question: "",
      options: [],
      answer: "",
      explanation: "",
    };

    // Use regular expressions to extract the information
    const questionMatch = inputString.match(/^(.*?) a\./);
    const optionsMatch = inputString.match(/a\. (.*?) Answer:/);
    const answerMatch = inputString.match(/Answer: ([A-D]) Explanation:/);
    const explanationMatch = inputString.match(/Explanation: (.+)$/);

    if (questionMatch) {
      jsonData.question = questionMatch[1].trim();
    }

    if (optionsMatch) {
      jsonData.options = optionsMatch[1]
        .split(/b\. |c\. |d\. /)
        .filter((option) => option.trim() !== "");
    }

    if (answerMatch) {
      const answerIndex = answerMatch[1].charCodeAt(0) - "A".charCodeAt(0);
      jsonData.answer = jsonData.options[answerIndex];
    }

    if (explanationMatch) {
      jsonData.explanation = explanationMatch[1].trim();
    }

    Data.push(jsonData);
  });

  return Data;
};

// Remove answer from options
export const modifyData = async (input) => {
  await input.forEach(function (question) {
    var answerIndex = question.options.indexOf(question.answer);
    if (answerIndex !== -1) {
      question.options.splice(answerIndex, 1);
    }
  });
};
