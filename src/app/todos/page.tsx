"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { TodoItem } from "../types";
import TodoItemComponent from '../components/TodoItem'
// import { useSession } from "next-auth/react";

const TodoList = () => {

  type Filter = "全て" | "未完了" | "途中" | "完了";
  type FilterDate = "全て" | "期限前" | "今日" | "期限切れ";

  // const { status } = useSession();
  const router = useRouter();

  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [filteredTodoList, setFilteredTodoList] = useState<TodoItem[]>([]);
  const [filterByDate, setFilterByDate] = useState<FilterDate>("全て");
  const [filterByStatus, setFilterByStatus] = useState<Filter>("全て");

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/signin");
  //   }
  // }, [status, router]);

  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(db, "todos"));
      const todoList = querySnapshot.docs.map((doc) => ({
        ...(doc.data() as TodoItem),
        id: doc.id,
      }));
      setTodoList(todoList);
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    const filteringTodoListByDate = () => {
      const today = new Date(Date.now());

      const filtered = todoList.map((todo) => {
        const deadlineDate = new Date(todo.deadline ?? Date.now());
        if (today < deadlineDate) {
          return { ...todo, deadlineStatus: "期限前" };
        }
        if (today.toDateString() === deadlineDate.toDateString()) {
          return { ...todo, deadlineStatus: "今日" };
        } else {
          return { ...todo, deadlineStatus: "期限切れ" };
        }
      });

      switch (filterByDate) {
        case "期限前":
          setFilteredTodoList(
            filtered.filter((todo: TodoItem) => todo.deadlineStatus === "期限前")
          );
          break;

        case "今日":
          setFilteredTodoList(
            filtered.filter((todo: TodoItem) => todo.deadlineStatus === "今日")
          );
          break;

        case "期限切れ":
          setFilteredTodoList(
            filtered.filter((todo: TodoItem) => todo.deadlineStatus === "期限切れ")
          );
          break;

        default:
          setFilteredTodoList(todoList);
      }
    };
    filteringTodoListByDate();
  }, [filterByDate, todoList]);

  useEffect(() => {
    const filteringTodoList = () => {
      switch (filterByStatus) {
        case "未完了":
          setFilteredTodoList(
            todoList.filter((todoList) => todoList.status === "未完了")
          );
          break;
        case "途中":
          setFilteredTodoList(
            todoList.filter((todoList) => todoList.status === "途中")
          );
          break;
        case "完了":
          setFilteredTodoList(
            todoList.filter((todoList) => todoList.status === "完了")
          );
          break;

        default:
          setFilteredTodoList(todoList);
      }
    };
    filteringTodoList();
  }, [filterByStatus, todoList]);

  const ClickMoveToCreate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    router.push(`/todos/create`);
  };

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Todo一覧</h1>
      </div>
      <ul className="space-y-2  text-xl w-9/12">
        <li className="flex justify-between mb-6">
          <p className="outline-none w-1/6 ">Title</p>
          <p className="outline-none w-1/6">Content</p>
          <p className="outline-none w-1/6">Deadline</p>
          <p className="outline-none w-1/6">Status</p>
          <p className="outline-none w-1/6">Comment</p>
        </li>
        {filteredTodoList.map((todo: TodoItem) => (
         <TodoItemComponent key={todo.id} todo={todo} />
        ))}
      </ul>
      <div className="flex flex-col justify-center">
        <div>
          <div className="mb-3">
            <h3 className="font-semibold">＜締め切り検索＞</h3>
            <select
              className="border border-solid rounded p-2  border-slate-300"
              value={filterByDate}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFilterByDate(e.target.value as FilterDate)
              }
            >
              <option value="全て">全て</option>
              <option value="期限前">期限前</option>
              <option value="今日">今日</option>
              <option value="期限切れ">期限切れ</option>
            </select>
          </div>
          <div className="mb-3">
            <h3 className="font-semibold">＜ステータス検索＞</h3>
            <select
              className="border border-solid rounded p-2  border-slate-300"
              value={filterByStatus}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFilterByStatus(e.target.value as Filter)
              }
            >
              <option value="全て">全て</option>
              <option value="未完了">未完了</option>
              <option value="途中">途中</option>
              <option value="完了">完了</option>
            </select>
          </div>
        </div>
        <div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
            onClick={ClickMoveToCreate}
          >
            Todo新規作成
          </button>
        </div>
      </div>
    </>
  );
};

export default TodoList;
