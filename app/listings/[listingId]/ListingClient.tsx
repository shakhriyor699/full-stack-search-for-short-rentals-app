'use client'
import useLoginModal from "@/app/hooks/useLoginModal"
import { SafeListing, SafeReservation, SafeUser } from "@/app/types"
import { categories } from "@/components/Categories"
import Container from "@/components/Container"
import ListingHead from "@/components/ListingHead"
import ListingInfo from "@/components/ListingInfo"
import ListingReservation from "@/components/ListingReservation"
import axios from "axios"
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns"
import { useRouter } from "next/navigation"
import { FC, useEffect, useMemo, useState } from "react"
import { Range } from "react-date-range"
import toast from "react-hot-toast"

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
}


interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser
  }
  currentUser?: SafeUser | null
  reservations?: SafeReservation[]
}

const ListingClient: FC<ListingClientProps> = ({
  listing,
  reservations = [],
  currentUser
}) => {
  const loginModal = useLoginModal()
  const router = useRouter()

  const disabledDates = useMemo(() => {
    let dates: Date[] = []

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      })

      dates = [...dates, ...range]
    })

    return dates
  }, [reservations])

  const [isLoading, setIsLoading] = useState(false)
  const [totalPrice, setTotalPrice] = useState(listing.price)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)

  const onCreateReservation = async () => {
    if (!currentUser) {
      return loginModal.onOpen()
    }

    setIsLoading(true)
    try {
      await axios.post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id
      })
      toast.success('Listing reserved!')
      setDateRange(initialDateRange)
      router.push('/trips')
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong')
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dateCount = differenceInCalendarDays(dateRange.endDate, dateRange.startDate)

      if (dateCount && listing.price) {
        setTotalPrice(dateCount * listing.price)
      } else {
        setTotalPrice(listing.price)
      }
    }
  }, [dateRange, listing.price])

  const category = useMemo(() => {
    return categories.find(item => item.label === listing.category)
  }, [listing.category])

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="
            grid
            grid-cols-1
            md:grid-cols-7
            md:gap-10
            mt-6
          ">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              bathroomCount={listing.bathroomCount}
              guestCount={listing.guestCount}
              locationValue={listing.locationValue}
            />
            <div
              className="
                order-first
                mb-10
                md:order-last
                md:col-span-3
              "
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(range) => setDateRange(range)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default ListingClient