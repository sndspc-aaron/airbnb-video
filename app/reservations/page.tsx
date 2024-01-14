import EmptyState from "../components/EmpyState";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState 
        title="Unauthorized"
        subtitle="Please log in."
      />
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id
  });

  if (reservations.length === 0) {
    return (
      <EmptyState 
        title="No reservations found"
        subtitle="It looks like you have no reservations on your properties."
      />
    )
  }

  return (
    <ReservationsClient 
      reservations={reservations}
      currentUser={currentUser}
    />
  )
}

export default ReservationsPage;
