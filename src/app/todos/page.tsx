"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getFirestore, doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../../lib/firebase";


const TodoList = () => {
  type NewTodo = {
    id: string;
    title: string;
    content: string;
    deadline: string;
    deadlineStatus: string;
    status: string;
    comment: string
  };

  const { status } = useSession();
  const router = useRouter();
  const [todoList, setTodoList] = useState<NewTodo[]>([]);
  const onClickMoveToIdPage = (id: string) => {};

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

 
  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const todoList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data() as NewTodo
      }));
      setTodoList(todoList);
    };
    fetchTodos();
    
  }, []);

  return (
    <>
      <div className="flex flex-col space-y-10 justify-center items-center mt-10 min-h">
        <div>
          <h1 className="text-3xl font-bold">Todo一覧</h1>
        </div>
        <ul className="space-y-3 text-xl w-9/12">
          <li className="flex justify-between  pl-14 pr-14 ">
            <p className="outline-none">Title</p>
            <p className="outline-none">Content</p>
            <p className="outline-none">Deadline</p>
            <p className="outline-none">Status</p>
            <p className="outline-none">Comment</p>
          </li>
          {todoList.map((todo: NewTodo) => (
            <li key={todo.id} className="flex justify-between  pl-14 pr-14 ">
              <Link href={`/todos/${todo.id}`}>

                <p className="outline-none">{todo.id}</p>
                <p className="outline-none">{todo.title}</p>
                <p className="outline-none">{todo.content}</p>
                <p className="outline-none">{todo.deadline}</p>
                <p className="outline-none">{todo.status}</p>
                <p className="outline-none">{todo.comment}</p>
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <Link href="/">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
            >
              フィルター
            </button>
          </Link>
          <Link href="/">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
            >
              ソート
            </button>
          </Link>
          <Link href="/">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
            >
              Todo新規作成
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default TodoList;
