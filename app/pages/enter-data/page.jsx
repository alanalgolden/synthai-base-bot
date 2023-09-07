export default function Page() {
  return (
    <div
      className="flex-auto p-8 overflow-x-auto overflow-y-auto ml-64 min-w-[40rem] bg-slate-900"
      style={{ minHeight: "100vh", width: "max-content" }}
    >
      <div className="bg-slate-900 w-full flex justify-center overflow-scroll  max-h-[80vh]">
        <div className="border-slate-500 border-4 rounded-md  mt-4 min-w-[30rem] w-[60rem] max-w-5xl flex flex-col">
          enter-data
          <button>DataButton</button>
        </div>
      </div>
    </div>
  );
}
