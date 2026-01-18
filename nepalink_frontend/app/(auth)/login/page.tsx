import { AuthCard } from '../_components/ui/AuthCard'
import { LoginForm } from './LoginForm'

export default function LoginPage() {
  return (
    <AuthCard
      title="Welcome to NepaLink"
      description="Sign in to your account"
    >
      <LoginForm />
    </AuthCard>
  )
}

// import Link from "next/link";
// import { AuthCard } from '../_components/ui/AuthCard'
// import { LoginForm } from './LoginForm'

// export default function LoginPage() {
//     return (
//         <div className="mx-auto max-w-md border m-2 p-4 rounded">
//             <div className="m-1">
//                 <label className="block mb-2 font-semibold">Email:</label>
//                 <input className="p-1 border"/>
//             </div>
//             <div className="m-1">
//                 <label className="block mb-2 font-semibold">Password:</label>
//                 <input type="password" className="p-1 border"/>
//             </div>
//             <button className="bg-green-500 border rounded p-2 mt-2 text-white">Login</button>
//             <div>
//                 Don't have account? 
//                 <Link href="/register" className="text-blue-500 underline">Register</Link>
//             </div>
//         </div>
//     );
// }
// // Make register from in component and use in register page
// // Add link to login page in the register page