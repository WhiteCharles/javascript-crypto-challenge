const nacl = require('libsodium-wrappers');  // _sodium
// const Encryptor = require('../src/Encryptor.js')

//nonce = nacl.randombytes_buf(nacl.crypto_secretbox_NONCEBYTES)
////let msg, ciphertext, nonce, key, decryptor

////  beforeAll(async () => {
////    await nacl.ready
////    key = nacl.crypto_secretbox_keygen()  
    //decryptor = await Decryptor(key)
////  })

////beforeEach(() => {
////    msg = "text to be encrypted"  // nacl.randombytes_buf(1024)
////    nonce = nacl.randombytes_buf(nacl.crypto_secretbox_NONCEBYTES)
////    ciphertext = nacl.crypto_secretbox_easy(msg, nonce, key) 
////  })
// export an empty function

// encrypt and authenticate
// ciphertext = nacl.crypto_secretbox(msg,nonce,key)  // m is message, n is nonce, k is secret key
// if(key == null)
  // throw 'no key';
 module.exports = (key) => {   // need decryption key
  if(key == null)   // check presence of key
    throw 'no key';  // to match 'no key'
  nacl.ready
        return Object.freeze({
        //if(key == null)
                //throw 'no key';
          decrypt: (ciphertext, nonce) => {  // both arguments need defined
              //ciphertext, nonce
              //if(key == null)
              //  throw 'no key';
              //if(msg == null){
              //    throw 'no message to encrypt';

              //}else{
                //   return nacl.crypto_secretbox_open_easy(ciphertext, nonce, msg)
                return nacl.crypto_secretbox_open_easy(ciphertext, nonce, key) // decrypt;
              //}//else{
               //   return nacl.crypto_secretbox_open_easy(ciphertext, nonce, msg)  //nacl.crypto_secretbox_open_easy(ciphertext,nonce, key);  
              //}
              //if(msg == decryptor.decrypt(ciphertext, nonce, msg)){
              //  return true
              
              //}
          }
      });
 }
//module.exports.decrypt = async function decrypt(ciphertext, nonce){

// module.exports.setKey = async function setKey(newKey){
//     decryptorWithoutkey = newKey;
// }

// module.exports.decrypt = async function decrypt(ciphertext, nonce){
//     if(decryptorWithoutkey == null){
//         throw 'no key defined';
//     }else{
//         return sodium.crypto_secretbox_open_easy(ciphertext, nonce, key);
//     }
// }