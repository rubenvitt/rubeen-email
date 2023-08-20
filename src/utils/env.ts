export function requireEnv(name: string, defaultValue?: string): string {
    if (typeof process.env[name] === 'undefined') {
        if (typeof defaultValue !== 'undefined') {
            return defaultValue;
        }
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return (process.env[name] as string).replace(/\\n/g, '\n');
}