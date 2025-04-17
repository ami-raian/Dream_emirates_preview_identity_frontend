// import Image from "next/image";
// import { cn } from "../lib/utils";
// import { Skeleton } from "../ui/skeleton";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { commonImageFunction } from "@/api_stores/queries/common-queries";

// type Props = {
//   fileName?: string;
//   className?: string;
//   height?: number;
//   width?: number;
//   type?: "avatar";
//   isLoading?: boolean;
// };

// const CommonImageShow = ({
//   fileName,
//   className,
//   height = 256,
//   width = 256,
//   type,
//   isLoading = false,
// }: Props) => {
//   const { data, isLoading: isImageLoading } = commonImageFunction(fileName);

//   const loading = isLoading || isImageLoading;

//   const rawUrl = data?.message;

//   // Validate image URL before using it
//   const isValidImageUrl =
//     typeof rawUrl === "string" &&
//     (rawUrl.startsWith("http://") ||
//       rawUrl.startsWith("https://") ||
//       rawUrl.startsWith("/"));

//   const imageUrl = isValidImageUrl
//     ? rawUrl
//     : type === "avatar"
//     ? "/avatar-default.png"
//     : "/not-found.png";

//   if (type === "avatar") {
//     return (
//       <Avatar className={cn("h-10 w-10", className)}>
//         {loading ? (
//           <Skeleton className="h-10 w-10 rounded-full" />
//         ) : (
//           <>
//             <AvatarImage
//               src={imageUrl ? imageUrl : "/avatar1.jpg"}
//               alt="Avatar"
//             />
//             <AvatarFallback>
//               <Skeleton className="h-10 w-10 rounded-full" />
//             </AvatarFallback>
//           </>
//         )}
//       </Avatar>
//     );
//   }

//   return (
//     <div className={cn("relative overflow-hidden rounded-md", className)}>
//       {loading ? (
//         <Skeleton className={cn("h-full w-full", className)} />
//       ) : (
//         <Image
//           src={imageUrl ? imageUrl : "/avatar1.jpg"}
//           alt="Image"
//           width={width}
//           height={height}
//           className={cn("h-full w-full object-contain", className)}
//         />
//       )}
//     </div>
//   );
// };

// export default CommonImageShow;
