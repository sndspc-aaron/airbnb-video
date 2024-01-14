"use client";

import { useRouter } from "next/navigation";
import { Listing, Reservation, User } from "@prisma/client";

import useCountries from "@/app/hooks/useCountries";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  // so we don't need to start lat long object values etc in database
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation]);

  return (
    <div 
      onClick={() => router.push(`/listings/${data.id}`)}
      className="
        cols-space-1 cursor-pointer group
      "
    >
      <div className="flex flex-col gap-1 w-full">
        <div 
          className="
            aspect-square
            w-full
            relative
            overflow-hidden
            rounded-xl
            mb-3
          "
        >
          <Image 
            fill
            alt="Listing"
            src={data.imageSrc}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="
              object-cover
              h-full
              w-full
              group-hover:scale-110
              transition
            "
          />
          <div className="absolute top-3 right-3">
            <HeartButton 
              listingId={data.id}
              currentUser={currentUser}
            />            
          </div>
        </div>
        <div className="font-semibold text-md leading-none">
          {location?.region}, {location?.label}          
        </div>
        {/* Hide category for reservations */}
        <div className="text-sm text-neutral-500">
          {reservationDate || data.category}          
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="text-md font-semibold leading-8">
            ${price}
          </div>   
           {/*Hide per night label for reservations  */}
          {!reservation && (
            <div className="font-normal">night</div>
          )}  
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
    );
};

export default ListingCard;
