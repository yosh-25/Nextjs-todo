import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col space-y-10 justify-center items-center mt-10 min-h">
      <div>
        <h1 className="text-3xl font-bold">Todo一覧</h1>
      </div>

      <ul className="space-y-3 text-xl w-9/12">
        <li className="flex justify-between  pl-14 pr-14 ">
          <p className="outline-none">タイトル</p>
          <p>ステータス</p>
        </li>

        <Link href="/">
        <li className="flex justify-between border-l-4 pl-14 pr-14 border-blue-500 bg-white rounded shadow p-3">
          <p className="outline-none">todo</p>
          <p>status</p>
        </li>
        </Link>
        <li className="flex justify-between space-x-5 border-l-4 pl-14 pr-14 border-blue-500 bg-white rounded shadow p-3">
          <p className="outline-none">todo</p>
          <p>status</p>
        </li>
        <li className="flex justify-between space-x-5 border-l-4 pl-14 pr-14 border-blue-500 bg-white rounded shadow p-3">
          <p className="outline-none">todo</p>
          <p>status</p>
        </li>
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
  );
};

export default page;