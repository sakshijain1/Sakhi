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
        icon: 'spark',
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
