import ChatExample from "@/components/features/examples/ChatExample";
import React from "react";

const examples = [
  {
    index: "01",
    question: "How long does the flu last?",
    answer:
      "The duration of flu (influenza) symptoms can vary for each person, but most symptoms \
    will generally last for 5-10 days. However, fatigue and a cough can persist for \
    several weeks after initial recovery. In some cases, people may experience recurrent \
    flu symptoms or complications, such as pneumonia, which should be addressed by a \
    healthcare professional. If you have concerns about the duration of your flu symptoms \
    or any potential complications, please consult with your medical provider.",
  },
  {
    index: "02",
    question: "Is it safe to exercise with a fever?",
    answer:
      " No, exercising with a fever can be dangerous and potentially complicate your \
              condition. When you have a fever, your body is fighting an infection, and exercise may \
              overtax your system, leaving it less able to fight off the sickness. Moreover, \
              exercising with a fever can lead to dehydration, muscle strain, and heat exhaustion, \
              particularly if you're already feeling weak or unwell.I suggest you rest and avoid \
              exercise until your fever has subsided. If your fever is persistent, I would recommend \
              contacting your healthcare provider for further guidance.",
  },
  {
    index: "03",
    question: "What’s the difference between a cold and allergies?",
    answer:
      "A cold and allergies are two different conditions with distinct causes, symptoms, and durations. \
       A cold is typically caused by a virus, while allergies are triggered by exposure to allergens such as pollen, \
        dust, or pet dander. Symptoms of a cold can include a runny nose, sore throat, cough, fever, \
         and fatigue, while allergies may cause sneezing, itching, a runny nose, watery eyes, and a congested \
          feeling in the nose and sinuses. Unlike a cold, which usually lasts from 7 to 14 days, allergies can \
          persist for months, especially if the individual is continuously exposed to the allergen. If you have \
          any concerns about the severity of your symptoms, please consult a medical professional.",
  },
];

const CommonIllnesses = () => {
  return (
    <>
      <h1 className="font-semibold text-xl mb-5 text-center md:text-left">🤧 Common Illnesses</h1>
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
