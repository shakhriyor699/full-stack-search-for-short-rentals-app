'use client'

import { SafeListing, SafeUser } from "@/app/types"
import { categories } from "@/components/Categories"
import Container from "@/components/Container"
import ListingHead from "@/components/ListingHead"
import { Reservation } from "@prisma/client"
import { FC, useMemo } from "react"


interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser
  }
  currentUser?: SafeUser | null
  reservations?: Reservation[]
}

const ListingClient: FC<ListingClientProps> = ({
  listing,
  currentUser
}) => {

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
        </div>
      </div>
    </Container>
  )
}

export default ListingClient