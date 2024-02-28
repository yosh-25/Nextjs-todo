'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { db } from '../../../../lib/firebase';

type Todo = {
    id: string;
    title: string;
    content: string;
    deadline: string;
    deadlineStatus: string;
    status: string;
  };

const TodoPage = () => {
    const [todo, setTodo] = useState<Todo | undefined>(undefined);
    const params = useParams()
    // const id = params?.id
    // from here

    useEffect(() => {
        const fetchTodo = async () => {
            if(typeof id === 'string') {
            const docRef = doc(db, 'todo', id);
            const docSnap = await getDoc(docRef);
            setTodo({
                ...docSnap.data() as Todo
            })
        }}
        fetchTodo();
    }, [id]);

    return (
        <div>
            <h1>{todo?.title}</h1>
            <p>{todo?.content}</p>


        </div>

    )


}

export default TodoPage;