"use client";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const {data: session, status} = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/signin');
  }}, [status, router]);

  const signOutAndRedirect = async () => {    
    await signOut({redirect: false});

    router.push('/signin')
    
  }

  if (status === "loading") {
    return <p>Loading</p>;
  }

  return (
      <>
        <div>{session?.user?.name}</div>
        <button onClick={() => signOutAndRedirect()}>Logout</button>
        <br/>
        <button onClick={() => router.push('/todos')} >todosへ</button>
      </>
    );
  }

