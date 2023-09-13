import { AiOutlineLoading } from "react-icons/ai";

function Loading() {
  return (
    <div className="flex p-8 flex-col justify-center items-center gap-4">
      <div className="animate-spin">
        <AiOutlineLoading className="w-12 h-12 text-primary-600" />
      </div>
      <p>Loading</p>
    </div>
  );
}

export default Loading;
