"use client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { doc, getDoc, addDoc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";

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

  const onClickAddComment = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const docRef = doc(db, "todos", id);
    await updateDoc(docRef, {
      comment: comment,
    });
    console.log(comment)
    console.log('aa')
  };

  const onClickDeleteTodo = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
        await deleteDoc(doc(db, 'todos', id))
        const router = useRouter
        router.push('/todos/')
        // from here
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">My todo</h1>
      </div>
      <ul className="space-y-3 text-xl w-9/12">
        <li className="flex justify-between  pl-14 pr-14 ">
          <p className="outline-none">Title</p>
          <p className="outline-none">Content</p>
          <p className="outline-none">Deadline</p>
          <p className="outline-none">Status</p>
          <p className="outline-none">Comment</p>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
            onClick={onClickAddComment}
          >
            コメントを保存
          </button>
        </li>
        <p className="outline-none">{todo?.title}</p>
        <p className="outline-none">{todo?.content}</p>
        <p className="outline-none">{todo?.status}</p>
        <p className="outline-none">{todo?.deadline}</p>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="コメントを入力"
        />
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
          onClick={onClickDeleteTodo}
        >
          削除
        </button>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
        >
          編集
        </button>
      </ul>
    </>
  );
}
