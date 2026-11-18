import { QUESTIONS } from '../data/questions';

/**
 * 3-Layer Readiness Model:
 * 1. Effective Accuracy: Correct + Confident = 1.0 | Correct + Guessing = 0.5 | Incorrect = 0.0
 * 2. Weighted Score: Vocabulary (30%) + Grammar (35%) + Reading (35%)
 * 3. Safety Buffer & Skill Floor:
 *    - Goethe/ÖSD pass threshold is 60%. We require >= 78% overall AND >= 60% in every skill
 *      to issue a "Ready to Book" green light (protecting the learner's ~₹8k-₹11k exam fee).
 */
export function calculateReadiness(answers, totalSeconds) {
  const skillStats = {
    Vocabulary: { earned: 0, max: 0, rawCorrect: 0, guesses: 0 },
    Grammar: { earned: 0, max: 0, rawCorrect: 0, guesses: 0 },
    Reading: { earned: 0, max: 0, rawCorrect: 0, guesses: 0 },
  };

  const weakTopics = [];
  const reviewItems = [];

  QUESTIONS.forEach((q) => {
    const userAns = answers[q.id];
    const isCorrect = userAns?.selectedIndex === q.correctIndex;
    const isGuess = Boolean(userAns?.isGuess);

    skillStats[q.skill].max += 1;
    if (isGuess) skillStats[q.skill].guesses += 1;

    let points = 0;
    if (isCorrect) {
      skillStats[q.skill].rawCorrect += 1;
      points = isGuess ? 0.5 : 1.0;
    }
    skillStats[q.skill].earned += points;

    // Flag weak micro-topics (incorrect = priority 2, lucky guess = priority 1)
    if (!isCorrect || isGuess) {
      weakTopics.push({
        ...q,
        severity: !isCorrect ? 2 : 1,
        reason: !isCorrect ? 'Missed question' : 'Answered right, but marked as a guess',
      });
    }

    reviewItems.push({
      ...q,
      selectedIndex: userAns?.selectedIndex ?? null,
      isCorrect,
      isGuess,
      points,
    });
  });

  const vocabPct = Math.round((skillStats.Vocabulary.earned / skillStats.Vocabulary.max) * 100);
  const grammarPct = Math.round((skillStats.Grammar.earned / skillStats.Grammar.max) * 100);
  const readingPct = Math.round((skillStats.Reading.earned / skillStats.Reading.max) * 100);

  // Weighted Readiness Score (Reading & Grammar weighted slightly higher for exam synthesis)
  const overallScore = Math.round(vocabPct * 0.30 + grammarPct * 0.35 + readingPct * 0.35);

  const minSkillScore = Math.min(vocabPct, grammarPct, readingPct);
  const totalGuesses =
    skillStats.Vocabulary.guesses + skillStats.Grammar.guesses + skillStats.Reading.guesses;

  // Determine Verdict Tier
  let tier = 'NOT_READY';
  let badge = 'Hold Off on Booking';
  let headline = 'Do not pay for your exam slot yet.';
  let summary =
    'Your current score sits below the 60% passing mark. Booking now puts your exam fee at high risk—focus on the 3 fundamentals below for 10–14 days, then retake.';

  if (overallScore >= 78 && minSkillScore >= 60) {
    tier = 'READY';
    badge = 'Ready to Book';
    headline = 'Strong written foundation — safe buffer above the 60% pass line.';
    summary =
      'You cleared both our 78% safety threshold and the 60% minimum floor in every skill. Complete the Listening & Speaking check below before paying.';
  } else if (overallScore >= 60) {
    tier = 'ALMOST_READY';
    badge = 'Almost Ready — Wait 5–7 Days';
    headline =
      minSkillScore < 60
        ? 'Your overall average passes, but one weak section could sink your exam.'
        : 'You are hovering near the 60% pass line — too close for exam-day nerves.';
    summary =
      'Give yourself 5–7 focused days to close the top gaps below so you walk into the exam center with a comfortable safety buffer.';
  }

  // Sort weakest micro-topics (incorrect first, then lucky guesses) and pick top 3
  const topPriorities = weakTopics
    .sort((a, b) => b.severity - a.severity)
    .slice(0, 3);

  const pacingFlag = totalSeconds > 480; // > 8 minutes

  return {
    overallScore,
    tier,
    badge,
    headline,
    summary,
    skills: [
      { name: 'Vocabulary', pct: vocabPct, ...skillStats.Vocabulary },
      { name: 'Grammar', pct: grammarPct, ...skillStats.Grammar },
      { name: 'Reading', pct: readingPct, ...skillStats.Reading },
    ],
    totalGuesses,
    pacingFlag,
    totalSeconds,
    topPriorities,
    reviewItems,
  };
}