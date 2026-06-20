"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import AppLogo from "@/public/app.svg"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

import { LoginInput, loginSchema } from "@/schema/validator"
import axios, { AxiosError } from "axios"
import { useAuthStore } from "@/hooks/auth"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const {login} = useAuthStore((state) => state)
  const router = useRouter()

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema as any),
    defaultValues: {
      username: "",
     // email: "",
      password: ""
    },
  })

  async function onSubmit(data: LoginInput) {
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"
    try {
      if (BACKEND_URL) {
        const response = await axios.post(`${BACKEND_URL}/auth/login`, data)
        const payload: {
          token: string,
          user: {
            id: number,
            name: string,
            username: string,
            profileImage: string
          }
        } = response.data

        login(payload.token, payload.user)
        localStorage.setItem("token", payload.token)
        toast.success("Login Successfull!!")
        router.push('/')
      }
    } catch (error) {
      console.log(error)
      if (error instanceof AxiosError) {
        console.log(error.response?.data.error)
        toast.error(error.response?.data.error)
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-neutral-950">
      <div className="flex w-full max-w-6xl items-center justify-center lg:justify-between gap-10">
      <div className="hidden lg:flex flex-1 justify-center">
        <Image src={AppLogo} alt="applogo" height={800} width={800}/>
      </div>
      
      <Card className="w-full max-w-md bg-neutral-900 border border-neutral-800 shadow-2xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl sm:text-4xl font-bold">Let's Yap</CardTitle>
          <CardDescription className="text-sm sm:text-base text-neutral-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FieldGroup>
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-username" className="text-sm text-neutral-300">
                      Username
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-username"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your username"
                      autoComplete="off"
                      className="h-10 bg-neutral-800 border-neutral-700 focus:ring-2 focus:ring-white/20"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]}/>
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-password" className="text-sm text-neutral-300">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-password"
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter your password"
                      autoComplete="off"
                      className="h-10 bg-neutral-800 border-neutral-700 focus:ring-2 focus:ring-white/20"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field className="">
            <Button type="submit" form="login-form" className="w-full h-10 text-sm font-medium">
              Submit
            </Button>
          <div className="text-sm sm:text-base text-neutral-400">
            New on our platform? <Link href={"/auth/signup"} className="hover:underline text-neutral-300">Create an account</Link>
          </div>
          </Field>
        </CardFooter>
      </Card>
      </div>
    </div>
  )
}
