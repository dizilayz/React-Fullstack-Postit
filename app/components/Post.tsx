'use client'

import Image from "next/image"
import Link from "next/link"

export default function Post({ avatar, name, title, id }) {
    return (
        <div className="bg-white p-8 my-8">
            <div className="flex items-center gap-2" >
                <Image
                    className="rounded-full"
                    height={32}
                    width={32}
                    src={avatar}
                    alt="avatar"
                />
                <h3 className="font-bold text-gray-700" >{name}</h3>
            </div>
            <div className="my-8" >
                <p className="break-all">{title}</p>
            </div>
            <div>
                <Link href={`/posts/${id}`} >
                    <p className="text-sm font-bold text-gray-700" >Comments</p>
                </Link>
            </div>
        </div>
    )
}