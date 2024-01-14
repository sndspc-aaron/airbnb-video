import { getServerSession } from "next-auth/next";

import { authOption } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return await getServerSession(authOption);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: { 
        email: session.user.email as string
      }
    })

    if (!currentUser) {
      return null;
    }

    return currentUser;
    // Prevent Hydration Errors
    // return {
    //   ...currentUser,
    //   createdAt: currentUser.createdAt.toISOString(),
    //   updatedAt: currentUser.updatedAt.toISOString(),
    //   emailVerified: currentUser.emailVerified?.toISOString() || null,
    // };
  } catch (error: any) {
    return null;
  }
}
