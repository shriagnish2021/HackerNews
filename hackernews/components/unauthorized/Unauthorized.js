import Link from 'next/link'
import React from 'react'

export default function Unauthorized() {
    return (
        <div className="w-full border-2 min-h-screen grid place-content-center ">
            <span className="text-center">
                401 | Not Authorized!!
            </span>
            <Link href="/">
                <a className="text-white mt-4 text-center border font-bold bg-blue-600 rounded py-2">
                    Back To Home
                    </a></Link>
        </div>
    )
}
