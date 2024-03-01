"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { doc, getDoc, addDoc, setDoc, updateDoc, deleteDoc, collection } from "firebase/firestore";
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
        title: e.target.value
    });
  }
};

const updateDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (todo) {    
    setTodo({
        ...todo,
        deadline: e.target.value
    });
  }
};

const updateStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (todo) {    
    setTodo({
        ...todo,
        status: e.target.value
    });
  }
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
   
        </li>
        <input value={todo?.title} onChange={(e) => {updateTitle(e)}} />
        <input value={todo?.deadline} onChange={(e) => {updateDeadline(e)}} />
        <input value={todo?.status} onChange={(e) => {updateStatus(e)}} />

        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
        onClick={onClickSaveEdit}
        >
          保存
        </button>
      </ul>
    </>
  );
}
