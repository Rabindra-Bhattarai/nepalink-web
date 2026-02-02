// // app/admin/users/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { fetchUsers } from "@/lib/actions/admin-actions";
// import { Button } from "@/components/ui/Button";

// export default function AdminUsersPage() {
//   const [users, setUsers] = useState([]);
//   const [page, setPage] = useState(1);
//   const limit = 10;

//   useEffect(() => {
//     async function loadUsers() {
//       const data = await fetchUsers(page, limit);
//       if (data) setUsers(data);
//     }
//     loadUsers();
//   }, [page]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Admin: Users Table</h1>

//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2 border">Name</th>
//             <th className="p-2 border">Email</th>
//             <th className="p-2 border">Role</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user: any) => (
//             <tr key={user._id}>
//               <td className="p-2 border">{user.name}</td>
//               <td className="p-2 border">{user.email}</td>
//               <td className="p-2 border">{user.role}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="mt-4 flex gap-4">
//         <Button onClick={() => setPage((p) => Math.max(p - 1, 1))}>Previous</Button>
//         <span>Page {page}</span>
//         <Button onClick={() => setPage((p) => p + 1)}>Next</Button>
//       </div>
//     </div>
//   );
// }
