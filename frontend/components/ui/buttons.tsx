"use client"
import React, { useState } from "react"
import { Button } from "./button"
import { ArrowLeftIcon } from "@phosphor-icons/react"

const UnFollowButton = (
    {onClick}:
    {
        onClick: () => void
    }) => {
    const [showFollowing, setShowFollowing] = useState(true)
    return (
        <div
            className="inline-flex"
            onMouseEnter={() => setShowFollowing(false)}
            onMouseLeave={() => setShowFollowing(true)}
        >
            {showFollowing ? (
                <Button
                    type="button"
                    size="sm"
                    className="rounded-full border border-white/10 bg-neutral-900 px-3.5 py-2 text-sm font-medium text-neutral-100 shadow-sm transition-all hover:bg-neutral-800"
                >
                    Following
                </Button>
            ): (
                <Button
                    type="button"
                    variant={"destructive"}
                    size="sm"
                    className="rounded-full border border-red-500/20 bg-red-500/10 px-3.5 py-2 text-sm font-medium text-red-300 shadow-sm transition-all hover:bg-red-500/20"
                    onClick={onClick}
                >
                    Unfollow
                </Button>
            )}
        </div>
    )
}

const BackButton = (
    {onClickHandler}:
    {
        onClickHandler: () => void
    }
) => {
    return (
        <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full border border-white/10 bg-neutral-900/90 text-neutral-100 shadow-sm hover:bg-neutral-800"
            onClick={onClickHandler}
        >
            <ArrowLeftIcon size={20} />
        </Button>
    )
}

export {UnFollowButton, BackButton}