"use client"

import * as React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { createPostSchema } from "@/schema/validator"
import type { CreatePostInput } from "@/schema/validator"
import { Input } from "../ui/input"
import { apiClient, api } from "@/lib/api/client"
import { AxiosError } from "axios"


export function CreatePost() {
    const [diablePost, setDisablePost] = useState(true)
  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema as any),
    defaultValues: {
      text: "",
      media: []
    },
  })

  async function onSubmit(data: CreatePostInput) {
    try {
      await api.post("/post", data)
      toast.success("Post created sucessfully!!")
    } catch (err) {
      console.log(err)
      if (err instanceof AxiosError) {
        const err_msg = err.response?.data.error as string
        console.log(err_msg)
        toast.error(err_msg)
      }
    }
  }

  return (
    <Card className="w-full sm:max-w-md">

      <CardContent>
        <form id="form-post" onSubmit={form.handleSubmit(onSubmit)} onChange={() => form.getValues("text") === ""? setDisablePost(true): setDisablePost(false)}>
          <FieldGroup>
            <Controller
              name="text"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  
                  <Textarea
                    {...field}
                    id="form-text"
                    aria-invalid={fieldState.invalid}
                    placeholder="What's Happening?"
                    className="min-h-30"
                  />
                 
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller 
                name="media"
                control={form.control}
                render={({field, fieldState}) => (
                    <Input 
                    {...field}
                    id="form-media"
                    type="file"
                    />
                )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="submit" form="form-post" disabled={diablePost}>
            Post
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
