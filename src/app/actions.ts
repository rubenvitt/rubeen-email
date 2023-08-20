"use server"

import {requireEnv} from "@/utils/env";
import * as openpgp from "openpgp";

export async function generateMailContent(content: string) {
    'use server';
    console.log('public key', requireEnv('PUBLIC_KEY'))
    const publicKey = await openpgp.readKey({armoredKey: requireEnv('PUBLIC_KEY')})
    const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: content}),
        encryptionKeys: publicKey
    })
    console.log("generated message", encrypted)
    return encrypted
}

export async function createMail(encryptedContent: string) {
    'use server';
    const mailTo = requireEnv('MAIL_TO');
    const subject = encodeURIComponent('Contact: Encrypted Message');
    const body = encodeURIComponent(`Following the encrypted message you've created: \n\n${encryptedContent}`);

    return `mailto:${mailTo}?subject=${subject}&body=${body}`;
}