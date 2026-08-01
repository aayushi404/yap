"use client"

import * as React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Field, FieldError } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { createPostSchema, MAX_MEDIA_UPLOAD } from "@/schema/validator"
import type { CreatePostInput } from "@/schema/validator"
import { Input } from "../ui/input"
import { useCreatePost } from "@/hooks/usePost"
import { Spinner } from "../ui/spinner"
import { MediaPost } from "../mediaPost"
import { ImageIcon } from "@phosphor-icons/react"

export function CreatePost() {
  const [diablePost, setDisablePost] = useState(true)
  const [files, setFiles] = useState<File[]>([])
  const { createPost, isPending } = useCreatePost()

  const form = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema as any),
    defaultValues: {
      text: "",
      media: [],
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
    <div className="w-full">
      <form id="form-post" onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <Controller
          name="text"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="border-none">
              <Textarea
                {...field}
                id="form-text"
                aria-invalid={fieldState.invalid}
                placeholder="What’s happening?"
                className="min-h-24 w-full resize-none border-0 bg-transparent p-1 text-base leading-7 text-neutral-100 placeholder:text-neutral-500 focus-visible:ring-0 sm:text-xl"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {files.length > 0 ? <div className="">
          <MediaPost media={files.map((file) => URL.createObjectURL(file))} />
        </div> : null}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3">
          <Controller
            name="media"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="w-auto py-0">
                <label
                  htmlFor="form-media"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
                >
                  <ImageIcon height={28} width={28} />
                </label>
                <Input
                  id="form-media"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(event) => {
                    const selectedFiles = Array.from(event.target.files || [])
                    setFiles(selectedFiles)
                    field.onChange(selectedFiles)
                  }}
                  onBlur={field.onBlur}
                  ref={field.ref}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          <Button
            type="submit"
            form="form-post"
            disabled={diablePost || isPending}
            className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-800 shadow-lg shadow-neutral-600/50 transition-all hover:bg-neutral-200 disabled:cursor-not-allowed disabled:bg-neutral-100/50"
            size="lg"
          >
            {isPending && <Spinner data-icon="inline-start" />}
            {isPending ? "Posting..." : "Post"}
          </Button>
        </div>
      </form>
    </div>
  )
}
