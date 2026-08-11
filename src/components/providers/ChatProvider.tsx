// "use client";

// import {
//   createContext,
//   useContext,
//   useState,
// } from "react";

// import { ChatMessage } from "@/types/chat";


// interface ChatContextType {

//   messages: ChatMessage[];

//   isLoading: boolean;

//   sendUserMessage: (
//     content: string
//   ) => void;

//   addAIMessage: (
//     content: string
//   ) => void;

//   clearChat: () => void;

//   setIsLoading: (
//     value: boolean
//   ) => void;

// }



// const ChatContext =
// createContext<ChatContextType | undefined>(
//   undefined
// );



// export const ChatProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {


//   const [messages, setMessages] =
//     useState<ChatMessage[]>([]);


//   const [isLoading, setIsLoading] =
//     useState(false);



//   const sendUserMessage = (
//     content: string
//   ) => {


//     const message: ChatMessage = {

//       id: crypto.randomUUID(),

//       role: "user",

//       content,

//       createdAt: new Date(),

//     };


//     setMessages((prev) => [
//       ...prev,
//       message,
//     ]);

//   };



//   const addAIMessage = (
//     content: string
//   ) => {


//     const message: ChatMessage = {

//       id: crypto.randomUUID(),

//       role: "assistant",

//       content,

//       createdAt: new Date(),

//     };


//     setMessages((prev) => [
//       ...prev,
//       message,
//     ]);

//   };



//   const clearChat = () => {

//     setMessages([]);

//   };



//   return (

//     <ChatContext.Provider

//       value={{

//         messages,

//         isLoading,

//         sendUserMessage,

//         addAIMessage,

//         clearChat,

//         setIsLoading,

//       }}

//     >

//       {children}

//     </ChatContext.Provider>

//   );

// };



// export const useChatContext = () => {


//   const context =
//     useContext(ChatContext);



//   if (!context) {

//     throw new Error(
//       "useChatContext must be used inside ChatProvider"
//     );

//   }


//   return context;


// };










"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

import { ChatMessage } from "@/types/chat";
import { sendMessageToAI } from "@/lib/api";

interface ChatContextType {
  messages: ChatMessage[];

  isLoading: boolean;

  sendUserMessage: (
    content: string
  ) => Promise<void>;

  addAIMessage: (
    content: string
  ) => void;

  clearChat: () => void;

  setIsLoading: (
    value: boolean
  ) => void;
}

const ChatContext =
  createContext<ChatContextType | undefined>(
    undefined
  );

export const ChatProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [isLoading, setIsLoading] =
    useState(false);

  const sendUserMessage = async (
    content: string
  ) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date(),
    };

    const updatedMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const stream =
        await sendMessageToAI(
          updatedMessages
        );

      const reader =
        stream.getReader();

      const decoder =
        new TextDecoder();

      const aiMessageId =
        crypto.randomUUID();

      let aiContent = "";

      setMessages((prev) => [
        ...prev,
        {
          id: aiMessageId,
          role: "assistant",
          content: "",
          createdAt: new Date(),
        },
      ]);

      while (true) {
        const { value, done } =
          await reader.read();

        if (done) break;

        const chunk =
          decoder.decode(value, {
            stream: true,
          });

        aiContent += chunk;

        setMessages((prev) =>
          prev.map((message) =>
            message.id === aiMessageId
              ? {
                  ...message,
                  content: aiContent,
                }
              : message
          )
        );
      }
    } catch (error) {
      console.error(
        "Failed to send message:",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const addAIMessage = (
    content: string
  ) => {
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      role: "assistant",
      content,
      createdAt: new Date(),
    };

    setMessages((prev) => [
      ...prev,
      message,
    ]);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        sendUserMessage,
        addAIMessage,
        clearChat,
        setIsLoading,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context =
    useContext(ChatContext);

  if (!context) {
    throw new Error(
      "useChatContext must be used inside ChatProvider"
    );
  }

  return context;
};