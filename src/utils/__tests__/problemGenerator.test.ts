import { describe, test, expect, beforeEach } from 'vitest';
import {
  generateProblems,
  getAvailableTasks,
} from '../problemGenerator';
import { AgeGroup, TaskType, Problem } from '../../types';

describe('Problem Generator', () => {
  describe('getAvailableTasks', () => {
    test('returns correct tasks for age group 4-6', () => {
      const tasks = getAvailableTasks('4-6');
      expect(tasks).toEqual(['addition', 'subtraction']);
    });

    test('returns correct tasks for age group 7-9', () => {
      const tasks = getAvailableTasks('7-9');
      expect(tasks).toEqual(['addition', 'subtraction', 'multiplication', 'division', 'fractions']);
    });

    test('returns correct tasks for age group 10-12', () => {
      const tasks = getAvailableTasks('10-12');
      expect(tasks).toEqual([
        'addition',
        'subtraction',
        'multiplication',
        'division',
        'fractions',
        'decimals',
        'percentages',
        'expressions',
        'equations',
      ]);
    });
  });

  describe('generateProblems', () => {
    test('generates correct number of problems', () => {
      const problems = generateProblems('4-6', ['addition']);
      expect(problems).toHaveLength(10);
    });

    test('generates problems with correct structure', () => {
      const problems = generateProblems('4-6', ['addition']);
      problems.forEach((problem) => {
        expect(problem).toHaveProperty('question');
        expect(problem).toHaveProperty('options');
        expect(problem).toHaveProperty('correctAnswer');
        expect(problem).toHaveProperty('points');
        expect(problem.options).toHaveLength(4);
        expect(problem.options).toContain(problem.correctAnswer);
      });
    });

    test('respects age group difficulty levels', () => {
      const problems4To6 = generateProblems('4-6', ['addition']);
      const problems10To12 = generateProblems('10-12', ['addition']);

      // Check points are higher for older age group
      expect(problems4To6[0].points).toBeLessThan(problems10To12[0].points);
    });

    test('handles invalid task types gracefully', () => {
      const problems = generateProblems('4-6', ['invalid' as TaskType]);
      expect(problems).toHaveLength(10);
      expect(problems[0]).toHaveProperty('question');
    });

    test('uses default task when none provided', () => {
      const problems = generateProblems('4-6', []);
      expect(problems).toHaveLength(10);
      expect(problems[0].question).toContain('+');
    });
  });

  describe('Advanced Problem Types', () => {
    test('generates proportion problems correctly', () => {
      const problems = generateProblems('10-12', ['proportions']);
      problems.forEach(problem => {
        expect(problem.question).toContain(':');
        expect(problem.options).toHaveLength(4);
        expect(problem.points).toBeGreaterThan(0);
      });
    });

    test('generates ratio problems correctly', () => {
      const problems = generateProblems('10-12', ['ratios']);
      problems.forEach(problem => {
        expect(problem.question).toContain(':');
        expect(problem.question).toContain('total');
        expect(problem.options).toHaveLength(4);
      });
    });

    test('generates inequality problems correctly', () => {
      const problems = generateProblems('10-12', ['inequalities']);
      problems.forEach(problem => {
        expect(problem.question).toContain('>');
        expect(problem.options).toHaveLength(4);
      });
    });

    test('generates system problems correctly', () => {
      const problems = generateProblems('10-12', ['systems']);
      problems.forEach(problem => {
        expect(problem.question).toContain('x + y');
        expect(problem.options[0]).toMatch(/x=\d+, y=\d+/);
      });
    });

    test('generates polynomial problems correctly', () => {
      const problems = generateProblems('10-12', ['polynomials']);
      problems.forEach(problem => {
        expect(problem.question).toContain('x²');
        expect(problem.options).toHaveLength(4);
      });
    });

    test('respects age group restrictions', () => {
      const youngProblems = generateProblems('4-6', ['polynomials']);
      expect(youngProblems[0].question).toContain('+'); // Should fall back to addition

      const oldProblems = generateProblems('10-12', ['polynomials']);
      expect(oldProblems[0].question).toContain('x²');
    });
  });
});