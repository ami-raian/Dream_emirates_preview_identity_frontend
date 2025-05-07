import Image from "next/image";
import { commonImageFunction } from "@/api_stores/common-queries";

type Props = {
  fileName?: string;
  className?: string;
  height?: number;
  width?: number;
  type?: "avatar";
  isLoading?: boolean;
};

const CommonImageShow = ({ fileName, height = 256, width = 256 }: Props) => {
  const { data, isLoading: isImageLoading } = commonImageFunction(fileName);
  const imageSrc = data?.message ? data.message : "/avatar-default.png";

  return (
    <div className="relative overflow-hidden rounded-md">
      {isImageLoading ? (
        <div className="absolute inset-0 flex justify-center items-center z-50">
          <div className="w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <Image
          src={imageSrc}
          alt="Image"
          width={width}
          height={height}
          className="h-full w-full object-contain"
        />
      )}
    </div>
  );
};

export default CommonImageShow;
