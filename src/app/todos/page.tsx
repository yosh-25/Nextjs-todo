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
import TodoItemComponent from "../components/TodoItem";
// import { useSession } from "next-auth/react";

const TodoList = () => {
  type Filter = "全て" | "未完了" | "途中" | "完了";
  type FilterDate = "全て" | "期限前" | "今日" | "期限切れ";
  type SortDate = "未選択" | "昇順" | "降順";

  // const { status } = useSession();
  const router = useRouter();

  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [filteredAndSortedTodoList, setFilteredAndSortedTodoList] = useState<TodoItem[]>([]);
  const [filterByDate, setFilterByDate] = useState<FilterDate>("全て");
  const [filterByStatus, setFilterByStatus] = useState<Filter>("全て");
  const [sortByDate, setSortByDate] = useState<SortDate>("未選択");

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
    const filteringTodoList = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      let filtered = todoList.filter((todo) => {
        const deadlineDate = new Date(todo.deadline);
        deadlineDate.setHours(0, 0, 0, 0);
  
        const BeforeDeadline = deadlineDate > today;
        const Today = deadlineDate.getTime() === today.getTime();
        const PastDeadline = deadlineDate < today;
  
        const statusMatch = filterByStatus === "全て" || todo.status === filterByStatus;
  
        if (filterByDate === "期限前" && BeforeDeadline && statusMatch) return true;
        if (filterByDate === "今日" && Today && statusMatch) return true;
        if (filterByDate === "期限切れ" && PastDeadline && statusMatch) return true;
        if (filterByDate === "全て" && statusMatch) return true;
  
        return false;
      });

      if (sortByDate === "昇順") {
        filtered = filtered.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
      } 
      if (sortByDate === "降順") {
        filtered = filtered.sort((a, b) => new Date(b.deadline).getTime() - new Date(a.deadline).getTime());
      }
      
      setFilteredAndSortedTodoList(filtered);
    };

  
    filteringTodoList();
  }, [todoList, filterByDate, filterByStatus, sortByDate]);
  
 

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
          <p className="outline-none w-1/6 ">タイトル</p>
          <p className="outline-none w-1/6">内容</p>
          <p className="outline-none w-1/6">締め切り</p>
          <p className="outline-none w-1/6">ステータス</p>
          <p className="outline-none w-1/6">コメント</p>
          <p className="outline-none w-28"></p>
        </li>
        {filteredAndSortedTodoList.map((todo: TodoItem) => (
          
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
          <div className="mb-3">
            <h3 className="font-semibold">＜締め切りでソート＞</h3>
            <select
              className="border border-solid rounded p-2  border-slate-300"
              value={sortByDate}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSortByDate(e.target.value as SortDate)
              }
            >
              <option value="未選択">未選択</option>
              <option value="昇順">昇順</option>
              <option value="降順">降順</option>
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
