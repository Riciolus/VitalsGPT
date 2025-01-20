import useChatSession from "@/store/useChatSessionStore";
import { useEffect } from "react";
import Categories from "./categories";

export interface UserChatSession {
  sessionId: string; // or number, depending on your actual data type
  title: string;
  updatedAt: Date;
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

  return categories;
};

const SessionHistory = () => {
  const userChatSession = useChatSession((state) => state.userChatSession);
  const setUserChatSession = useChatSession((state) => state.setUserChatSession);

  useEffect(() => {
    getUserChatSession()
      .then((res) => {
        setUserChatSession(res);
      })
      .catch((error) => console.log(error));
  }, [setUserChatSession]);

  const categories = categorizeSessions(userChatSession);

  return (
    <div className="no-scrollbar h-full overflow-y-auto">
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
    </div>
  );
};

export default SessionHistory;
