const nacl = require('libsodium-wrappers');
const Encryptor =  require('./Encryptor.js');
const Decryptor = require('./Decryptor');

module.exports = async() => {
    await nacl.ready;
    const secureSessionPeer = (securePeer = null) => {  // --mod
        const{publicKey, key} = nacl.crypto_sign_keypair();  // key
        secureSessionPeer.publicKey = publicKey;

        //...
        secureSessionPeer.connector = async function(){
            // ...
            secureSessionPeer.decryptor = await Decryptor(key.sharedRx);
            secureSessionPeer.encryptor = await Encryptor(key.sharedTx);
            // ...
            secureSessionPeer.encrypt = function(msg){
                const nonce = nacl.randombytes_buf(nacl.crypto_secretbox_NONCEBYTES);
                const ciphertext = secureSessionPeer.encryptor.encrypt(msg, nonce);
                return {nonce, ciphertext};
            }
            secureSessionPeer.decrypt = function(msg, nonce){
                return secureSessionPeer.decryptor.decrypt(msg, nonce);
            }
            // ...
        }
        
        return Object.freeze({
            publicKey: secureSessionPeer.publicKey,
        // decryptor: ...,  // geexporteerd - nn
        // decrypt: ..,
        // encrypt: encrypt(peerMsg)
        // encryptor: ..., // geexporteerd - nn
        // send: ..., // n
        // receive: ... // n
        });
    }
};