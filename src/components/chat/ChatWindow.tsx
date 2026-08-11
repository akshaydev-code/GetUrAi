// "use client";

// import EmptyChat from "./EmptyChat";
// import MessageBubble from "./MessageBubble";

// import { useChat } from "@/hooks/useChat";


// const ChatWindow = () => {

//   const {
//     messages
//   } = useChat();



//   return (

//     <div className="flex-1 overflow-y-auto px-6 py-5">

//       {
//         messages.length === 0 ? (

//           <EmptyChat />

//         ) : (

//           <div className="space-y-5">

//             {
//               messages.map((message) => (

//                 <MessageBubble

//                   key={message.id}

//                   role={message.role}

//                   content={message.content}

//                 />

//               ))
//             }

//           </div>

//         )
//       }

//     </div>

//   );

// };


// export default ChatWindow;










"use client";

import {
  useEffect,
  useRef,
} from "react";

import EmptyChat from "./EmptyChat";
import MessageBubble from "./MessageBubble";

import { useChat } from "@/hooks/useChat";

const ChatWindow = () => {
  const { messages } = useChat();

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-6 py-5">
      {messages.length === 0 ? (
        <EmptyChat />
      ) : (
        <div className="space-y-5">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              id={message.id}
              role={message.role}
              content={message.content}
            />
          ))}

          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;