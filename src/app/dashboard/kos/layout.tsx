import { ReactNode } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function KosDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { userId: clerkId } = await auth();
  if (!clerkId) redirect("/");

  // Ambil data properti asli dari DB untuk header
  const properties = await prisma.properties.findMany({
    where: {
      users: { clerkId: clerkId }
    },
    select: {
      id: true,
      name: true,
      rooms: {
        select: { status: true }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return (
    <div className="flex h-screen bg-[#FAFAFA]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header - Sekarang menerima data asli dari DB */}
        <DashboardHeader properties={properties} />

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}