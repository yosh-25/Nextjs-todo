"use client";
import { useRouter } from "next/navigation";
// import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const router = useRouter();

  // const {data: session, status} = useSession();
  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push('/signin');
  // }}, [status, router]);

  // const signOutAndRedirect = async () => {
  //   await signOut({redirect: false});
  //   router.push('/signin')

  // }

  // if (status === "loading") {
  //   return <p>Loading</p>;
  // }

  return (
    <>
      <div className="flex flex-col space-y-4 justify-center items-center mt-10 min-h">
        <div className='pb-5' >
          <h1 className="text-3xl font-bold">Todoアプリ</h1>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
          onClick={() => router.push(`/todos`)}
        >
          Todo一覧
        </button>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
          onClick={() => router.push(`/todos/create`)}
        >
          新規作成
        </button>
      </div>
    </>
  );

  // オリアプで認証は実装する。
  // return (
  //     <>
  //       {/* <div>{session?.user?.name}</div>
  //       <button onClick={() => signOutAndRedirect()}>Logout</button>
  //       <br/> */}
  //       <button onClick={() => router.push('/todos')} >todosへ</button>
  //     </>
  //   );
}
