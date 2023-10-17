'use client'

import useCountries from "@/app/hooks/useCountries"
import { SafeUser } from "@/app/types"
import { FC } from "react"
import Heading from "../Heading/Heading"
import Image from "next/image"
import HeartButton from "../HeartButton"

interface ListingHeadProps {
  title: string
  locationValue: string
  imageSrc: string
  id: string
  currentUser?: SafeUser | null
}

const ListingHead: FC<ListingHeadProps> = ({
  title,
  locationValue,
  imageSrc,
  id,
  currentUser
}) => {
  const { getByValue } = useCountries()
  const location = getByValue(locationValue)


  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <div
        className="
          w-full
          h-[70vh]
          overflow-hidden
          rounded-xl
          relative
        "
      >
        <Image fill src={imageSrc} alt="Image" className="object-cover w-full" />
        <div className="absolute top-5 right-5">
          <HeartButton 
            listingId={id}
            currentUser={currentUser}
          />
        </div>
      </div>
    </>
  )
}

export default ListingHead