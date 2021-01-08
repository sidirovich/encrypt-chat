// @ts-ignore
import * as cryptico from 'cryptico'; 
// The length of the RSA key, in bits.
const Bits = 1024; 

export interface RsaKeys {
    rsaPrivateKey: string;
    rsaPublicKey: string;
}

interface Encryption {
    status: string;
    cipher: string;
    plaintext?: string;
    signature?: string;
}

export const generateRSA = (salt: string): RsaKeys => {
    const rsaPrivateKey = cryptico.generateRSAKey(salt, Bits);
    const rsaPublicKey = cryptico.publicKeyString(rsaPrivateKey);
    return {
        rsaPrivateKey,
        rsaPublicKey
    }
}

export const encryptRSA = (publicKey: string, message: string): string | undefined => {
    let encryptionResult = cryptico.encrypt(message, publicKey) as Encryption;
    return encryptionResult.status === 'success' ? encryptionResult.cipher : undefined;
}

export const decryptRSA = (privateKey: string, message: string): string | undefined => {
    let decryptionResult = cryptico.decrypt(message, privateKey) as Encryption;
    console.log(decryptionResult);
    return decryptionResult.status === 'success' && decryptionResult.plaintext ? decryptionResult.plaintext : undefined;
}
