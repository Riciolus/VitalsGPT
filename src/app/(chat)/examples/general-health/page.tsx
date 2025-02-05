import ChatExample from "@/components/features/examples/ChatExample";
import React from "react";

const examples = [
  {
    index: "01",
    question: "Should I take multivitamin?",
    answer:
      "Multivitamins are often beneficial for individuals who have specific nutritional deficiencies or whose diet is incomplete. However, for most healthy individuals, a well-balanced and varied diet can provide adequate nutrients without the need for supplements. It's always best to speak with your medical provider to determine if taking a multivitamin is appropriate based on your overall health, medical history, and any specific dietary needs.",
  },
  {
    index: "02",
    question: "Early signs of diabetes?",
    answer: `Here are some early signs and symptoms that may indicate that an individual might be at risk of developing diabetes 
    1. frequent urination, especially at night
    2. increased thirst
    3. unexplained weight loss or gain
    4. decreased energy and increased fatigue
    5. slow healing of wounds or sores
    6. sudden blurry vision
    7. increased hunger or cravings, especially for sweets
    8. tingling or numbness in hands or feet
    9. itchy skin or frequent infections. 
    it's essential to seek out professional medical consultation if you or someone you know exhibits any of these symptoms...`,
  },
  {
    index: "03",
    question: "What are common symptoms of dehydration?",
    answer:
      "Dehydration occurs when the body loses more fluids than it replaces, causing a decrease \
      in the body's water content. Some common symptoms of dehydration include thirst, \
      dry mouth and throat, feeling lightheaded or dizzy, weakness, fatigue, and dark-colored \
      urine. In severe cases, dehydration may lead to confusion or disorientation, seizures, \
      and low blood pressure. It's essential to stay hydrated by drinking plenty of water or \
      other fluids and avoiding caffeinated and alcoholic beverages. If you suspect that you \
      or someone you know is dehydrated, seek medical attention immediately, especially if \
      they have severe symptoms.",
  },
];

const CommonIllnesses = () => {
  return (
    <>
      <h1 className="font-semibold text-xl mb-5 text-center md:text-left">🩺 General Health</h1>
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
