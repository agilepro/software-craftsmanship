#  Working Around Java's SSL Limitations

The Java run-time environment (JVM) is able to support connections to other servers using SSL, but it has this very inconvenient behavior of refusing to connect to self-signed servers.  A self signed server has the public key necessary to ensure private communications, but does not have a certificate that proves who it is.  In the default mode of operation, when connecting to such a server, Java SSL subsystem with throw an exception and prevent all communications.  But there are good reasons why a service that you want to communicate with privately may not have a certificate, and this post tells you how to accomplish this.

I discuss on a post titled “[The Anti-SSL Conspiracy](http://social-biz.org/2011/10/16/the-anti-ssl-conspiracy/)” how ridiculous this is.  We can think in terms of three levels of security:

*   **Level A** – no encryption, no verification
*   **Level B** – encryption, no verification
*   **Level C** – encryption and verification

Level A is normal HTTP over a non secure socket.  Level B is better than that, because the traffic is encrypted, even though there is no verification of the certificate at the other end.  Finally Level C is best of these, because you have both privacy, as well as some assurance of who you are connecting with. 

The designers of the Java subsystem for communications have essentially decided that Level A is acceptable, and that Level C is acceptable, but Level B is prevented by the throwing of an exception.  This makes no sense.  Level B is freely available to anyone who wished to take the time to set it up, and it offers privacy not allowed in Level A.  Level C requires a certificate that must be purchased by a signing authority.  It must be locked to a particular DNS name, and there are other constraints.  All of this adds to the cost which is not trivial.  The cost of getting and maintaining a certificate can be greater than the total cost of hosting a web site without it.  (Compare $5/month rates for HTTP sites, with $15/month or more for HTTPS sites.)  

While it is expensive to get a certificate for an otherwise free server, there is a strong argument to make for making all Internet traffic go over SSL.  The more that traffic is encrypted, the safer personal data is, and the harder it is for terrorists and criminals to gather data. I am not a privacy freak, but it really makes sense to have servers talking to each other in a safe way.  

While Level B security is better in all situations than Level A security, one difficulty is that it is hard to write Java software to talk to a self-signed server.  instead it will throw the following:

*   javax.net.ssl.SSLException: Not trusted server certificate

## Disabling Certificate Validation on Java Libraries

The following class will set the defaults such that no certificates are validated, and you are allowed to proceed to make a SSL connection and exchange data in a private way.

```java
package org.workcast.streams;
import java.security.cert.X509Certificate;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
/**
* Copyright Keith D Swenson, Creative Commons Share-Alike
* Feel free to use this code where you like, but keep this copyright
* statement in it, and understand that there is no guarantee to be
* suitable for any purpose, so read it carefully.
*/
public class SSLPatch
{
    /**
    * Java proides a standard "trust manager" interface.  This trust manager
    * essentially disables the rejection of certificates by trusting anyone and everyone.
    */
    public static X509TrustManager getDummyTrustManager() {
        return new X509TrustManager() {
            public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                return null;
            }
            public void checkClientTrusted(X509Certificate[] certs, String authType) {
            }
            public void checkServerTrusted(X509Certificate[] certs, String authType) {
            }
        };
    }
    /**
    * Returns a hostname verifiers that always returns true, always positively verifies a host.
    */
    public static HostnameVerifier getAllHostVerifier() {
        return new HostnameVerifier() {
            public boolean verify(String hostname, SSLSession session) {
                return true;
            }
        };
    }
    /**
    * a call to disableSSLCertValidation will disable certificate validation
    * for SSL connection made after this call.   This is installed as the
    * default in the JVM for future calls.  Returns the SSLContext in case
    * you need it for something else.
    */
    public static SSLContext disableSSLCertValidation() throws Exception {
          // Create a trust manager that does not validate certificate chains
        TrustManager[] tma = new TrustManager[] {getDummyTrustManager()};
        // Install the all-trusting trust manager
        SSLContext sc = SSLContext.getInstance("SSL");
        sc.init(null, tma, new java.security.SecureRandom());
        HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
        // Install the all-trusting host verifier
        HttpsURLConnection.setDefaultHostnameVerifier(getAllHostVerifier());
        return sc;
     }
}
```


Simply call disableSSLCertValidation() anytime before making an SSL connection.  This is very heavy handed.  Because the library throws an exception, you have to decided to do this BEFORE you know whether the certificate is valid or not.  A better way would be to allow the calling program to simply access a method that told it whether the certificate was valid or not. Then the calling program could decide one way or another whether it wanted to continue or not. But it would take a lot more work to do this.  Maybe I will get around to it some day, but for now, this disables all validation.

## Disabling Certificate Validation on Apache HttpClient Libraries.

The Apache HTTP client libraries do not use the same mechanism as the JVM provides, but they have the same annoying default behavior of throwing an exception if the certificate is missing or invalid.

```java
package org.workcast.streams;
import java.security.cert.X509Certificate;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.conn.ClientConnectionManager;
import org.apache.http.conn.scheme.Scheme;
import org.apache.http.conn.scheme.SchemeRegistry;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.apache.http.impl.client.DefaultHttpClient;
import org.workcast.streams.SSLPatch;
/**
* Copyright Keith D Swenson, Creative Commons Share-Alike
* Feel free to use this code where you like, but keep this copyright
* statement in it, and understand that there is no guarantee to be
* suitable for any purpose, so read it carefully.
*/
public class HttpClientHelper {
    public static HttpClient wrapClient(HttpClient initial) throws Exception {
        SSLContext sc = SSLContext.getInstance("TLS");
        sc.init(null, new TrustManager[]{SSLPatch.getDummyTrustManager()}, null);
        SSLSocketFactory ssf = new SSLSocketFactory(sc);
        ssf.setHostnameVerifier(SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
        ClientConnectionManager ccm = initial.getConnectionManager();
        SchemeRegistry sr = ccm.getSchemeRegistry();
        sr.register(new Scheme("https", ssf, 443));
        return new DefaultHttpClient(ccm, initial.getParams());
    }
}
```


I could not find any way to changing the default, but instead after you create a HttpClient you have to pass it to this to construct one that will allow connections to self-signed servers.

## Configuring OpenID4Java to Work on Level B

I have been using the OpenID4Java library to authenticate users of my systems.  Again, you might think that in the important world of authentication, you would want complete assurance of the trust of the site you are connecting to. The fact is however that many OpenID sites do not use SSL at all.  We know that getting to Level C can be expensive.  Level B woudl still be better than Level A in all situations, and so with this in mind I figured out how to disable certificate verification on OpenID4Java.

```java
package org.workcast.streams;
import java.security.cert.X509Certificate;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import org.apache.http.conn.ssl.SSLSocketFactory;
import org.openid4java.consumer.ConsumerManager;
import org.openid4java.consumer.InMemoryConsumerAssociationStore;
import org.openid4java.consumer.InMemoryNonceVerifier;
import org.openid4java.consumer.VerificationResult;
import org.openid4java.discovery.Discovery;
import org.openid4java.discovery.DiscoveryInformation;
import org.openid4java.discovery.html.HtmlResolver;
import org.openid4java.discovery.yadis.YadisResolver;
import org.openid4java.message.AuthRequest;
import org.openid4java.server.RealmVerifierFactory;
import org.openid4java.util.HttpFetcher;
import org.openid4java.util.HttpFetcherFactory;
import org.openid4java.util.HttpRequestOptions;
import org.openid4java.util.HttpResponse;
/**
* Copyright Keith D Swenson, Creative Commons Share-Alike
* Feel free to use this code where you like, but keep this copyright
* statement in it, and understand that there is no guarantee to be
* suitable for any purpose, so read it carefully.
*/
public class OpenIdHelper {
    /**
    * Constructs a new openID4Java Consumer Manager object, properly
    * initialized so that it does not validate certificates.
    */
    public static ConsumerManager newConsumerManager() throws Exception {
        // Install the all-trusting trust manager SSL Context
        SSLContext sc = SSLPatch.disableSSLCertValidation();
        HttpFetcherFactory hff = new HttpFetcherFactory(sc,
              SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER);
        YadisResolver yr = new YadisResolver(hff);
        RealmVerifierFactory rvf = new RealmVerifierFactory(yr);
        Discovery d = new Discovery(new HtmlResolver(hff),yr,
              Discovery.getXriResolver());
        ConsumerManager manager = new ConsumerManager(rvf, d, hff);
        manager.setAssociations(new InMemoryConsumerAssociationStore());
        manager.setNonceVerifier(new InMemoryNonceVerifier(5000));
        return manager;
    }
}
```


With OpenID4Java, the trick is to get a properly initialized ConsumerManager that will not throw an exception when you attempt to connect to a self-signed server.  This is done with the same SSLContext that was created for the JVM, but in OpenID4Java you must explicitly pass this in as the constructor of the various objects.