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
} from "firebase/firestore";
import { db } from "../../../../lib/firebase";
import { TodoItem } from "@/app/types";

export default function todoPage({ params }: { params: { id: string } }) {
  const [todo, setTodo] = useState<TodoItem>({
    id: "",
    title: "",
    content: "",
    deadline: "",
    deadlineStatus: "",
    status: "",
    comment: "",
  });
  const [comment, setComment] = useState<string>(``);
  const [succeed, setSucceed] = useState<string>("");
  const id = params.id;
  const router = useRouter();

  useEffect(() => {
    const fetchTodo = async () => {
      if (typeof id === "string") {
        const docRef = doc(db, "todos", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const fetchTodo = docSnap.data() as TodoItem;
          setTodo(fetchTodo)
          setComment(fetchTodo.comment);
        }
      }
    };
    if (id) {
      fetchTodo();
    }
  }, [id]);

  const addComment = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const docRef = doc(db, "todos", id);
    await updateDoc(docRef, {
      comment: comment,
    });
    setSucceed("保存できました！");
  };

  const clickToDeleteTodo = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await deleteDoc(doc(db, "todos", id));
    router.push("/todos/");
  };

  const clickToMoveToEdit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    router.push(`/todos/${id}/edit`);
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
        <h1 className="text-3xl font-bold">Todo詳細</h1>
      </div>
      <ul className="space-y-3 text-xl w-9/12">
        <li className="flex justify-between  mb-6 ">
          <p className="outline-none w-1/6 ">Title</p>
          <p className="outline-none w-1/6 ">Content</p>
          <p className="outline-none w-1/6 ">Deadline</p>
          <p className="outline-none w-1/6 ">Status</p>
          <p className="outline-none w-1/6 ">Comment</p>
        </li>
        <li className="flex justify-between mb-3 pb-2 border-b border-blue-00">
          <p className="outline-none w-1/6 ">{todo?.title}</p>
          <p className="outline-none w-1/6 ">{todo?.content}</p>
          <p className="outline-none w-1/6 ">{todo?.deadline}</p>
          <p className="outline-none w-1/6 ">{todo?.status}</p>
          <input
            className="w-1/6"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder= "コメントが入力できます"
          />
        </li>
      </ul>
      <div className="!mt-4 w-9/12">
        <div className="flex flex-col mb-8">
          <p className="text-right text-xs mb-3" >↑直接入力で変更可</p>
          <div className="flex justify-end">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm display:inline-block h-9 w-36 px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
              onClick={addComment}
            >
              コメントを保存
            </button>
          </div>
          <div className="flex justify-end h-3">
            {succeed ? <p>{succeed}</p> : ""}
          </div>
        </div>
        <div className="flex justify-center">
          <div>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
              onClick={clickToMoveToEdit}
            >
              編集
            </button>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
              onClick={clickToDeleteTodo}
            >
              削除
            </button>
          </div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
            onClick={clickToMoveToTodoList}
          >
            一覧に戻る
          </button>
        </div>
      </div>
    </>
  );
}
