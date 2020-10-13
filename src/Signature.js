const nacl = require('libsodium-wrappers');

module.exports = async () => {   // msg / signedMsg ???
    await nacl.ready

    //const {verifyingKey, privateKey} = nacl.crypto_sign_keypair();
    const {publicKey, privateKey} = nacl.crypto_sign_keypair();

    return Object.freeze({
                    //// verifyingKey aka public key
        verifyingKey: publicKey, sign: msg => {    //  msg()
        //// verifyingKey, sign: () => {  // 'expect' & verifyingKey in both tests
            // return nacl.crypto_sign_keypair(signedMsg, verifyingKey)
            // return nacl.crypto_sign_open(signedMsg, verifyingKey)
            // return nacl.crypto_sign_open(signedMsg, privateKey)
            //return nacl.crypto_sign(msg, verifyingKey)
            return nacl.crypto_sign(msg, privateKey)
        /*},   
        sign: () => {  // (msg)
            return nacl.crypto_sign(msg, verifyingKey)  // privateKey) // signedMsg
        */
        }
    })
}
//  https://libsodium.gitbook.io/doc/public-key_cryptography/public-key_signatures
//const nacl = require('libsodium-wrappers');
//const opslimit = nacl.crypto_pwhash_OPSLIMIT_MIN
//const memlimit = nacl.crypto_pwhash_MEMLIMIT_MIN

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