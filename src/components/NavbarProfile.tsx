"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { LogOut, Settings } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function NavbarProfile() {
  const { user, isLoaded } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isLoaded) {
    return <div className="w-8 h-8 bg-slate-200 rounded-lg animate-pulse" />;
  }

  if (!user) {
    return null;
  }

  const userInitial = (user.firstName?.charAt(0) || "U").toUpperCase();
  const userEmail = user.emailAddresses[0]?.emailAddress || "user@example.com";
  const displayName = user.firstName
    ? `${user.firstName} ${user.lastName || ""}`.trim()
    : "User";

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth/login");
  };

  const handleManageAccount = () => {
    openUserProfile();
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 hover:bg-slate-50 rounded-lg px-2 py-1 transition-colors"
        title="Profile"
      >
        {user.imageUrl ? (
          <Image
            src={user.imageUrl}
            alt={displayName}
            width={32}
            height={32}
            className="w-8 h-8 rounded-lg object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-semibold">{userInitial}</span>
          </div>
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full mt-2 right-0 w-72 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
          {/* User Info */}
          <div className="px-4 py-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              {user.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={displayName}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-lg object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">{userInitial}</span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-slate-900 text-sm">{displayName}</p>
                <p className="text-xs text-slate-500 truncate">{userEmail}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <button
              onClick={handleManageAccount}
              className="w-full px-4 py-2.5 text-left hover:bg-slate-50 transition-colors flex items-center gap-3 text-slate-900"
            >
              <Settings className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium">Manage Account</span>
            </button>

            <div className="border-t border-slate-100 my-2" />

            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2.5 text-left hover:bg-red-50 transition-colors flex items-center gap-3 text-red-600"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
