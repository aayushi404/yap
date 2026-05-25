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
            onMouseEnter={() => setShowFollowing(false)}
            onMouseLeave={() => setShowFollowing(true)}
        >
            {showFollowing ? (
                <Button>Following</Button>
            ): (
                <Button 
                    variant={"outline"} 
                    className="border border-red-800 text-red-800"
                    onClick={onClick}

                >
                    UnFollow
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
        className="h-10 w-10 rounded-4xl bg-neutral-950 text-neutral-200 hover:bg-neutral-700"
        onClick={onClickHandler}
        >
            <ArrowLeftIcon size={32} />
        </Button>
    )
}

export {UnFollowButton, BackButton}