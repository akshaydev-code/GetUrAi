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
  const { messages, isLoading } = useChat();

  const containerRef =
    useRef<HTMLDivElement>(null);

  const previousMessageCount =
    useRef(messages.length);

  useEffect(() => {
    const container =
      containerRef.current;

    if (!container) return;

    const isNewMessage =
      messages.length >
      previousMessageCount.current;

    previousMessageCount.current =
      messages.length;

    // New user/AI message aaya
    if (isNewMessage) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });

      return;
    }

    // AI streaming ke time
    // direct bottom par rakho
    if (isLoading) {
      container.scrollTop =
        container.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={containerRef}
      className="
        flex-1
        overflow-y-auto
        px-6
        py-5
      "
    >
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
        </div>
      )}
    </div>
  );
};

export default ChatWindow;