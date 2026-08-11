// "use client";

// import { useState } from "react";
// import { Send } from "lucide-react";

// import { useChat } from "@/hooks/useChat";
// import { sendMessageToAI } from "@/lib/api";
// import Loader from "@/components/ui/Loader";



// const PromptInput = () => {

//   const [input, setInput] = useState("");

//   const {
//     sendUserMessage,
//     addAIMessage,
//     isLoading,
//     setIsLoading,
//   } = useChat();



//   const handleSend = async () => {

//     if (!input.trim() || isLoading)
//       return;


//     const userText = input.trim();


//     // user message show
//     sendUserMessage(userText);


//     setInput("");


//     try {

//       setIsLoading(true);


//       const response =
//         await sendMessageToAI(userText);



//       addAIMessage(
//         response.message.content
//       );


//     } catch (error) {

//       addAIMessage(
//         "Sorry, something went wrong. Please try again."
//       );


//       console.error(error);


//     } finally {

//       setIsLoading(false);

//     }

//   };



//   return (

//     <div className="border-t p-4">


//       <div className="flex items-center gap-3">


//         <input

//           value={input}

//           onChange={(e) =>
//             setInput(e.target.value)
//           }

//           onKeyDown={(e) => {

//             if (e.key === "Enter") {
//               handleSend();
//             }

//           }}

//           placeholder="Ask anything..."

//           className="
//             flex-1
//             rounded-xl
//             border
//             px-4 py-3
//             outline-none
//             focus:ring-2
//             focus:ring-black
//           "

//         />



//         <button

//           onClick={handleSend}

//           disabled={isLoading}

//           className="
//             h-12
//             w-12
//             rounded-xl
//             bg-black
//             text-white
//             flex
//             items-center
//             justify-center
//             disabled:opacity-50
//           "

//         >

//           {
//             isLoading
//               ?
//               <Loader />
//               :
//               <Send size={20} />
//           }


//         </button>


//       </div>


//     </div>

//   );

// };


// export default PromptInput;








// "use client";

// import { useState } from "react";
// import { Send } from "lucide-react";

// import { useChat } from "@/hooks/useChat";
// import Loader from "@/components/ui/Loader";

// const PromptInput = () => {
//   const [input, setInput] = useState("");

//   const {
//     sendUserMessage,
//     isLoading,
//   } = useChat();

//   const handleSend = async () => {
//     if (!input.trim() || isLoading) return;

//     const userText = input.trim();

//     setInput("");

//     try {
//       await sendUserMessage(userText);
//     } catch (error) {
//       console.error("Failed to send message:", error);
//     }
//   };

//   return (
//     <div className="border-t p-4">
//       <div className="flex items-center gap-3">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               handleSend();
//             }
//           }}
//           placeholder="Ask anything..."
//           className="
//             flex-1
//             rounded-xl
//             border
//             px-4 py-3
//             outline-none
//             focus:ring-2
//             focus:ring-black
//           "
//         />

//         <button
//           onClick={handleSend}
//           disabled={isLoading}
//           className="
//             h-12
//             w-12
//             rounded-xl
//             bg-black
//             text-white
//             flex
//             items-center
//             justify-center
//             disabled:opacity-50
//           "
//         >
//           {isLoading ? <Loader /> : <Send size={20} />}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PromptInput;




"use client";

import { useState } from "react";
import {
  Send,
  Square,
} from "lucide-react";

import { useChat } from "@/hooks/useChat";

const PromptInput = () => {
  const [input, setInput] =
    useState("");

  const {
    sendUserMessage,
    isLoading,
    stopGenerating,
  } = useChat();

  const handleSend = async () => {
    if (
      !input.trim() ||
      isLoading
    ) {
      return;
    }

    const userText =
      input.trim();

    setInput("");

    try {
      await sendUserMessage(
        userText
      );
    } catch (error) {
      console.error(
        "Failed to send message:",
        error
      );
    }
  };

  return (
    <div className="border-t p-4">
      <div className="flex items-center gap-3">
        <input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              !isLoading
            ) {
              handleSend();
            }
          }}
          placeholder="Ask anything..."
          disabled={isLoading}
          className="
            flex-1
            rounded-xl
            border
            px-4 py-3
            outline-none
            focus:ring-2
            focus:ring-black
            disabled:opacity-60
          "
        />

        <button
          onClick={
            isLoading
              ? stopGenerating
              : handleSend
          }
          className="
            h-12
            w-12
            rounded-xl
            bg-black
            text-white
            flex
            items-center
            justify-center
            transition
            hover:bg-gray-800
          "
          aria-label={
            isLoading
              ? "Stop generating"
              : "Send message"
          }
        >
          {isLoading ? (
            <Square
              size={17}
              fill="currentColor"
            />
          ) : (
            <Send size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default PromptInput;