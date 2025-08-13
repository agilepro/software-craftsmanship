#  Security Absolutism is the Enemy of Security Improvement

Security is an important topic and everyone knows it.  This post is about a curious social behavior around implementing security procedures that often works against incremental improvement of security.

## The Basic Scenario

Imagine that you are considering a step to improve security and there are three options:  Option A is what you have today, and is the least secure.  Option B is better than A, and option C is better than B.  These are not independent of implementation costs.  Option A costs zero, since you already have it, but B costs a little, and C costs a lot.  

In planning meetings, I have found that there is always someone who will take the “Security Absolutist” position:  “We have to go with option C because with option B you can break in by doing XYZ”   The problem comes when C is expensive, while B is very inexpensive.  Or when XYZ is highly unlikely.  The development team may not be able to implement C immediately, and may be delayed for many years, while B could be done immediately.  The security absolutist will skip and forgo the modest security implementation, to hold out for the better one, even if it means waiting a few years for it.

## A Specific Example

Recently I was in discussion with a development team about a product which currently has no license key at all, and consequently the software product (which is expensive and quite specialized) can be copied without control.  All participants agreed that a license key is necessary, but two options were presented.  

Option B was an encrypted license key and some code that if placed in the product could verify the validity of the license.  A server to create licenses had already been set up and fully functional.  The cost of implementing option B was very low: just include the existing code in the product. 

Option C was included all the aspects of option B, but also included a provision to encrypt or otherwise obfuscate the code to deter hackers getting around the check.  This capability had not been developed, there were a couple of different technical options, and would probably take 6 to 12 months to develop.  

For about six months the sales and product management teams had been requesting that development implement option B, because it was immediately available and would solve a real problem, but they were delaying, waiting for a better solution expected to be more than one year away.  The question before us was: do we implement option B today, or wait another year for option C?  

There was, as always seems to be the case, one person arguing vociferously that we must have the code obfuscation “otherwise a hacker can simply decompile the code, make a change, and reconstruct the product without the license check and copy the product.”  

While this argument is true, the odd thing about it is that with Option A, what we have today, the product can be readily copied without hacking it.  Very few people actually hack the code.  While it is possible to hack the code, it is obviously far less likely to happen than the casual copying that happens today.  It makes complete sense to implement option B today, and then option C when it is ready.

## Considerations

Security seems to be a special topic with regard to the desire for perfectionism. I have noted the same thing in the support for HTTPS in browsers in my post called “[The Anti-SSL Conspiracy](http://social-biz.org/2011/10/16/the-anti-ssl-conspiracy/)” where option B is a self-signed server, and option C is a server signed by a certificate authority.  Option B is free and easy, while option C is costly and not possible in some situations.  Browsers however are constructed to give a scary warning when encountering option B, even though it is far more secure than option A which is no SSL.  It is clear there are people who argue: you can't implement option B because if you do, somebody might do XYZ and fool you into accessing the wrong site.  Completely ignoring the fact that with option A you can do this without any trouble as well. 

It seems that incremental security is somehow uncomfortable.  Option B is not as secure as option C, however we seem unable as humans to properly assess the risk involved in each option.  Having a flaw, no matter how unlikely, drives the discussion away from an incrementally better mid-term solution.  

Analogy: it is as if someone was arguing: there is no point in putting your money in your pocket, because a pickpocket is able to get it out of your pocket.  That is true, a pickpocket can steal the money from your pocket, but that is better than leaving the money lying about or holding it in your hand. A pick pocket is far less likely than the chance of losing the money because you are carrying it in your hands all the time.  We don't stop using pockets simply because pickpockets exist somewhere in the world.  

When you read the above paragraph, did you find yourself thinking about all the situations where you decided not to store money in a pocket?  That time you went exploring something similar to the bizarre in Delhi or Baghdad?  We all know situations that it was wise to take extra precautions.  However, when you got home you went back to the old routines.  We don't plan our lives around the _most extreme situations_.  Yet software security discussions often focus exclusively on the most extreme and unlikely situation – even when a much more likely threat is present today.

## Consider Incremental

In most software situations an incremental approach is the best because it allows you to get some benefit immediately, and you can always continue on to the better solution later.  The desire to hold back and implement security only for the most extreme situation gets in the way of resolving much more common – and much more likely – problems.  

Security absolutism is the enemy of security improvement.  
 

This entry was posted in [Design](https://agiletribe.purplehillsbooks.com/category/design/) and tagged [design](https://agiletribe.purplehillsbooks.com/tag/design/), [security](https://agiletribe.purplehillsbooks.com/tag/security/). Bookmark the [permalink](https://agiletribe.purplehillsbooks.com/2014/04/09/security-absolutism-is-the-enemy-of-security-improvement/ "Permalink to Security Absolutism is the Enemy of Security Improvement").