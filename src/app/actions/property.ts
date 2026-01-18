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
  const city = formData.get("city") as string; // Tambahkan ini
  const description = formData.get("description") as string; // Tambahkan ini

  // Cari ID user internal berdasarkan Clerk ID
  const user = await prisma.users.findUnique({
    where: { clerkId },
  });

  if (!user) throw new Error("User not found");

  // 2. MASUKKAN DATA KE PRISMA
  await prisma.properties.create({
    data: {
      id: crypto.randomUUID(),
      name,
      address,
      city, // Sekarang data city tersimpan
      description, // Sekarang data description tersimpan
      userId: user.id,
      updatedAt: new Date(),
    },
  });

  // Refresh data dashboard agar properti baru muncul
  revalidatePath("/dashboard/kos");
  // Catatan: redirect biasanya ditaruh di paling akhir
  redirect("/dashboard/kos");
}

export async function deleteProperty(id: string) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  // Opsional: Cek apakah properti ini milik user yang sedang login
  // Prisma akan otomatis menghapus Rooms karena onDelete: Cascade di skema Anda
  await prisma.properties.delete({
    where: { id },
  });

  revalidatePath("/dashboard/kos/properties");
}

export async function updateProperty(id: string, formData: FormData) {
  const { userId: clerkId } = await auth();
  if (!clerkId) throw new Error("Unauthorized");

  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const city = formData.get("city") as string;
  const description = formData.get("description") as string;

  await prisma.properties.update({
    where: { id },
    data: {
      name,
      address,
      city,
      description,
      updatedAt: new Date(),
    },
  });

  revalidatePath("/dashboard/kos/properties");
}