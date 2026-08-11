// import { ChatMessage } from "@/types/chat";


// interface SendMessageResponse {
//   message: ChatMessage;
// }


// export async function sendMessageToAI(
//   content: string
// ): Promise<SendMessageResponse> {


//   const response = await fetch("/api/chat", {

//     method: "POST",

//     headers: {
//       "Content-Type": "application/json",
//     },

//     body: JSON.stringify({
//       message: content,
//     }),

//   });



//   if (!response.ok) {

//     const error =
//       await response.json();

//     console.log(error);

//     throw new Error(
//       "Failed to send message"
//     );

//   }



//   return response.json();

// }







// import { ChatMessage } from "@/types/chat";

// interface SendMessageResponse {
//   message: ChatMessage;
// }

// export async function sendMessageToAI(
//   messages: ChatMessage[]
// ): Promise<ReadableStream<Uint8Array>> {
//   const response = await fetch("/api/chat", {
//     method: "POST",

//     headers: {
//       "Content-Type": "application/json",
//     },

//     body: JSON.stringify({
//       messages: messages.map((message) => ({
//         role: message.role,
//         content: message.content,
//       })),
//     }),
//   });

//   if (!response.ok) {
//     const errorText = await response.text();

//     console.error("Chat API Error:", errorText);

//     throw new Error("Failed to send message");
//   }

//   if (!response.body) {
//     throw new Error("No response body received");
//   }

//   return response.body;
// }









// import { ChatMessage } from "@/types/chat";

// export async function sendMessageToAI(
//   messages: ChatMessage[],
//   signal?: AbortSignal
// ): Promise<ReadableStream<Uint8Array>> {
//   const response = await fetch("/api/chat", {
//     method: "POST",

//     headers: {
//       "Content-Type": "application/json",
//     },

//     signal,

//     body: JSON.stringify({
//       messages: messages.map((message) => ({
//         role: message.role,
//         content: message.content,
//       })),
//     }),
//   });

//   if (!response.ok) {
//     const errorText = await response.text();

//     console.error(
//       "Chat API Error:",
//       errorText
//     );

//     throw new Error(
//       "Failed to send message"
//     );
//   }

//   if (!response.body) {
//     throw new Error(
//       "No response body received"
//     );
//   }

//   return response.body;
// }







import { ChatMessage } from "@/types/chat";

export async function sendMessageToAI(
  messages: ChatMessage[],
  signal?: AbortSignal,
  temperature = 0.7
): Promise<ReadableStream<Uint8Array>> {
  const response = await fetch("/api/chat", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    signal,

    body: JSON.stringify({
      messages: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),

      temperature,
    }),
  });

  if (!response.ok) {
    const errorText =
      await response.text();

    console.error(
      "Chat API Error:",
      errorText
    );

    throw new Error(
      "Failed to send message"
    );
  }

  if (!response.body) {
    throw new Error(
      "No response body received"
    );
  }

  return response.body;
}