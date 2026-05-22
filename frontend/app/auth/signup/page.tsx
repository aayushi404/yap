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

import { LoginInput, SignupInput, signupSchema } from "@/schema/validator"
import axios, { AxiosError } from "axios"
import { useRouter } from "next/navigation"

export default function SignupForm() {
  const router = useRouter()
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema as any),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
  })

  async function onSubmit(data: SignupInput) {
  
    const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080"
    try {
      await axios.post(`${BACKEND_URL}/auth/signup`, data)
      toast.success("Signup Successfull!!")
      router.push("/login")
      
    } catch (error)  {
      console.log(error)
      if (error instanceof AxiosError) {
        console.log(error.response?.data.error)
        toast.error(error.response?.data.error)
      }
    }
  }

  return (
    <div className="flex mx-auto justify-center h-screen items-center">
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Sign up to get started with our platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="signup-form" onSubmit={form.handleSubmit(onSubmit)}>
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
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-email">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="your@example.com"
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
                    placeholder="Create a strong password"
                    autoComplete="off"
                    type="password"
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
          <Button type="submit" form="signup-form">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
    </div>
  )
}