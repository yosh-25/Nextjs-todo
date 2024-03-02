// 'use client';
// import { signIn, useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import React from 'react'
// import { useEffect } from 'react';

// export default function Login() {
//     const {status} = useSession();
//     const router = useRouter();

//     useEffect(() => {
//     if (status === 'authenticated') {
//         router.push('/');
//     }}, [status, router]);

//   return (
//     <button onClick={()=> signIn('google')} >Login</button>
//   )
// }
