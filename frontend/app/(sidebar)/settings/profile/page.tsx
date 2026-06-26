"use client"
import { queryClient } from "@/app/providers"
import Header from "@/components/sidebars/header"
import { useAuthStore } from "@/hooks/auth"
import { userProfile } from "@/lib/api/user"
import { userProfile as userProfileType } from "@/schema/api"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { createTime } from "@/lib/services"
import Link from "next/link"
import { Controller, useForm } from "react-hook-form"
import { updateProfileSchema, updateProfileInput, MAX_MEDIA_UPLOAD } from "@/schema/validator"
import z, { file } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { uploadFiles } from "@/lib/api/upload"
import { api } from "@/lib/api/client"

const Profile = () => {
    const router = useRouter()
    const {username, id} = useAuthStore(state => state.user!)
    const [profile, setProfile] = useState<userProfileType | null>(null)
    const [files, setFiles] = useState<File[]>([])

    const form = useForm<updateProfileInput>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            name: "",
            bio: "",
            profileImage: []
        }
    })

    useEffect(() => {
        if (profile) {
            form.reset({
                name: profile.name ?? "",
                bio: profile.bio ?? "",
                profileImage: []
            })
        }
    }, [profile, form])

    useEffect(() => {
        const fetchProfile = async () => {
            let profile : userProfileType | null = null
            try {
                profile = queryClient.getQueryData(["userProfile", username]) as userProfileType
            } catch (_err) {
                profile = await userProfile(username!)
            }
            setProfile(profile)
        }
        fetchProfile()
    }, [])

    useEffect(() => {
        if (files.length > 1) {
            toast.error("Can't put more than 1 image")
        }
    }, [files])

    const onSubmit = async (data: updateProfileInput) => {
        if (files.length > 0) {
            const mediaUrl = await uploadFiles(files)
        
            await api.post(`/user/profile?userId=${id}`, {
                name: data.name,
                bio: data.bio,
                profileImage: mediaUrl[0]
            })
        }else {

            await api.post(`/user/profile?userId=${id}`, {
                name: data.name,
                bio: data.bio,
                profileImage: profile?.profileImage
            })
        }
    }
    return (
        <>
       {profile && (
        <div className="py-4 border-b">
            <Header onClickHandler={() => router.back()} header={profile.name} subHeader={profile.username}/>
            <form id="updateProfile-form" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="relative">
                <div className="h-60 bg-neutral-600 rounded-2xl"></div>
                <div className="absolute -bottom-1/4 left-5">
                    <div className="size-20 sm:size-35 rounded-full bg-neutral-800">
                            {profile.profileImage && (
                                <Image
                                src={profile.profileImage}
                                alt="appLogo"
                                height={60}
                                width={60}
                                className="fit"
                            />
                            )}
                    </div>
                </div>
            </div>
                <FieldGroup className="mt-20">
                    <Controller 
                        name="profileImage"
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
                    <Controller
                        name="name"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-name">Name</FieldLabel>
                                <Input
                                    {...field}
                                    id="form-name"
                                    autoComplete="off"
                                    className=""
                                    
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                    />

                    <Controller
                        name="bio"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="foem-bio">bio</FieldLabel>
                                <Input 
                                    {...field}
                                    id="form-bio"
                                    autoComplete="off"
                                    className=""
                                    
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]}/>
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
            </form>
            <Field>
                <Button type="submit" form="updateProfile-form">Save</Button>
            </Field>
       </div>
       )}
       
        </>
    )
}

export default Profile