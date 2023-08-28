const Sidebar = () => {
  return (
    <div className="flex w-[20%]  h-[100vh] overflow-auto flex-col bg-stone-800">
      <div className="mt-4 px-4 text-blue-200">Current Prompt:</div>
      <div className="px-4">Copy Gen</div>
    </div>
  );
};

export default Sidebar;
