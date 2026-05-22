"use client"
import React, { useState } from "react"
import { Button } from "./button"

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

export {UnFollowButton}