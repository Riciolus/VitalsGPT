import Card from "@/components/ui/card";
import Input from "@/components/ui/input";
import { useState } from "react";

export default function ChatInterface() {
  const [userMessage, setUserMessage] = useState<string>("");
  const [vitalsResponse, setVitalsResponse] = useState<string[]>([]);

  const handleVitalsChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userMessage.trim()) return;

    setVitalsResponse([]);

    const url = `${process.env.NEXT_PUBLIC_VITALS_API_URL}?message=${encodeURIComponent(
      userMessage
    )}`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      const data = event.data;

      setVitalsResponse((prev) => [...prev, data]);
    };

    // Handle errors
    eventSource.onerror = function () {
      console.info("Error receiving stream");
      eventSource.close();
    };
  };

  return (
    <>
      <div className="relative w-full flex flex-col justify-center items-center ">
        {/* whole no session interface */}
        <div className=" gap-3  w-full h-full">
          <ul>
            {vitalsResponse.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>

        <div className="absolute bottom-0">
          {/* input question */}
          <form onSubmit={(e) => handleVitalsChat(e)}>
            <Input
              id="vitalsInput"
              onChange={(e) => setUserMessage(e.target.value)}
              placeholder="Should I take a multivitamin?"
              className="w-96 h-12"
            />
          </form>
        </div>
      </div>
    </>
  );
}
