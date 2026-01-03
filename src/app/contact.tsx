'use client';

import React, {useState} from "react";
import {generateMailContent} from "@/app/actions";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {HiOutlineLockClosed, HiOutlineMail, HiOutlineClipboardCopy, HiOutlineCheckCircle, HiOutlineShieldCheck, HiOutlineKey} from "react-icons/hi";
import {FiGithub} from "react-icons/fi";

interface Props {
    handleSubmit: (s: string) => Promise<string>
}

export default function Contact({handleSubmit}: Props) {
    const [content, setContent] = useState<string>('Hey Ruben,\n\n')
    const [encrypted, setEncrypted] = useState<string>()
    const [href, setHref] = useState<string>()
    const [isLoading, setIsLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleEncrypt = async (event: React.FormEvent) => {
        event.preventDefault()
        setIsLoading(true)
        try {
            const encryptedContent = await generateMailContent(content) as string
            setEncrypted(encryptedContent)
            const result = await handleSubmit(encryptedContent)
            setHref(result)
        } finally {
            setIsLoading(false)
        }
    }

    const handleCopy = async () => {
        if (encrypted) {
            await navigator.clipboard.writeText(encrypted)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const handleReset = () => {
        setContent('Hey Ruben,\n\n')
        setEncrypted(undefined)
        setHref(undefined)
        setCopied(false)
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                        <HiOutlineShieldCheck className="w-8 h-8 text-primary" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                        Fullstack Software Engineer &bull; Software Architect
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight mb-4">
                        Hi, I&apos;m Ruben
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Send me an encrypted message using PGP encryption. Your privacy matters.
                    </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <Card className="bg-card/50 backdrop-blur transition-all duration-200 hover:shadow-md hover:scale-[1.02] hover:bg-card">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3 mb-2">
                                <HiOutlineLockClosed className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold">End-to-End Encrypted</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Your message is encrypted before leaving your browser
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 backdrop-blur transition-all duration-200 hover:shadow-md hover:scale-[1.02] hover:bg-card">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3 mb-2">
                                <HiOutlineKey className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold">PGP Standard</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Uses industry-standard OpenPGP encryption
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 backdrop-blur transition-all duration-200 hover:shadow-md hover:scale-[1.02] hover:bg-card">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-3 mb-2">
                                <HiOutlineMail className="w-5 h-5 text-primary" />
                                <h3 className="font-semibold">Easy to Use</h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Simply write your message and click encrypt
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Card */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {href ? (
                                <>
                                    <HiOutlineCheckCircle className="w-6 h-6 text-green-500" />
                                    Message Encrypted Successfully
                                </>
                            ) : (
                                <>
                                    <HiOutlineLockClosed className="w-6 h-6" />
                                    Compose Your Message
                                </>
                            )}
                        </CardTitle>
                        <CardDescription>
                            {href
                                ? "Your message has been encrypted and is ready to send."
                                : "Write your message below. It will be encrypted using my public PGP key."
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {href ? (
                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button asChild className="flex-1">
                                        <a href={href}>
                                            <HiOutlineMail className="w-4 h-4 mr-2" />
                                            Open in Email Client
                                        </a>
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={handleCopy}
                                        className="flex-1"
                                    >
                                        {copied ? (
                                            <>
                                                <HiOutlineCheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                                Copied!
                                            </>
                                        ) : (
                                            <>
                                                <HiOutlineClipboardCopy className="w-4 h-4 mr-2" />
                                                Copy Encrypted Text
                                            </>
                                        )}
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="encrypted">Encrypted Message</Label>
                                    <Textarea
                                        id="encrypted"
                                        value={encrypted}
                                        readOnly
                                        rows={10}
                                        className="font-mono text-xs bg-muted"
                                    />
                                </div>

                                <Button
                                    variant="ghost"
                                    onClick={handleReset}
                                    className="w-full"
                                >
                                    Write Another Message
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleEncrypt} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="message">Your Message</Label>
                                    <Textarea
                                        id="message"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Write your message here..."
                                        rows={10}
                                        required
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading || !content.trim()}
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Encrypting...
                                        </>
                                    ) : (
                                        <>
                                            <HiOutlineLockClosed className="w-4 h-4 mr-2" />
                                            Encrypt & Prepare Email
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </CardContent>
                </Card>

                {/* Footer */}
                <footer className="mt-12 pt-8 border-t border-border">
                    <div className="flex flex-col items-center gap-4">
                        <a
                            href="https://github.com/rubenvitt"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <FiGithub className="w-5 h-5" />
                            <span>github.com/rubenvitt</span>
                        </a>
                        <p className="text-sm text-muted-foreground">
                            Include a link to your public PGP key if you&apos;d like an encrypted response.
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    )
}
