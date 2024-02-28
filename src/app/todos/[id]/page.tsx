"use client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../lib/firebase";

type Todo = {
  id: string;
  title: string;
  content: string;
  deadline: string;
  deadlineStatus: string;
  status: string;
};

export default function todoPage({ params }: { params: { id: string } }) {
  const [todo, setTodo] = useState<Todo | undefined>(undefined);
  const id = 'I9pNgS28FaBHmPjwwFqf';
  useEffect(() => {
    const fetchTodo = async () => {
      if (typeof id === "string") {
        const docRef = doc(db, "todo", id);
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

  return (
    <>
  <h1>{id}</h1>
  <h1>{todo?.title}</h1>
  </>
  );
}

// const TodoPage = () => {
//     const [todo, setTodo] = useState<Todo | undefined>(undefined);
//     const router = useRouter();
//     const { id } = router.query;

//     useEffect(() => {
//         const fetchTodo = async () => {
//             if(typeof id === 'string') {
//             const docRef = doc(db, 'todo', id);
//             const docSnap = await getDoc(docRef);
//             if (docSnap.exists()){
//             setTodo(docSnap.data() as Todo);
//             }
//         }
//     };
//         if(id) {
//             fetchTodo();
//     }
//     }, [id]);

//     return (
//         <div key={todo?.id}>
//             <h1>{todo?.title}</h1>
//             <p>{todo?.content}</p>

//         </div>

//     )

// }
