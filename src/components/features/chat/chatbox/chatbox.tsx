import Input from "@/components/ui/input";

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
    <div className="relative flex">
      <Input
        id="vitalsInput"
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder={placeholder}
        className="w-[18.5rem] md:w-96 h-12 text-neutral-600 dark:text-neutral-200"
        value={userMessage}
      />

      {/* submit button */}
      <div className="absolute right-2 inset-y-0 flex justify-center items-center">
        <button
          type="submit"
          className="pr-1 pl-[0.185rem] py-1 bg-neutral-200 dark:bg-neutral-800/45 hover:bg-neutral-300/75 hover:dark:bg-neutral-800/80 rounded-lg"
        >
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className=" fill-neutral-600 dark:fill-neutral-300"
              d="M20.33 3.66996C20.1408 3.48213 19.9035 3.35008 19.6442 3.28833C19.3849 3.22659 19.1135 3.23753 18.86 3.31996L4.23 8.19996C3.95867 8.28593 3.71891 8.45039 3.54099 8.67255C3.36307 8.89471 3.25498 9.16462 3.23037 9.44818C3.20576 9.73174 3.26573 10.0162 3.40271 10.2657C3.5397 10.5152 3.74754 10.7185 4 10.85L10.07 13.85L13.07 19.94C13.1906 20.1783 13.3751 20.3785 13.6029 20.518C13.8307 20.6575 14.0929 20.7309 14.36 20.73H14.46C14.7461 20.7089 15.0192 20.6023 15.2439 20.4239C15.4686 20.2456 15.6345 20.0038 15.72 19.73L20.67 5.13996C20.7584 4.88789 20.7734 4.6159 20.7132 4.35565C20.653 4.09541 20.5201 3.85762 20.33 3.66996ZM4.85 9.57996L17.62 5.31996L10.53 12.41L4.85 9.57996ZM14.43 19.15L11.59 13.47L18.68 6.37996L14.43 19.15Z"
              fill="#000000"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
