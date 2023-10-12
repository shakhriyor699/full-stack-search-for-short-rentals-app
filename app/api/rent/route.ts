import { NextResponse } from "next/server";
import prisma from "@/app/libs/prisma";
import { getCurrentUser } from "@/app/actions/getCurrentUser";

export const POST = async (req: Request) => {
  const currentUser = await getCurrentUser();

  // console.log(currentUser.id);
  

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();
  const {
    title,
    description,
    imageSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price
  } = body

  Object.keys(body).forEach((value) => {
    if(!body[value]) {
      return NextResponse.error();
    }
  })

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id
    }
  })

  return NextResponse.json(listing);
}