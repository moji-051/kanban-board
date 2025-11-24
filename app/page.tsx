"use client"

import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import Board from "./lib/boardType";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "./lib/useLocalStorage";

export default function Home() {
  const [boards, setBoards] = useLocalStorage<Board[]>("boards", []);
  const [title, setTitle] = useState("");

  const router = useRouter();

  const boardCreator = () => {
    if (!title.trim()) return;
    const newBoard: Board = {
      title: title,
      id: Date.now().toString(),
    };
    setBoards([...boards, newBoard]);
    setTitle("");
  };

  const deleteBoard = (id: string) => {
    setBoards(boards.filter((board) => board.id !== id));
  };

  return (
    <div className="flex flex-col gap-2 min-h-screen items-center justify-center text-black bg-slate-400 font-sans">
      <div className="flex gap-3 p-5 rounded-2xl shadow-md shadow-slate-500 bg-slate-300">
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className="w-75 shadow-md shadow-slate-500 bg-slate-100 rounded-3xl p-2 px-3"
          type="text"
        />
        <button onClick={boardCreator} className="bg-slate-100 shadow-md shadow-slate-500 rounded-3xl p-2">
          <Plus />
        </button>
      </div>

      <div className="flex flex-col shadow-md shadow-slate-500 h-100 w-98 gap-3 p-5 rounded-2xl bg-slate-300 overflow-auto">
        {boards.map((board) => (
          <div
            key={board.id}
            onClick={() => router.push(`/board/${board.id}`)}
            className="flex justify-between shadow-md shadow-slate-500 text-2xl bg-slate-200 cursor-pointer hover:bg-slate-50 rounded-3xl p-2 px-3 min-h-10"
          >
            <h1 className="w-full mr-4">{board.title}</h1>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteBoard(board.id);
              }}
              className="hover:text-rose-400 cursor-pointer"
              aria-label={`delete-${board.id}`}
            >
              <Trash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
