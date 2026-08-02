"use client"
import { queryClient } from "@/app/providers"
import Header from "@/components/sidebars/header"
import { useAuthStore } from "@/hooks/auth"
import { userProfile } from "@/lib/api/user"
import { userProfile as userProfileType } from "@/schema/api"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Controller, useForm } from "react-hook-form"
import { updateProfileSchema, updateProfileInput} from "@/schema/validator"
import { zodResolver } from "@hookform/resolvers/zod"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { uploadFiles } from "@/lib/api/upload"
import { ImageIcon } from "@phosphor-icons/react/dist/icons/Image"
import {useProfileUpdate} from "@/hooks/useProfile"

const Profile = () => {
    const router = useRouter()
    const {user, setUser} = useAuthStore(state => state)
    const [profile, setProfile] = useState<userProfileType | null>(null)
    const [files, setFiles] = useState<File[]>([])
    const {updateProfile, isPending, isSuccess} = useProfileUpdate()

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
                profile = queryClient.getQueryData(["userProfile", user?.username]) as userProfileType
            } catch (_err) {
                profile = await userProfile(user?.username!)
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

    useEffect(() => {
        if (isSuccess) {
            setUser({id: user?.id!, name: form.getValues("name"), username: user?.username!, profileImage: files.length > 0 ? URL.createObjectURL(files[0]) : profile?.profileImage ?? ""})
            toast.success("Profile updated successfully")
            router.push(`/${user?.username}`)
        }
    }, [isSuccess])

    const onSubmit = async (data: updateProfileInput) => {
        if (files.length > 0) {
            const mediaUrl = await uploadFiles(files)
            updateProfile({data: {...data, profileImage: mediaUrl[0]}, id: user?.id!, username: user?.username!})
        }else {

            updateProfile({data: {...data, profileImage: profile?.profileImage}, id: user?.id!, username: user?.username!})
        }
    }
    return (
        <>
       {profile && (
        <div className="border-b">
            <Header onClickHandler={() => router.back()} header={profile.name} subHeader={profile.username}/>
            <form id="updateProfile-form" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="mx-auto w-full max-w-3xl overflow-hidden  bg-neutral-950/80 shadow-2xl shadow-black/20 backdrop-blur">
                        <div className="relative h-40 overflow-hidden sm:h-52">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_40%)]" />
                            <div className="absolute inset-0 bg-linear-to-br from-neutral-800 via-neutral-900 to-neutral-950" />
                            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                        </div>

                        <div className="relative px-4 pb-5 pt-14 sm:px-6 sm:pb-6 sm:pt-16">
                            <div className="absolute -top-12 left-4 sm:-top-14 sm:left-6">
                                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-4 border-neutral-950 bg-neutral-800 shadow-2xl shadow-black/30 sm:h-28 sm:w-28">
                                    {profile?.profileImage ? (
                                        <Image
                                            src={profile.profileImage}
                                            alt={`${profile.name} avatar`}
                                            height={112}
                                            width={112}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-lg font-semibold text-neutral-200">
                                            {profile.name?.charAt(0)?.toUpperCase() || "U"}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                <FieldGroup className="px-2">
                    <Controller 
                        name="profileImage"
                        control={form.control}
                        render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid} className="w-fit py-0">
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
                    <Controller
                        name="name"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-name" className="font-semibold text-lg">Name</FieldLabel>
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
                                <FieldLabel htmlFor="form-bio" className="font-semibold text-lg">
                                    Bio
                                </FieldLabel>
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
                </div>
            </form>
            <Field className="flex justify-end px-4 py-4 w-fit">
                <Button type="submit" form="updateProfile-form" disabled={isPending}
                className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-800 shadow-lg shadow-neutral-600/50 transition-all hover:bg-neutral-200 disabled:cursor-not-allowed disabled:bg-neutral-100/50" size="lg"
                >Save</Button>
            </Field>
       </div>
       )}
       
        </>
    )
}

export default Profile