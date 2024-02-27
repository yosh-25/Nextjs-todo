"use client";
import { getDoc, doc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../../lib/firebase";

export async function getTodoData(docId: string) {
  const todoRef = doc(db, "todos", docId);
  const docSnap = await getDoc(todoRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    const todoData = {
      todoTitle: data!.todoTitle,
      todoContent: data!.todoContent,
      deadline: data!.deadline,
      deadlineStatus: data!.deadlineStatus,
      status: data!.status,
    };
    return todoData;
  } else {
    console.log("No such document!");
  }
}
