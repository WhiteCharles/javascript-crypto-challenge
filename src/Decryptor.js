const nacl = require('libsodium-wrappers');  // _sodium

 module.exports = (key) => {   // need decryption key
  if(key == null)   // check presence of key
    throw 'no key';  // to match 'no key'
  nacl.ready
        return Object.freeze({        
          decrypt: (ciphertext, nonce) => {  // both arguments need defined              
                return nacl.crypto_secretbox_open_easy(ciphertext, nonce, key) // decrypt;              
          }
      });
 }
