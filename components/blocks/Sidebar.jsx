import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="flex h-[100vh] overflow-auto flex-col bg-slate-800">
      <div className="my-4 px-4">
        <a className="text-blue-200">Nav</a>
        <div className="mt-2 ml-2">
          <ul>
            <li>
              <button>
                <Link href="/" className="hover:text-slate-300">
                  Home
                </Link>
              </button>
            </li>
            <li>
              <button>
                <Link href="/manage-data" className="hover:text-slate-300">
                  Manage Data
                </Link>
              </button>
            </li>
            <li>
              <button>
                <Link href="/view-data" className="hover:text-slate-300">
                  View Data
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-4 px-4 text-blue-200">Current Prompt:</div>
      <div className="px-4">Copy Gen</div>
    </div>
  );
};

export default Sidebar;
