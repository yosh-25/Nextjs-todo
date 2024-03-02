"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
} from "firebase/firestore";
import { db } from "../../../../../lib/firebase";

type Todo = {
  id: string;
  title: string;
  content: string;
  deadline: string;
  deadlineStatus: string;
  status: string;
  comment?: string;
};

export default function todoPage({ params }: { params: { id: string } }) {
  const [todo, setTodo] = useState<Todo | undefined>(undefined);
  const [comment, setComment] = useState<string>("");
  const id = params.id;
  const router = useRouter();

  useEffect(() => {
    const fetchTodo = async () => {
      if (typeof id === "string") {
        const docRef = doc(db, "todos", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTodo(docSnap.data() as Todo);
        }
      }
    };
    if (id) {
      fetchTodo();
    }
  }, [id]);

  const onClickSaveEdit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const docRef = doc(db, "todos", id);
    await updateDoc(docRef, {
      title: todo?.title,
      status: todo?.status,
      deadline: todo?.deadline,
      comment: comment,
    });
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

  const updateStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (todo) {
      setTodo({
        ...todo,
        status: e.target.value,
      });
    }
  };

  const onClickMoveToTodoList = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      router.push(`/todos/`);
    };

  return (
    <>
      <div className="flex flex-col space-y-10 justify-center items-center mt-10 min-h">
        <div className='mb-3'>
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
                value={todo?.title}
                onChange={(e) => {
                  updateTitle(e);
                }}
              />
            </div>

            <div className="outline-none w-1/6">
              <input
                className="outline-none w-full"
                value={todo?.content}
                onChange={(e) => {
                  updateContent(e);
                }}
              />
            </div>

            <div className="outline-none w-1/6">
              <input
                className="outline-none w-full"
                value={todo?.deadline}
                onChange={(e) => {
                  updateDeadline(e);
                }}
              />
            </div>

            <div className="outline-none w-1/6">
              <input
                className="outline-none w-full"
                value={todo?.status}
                onChange={(e) => {
                  updateStatus(e);
                }}
              />
            </div>
          </li>
          <div className="flex justify-center ">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 mt-8 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
              onClick={onClickSaveEdit}
            >
              保存
            </button>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 mt-8 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
              onClick={onClickMoveToTodoList}
            >
              一覧に戻る
            </button>
          </div>
        </ul>
      </div>
    </>
  );
}
