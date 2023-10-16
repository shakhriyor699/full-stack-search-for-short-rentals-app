'use client'

import useCountries from "@/app/hooks/useCountries"
import { SafeUser } from "@/app/types"
import { FC } from "react"
import Heading from "../Heading/Heading"
import Image from "next/image"

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
          h-[6-vh]
          overflow-hidden
          rounded-xl
          relative
        "
      >
        <Image fill src={imageSrc} alt="" />
      </div>
    </>
  )
}

export default ListingHead