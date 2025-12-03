/**
 * Quotes Data - Comprehensive collection of inspirational quotes for mental wellness
 * Categories: Resilience, Growth, Self-Care, Mindfulness, Mental Health,
 *             Motivation, Courage, Gratitude, Wisdom, Hope, Love
 */

export type QuoteCategory =
  | 'resilience'
  | 'growth'
  | 'self-care'
  | 'mindfulness'
  | 'mental-health'
  | 'motivation'
  | 'courage'
  | 'gratitude'
  | 'wisdom'
  | 'hope'
  | 'love';

export interface Quote {
  id: string;
  text: string;
  author: string;
  category: QuoteCategory;
}

export const quotes: Quote[] = [
  // RESILIENCE (11 quotes)
  {
    id: 'res-1',
    text: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    category: 'resilience',
  },
  {
    id: 'res-2',
    text: "Rock bottom became the solid foundation on which I rebuilt my life.",
    author: "J.K. Rowling",
    category: 'resilience',
  },
  {
    id: 'res-3',
    text: "You may have to fight a battle more than once to win it.",
    author: "Margaret Thatcher",
    category: 'resilience',
  },
  {
    id: 'res-4',
    text: "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.",
    author: "Thomas Edison",
    category: 'resilience',
  },
  {
    id: 'res-5',
    text: "It's not whether you get knocked down, it's whether you get up.",
    author: "Vince Lombardi",
    category: 'resilience',
  },
  {
    id: 'res-6',
    text: "Tough times never last, but tough people do.",
    author: "Robert H. Schuller",
    category: 'resilience',
  },
  {
    id: 'res-7',
    text: "The human capacity for burden is like bamboo – far more flexible than you'd ever believe at first glance.",
    author: "Jodi Picoult",
    category: 'resilience',
  },
  {
    id: 'res-8',
    text: "Turn your wounds into wisdom.",
    author: "Oprah Winfrey",
    category: 'resilience',
  },
  {
    id: 'res-9',
    text: "Although the world is full of suffering, it is also full of the overcoming of it.",
    author: "Helen Keller",
    category: 'resilience',
  },
  {
    id: 'res-10',
    text: "Stars can't shine without darkness.",
    author: "D.H. Sidebottom",
    category: 'resilience',
  },
  {
    id: 'res-11',
    text: "In the middle of difficulty lies opportunity.",
    author: "Albert Einstein",
    category: 'resilience',
  },

  // GROWTH (10 quotes)
  {
    id: 'gro-1',
    text: "Your present circumstances don't determine where you can go; they merely determine where you start.",
    author: "Nido Qubein",
    category: 'growth',
  },
  {
    id: 'gro-2',
    text: "The only way to make sense out of change is to plunge into it, move with it, and join the dance.",
    author: "Alan Watts",
    category: 'growth',
  },
  {
    id: 'gro-3',
    text: "Growth is painful. Change is painful. But nothing is as painful as staying stuck somewhere you don't belong.",
    author: "Mandy Hale",
    category: 'growth',
  },
  {
    id: 'gro-4',
    text: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson",
    category: 'growth',
  },
  {
    id: 'gro-5',
    text: "Be not afraid of growing slowly, be afraid only of standing still.",
    author: "Chinese Proverb",
    category: 'growth',
  },
  {
    id: 'gro-6',
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson",
    category: 'growth',
  },
  {
    id: 'gro-7',
    text: "Life isn't about finding yourself. Life is about creating yourself.",
    author: "George Bernard Shaw",
    category: 'growth',
  },
  {
    id: 'gro-8',
    text: "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King",
    category: 'growth',
  },
  {
    id: 'gro-9',
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis",
    category: 'growth',
  },
  {
    id: 'gro-10',
    text: "Progress is impossible without change, and those who cannot change their minds cannot change anything.",
    author: "George Bernard Shaw",
    category: 'growth',
  },

  // SELF-CARE (8 quotes)
  {
    id: 'self-1',
    text: "Almost everything will work again if you unplug it for a few minutes, including you.",
    author: "Anne Lamott",
    category: 'self-care',
  },
  {
    id: 'self-2',
    text: "Caring for myself is not self-indulgence, it is self-preservation.",
    author: "Audre Lorde",
    category: 'self-care',
  },
  {
    id: 'self-3',
    text: "You yourself, as much as anybody in the entire universe, deserve your love and affection.",
    author: "Buddha",
    category: 'self-care',
  },
  {
    id: 'self-4',
    text: "Rest and self-care are so important. When you take time to replenish your spirit, it allows you to serve others from the overflow.",
    author: "Eleanor Brown",
    category: 'self-care',
  },
  {
    id: 'self-5',
    text: "Self-care is giving the world the best of you, instead of what's left of you.",
    author: "Katie Reed",
    category: 'self-care',
  },
  {
    id: 'self-6',
    text: "Nourishing yourself in a way that helps you blossom in the direction you want to go is attainable.",
    author: "Deborah Day",
    category: 'self-care',
  },
  {
    id: 'self-7',
    text: "Taking care of yourself doesn't mean me first, it means me too.",
    author: "L.R. Knost",
    category: 'self-care',
  },
  {
    id: 'self-8',
    text: "Be gentle with yourself, you're doing the best you can.",
    author: "Unknown",
    category: 'self-care',
  },

  // MINDFULNESS (8 quotes)
  {
    id: 'mind-1',
    text: "You don't have to control your thoughts. You just have to stop letting them control you.",
    author: "Dan Millman",
    category: 'mindfulness',
  },
  {
    id: 'mind-2',
    text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
    author: "Thich Nhat Hanh",
    category: 'mindfulness',
  },
  {
    id: 'mind-3',
    text: "Feelings come and go like clouds in a windy sky. Conscious breathing is my anchor.",
    author: "Thich Nhat Hanh",
    category: 'mindfulness',
  },
  {
    id: 'mind-4',
    text: "The mind is everything. What you think you become.",
    author: "Buddha",
    category: 'mindfulness',
  },
  {
    id: 'mind-5',
    text: "Be where you are, not where you think you should be.",
    author: "Unknown",
    category: 'mindfulness',
  },
  {
    id: 'mind-6',
    text: "Life is available only in the present moment.",
    author: "Thich Nhat Hanh",
    category: 'mindfulness',
  },
  {
    id: 'mind-7',
    text: "The quieter you become, the more you can hear.",
    author: "Ram Dass",
    category: 'mindfulness',
  },
  {
    id: 'mind-8',
    text: "In today's rush, we all think too much, seek too much, want too much, and forget about the joy of just being.",
    author: "Eckhart Tolle",
    category: 'mindfulness',
  },

  // MENTAL HEALTH (8 quotes)
  {
    id: 'mh-1',
    text: "Mental health is not a destination, but a process. It's about how you drive, not where you're going.",
    author: "Noam Shpancer",
    category: 'mental-health',
  },
  {
    id: 'mh-2',
    text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared or anxious.",
    author: "Lori Deschene",
    category: 'mental-health',
  },
  {
    id: 'mh-3',
    text: "There is hope, even when your brain tells you there isn't.",
    author: "John Green",
    category: 'mental-health',
  },
  {
    id: 'mh-4',
    text: "What mental health needs is more sunlight, more candor, and more unashamed conversation.",
    author: "Glenn Close",
    category: 'mental-health',
  },
  {
    id: 'mh-5',
    text: "Healing takes time, and asking for help is a courageous step.",
    author: "Mariska Hargitay",
    category: 'mental-health',
  },
  {
    id: 'mh-6',
    text: "Your illness does not define you. Your strength and courage does.",
    author: "Unknown",
    category: 'mental-health',
  },
  {
    id: 'mh-7',
    text: "Not until we are lost do we begin to understand ourselves.",
    author: "Henry David Thoreau",
    category: 'mental-health',
  },
  {
    id: 'mh-8',
    text: "The only journey is the journey within.",
    author: "Rainer Maria Rilke",
    category: 'mental-health',
  },

  // MOTIVATION (8 quotes)
  {
    id: 'mot-1',
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt",
    category: 'motivation',
  },
  {
    id: 'mot-2',
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
    category: 'motivation',
  },
  {
    id: 'mot-3',
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
    category: 'motivation',
  },
  {
    id: 'mot-4',
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    category: 'motivation',
  },
  {
    id: 'mot-5',
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    category: 'motivation',
  },
  {
    id: 'mot-6',
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
    category: 'motivation',
  },
  {
    id: 'mot-7',
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair",
    category: 'motivation',
  },
  {
    id: 'mot-8',
    text: "The only limit to our realization of tomorrow will be our doubts of today.",
    author: "Franklin D. Roosevelt",
    category: 'motivation',
  },

  // COURAGE (7 quotes)
  {
    id: 'cour-1',
    text: "Courage is not the absence of fear, but rather the judgment that something else is more important than fear.",
    author: "Ambrose Redmoon",
    category: 'courage',
  },
  {
    id: 'cour-2',
    text: "You gain strength, courage, and confidence by every experience in which you really stop to look fear in the face.",
    author: "Eleanor Roosevelt",
    category: 'courage',
  },
  {
    id: 'cour-3',
    text: "Life shrinks or expands in proportion to one's courage.",
    author: "Anais Nin",
    category: 'courage',
  },
  {
    id: 'cour-4',
    text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
    author: "Lao Tzu",
    category: 'courage',
  },
  {
    id: 'cour-5',
    text: "Have the courage to follow your heart and intuition. They somehow already know what you truly want to become.",
    author: "Steve Jobs",
    category: 'courage',
  },
  {
    id: 'cour-6',
    text: "Courage doesn't always roar. Sometimes courage is the quiet voice at the end of the day saying, 'I will try again tomorrow.'",
    author: "Mary Anne Radmacher",
    category: 'courage',
  },
  {
    id: 'cour-7',
    text: "The brave may not live forever, but the cautious do not live at all.",
    author: "Ashley L.",
    category: 'courage',
  },

  // GRATITUDE (7 quotes)
  {
    id: 'grat-1',
    text: "Gratitude turns what we have into enough.",
    author: "Aesop",
    category: 'gratitude',
  },
  {
    id: 'grat-2',
    text: "When you arise in the morning, think of what a precious privilege it is to be alive – to breathe, to think, to enjoy, to love.",
    author: "Marcus Aurelius",
    category: 'gratitude',
  },
  {
    id: 'grat-3',
    text: "Gratitude is not only the greatest of virtues, but the parent of all others.",
    author: "Cicero",
    category: 'gratitude',
  },
  {
    id: 'grat-4',
    text: "The more grateful I am, the more beauty I see.",
    author: "Mary Davis",
    category: 'gratitude',
  },
  {
    id: 'grat-5',
    text: "Enjoy the little things, for one day you may look back and realize they were the big things.",
    author: "Robert Brault",
    category: 'gratitude',
  },
  {
    id: 'grat-6',
    text: "Gratitude makes sense of our past, brings peace for today, and creates a vision for tomorrow.",
    author: "Melody Beattie",
    category: 'gratitude',
  },
  {
    id: 'grat-7',
    text: "Let us be grateful to people who make us happy; they are the charming gardeners who make our souls blossom.",
    author: "Marcel Proust",
    category: 'gratitude',
  },

  // WISDOM (7 quotes)
  {
    id: 'wis-1',
    text: "The only true wisdom is in knowing you know nothing.",
    author: "Socrates",
    category: 'wisdom',
  },
  {
    id: 'wis-2',
    text: "In the middle of every difficulty lies opportunity.",
    author: "Albert Einstein",
    category: 'wisdom',
  },
  {
    id: 'wis-3',
    text: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu",
    category: 'wisdom',
  },
  {
    id: 'wis-4',
    text: "Knowing yourself is the beginning of all wisdom.",
    author: "Aristotle",
    category: 'wisdom',
  },
  {
    id: 'wis-5',
    text: "The measure of intelligence is the ability to change.",
    author: "Albert Einstein",
    category: 'wisdom',
  },
  {
    id: 'wis-6',
    text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.",
    author: "Rumi",
    category: 'wisdom',
  },
  {
    id: 'wis-7',
    text: "The fool doth think he is wise, but the wise man knows himself to be a fool.",
    author: "William Shakespeare",
    category: 'wisdom',
  },

  // HOPE (7 quotes)
  {
    id: 'hope-1',
    text: "Once you choose hope, anything's possible.",
    author: "Christopher Reeve",
    category: 'hope',
  },
  {
    id: 'hope-2',
    text: "Hope is being able to see that there is light despite all of the darkness.",
    author: "Desmond Tutu",
    category: 'hope',
  },
  {
    id: 'hope-3',
    text: "Where there is no vision, there is no hope.",
    author: "George Washington Carver",
    category: 'hope',
  },
  {
    id: 'hope-4',
    text: "Hope is a waking dream.",
    author: "Aristotle",
    category: 'hope',
  },
  {
    id: 'hope-5',
    text: "Learn from yesterday, live for today, hope for tomorrow.",
    author: "Albert Einstein",
    category: 'hope',
  },
  {
    id: 'hope-6',
    text: "We must accept finite disappointment, but never lose infinite hope.",
    author: "Martin Luther King Jr.",
    category: 'hope',
  },
  {
    id: 'hope-7',
    text: "However long the night, the dawn will break.",
    author: "African Proverb",
    category: 'hope',
  },

  // LOVE (6 quotes)
  {
    id: 'love-1',
    text: "The greatest thing you'll ever learn is just to love and be loved in return.",
    author: "Eden Ahbez",
    category: 'love',
  },
  {
    id: 'love-2',
    text: "Where there is love there is life.",
    author: "Mahatma Gandhi",
    category: 'love',
  },
  {
    id: 'love-3',
    text: "Love yourself first and everything else falls into line.",
    author: "Lucille Ball",
    category: 'love',
  },
  {
    id: 'love-4',
    text: "The best thing to hold onto in life is each other.",
    author: "Audrey Hepburn",
    category: 'love',
  },
  {
    id: 'love-5',
    text: "To love oneself is the beginning of a lifelong romance.",
    author: "Oscar Wilde",
    category: 'love',
  },
  {
    id: 'love-6',
    text: "Love is the bridge between you and everything.",
    author: "Rumi",
    category: 'love',
  },
];

// Helper functions
export const getQuotesByCategory = (category: QuoteCategory): Quote[] => {
  return quotes.filter(quote => quote.category === category);
};

export const getDailyQuote = (): Quote => {
  // Use current date to get a consistent quote for the day
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000
  );
  const index = dayOfYear % quotes.length;
  return quotes[index];
};

export const getRandomQuote = (): Quote => {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
};

export const getQuoteById = (id: string): Quote | undefined => {
  return quotes.find(quote => quote.id === id);
};

export const getCategoryLabel = (category: QuoteCategory): string => {
  const labels: Record<QuoteCategory, string> = {
    'resilience': 'Resilience',
    'growth': 'Growth',
    'self-care': 'Self-Care',
    'mindfulness': 'Mindfulness',
    'mental-health': 'Mental Health',
    'motivation': 'Motivation',
    'courage': 'Courage',
    'gratitude': 'Gratitude',
    'wisdom': 'Wisdom',
    'hope': 'Hope',
    'love': 'Love',
  };
  return labels[category];
};

export default quotes;
