import { Spinner } from "../ui/spinner";

function Loader(): JSX.Element {
  return (
    <div className="h-full w-full flex items-center justify-center ">
      <Spinner size="large" className="text-purple-500">
        <span className="text-purple-500">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loader;
