// "use client";

// import { MessageSquare, Plus } from "lucide-react";

// import { dummyChats } from "@/data/dummyChats";
// import Button from "@/components/ui/Button";


// const Sidebar = () => {


//   return (

//     <aside
//       className="
//         hidden
//         md:flex
//         w-72
//         h-screen
//         flex-col
//         border-r
//         bg-background
//         p-4
//       "
//     >


//       {/* New Chat Button */}
//       <Button
//         className="
//           w-full
//           flex
//           items-center
//           justify-center
//           gap-2
//         "
//       >

//         <Plus size={18} />

//         New Chat

//       </Button>



//       {/* Chat History */}
//       <div
//         className="
//           mt-6
//           flex-1
//           overflow-y-auto
//           space-y-2
//         "
//       >


//         <p
//           className="
//             text-sm
//             text-muted-foreground
//             mb-3
//           "
//         >
//           Recent Chats
//         </p>



//         {
//           dummyChats.map((chat) => (

//             <button

//               key={chat.id}

//               className="
//                 w-full
//                 flex
//                 items-center
//                 gap-3
//                 rounded-xl
//                 p-3
//                 text-left
//                 hover:bg-accent
//                 transition
//               "

//             >

//               <MessageSquare size={18} />

//               <span
//                 className="
//                   truncate
//                   text-sm
//                 "
//               >

//                 {chat.title}

//               </span>


//             </button>

//           ))
//         }


//       </div>


//     </aside>

//   );

// };


// export default Sidebar;















"use client";

import {
  MessageSquare,
  Plus,
  Trash2,
  MoreHorizontal,
  Pencil,
  Check,
  X,
} from "lucide-react";

import { useState } from "react";

import Button from "@/components/ui/Button";
import { useChat } from "@/hooks/useChat";

const Sidebar = () => {
  const {
    conversations,
    conversationId,
    createNewChat,
    selectConversation,
    deleteConversation,
    renameConversation,
    isLoading,
  } = useChat();

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [editTitle, setEditTitle] =
    useState("");

  return (
    <aside
      className="
        hidden
        md:flex
        w-72
        h-screen
        flex-col
        border-r
        bg-background
        p-4
      "
    >
      {/* New Chat */}
      <Button
        onClick={createNewChat}
        disabled={isLoading}
        className="
          w-full
          flex
          items-center
          justify-center
          gap-2
        "
      >
        <Plus size={18} />

        New Chat
      </Button>

      {/* Chat History */}
      <div
        className="
          mt-6
          flex-1
          overflow-y-auto
          space-y-2
        "
      >
        <p
          className="
            text-sm
            text-muted-foreground
            mb-3
          "
        >
          Recent Chats
        </p>

        {conversations.length === 0 ? (
          <p
            className="
              text-sm
              text-muted-foreground
              px-2
            "
          >
            No conversations yet
          </p>
        ) : (
          [...conversations]
            .sort(
              (a, b) =>
                new Date(
                  b.updatedAt
                ).getTime() -
                new Date(
                  a.updatedAt
                ).getTime()
            )
            .map((chat) => (
              <div
                key={chat.id}
                className={`
    group
    flex
    items-center
    gap-1
    rounded-xl
    transition
    ${chat.id === conversationId
                    ? "bg-accent"
                    : "hover:bg-accent"
                  }
  `}
              >
                {editingId === chat.id ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={(e) =>
                        setEditTitle(e.target.value)
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          renameConversation(
                            chat.id,
                            editTitle
                          );

                          setEditingId(null);
                        }

                        if (e.key === "Escape") {
                          setEditingId(null);
                        }
                      }}
                      autoFocus
                      className="
          min-w-0
          flex-1
          rounded-lg
          border
          bg-background
          px-2
          py-2
          text-sm
          outline-none
        "
                    />

                    <button
                      onClick={() => {
                        renameConversation(
                          chat.id,
                          editTitle
                        );

                        setEditingId(null);
                      }}
                      className="rounded-lg p-2 hover:bg-accent"
                    >
                      <Check size={15} />
                    </button>

                    <button
                      onClick={() =>
                        setEditingId(null)
                      }
                      className="rounded-lg p-2 hover:bg-accent"
                    >
                      <X size={15} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        selectConversation(chat.id)
                      }
                      disabled={isLoading}
                      className="
          flex
          min-w-0
          flex-1
          items-center
          gap-3
          p-3
          text-left
        "
                    >
                      <MessageSquare
                        size={18}
                        className="shrink-0"
                      />

                      <span className="truncate text-sm">
                        {chat.title}
                      </span>
                    </button>

                    <div
                      className="
          mr-1
          flex
          items-center
          opacity-0
          transition
          group-hover:opacity-100
        "
                    >
                      <button
                        onClick={() => {
                          setEditingId(chat.id);
                          setEditTitle(chat.title);
                        }}
                        disabled={isLoading}
                        className="
            rounded-lg
            p-2
            hover:bg-accent
          "
                        aria-label="Rename chat"
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        onClick={() =>
                          deleteConversation(chat.id)
                        }
                        disabled={isLoading}
                        className="
            rounded-lg
            p-2
            hover:bg-destructive/10
            hover:text-destructive
          "
                        aria-label="Delete chat"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
        )}
      </div>
    </aside>
  );
};

export default Sidebar;