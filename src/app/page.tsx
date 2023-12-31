import Contact from "@/app/contact";
import * as openpgp from 'openpgp';
import {requireEnv} from "@/utils/env";

async function generateMailContent(content: string) {
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

async function createMail(encryptedContent: string) {
    'use server';
    const mailTo = requireEnv('MAIL_TO');
    const subject = encodeURIComponent('Contact: Encrypted Message');
    const body = encodeURIComponent(`Following the encrypted message you've created: \n\n${encryptedContent}`);

    return `mailto:${mailTo}?subject=${subject}&body=${body}`;
}

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-50 dark:bg-gray-900">
            <Contact handleSubmit={createMail} />
        </main>
    )
}
