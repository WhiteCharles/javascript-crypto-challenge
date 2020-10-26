const nacl = require('libsodium-wrappers');
const Encryptor =  require('./Encryptor.js');
const Decryptor = require('./Decryptor');

// module.exports = async() => {   /// disapp
//    await nacl.ready;   /// disapp
    const secureSessionPeer = async(securePeer = null) => {  // capitalized to SecureSessionPeer --> const SecureSessionPeer = (securePeer = null) => {  // added 'async' in 'disapp'
        await nacl.ready;
        //const {publicKey, privateKey} = nacl.crypto_box_keypair();
        const secureSessionPeer = {};
        // const peer = nacl.crypto_box_keypair();  /// = {publicKey, privateKey}
        //////***const peer = nacl.crypto_box_keypair();
        //     return peer;
        
        //let peer
        //let pk, sk, rx, tx
        //pk = nacl.crypto_box_PUBLICKEYBYTES
        //sk = nacl.crypto_box_SECRETKEYBYTES
        //peer = nacl.crypto_kx_keypair(pk[nacl.crypto_kx_PUBLICKEYBYTES], sk[nacl.crypto_kx_SECRETKEYBYTES])
        //const peer = {publicKey, privateKey}
        
        //let publicKey = peer.publicKey;
        //peer.publicKey = nacl.crypto_box_PUBLICKEYBYTES();
        //peer.privateKey = nacl.crypto_box_SECRETKEYBYTES();
        //= nacl.crypto_box_keypair()
        /*****let server_pk = nacl.crypto_kx_PUBLICKEYBYTES
        let server_sk = nacl.crypto_box_SECRETKEYBYTES
        const peer = nacl.crypto_kx_keypair(server_pk, server_sk)
        let publicKey = peer.server_pk***** */
        // peer, ie server and client, ie otherPeer each generate keypair
        /*let peer = {publicKey, privateKey}*/// = crypto_kx_keypair(server_pk, server_sk)    // {publicKey, privateKey}
        const {publicKey, privateKey} = nacl.crypto_box_keypair();
        //*peer.publicKey = publicKey
        ////peer.publicKey = publicKey
        /////let otherPeer = crypto_kx_keyPair()
        // peer/server composes message
        /*let message = 'Testing secure session'*/
        // client-otherPeer generates shared keys
        /*let clientKeys = nacl.crypto_kx_client_session_keys(otherPeer.publicKey, otherPeer.privateKey, peer.publicKey)*/
        // peer/server encrypts message using his private key and otherPeer/client's public key
        /*let nonce = nacl.randombytes_buf(nacl.crypto_box_NONCEBYTES)*/
        //msg, nonce, key
        /*let peerCiphertext = Encryptor.encrypt(msg, nonce, otherPeer.publicKey)*/
        ////let peerCiphertext = crypto_box_easy(message, peerNonce, otherPeer.publicKey, peer.privateKey)
        // otherPeer/client decrypts and verifies message using nonce, its private key and server public key
        /*let msg = crypto_box_open_easy(peerCiphertext, nonce, peer.publicKey, otherPeer.privateKey, 'text')*/
        // let peer, nonce // ... add
        /*const{peer_pk} = nacl.crypto_box_PUBLICKEYBYTES();*/ // ... add nacl.crypto_box_PUBLICKEYBYTES()
        // const{peer_sk} = nacl.crypto_box_SECRETKEYBYTES(); // ... add {sk} = nacl.crypto_box_SECRETKEYBYTES()
        // const{peer_rx} = nacl.crypto_kx_SESSIONKEYBYTES(); // ... add
        // const{peer_tx} = nacl.crypto_tx_SESSIONKEYBYTES(); // ... add
        // generate peer's key pair
        // peer = nacl.crypto_kx_keypair(peer_pk, peer_sk);  // ... add {publicKey, key}  nacl.crypto_sign_keypair(pk, sk)
        /*peer.publicKey = nacl.crypto_box_PUBLICKEYBYTES(sk)*/  //peer_pk; // ... add
        //let peer  OTHERPEER          // const{otherPeer_pk} = nacl.crypto_box_PUBLICKEYBYTES(); // ... add nacl.crypto_box_PUBLICKEYBYTES()
        // const{otherPeer_sk} = nacl.crypto_box_SECRETKEYBYTES(); // ... add {sk} = nacl.crypto_box_SECRETKEYBYTES()
        // const{otherPeer_rx} = nacl.crypto_kx_SESSIONKEYBYTES(); // ... add
        // const{otherPeer_tx} = nacl.crypto_tx_SESSIONKEYBYTES(); // ... add
        // generate otherPeer's key pair
        // const otherPeer = nacl.crypto_kx_keypair(otherPeer_pk, otherPeer_sk);  // ... add {publicKey, key}  nacl.crypto_sign_keypair(pk, sk)
        // otherPeer.publicKey = otherPeer_pk; // ... add
        // generate shared keys -- client
        // if(nacl.crypto_kx_client_session_keys(peer_rx, peer_tx, peer_pk, peer_sk, otherPeer_pk) != 0){
        //     return 0;        // }
        // if(nacl.crypto_kx_server_session_keys(otherPeer_pk, peer_sk, peer_pk) != 0){  // otherPeer_rx, otherPeer_tx,  removed parameters
        //     return 0;        // }
        //... disapp add
        secureSessionPeer.publicKey = publicKey;    // given // capitalized to SecureSessionPeer, and following
        //... disapp add
        secureSessionPeer.connector = async function(other, keyFn){    // given          // ... disapp
            //... disapp add
            secureSessionPeer.peer = other;
            const key = keyFn(publicKey, privateKey, other.publicKey);
            secureSessionPeer.Decryptor = await Decryptor(key.sharedRx);    // given//... disapp add  // capitalized to SecureSessionPeer and Decryptor
            secureSessionPeer.encryptor = await Encryptor(key.sharedTx);    // given//... disapp add
            // ... //... begin   key calculation

            // ... //... end

            secureSessionPeer.encrypt = function(msg){    // given//... disapp add
                // peer/server encrypts message using his private key and otherPeer/client's public key
                const nonce = nacl.randombytes_buf(nacl.crypto_secretbox_NONCEBYTES);  // given
                const ciphertext = secureSessionPeer.encryptor.encrypt(msg, nonce);  // given
                return {nonce, ciphertext};  // given
            }
            secureSessionPeer.decrypt = function(msg, nonce){  // given
                return secureSessionPeer.Decryptor.decrypt(msg, nonce);    // given// capitalized to S.. and Decryptor
            }   
             // ...//... begin  disapp add
             secureSessionPeer.send = function(msg){
                secureSessionPeer.peer.message = secureSessionPeer.encrypt(msg);
             }
            secureSessionPeer.receive = function(){
                return secureSessionPeer.decrypt(secureSessionPeer.message.ciphertext, secureSessionPeer.message.nonce);
            }
             // ...//... end  disapp add
        }
           return Object.freeze(secureSessionPeer, {  // given
               //secureSessionPeer: secureSessionPeer,
            //peer : peer, //,   // secureSessionPeer,
            publicKey: publicKey,    // given//  secureSessionPeer.publicKey//,  peer.publicKey
        // -- decryptor: ...,  // geexporteerd - nn
        decrypt: secureSessionPeer.decrypt,/*(ciphertext, nonce) => {  // both arguments need defined              
                return nacl.crypto_secretbox_open_easy(ciphertext, nonce, key) // decrypt;              
            }, */  // function
        // -- encryptor: ..., // geexporteerd - nn
        encrypt: secureSessionPeer.encrypt,/*(msg, nonce) => {
            return nacl.crypto_secretbox_easy(msg, nonce, key)
        }*/  // function                
        send: secureSessionPeer.send, // n        
        receive: secureSessionPeer.receive // n
        });

    };
    module.exports = secureSessionPeer;  // add