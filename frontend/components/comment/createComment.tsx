import { useCreateComment } from "@/hooks/useComment"
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

export const CreateCommentCard = ({commentType, id, postId}: {commentType: "postComment" | "replyComment", id: number, postId:number}) => {
    const {createComment, isPending} = useCreateComment()
    const [diablePost, setDisablePost] = useState(true)
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
                postId
            })
        }else {
            createComment({
                comment: {
                    text: data.text,
                    media: mediaUrl,
                    commentId: id
                },
                postId
            })
        }
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
                {files.length > 0 ? (<MediaPost media={files.map(f => URL.createObjectURL(f))}/>): null}
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