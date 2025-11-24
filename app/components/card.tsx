'use client'

import { Check, Plus, Trash2, X } from "lucide-react"
import CardType from "../lib/cardType"
import ColumnType from "../lib/columnType"
import { useEffect, useState } from "react";

interface CardProps{ 
    column : ColumnType,
}

export default function Card({column}:CardProps) {

  const [cards, setCards] = useState<CardType[]>(() => {
    const saved = localStorage.getItem("cards");
    return saved ? JSON.parse(saved) : [];
  });
  const [titleCard, setTitleCard] = useState("");

  useEffect(() => {
  const saved = localStorage.getItem("cards");
  if (saved) {
    setCards(JSON.parse(saved));
  }}, []);

    useEffect(() => {
        localStorage.setItem("cards", JSON.stringify(cards));
    }, [cards]);

  const cardCreator = (columnId: string) => {
    if (!titleCard.trim()) return;
    const newCard: CardType = {
      title: titleCard,
      id: Date.now().toString(),
      completed: false,
      columnId: columnId,
    };
    setCards([...cards, newCard]);
    setTitleCard("");
  };
  const completeCard = (id: string) => {
  setCards(prevCards => 
    prevCards.map(card => 
      card.id === id 
        ? { ...card, completed: !card.completed } 
        : card
  ))
}
  const deleteCard = (id: string) => {
    setCards(cards.filter((card) => card.id !== id));
  };

  return (
    <>
    <div className="flex justify-between gap-2 rounded-2xl">
        <input
          value={titleCard}
          onChange={(e) => {
            setTitleCard(e.target.value);
          }}
          className="bg-white shadow-md shadow-slate-500 w-60 rounded-3xl px-3"
          type="text"
        />
        <button onClick={() => cardCreator(column.id)} className="bg-white shadow-md shadow-slate-500 rounded-3xl p-2">
          <Plus />
        </button>
    </div>
    <div className="flex-col rounded-2xl p-1 shadow-lg space-y-2">
        {cards.filter(card => card.columnId === column.id).map((card) => (
            <div key={card.id} className="flex-col gap-5 rounded-3xl min-w-[200px]">
              <div className="my-3 flex rounded-2xl justify-between">
                <h1 className={`mt-2 ${card.completed?'line-through':''} w-full text-xl `}>{card.title}</h1>
                <div className="flex gap-2">
                  <button onClick={() => completeCard(card.id)} className="cursor-pointer">
                    {card.completed?<X/>:<Check/>}
                  </button>
                  <button onClick={() => deleteCard(card.id)} className="hover:text-rose-400 cursor-pointer">
                    <Trash2/>
                  </button>
                </div>
              </div>
            </div>
          ))}
    </div>
    </>
  )
}
