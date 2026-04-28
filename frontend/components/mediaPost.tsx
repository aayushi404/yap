import Image from "next/image"
export const MediaPost = ({media}: {media:string[]}) => {
    return (
        <div className="aspect-video grid gap-1 overflow-hidden rounded-xl mx-auto border border-neutral-500 w-full">
                    {media.length === 1 && (
                        <div className="relative w-full h-full">
                            <Image
                                src={media[0]}
                                alt=""
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        </div>
                    )}

                    {media.length === 2 && (
                        <div className="grid grid-cols-2">
                        {media.map((img, idx) => (
                            <div key={idx} className="relative w-full h-full">
                            <Image
                                src={img}
                                alt=""
                                fill
                                unoptimized
                                className="object-cover"
                            />
                            </div>
                        ))}
                        </div>
                    )}

                    {media.length === 3 && (
                        <div className="grid grid-cols-2 grid-rows-2">
                        <div className="relative row-span-2">
                            <Image
                            src={media[0]}
                            alt=""
                            fill
                            unoptimized
                            className="object-cover"
                            />
                        </div>

                        {media.slice(1).map((img, idx) => (
                            <div key={idx} className="relative w-full h-full">
                            <Image
                                src={img}
                                alt=""
                                fill
                                unoptimized
                                className="object-cover"
                            />
                            </div>
                        ))}
                        </div>
                    )}
                    {media.length === 4 && (
                        <div className="grid grid-cols-2 grid-rows-2">
                            {media.map((img, idx) => (
                                <div key={idx} className="relative w-full h-full">
                                <Image
                                    src={img}
                                    alt=""
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                                </div>
                            ))}
                        </div>
                    )}
        </div>
    )
    
}