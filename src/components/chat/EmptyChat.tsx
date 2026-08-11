"use client";

import { suggestedPrompts } from "@/data/prompts";
import { useChat } from "@/hooks/useChat";


const EmptyChat = () => {

  const {
    sendUserMessage
  } = useChat();



  return (

    <div className="h-full flex flex-col items-center justify-center text-center px-4">


      <h1 className="text-3xl font-bold mb-3">
        Welcome to GetUrAi
      </h1>


      <p className="text-muted-foreground mb-8">
        Start a conversation by choosing a prompt below
        or ask anything.
      </p>



      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">


        {
          suggestedPrompts.map((item) => (

            <button

              key={item.id}

              onClick={() =>
                sendUserMessage(item.prompt)
              }

              className="
                border rounded-xl
                p-4
                text-left
                hover:bg-accent
                transition
              "

            >

              <h3 className="font-semibold mb-1">
                {item.title}
              </h3>


              <p className="text-sm text-muted-foreground">
                {item.prompt}
              </p>


            </button>

          ))
        }


      </div>


    </div>

  );

};


export default EmptyChat;