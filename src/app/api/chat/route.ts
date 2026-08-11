// import { NextResponse } from "next/server";


// export async function POST(
//   request: Request
// ) {

//   try {

//     const body = await request.json();


//     const userMessage = body.message;


//     if (!userMessage) {

//       return NextResponse.json(
//         {
//           error: "Message is required"
//         },
//         {
//           status: 400
//         }
//       );

//     }



//     return NextResponse.json({

//       message: {

//         id: crypto.randomUUID(),

//         role: "assistant",

//         content:
//           `You said: ${userMessage}`,

//         createdAt: new Date(),

//       }

//     });


//   } catch (error) {


//     console.error(error);


//     return NextResponse.json(
//       {
//         error: "Internal server error"
//       },
//       {
//         status: 500
//       }
//     );


//   }

// }







// import Groq from "groq-sdk";

// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY,
// });

// export async function POST(request: Request) {
//   try {
//     const {
//       messages,
//       temperature = 0.7,
//     } = await request.json();

//     if (!messages || !Array.isArray(messages)) {
//       return new Response("Messages are required", {
//         status: 400,
//       });
//     }

//     const stream = await groq.chat.completions.create({
//       model: "llama-3.3-70b-versatile",
//       messages,
//       stream: true,
//       temperature,
//     });

//     const encoder = new TextEncoder();

//     const readableStream = new ReadableStream({
//       async start(controller) {
//         try {
//           for await (const chunk of stream) {
//             const content = chunk.choices[0]?.delta?.content;

//             if (content) {
//               controller.enqueue(encoder.encode(content));
//             }
//           }

//           controller.close();
//         } catch (error) {
//           console.error("Streaming error:", error);
//           controller.error(error);
//         }
//       },
//     });

//     return new Response(readableStream, {
//       headers: {
//         "Content-Type": "text/plain; charset=utf-8",
//         "Cache-Control": "no-cache",
//         Connection: "keep-alive",
//       },
//     });
//   } catch (error) {
//     console.error("Chat API Error:", error);

//     return new Response("Failed to generate response", {
//       status: 500,
//     });
//   }
// }





import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const SYSTEM_PROMPT = `
You are OpenChatAI, a helpful, intelligent, and friendly AI assistant.

Your behavior:
- Give accurate and useful answers.
- Understand the conversation context before answering.
- Do not repeat the same answer unnecessarily.
- If the user asks a follow-up question, use previous messages for context.
- Keep simple answers concise.
- Give detailed explanations when the question requires them.
- Use Markdown when it improves readability.
- Use headings, bullet points, numbered lists, and code blocks when appropriate.
- For programming questions, provide clean and practical code.
- If you are unsure about something, clearly say so instead of making up information.
- Be conversational and natural.
`;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("Messages are required", {
        status: 400,
      });
    }

    const stream = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...messages,
      ],

      stream: true,

      temperature: 0.7,
    });

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content =
              chunk.choices[0]?.delta?.content;

            if (content) {
              controller.enqueue(
                encoder.encode(content)
              );
            }
          }

          controller.close();
        } catch (error) {
          console.error(
            "Streaming error:",
            error
          );

          controller.error(error);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type":
          "text/plain; charset=utf-8",

        "Cache-Control":
          "no-cache",

        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error(
      "Chat API Error:",
      error
    );

    return new Response(
      "Failed to generate response",
      {
        status: 500,
      }
    );
  }
}