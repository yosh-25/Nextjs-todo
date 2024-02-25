"use client";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const session = useSession();
  if (session) {
    return (
      <>
        <div>{session?.data?.user?.name}</div>
        <button onClick={() => signOut()}>Logout</button>
      </>
    );
  } else {
    redirect('/')
  }
}
