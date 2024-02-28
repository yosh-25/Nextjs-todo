"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Create() {
  type NewTodo = {
    id: string;
    todoTitle: string;
    todoContent: string;
    deadline: string;
    deadlineStatus: string;
    status: string;
  };

  const [addTodoTitle, setAddtodoTitle] = useState<string>("");
  const [addTodoContent, setAddtodoContent] = useState<string>("");
  const [addDeadline, setAddDeadline] = useState<string>("");
  const [newTodo, setNewTodo] = useState<NewTodo | null>(null);

  const onClickAdd = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await addDoc(collection(db, "todos"), {
      id: uuidv4(),
      todoTitle: addTodoTitle,
      todoContent: addTodoContent,
      deadline: addDeadline,
      deadlineStatus: "期限前",
      status: "未完了",
    });
    // console.log('pushed')
  };

  return (
    <>
      <div>
        <label htmlFor="todo">タイトル</label>
        <input
          id="todo"
          type="text"
          placeholder="ここに入力"
          value={addTodoTitle}
          onChange={(e) => setAddtodoTitle(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="todo">内容</label>
        <input
          id="todo"
          type="text"
          placeholder="ここに入力"
          value={addTodoContent}
          onChange={(e) => setAddtodoContent(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="deadline">締め切り</label>
        <input
          type="date"
          id="deadline"
          value={addDeadline}
          onChange={(e) => setAddDeadline(e.target.value)}
        />
      </div>
      <button type="submit" onClick={onClickAdd}>
        追加
      </button>
    </>
  );
}
