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










// "use client";

// import {
//   createContext,
//   useContext,
//   useState,
// } from "react";

// import { ChatMessage } from "@/types/chat";
// import { sendMessageToAI } from "@/lib/api";

// interface ChatContextType {
//   messages: ChatMessage[];

//   isLoading: boolean;

//   sendUserMessage: (
//     content: string
//   ) => Promise<void>;

//   addAIMessage: (
//     content: string
//   ) => void;

//   clearChat: () => void;

//   setIsLoading: (
//     value: boolean
//   ) => void;
// }

// const ChatContext =
//   createContext<ChatContextType | undefined>(
//     undefined
//   );

// export const ChatProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [messages, setMessages] =
//     useState<ChatMessage[]>([]);

//   const [isLoading, setIsLoading] =
//     useState(false);

//   // const sendUserMessage = async (
//   //   content: string
//   // ) => {
//   //   const userMessage: ChatMessage = {
//   //     id: crypto.randomUUID(),
//   //     role: "user",
//   //     content,
//   //     createdAt: new Date(),
//   //   };

//   //   const updatedMessages = [
//   //     ...messages,
//   //     userMessage,
//   //   ];

//   //   setMessages(updatedMessages);
//   //   setIsLoading(true);

//   //   try {
//   //     const stream =
//   //       await sendMessageToAI(
//   //         updatedMessages
//   //       );

//   //     const reader =
//   //       stream.getReader();

//   //     const decoder =
//   //       new TextDecoder();

//   //     const aiMessageId =
//   //       crypto.randomUUID();

//   //     let aiContent = "";

//   //     setMessages((prev) => [
//   //       ...prev,
//   //       {
//   //         id: aiMessageId,
//   //         role: "assistant",
//   //         content: "",
//   //         createdAt: new Date(),
//   //       },
//   //     ]);

//   //     while (true) {
//   //       const { value, done } =
//   //         await reader.read();

//   //       if (done) break;

//   //       const chunk =
//   //         decoder.decode(value, {
//   //           stream: true,
//   //         });

//   //       aiContent += chunk;

//   //       setMessages((prev) =>
//   //         prev.map((message) =>
//   //           message.id === aiMessageId
//   //             ? {
//   //                 ...message,
//   //                 content: aiContent,
//   //               }
//   //             : message
//   //         )
//   //       );
//   //     }
//   //   } catch (error) {
//   //     console.error(
//   //       "Failed to send message:",
//   //       error
//   //     );
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };



//   const sendUserMessage = async (content: string) => {
//   const userMessage: ChatMessage = {
//     id: crypto.randomUUID(),
//     role: "user",
//     content,
//     createdAt: new Date(),
//   };

//   // User message immediately UI me show karo
//   setMessages((prev) => [...prev, userMessage]);

//   setIsLoading(true);

//   try {
//     // Current conversation + new user message
//     const conversationMessages = [
//       ...messages,
//       userMessage,
//     ];

//     const stream =
//       await sendMessageToAI(conversationMessages);

//     const reader = stream.getReader();
//     const decoder = new TextDecoder();

//     const aiMessageId = crypto.randomUUID();

//     let aiContent = "";

//     // Empty assistant message create karo
//     setMessages((prev) => [
//       ...prev,
//       {
//         id: aiMessageId,
//         role: "assistant",
//         content: "",
//         createdAt: new Date(),
//       },
//     ]);

//     // Streaming response read karo
//     while (true) {
//       const { value, done } =
//         await reader.read();

//       if (done) break;

//       const chunk = decoder.decode(value, {
//         stream: true,
//       });

//       aiContent += chunk;

//       // Same AI message continuously update
//       setMessages((prev) =>
//         prev.map((message) =>
//           message.id === aiMessageId
//             ? {
//                 ...message,
//                 content: aiContent,
//               }
//             : message
//         )
//       );
//     }
//   } catch (error) {
//     console.error(
//       "Failed to send message:",
//       error
//     );
//   } finally {
//     setIsLoading(false);
//   }
// };



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







// "use client";

// import {
//   createContext,
//   useContext,
//   useState,
// } from "react";

// import { ChatMessage } from "@/types/chat";
// import { sendMessageToAI } from "@/lib/api";

// interface Conversation {
//   id: string;
//   title: string;
//   messages: ChatMessage[];
//   createdAt: string;
//   updatedAt: string;
// }

// interface ChatContextType {
//   messages: ChatMessage[];

//   isLoading: boolean;

//   conversations: Conversation[];

//   conversationId: string;

//   sendUserMessage: (
//     content: string
//   ) => Promise<void>;

//   addAIMessage: (
//     content: string
//   ) => void;

//   clearChat: () => void;

//   createNewChat: () => void;

//   selectConversation: (
//     id: string
//   ) => void;

//   deleteConversation: (
//     id: string
//   ) => void;

//   setIsLoading: (
//     value: boolean
//   ) => void;
// }

// const ChatContext =
//   createContext<ChatContextType | undefined>(
//     undefined
//   );

// const STORAGE_KEY =
//   "openchatai-conversations";

// const getStoredConversations =
//   (): Conversation[] => {
//     if (
//       typeof window === "undefined"
//     ) {
//       return [];
//     }

//     try {
//       const stored =
//         localStorage.getItem(
//           STORAGE_KEY
//         );

//       if (!stored) {
//         return [];
//       }

//       return JSON.parse(stored);
//     } catch (error) {
//       console.error(
//         "Failed to read conversations:",
//         error
//       );

//       return [];
//     }
//   };

// const saveConversations = (
//   conversations: Conversation[]
// ) => {
//   if (
//     typeof window === "undefined"
//   ) {
//     return;
//   }

//   localStorage.setItem(
//     STORAGE_KEY,
//     JSON.stringify(conversations)
//   );
// };

// export const ChatProvider = ({
//   children,
// }: {
//   children: React.ReactNode;
// }) => {
//   const [conversations, setConversations] =
//     useState<Conversation[]>(
//       getStoredConversations
//     );

//   const [conversationId, setConversationId] =
//     useState<string>(() => {
//       const stored =
//         getStoredConversations();

//       if (stored.length > 0) {
//         const sorted = [...stored].sort(
//           (a, b) =>
//             new Date(
//               b.updatedAt
//             ).getTime() -
//             new Date(
//               a.updatedAt
//             ).getTime()
//         );

//         return sorted[0].id;
//       }

//       return crypto.randomUUID();
//     });

//   const [messages, setMessages] =
//     useState<ChatMessage[]>(() => {
//       const stored =
//         getStoredConversations();

//       if (stored.length === 0) {
//         return [];
//       }

//       const sorted = [...stored].sort(
//         (a, b) =>
//           new Date(
//             b.updatedAt
//           ).getTime() -
//           new Date(
//             a.updatedAt
//           ).getTime()
//       );

//       return sorted[0].messages;
//     });

//   const [isLoading, setIsLoading] =
//     useState(false);

//   const updateConversation = (
//     newMessages: ChatMessage[]
//   ) => {
//     const now =
//       new Date().toISOString();

//     const firstUserMessage =
//       newMessages.find(
//         (message) =>
//           message.role === "user"
//       );

//     const title =
//       firstUserMessage?.content
//         .trim()
//         .slice(0, 40) ||
//       "New Chat";

//     setConversations((prev) => {
//       const existingIndex =
//         prev.findIndex(
//           (conversation) =>
//             conversation.id ===
//             conversationId
//         );

//       const existing =
//         existingIndex >= 0
//           ? prev[existingIndex]
//           : undefined;

//       const conversation: Conversation = {
//         id: conversationId,

//         title,

//         messages: newMessages,

//         createdAt:
//           existing?.createdAt ||
//           now,

//         updatedAt: now,
//       };

//       let updated: Conversation[];

//       if (existingIndex >= 0) {
//         updated = [...prev];

//         updated[existingIndex] =
//           conversation;
//       } else {
//         updated = [
//           ...prev,
//           conversation,
//         ];
//       }

//       saveConversations(updated);

//       return updated;
//     });
//   };

//   const sendUserMessage = async (
//     content: string
//   ) => {
//     const userMessage: ChatMessage = {
//       id: crypto.randomUUID(),

//       role: "user",

//       content,

//       createdAt: new Date(),
//     };

//     const conversationMessages = [
//       ...messages,
//       userMessage,
//     ];

//     setMessages(
//       conversationMessages
//     );

//     updateConversation(
//       conversationMessages
//     );

//     setIsLoading(true);

//     try {
//       const stream =
//         await sendMessageToAI(
//           conversationMessages
//         );

//       const reader =
//         stream.getReader();

//       const decoder =
//         new TextDecoder();

//       const aiMessageId =
//         crypto.randomUUID();

//       let aiContent = "";

//       const aiMessage: ChatMessage = {
//         id: aiMessageId,

//         role: "assistant",

//         content: "",

//         createdAt: new Date(),
//       };

//       setMessages((prev) => [
//         ...prev,
//         aiMessage,
//       ]);

//       while (true) {
//         const {
//           value,
//           done,
//         } = await reader.read();

//         if (done) break;

//         const chunk =
//           decoder.decode(value, {
//             stream: true,
//           });

//         aiContent += chunk;

//         setMessages((prev) => {
//           const updated =
//             prev.map(
//               (message) =>
//                 message.id ===
//                 aiMessageId
//                   ? {
//                       ...message,
//                       content:
//                         aiContent,
//                     }
//                   : message
//             );

//           updateConversation(
//             updated
//           );

//           return updated;
//         });
//       }
//     } catch (error) {
//       console.error(
//         "Failed to send message:",
//         error
//       );
//     } finally {
//       setIsLoading(false);
//     }
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

//     setMessages((prev) => {
//       const updated = [
//         ...prev,
//         message,
//       ];

//       updateConversation(
//         updated
//       );

//       return updated;
//     });
//   };

//   const createNewChat = () => {
//     if (isLoading) return;

//     const newId =
//       crypto.randomUUID();

//     setConversationId(newId);

//     setMessages([]);
//   };

//   const selectConversation = (
//     id: string
//   ) => {
//     if (isLoading) return;

//     const conversation =
//       conversations.find(
//         (item) => item.id === id
//       );

//     if (!conversation) return;

//     setConversationId(
//       conversation.id
//     );

//     setMessages(
//       conversation.messages
//     );
//   };

//   const deleteConversation = (
//     id: string
//   ) => {
//     const updated =
//       conversations.filter(
//         (conversation) =>
//           conversation.id !== id
//       );

//     setConversations(updated);

//     saveConversations(updated);

//     if (id === conversationId) {
//       const newId =
//         crypto.randomUUID();

//       setConversationId(newId);

//       setMessages([]);
//     }
//   };

//   const clearChat = () => {
//     setMessages([]);
//   };

//   return (
//     <ChatContext.Provider
//       value={{
//         messages,

//         isLoading,

//         conversations,

//         conversationId,

//         sendUserMessage,

//         addAIMessage,

//         clearChat,

//         createNewChat,

//         selectConversation,

//         deleteConversation,

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
  useEffect,
  useRef,
  useState,
} from "react";

import { ChatMessage } from "@/types/chat";
import { sendMessageToAI } from "@/lib/api";

interface Conversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

interface ChatContextType {
  messages: ChatMessage[];

  isLoading: boolean;

  conversations: Conversation[];

  conversationId: string;

  sendUserMessage: (
    content: string
  ) => Promise<void>;

  addAIMessage: (
    content: string
  ) => void;

  clearChat: () => void;

  createNewChat: () => void;

  selectConversation: (
    id: string
  ) => void;

  deleteConversation: (
    id: string
  ) => void;

  renameConversation: (
    id: string,
    title: string
  ) => void;

  stopGenerating: () => void;

  regenerateMessage: (
    messageId: string
  ) => Promise<void>;

  editMessage: (
    messageId: string,
    newContent: string
  ) => Promise<void>;

  setIsLoading: (
    value: boolean
  ) => void;
}

const ChatContext =
  createContext<ChatContextType | undefined>(
    undefined
  );

const STORAGE_KEY =
  "openchatai-conversations";

const getStoredConversations =
  (): Conversation[] => {
    if (
      typeof window === "undefined"
    ) {
      return [];
    }

    try {
      const stored =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (!stored) {
        return [];
      }

      return JSON.parse(stored);
    } catch (error) {
      console.error(
        "Failed to read conversations:",
        error
      );

      return [];
    }
  };

const saveConversations = (
  conversations: Conversation[]
) => {
  if (
    typeof window === "undefined"
  ) {
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(conversations)
  );
};


const STREAM_UPDATE_INTERVAL = 45;

const streamAIResponse = async ({
  stream,
  onUpdate,
}: {
  stream: ReadableStream<Uint8Array>;
  onUpdate: (content: string) => void;
}) => {
  const reader = stream.getReader();
  const decoder = new TextDecoder();

  let content = "";
  let pending = "";
  let lastUpdate = Date.now();

  while (true) {
    const { value, done } = await reader.read();

    if (done) break;

    const chunk = decoder.decode(value, {
      stream: true,
    });

    if (!chunk) continue;

    pending += chunk;

    const now = Date.now();

    if (
      now - lastUpdate >=
      STREAM_UPDATE_INTERVAL
    ) {
      content += pending;
      pending = "";

      onUpdate(content);

      lastUpdate = now;
    }
  }

  pending += decoder.decode();

  if (pending) {
    content += pending;
    onUpdate(content);
  }

  return content;
};

export const ChatProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  const [conversationId, setConversationId] =
    useState<string>(() =>
      crypto.randomUUID()
    );

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [isLoading, setIsLoading] =
    useState(false);

  useEffect(() => {
    const loadStoredConversations = () => {
      const stored = getStoredConversations();

      if (stored.length === 0) {
        return;
      }

      const sorted = [...stored].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime()
      );

      const latestConversation = sorted[0];

      setConversations(stored);
      setConversationId(latestConversation.id);
      setMessages(latestConversation.messages);
    };

    const timer = window.setTimeout(
      loadStoredConversations,
      0
    );

    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  // Current AI request controller
  const abortControllerRef =
    useRef<AbortController | null>(
      null
    );

  const updateConversation = (
    newMessages: ChatMessage[]
  ) => {
    const now =
      new Date().toISOString();

    const firstUserMessage =
      newMessages.find(
        (message) =>
          message.role === "user"
      );

    const title =
      firstUserMessage?.content
        .trim()
        .slice(0, 40) ||
      "New Chat";

    setConversations((prev) => {
      const existingIndex =
        prev.findIndex(
          (conversation) =>
            conversation.id ===
            conversationId
        );

      const existing =
        existingIndex >= 0
          ? prev[existingIndex]
          : undefined;

      const conversation: Conversation = {
        id: conversationId,

        title,

        messages: newMessages,

        createdAt:
          existing?.createdAt ||
          now,

        updatedAt: now,
      };

      let updated: Conversation[];

      if (existingIndex >= 0) {
        updated = [...prev];

        updated[existingIndex] =
          conversation;
      } else {
        updated = [
          ...prev,
          conversation,
        ];
      }

      saveConversations(updated);

      return updated;
    });
  };

  const sendUserMessage = async (
    content: string
  ) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date(),
    };

    const conversationMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(conversationMessages);
    updateConversation(conversationMessages);

    const controller = new AbortController();

    abortControllerRef.current = controller;
    setIsLoading(true);

    try {
      const stream = await sendMessageToAI(
        conversationMessages,
        controller.signal
      );

      const aiMessageId = crypto.randomUUID();

      const aiMessage: ChatMessage = {
        id: aiMessageId,
        role: "assistant",
        content: "",
        createdAt: new Date(),
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      await streamAIResponse({
        stream,

        onUpdate: (content) => {
          setMessages((prev) => {
            const updated = prev.map(
              (message) =>
                message.id === aiMessageId
                  ? {
                    ...message,
                    content,
                  }
                  : message
            );

            updateConversation(updated);

            return updated;
          });
        },
      });
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        console.log("AI generation stopped");
      } else {
        console.error(
          "Failed to send message:",
          error
        );
      }
    } finally {
      abortControllerRef.current = null;
      setIsLoading(false);
    }
  };

  const stopGenerating = () => {
    if (
      !abortControllerRef.current
    ) {
      return;
    }

    abortControllerRef.current.abort();

    abortControllerRef.current =
      null;

    setIsLoading(false);
  };

  const regenerateMessage = async (
    messageId: string
  ) => {
    if (isLoading) {
      return;
    }

    const currentMessages = [...messages];

    const messageIndex =
      currentMessages.findIndex(
        (message) =>
          message.id === messageId
      );

    if (messageIndex === -1) {
      console.error(
        "Message not found:",
        messageId
      );
      return;
    }

    const assistantMessage =
      currentMessages[messageIndex];

    if (
      assistantMessage.role !==
      "assistant"
    ) {
      console.error(
        "Regenerate can only be used on AI messages."
      );
      return;
    }

    // AI response se pehle tak ke messages
    const conversationMessages =
      currentMessages.slice(
        0,
        messageIndex
      );

    // Previous message user ka hona chahiye
    const lastMessage =
      conversationMessages[
      conversationMessages.length - 1
      ];

    if (
      !lastMessage ||
      lastMessage.role !== "user"
    ) {
      console.error(
        "No user message found before AI response."
      );
      return;
    }

    // Old AI response immediately remove
    setMessages(
      conversationMessages
    );

    // LocalStorage immediately update
    updateConversation(
      conversationMessages
    );

    // New controller
    const controller =
      new AbortController();

    abortControllerRef.current =
      controller;

    setIsLoading(true);

    try {
      console.log(
        "Regenerating response..."
      );

      const stream = await sendMessageToAI(
        conversationMessages,
        controller.signal,
        0.95,
        true
      );

      const aiMessageId = crypto.randomUUID();

      const aiMessage: ChatMessage = {
        id: aiMessageId,
        role: "assistant",
        content: "",
        createdAt: new Date(),
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      await streamAIResponse({
        stream,

        onUpdate: (content) => {
          setMessages((prev) => {
            const updated = [
              ...conversationMessages,
              {
                ...aiMessage,
                content,
              },
            ];

            updateConversation(updated);

            return updated;
          });
        },
      });

      console.log(
        "Regeneration completed"
      );
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        console.log(
          "Regeneration stopped"
        );
      } else {
        console.error(
          "Regeneration failed:",
          error
        );
      }
    } finally {
      abortControllerRef.current =
        null;

      setIsLoading(false);
    }
  };

  const editMessage = async (
    messageId: string,
    newContent: string
  ) => {
    if (isLoading) return;

    const trimmedContent = newContent.trim();

    if (!trimmedContent) return;

    const messageIndex = messages.findIndex(
      (message) => message.id === messageId
    );

    if (messageIndex === -1) return;

    const targetMessage = messages[messageIndex];

    if (targetMessage.role !== "user") {
      return;
    }

    // Edited user message
    const editedMessage: ChatMessage = {
      ...targetMessage,
      content: trimmedContent,
      createdAt: new Date(),
    };

    // Old message ke baad ki purani conversation remove
    const conversationMessages = [
      ...messages.slice(0, messageIndex),
      editedMessage,
    ];

    setMessages(conversationMessages);

    updateConversation(conversationMessages);

    const controller = new AbortController();

    abortControllerRef.current = controller;

    setIsLoading(true);

    try {
      const stream = await sendMessageToAI(
        conversationMessages,
        controller.signal
      );

      const aiMessageId = crypto.randomUUID();

      const aiMessage: ChatMessage = {
        id: aiMessageId,
        role: "assistant",
        content: "",
        createdAt: new Date(),
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      await streamAIResponse({
        stream,

        onUpdate: (content) => {
          setMessages((prev) => {
            const updated = [
              ...conversationMessages,
              {
                ...aiMessage,
                content,
              },
            ];

            updateConversation(updated);

            return updated;
          });
        },
      });
    } catch (error) {
      if (
        error instanceof DOMException &&
        error.name === "AbortError"
      ) {
        console.log("Edit generation stopped");
      } else {
        console.error(
          "Failed to edit message:",
          error
        );
      }
    } finally {
      abortControllerRef.current = null;
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

    setMessages((prev) => {
      const updated = [
        ...prev,
        message,
      ];

      updateConversation(
        updated
      );

      return updated;
    });
  };

  const createNewChat = () => {
    if (isLoading) return;

    const newId =
      crypto.randomUUID();

    setConversationId(newId);

    setMessages([]);
  };

  const selectConversation = (
    id: string
  ) => {
    if (isLoading) return;

    const conversation =
      conversations.find(
        (item) => item.id === id
      );

    if (!conversation) return;

    setConversationId(
      conversation.id
    );

    setMessages(
      conversation.messages
    );
  };

  const deleteConversation = (
    id: string
  ) => {
    const updated =
      conversations.filter(
        (conversation) =>
          conversation.id !== id
      );

    setConversations(updated);

    saveConversations(updated);

    if (id === conversationId) {
      const newId =
        crypto.randomUUID();

      setConversationId(newId);

      setMessages([]);
    }
  };

  const renameConversation = (
    id: string,
    title: string
  ) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    const updated = conversations.map(
      (conversation) =>
        conversation.id === id
          ? {
            ...conversation,
            title: trimmedTitle.slice(0, 60),
            updatedAt:
              new Date().toISOString(),
          }
          : conversation
    );

    setConversations(updated);
    saveConversations(updated);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,

        isLoading,

        conversations,

        conversationId,

        sendUserMessage,

        addAIMessage,

        clearChat,

        createNewChat,

        selectConversation,

        deleteConversation,

        renameConversation,

        stopGenerating,

        regenerateMessage,

        editMessage,

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