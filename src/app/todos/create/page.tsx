"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Create() {
  type NewTodo = {
    id: string;
    todoTitle: string;
    todoContent: string;
    deadline: string;
    deadlineStatus: string;
    status: string;
  };

  const [addTodoTitle, setAddTodoTitle] = useState<string>("");
  const [addTodoContent, setAddTodoContent] = useState<string>("");
  const [addDeadline, setAddDeadline] = useState<string>("");
  const [newTodo, setNewTodo] = useState<NewTodo | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const onChangeAddTodoTitle = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAddTodoTitle(e.target.value);
  };

  const onChangeAddTodoContent = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAddTodoContent(e.target.value);
  };

  const onClickAdd = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (addTodoTitle.length > 10) {
      setError("タイトルは10文字以内でお願いします。");
      return;
    }

    if (addTodoContent.length > 10) {
      setError("内容は10文字以内でお願いします。");
      return;
    }

    await addDoc(collection(db, "todos"), {
      title: addTodoTitle,
      content: addTodoContent,
      deadline: addDeadline,
      deadlineStatus: "期限前",
      status: "未完了",
      comment: "",
    });
    router.push(`/todos`);
  };

  return (
    <>
      <div className="flex flex-col space-y-4 justify-center items-center mt-10 min-h">
        <div>
          <h1 className="text-3xl font-bold">Todo新規作成</h1>
        </div>
        <ul className="space-y-3  text-xl w-3/5">
          <li className="flex justify-between mb-6">
            <p className="outline-none w-1/6 ">タイトル</p>
            <p className="outline-none w-1/6">内容</p>
            <p className="outline-none w-1/6">締め切り</p>
          </li>
          <li className="flex justify-between mb-6">
            <input
              className=" w-1/3 "
              type="text"
              placeholder="ここに入力"
              value={addTodoTitle}
              onChange={onChangeAddTodoTitle}
            />

            <input
              className=" w-1/3 "
              type="text"
              placeholder="ここに入力"
              value={addTodoContent}
              onChange={onChangeAddTodoContent}
            />

            <input
              className=" w-1/6 "
              type="date"
              value={addDeadline}
              onChange={(e) => setAddDeadline(e.target.value)}
            />
          </li>
          <li className="flex justify-center mb-6">
            {error && <p className="text-red-500 ">{error}</p>}
          </li>
        </ul>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
          onClick={onClickAdd}
        >
          追加
        </button>
      </div>
    </>
  );
}
