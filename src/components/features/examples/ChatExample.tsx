import Card from "@/components/ui/card";

const formatAnswer = (answer: string) => {
  const regex = /(\d+\.)\s+/g;
  const parts = answer.split(regex).filter(Boolean);

  if (parts.length === 1) {
    return <p>{answer}</p>; // No numbered list, return plain text
  }

  const introText = parts[0].trim();
  const listItems = [];
  let lastItem = "";

  for (let i = 1; i < parts.length; i += 2) {
    const number = parts[i].trim();
    let content = parts[i + 1]?.trim() || "";

    // If this is the last item and it has extra text after it, split it
    if (i + 1 === parts.length - 1 && content.includes(". ")) {
      const lastIndex = content.lastIndexOf(". "); // Find last sentence break
      lastItem = content.substring(lastIndex + 2).trim(); // Store extra text
      content = content.substring(0, lastIndex + 1).trim(); // Keep only list content
    }

    listItems.push(
      <p key={i}>
        <span className="font-semibold text-neutral-400 font-mono">{number}</span> {content}
      </p>
    );
  }

  return (
    <div>
      <p>{introText}</p>
      <ul className="list-disc pl-5 py-3">{listItems}</ul>
      {lastItem && <p>{lastItem}</p>}
    </div>
  );
};

const ChatExample = ({
  number,
  question,
  answer,
}: {
  number: string;
  question: string;
  answer: string;
}) => (
  <div id={number} className="flex flex-col gap-3 md:mx-36 mt-7 py-3">
    <h3 className="font-mono ps-2">Example {number}:</h3>
    <div className="flex justify-end">
      <Card variant="user">{question}</Card>
    </div>
    <div className="flex justify-start w-[80%] gap-2">
      <div className="p-1 bg-slate-300 dark:bg-slate-500 h-fit rounded-full cursor-default">💊</div>
      <Card variant="assistant" className="text-sm md:text-base rounded-tl-sm mt-3">
        {formatAnswer(answer)}
      </Card>
    </div>
    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-zinc-700"></hr>
  </div>
);

export default ChatExample;
