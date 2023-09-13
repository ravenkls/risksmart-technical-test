import EmptySVG from "../assets/empty.svg";

function Empty() {
  return (
    <div className="w-full p-12 flex flex-col gap-4 justify-center items-center">
      <img src={EmptySVG} className="w-52" />
      <p className="text-center opacity-80">
        It looks like there's nothing here
      </p>
    </div>
  );
}

export default Empty;
