import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { User } from "@prisma/client";
import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string;
  currentUser?: User | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  // useMemo is used here for optimization
  const hasFavorited = useMemo(() => {
    // Ensure favoriteIds is an array before using it
    const favoriteIds = Array.isArray(currentUser?.favoriteIds)
      ? currentUser.favoriteIds
      : [];

    return favoriteIds.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      loginModal.onOpen();
      return;
    }

    try {
      const endpoint = `/api/favorites/${listingId}`;
      const method = hasFavorited ? 'delete' : 'post';
      await axios[method](endpoint);

      toast.success('Success');
      router.refresh();
    } catch (error) {
      toast.error('Something went wrong');
    }
  }, [currentUser, hasFavorited, listingId, loginModal, router]);

  return {
    hasFavorited,
    toggleFavorite,
  };
};

export default useFavorite;
