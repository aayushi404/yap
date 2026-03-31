"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

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
    const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080"
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
    <div className="flex m-auto justify-center items-center h-screen border">
    <Card className="w-full sm:max-w-md text-xl">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>
          Enter your credentials to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-username">
                    Username
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-username"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your username"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-password">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    autoComplete="off"
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
        <Field>
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="login-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
    </div>
  )
}
