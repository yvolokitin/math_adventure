import { AgeGroup, TaskType, Problem } from '../types';
import { taskTranslations } from './taskTranslations';

const generateNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateDecimal = (min: number, max: number, decimals: number = 1): number => {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
};

const generateFraction = (maxNumerator: number, maxDenominator: number): [number, number] => {
  const numerator = generateNumber(1, maxNumerator);
  const denominator = generateNumber(2, maxDenominator);
  return [numerator, denominator];
};

const formatTemplate = (template: string, values: Record<string, any>) => {
  return template.replace(/\${([^}]+)}/g, (_, key) => {
    const expression = key.trim();
    try {
      // For expressions like ${b >= 0 ? "+" : ""}
      if (expression.includes('?')) {
        return eval(`(${expression})`);
      }
      // For simple variable access
      return values[expression];
    } catch {
      return values[expression] || '';
    }
  });
};

const getTaskTemplate = (taskType: string, language: string) => {
  const translations = taskTranslations[language] || taskTranslations['en'];
  const templateKey = `${taskType}Template` as keyof typeof translations;
  return translations[templateKey];
};

const availableTasks: Record<AgeGroup, TaskType[]> = {
  '4-6': ['addition', 'subtraction'],
  '7-9': ['addition', 'subtraction', 'multiplication', 'division', 'fractions'],
  '10-12': [
    'addition', 'subtraction', 'multiplication', 'division',
    'fractions', 'decimals', 'percentages', 'expressions',
    'equations', 'inequalities', 'systems', 'polynomials',
    'ratios', 'proportions'
  ],
};

export const getAvailableTasks = (ageGroup: AgeGroup): TaskType[] => {
  return availableTasks[ageGroup];
};

const generateAdditionProblem = (ageGroup: AgeGroup, language: string = 'en'): Problem => {
  const config = {
    '4-6': { min: 1, max: 10 },
    '7-9': { min: 10, max: 100 },
    '10-12': { min: 100, max: 1000 }
  };
  
  const { min, max } = config[ageGroup];
  const num1 = generateNumber(min, max);
  const num2 = generateNumber(min, max);
  const answer = num1 + num2;
  
  const options = [
    answer.toString(),
    (answer + generateNumber(1, 5)).toString(),
    (answer - generateNumber(1, 5)).toString(),
    (answer + generateNumber(6, 10)).toString(),
  ].sort(() => Math.random() - 0.5);

  const template = getTaskTemplate('addition', language);
  const question = formatTemplate(template, { num1, num2 });

  return {
    question,
    options,
    correctAnswer: answer.toString(),
    points: ageGroup === '4-6' ? 10 : ageGroup === '7-9' ? 15 : 20,
  };
};

const generateSubtractionProblem = (ageGroup: AgeGroup, language: string = 'en'): Problem => {
  const config = {
    '4-6': { min: 1, max: 10 },
    '7-9': { min: 10, max: 100 },
    '10-12': { min: 100, max: 1000 }
  };
  
  const { min, max } = config[ageGroup];
  const num1 = generateNumber(min, max);
  const num2 = generateNumber(min, Math.min(num1, max));
  const answer = num1 - num2;
  
  const options = [
    answer.toString(),
    (answer + generateNumber(1, 5)).toString(),
    (answer - generateNumber(1, 5)).toString(),
    (answer + generateNumber(6, 10)).toString(),
  ].sort(() => Math.random() - 0.5);

  const template = getTaskTemplate('subtraction', language);
  const question = formatTemplate(template, { num1, num2 });

  return {
    question,
    options,
    correctAnswer: answer.toString(),
    points: ageGroup === '4-6' ? 10 : ageGroup === '7-9' ? 15 : 20,
  };
};

const generateMultiplicationProblem = (ageGroup: AgeGroup, language: string = 'en'): Problem => {
  const config = {
    '4-6': { min: 1, max: 5 },
    '7-9': { min: 2, max: 10 },
    '10-12': { min: 5, max: 20 }
  };
  
  const { min, max } = config[ageGroup];
  const num1 = generateNumber(min, max);
  const num2 = generateNumber(min, max);
  const answer = num1 * num2;
  
  const options = [
    answer.toString(),
    ((num1 + 1) * num2).toString(),
    (num1 * (num2 + 1)).toString(),
    ((num1 - 1) * num2).toString(),
  ].sort(() => Math.random() - 0.5);

  const template = getTaskTemplate('multiplication', language);
  const question = formatTemplate(template, { num1, num2 });

  return {
    question,
    options,
    correctAnswer: answer.toString(),
    points: ageGroup === '4-6' ? 15 : ageGroup === '7-9' ? 20 : 25,
  };
};

const generateDivisionProblem = (ageGroup: AgeGroup, language: string = 'en'): Problem => {
  const config = {
    '4-6': { min: 1, max: 5 },
    '7-9': { min: 2, max: 10 },
    '10-12': { min: 5, max: 20 }
  };
  
  const { min, max } = config[ageGroup];
  const divisor = generateNumber(min, max);
  const quotient = generateNumber(min, max);
  const dividend = divisor * quotient;
  
  const options = [
    quotient.toString(),
    (quotient + 1).toString(),
    (quotient - 1).toString(),
    (quotient + 2).toString(),
  ].sort(() => Math.random() - 0.5);

  const template = getTaskTemplate('division', language);
  const question = formatTemplate(template, { dividend, divisor });

  return {
    question,
    options,
    correctAnswer: quotient.toString(),
    points: ageGroup === '4-6' ? 15 : ageGroup === '7-9' ? 20 : 25,
  };
};

const generateFractionProblem = (ageGroup: AgeGroup, language: string = 'en'): Problem => {
  const config = {
    '4-6': { maxNumerator: 5, maxDenominator: 4 },
    '7-9': { maxNumerator: 8, maxDenominator: 6 },
    '10-12': { maxNumerator: 12, maxDenominator: 8 }
  };
  
  const { maxNumerator, maxDenominator } = config[ageGroup];
  const [num1, den1] = generateFraction(maxNumerator, maxDenominator);
  const [num2, den2] = generateFraction(maxNumerator, maxDenominator);
  
  const commonDen = den1 * den2;
  const newNum1 = num1 * den2;
  const newNum2 = num2 * den1;
  const resultNum = newNum1 + newNum2;
  
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(resultNum, commonDen);
  const simplifiedNum = resultNum / divisor;
  const simplifiedDen = commonDen / divisor;
  
  const answer = `${simplifiedNum}/${simplifiedDen}`;
  const wrongAnswers = [
    `${simplifiedNum + 1}/${simplifiedDen}`,
    `${simplifiedNum}/${simplifiedDen + 1}`,
    `${simplifiedNum - 1}/${simplifiedDen}`,
  ];
  
  const options = [answer, ...wrongAnswers].sort(() => Math.random() - 0.5);

  const template = getTaskTemplate('fractions', language);
  const question = formatTemplate(template, { num1, den1, num2, den2 });

  return {
    question,
    options,
    correctAnswer: answer,
    points: ageGroup === '4-6' ? 20 : ageGroup === '7-9' ? 25 : 30,
  };
};

const generateDecimalProblem = (ageGroup: AgeGroup, language: string = 'en'): Problem => {
  const config = {
    '4-6': { min: 0, max: 5, decimals: 1 },
    '7-9': { min: 0, max: 10, decimals: 2 },
    '10-12': { min: 0, max: 20, decimals: 2 }
  };
  
  const { min, max, decimals } = config[ageGroup];
  const num1 = generateDecimal(min, max, decimals);
  const num2 = generateDecimal(min, max, decimals);
  const answer = Number((num1 + num2).toFixed(decimals));
  
  const options = [
    answer.toString(),
    (answer + generateDecimal(0.1, 1, decimals)).toString(),
    (answer - generateDecimal(0.1, 1, decimals)).toString(),
    (answer + generateDecimal(1, 2, decimals)).toString(),
  ].sort(() => Math.random() - 0.5);

  const template = getTaskTemplate('decimals', language);
  const question = formatTemplate(template, { num1, num2 });

  return {
    question,
    options,
    correctAnswer: answer.toString(),
    points: ageGroup === '4-6' ? 20 : ageGroup === '7-9' ? 25 : 30,
  };
};

const generatePercentageProblem = (ageGroup: AgeGroup, language: string = 'en'): Problem => {
  const config = {
    '4-6': { minNumber: 1, maxNumber: 100, percentages: [10, 20, 25, 50] },
    '7-9': { minNumber: 1, maxNumber: 200, percentages: [10, 15, 20, 25, 50, 75] },
    '10-12': { minNumber: 1, maxNumber: 500, percentages: [10, 15, 20, 25, 30, 40, 50, 60, 75] }
  };
  
  const { minNumber, maxNumber, percentages } = config[ageGroup];
  const number = generateNumber(minNumber, maxNumber);
  const percentage = percentages[Math.floor(Math.random() * percentages.length)];
  const answer = (number * percentage) / 100;
  
  const options = [
    answer.toString(),
    Math.round(answer * 1.1).toString(),
    Math.round(answer * 0.9).toString(),
    Math.round(answer * 1.2).toString(),
  ].sort(() => Math.random() - 0.5);

  const template = getTaskTemplate('percentages', language);
  const question = formatTemplate(template, { percentage, number });

  return {
    question,
    options,
    correctAnswer: answer.toString(),
    points: ageGroup === '4-6' ? 25 : ageGroup === '7-9' ? 30 : 35,
  };
};

const generateProportionProblem = (ageGroup: AgeGroup, language: string = 'en'): Problem => {
  const config = {
    '4-6': { min: 1, max: 5 },
    '7-9': { min: 2, max: 10 },
    '10-12': { min: 5, max: 20 }
  };
  
  const { min, max } = config[ageGroup];
  const a = generateNumber(min, max);
  const b = generateNumber(min, max);
  const factor = generateNumber(2, 4);
  const c = a * factor;
  const d = b * factor;
  
  const answer = d;
  const options = [
    answer.toString(),
    (answer + factor).toString(),
    (answer - factor).toString(),
    (answer * 2).toString(),
  ].sort(() => Math.random() - 0.5);

  const template = getTaskTemplate('proportions', language);
  const question = formatTemplate(template, { a, b, c });

  return {
    question,
    options,
    correctAnswer: answer.toString(),
    points: ageGroup === '4-6' ? 25 : ageGroup === '7-9' ? 30 : 35,
  };
};

const generateRatioProblem = (ageGroup: AgeGroup, language: string = 'en'): Problem => {
  const config = {
    '4-6': { min: 1, max: 5, total: 20 },
    '7-9': { min: 2, max: 8, total: 40 },
    '10-12': { min: 3, max: 12, total: 60 }
  };
  
  const { min, max, total } = config[ageGroup];
  const ratio1 = generateNumber(min, max);
  const ratio2 = generateNumber(min, max);
  const sum = ratio1 + ratio2;
  const part1 = Math.round((ratio1 / sum) * total);
  const answer = part1;
  
  const options = [
    answer.toString(),
    Math.round((ratio1 / (sum + 1)) * total).toString(),
    Math.round((ratio1 / (sum - 1)) * total).toString(),
    (answer + 2).toString(),
  ].sort(() => Math.random() - 0.5);

  const template = getTaskTemplate('ratios', language);
  const question = formatTemplate(template, { ratio1, ratio2, total });

  return {
    question,
    options,
    correctAnswer: answer.toString(),
    points: ageGroup === '4-6' ? 25 : ageGroup === '7-9' ? 30 : 35,
  };
};

const generateExpressionProblem = (ageGroup: AgeGroup, language: string = 'en'): Problem => {
  const config = {
    '4-6': { min: 1, max: 5 },
    '7-9': { min: 1, max: 10 },
    '10-12': { min: 1, max: 15 }
  };
  
  const { min, max } = config[ageGroup];
  const a = generateNumber(min, max);
  const b = generateNumber(min, max);
  const c = generateNumber(min, max);
  const answer = a * b + c;
  
  const options = [
    answer.toString(),
    ((a + 1) * b + c).toString(),
    (a * b + (c + 1)).toString(),
    (a * (b + c)).toString(),
  ].sort(() => Math.random() - 0.5);

  const template = getTaskTemplate('expressions', language);
  const question = formatTemplate(template, { a, b, c });

  return {
    question,
    options,
    correctAnswer: answer.toString(),
    points: ageGroup === '4-6' ? 25 : ageGroup === '7-9' ? 30 : 35,
  };
};

const generateEquationProblem = (ageGroup: AgeGroup, language: string = 'en'): Problem => {
  const config = {
    '4-6': { min: 1, max: 10 },
    '7-9': { min: 1, max: 20 },
    '10-12': { min: 1, max: 50 }
  };
  
  const { min, max } = config[ageGroup];
  const x = generateNumber(min, max);
  const a = generateNumber(1, 5);
  const b = generateNumber(min, max);
  const rightSide = a * x + b;
  
  const options = [
    x.toString(),
    (x + 1).toString(),
    (x - 1).toString(),
    (x + 2).toString(),
  ].sort(() => Math.random() - 0.5);

  const template = getTaskTemplate('equations', language);
  const question = formatTemplate(template, { a, b, rightSide });

  return {
    question,
    options,
    correctAnswer: x.toString(),
    points: ageGroup === '4-6' ? 30 : ageGroup === '7-9' ? 35 : 40,
  };
};

const generateInequalityProblem = (ageGroup: AgeGroup, language: string = 'en'): Problem => {
  const config = {
    '4-6': { min: 1, max: 10 },
    '7-9': { min: 5, max: 20 },
    '10-12': { min: 10, max: 50 }
  };
  
  const { min, max } = config[ageGroup];
  const x = generateNumber(min, max);
  const a = generateNumber(1, 5);
  const b = generateNumber(min, max);
  const rightSide = a * x + b;
  
  const options = [
    x.toString(),
    (x - 1).toString(),
    (x + 1).toString(),
    (x + 2).toString(),
  ].sort(() => Math.random() - 0.5);

  const template = getTaskTemplate('inequalities', language);
  const question = formatTemplate(template, { a, b, rightSide });

  return {
    question,
    options,
    correctAnswer: x.toString(),
    points: ageGroup === '4-6' ? 30 : ageGroup === '7-9' ? 35 : 40,
  };
};

const generateSystemProblem = (ageGroup: AgeGroup, language: string = 'en'): Problem => {
  const config = {
    '4-6': { min: 1, max: 5 },
    '7-9': { min: 2, max: 10 },
    '10-12': { min: 5, max: 15 }
  };
  
  const { min, max } = config[ageGroup];
  const x = generateNumber(min, max);
  const y = generateNumber(min, max);
  const a = x + y;
  const b = x - y;
  
  const options = [
    `x=${x}, y=${y}`,
    `x=${x+1}, y=${y-1}`,
    `x=${x-1}, y=${y+1}`,
    `x=${y}, y=${x}`,
  ].sort(() => Math.random() - 0.5);

  const template = getTaskTemplate('systems', language);
  const question = formatTemplate(template, { a, b });

  return {
    question,
    options,
    correctAnswer: `x=${x}, y=${y}`,
    points: ageGroup === '4-6' ? 35 : ageGroup === '7-9' ? 40 : 45,
  };
};

const generatePolynomialProblem = (ageGroup: AgeGroup, language: string = 'en'): Problem => {
  const config = {
    '4-6': { min: 1, max: 5 },
    '7-9': { min: 2, max: 8 },
    '10-12': { min: 3, max: 10 }
  };
  
  const { min, max } = config[ageGroup];
  const x = generateNumber(min, max);
  const a = generateNumber(1, 3);
  const b = generateNumber(-max, max);
  const c = generateNumber(-max, max);
  const answer = a * x * x + b * x + c;
  
  const options = [
    answer.toString(),
    (answer + 1).toString(),
    (answer - 1).toString(),
    (answer + 2).toString(),
  ].sort(() => Math.random() - 0.5);

  const template = getTaskTemplate('polynomials', language);
  const question = formatTemplate(template, { a, b, c, x });

  return {
    question,
    options,
    correctAnswer: answer.toString(),
    points: ageGroup === '4-6' ? 35 : ageGroup === '7-9' ? 40 : 45,
  };
};

const problemGenerators: Record<TaskType, (ageGroup: AgeGroup, language: string) => Problem> = {
  addition: generateAdditionProblem,
  subtraction: generateSubtractionProblem,
  multiplication: generateMultiplicationProblem,
  division: generateDivisionProblem,
  fractions: generateFractionProblem,
  decimals: generateDecimalProblem,
  percentages: generatePercentageProblem,
  proportions: generateProportionProblem,
  ratios: generateRatioProblem,
  expressions: generateExpressionProblem,
  equations: generateEquationProblem,
  inequalities: generateInequalityProblem,
  systems: generateSystemProblem,
  polynomials: generatePolynomialProblem,
};

export const generateProblems = (
  ageGroup: AgeGroup,
  selectedTasks: TaskType[] = ['addition'],
  language: string = 'en'
): Problem[] => {
  const problems: Problem[] = [];
  const count = 10;
  const availableTaskTypes = availableTasks[ageGroup];
  const validSelectedTasks = selectedTasks.filter(task => availableTaskTypes.includes(task));
  const tasksToUse = validSelectedTasks.length > 0 ? validSelectedTasks : [availableTaskTypes[0]];

  for (let i = 0; i < count; i++) {
    const taskType = tasksToUse[Math.floor(Math.random() * tasksToUse.length)];
    const generator = problemGenerators[taskType];
    const problem = generator(ageGroup, language);
    problems.push(problem);
  }

  return problems;
};