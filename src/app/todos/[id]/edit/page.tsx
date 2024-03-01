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

export default function todoEditPage({ params }: { params: { id: string } }) {
  const [todo, setTodo] = useState<Todo | undefined>(undefined);
  const [newTitle, setNewTitle] = useState<string>("");
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

  const onClickAddComment = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const docRef = doc(db, "todos", id);
    await updateDoc(docRef, {
      comment: comment,
    });
  };

  const onChangeEditTodoTitle = async () => {
    setTodo((prevState:any) => ({...prevState, title: `${newTitle}`}));
    console.log(todo)
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
            保存
          </button>
        </li>
        <input type="text" value={todo?.title} 
        onChange={(e)=> setNewTitle(e.target.value)}
        />
        <input type="text" value={todo?.deadline} />
        <input type="text" value={todo?.status} />
      </ul>
    </>
  );
}
