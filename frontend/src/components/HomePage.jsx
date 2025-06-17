import MessageContainer from "./MessageContainer";
import Sidebar from "./Sidebar";

export default function HomePage() {
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 border-4">
          <Sidebar />
          <MessageContainer />
        </div>
      </div>
    </>
  );
}
