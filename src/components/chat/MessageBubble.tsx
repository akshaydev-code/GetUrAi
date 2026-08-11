// import Avatar from "@/components/ui/Avatar";
// import { MessageRole } from "@/types/chat";


// interface MessageBubbleProps {
//   role: MessageRole;
//   content: string;
// }



// const MessageBubble = ({
//   role,
//   content,
// }: MessageBubbleProps) => {


//   const isUser = role === "user";



//   return (

//     <div
//       className={`
//         flex gap-3 items-start
//         ${isUser ? "justify-end" : "justify-start"}
//       `}
//     >


//       {
//         !isUser && (
//           <Avatar name="AI" />
//         )
//       }



//       <div
//         className={`
//           max-w-[75%]
//           rounded-2xl
//           px-4 py-3
//           whitespace-pre-wrap
//           text-sm
//           ${
//             isUser
//               ? "bg-black text-white"
//               : "bg-gray-100 text-gray-900"
//           }
//         `}
//       >

//         {content}

//       </div>



//       {
//         isUser && (
//           <Avatar name="You" />
//         )
//       }


//     </div>

//   );

// };


// export default MessageBubble;









// "use client";

// import { useState } from "react";
// import { Check, Copy } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// import Avatar from "@/components/ui/Avatar";
// import { MessageRole } from "@/types/chat";

// interface MessageBubbleProps {
//   role: MessageRole;
//   content: string;
// }

// const MessageBubble = ({
//   role,
//   content,
// }: MessageBubbleProps) => {
//   const isUser = role === "user";

//   const [copiedCode, setCopiedCode] =
//     useState<string | null>(null);

//   const handleCopy = async (code: string) => {
//     try {
//       await navigator.clipboard.writeText(code);

//       setCopiedCode(code);

//       setTimeout(() => {
//         setCopiedCode(null);
//       }, 2000);
//     } catch (error) {
//       console.error(
//         "Failed to copy code:",
//         error
//       );
//     }
//   };

//   return (
//     <div
//       className={`
//         flex
//         gap-3
//         items-start
//         ${
//           isUser
//             ? "justify-end"
//             : "justify-start"
//         }
//       `}
//     >
//       {!isUser && (
//         <Avatar name="AI" />
//       )}

//       <div
//         className={`
//           max-w-[75%]
//           rounded-2xl
//           px-4
//           py-3
//           text-sm
//           ${
//             isUser
//               ? "bg-black text-white"
//               : "bg-gray-100 text-gray-900"
//           }
//         `}
//       >
//         {isUser ? (
//           <div className="whitespace-pre-wrap">
//             {content}
//           </div>
//         ) : (
//           <div className="prose prose-sm max-w-none">
//             <ReactMarkdown
//               components={{
//                 code({
//                   className,
//                   children,
//                   ...props
//                 }) {
//                   const match =
//                     /language-(\w+)/.exec(
//                       className || ""
//                     );

//                   const code = String(
//                     children
//                   ).replace(/\n$/, "");

//                   if (!match) {
//                     return (
//                       <code
//                         className="
//                           rounded
//                           bg-gray-200
//                           px-1.5
//                           py-0.5
//                           font-mono
//                           text-[13px]
//                         "
//                         {...props}
//                       >
//                         {children}
//                       </code>
//                     );
//                   }

//                   return (
//                     <div className="my-4 overflow-hidden rounded-xl border border-gray-700">
//                       <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
//                         <span className="text-xs text-gray-300">
//                           {match[1]}
//                         </span>

//                         <button
//                           onClick={() =>
//                             handleCopy(code)
//                           }
//                           className="
//                             flex
//                             items-center
//                             gap-1.5
//                             rounded-md
//                             px-2
//                             py-1
//                             text-xs
//                             text-gray-300
//                             hover:bg-gray-700
//                             hover:text-white
//                           "
//                         >
//                           {copiedCode ===
//                           code ? (
//                             <>
//                               <Check
//                                 size={14}
//                               />
//                               Copied
//                             </>
//                           ) : (
//                             <>
//                               <Copy
//                                 size={14}
//                               />
//                               Copy
//                             </>
//                           )}
//                         </button>
//                       </div>

//                       <SyntaxHighlighter
//                         language={match[1]}
//                         style={oneDark}
//                         customStyle={{
//                           margin: 0,
//                           borderRadius: 0,
//                           padding: "16px",
//                           fontSize: "13px",
//                         }}
//                       >
//                         {code}
//                       </SyntaxHighlighter>
//                     </div>
//                   );
//                 },

//                 h1: ({ children }) => (
//                   <h1 className="mb-3 mt-4 text-2xl font-bold">
//                     {children}
//                   </h1>
//                 ),

//                 h2: ({ children }) => (
//                   <h2 className="mb-3 mt-4 text-xl font-bold">
//                     {children}
//                   </h2>
//                 ),

//                 h3: ({ children }) => (
//                   <h3 className="mb-2 mt-3 text-lg font-semibold">
//                     {children}
//                   </h3>
//                 ),

//                 p: ({ children }) => (
//                   <p className="mb-3 last:mb-0">
//                     {children}
//                   </p>
//                 ),

//                 ul: ({ children }) => (
//                   <ul className="mb-3 list-disc space-y-1 pl-5">
//                     {children}
//                   </ul>
//                 ),

//                 ol: ({ children }) => (
//                   <ol className="mb-3 list-decimal space-y-1 pl-5">
//                     {children}
//                   </ol>
//                 ),

//                 li: ({ children }) => (
//                   <li>{children}</li>
//                 ),

//                 blockquote: ({
//                   children,
//                 }) => (
//                   <blockquote className="my-3 border-l-4 border-gray-400 pl-4 italic text-gray-600">
//                     {children}
//                   </blockquote>
//                 ),
//               }}
//             >
//               {content}
//             </ReactMarkdown>
//           </div>
//         )}
//       </div>

//       {isUser && (
//         <Avatar name="You" />
//       )}
//     </div>
//   );
// };

// export default MessageBubble;








// "use client";

// import { useState } from "react";
// import {
//   Check,
//   Copy,
//   RefreshCw,
//   Pencil,
//   X,
// } from "lucide-react";
// import ReactMarkdown from "react-markdown";
// import {
//   Prism as SyntaxHighlighter,
// } from "react-syntax-highlighter";
// import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// import Avatar from "@/components/ui/Avatar";
// import { MessageRole } from "@/types/chat";
// import { useChat } from "@/hooks/useChat";

// interface MessageBubbleProps {
//   id: string;
//   role: MessageRole;
//   content: string;
// }

// const MessageBubble = ({
//   id,
//   role,
//   content,
// }: MessageBubbleProps) => {
//   const isUser = role === "user";

//   const {
//     regenerateMessage,
//     editMessage,
//     isLoading,
//   } = useChat();

//   const [copiedCode, setCopiedCode] =
//     useState<string | null>(null);

//   const [copiedResponse, setCopiedResponse] =
//     useState(false);

//   const [isEditing, setIsEditing] =
//     useState(false);

//   const [editText, setEditText] =
//     useState(content);

//   const handleCopy = async (
//     code: string
//   ) => {
//     try {
//       await navigator.clipboard.writeText(
//         code
//       );

//       setCopiedCode(code);

//       setTimeout(() => {
//         setCopiedCode(null);
//       }, 2000);
//     } catch (error) {
//       console.error(
//         "Failed to copy code:",
//         error
//       );
//     }
//   };

//   const handleCopyResponse =
//     async () => {
//       try {
//         await navigator.clipboard.writeText(
//           content
//         );

//         setCopiedResponse(true);

//         setTimeout(() => {
//           setCopiedResponse(false);
//         }, 2000);
//       } catch (error) {
//         console.error(
//           "Failed to copy response:",
//           error
//         );
//       }
//     };

//   const handleEdit = async () => {
//     if (!editText.trim()) return;

//     await editMessage(
//       id,
//       editText.trim()
//     );

//     setIsEditing(false);
//   };

//   const handleCancelEdit = () => {
//     setEditText(content);
//     setIsEditing(false);
//   };

//   return (
//     <div
//       className={`
//         flex
//         gap-3
//         items-start
//         ${isUser
//           ? "justify-end"
//           : "justify-start"
//         }
//       `}
//     >
//       {!isUser && (
//         <Avatar name="AI" />
//       )}

//       <div
//         className={`
//           max-w-[75%]
//           rounded-2xl
//           px-4
//           py-3
//           text-sm
//           ${isUser
//             ? "bg-black text-white"
//             : "bg-gray-100 text-gray-900"
//           }
//         `}
//       >
//         {isUser ? (
//           <div className="flex flex-col gap-2">
//             {isEditing ? (
//               <>
//                 <textarea
//                   value={editText}
//                   onChange={(e) =>
//                     setEditText(e.target.value)
//                   }
//                   autoFocus
//                   rows={3}
//                   className="
//             w-full
//             min-w-[280px]
//             resize-none
//             rounded-lg
//             border
//             border-gray-300
//             bg-white
//             px-3
//             py-2
//             text-sm
//             text-gray-900
//             outline-none
//             focus:ring-2
//             focus:ring-black
//           "
//                 />

//                 <div className="flex justify-end gap-2">
//                   <button
//                     onClick={handleCancelEdit}
//                     disabled={isLoading}
//                     className="
//               flex
//               items-center
//               gap-1
//               rounded-lg
//               px-2
//               py-1.5
//               text-xs
//               text-gray-500
//               hover:bg-gray-200
//               disabled:opacity-50
//             "
//                   >
//                     <X size={14} />
//                     Cancel
//                   </button>

//                   <button
//                     onClick={handleEdit}
//                     disabled={
//                       isLoading ||
//                       !editText.trim()
//                     }
//                     className="
//               flex
//               items-center
//               gap-1
//               rounded-lg
//               bg-white
//               px-3
//               py-1.5
//               text-xs
//               text-black
//               hover:bg-gray-100
//               disabled:opacity-50
//             "
//                   >
//                     <Check size={14} />
//                     Send
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <div className="whitespace-pre-wrap">
//                   {content}
//                 </div>

//                 <div className="flex justify-end">
//                   <button
//                     onClick={() => {
//                       setEditText(content);
//                       setIsEditing(true);
//                     }}
//                     disabled={isLoading}
//                     className="
//               flex
//               items-center
//               gap-1.5
//               rounded-lg
//               px-2
//               py-1
//               text-xs
//               text-gray-300
//               hover:bg-white/10
//               disabled:opacity-50
//             "
//                   >
//                     <Pencil size={13} />
//                     Edit
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         ) : (
//           <>
//             <div className="prose prose-sm max-w-none">
//               <ReactMarkdown
//                 components={{
//                   code({
//                     className,
//                     children,
//                     ...props
//                   }) {
//                     const match =
//                       /language-(\w+)/.exec(
//                         className || ""
//                       );

//                     const code = String(
//                       children
//                     ).replace(/\n$/, "");

//                     if (!match) {
//                       return (
//                         <code
//                           className="
//                             rounded
//                             bg-gray-200
//                             px-1.5
//                             py-0.5
//                             font-mono
//                             text-[13px]
//                           "
//                           {...props}
//                         >
//                           {children}
//                         </code>
//                       );
//                     }

//                     return (
//                       <div className="my-4 overflow-hidden rounded-xl border border-gray-700">
//                         <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
//                           <span className="text-xs text-gray-300">
//                             {match[1]}
//                           </span>

//                           <button
//                             onClick={() =>
//                               handleCopy(code)
//                             }
//                             className="
//                               flex
//                               items-center
//                               gap-1.5
//                               rounded-md
//                               px-2
//                               py-1
//                               text-xs
//                               text-gray-300
//                               hover:bg-gray-700
//                               hover:text-white
//                             "
//                           >
//                             {copiedCode ===
//                               code ? (
//                               <>
//                                 <Check
//                                   size={14}
//                                 />
//                                 Copied
//                               </>
//                             ) : (
//                               <>
//                                 <Copy
//                                   size={14}
//                                 />
//                                 Copy
//                               </>
//                             )}
//                           </button>
//                         </div>

//                         <SyntaxHighlighter
//                           language={match[1]}
//                           style={oneDark}
//                           customStyle={{
//                             margin: 0,
//                             borderRadius: 0,
//                             padding: "16px",
//                             fontSize: "13px",
//                           }}
//                         >
//                           {code}
//                         </SyntaxHighlighter>
//                       </div>
//                     );
//                   },

//                   h1: ({ children }) => (
//                     <h1 className="mb-3 mt-4 text-2xl font-bold">
//                       {children}
//                     </h1>
//                   ),

//                   h2: ({ children }) => (
//                     <h2 className="mb-3 mt-4 text-xl font-bold">
//                       {children}
//                     </h2>
//                   ),

//                   h3: ({ children }) => (
//                     <h3 className="mb-2 mt-3 text-lg font-semibold">
//                       {children}
//                     </h3>
//                   ),

//                   p: ({ children }) => (
//                     <p className="mb-3 last:mb-0">
//                       {children}
//                     </p>
//                   ),

//                   ul: ({ children }) => (
//                     <ul className="mb-3 list-disc space-y-1 pl-5">
//                       {children}
//                     </ul>
//                   ),

//                   ol: ({ children }) => (
//                     <ol className="mb-3 list-decimal space-y-1 pl-5">
//                       {children}
//                     </ol>
//                   ),

//                   li: ({ children }) => (
//                     <li>{children}</li>
//                   ),

//                   blockquote: ({
//                     children,
//                   }) => (
//                     <blockquote className="my-3 border-l-4 border-gray-400 pl-4 italic text-gray-600">
//                       {children}
//                     </blockquote>
//                   ),
//                 }}
//               >
//                 {content}
//               </ReactMarkdown>
//             </div>

//             {/* Response Actions */}
//             <div className="mt-3 flex items-center gap-2">
//               <button
//                 onClick={handleCopyResponse}
//                 disabled={isLoading}
//                 className="
//                   flex
//                   items-center
//                   gap-1.5
//                   rounded-lg
//                   px-2
//                   py-1.5
//                   text-xs
//                   text-gray-500
//                   hover:bg-gray-200
//                   hover:text-gray-900
//                   disabled:opacity-50
//                 "
//               >
//                 {copiedResponse ? (
//                   <>
//                     <Check size={14} />
//                     Copied
//                   </>
//                 ) : (
//                   <>
//                     <Copy size={14} />
//                     Copy
//                   </>
//                 )}
//               </button>

//               <button
//                 onClick={() =>
//                   regenerateMessage(id)
//                 }
//                 disabled={isLoading}
//                 className="
//                   flex
//                   items-center
//                   gap-1.5
//                   rounded-lg
//                   px-2
//                   py-1.5
//                   text-xs
//                   text-gray-500
//                   hover:bg-gray-200
//                   hover:text-gray-900
//                   disabled:opacity-50
//                 "
//               >
//                 <RefreshCw size={14} />
//                 Regenerate
//               </button>
//             </div>
//           </>
//         )}
//       </div>

//       {isUser && (
//         <Avatar name="You" />
//       )}
//     </div>
//   );
// };

// export default MessageBubble;








"use client";

import { useState } from "react";
import {
  Check,
  Copy,
  RefreshCw,
  Pencil,
  X,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import {
  Prism as SyntaxHighlighter,
} from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

import Avatar from "@/components/ui/Avatar";
import { MessageRole } from "@/types/chat";
import { useChat } from "@/hooks/useChat";

interface MessageBubbleProps {
  id: string;
  role: MessageRole;
  content: string;
}

const MessageBubble = ({
  id,
  role,
  content,
}: MessageBubbleProps) => {
  const isUser = role === "user";

  const {
    regenerateMessage,
    editMessage,
    isLoading,
  } = useChat();

  const [copiedCode, setCopiedCode] =
    useState<string | null>(null);

  const [copiedResponse, setCopiedResponse] =
    useState(false);

  const [isEditing, setIsEditing] =
    useState(false);

  const [editText, setEditText] =
    useState(content);

  const isThinking =
    !isUser &&
    isLoading &&
    !content.trim();

  const handleCopy = async (
    code: string
  ) => {
    try {
      await navigator.clipboard.writeText(
        code
      );

      setCopiedCode(code);

      setTimeout(() => {
        setCopiedCode(null);
      }, 2000);
    } catch (error) {
      console.error(
        "Failed to copy code:",
        error
      );
    }
  };

  const handleCopyResponse =
    async () => {
      try {
        await navigator.clipboard.writeText(
          content
        );

        setCopiedResponse(true);

        setTimeout(() => {
          setCopiedResponse(false);
        }, 2000);
      } catch (error) {
        console.error(
          "Failed to copy response:",
          error
        );
      }
    };

  const handleEdit = async () => {
    if (!editText.trim()) return;

    await editMessage(
      id,
      editText.trim()
    );

    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(content);
    setIsEditing(false);
  };

  return (
    <div
      className={`
        flex
        gap-3
        items-start
        ${
          isUser
            ? "justify-end"
            : "justify-start"
        }
      `}
    >
      {!isUser && (
        <Avatar name="AI" />
      )}

      <div
        className={`
          max-w-[75%]
          rounded-2xl
          px-4
          py-3
          text-sm
          ${
            isUser
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-900"
          }
        `}
      >
        {isUser ? (
          <div className="flex flex-col gap-2">
            {isEditing ? (
              <>
                <textarea
                  value={editText}
                  onChange={(e) =>
                    setEditText(e.target.value)
                  }
                  autoFocus
                  rows={3}
                  className="
                    w-full
                    min-w-[280px]
                    resize-none
                    rounded-lg
                    border
                    border-gray-300
                    bg-white
                    px-3
                    py-2
                    text-sm
                    text-gray-900
                    outline-none
                    focus:ring-2
                    focus:ring-black
                  "
                />

                <div className="flex justify-end gap-2">
                  <button
                    onClick={
                      handleCancelEdit
                    }
                    disabled={isLoading}
                    className="
                      flex
                      items-center
                      gap-1
                      rounded-lg
                      px-2
                      py-1.5
                      text-xs
                      text-gray-500
                      hover:bg-gray-200
                      disabled:opacity-50
                    "
                  >
                    <X size={14} />
                    Cancel
                  </button>

                  <button
                    onClick={handleEdit}
                    disabled={
                      isLoading ||
                      !editText.trim()
                    }
                    className="
                      flex
                      items-center
                      gap-1
                      rounded-lg
                      bg-white
                      px-3
                      py-1.5
                      text-xs
                      text-black
                      hover:bg-gray-100
                      disabled:opacity-50
                    "
                  >
                    <Check size={14} />
                    Send
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="whitespace-pre-wrap">
                  {content}
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      setEditText(content);
                      setIsEditing(true);
                    }}
                    disabled={isLoading}
                    className="
                      flex
                      items-center
                      gap-1.5
                      rounded-lg
                      px-2
                      py-1
                      text-xs
                      text-gray-300
                      hover:bg-white/10
                      disabled:opacity-50
                    "
                  >
                    <Pencil size={13} />
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        ) : isThinking ? (
          <div className="flex items-center gap-1.5 py-1">
            <span className="text-sm text-gray-500">
              Thinking
            </span>

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-gray-500
                animate-bounce
              "
              style={{
                animationDelay: "0ms",
              }}
            />

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-gray-500
                animate-bounce
              "
              style={{
                animationDelay: "150ms",
              }}
            />

            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-gray-500
                animate-bounce
              "
              style={{
                animationDelay: "300ms",
              }}
            />
          </div>
        ) : (
          <>
            <div className="prose prose-sm max-w-none">
              <ReactMarkdown
                components={{
                  code({
                    className,
                    children,
                    ...props
                  }) {
                    const match =
                      /language-(\w+)/.exec(
                        className || ""
                      );

                    const code = String(
                      children
                    ).replace(/\n$/, "");

                    if (!match) {
                      return (
                        <code
                          className="
                            rounded
                            bg-gray-200
                            px-1.5
                            py-0.5
                            font-mono
                            text-[13px]
                          "
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }

                    return (
                      <div className="my-4 overflow-hidden rounded-xl border border-gray-700">
                        <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
                          <span className="text-xs text-gray-300">
                            {match[1]}
                          </span>

                          <button
                            onClick={() =>
                              handleCopy(code)
                            }
                            className="
                              flex
                              items-center
                              gap-1.5
                              rounded-md
                              px-2
                              py-1
                              text-xs
                              text-gray-300
                              hover:bg-gray-700
                              hover:text-white
                            "
                          >
                            {copiedCode ===
                            code ? (
                              <>
                                <Check
                                  size={14}
                                />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy
                                  size={14}
                                />
                                Copy
                              </>
                            )}
                          </button>
                        </div>

                        <SyntaxHighlighter
                          language={match[1]}
                          style={oneDark}
                          customStyle={{
                            margin: 0,
                            borderRadius: 0,
                            padding: "16px",
                            fontSize: "13px",
                          }}
                        >
                          {code}
                        </SyntaxHighlighter>
                      </div>
                    );
                  },

                  h1: ({ children }) => (
                    <h1 className="mb-3 mt-4 text-2xl font-bold">
                      {children}
                    </h1>
                  ),

                  h2: ({ children }) => (
                    <h2 className="mb-3 mt-4 text-xl font-bold">
                      {children}
                    </h2>
                  ),

                  h3: ({ children }) => (
                    <h3 className="mb-2 mt-3 text-lg font-semibold">
                      {children}
                    </h3>
                  ),

                  p: ({ children }) => (
                    <p className="mb-3 last:mb-0">
                      {children}
                    </p>
                  ),

                  ul: ({ children }) => (
                    <ul className="mb-3 list-disc space-y-1 pl-5">
                      {children}
                    </ul>
                  ),

                  ol: ({ children }) => (
                    <ol className="mb-3 list-decimal space-y-1 pl-5">
                      {children}
                    </ol>
                  ),

                  li: ({ children }) => (
                    <li>{children}</li>
                  ),

                  blockquote: ({
                    children,
                  }) => (
                    <blockquote className="my-3 border-l-4 border-gray-400 pl-4 italic text-gray-600">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button
                onClick={
                  handleCopyResponse
                }
                disabled={isLoading}
                className="
                  flex
                  items-center
                  gap-1.5
                  rounded-lg
                  px-2
                  py-1.5
                  text-xs
                  text-gray-500
                  hover:bg-gray-200
                  hover:text-gray-900
                  disabled:opacity-50
                "
              >
                {copiedResponse ? (
                  <>
                    <Check size={14} />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    Copy
                  </>
                )}
              </button>

              <button
                onClick={() =>
                  regenerateMessage(id)
                }
                disabled={isLoading}
                className="
                  flex
                  items-center
                  gap-1.5
                  rounded-lg
                  px-2
                  py-1.5
                  text-xs
                  text-gray-500
                  hover:bg-gray-200
                  hover:text-gray-900
                  disabled:opacity-50
                "
              >
                <RefreshCw size={14} />
                Regenerate
              </button>
            </div>
          </>
        )}
      </div>

      {isUser && (
        <Avatar name="You" />
      )}
    </div>
  );
};

export default MessageBubble;