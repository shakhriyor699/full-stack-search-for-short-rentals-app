'use client'
import axios from "axios"
import { AiFillGithub } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useCallback, useState } from "react"
import {
  FieldValues,
  SubmitHandler,
  useForm
} from 'react-hook-form';
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import Modal from "./Modal"
import Heading from "../Heading/Heading"
import Input from "../inputs/Input"
import toast from "react-hot-toast"
import Button from "../Button"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"


const LoginModal = () => {
  const registerModal = useRegisterModal()
  const loginModal = useLoginModal()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  // const session = useSession()

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true)


    const result = await signIn('credentials', {
      ...data,
      redirect: false
    })

    if (result?.ok) {
      toast.success('Logged in successfully')
      router.refresh()
      loginModal.onClose()
      // console.log(session);

    }

    if (result?.error) {
      toast.error(result.error)
    }

    setIsLoading(false)
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title='Welcome back'
        subtitle='Login to your account!'
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  )

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
      <div
        className="
          text-neutral-500
          text-center
          mt-4
          font-light
        "
      >
        <div className="flex items-center justify-center gap-2">
          <div>
            Already have an account?
          </div>
          <div
            onClick={registerModal.onClose}
            className="
            text-neutral-800
            cursor-pointer
            hover:underline
          ">
            Log In
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      title="Login"
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  )
}

export default LoginModal