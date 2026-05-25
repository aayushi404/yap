import type { Request, Response } from "express";
import { findUserById, findUserByUsername } from "../services/database.user.js";
import { AppError } from "../utils/appError.js";
import { StatusCodes } from "http-status-codes";
import prisma from "../utils/prismaCient.js";
import type { AuthRequest } from "../utils/request.js";
import type { PostType } from "../schema/apiTypes.js";
import { includes } from "zod";

const getUserPost = async (req: AuthRequest, res: Response) => {
    const username = req.params.username as string
    const cursor = req.query.cursor
    const limit = Number(req.query.limit)

    if (limit > 20 || limit <= 0 ) {
        throw new AppError("Invalid limit value", StatusCodes.BAD_REQUEST)
    }

    const user = await findUserByUsername(username)
    if (!user) {
        throw new AppError("Invalid user Id", StatusCodes.BAD_REQUEST)
    }

    const posts = await prisma.post.findMany({
        where: {
            authorId: user.id
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            author: {
                select: {
                    name: true,
                    username:true,
                    profile: {
                        select: {
                            profileImage:true
                        }
                    }
                }
            },
            likes: {
                select: {
                    userId: true
                }
            }
        },
        take: limit,
        ...(cursor && {
            cursor: {id: Number(cursor)},
            skip: 1
        })
    })
    const result: PostType[] = posts.map(post => {
        return {
            likes: post.likes.length,
            isLikedByMe: post.likes.map(like => like.userId).includes(req.user?.id!),
            author: {
                name: post.author.name,
                username: post.author.username,
                profileImage: post.author.profile? post.author.profile.profileImage : null
            },
            id: post.id,
            createdAt: post.createdAt,
            text: post.text,
            media: post.media,
            authorId: post.authorId
    }})

    const lastPositionCursor = posts.at(-1)?.id
    return res.status(StatusCodes.OK).json({
        posts: result,
        nextCursor: posts.length === limit ? lastPositionCursor : null
    })
   
}

const getUserFollower = async (req: AuthRequest, res: Response) => {
    const username = req.params.username as string
    const user = await findUserByUsername(username)
    if (!user) {
        throw new AppError("Invalid user Id", StatusCodes.BAD_REQUEST)
    }
    const followers = await prisma.follow.findMany({
        where: {
            followingId: user.id
        },
        select: {
            follower: {
                select: {
                    id:true,
                    name: true,
                    username: true,
                    profile: {
                        select: {
                            profileImage: true,
                            bio: true
                        }
                    },
                    followers: {
                    select: {
                        followingId:true
                    }
                    },
                    following: {
                        select: {
                            followerId: true
                        }
                    }
                }
            }}
    })
    const follower = followers.map(f => f.follower)
    const result = follower.map(f => {
        return {
            id: f.id,
            name: f.name,
            username: f.username,
            profileImage: f.profile?.profileImage,
            bio: f.profile?.bio,
            isFollower: f.following.filter(f => f.followerId === req.user?.id).length > 0,
            isFollowing: f.followers.filter(f => f.followingId === req.user?.id).length > 0
        }
    })


    return res.status(StatusCodes.OK).json(result)
}

const getUserFollowing = async (req: AuthRequest, res: Response) => {
    const username = req.params.username as string
    const user = await findUserByUsername(username)
    if (!user) {
        throw new AppError("Invalid user Id", StatusCodes.BAD_REQUEST)
    }
    const followings = await prisma.follow.findMany({
        where: {
            followerId: user.id
        },
        select: {
            following: {
                select: {
                    id: true,
                    name: true,
                    username: true,
                    profile: {
                        select: {
                            profileImage: true,
                            bio: true
                        }
                    },
                    followers: {
                        select: {
                            followingId:true
                        }
                    },
                    following: {
                        select: {
                            followerId: true
                        }
                    },
                }
            }
        }
    })

    const following  = followings.map(f => f.following)
    const result = following.map(f => {
        return {
            id: f.id,
            name: f.name,
            username: f.username,
            profileImage: f.profile?.profileImage,
            bio: f.profile?.bio,
            isFollower: f.following.filter(f => f.followerId === req.user?.id).length > 0,
            isFollowing: f.followers.filter(f => f.followingId === req.user?.id).length > 0
        }
    })

    return res.status(StatusCodes.OK).json(result)
}

const getUserFeed = async (req: AuthRequest, res: Response) => {
    const userFollowing = await prisma.follow.findMany({
        where: {
            followerId: req.user?.id!
        },
        select: {
            followingId: true
        }
    })
    const userFollowingIds = userFollowing.map(d => d.followingId)
    userFollowingIds.push(req.user?.id!)
    const cursor = req.query.cursor
    const limit = Number(req.query.limit)

    if (limit > 20 || limit <= 0 ) {
        throw new AppError("Invalid limit value", StatusCodes.BAD_REQUEST)
    }

    const posts = await prisma.post.findMany({
        where: {
            authorId: {
                in: userFollowingIds
            },
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            author: {
                select: {
                    name: true,
                    username:true,
                    profile: {
                        select: {
                            profileImage:true
                        }
                    }
                }
            },
            likes: {
                select: {
                    userId: true
                }
            }
        },
        take: limit,
        ...(cursor && {
            cursor: {id: Number(cursor)},
            skip: 1
        })
    })

    const result: PostType[] = posts.map(post => {
        return {
            likes: post.likes.length,
            isLikedByMe: post.likes.map(like => like.userId).includes(req.user?.id!),
            author: {
                name: post.author.name,
                username: post.author.username,
                profileImage: post.author.profile? post.author.profile.profileImage : null
            },
            id: post.id,
            createdAt: post.createdAt,
            text: post.text,
            media: post.media,
            authorId: post.authorId
    }})

    const lastPositionCursor = posts.at(-1)?.id
    return res.status(StatusCodes.OK).json({
        posts: result,
        nextCursor: posts.length === limit ? lastPositionCursor : null
    })
}

type userProfile = {
    username: string;
    id: number;
    createdAt: Date;
    _count: {
        following: number;
        posts: number;
        followers: number;
    };
    name: string;
    profile: {
        bio: string | null;
        profileImage: string;
    } | null;
    followers: {
        followingId: number;
    }[];
    following: {
        followerId: number;
    }[];
} | null

type userProfileType = {
    name: string,
    username: string,
    id: number,
    createdAt: Date,
    followersCount: number,
    followingCount: number,
    postCount: number,
    bio: string | null,
    profileImage: string | null,
    isFollowing: boolean,
    isFollower: boolean
}

const fetchProfile = async (req: AuthRequest, res: Response) => {
    const username = req.query.username
    const userId = Number(req.query.userId)

    let user: userProfile | null = null
    if (username) {
        user = await prisma.user.findFirst({
            where: {
                username: username as string
            },
            select: {
                profile: {
                    select: {
                        bio: true,
                        profileImage: true
                    }
                },
                _count: {
                    select: {
                        posts: true,
                        followers: true,
                        following: true
                    }
                },
                followers: {
                    select: {
                        followingId:true
                    }
                },
                following: {
                    select: {
                        followerId: true
                    }
                },
                name: true,
                username: true,
                id: true,
                createdAt: true
            }
        })
    } else if (userId) {
        user = await prisma.user.findFirst({
            where: {
                id: userId
            }, 
            select: {
                profile: {
                    select: {
                        bio: true,
                        profileImage: true
                    }
                },
                _count: {
                    select: {
                        posts: true,
                        followers: true,
                        following: true
                    }
                },
                followers: {
                    select: {
                        followingId: true
                    }
                },
                following: {
                    select: {
                        followerId: true
                    }
                },
                name: true,
                username: true,
                id: true,
                createdAt: true
            }
        })
    }
    if (!user) {
        new AppError("profile not found", StatusCodes.NOT_FOUND)
    }
    console.log(user)
    const result: userProfileType | null = user && {
            name: user.name,
            username: user.username,
            createdAt: user.createdAt,
            id: user.id,
            followersCount: user._count.following,
            followingCount: user._count.followers,
            postCount: user._count.posts,
            bio: user.profile && user.profile.bio,
            profileImage: user.profile && user.profile.profileImage,
            isFollowing: user.followers.filter(f => f.followingId === req.user?.id).length > 0,
            isFollower: user.following.filter(f => f.followerId === req.user?.id).length > 0
        }
    
    return res.status(StatusCodes.OK).json(result)
}

export {getUserFeed, getUserFollower, getUserFollowing, getUserPost, fetchProfile}