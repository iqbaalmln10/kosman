"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProperty(formData: FormData) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const address = formData.get("address") as string;

  // Cari ID user internal berdasarkan Clerk ID
  const user = await prisma.users.findUnique({
    where: { clerkId },
  });

  if (!user) throw new Error("User not found");

  await prisma.properties.create({
    data: {
      id: crypto.randomUUID(),
      name,
      address,
      city: "",
      userId: user.id,
      updatedAt: new Date(),
    },
  });

  // Refresh data dashboard agar properti baru muncul
  revalidatePath("/dashboard/kos");
  redirect("/dashboard/kos");
}