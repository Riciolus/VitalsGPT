import Input from "@/components/ui/input";
import SubmitButton from "./submitButton";
import ModelsType from "./modelsType";

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
    <div className="flex flex-col">
      <Input
        id="vitalsInput"
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder={placeholder}
        className="w-[20rem] md:w-96 h-12 text-neutral-600 dark:text-neutral-200"
        value={userMessage}
      >
        <SubmitButton />
      </Input>
      <ModelsType />
    </div>
  );
};

export default Chatbox;
