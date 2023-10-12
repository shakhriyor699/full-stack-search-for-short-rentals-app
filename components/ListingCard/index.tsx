'use client'
import useCountries from "@/app/hooks/useCountries"
import { SafeUser } from "@/app/types"
import { Listing, Reservation } from "@prisma/client"
import { useRouter } from "next/navigation"
import { FC, MouseEvent, useMemo } from "react"
import { format } from "date-fns"
import Image from "next/image"
import HeartButton from "../HeartButton"


interface ListingCardProps {
  reservation?: Reservation
  data: Listing
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser?: SafeUser | null
}

const ListingCard: FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
  currentUser
}) => {
  const router = useRouter()
  const { getByValue } = useCountries()

  const location = getByValue(data.locationValue)

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    if (disabled) {
      return
    }

    onAction?.(actionId)
  }

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice
    }

    return data.price
  }, [reservation, data.price])

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null
    }

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`

  }, [reservation])

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="
        col-span-1
        cursor-pointer
        group
      "
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            src={data.imageSrc}
            alt="Listing"
            className="
              object-cover
              w-full
              h-full
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
        <div className="font-semibold text-lg">
          {location?.region} , {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex items-center gap-1">
          <div className="font-semibold text-2xl">
            ${price}
          </div>
          {
            !reservation && (
              <div className="font-light text-neutral-500">
                / night
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default ListingCard