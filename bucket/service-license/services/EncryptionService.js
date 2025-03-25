const crypto = require('crypto');

const algorithm = 'aes256';
const inputEncoding = 'utf8';
const outputEncoding = 'hex';
const ivlength = 16;  // AES blocksize
const keyString="5DAkw6ZhEnQSX7bZbVjPYHxbbK8SlmS8"
const entropy = 8;
const baseText = "fkZqzWGFtgIGgF4ZyKIlVeRFU0JEnM8U";
const stringmap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

module.exports={
  validate:(key)=>{
    let decryptedkey=decode(key);
    let diff = calculateEntropy(decryptedkey,baseText);
    return diff>0 && diff<=entropy;
  },
  generate:()=>{
    let text = (" "+baseText).slice(1);
    text = generateEntropy(text, entropy);
    let data=encode(text);
    return data;
  }
}

let encode=function(input){
  var key = Buffer.from(keyString, 'latin1');
  var iv = crypto.randomBytes(ivlength);
  var cipher = crypto.createCipheriv(algorithm, key, iv);
  var ciphered = cipher.update(input, inputEncoding, outputEncoding);
  ciphered += cipher.final(outputEncoding);
  var ciphertext = iv.toString(outputEncoding) + ':' + ciphered
  return ciphertext;
}

let decode=function(ciphertext){
  var key = Buffer.from(keyString, 'latin1');
  var components = ciphertext.split(':');
  var iv_from_ciphertext = Buffer.from(components.shift(), outputEncoding);
  var decipher = crypto.createDecipheriv(algorithm, key, iv_from_ciphertext);
  var deciphered = decipher.update(components.join(':'), outputEncoding, inputEncoding);
  deciphered += decipher.final(inputEncoding);
  
  return deciphered;
}
let generateEntropy=function(source, entropy){
  let result = (" "+source).slice(1);
  let maxPos = source.length-1;
  let maxPosChar = stringmap.length-1;
  let qtyChange=0;
  while(qtyChange<entropy){
    let pos = randomBetween(0,maxPos);
    let posChar = randomBetween(0,maxPosChar);    

    result=result.substring(0, pos) + stringmap[posChar] + result.substring(pos + 1);

    qtyChange++
  }
  return result;
}
let calculateEntropy=function(key1,key2){
  if(key1.length==key2.length){
    let differentChar = 0;
    for(let i=0; i<key1.length ;i++){
      if(key1[i]!=key2[i])
        differentChar++;
    }
    return differentChar;
  }
  else
    return 100000;
}

let randomBetween = function (min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}