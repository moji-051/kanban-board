"use client"

import { useState,useEffect } from "react";
import ColumnType from "@/app/lib/columnType";
import { Plus, Trash2 } from "lucide-react";
import Card from "@/app/components/card";
import { useSearchParams } from "next/navigation";

export default function BoardPage() {
  const params = useSearchParams()
  const activeId = params.get('columns')

  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [titleColumn, setTitleClumn] = useState("");

  useEffect(() => {
  const saved = localStorage.getItem("column");
  if (!saved) return;

  const columnArray: ColumnType[] = JSON.parse(saved);
  const found = columnArray.find(n => n.id === activeId);
  })

  useEffect(() => {
    const saved = localStorage.getItem("column");
    if (saved) {
      setColumns(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("column", JSON.stringify(columns));
  }, [columns]);

  const columnCreator = () => {
    if (!titleColumn.trim()) return;
    const newColumn: ColumnType = {
      title: titleColumn,
      id: Date.now().toString(),
    };
    setColumns([...columns, newColumn]);
    setTitleClumn("");
  };
  const deleteColumn = (id: string) => {
    setColumns(columns.filter((column) => column.id !== id));
  };

  return (
    <div className="flex flex-col gap-2 min-h-screen items-center justify-center text-black bg-slate-400 font-sans">
      <div className="flex gap-3 p-5 rounded-2xl bg-slate-300 shadow-md shadow-slate-600">
        <input
          value={titleColumn}
          onChange={(e) => {
            setTitleClumn(e.target.value);
          }}
          className="w-75 bg-slate-100 shadow-md shadow-slate-500 rounded-3xl p-2 px-3"
          type="text"
        />
        <button onClick={columnCreator} className="bg-slate-100 shadow-md shadow-slate-500 rounded-3xl p-2">
          <Plus />
        </button>
      </div>

      <div className="flex h-165 w-3/4 p-5 rounded-2xl bg-slate-300 shadow-lg shadow-slate-600 overflow-auto">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex flex-col gap-5 shadow-md shadow-slate-500 justify-between bg-slate-200 rounded-3xl mx-3 p-2 px-3 min-w-[280px]"
          >
            <div className="bg-slate-100 my-3 shadow-md shadow-slate-500 flex justify-between rounded-2xl p-3">
              <h1 className="w-full text-2xl mr-4">{column.title}</h1>
              <button
                onClick={() => deleteColumn(column.id)}
                className="hover:text-rose-400 cursor-pointer"
                aria-label={`delete-column-${column.id}`}
              >
                <Trash2 />
              </button>
            </div>
            <div className="bg-slate-100 text-xl shadow-md shadow-slate-500 flex-col h-160 rounded-2xl p-2 overflow-auto">
              <Card column={column}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
