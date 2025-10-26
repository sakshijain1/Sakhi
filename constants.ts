
export interface Feeling {
    name: string;
    icon: string;
}

export const FEELINGS: Feeling[] = [
    { name: 'Sad', icon: 'sentiment_sad' },
    { name: 'Bored', icon: 'mood_bad' },
    { name: 'Confused', icon: 'psychology' },
    { name: 'Stressed', icon: 'sentiment_stressed' },
    { name: 'Lonely', icon: 'sentiment_dissatisfied' },
];

export interface Story {
    icon: string;
    iconColor: string;
    title: string;
    quote: string;
    likes: number;
}

export const STORIES: Story[] = [
    {
        icon: 'campaign',
        iconColor: 'text-emerald-500',
        title: 'Finding My Voice',
        quote: "I used to feel so alone, but reading others' stories helped me realize I wasn't. Now I share my own journey.",
        likes: 42,
    },
    {
        icon: 'lightbulb',
        iconColor: 'text-purple-500',
        title: 'A New Perspective',
        quote: "The AI guide gently led me to resources that truly resonated. It wasn't about answers, but finding the right questions.",
        likes: 30,
    },
    {
        icon: 'diversity_3',
        iconColor: 'text-yellow-500',
        title: 'Connecting Through Kindness',
        quote: "This community is a beacon. Just knowing others understand makes a world of difference.",
        likes: 55,
    },
    {
        icon: 'healing',
        iconColor: 'text-sky-500',
        title: 'Small Steps, Big Impact',
        quote: "I started with small affirmations from the feed, and slowly, they've transformed my outlook.",
        likes: 38,
    },
];

export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
}

export interface Professional {
  id: number;
  name: string;
  image: string;
  credentials: string;
  type: 'Psychologist' | 'Counselor' | 'Psychiatrist' | 'Therapist' | 'Yoga Therapist' | 'Spiritual Guide';
  availability: 'Available Now' | 'By Appointment';
  freeSession: boolean;
  pricing: number; // price per session
  specialties: string[];
  bio: string;
  approach: string;
  experience: number; // in years
  languages: string[];
  rating: number;
  reviews: Review[];
}

export const PROFESSIONALS: Professional[] = [
  {
    id: 1,
    name: 'Dr. Evelyn Reed',
    image: `https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&dpr=1`,
    credentials: 'PhD, Licensed Psychologist',
    type: 'Psychologist',
    availability: 'By Appointment',
    freeSession: false,
    pricing: 150,
    specialties: ['Anxiety', 'Depression', 'Trauma'],
    bio: 'With over 15 years of experience, Dr. Reed specializes in cognitive-behavioral therapy (CBT) to help clients overcome personal challenges and develop resilient coping strategies. She believes in a collaborative approach, tailoring therapy to each individual\'s unique needs.',
    approach: 'My primary approach is Cognitive Behavioral Therapy (CBT), supplemented with mindfulness techniques. I focus on identifying and challenging negative thought patterns to foster positive behavioral changes and improve emotional regulation.',
    experience: 15,
    languages: ['English', 'Spanish'],
    rating: 4.9,
    reviews: [
      { reviewer: 'Alex P.', rating: 5, comment: 'Dr. Reed was incredibly insightful and helped me see my challenges from a new perspective. Truly life-changing.' },
      { reviewer: 'Sarah K.', rating: 5, comment: 'Compassionate, professional, and effective. I felt understood and supported from our very first session.' },
    ],
  },
  {
    id: 2,
    name: 'Marcus Thorne',
    image: `https://images.pexels.com/photos/5378700/pexels-photo-5378700.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&dpr=1`,
    credentials: 'LCSW, Certified Counselor',
    type: 'Counselor',
    availability: 'Available Now',
    freeSession: true,
    pricing: 90,
    specialties: ['Relationships', 'Stress Management', 'Life Transitions'],
    bio: 'Marcus focuses on creating a supportive and non-judgmental space for couples and individuals to navigate life\'s complexities. He helps clients build stronger connections and develop effective communication skills.',
    approach: 'I use a person-centered and strengths-based approach, focusing on your inherent ability to grow. For couples, I integrate techniques from the Gottman Method to improve communication and intimacy.',
    experience: 8,
    languages: ['English'],
    rating: 4.8,
    reviews: [
      { reviewer: 'James L.', rating: 5, comment: 'Marcus helped my partner and I communicate better than we have in years. We are so grateful.' },
      { reviewer: 'Emily R.', rating: 4, comment: 'A very warm and understanding counselor. He provides practical tools that really work.' },
    ],
  },
  {
    id: 3,
    name: 'Dr. Alisha Chen',
    image: `https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&dpr=1`,
    credentials: 'MD, Psychiatrist',
    type: 'Psychiatrist',
    availability: 'By Appointment',
    freeSession: false,
    pricing: 250,
    specialties: ['Depression', 'Bipolar Disorder', 'Medication Management'],
    bio: 'Dr. Chen provides comprehensive psychiatric evaluations and evidence-based medication management with a compassionate, patient-centered approach. She works closely with patients to find the most effective and sustainable treatment plan.',
    approach: 'My practice combines psychopharmacology with supportive psychotherapy. I believe in a holistic view of mental health, considering biological, psychological, and social factors in treatment planning.',
    experience: 12,
    languages: ['English', 'Mandarin'],
    rating: 4.9,
    reviews: [
      { reviewer: 'Daniel C.', rating: 5, comment: 'Dr. Chen is extremely knowledgeable and took the time to explain everything to me. I finally feel like my treatment is on the right track.' },
    ],
  },
  {
    id: 4,
    name: 'Jamal Green',
    image: `https://images.pexels.com/photos/4226256/pexels-photo-4226256.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&dpr=1`,
    credentials: 'MFT, Marriage & Family Therapist',
    type: 'Therapist',
    availability: 'By Appointment',
    freeSession: true,
    pricing: 120,
    specialties: ['Relationships', 'Family Conflict', 'Parenting'],
    bio: 'Jamal is dedicated to helping families and couples improve communication and resolve conflicts in a constructive and healing manner. He provides a safe space for all members to feel heard and valued.',
    approach: 'I utilize Family Systems Theory to understand the dynamics within a family or couple. My goal is to help clients identify patterns and create new, healthier ways of interacting with one another.',
    experience: 10,
    languages: ['English'],
    rating: 4.7,
    reviews: [
        { reviewer: 'The G. Family', rating: 5, comment: 'Jamal was instrumental in helping our family navigate a difficult time. His guidance was invaluable.' },
    ],
  },
  {
      id: 5,
      name: 'Sofia Reyes',
      image: `https://images.pexels.com/photos/4983184/pexels-photo-4983184.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&dpr=1`,
      credentials: 'LPCC, Professional Clinical Counselor',
      type: 'Counselor',
      availability: 'Available Now',
      freeSession: false,
      pricing: 100,
      specialties: ['Stress Management', 'Anxiety', 'Mindfulness'],
      bio: 'Sofia integrates mindfulness and acceptance-based strategies to help clients manage stress and anxiety, fostering a sense of inner peace and self-compassion. She is passionate about empowering her clients.',
      approach: 'My work is grounded in Acceptance and Commitment Therapy (ACT) and Mindfulness-Based Stress Reduction (MBSR). I help clients connect with their values and live more fully in the present moment.',
      experience: 7,
      languages: ['English', 'Spanish'],
      rating: 4.8,
      reviews: [
        { reviewer: 'Jessica B.', rating: 5, comment: 'Sofia taught me how to manage my anxiety in ways I never thought possible. Her approach is so gentle and effective.' },
      ],
  },
  {
      id: 6,
      name: 'Dr. Ben Carter',
      image: `https://images.pexels.com/photos/634021/pexels-photo-634021.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&dpr=1`,
      credentials: 'PsyD, Clinical Psychologist',
      type: 'Psychologist',
      availability: 'By Appointment',
      freeSession: false,
      pricing: 160,
      specialties: ['Trauma', 'PTSD', 'Grief & Loss'],
      bio: 'Dr. Carter offers a trauma-informed approach, helping clients process difficult experiences and find a path toward healing and resilience. He creates a safe and validating environment for recovery.',
      approach: 'I am trained in Eye Movement Desensitization and Reprocessing (EMDR) and other trauma-focused therapies. My work is sensitive to the pace of each client, ensuring a sense of safety throughout the therapeutic process.',
      experience: 18,
      languages: ['English'],
      rating: 5.0,
      reviews: [
        { reviewer: 'Anonymous', rating: 5, comment: 'Dr. Carter helped me through the darkest time of my life. There are no words to express my gratitude.' },
      ],
  },
  {
      id: 7,
      name: 'Anya Sharma',
      image: `https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&dpr=1`,
      credentials: 'Certified Yoga Therapist (C-IAYT)',
      type: 'Yoga Therapist',
      availability: 'Available Now',
      freeSession: true,
      pricing: 75,
      specialties: ['Mind-Body Connection', 'Stress Reduction', 'Chronic Pain'],
      bio: 'Anya combines ancient yoga traditions with modern therapeutic principles to help clients reconnect with their bodies. She specializes in creating personalized practices to support mental and physical well-being.',
      approach: 'I use a combination of gentle movement (asana), breathwork (pranayama), and meditation to help calm the nervous system and increase body awareness. Each session is tailored to your unique physical and emotional needs.',
      experience: 9,
      languages: ['English', 'Hindi'],
      rating: 4.9,
      reviews: [
        { reviewer: 'Laura M.', rating: 5, comment: 'Anya\'s sessions are a true gift. I feel more centered and less anxious than ever before.' },
      ],
  },
  {
      id: 8,
      name: 'Brother Leo',
      image: `https://images.pexels.com/photos/3775087/pexels-photo-3775087.jpeg?auto=compress&cs=tinysrgb&w=256&h=256&dpr=1`,
      credentials: 'Interfaith Spiritual Guide',
      type: 'Spiritual Guide',
      availability: 'By Appointment',
      freeSession: false,
      pricing: 60,
      specialties: ['Spiritual Exploration', 'Life Purpose', 'Meditation'],
      bio: 'Brother Leo offers guidance for individuals on any spiritual path, or no path at all. He provides a contemplative space to explore life\'s big questions, find meaning, and cultivate a deeper sense of purpose.',
      approach: 'My role is not to provide answers, but to listen deeply and ask reflective questions. I draw from a wide range of wisdom traditions to help you connect with your own inner guidance and intuition.',
      experience: 25,
      languages: ['English'],
      rating: 5.0,
      reviews: [
        { reviewer: 'Chris T.', rating: 5, comment: 'Speaking with Brother Leo brought me a profound sense of peace and clarity. He is a truly gifted listener.' },
      ],
  },
];

export interface Community {
  title: string;
  description: string;
  image: string;
  members: number;
  category: string;
  categoryIcon: string;
}

export interface GuidedJourney extends Community {
  guideName: string;
}

export const OPEN_COMMUNITIES: Community[] = [
  {
    title: 'Mindful Mornings',
    description: 'A space to start your day with shared meditation and positive intentions.',
    image: 'https://images.pexels.com/photos/3621180/pexels-photo-3621180.jpeg?auto=compress&cs=tinysrgb&w=600',
    members: 150,
    category: 'Meditation',
    categoryIcon: 'self_improvement',
  },
  {
    title: 'Creative Flow Arts',
    description: 'Express yourself through mandala art and mindful drawing practices.',
    image: 'https://images.pexels.com/photos/7164047/pexels-photo-7164047.jpeg?auto=compress&cs=tinysrgb&w=600',
    members: 85,
    category: 'Mandala Art',
    categoryIcon: 'draw',
  },
  {
    title: 'Sunset Yoga Flow',
    description: 'Unwind from your day with a gentle and restorative yoga session.',
    image: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=600',
    members: 210,
    category: 'Yoga',
    categoryIcon: 'yoga',
  },
];

export const GUIDED_JOURNEYS: GuidedJourney[] = [
  {
    title: 'Breathwork Foundations',
    description: 'Learn powerful pranayam techniques to calm your nervous system.',
    image: 'https://images.pexels.com/photos/3771120/pexels-photo-3771120.jpeg?auto=compress&cs=tinysrgb&w=600',
    members: 45,
    category: 'Pranayam',
    categoryIcon: 'air',
    guideName: 'Anya Sharma',
  },
  {
    title: 'Mindful Mandala Creation',
    description: 'Find focus and peace by creating beautiful mandala patterns. A journey of art and mindfulness.',
    image: 'https://images.pexels.com/photos/7164047/pexels-photo-7164047.jpeg?auto=compress&cs=tinysrgb&w=600',
    members: 35,
    category: 'Mandala Art',
    categoryIcon: 'draw',
    guideName: 'Sofia Reyes',
  },
  {
    title: 'Deep Dive Meditation',
    description: 'A structured 8-week course to deepen your meditation practice.',
    image: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?auto=compress&cs=tinysrgb&w=600',
    members: 25,
    category: 'Meditation',
    categoryIcon: 'self_improvement',
    guideName: 'Brother Leo',
  },
];

export const COMMUNITY_FILTERS = ['All', 'Meditation', 'Pranayam', 'Mandala Art', 'Dynamic Dancing', 'Yoga'];


// --- New Resources Data ---

export interface Resource {
  id: number;
  section: 'Meditation' | 'Reading';
  category: 'Audio' | 'Video' | 'Article' | 'Worksheet';
  duration: string;
  title: string;
  description: string;
  image: string;
  bookmarked: boolean;
  content: string;
  mediaUrl?: string;
}

export const RESOURCES: Resource[] = [
  {
    id: 1,
    section: 'Meditation',
    category: 'Audio',
    duration: '20 min',
    title: 'Guided Yoga Nidra for Deep Rest',
    description: 'A calming practice to help you relax your body and mind completely for a restful sleep.',
    image: 'https://images.pexels.com/photos/228095/pexels-photo-228095.jpeg?auto=compress&cs=tinysrgb&w=600',
    bookmarked: false,
    content: "Find a comfortable position, close your eyes, and allow the sound of my voice to guide you into a state of deep relaxation. Yoga Nidra, or yogic sleep, is a powerful technique for releasing tension from your body and mind. There is nothing to do but listen.",
    mediaUrl: '#audio-placeholder-1',
  },
  {
    id: 2,
    section: 'Meditation',
    category: 'Audio',
    duration: '10 min',
    title: 'Morning Meditation for Focus',
    description: 'Start your day with clarity and intention through this brief and effective guided meditation.',
    image: 'https://images.pexels.com/photos/3771089/pexels-photo-3771089.jpeg?auto=compress&cs=tinysrgb&w=600',
    bookmarked: false,
    content: "Welcome to your morning practice. This 10-minute session is designed to gently awaken your mind, setting a positive and focused tone for the day ahead. Let's begin by connecting with our breath.",
    mediaUrl: '#audio-placeholder-2',
  },
  {
    id: 3,
    section: 'Meditation',
    category: 'Video',
    duration: '15 min',
    title: 'Pranayam for Anxiety Relief',
    description: 'Learn a simple breathing technique to quickly calm your nervous system in moments of stress.',
    image: 'https://images.pexels.com/photos/7657388/pexels-photo-7657388.jpeg?auto=compress&cs=tinysrgb&w=600',
    bookmarked: true,
    content: "Follow along with this guided video to learn a simple yet powerful breathing technique called 'box breathing'. This practice can help soothe your nervous system, reduce feelings of anxiety, and restore a sense of inner calm whenever you need it.",
    mediaUrl: 'https://videos.pexels.com/video-files/4434246/4434246-sd_640_360_30fps.mp4',
  },
  {
    id: 4,
    section: 'Reading',
    category: 'Article',
    duration: '8 min read',
    title: 'My Journey Through Vipassana',
    description: 'An honest account of a 10-day silent retreat and the lessons learned about the mind.',
    image: 'https://images.pexels.com/photos/4347368/pexels-photo-4347368.jpeg?auto=compress&cs=tinysrgb&w=600',
    bookmarked: false,
    content: "The bell rang at 4 a.m. a sound that would become the stark, unwavering metronome of my new reality. For the next ten days, there would be no talking, no reading, no writing, no eye contact. Just the silent, inward journey of Vipassana meditation.\n\nThe first few days were a battle. My mind, accustomed to constant stimulation, rebelled against the silence. It raced, planning futures, replaying pasts, and creating elaborate fictions. The instruction was simple: observe the breath, observe the sensations on the body. But simple did not mean easy. It felt like trying to tame a wild animal.\n\nBy day four, something shifted. The mental chatter began to subside, replaced by a profound awareness of my own body. I noticed the subtle tingling in my fingertips, the warmth in my chest, the persistent ache in my back from hours of sitting. The practice is to observe these sensations without craving or aversion, to understand their impermanent nature. This, the teacher explained, is the root of suffering: our attachment to pleasant sensations and our aversion to unpleasant ones.\n\nIt was a profound lesson, not just intellectually, but experientially. I watched as pain in my knee arose, intensified, and eventually dissolved, all without my intervention. I realized how much of my life was spent reacting, trying to control things that were, by their very nature, transient. The retreat wasn't about finding bliss; it was about finding equanimity. It was about learning to sit with reality as it is, moment by moment. Leaving on the tenth day, the world seemed both the same and entirely different. The noise of the city was still there, but my relationship to it had changed. I had found a quiet center within myself, a place of observation from which I could navigate the world with a little more peace."
  },
  {
    id: 5,
    section: 'Reading',
    category: 'Worksheet',
    duration: '5 min',
    title: 'The Art of Journaling: 5 Prompts',
    description: 'Kickstart your self-reflection practice with these thought-provoking journaling exercises.',
    image: 'https://images.pexels.com/photos/5797991/pexels-photo-5797991.jpeg?auto=compress&cs=tinysrgb&w=600',
    bookmarked: false,
    content: "Journaling is a powerful tool for self-discovery and emotional processing. It's a private space to explore your thoughts and feelings without judgment. Here are five prompts to help you begin your practice. Find a quiet space, take a few deep breaths, and write freely.\n\n**Prompt 1: A Moment of Gratitude**\nDescribe one small thing that brought you a sense of joy or peace today. It could be the warmth of the sun, a kind word from a stranger, or the taste of your morning coffee. Explore the feeling it gave you.\n\n**Prompt 2: What's on Your Mind?**\nWithout filtering, write down everything that is currently occupying your mental space. Worries, to-do lists, hopes, frustrations—let it all out onto the page. This is simply to clear your head.\n\n**Prompt 3: A Letter to Your Younger Self**\nWhat is one piece of advice or comfort you would offer to yourself five years ago? What do you know now that you wish you knew then? Write it in the form of a short, compassionate letter.\n\n**Prompt 4: Exploring a Difficult Emotion**\nChoose one challenging emotion you've felt recently (like sadness, anger, or anxiety). Instead of pushing it away, get curious. Where do you feel it in your body? What thoughts are associated with it? What might this emotion be trying to tell you?\n\n**Prompt 5: Imagining a Positive Future**\nDescribe a future moment, one year from now, where you feel content and aligned with your values. What are you doing? Who are you with? How does it feel? Let yourself dream without limitation."
  },
  {
    id: 6,
    section: 'Reading',
    category: 'Article',
    duration: '6 min read',
    title: 'Understanding Self-Compassion',
    description: 'Learn why being kind to yourself is not selfish, but essential for mental well-being.',
    image: 'https://images.pexels.com/photos/5699475/pexels-photo-5699475.jpeg?auto=compress&cs=tinysrgb&w=600',
    bookmarked: false,
    content: "We are often our own harshest critics. The voice in our head that points out our flaws and replays our mistakes can be relentless. But what if we treated ourselves with the same kindness and understanding that we offer to a good friend? This is the essence of self-compassion.\n\nDr. Kristin Neff, a leading researcher in the field, defines self-compassion as having three core components:\n\n1.  **Self-Kindness vs. Self-Judgment:** This involves being gentle and understanding with ourselves when we suffer, fail, or feel inadequate, rather than ignoring our pain or berating ourselves with self-criticism.\n\n2.  **Common Humanity vs. Isolation:** This is the recognition that suffering and personal inadequacy are part of the shared human experience. Everyone makes mistakes; everyone feels pain. It reminds us that we are not alone in our struggles.\n\n3.  **Mindfulness vs. Over-Identification:** This requires taking a balanced approach to our negative emotions so that feelings are neither suppressed nor exaggerated. We observe our thoughts and emotions as they are, without judgment, and without letting them completely take over.\n\nSelf-compassion is not self-pity or self-indulgence. It's not about making excuses for our behavior. Instead, it's a powerful source of resilience. Research shows that people with higher levels of self-compassion are better able to cope with difficult life events, experience less depression and anxiety, and have a greater sense of well-being. It provides the emotional safety needed to acknowledge our mistakes, learn from them, and motivate ourselves to do better, not from a place of fear, but from a place of care."
  }
];

export const RESOURCE_FILTERS = ['All', 'Meditation', 'Reading', 'Exercise', 'Audio', 'Video'];