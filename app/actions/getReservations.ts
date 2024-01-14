import prisma from "@/app/libs/prismadb";

// Allows getReservations route to be queried by listingId for the listing,
// userId for My trips, or author so we can see all listings for our listed property
interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(params: IParams) {
  try {
    // Get the params
    const { listingId, userId, authorId } = params;

    const query: any = {};

    // Query based on params
    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    // Find all eservations based on the query
    const reservations = await prisma.reservation.findMany({
      where: query,
      // Include the listing for the authorId query case
      include: {
        listing: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
