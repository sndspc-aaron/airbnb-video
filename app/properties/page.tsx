import EmptyState from "../components/EmpyState";

import getCurrentUser from "../actions/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please log in."
      />
    )
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No properties found"
        subtitle="Looks like you don't have any properties."
      />
    )
  }

  return (
    <PropertiesClient 
      listings={listings}
      currentUser={currentUser}
    />
  )
}

export default PropertiesPage;
