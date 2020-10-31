const nacl = require('libsodium-wrappers');
const Encryptor =  require('./Encryptor');
const Decryptor = require('./Decryptor');

// secureSession - peer - server should be instantiated
// peer should have a public key -- out of keypair
// public key of peer should be retrievable
// public key of peer should not be changeable
// peer should have private hidden key
// private key of peer should not be changeable

// otherPeer - client should be instantiated
// public key of peer and otherPeer should be different
// parties should be able to encrypt
// should be able to create ciphertext
// should be able to decrypt ciphertext
// should be tamperproof
// should be able to send-receive messages

    const secureSessionPeer = async(securePeer = null) => {  
        // begin add
        await nacl.ready;
        const secureSessionPeer = {};
        const {publicKey, privateKey} = nacl.crypto_box_keypair();
        // end add
        secureSessionPeer.publicKey = publicKey;    // given 
        // begin add
        // ...
        const peer = {};
        
        // end add
        secureSessionPeer.connector = async function(otherPeer, keyFn){    // given  - added parameters
        // begin add
        
            //----secureSessionPeer.peer = otherPeer;
            //----const key = keyFn(publicKey, privateKey, otherPeer.publicKey);
            // end add
            secureSessionPeer.Decryptor = await Decryptor(key.sharedRx);    // given
            secureSessionPeer.Encryptor = await Encryptor(key.sharedTx);    // given
            // begin add
            // ...
            otherPeer.Decryptor = await Decryptor(key.sharedRx);    
            otherPeer.Encryptor = await Encryptor(key.sharedTx);             
            // ...
            // const peerCiphertext = secureSessionPeer.Encryptor.encrypt(msg, nonce);
            // const peerNonce = nacl.randombytes_buf(nacl.crypto_secretbox_NONCEBYTES);
            // const otherPeerCiphertext = secureSessionPeer.other.Encryptor.encrypt(msg, nonce); 
            // const otherPeerNonce =  nacl.randombytes_buf(nacl.crypto_secretbox_NONCEBYTES);
            // end add
            secureSessionPeer.encrypt = function(msg){    // given 
                const nonce = nacl.randombytes_buf(nacl.crypto_secretbox_NONCEBYTES);  // given
                const ciphertext = secureSessionPeer.Encryptor.encrypt(msg, nonce);  // given
                return {nonce, ciphertext};  // given
            }
            secureSessionPeer.decrypt = function(msg, nonce){  // given
                return secureSessionPeer.Decryptor.decrypt(msg, nonce);    // given
            }   
            // begin add            
             secureSessionPeer.send = function(msg){
                secureSessionPeer.peer.message = secureSessionPeer.encrypt(msg);
             }
            secureSessionPeer.receive = function(){
                return secureSessionPeer.decrypt(secureSessionPeer.message.ciphertext, secureSessionPeer.message.nonce);
            }
            // ...
            otherPeer.send = function(otherPeerMsg){  //  ??
                otherPeer.message = secureSessionPeer.encrypt(otherPeerMsg);  // ??
             }
            otherPeer.receive = function(){  //  ??
                return otherPeer.decrypt(otherPeer.message.ciphertext, otherPeer.message.nonce);  //  ??
            }
            // end add
    
        }
        const otherPeer = {}
        //-----const {publicKey, privateKey} = nacl.crypto_box_keypair();
        otherPeer.publicKey = publicKey;

           return Object.freeze(secureSessionPeer, {  // given - render object secureSessionPeer immutable
            publicKey: publicKey, // given
            // decryptor: ,     // given - to be completed??
            decrypt: Decryptor.decrypt,   // secureSessionPeer.decrypt,     // given - completed
            encrypt: Encryptor.encrypt,  // secureSessionPeer.encrypt,     // given - completed
            // encryptor: ,      // given - to be completed??  
            send: secureSessionPeer.send,        
            receive: secureSessionPeer.receive
        });
    };
    module.exports = secureSessionPeer;  // given