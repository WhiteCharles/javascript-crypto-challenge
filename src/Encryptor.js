const nacl = require('libsodium-wrappers');

//let msg = "testing";
// let nonce = nacl.randombytes_buf(nacl.crypto_secretbox_NONCEBYTES)
// let key = nacl.crypto_secretbox_keygen()

module.exports = async(key) => {
    await nacl.ready
    //let msg = "testing";
    return Object.freeze({
        //let msg = "testing"
        encrypt: (msg, nonce) => {
            return nacl.crypto_secretbox_easy(msg, nonce, key)  // encrypt - generates ciphertext
        }
    })
}