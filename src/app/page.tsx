import Contact from "@/app/contact";
import * as openpgp from 'openpgp';
import {requireEnv} from "@/utils/env";

async function generateMailContent(content: string) {
    'use server';
    const publicKey = await openpgp.readKey({armoredKey: requireEnv('PUBLIC_KEY')})
    const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: content}),
        encryptionKeys: publicKey
    })
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
        <main className="min-h-full bg-background">
            <Contact handleSubmit={createMail} />
        </main>
    )
}
