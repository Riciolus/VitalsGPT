import Link from "next/link";

const exampleCategories = [
  {
    title: "🩺 General Health",
    href: "/examples/general-health",
    examples: [
      "Should I take multivitamin?",
      "Early signs of diabetes?",
      "What are common symptoms of dehydration?",
    ],
  },
  {
    title: "🤧 Common Illnesses",
    href: "/examples/common-illnesses",
    examples: [
      "How long does the flu last?",
      "Is it safe to exercise with a fever?",
      "What’s the difference between a cold and allergies?",
    ],
  },
  {
    title: "🧠 Mental Health",
    href: "/examples/mental-health",
    examples: [
      "How do I manage anxiety naturally?",
      "What are signs of burnout?",
      "Can lack of sleep cause depression?",
    ],
  },
];

const ChatExamples = () => {
  return (
    <div className="scrollbar px-4 dark:text-neutral-300 overflow-auto">
      <h3 className="font-semibold text-sm font-mono">Examples:</h3>
      <div className="mt-3 grid gap-2 overflow-auto">
        {exampleCategories.map((category, index) => (
          <div
            key={index}
            className="w-full text-sm font-semibold dark:text-neutral-300 bg-neutral-200/40 dark:bg-neutral-600/20  px-2 py-2.5 rounded-md"
          >
            {category.title}
            <div className="mt-2 font-normal font-mono dark:text-neutral-400 flex flex-col">
              {category.examples.map((example, i) => (
                <Link
                  key={i}
                  href={`${category.href}#0${i + 1}`}
                  className="hover:bg-slate-200/90 dark:hover:bg-slate-700 p-1 transition-colors rounded-md text-left"
                >
                  {i + 1}. {example}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatExamples;
