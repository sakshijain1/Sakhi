
import React from 'react';

interface AboutUsPageProps {
  onGoBack: () => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ onGoBack }) => {
  return (
    <main className="flex flex-1 flex-col items-center px-4 py-8 sm:py-12 w-full max-w-4xl">
      <div className="w-full max-w-4xl self-start">
        <button onClick={onGoBack} className="p-2 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors mb-4">
            <span className="material-symbols-outlined">arrow_back</span>
        </button>
      </div>
      <div className="w-full bg-white/60 dark:bg-slate-800/40 backdrop-blur-lg shadow-xl rounded-xl p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-black text-center text-[#0d171b] dark:text-slate-50 mb-8 tracking-tighter">
          About Us
        </h1>

        <div className="mb-10">
          <img 
            src="https://images.pexels.com/photos/1757363/pexels-photo-1757363.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="A person walking on a sunlit path through a tranquil forest, symbolizing the journey to well-being." 
            className="w-full h-64 object-cover rounded-xl shadow-lg"
          />
        </div>

        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-base">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
              Sakhi – A Steady Hand in Difficult Times
            </h2>
            <p>
              At Sakhi, we believe that every emotion deserves space — to be felt, expressed, and understood. Whether you’re feeling happy, sad, anxious, lonely, or simply neutral, Sakhi is here to be your companion — your friend who listens, understands, and gently helps you find balance.
            </p>
            <p className="mt-4">
              We recognise that mental well-being isn’t one-size-fits-all. Some days you may want to talk to someone, other days you might just need quiet reflection through art, meditation, music, or journaling. Sakhi brings together everything that heals the mind — conversation, creativity, mindfulness, and community.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
              For Individuals
            </h2>
            <p>
              Your emotional world is unique — and Sakhi supports you in the way that feels right for you. Start with one simple question: “How are you feeling today?” From there, explore options to talk to our AI companion, connect with a professional therapist, or engage in mindful activities like yoga, dance, painting, or reading. Whatever your mood, Sakhi helps you nurture your mind with kindness and care.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
              For Professionals
            </h2>
            <p>
              Sakhi also welcomes mental health professionals — counsellors, therapists, psychologists, psychiatrists, and holistic practitioners. Join us to offer your expertise, reach individuals seeking help, and become part of a compassionate network working together for emotional wellness.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
              Our Vision
            </h2>
            <p>
              To create a safe, serene, and inclusive space where people from all walks of life can express their emotions freely and grow mentally stronger — together.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
              Our Promise
            </h2>
            <p className="italic">
              At Sakhi, you are never alone. Your feelings are valid. Your journey matters. And we’re here — a steady hand and a trusted friend — through every emotion.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
};

export default AboutUsPage;
