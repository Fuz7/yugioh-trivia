// components/UserMenu.tsx
import { useState, useRef, useEffect } from "react";
import { CircleUserRound, LogOut } from "lucide-react";
import UserProfile from "@images/profile.png";

function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative h-10 ">
      <button className="cursor-pointer">
        <img
          className="h-10"
          src={UserProfile}
          onClick={() => setOpen((prev) => !prev)}
        />
      </button>
      {open && (
        <div className="absolute  right-0 mt-2 w-48 bg-card border border-[#30363d] rounded-md shadow-xl py-1 z-50">
          <div className="px-4 py-2 border-b border-[#30363d]">
            <p className="text-xs text-[#8b949e]">Signed in as</p>
            <p className="text-sm font-semibold text-[#e6edf3] truncate">
              username
            </p>
          </div>
          <div className="py-1">
            <button
              className="w-full text-left px-4 py-2 cursor-pointer
               text-sm text-[#e6edf3] hover:bg-[#21262d] flex items-center gap-2 transition-colors"
              onClick={() => {
                /* handle logout */
              }}
            >
              <LogOut width={14} height={14} />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
