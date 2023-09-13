import { MdError } from "react-icons/md";

function ErrorMessage() {
  return (
    <div className="flex p-8 bg-red-50 border-red-200 border-2 rounded flex-col justify-center items-center gap-4">
      <div>
        <MdError className="w-12 h-12 text-red-600" />
      </div>
      <p>Something went wrong</p>
    </div>
  );
}

export default ErrorMessage;
