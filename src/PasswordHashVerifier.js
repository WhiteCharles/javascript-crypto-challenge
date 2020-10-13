const nacl = require('libsodium-wrappers');
//const opslimit = nacl.crypto_pwhash_OPSLIMIT_MIN
//const memlimit = nacl.crypto_pwhash_MEMLIMIT_MIN

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
}

// module.exports = (key) => {   
//     if(key == null)   
//       throw 'no key';  
//     nacl.ready
//           return Object.freeze({
          
//             decrypt: (ciphertext, nonce) => {  
//                   return nacl.crypto_secretbox_open_easy(ciphertext, nonce, key) 
                
//             }
//         });
//    }