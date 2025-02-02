import Input from "@/components/ui/input";
import useChatSession from "@/store/useChatSessionStore";

const Searchbar = () => {
  const setSearchHistory = useChatSession((state) => state.setSearchHistory);
  const clearSearchHistory = useChatSession((state) => state.clearSearchHistory);

  const handleSearch = (query: string) => {
    if (query.trim() !== "") {
      return setSearchHistory(query);
    }

    clearSearchHistory();
  };

  return <Input onChange={(e) => handleSearch(e.target.value)} placeholder="Search Chats" />;
};

export default Searchbar;
