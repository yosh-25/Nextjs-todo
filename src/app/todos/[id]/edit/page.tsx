"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../../../lib/firebase";
import { TodoItem } from "@/app/types";

export default function todoEdit({ params }: { params: { id: string } }) {
  const [todo, setTodo] = useState<TodoItem | undefined>(undefined);
  const [succeed, SetSucceed] = useState<string>("");
  const id = params.id;
  const router = useRouter();

  useEffect(() => {
    const fetchTodo = async () => {
      if (typeof id === "string") {
        const docRef = doc(db, "todos", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTodo(docSnap.data() as TodoItem);
        }
      }
    };
    if (id) {
      fetchTodo();
    }
  }, [id]);

  const clickToSaveEdit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const docRef = doc(db, "todos", id);
    await updateDoc(docRef, {
      title: todo?.title,
      status: todo?.status,
      deadline: todo?.deadline,
      comment: todo?.comment,
    });
    SetSucceed("保存できました！");
  };

  const updateTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (todo) {
      setTodo({
        ...todo,
        title: e.target.value,
      });
    }
  };

  const updateContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (todo) {
      setTodo({
        ...todo,
        content: e.target.value,
      });
    }
  };

  const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (todo) {
      setTodo({
        ...todo,
        deadline: e.target.value,
      });
    }
  };

  const updateStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (todo) {
      setTodo({
        ...todo,
        status: e.target.value,
      });
    }
  };

  const clickToMoveToTodoList = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    router.push(`/todos/`);
  };

  return (
    <>
        <div className="mb-3">
          <h1 className="text-3xl font-bold">My todo</h1>
        </div>
        <ul className="space-y-3 text-xl w-9/12">
          <li className="flex justify-between  pl-14 pr-14 ">
            <p className="outline-none w-1/6">タイトル</p>
            <p className="outline-none w-1/6">内容</p>
            <p className="outline-none w-1/6">締め切り</p>
            <p className="outline-none w-1/6">ステータス</p>
          </li>
          <li className="flex justify-between  pl-14 pr-14   mb-6 pb-2 border-b border-blue-00">
            <div className="outline-none w-1/6">
              <input
                className="outline-none w-full"
                type="text"
                value={todo?.title}
                onChange={(e) => {
                  updateTitle(e);
                }}
              />
            </div>

            <div className="outline-none w-1/6">
              <input
                className="outline-none w-full"
                type="text"
                value={todo?.content}
                onChange={(e) => {
                  updateContent(e);
                }}
              />
            </div>

            <div className="outline-none w-1/6">
              <input
                className="outline-none w-full"
                type="date"
                value={todo?.deadline}
                onChange={(e) => {
                  updateDeadline(e);
                }}
              />
            </div>

            <div className="outline-none w-1/6">
              <select
                className="border border-solid rounded p-2  border-slate-300"
                value={todo?.status}
                onChange={(e) => {
                  updateStatus(e);
                }}
              >
                <option value="未完了">未完了</option>
                <option value="途中">途中</option>
                <option value="完了">完了</option>
              </select>
            </div>
          </li>
          <div className="flex flex-col justify-center ">
            <div className="flex  justify-center " >
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 mt-8 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                onClick={clickToSaveEdit}
              >
                保存
              </button>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 mt-8 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
                onClick={clickToMoveToTodoList}
              >
                一覧に戻る
              </button>
            </div>
            <div className="flex justify-center" >{succeed && <p>{succeed}</p>}</div>
          </div>
        </ul>
    </>
  );
}
