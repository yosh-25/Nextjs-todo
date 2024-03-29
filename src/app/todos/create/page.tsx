"use client";
import React, { useState } from "react";
import { db } from "../../../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { TodoItem } from "@/app/types";

export default function CreateTodo() {
  const [todo, setTodo] = useState<TodoItem>(
    {
      id: '',
      title: '',
      content: '',
      deadline: '',
      deadlineStatus: '',
      status: '',
      comment: '',
      }
  );
  const [error, setError] = useState("");
  const router = useRouter();

  const addTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newTitle = e.target.value;
    const newTodo = {
      ...todo,
      title: newTitle,
    };
    setTodo(newTodo);
  };

  const addContent = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newContent = e.target.value;
    const newTodo = {
      ...todo,
      content: newContent,
    };
    setTodo(newTodo);
  };

  const addDeadline = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newDeadline = e.target.value;
    const newTodo = {
      ...todo,
      deadline: newDeadline,
    };
    setTodo(newTodo);
  };

  const clickToSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if ((todo?.title?.length ?? 0) > 10) {
      setError("タイトルは10文字以内でお願いします。");
      return;
    }

    if ((todo?.content?.length ?? 0) > 10) {
      setError("内容は10文字以内でお願いします。");
      return;
    }

    if (todo?.title?.length === 0) {
      setError("タイトルが未入力です。");
      return;
    }

    if (todo?.content?.length === 0) {
      setError("内容が未入力です。");
      return;
    }

    if (todo?.deadline?.length === 0) {
      setError("締め切りが未入力です。");
      return;
    }

    await addDoc(collection(db, "todos"), {
      title: todo?.title,
      content: todo?.content,
      deadline: todo?.deadline,
      deadlineStatus: "期限前",
      status: "未完了",
      comment: "",
    });
    router.push(`/todos`);
  };

  const clickToMoveToTodoList = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    router.push(`/todos/`);
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Todo新規作成</h1>
      </div>
      <ul className="space-y-1  text-xl w-3/5">
        <li className="flex justify-between mb-6">
          <p className="outline-none w-1/6 ">タイトル</p>
          <p className="outline-none w-1/6">内容</p>
          <p className="outline-none w-1/6">締め切り</p>
        </li>
        <li className="flex justify-between mb-6">
          <input
            className=" w-1/5 border border-solid rounded p-2  border-slate-300"
            type="text"
            placeholder="ここに入力"
            value={todo?.title}
            onChange={addTitle}
          />

          <input
            className=" w-1/5 border border-solid rounded p-2  border-slate-300"
            type="text"
            placeholder="ここに入力"
            value={todo?.content}
            onChange={addContent}
          />

          <input
            className=" w-1/5 border border-solid rounded p-2  border-slate-300"
            type="date"
            value={todo?.deadline}
            onChange={addDeadline}
          />
        </li>

        <li className="flex justify-center">
          {error && <p className="text-red-500 ">{error}</p>}
        </li>
      </ul>
      <div className="flex">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 mt-8 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
          onClick={clickToSubmit}
        >
          追加
        </button>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 mt-8 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
          onClick={clickToMoveToTodoList}
        >
          一覧に戻る
        </button>
      </div>
    </>
  );
}
