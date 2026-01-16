"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function syncUser() {
  const user = await currentUser();

  if (!user) return null;

  try {
    // Sesuaikan field dengan schema.prisma Anda (firstName, lastName, imageUrl)
    const dbUser = await prisma.users.upsert({
      where: { clerkId: user.id },
      update: {
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
      },
      create: {
        id: user.id, // Menggunakan ID Clerk sebagai ID utama atau biarkan Prisma jika pakai CUID
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        // updatedAt wajib diisi jika di schema tidak ada @default(now()) atau @updatedAt
        updatedAt: new Date(), 
      },
    });

    return dbUser;
  } catch (error) {
    console.error("Gagal sinkronisasi user:", error);
    return null;
  }
}