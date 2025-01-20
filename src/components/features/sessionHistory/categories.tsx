import { UserChatSession } from "./SessionHistory";
import { useParams } from "next/navigation";
import SessionTitle from "./sessionTitle";

const Categories = ({
  title,
  chatSessions,
}: {
  title: string;
  chatSessions: UserChatSession[];
}) => {
  // sessionId
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex flex-col gap-1.5 text-sm font-medium  ">
      <span className="px-2 mb-2 border-neutral-600 ">{title}</span>
      {chatSessions &&
        chatSessions.map((session) => (
          <SessionTitle
            key={session.sessionId}
            chatSession={session}
            isActive={session.sessionId === id}
          />
        ))}
    </div>
  );
};

export default Categories;
