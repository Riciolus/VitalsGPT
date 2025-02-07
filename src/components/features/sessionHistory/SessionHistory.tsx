import useChatSession from "@/store/useChatSessionStore";
import { useEffect, useState } from "react";
import Categories from "./categories";
import ChatExamples from "@/components/sidebar/ChatExamples";
import { cn } from "@/lib/utils";

export interface UserChatSession {
  sessionId?: string; // or number, depending on your actual data type
  title?: string;
  updatedAt: Date | string;
}

const getUserChatSession = async () => {
  const response = await fetch(`/api/session`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // Ensure the content type is JSON
    },
  });

  const data = await response.json();

  return data;
};

const categorizeSessions = (userChatSession: UserChatSession[]) => {
  const today = new Date();

  const startOfToday = new Date(today.setHours(0, 0, 0, 0));

  const startOfYesterday = new Date(startOfToday);
  startOfYesterday.setDate(startOfYesterday.getDate() - 1);

  const startOfLast7Days = new Date(startOfToday);
  startOfLast7Days.setDate(startOfLast7Days.getDate() - 7);

  const startOfLast30Days = new Date(startOfToday);
  startOfLast30Days.setDate(startOfLast30Days.getDate() - 30);

  const categories: {
    today: UserChatSession[];
    yesterday: UserChatSession[];
    last7Days: UserChatSession[];
    last30Days: UserChatSession[];
  } = {
    today: [],
    yesterday: [],
    last7Days: [],
    last30Days: [],
  };

  userChatSession.forEach((session) => {
    const updatedAt = new Date(session.updatedAt);

    if (updatedAt >= startOfToday) {
      categories.today.push(session);
    } else if (updatedAt >= startOfYesterday && updatedAt < startOfToday) {
      categories.yesterday.push(session);
    } else if (updatedAt >= startOfLast7Days && updatedAt < startOfYesterday) {
      categories.last7Days.push(session);
    } else if (updatedAt >= startOfLast30Days && updatedAt < startOfLast7Days) {
      categories.last30Days.push(session);
    }
  });

  // Sort each category by updatedAt in descending order
  Object.keys(categories).forEach((category) => {
    categories[category as keyof typeof categories].sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  });

  return categories;
};

const SessionHistory = () => {
  const [isLoading, setIsLoading] = useState(true);
  const userChatSession = useChatSession((state) => state.userChatSession);
  const searchHistory = useChatSession((state) => state.searchHistory);
  const query = useChatSession((state) => state.query);

  const setUserChatSession = useChatSession((state) => state.setUserChatSession);

  useEffect(() => {
    getUserChatSession()
      .then((res) => {
        setUserChatSession(res);
      })
      .finally(() => setTimeout(() => setIsLoading(false), 1000))
      .catch((error) => console.log(error));
  }, [setUserChatSession]);

  if (isLoading) {
    return (
      <div className="px-5 grid gap-2.5 ">
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className={cn(
              "w-full h-7 opacity-20 rounded-md animate-pulse bg-neutral-300 dark:bg-neutral-700",
              i > 5 && "opacity-10",
              i > 9 && "opacity-5"
            )}
          />
        ))}
      </div>
    );
  }

  const categories = categorizeSessions(userChatSession);

  return (
    <div className="scrollbar h-max overflow-y-auto ">
      {userChatSession.length === 0 ? (
        <ChatExamples />
      ) : (
        <div className="px-3 flex flex-col gap-6">
          {query.length > 0 ? ( // ✅ Ensure query is actually being checked
            searchHistory.length > 0 ? (
              <Categories chatSessions={searchHistory} />
            ) : (
              <div className="font-medium text-center text-base font-mono">No results found :/</div> // ✅ Show only when searching but no results found
            )
          ) : (
            <>
              {categories.today.length !== 0 && (
                <Categories title="Today" chatSessions={categories.today} />
              )}

              {categories.yesterday.length !== 0 && (
                <Categories title="Yesterday" chatSessions={categories.yesterday} />
              )}

              {categories.last7Days.length !== 0 && (
                <Categories title="Previous 7 Days" chatSessions={categories.last7Days} />
              )}

              {categories.last30Days.length !== 0 && (
                <Categories title="Previous 30 Days" chatSessions={categories.last30Days} />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SessionHistory;
