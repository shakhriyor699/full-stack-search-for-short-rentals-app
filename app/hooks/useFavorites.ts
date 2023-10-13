import axios from "axios";
import { useRouter } from "next/navigation";
import { MouseEvent, useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface IUserFavorite {
  listingId: string
  currentUser?: SafeUser | null
}

const useFavorite = ({ listingId, currentUser }: IUserFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal()

  const hasFavorited = useMemo(() => {
    return currentUser?.favoriteIds?.includes(listingId)
  }, [currentUser, listingId])

  const toggleFavorite = useCallback(async (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    if (!currentUser) {
      return loginModal.onOpen()
    }

    try {
      let req
      if (hasFavorited) {
        req = () => axios.delete(`/api/favorites/${listingId}`)
      } else {
        req = () => axios.post(`/api/favorites/${listingId}`)
      }
      await req()
      router.refresh()
      toast.success('Listing favorited!')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }, [currentUser, loginModal, hasFavorited, listingId, router])

  return {
    hasFavorited,
    toggleFavorite
  }
}

export default useFavorite