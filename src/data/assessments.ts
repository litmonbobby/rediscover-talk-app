/**
 * Mental Health Assessments Data
 * Based on clinically validated questionnaires
 * GAD-7, PHQ-9, PSS-10, ISI, WEMWBS and custom assessments
 */

export interface AssessmentQuestion {
  id: string;
  text: string;
  options: {
    value: number;
    label: string;
  }[];
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: string;
  color: string;
  category: 'anxiety' | 'depression' | 'stress' | 'sleep' | 'wellbeing' | 'mindfulness' | 'burnout' | 'self-esteem' | 'social' | 'resilience' | 'gratitude' | 'balance';
  questions: AssessmentQuestion[];
  scoring: {
    ranges: {
      min: number;
      max: number;
      level: string;
      description: string;
      recommendation: string;
    }[];
    maxScore: number;
  };
  disclaimer: string;
}

// Standard response options for many assessments
const frequencyOptions = [
  { value: 0, label: 'Not at all' },
  { value: 1, label: 'Several days' },
  { value: 2, label: 'More than half the days' },
  { value: 3, label: 'Nearly every day' },
];

const agreementOptions = [
  { value: 0, label: 'Never' },
  { value: 1, label: 'Almost Never' },
  { value: 2, label: 'Sometimes' },
  { value: 3, label: 'Fairly Often' },
  { value: 4, label: 'Very Often' },
];

const sleepOptions = [
  { value: 0, label: 'None' },
  { value: 1, label: 'Mild' },
  { value: 2, label: 'Moderate' },
  { value: 3, label: 'Severe' },
  { value: 4, label: 'Very Severe' },
];

export const assessments: Assessment[] = [
  // GAD-7 - Generalized Anxiety Disorder Assessment
  {
    id: 'gad7',
    title: 'Anxiety Assessment',
    description: 'GAD-7 questionnaire to evaluate anxiety symptoms',
    duration: '3 mins',
    icon: '',
    color: '#FF6B6B',
    category: 'anxiety',
    questions: [
      {
        id: 'gad7_1',
        text: 'Over the last 2 weeks, how often have you felt nervous, anxious, or on edge?',
        options: frequencyOptions,
      },
      {
        id: 'gad7_2',
        text: 'Over the last 2 weeks, how often have you not been able to stop or control worrying?',
        options: frequencyOptions,
      },
      {
        id: 'gad7_3',
        text: 'Over the last 2 weeks, how often have you worried too much about different things?',
        options: frequencyOptions,
      },
      {
        id: 'gad7_4',
        text: 'Over the last 2 weeks, how often have you had trouble relaxing?',
        options: frequencyOptions,
      },
      {
        id: 'gad7_5',
        text: 'Over the last 2 weeks, how often have you been so restless that it\'s hard to sit still?',
        options: frequencyOptions,
      },
      {
        id: 'gad7_6',
        text: 'Over the last 2 weeks, how often have you become easily annoyed or irritable?',
        options: frequencyOptions,
      },
      {
        id: 'gad7_7',
        text: 'Over the last 2 weeks, how often have you felt afraid as if something awful might happen?',
        options: frequencyOptions,
      },
    ],
    scoring: {
      ranges: [
        { min: 0, max: 4, level: 'Minimal', description: 'Your anxiety levels appear to be minimal.', recommendation: 'Continue practicing self-care and mindfulness to maintain your mental wellness.' },
        { min: 5, max: 9, level: 'Mild', description: 'You may be experiencing mild anxiety symptoms.', recommendation: 'Try our breathing exercises and meditation sessions to help manage stress.' },
        { min: 10, max: 14, level: 'Moderate', description: 'You appear to be experiencing moderate anxiety.', recommendation: 'Consider speaking with a mental health professional. Our app can help with daily coping strategies.' },
        { min: 15, max: 21, level: 'Severe', description: 'Your responses indicate potentially severe anxiety.', recommendation: 'We strongly recommend consulting with a mental health professional. You\'re not alone in this.' },
      ],
      maxScore: 21,
    },
    disclaimer: 'This assessment is not a diagnostic tool. Please consult a healthcare professional for proper evaluation.',
  },

  // PHQ-9 - Patient Health Questionnaire for Depression
  {
    id: 'phq9',
    title: 'Depression Screening',
    description: 'PHQ-9 questionnaire to assess depression symptoms',
    duration: '4 mins',
    icon: '',
    color: '#4A90D9',
    category: 'depression',
    questions: [
      {
        id: 'phq9_1',
        text: 'Over the last 2 weeks, how often have you had little interest or pleasure in doing things?',
        options: frequencyOptions,
      },
      {
        id: 'phq9_2',
        text: 'Over the last 2 weeks, how often have you felt down, depressed, or hopeless?',
        options: frequencyOptions,
      },
      {
        id: 'phq9_3',
        text: 'Over the last 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?',
        options: frequencyOptions,
      },
      {
        id: 'phq9_4',
        text: 'Over the last 2 weeks, how often have you felt tired or had little energy?',
        options: frequencyOptions,
      },
      {
        id: 'phq9_5',
        text: 'Over the last 2 weeks, how often have you had poor appetite or been overeating?',
        options: frequencyOptions,
      },
      {
        id: 'phq9_6',
        text: 'Over the last 2 weeks, how often have you felt bad about yourself — or that you are a failure or have let yourself or your family down?',
        options: frequencyOptions,
      },
      {
        id: 'phq9_7',
        text: 'Over the last 2 weeks, how often have you had trouble concentrating on things, such as reading or watching TV?',
        options: frequencyOptions,
      },
      {
        id: 'phq9_8',
        text: 'Over the last 2 weeks, how often have you moved or spoken so slowly that other people could have noticed? Or the opposite — being fidgety or restless?',
        options: frequencyOptions,
      },
      {
        id: 'phq9_9',
        text: 'Over the last 2 weeks, how often have you had thoughts that you would be better off dead or of hurting yourself in some way?',
        options: frequencyOptions,
      },
    ],
    scoring: {
      ranges: [
        { min: 0, max: 4, level: 'Minimal', description: 'Your responses suggest minimal depression symptoms.', recommendation: 'Keep up your healthy habits and continue monitoring your mood.' },
        { min: 5, max: 9, level: 'Mild', description: 'You may be experiencing mild depression symptoms.', recommendation: 'Try our mood tracking and journaling features. Consider lifestyle changes like exercise and sleep hygiene.' },
        { min: 10, max: 14, level: 'Moderate', description: 'You appear to be experiencing moderate depression.', recommendation: 'Consider reaching out to a mental health professional. Our app offers daily support tools.' },
        { min: 15, max: 19, level: 'Moderately Severe', description: 'Your responses indicate moderately severe depression.', recommendation: 'We recommend consulting with a mental health professional soon. Please reach out for support.' },
        { min: 20, max: 27, level: 'Severe', description: 'Your responses indicate potentially severe depression.', recommendation: 'Please seek professional help as soon as possible. You don\'t have to face this alone.' },
      ],
      maxScore: 27,
    },
    disclaimer: 'This assessment is not a diagnostic tool. If you\'re having thoughts of self-harm, please contact a crisis helpline immediately.',
  },

  // PSS-10 - Perceived Stress Scale
  {
    id: 'pss10',
    title: 'Stress Level Test',
    description: 'Measure your perceived stress over the past month',
    duration: '5 mins',
    icon: '',
    color: '#FF9F43',
    category: 'stress',
    questions: [
      {
        id: 'pss_1',
        text: 'In the last month, how often have you been upset because of something that happened unexpectedly?',
        options: agreementOptions,
      },
      {
        id: 'pss_2',
        text: 'In the last month, how often have you felt that you were unable to control the important things in your life?',
        options: agreementOptions,
      },
      {
        id: 'pss_3',
        text: 'In the last month, how often have you felt nervous and stressed?',
        options: agreementOptions,
      },
      {
        id: 'pss_4',
        text: 'In the last month, how often have you felt confident about your ability to handle your personal problems?',
        options: agreementOptions,
      },
      {
        id: 'pss_5',
        text: 'In the last month, how often have you felt that things were going your way?',
        options: agreementOptions,
      },
      {
        id: 'pss_6',
        text: 'In the last month, how often have you found that you could not cope with all the things that you had to do?',
        options: agreementOptions,
      },
      {
        id: 'pss_7',
        text: 'In the last month, how often have you been able to control irritations in your life?',
        options: agreementOptions,
      },
      {
        id: 'pss_8',
        text: 'In the last month, how often have you felt that you were on top of things?',
        options: agreementOptions,
      },
      {
        id: 'pss_9',
        text: 'In the last month, how often have you been angered because of things that happened that were outside of your control?',
        options: agreementOptions,
      },
      {
        id: 'pss_10',
        text: 'In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?',
        options: agreementOptions,
      },
    ],
    scoring: {
      ranges: [
        { min: 0, max: 13, level: 'Low Stress', description: 'Your stress levels appear to be low.', recommendation: 'Great job managing stress! Continue your current practices and explore our relaxation content.' },
        { min: 14, max: 26, level: 'Moderate Stress', description: 'You\'re experiencing moderate stress levels.', recommendation: 'Try our breathing exercises and meditation sessions to better manage your stress.' },
        { min: 27, max: 40, level: 'High Stress', description: 'Your stress levels appear to be high.', recommendation: 'Consider speaking with a counselor. Use our daily relaxation tools and prioritize self-care.' },
      ],
      maxScore: 40,
    },
    disclaimer: 'This assessment measures perceived stress and is not a diagnostic tool.',
  },

  // ISI - Insomnia Severity Index
  {
    id: 'isi',
    title: 'Sleep Quality Assessment',
    description: 'Evaluate your sleep patterns and insomnia symptoms',
    duration: '3 mins',
    icon: '',
    color: '#6C5CE7',
    category: 'sleep',
    questions: [
      {
        id: 'isi_1',
        text: 'How severe is your difficulty falling asleep?',
        options: sleepOptions,
      },
      {
        id: 'isi_2',
        text: 'How severe is your difficulty staying asleep?',
        options: sleepOptions,
      },
      {
        id: 'isi_3',
        text: 'How severe is your problem waking up too early?',
        options: sleepOptions,
      },
      {
        id: 'isi_4',
        text: 'How satisfied/dissatisfied are you with your current sleep pattern?',
        options: [
          { value: 0, label: 'Very Satisfied' },
          { value: 1, label: 'Satisfied' },
          { value: 2, label: 'Neutral' },
          { value: 3, label: 'Dissatisfied' },
          { value: 4, label: 'Very Dissatisfied' },
        ],
      },
      {
        id: 'isi_5',
        text: 'To what extent do you consider your sleep problem to interfere with your daily functioning?',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'A little' },
          { value: 2, label: 'Somewhat' },
          { value: 3, label: 'Much' },
          { value: 4, label: 'Very Much' },
        ],
      },
      {
        id: 'isi_6',
        text: 'How noticeable to others do you think your sleep problem is in terms of impairing the quality of your life?',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'A little' },
          { value: 2, label: 'Somewhat' },
          { value: 3, label: 'Much' },
          { value: 4, label: 'Very Much' },
        ],
      },
      {
        id: 'isi_7',
        text: 'How worried/distressed are you about your current sleep problem?',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'A little' },
          { value: 2, label: 'Somewhat' },
          { value: 3, label: 'Much' },
          { value: 4, label: 'Very Much' },
        ],
      },
    ],
    scoring: {
      ranges: [
        { min: 0, max: 7, level: 'No Insomnia', description: 'Your sleep quality appears to be good.', recommendation: 'Keep up your good sleep habits! Try our sleep sounds to maintain restful nights.' },
        { min: 8, max: 14, level: 'Mild Insomnia', description: 'You may have mild insomnia symptoms.', recommendation: 'Try our sleep meditation and maintain a consistent sleep schedule.' },
        { min: 15, max: 21, level: 'Moderate Insomnia', description: 'You appear to have moderate insomnia.', recommendation: 'Consider consulting a sleep specialist. Our sleep sounds and bedtime routines can help.' },
        { min: 22, max: 28, level: 'Severe Insomnia', description: 'Your responses indicate potentially severe insomnia.', recommendation: 'We recommend seeing a healthcare provider about your sleep issues.' },
      ],
      maxScore: 28,
    },
    disclaimer: 'This assessment is for educational purposes. Consult a healthcare provider for sleep disorders.',
  },

  // Mindfulness Assessment
  {
    id: 'mindfulness',
    title: 'Mindfulness Check',
    description: 'Assess your present-moment awareness',
    duration: '4 mins',
    icon: '',
    color: '#00CEC9',
    category: 'mindfulness',
    questions: [
      {
        id: 'mind_1',
        text: 'How often do you find yourself doing things automatically without being aware of what you\'re doing?',
        options: [
          { value: 4, label: 'Almost Never' },
          { value: 3, label: 'Rarely' },
          { value: 2, label: 'Sometimes' },
          { value: 1, label: 'Often' },
          { value: 0, label: 'Almost Always' },
        ],
      },
      {
        id: 'mind_2',
        text: 'How often do you rush through activities without being really attentive to them?',
        options: [
          { value: 4, label: 'Almost Never' },
          { value: 3, label: 'Rarely' },
          { value: 2, label: 'Sometimes' },
          { value: 1, label: 'Often' },
          { value: 0, label: 'Almost Always' },
        ],
      },
      {
        id: 'mind_3',
        text: 'How often do you pay attention to the present moment?',
        options: [
          { value: 0, label: 'Almost Never' },
          { value: 1, label: 'Rarely' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Often' },
          { value: 4, label: 'Almost Always' },
        ],
      },
      {
        id: 'mind_4',
        text: 'How often do you observe your thoughts without getting caught up in them?',
        options: [
          { value: 0, label: 'Almost Never' },
          { value: 1, label: 'Rarely' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Often' },
          { value: 4, label: 'Almost Always' },
        ],
      },
      {
        id: 'mind_5',
        text: 'How often do you notice bodily sensations like tension, discomfort, or relaxation?',
        options: [
          { value: 0, label: 'Almost Never' },
          { value: 1, label: 'Rarely' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Often' },
          { value: 4, label: 'Almost Always' },
        ],
      },
      {
        id: 'mind_6',
        text: 'How often do you find yourself preoccupied with the future or past?',
        options: [
          { value: 4, label: 'Almost Never' },
          { value: 3, label: 'Rarely' },
          { value: 2, label: 'Sometimes' },
          { value: 1, label: 'Often' },
          { value: 0, label: 'Almost Always' },
        ],
      },
      {
        id: 'mind_7',
        text: 'How often do you approach difficult emotions with curiosity rather than avoidance?',
        options: [
          { value: 0, label: 'Almost Never' },
          { value: 1, label: 'Rarely' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Often' },
          { value: 4, label: 'Almost Always' },
        ],
      },
      {
        id: 'mind_8',
        text: 'How often do you practice non-judgment toward yourself?',
        options: [
          { value: 0, label: 'Almost Never' },
          { value: 1, label: 'Rarely' },
          { value: 2, label: 'Sometimes' },
          { value: 3, label: 'Often' },
          { value: 4, label: 'Almost Always' },
        ],
      },
    ],
    scoring: {
      ranges: [
        { min: 0, max: 10, level: 'Developing', description: 'Your mindfulness practice has room for growth.', recommendation: 'Start with our guided meditations - even 5 minutes daily can make a difference!' },
        { min: 11, max: 20, level: 'Emerging', description: 'You have some mindfulness awareness.', recommendation: 'Continue building your practice with our meditation library and breathing exercises.' },
        { min: 21, max: 26, level: 'Established', description: 'You have a good mindfulness foundation.', recommendation: 'Great progress! Explore our advanced meditations to deepen your practice.' },
        { min: 27, max: 32, level: 'Advanced', description: 'You demonstrate strong mindfulness skills.', recommendation: 'Excellent! Consider our family activities to share mindfulness with loved ones.' },
      ],
      maxScore: 32,
    },
    disclaimer: 'This assessment measures self-reported mindfulness awareness.',
  },

  // Burnout Assessment
  {
    id: 'burnout',
    title: 'Burnout Assessment',
    description: 'Evaluate signs of emotional and physical exhaustion',
    duration: '4 mins',
    icon: '',
    color: '#E17055',
    category: 'burnout',
    questions: [
      {
        id: 'burn_1',
        text: 'How often do you feel emotionally drained from your work or responsibilities?',
        options: agreementOptions,
      },
      {
        id: 'burn_2',
        text: 'How often do you feel tired even after a full night\'s sleep?',
        options: agreementOptions,
      },
      {
        id: 'burn_3',
        text: 'How often do you feel overwhelmed by your daily tasks?',
        options: agreementOptions,
      },
      {
        id: 'burn_4',
        text: 'How often do you feel disconnected or detached from your work or relationships?',
        options: agreementOptions,
      },
      {
        id: 'burn_5',
        text: 'How often do you feel that you\'re not accomplishing anything meaningful?',
        options: agreementOptions,
      },
      {
        id: 'burn_6',
        text: 'How often do you feel irritable or frustrated with small things?',
        options: agreementOptions,
      },
      {
        id: 'burn_7',
        text: 'How often do you lack motivation to complete tasks you used to enjoy?',
        options: agreementOptions,
      },
      {
        id: 'burn_8',
        text: 'How often do you neglect self-care activities like exercise or hobbies?',
        options: agreementOptions,
      },
    ],
    scoring: {
      ranges: [
        { min: 0, max: 10, level: 'Low Risk', description: 'You show minimal signs of burnout.', recommendation: 'Keep maintaining your work-life balance! Our wellness tips can help you stay on track.' },
        { min: 11, max: 20, level: 'Moderate Risk', description: 'You may be experiencing some burnout symptoms.', recommendation: 'Time to prioritize self-care. Try our stress relief meditations and journaling.' },
        { min: 21, max: 26, level: 'High Risk', description: 'You show significant signs of burnout.', recommendation: 'Consider setting boundaries and seeking support. Our app can help with daily recovery practices.' },
        { min: 27, max: 32, level: 'Severe Burnout', description: 'You may be experiencing severe burnout.', recommendation: 'Please consider speaking with a professional. Take time for rest and recovery.' },
      ],
      maxScore: 32,
    },
    disclaimer: 'This assessment is for self-reflection. If burnout is affecting your health, please seek professional help.',
  },

  // Self-Esteem Assessment
  {
    id: 'selfesteem',
    title: 'Self-Esteem Check',
    description: 'Rosenberg Self-Esteem Scale assessment',
    duration: '3 mins',
    icon: '',
    color: '#FDCB6E',
    category: 'self-esteem',
    questions: [
      {
        id: 'se_1',
        text: 'I feel that I am a person of worth, at least on an equal plane with others.',
        options: [
          { value: 3, label: 'Strongly Agree' },
          { value: 2, label: 'Agree' },
          { value: 1, label: 'Disagree' },
          { value: 0, label: 'Strongly Disagree' },
        ],
      },
      {
        id: 'se_2',
        text: 'I feel that I have a number of good qualities.',
        options: [
          { value: 3, label: 'Strongly Agree' },
          { value: 2, label: 'Agree' },
          { value: 1, label: 'Disagree' },
          { value: 0, label: 'Strongly Disagree' },
        ],
      },
      {
        id: 'se_3',
        text: 'All in all, I am inclined to feel that I am a failure.',
        options: [
          { value: 0, label: 'Strongly Agree' },
          { value: 1, label: 'Agree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Strongly Disagree' },
        ],
      },
      {
        id: 'se_4',
        text: 'I am able to do things as well as most other people.',
        options: [
          { value: 3, label: 'Strongly Agree' },
          { value: 2, label: 'Agree' },
          { value: 1, label: 'Disagree' },
          { value: 0, label: 'Strongly Disagree' },
        ],
      },
      {
        id: 'se_5',
        text: 'I feel I do not have much to be proud of.',
        options: [
          { value: 0, label: 'Strongly Agree' },
          { value: 1, label: 'Agree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Strongly Disagree' },
        ],
      },
      {
        id: 'se_6',
        text: 'I take a positive attitude toward myself.',
        options: [
          { value: 3, label: 'Strongly Agree' },
          { value: 2, label: 'Agree' },
          { value: 1, label: 'Disagree' },
          { value: 0, label: 'Strongly Disagree' },
        ],
      },
      {
        id: 'se_7',
        text: 'On the whole, I am satisfied with myself.',
        options: [
          { value: 3, label: 'Strongly Agree' },
          { value: 2, label: 'Agree' },
          { value: 1, label: 'Disagree' },
          { value: 0, label: 'Strongly Disagree' },
        ],
      },
      {
        id: 'se_8',
        text: 'I wish I could have more respect for myself.',
        options: [
          { value: 0, label: 'Strongly Agree' },
          { value: 1, label: 'Agree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Strongly Disagree' },
        ],
      },
      {
        id: 'se_9',
        text: 'I certainly feel useless at times.',
        options: [
          { value: 0, label: 'Strongly Agree' },
          { value: 1, label: 'Agree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Strongly Disagree' },
        ],
      },
      {
        id: 'se_10',
        text: 'At times I think I am no good at all.',
        options: [
          { value: 0, label: 'Strongly Agree' },
          { value: 1, label: 'Agree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Strongly Disagree' },
        ],
      },
    ],
    scoring: {
      ranges: [
        { min: 0, max: 15, level: 'Low Self-Esteem', description: 'Your self-esteem may need attention.', recommendation: 'Practice self-compassion. Try our affirmations and journaling to build positive self-talk.' },
        { min: 16, max: 25, level: 'Normal Self-Esteem', description: 'You have a healthy level of self-esteem.', recommendation: 'Keep nurturing yourself! Our gratitude exercises can help maintain positive self-image.' },
        { min: 26, max: 30, level: 'High Self-Esteem', description: 'You have strong self-esteem.', recommendation: 'Wonderful! Continue your self-care practices and consider helping others on their journey.' },
      ],
      maxScore: 30,
    },
    disclaimer: 'This assessment measures self-reported self-esteem and is not a clinical tool.',
  },

  // Wellbeing Assessment (WEMWBS-inspired)
  {
    id: 'wellbeing',
    title: 'Wellbeing Check',
    description: 'Assess your overall mental wellbeing',
    duration: '4 mins',
    icon: '',
    color: '#9EB567',
    category: 'wellbeing',
    questions: [
      {
        id: 'wb_1',
        text: 'Over the past two weeks, how often have you been feeling optimistic about the future?',
        options: [
          { value: 1, label: 'None of the time' },
          { value: 2, label: 'Rarely' },
          { value: 3, label: 'Some of the time' },
          { value: 4, label: 'Often' },
          { value: 5, label: 'All of the time' },
        ],
      },
      {
        id: 'wb_2',
        text: 'Over the past two weeks, how often have you been feeling useful?',
        options: [
          { value: 1, label: 'None of the time' },
          { value: 2, label: 'Rarely' },
          { value: 3, label: 'Some of the time' },
          { value: 4, label: 'Often' },
          { value: 5, label: 'All of the time' },
        ],
      },
      {
        id: 'wb_3',
        text: 'Over the past two weeks, how often have you been feeling relaxed?',
        options: [
          { value: 1, label: 'None of the time' },
          { value: 2, label: 'Rarely' },
          { value: 3, label: 'Some of the time' },
          { value: 4, label: 'Often' },
          { value: 5, label: 'All of the time' },
        ],
      },
      {
        id: 'wb_4',
        text: 'Over the past two weeks, how often have you been dealing with problems well?',
        options: [
          { value: 1, label: 'None of the time' },
          { value: 2, label: 'Rarely' },
          { value: 3, label: 'Some of the time' },
          { value: 4, label: 'Often' },
          { value: 5, label: 'All of the time' },
        ],
      },
      {
        id: 'wb_5',
        text: 'Over the past two weeks, how often have you been thinking clearly?',
        options: [
          { value: 1, label: 'None of the time' },
          { value: 2, label: 'Rarely' },
          { value: 3, label: 'Some of the time' },
          { value: 4, label: 'Often' },
          { value: 5, label: 'All of the time' },
        ],
      },
      {
        id: 'wb_6',
        text: 'Over the past two weeks, how often have you been feeling close to other people?',
        options: [
          { value: 1, label: 'None of the time' },
          { value: 2, label: 'Rarely' },
          { value: 3, label: 'Some of the time' },
          { value: 4, label: 'Often' },
          { value: 5, label: 'All of the time' },
        ],
      },
      {
        id: 'wb_7',
        text: 'Over the past two weeks, how often have you been able to make up your own mind about things?',
        options: [
          { value: 1, label: 'None of the time' },
          { value: 2, label: 'Rarely' },
          { value: 3, label: 'Some of the time' },
          { value: 4, label: 'Often' },
          { value: 5, label: 'All of the time' },
        ],
      },
    ],
    scoring: {
      ranges: [
        { min: 7, max: 17, level: 'Low Wellbeing', description: 'Your wellbeing may need attention.', recommendation: 'Focus on self-care and connection. Our app offers many tools to support your wellbeing journey.' },
        { min: 18, max: 24, level: 'Moderate Wellbeing', description: 'Your wellbeing is in a moderate range.', recommendation: 'Keep building positive habits. Try our meditation and journaling features.' },
        { min: 25, max: 30, level: 'Good Wellbeing', description: 'Your wellbeing appears to be good.', recommendation: 'You\'re doing well! Continue nurturing your mental health with our resources.' },
        { min: 31, max: 35, level: 'Excellent Wellbeing', description: 'Your wellbeing is flourishing!', recommendation: 'Wonderful! Consider sharing your positive practices with friends and family.' },
      ],
      maxScore: 35,
    },
    disclaimer: 'This assessment measures subjective wellbeing and is for self-reflection purposes.',
  },

  // Social Anxiety Scale (Mini-SPIN)
  {
    id: 'socialanxiety',
    title: 'Social Anxiety Check',
    description: 'Mini-SPIN assessment for social anxiety',
    duration: '2 mins',
    icon: '',
    color: '#B388FF',
    category: 'social',
    questions: [
      {
        id: 'sa_1',
        text: 'Fear of embarrassment causes me to avoid doing things or speaking to people.',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'A little bit' },
          { value: 2, label: 'Somewhat' },
          { value: 3, label: 'Very much' },
          { value: 4, label: 'Extremely' },
        ],
      },
      {
        id: 'sa_2',
        text: 'I avoid activities in which I am the center of attention.',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'A little bit' },
          { value: 2, label: 'Somewhat' },
          { value: 3, label: 'Very much' },
          { value: 4, label: 'Extremely' },
        ],
      },
      {
        id: 'sa_3',
        text: 'Being embarrassed or looking stupid are among my worst fears.',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'A little bit' },
          { value: 2, label: 'Somewhat' },
          { value: 3, label: 'Very much' },
          { value: 4, label: 'Extremely' },
        ],
      },
      {
        id: 'sa_4',
        text: 'I feel anxious when I have to talk to people I do not know well.',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'A little bit' },
          { value: 2, label: 'Somewhat' },
          { value: 3, label: 'Very much' },
          { value: 4, label: 'Extremely' },
        ],
      },
      {
        id: 'sa_5',
        text: 'I worry about being judged by others in social situations.',
        options: [
          { value: 0, label: 'Not at all' },
          { value: 1, label: 'A little bit' },
          { value: 2, label: 'Somewhat' },
          { value: 3, label: 'Very much' },
          { value: 4, label: 'Extremely' },
        ],
      },
    ],
    scoring: {
      ranges: [
        { min: 0, max: 5, level: 'Minimal', description: 'Minimal social anxiety.', recommendation: 'You appear comfortable in social situations. Keep engaging!' },
        { min: 6, max: 10, level: 'Mild', description: 'Mild social anxiety.', recommendation: 'Some social anxiety is normal. Gradual exposure and practice can help.' },
        { min: 11, max: 15, level: 'Moderate', description: 'Moderate social anxiety.', recommendation: 'Consider relaxation techniques before social events. Our breathwork exercises may help.' },
        { min: 16, max: 20, level: 'Significant', description: 'Significant social anxiety.', recommendation: 'Consider speaking with a professional. Cognitive-behavioral strategies can be very effective.' },
      ],
      maxScore: 20,
    },
    disclaimer: 'This is a screening tool and not a diagnostic instrument for social anxiety disorder.',
  },

  // Brief Resilience Scale (BRS)
  {
    id: 'resilience',
    title: 'Resilience Assessment',
    description: 'Measure your ability to bounce back from stress',
    duration: '2 mins',
    icon: '',
    color: '#26A69A',
    category: 'resilience',
    questions: [
      {
        id: 'res_1',
        text: 'I tend to bounce back quickly after hard times.',
        options: [
          { value: 1, label: 'Strongly disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly agree' },
        ],
      },
      {
        id: 'res_2',
        text: 'I have a hard time making it through stressful events.',
        options: [
          { value: 5, label: 'Strongly disagree' },
          { value: 4, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 2, label: 'Agree' },
          { value: 1, label: 'Strongly agree' },
        ],
      },
      {
        id: 'res_3',
        text: 'It does not take me long to recover from a stressful event.',
        options: [
          { value: 1, label: 'Strongly disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly agree' },
        ],
      },
      {
        id: 'res_4',
        text: 'It is hard for me to snap back when something bad happens.',
        options: [
          { value: 5, label: 'Strongly disagree' },
          { value: 4, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 2, label: 'Agree' },
          { value: 1, label: 'Strongly agree' },
        ],
      },
      {
        id: 'res_5',
        text: 'I usually come through difficult times with little trouble.',
        options: [
          { value: 1, label: 'Strongly disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly agree' },
        ],
      },
      {
        id: 'res_6',
        text: 'I tend to take a long time to get over setbacks in my life.',
        options: [
          { value: 5, label: 'Strongly disagree' },
          { value: 4, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 2, label: 'Agree' },
          { value: 1, label: 'Strongly agree' },
        ],
      },
    ],
    scoring: {
      ranges: [
        { min: 6, max: 12, level: 'Low Resilience', description: 'You may find it challenging to bounce back from difficulties.', recommendation: 'Building coping skills can help. Try journaling and our mindfulness exercises.' },
        { min: 13, max: 18, level: 'Normal Resilience', description: 'You have typical resilience levels.', recommendation: 'Keep practicing healthy habits. Consider strengthening your support network.' },
        { min: 19, max: 24, level: 'Moderate Resilience', description: 'You recover fairly well from setbacks.', recommendation: 'Good resilience! Continue nurturing these skills through self-care.' },
        { min: 25, max: 30, level: 'High Resilience', description: 'You bounce back quickly from adversity.', recommendation: 'Excellent! Your resilience is a strength. Consider sharing your coping strategies with others.' },
      ],
      maxScore: 30,
    },
    disclaimer: 'This scale measures psychological resilience and the ability to recover from stress.',
  },

  // Gratitude Questionnaire (GQ-6)
  {
    id: 'gratitude',
    title: 'Gratitude Assessment',
    description: 'Measure your sense of gratitude and appreciation',
    duration: '2 mins',
    icon: '',
    color: '#FFB74D',
    category: 'gratitude',
    questions: [
      {
        id: 'gq_1',
        text: 'I have so much in life to be thankful for.',
        options: [
          { value: 1, label: 'Strongly disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Slightly disagree' },
          { value: 4, label: 'Neutral' },
          { value: 5, label: 'Slightly agree' },
          { value: 6, label: 'Agree' },
          { value: 7, label: 'Strongly agree' },
        ],
      },
      {
        id: 'gq_2',
        text: 'If I had to list everything that I felt grateful for, it would be a very long list.',
        options: [
          { value: 1, label: 'Strongly disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Slightly disagree' },
          { value: 4, label: 'Neutral' },
          { value: 5, label: 'Slightly agree' },
          { value: 6, label: 'Agree' },
          { value: 7, label: 'Strongly agree' },
        ],
      },
      {
        id: 'gq_3',
        text: 'When I look at the world, I don\'t see much to be grateful for.',
        options: [
          { value: 7, label: 'Strongly disagree' },
          { value: 6, label: 'Disagree' },
          { value: 5, label: 'Slightly disagree' },
          { value: 4, label: 'Neutral' },
          { value: 3, label: 'Slightly agree' },
          { value: 2, label: 'Agree' },
          { value: 1, label: 'Strongly agree' },
        ],
      },
      {
        id: 'gq_4',
        text: 'I am grateful to a wide variety of people.',
        options: [
          { value: 1, label: 'Strongly disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Slightly disagree' },
          { value: 4, label: 'Neutral' },
          { value: 5, label: 'Slightly agree' },
          { value: 6, label: 'Agree' },
          { value: 7, label: 'Strongly agree' },
        ],
      },
      {
        id: 'gq_5',
        text: 'As I get older I find myself more able to appreciate the people, events, and situations that have been part of my life history.',
        options: [
          { value: 1, label: 'Strongly disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Slightly disagree' },
          { value: 4, label: 'Neutral' },
          { value: 5, label: 'Slightly agree' },
          { value: 6, label: 'Agree' },
          { value: 7, label: 'Strongly agree' },
        ],
      },
      {
        id: 'gq_6',
        text: 'Long amounts of time can go by before I feel grateful to something or someone.',
        options: [
          { value: 7, label: 'Strongly disagree' },
          { value: 6, label: 'Disagree' },
          { value: 5, label: 'Slightly disagree' },
          { value: 4, label: 'Neutral' },
          { value: 3, label: 'Slightly agree' },
          { value: 2, label: 'Agree' },
          { value: 1, label: 'Strongly agree' },
        ],
      },
    ],
    scoring: {
      ranges: [
        { min: 6, max: 18, level: 'Lower Gratitude', description: 'You may have room to develop a more grateful outlook.', recommendation: 'Try keeping a gratitude journal. Our app has daily prompts to help you notice positive things.' },
        { min: 19, max: 30, level: 'Moderate Gratitude', description: 'You experience moderate levels of gratitude.', recommendation: 'Good foundation! Consider sharing appreciation with others more often.' },
        { min: 31, max: 36, level: 'High Gratitude', description: 'You have a strong sense of gratitude.', recommendation: 'Wonderful! Your grateful outlook supports your wellbeing. Keep it up!' },
        { min: 37, max: 42, level: 'Very High Gratitude', description: 'You have an exceptionally grateful disposition.', recommendation: 'Excellent! Your gratitude is a strength. Consider how you might inspire gratitude in others.' },
      ],
      maxScore: 42,
    },
    disclaimer: 'This assessment measures gratitude as a personality trait and general tendency.',
  },

  // Work-Life Balance Assessment
  {
    id: 'worklife',
    title: 'Work-Life Balance',
    description: 'Evaluate your balance between work and personal life',
    duration: '3 mins',
    icon: '',
    color: '#7986CB',
    category: 'balance',
    questions: [
      {
        id: 'wlb_1',
        text: 'I have enough time for my personal life outside of work.',
        options: [
          { value: 1, label: 'Strongly disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly agree' },
        ],
      },
      {
        id: 'wlb_2',
        text: 'I often think about work when I am not working.',
        options: [
          { value: 5, label: 'Strongly disagree' },
          { value: 4, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 2, label: 'Agree' },
          { value: 1, label: 'Strongly agree' },
        ],
      },
      {
        id: 'wlb_3',
        text: 'I am able to disconnect from work during my personal time.',
        options: [
          { value: 1, label: 'Strongly disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly agree' },
        ],
      },
      {
        id: 'wlb_4',
        text: 'My work responsibilities interfere with my personal relationships.',
        options: [
          { value: 5, label: 'Strongly disagree' },
          { value: 4, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 2, label: 'Agree' },
          { value: 1, label: 'Strongly agree' },
        ],
      },
      {
        id: 'wlb_5',
        text: 'I feel satisfied with the balance between my work and personal life.',
        options: [
          { value: 1, label: 'Strongly disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly agree' },
        ],
      },
      {
        id: 'wlb_6',
        text: 'I have time for hobbies and activities I enjoy.',
        options: [
          { value: 1, label: 'Strongly disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly agree' },
        ],
      },
      {
        id: 'wlb_7',
        text: 'I feel overwhelmed by my work demands.',
        options: [
          { value: 5, label: 'Strongly disagree' },
          { value: 4, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 2, label: 'Agree' },
          { value: 1, label: 'Strongly agree' },
        ],
      },
      {
        id: 'wlb_8',
        text: 'I have energy left for activities after work.',
        options: [
          { value: 1, label: 'Strongly disagree' },
          { value: 2, label: 'Disagree' },
          { value: 3, label: 'Neutral' },
          { value: 4, label: 'Agree' },
          { value: 5, label: 'Strongly agree' },
        ],
      },
    ],
    scoring: {
      ranges: [
        { min: 8, max: 16, level: 'Poor Balance', description: 'Work may be significantly impacting your personal life.', recommendation: 'Consider setting clearer boundaries. Our app can help with stress management and relaxation techniques.' },
        { min: 17, max: 24, level: 'Fair Balance', description: 'Your work-life balance has room for improvement.', recommendation: 'Try scheduling dedicated personal time. Prioritize activities that recharge you.' },
        { min: 25, max: 32, level: 'Good Balance', description: 'You maintain a fairly good work-life balance.', recommendation: 'Nice work! Keep maintaining these healthy boundaries and habits.' },
        { min: 33, max: 40, level: 'Excellent Balance', description: 'You have excellent work-life balance.', recommendation: 'Wonderful! Your balanced approach supports your overall wellbeing. Keep it up!' },
      ],
      maxScore: 40,
    },
    disclaimer: 'This assessment helps evaluate your current work-life integration and is for self-reflection.',
  },
];

// Helper function to get assessment by ID
export const getAssessmentById = (id: string): Assessment | undefined => {
  return assessments.find(a => a.id === id);
};

// Helper function to calculate score
export const calculateScore = (assessment: Assessment, answers: Record<string, number>): number => {
  let score = 0;
  assessment.questions.forEach(question => {
    if (answers[question.id] !== undefined) {
      score += answers[question.id];
    }
  });
  return score;
};

// Helper function to get result based on score
export const getResult = (assessment: Assessment, score: number) => {
  return assessment.scoring.ranges.find(
    range => score >= range.min && score <= range.max
  );
};

// Helper to get category color
export const getCategoryColor = (category: Assessment['category']): string => {
  const colors: Record<Assessment['category'], string> = {
    anxiety: '#FF6B6B',
    depression: '#4A90D9',
    stress: '#FF9F43',
    sleep: '#6C5CE7',
    wellbeing: '#9EB567',
    mindfulness: '#00CEC9',
    burnout: '#E17055',
    'self-esteem': '#FDCB6E',
    social: '#B388FF',
    resilience: '#26A69A',
    gratitude: '#FFB74D',
    balance: '#7986CB',
  };
  return colors[category];
};
