import { useCreateComment, useCreateReplies } from "@/hooks/useComment"
import { useState, useEffect} from "react"
import { useForm } from "react-hook-form"
import { createCommentInput, createCommentSchema, createPostSchema, CreatePostInput} from "@/schema/validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { MAX_MEDIA_UPLOAD } from "@/schema/validator"
import { Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { Input } from "../ui/input"
import { Spinner } from "../ui/spinner"
import { uploadFiles } from "@/lib/api/upload"
import { MediaPost } from "../mediaPost"
import { file } from "zod"
import { ImageIcon } from "@phosphor-icons/react"

export const CreateCommentCard = ({commentType, id}: {commentType: "postComment" | "replyComment", id: number}) => {
    const {createComment, isPending: isCommentPending} = useCreateComment()
    const {createReply, isPending: isReplyPending} = useCreateReplies()
    const [disablePost, setDisablePost] = useState(true)
    const [files, setFiles] = useState<File[]>([])

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
        let mediaUrl : string[] = []
        if (files.length > 0) {
            mediaUrl = await uploadFiles(files)
        }
        
        if (commentType === "postComment") {
            createComment({
                comment:{
                    text:data.text,
                    media:mediaUrl,
                    postId: id
                },
                postId: id
            })
        }else {
            createReply({
                comment: {
                    text: data.text,
                    media: mediaUrl,
                    commentId: id
                },
                commentId: id
            })
        }
        setFiles([])
        form.reset()
    }

    return (
    <div className="px-4 py-2 border-t border-b border-t-neutral-800">
        <form id="form-post" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
            <Controller
                name="text"
                control={form.control}
                render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="border-none">
                    
                    <Textarea
                    {...field}
                    id="form-text"
                    aria-invalid={fieldState.invalid}
                    placeholder="Post your Reply"
                    className="min-h-24 w-full resize-none border-0 bg-transparent p-1 text-base leading-7 text-neutral-100 placeholder:text-neutral-500 focus-visible:ring-0 sm:text-xl"
                    />
                
                    {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]}/>
                    )}
                </Field>
                )}
            />
            <div>
                {files.length > 0 ? (<MediaPost media={files.map(f => URL.createObjectURL(f))}/>): null}
            </div>
            <div className="flex justify-between gap-1">
            <Controller 
                name="media"
                control={form.control}
                render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid} className="w-10 py-2">
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
            type="submit" form="form-post" disabled={disablePost || isCommentPending || isReplyPending}
            className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-800 shadow-lg shadow-neutral-600/50 transition-all hover:bg-neutral-200 disabled:cursor-not-allowed disabled:bg-neutral-100/50"
            size={"lg"}
            >
            {(isCommentPending || isReplyPending) && (<Spinner data-icon="inline-start" />)}
            {(isCommentPending || isReplyPending) ? "Uploading...." : "Post"}
            
            </Button>
            </div>
        </form>
    </div>
    )
}