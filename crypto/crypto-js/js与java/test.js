const CryptoJS = require('crypto-js')
var encrypted = CryptoJS.enc.Base64.parse('3Q7r1iqtaRuJCo6QHA9/GhkTmbl4VkitV9ZsD3K2VB7LuBNg4enkJUA1cF8cHyovUH2N/jFz3kbq0QsHfPByCg==');
var key = CryptoJS.enc.Base64.parse('u/Gu5posvwDsXUnV5Zaq4g==');
var iv = CryptoJS.enc.Base64.parse('5D9r9ZVzEYYgha93/aUK2w==');
var content = CryptoJS.AES.decrypt({ ciphertext: encrypted }, key, { mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7, iv: iv})
console.log(content);
console.log(CryptoJS.enc.Utf8.stringify(content));
// 下面对应java加密代码
/* 
import org.apache.commons.codec.binary.Base64;
import org.junit.Test;

import javax.crypto.*;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.AlgorithmParameterSpec;

public class AESTest {
    @Test
    public void test2() throws NoSuchPaddingException, NoSuchAlgorithmException, InvalidAlgorithmParameterException, InvalidKeyException, UnsupportedEncodingException, IllegalBlockSizeException, BadPaddingException {
        String plainText = "Hello, World! This is a Java/Javascript AES test.";
        SecretKey key = new SecretKeySpec(
                Base64.decodeBase64("u/Gu5posvwDsXUnV5Zaq4g=="), "AES");
        AlgorithmParameterSpec iv = new IvParameterSpec(
                Base64.decodeBase64("5D9r9ZVzEYYgha93/aUK2w=="));
        Cipher cipher = Cipher.getInstance("AES/CBC/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, key, iv);
        System.out.println(Base64.encodeBase64String(cipher.doFinal(
                plainText.getBytes("UTF-8"))));
    }
}

*/