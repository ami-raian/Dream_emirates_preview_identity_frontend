export default function CommonLoading() {
  return (
    <div className="absolute inset-0 flex justify-center items-center z-50">
      <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900"></div>
    </div>
  );
}
