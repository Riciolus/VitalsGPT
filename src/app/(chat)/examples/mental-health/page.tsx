import ChatExample from "@/components/features/examples/ChatExample";
import React from "react";

const examples = [
  {
    index: "01",
    question: "How do I manage anxiety naturally?",
    answer: `I would suggest several natural approaches to manage anxiety
    1. mindfulness and meditationthese practices help reduce stress and improve emotional well-being. deep breathing exercises and breathing techniques can also help reduce anxiety levels.
    2. exerciseregular exercise can improve one's mood, reduce symptoms of anxiety and depression, and promote a better overall health.
    3. self-caregetting enough sleep, eating a healthy diet, and engaging in enjoyable activities can also help to reduce symptoms of anxiety.
    4. herbal remediessome herbs such as ashwagandha, lavender, and valerian root can help lower anxiety levels. although, it's essential to consult a healthcare provider before taking any herbal supplements.
    5. cognitive-behavioral therapy (cbt): cbt can help identify and challenge negative thought patterns that contribute to anxiety.however, if your anxiety symptoms are severe or inter`,
  },
  {
    index: "02",
    question: "What are signs of burnout?",
    answer: `I can provide an answer based on medical knowledge.signs of burnout can include constant exhaustion, decreased productivity,
      a lack of interest or enthusiasm about work or activities that used to be enjoyed, physical symptoms such as headaches or stomachaches,
      an increased sensitivity to criticism, and a lower tolerance for mistakes. being mentally distant from colleagues or others
      close to you, feeling disconnected from work, and struggling to focus can also be indicative of burnout.
      if you are experiencing any of these symptoms, it may be time to seek professional help or support to address the issues.`,
  },
  {
    index: "03",
    question: "Can lack of sleep cause depression?",
    answer: `There is a strong correlation between insufficient sleep and the development of depression.
      Various studies have shown that individuals who consistently sleep fewer than six or seven hours per night
      are at an increased risk of developing depression.The reason for this correlation is not fully understood;
      however, it is thought that lack of sleep may cause changes in the brain, which can trigger or
      worsen depressive symptoms. Sleep also influences the production of certain neurotransmitters like serotonin,
      which can have a positive impact on mood when levels are balanced.In addition, other factors such as stress, anxiety,
      and poor sleep hygiene, may contribute to both sleep disturbances and the development or worsening of depression.If you are
      experiencing persistent sleep disturbances or depression, it is best to consult with a medical professional for a comprehensive
      evaluation, treatment options, and lifestyle changes that can improve your overall health and well-being.`,
  },
];

const CommonIllnesses = () => {
  return (
    <>
      <h1 className="font-semibold text-xl mb-5 text-center md:text-left w-full ">
        🧠 Mental Health
      </h1>
      <div className="flex flex-col gap-12">
        {examples.map((example, index) => (
          <ChatExample
            key={index}
            number={example.index}
            question={example.question}
            answer={example.answer}
          />
        ))}
      </div>
    </>
  );
};

export default CommonIllnesses;
