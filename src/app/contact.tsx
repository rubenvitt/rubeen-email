'use client';
import React, {useEffect, useRef, useState} from "react";
import {generateMailContent} from "@/app/actions";
import colors from "tailwindcss/colors";

interface Props {
    handleSubmit: (s: string) => Promise<string>
}

export default function Contact({handleSubmit}: Props) {
    useEffect(() => {
        const setThemeColor = (color: string) => {
            let themeColorMeta = document.querySelector('meta[name="theme-color"]');

            if (!themeColorMeta) {
                themeColorMeta = document.createElement('meta');
                // @ts-ignore
                themeColorMeta.name = 'theme-color';
                document.head.appendChild(themeColorMeta);
            }

            // @ts-ignore
            themeColorMeta.content = color;
        };

        const updateThemeColor = (e: any) => {
            if (e.matches) {
                setThemeColor(colors.gray['900']);
            } else {
                setThemeColor(colors.gray['50']);
            }
        };

        const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        darkModeMediaQuery.addEventListener('change', updateThemeColor);
        updateThemeColor(darkModeMediaQuery);

        return () => {
            darkModeMediaQuery.removeEventListener('change', updateThemeColor);
        };
    }, []);

    const [content, setContent] = useState<string>('Hey Ruben,\n\n')
    const [encrypted, setEncrypted] = useState<string>()
    const [href, setHref] = useState<string>()
    const copyEncryptedButton = useRef<HTMLButtonElement>(null);

    return (
        <div className="relative isolate bg-gray-50 dark:bg-gray-900">
            <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
                <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
                    <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
                        <div
                            className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-white/5 lg:w-1/2">
                            <svg
                                className="absolute inset-0 h-full w-full stroke-gray-200 dark:stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
                                aria-hidden="true"
                            >
                                <defs>
                                    <pattern
                                        id="54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2"
                                        width={200}
                                        height={200}
                                        x="100%"
                                        y={-1}
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path d="M130 200V.5M.5 .5H200" fill="none"/>
                                    </pattern>
                                </defs>
                                <svg x="100%" y={-1}
                                     className="overflow-visible dark:fill-gray-800/20 fill-gray-100/20">
                                    <path d="M-470.5 0h201v201h-201Z" strokeWidth={0}/>
                                </svg>
                                <rect width="100%" height="100%" strokeWidth={0}
                                      fill="url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)"/>
                            </svg>
                            <div
                                className="absolute -left-56 top-[calc(100%-13rem)] transform-gpu blur-3xl lg:left-[max(-14rem,calc(100%-59rem))] lg:top-[calc(50%-7rem)]"
                                aria-hidden="true"
                            >
                                <div
                                    className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-[#80caff] to-[#4f46e5] opacity-20"
                                    style={{
                                        clipPath:
                                            'polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)',
                                    }}
                                />
                            </div>
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Get in
                            touch</h2>
                        <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300">
                            If you like to send me an mail, you may use this form.
                            Just enter the text you want me to receive, click <i>generate</i> and you are getting an
                            encrypted version of the text ready to send with your mail app.<br/>
                            No worries, I will be able to decrypt this text and going to respond with gpg encrypted
                            mail, if you send me a link to your key.
                        </p>
                    </div>
                </div>
                {href ? <div className="mt-8 flex items-center text-gray-900 dark:text-white">
                        <div className="flex flex-col items-center mx-auto gap-6">
                            <p className="text-lg text-center leading-8 dark:text-gray-300 text-gray-700">
                                Your message was encrypted and is ready to be sent.<br/> Just click on the following link &
                                send the
                                mail.
                            </p>
                            <a
                                href={href}
                                className="text-white mx-auto rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm dark:hover:bg-indigo-400 hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Send encrypted mail
                            </a>
                            <button
                                ref={copyEncryptedButton}
                                onClick={async () => {
                                    await navigator.clipboard.writeText(encrypted as string)
                                    copyEncryptedButton.current!!.textContent = 'Copied!'
                                }}
                                className="text-white mx-auto rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm dark:hover:bg-indigo-400 hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                            >
                                Copy the encrypted text
                            </button>
                            <p className="text-lg text-center leading-8 dark:text-gray-300 text-gray-700">Or copy the
                                following text & send it
                                to me</p>
                            <textarea
                                value={encrypted}
                                name="message"
                                id="message"
                                rows={10}
                                className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 bg-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    : <form onSubmit={async (event) => {
                        event.preventDefault()
                        const encryptedContent = await generateMailContent(content) as string
                        setEncrypted(encryptedContent)
                        handleSubmit(encryptedContent).then((result) => {
                            setHref(result)
                        })
                    }} method="POST" className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
                        <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label htmlFor="message"
                                           className="block text-sm font-semibold leading-6 dark:text-white text-gray-900">
                                        Message
                                    </label>
                                    <div className="mt-2.5">
                  <textarea
                      value={content}
                      onChange={(event) => setContent(event.target.value)}
                      name="message"
                      id="message"
                      rows={10}
                      className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 dark:text-white text-gray-900 shadow-sm ring-1 ring-inset dark:ring-white/10 ring-gray-900/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                      defaultValue={''}
                  />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button
                                    type="submit"
                                    className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 dark:hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    Send message
                                </button>
                            </div>
                        </div>
                    </form>
                }
            </div>
        </div>
    )
}
