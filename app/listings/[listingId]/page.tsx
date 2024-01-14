import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmpyState";
import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params } : { params: IParams }) => {
  // Can't use hooks inside server components, have to use actions 
  // that directly communicate with the databae instead.
  // Can still access parameters in server components, which is URL in this case 
  const listing = await getListingById(params);
  // Search reservations for current listing
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <EmptyState />
    )
  }

  return ( 
    <div>
      <ListingClient 
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </div>
   );
}

export default ListingPage;
