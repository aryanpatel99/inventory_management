import Sidebar from "./components/Sidebar";

export default function Loading() {

  // Stack uses React Suspense, which will render this page while user data is being fetched.
  // See: https://nextjs.org/docs/app/api-reference/file-conventions/loading
  return <div className="bg-gray-50 min-h-screen flex">
<Sidebar currentPath={'/loading'}/>
<main className="flex-1 flex items-center justify-center relative"> 
<div role="status" className="flex flex-col items-center justify-center absolute left-1/2 -translate-x1/2">
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
</main>

  </div>
}



// "use client";

// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { BarChart3, Package, Plus, Settings } from "lucide-react";
// import { UserButton } from "@stackframe/stack";

// // Skeleton component for loading states
// function Skeleton({ className = "" }: { className?: string }) {
//   return (
//     <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
//   );
// }

// // Sidebar component for loading state
// function LoadingSidebar() {
//   const navigation = [
//     { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
//     { name: "Inventory", href: "/inventory", icon: Package },
//     { name: "Add Product", href: "/add-product", icon: Plus },
//     { name: "Settings", href: "/settings", icon: Settings },
//   ];

//   return (
//     <div className="fixed left-0 top-0 bg-gray-900 text-white w-64 min-h-screen p-6 z-10">
//       <div className="mb-8">
//         <div className="flex items-center space-x-2 mb-4">
//           <BarChart3 className="w-7 h-7" />
//           <span className="text-lg font-semibold">Inventory App</span>
//         </div>
//       </div>

//       <nav className="space-y-1">
//         <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
//           Inventory
//         </div>
//         {navigation.map((item) => {
//           const IconComponent = item.icon;
//           return (
//             <Link
//               key={item.name}
//               href={item.href}
//               className="flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors hover:bg-gray-800 text-gray-300"
//             >
//               <IconComponent className="w-5 h-5" />
//               <span className="text-sm">{item.name}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
//         <div className="flex items-center justify-between">
//           <div className="flex-1 min-w-0">
//             <Skeleton className="h-4 w-16 mb-1" />
//             <Skeleton className="h-3 w-24" />
//           </div>
//           <div className="ml-3">
//             <UserButton />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Main content skeleton
// function MainContentSkeleton({
//   showSidebar = true,
// }: {
//   showSidebar?: boolean;
// }) {
//   return (
//     <main className={showSidebar ? "ml-64 p-8" : "p-8"}>
//       {/* Header skeleton */}
//       <div className="mb-8">
//         <Skeleton className="h-8 w-32 mb-2" />
//         <Skeleton className="h-4 w-64" />
//       </div>

//       {/* Key Metrics skeleton */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
//         <div className="bg-white rounded-lg border border-gray-200 p-6">
//           <Skeleton className="h-6 w-24 mb-6" />
//           <div className="grid grid-cols-3 gap-6">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="text-center">
//                 <Skeleton className="h-8 w-16 mx-auto mb-2" />
//                 <Skeleton className="h-4 w-20 mx-auto mb-1" />
//                 <div className="flex items-center justify-center">
//                   <Skeleton className="h-3 w-8" />
//                   <Skeleton className="h-3 w-3 ml-1 rounded-full" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded-lg border border-gray-200 p-6">
//           <div className="flex items-center justify-between mb-6">
//             <Skeleton className="h-6 w-40" />
//           </div>
//           <Skeleton className="h-48 w-full" />
//         </div>
//       </div>

//       {/* Bottom Row skeleton */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Stock levels skeleton */}
//         <div className="bg-white rounded-lg border border-gray-200 p-6">
//           <div className="flex items-center justify-between mb-6">
//             <Skeleton className="h-6 w-24" />
//           </div>
//           <div className="space-y-3">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <div
//                 key={i}
//                 className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
//               >
//                 <div className="flex items-center space-x-3">
//                   <Skeleton className="w-3 h-3 rounded-full" />
//                   <Skeleton className="h-4 w-24" />
//                 </div>
//                 <Skeleton className="h-4 w-16" />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Efficiency skeleton */}
//         <div className="bg-white rounded-lg border border-gray-200 p-6">
//           <div className="flex items-center justify-between mb-6">
//             <Skeleton className="h-6 w-20" />
//           </div>
//           <div className="flex items-center justify-center">
//             <Skeleton className="w-48 h-48 rounded-full" />
//           </div>
//           <div className="mt-6 space-y-2">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="flex items-center justify-between">
//                 <div className="flex items-center space-x-2">
//                   <Skeleton className="w-3 h-3 rounded-full" />
//                   <Skeleton className="h-4 w-24" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default function Loading() {
//   const pathname = usePathname();

//   // Don't show sidebar on public routes
//   const showSidebar = !["/", "/sign-in", "/sign-up"].includes(pathname);

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {showSidebar && <LoadingSidebar />}
//       <MainContentSkeleton showSidebar={showSidebar} />
//     </div>
//   );
// }