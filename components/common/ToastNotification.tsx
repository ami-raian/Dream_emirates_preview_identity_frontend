// // toastUtils.ts
// import { toast } from "@/hooks/use-toast";
// import { CheckCircle, XCircle, Info, Warning } from "@phosphor-icons/react";
// import { cn } from "@/lib/utils";
// import { cva } from "class-variance-authority";

// const ToastIcons: Record<ToastType, React.ReactNode> = {
//   success: <CheckCircle weight="fill" color="green" size={20} />,
//   error: <XCircle weight="fill" color="red" size={20} />,
//   info: <Info weight="fill" color="blue" size={20} />,
//   warning: <Warning weight="fill" color="orange" size={20} />,
//   default: null,
// };

// const toastVariants = cva(
//   "fixed bottom-4 right-4 h-fit w-[22rem] p-4 flex items-center shadow-md rounded-md",
//   {
//     variants: {
//       variant: {
//         success: "bg-green-50 text-green-600",
//         error: "bg-red-50 text-red-600",
//         warning: "bg-orange-50 text-orange-600",
//         info: "bg-blue-50 text-blue-600",
//         default: "bg-gray-50 text-gray-600",
//       },
//     },
//     defaultVariants: { variant: "default" },
//   }
// );

// type ToastType = "success" | "error" | "info" | "warning" | "default";

// export const useToastNotification = (
//   message: string,
//   variant: ToastType = "default",
//   title?: string,
//   duration = 3000
// ) => {
//   return toast({
//     title,
//     description: (
//       <div className="flex items-center gap-2">
//         {ToastIcons[variant] || null}
//         <span className="flex-1">{message}</span>
//       </div>
//     ),
//     duration,
//     className: cn(toastVariants({ variant })),
//   });
// };
