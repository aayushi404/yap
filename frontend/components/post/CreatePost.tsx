"use client"

import * as React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import Image from "next/image"
import { useMutation } from "@tanstack/react-query"

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
import { createPostSchema, MAX_MEDIA_UPLOAD } from "@/schema/validator"
import type { CreatePostInput } from "@/schema/validator"
import { Input } from "../ui/input"
import { apiClient, api } from "@/lib/api/client"
import { AxiosError } from "axios"
import { uploadFiles } from "@/lib/api/upload"
import { queryClient } from "@/app/providers"
import { useCreatePost } from "@/hooks/cratePost"
import { Spinner } from "../ui/spinner"


export function CreatePost() {
  const [diablePost, setDisablePost] = useState(true)
  const [files, setFiles] = useState<File[]>([])
  const { createPost, isPending } = useCreatePost()

  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema as any),
    defaultValues: {
      text: "",
      media: []
    },
  })

  const text = form.watch("text")

  useEffect(() => {
    setDisablePost(!text || text.length < 3)
  }, [text])

  useEffect(() => {
    if (files.length > MAX_MEDIA_UPLOAD) {
      toast.error("Too many files!!")
    }
  }, [files])

  async function onSubmit(data: CreatePostInput) {
      createPost({
      text: data.text,
      files: files,
    })
      setFiles([])
      form.reset()

    
  }

  return (
    <div className="sm:w-150 mx-auto mt-1">
        <form id="form-post" onSubmit={form.handleSubmit(onSubmit)} >
            <Controller
              name="text"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="border-none">
                  
                  <Textarea
                    {...field}
                    id="form-text"
                    aria-invalid={fieldState.invalid}
                    placeholder="What's Happening?"
                    className="border-none text-2xl min-h-20"
                  />
                
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}/>
                  )}
                </Field>
              )}
            />
            <div>
              {files.length > 0 ? files.map((file, idx) => (
                <Image 
                  src={URL.createObjectURL(file)}
                  alt=""
                  key={idx}
                  width={600}
                  height={600}
                />
              )) : null}
            </div>
            <div className="flex justify-between gap-1">
            <Controller 
                name="media"
                control={form.control}
                render={({field, fieldState}) => (
                  <Field data-invalid={fieldState.invalid} className="w-10 py-2">
                    <Input 
                      id="form-media"
                      type="file"
                      multiple
                      className="w-8"
                      onChange={(e) => {
                        const selectedFiles = Array.from(e.target.files || [])
                        setFiles(selectedFiles)
                        field.onChange(selectedFiles)
                      }}
                      onBlur={field.onBlur}
                      ref={field.ref}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]}/>
                    )}
                  </Field>
                )}
            />
        
          <Button 
          type="submit" form="form-post" disabled={diablePost || isPending}
          className="rounded-2xl hover:cursor-pointer my-2 w-15"
          size={"lg"}
          >
            {isPending && (<Spinner data-icon="inline-start" />)}
            {isPending ? "Uploading...." : "Post"}
            
          </Button>
          </div>
        </form>
    </div>
  )
}
