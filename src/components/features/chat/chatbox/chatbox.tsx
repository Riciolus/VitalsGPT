import Input from "@/components/ui/input";
import SubmitButton from "./submitButton";

const Chatbox = ({
  userMessage,
  setUserMessage,
  placeholder,
}: {
  userMessage: string;
  setUserMessage: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
}) => {
  return (
    <div className="flex">
      <Input
        id="vitalsInput"
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder={placeholder}
        className="w-[18.5rem] md:w-96 h-12 text-neutral-600 dark:text-neutral-200"
        value={userMessage}
      >
        <SubmitButton />
      </Input>

      {/* submit button */}
    </div>
  );
};

export default Chatbox;
