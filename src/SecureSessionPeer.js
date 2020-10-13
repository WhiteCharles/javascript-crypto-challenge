const nacl = require('libsodium-wrappers');
/*
module.exports = () => {
    nacl.ready

    return Object.freeze({  // can be instantiated & that cannot be changed ??
        encrypt: () => {}
    })
}
*/
module.exports = () => {
    nacl.ready

    // const {publicKey, privateKey} = nacl.crypto_sign_keypair();
    // const peer = nacl.crypto_sign_keypair(publicKey, privateKey);

    return Object.freeze({  // can be instantiated & that cannot be changed ??
        //encrypt: () => {}
    })
    // TEST BREAKDOWN
    // describe('SecureSessionPeer'
        // can be instantiated --> securesession - expect peer
        // describe('has a public key' --> peer.publicKey
            // that can be retrieved
            // that cannot be changed
        // describe('presumably hides a private key somewhere' --> peer.privateKey
            // but that is being kept secret
            // and cannot be changed
        // describe('connects to another SecureSessionPeer' --> otherPeer
            // resulting in 2 distinct peers with different public keys
                /////--> peer & otherPeer
            // describe('which can encrypt messages'
                // returning a ciphertext and a nonce
                // can be decrypted messages by the other peer
                // cannot be decrypted with the public key
                // are integrity protected
            // can exchange messages
}
/*
module.exports = () => {
    nacl.ready

    return Object.freeze({
          
        verify: (hashedPw, pw) => {  // verify
            //pw = nacl.randombytes_buf(16)
            //hashedPw = nacl.crypto_pwhash_str(pw)  //(pw, opslimit, memlimit)
            //match = hashedPw == pw
            //return match  //verifier.verify(hashedPw, pw).toBeTruthy() 
            // https://libsodium.gitbook.io/doc/password_hashing/default_phfw
            return nacl.crypto_pwhash_str_verify(hashedPw, pw)
        }
    });
}*/