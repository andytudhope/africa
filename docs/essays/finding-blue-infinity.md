---
title: Finding Blue Infinity
description:
image: essays/img/de_sign.png
---

# Finding Blue Infinity

## Preparing the Ground

I've been passing time in the stream of life teaching people about [giving](https://kernel.community/en/learn/module-7/giving/#sacrifice-scarcity). It's a good way to live.

In the link above, I make a case for "smart contracts as ceremonial transactional space." This is quite literally the word used by many people, most often when creating the correct initial conditions for their protocols: [Aztec](https://medium.com/aztec-protocol/aztec-how-the-ceremony-works-5c23a54e2dd9) and the [Powers of Tau](https://www.zfnd.org/blog/conclusion-of-powers-of-tau/) being just two examples.

More broadly, ceremonies and ritual invoke in us a sense of the sacred, which is really just "something more than me". I'm not a cryptographer, though, so how can I go about creating my own little ceremonial space on these new, decentralised [time machines](https://kernel.community/en/learn/module-3/time/#media-environments)? 

I thought about this as I walked down an empty beach and considered the recent boom in non-fungible tokens on Ethereum. I have never combined my poetry and any "blockchain" technology because of this very simple insight from Muriel Rukeyser, which I love:

> “But there is one kind of knowledge — infinitely precious, time-resistant more than monuments, here to be passed between the generations in any way it may be: never to be used. And that is poetry.”

This same essential idea can be found throughout the Qur'an, most prominently - because nothing is a coincidence - in Surah Ash-Shu'ara (The Poets), see [26:127](https://quran.com/26/127), [145](https://quran.com/26/145), [164](https://quran.com/26/164), [180-1](https://quran.com/26/180-181), but also in many other places, like [6:90](https://quran.com/6/90).

I will never sell a poem, because I do not write them for reward. I write them _as_ reward. That is, the simple act of writing poetry is already reward enough for me. Therefore, it never made sense to do anything on chain, as I'm just not interested in making money from poems.

But, as I walked down that empty beach and thought about our last speaker in Kernel Block III - [Britt Harris](https://en.wikipedia.org/wiki/Thomas_Britton_Harris_IV) - and his question "What will you do when you have more than enough?", I had a moment of insight.

What if I could use NFTs to grant responsibility for each chapter to someone I love and respect? That way, they could always change what appears in that chapter and the "found" versions of The Blue Book could extend indefinitely, limited only by the innate creative capacity of each guardian. Which is the same as saying, the kinds of versions we can find together are limitless.

## Readying the Library

Before telling you how the ceremony unfolded, we must speak about this word "found". What on earth does it mean to "find" a book? Well, it's all to do with a Jorge Luis Borges short story and an internet friend of mine called Jonathan Basile. Jonathan, the same man who tweeted [this timeless insight](https://twitter.com/jonothingEB/status/1358481358042103810), actually built the infinite library Borges wrote about in “The Library of Babel”.

There are some caveats to this, but the [libraryofbabel.info](https://libraryofbabel.info) is made up of all the characters in the Latin alphabet, plus a space, a comma and a period. Each line contains 80 characters, each page contains 40 lines, each book contains 410 pages, and books are arranged on shelves, which are grouped in volumes, which are placed against the walls of hexagons, just as Borges described it in his original short story.

This means that every thing it is possible to write in 3200 characters using the Latin alphabet **already exists** in the library. One does not write something; one remembers it, puts the text into the library's seach function, and is reminded of where it already was. Go and try it yourself. Take that poem or diary entry or dream you once wrote and never showed anyone and try not fall out your chair when you discover it was already in there.

When thinking about creative ways to engage people going through Kernel, I decided to write some ["koans"](https://kernel.community/en/koans/): cryptic little treasure hunts through the library that were based on the content in each module. You really had to understand what was being taught each week to find your way through the whole koan and win the NFT gift at the end of them. While I was doing this, I got quite excited by the effect the constraints of the medium had on my writing and began writing a bunch of other stuff, which I then put aside and promptly forgot about.

## The Ceremony

It was this "other stuff" which came back to me as I envisioned having NFTs which could be given away to people I love that would grant them the ability to change a chapter in the fifth, final, and infinite peace of The Blue Book. I knew I could find all this "other stuff" in the library, gather all the links to each library page into one page on my site, and present it as a chapter. No problems there. The issue is: **how to use NFTs to manage what gets displayed on a website?**

And, the truth is, it turns out to be simple.

1. I used [Holly Grimm's](https://github.com/Dynamiculture/neurapunks-contract) wonderful Neurapunks NFT contract - which comes with full instructions for any interested developers.
2. I adapted it to let [Guardians update](https://github.com/andytudhope/finding-the-blue-book/blob/main/contracts/ERC721Tradable.sol#L68) the `tokenURI` which stores the metadata for each NFT.
3. I use this contract to mint Guardian NFTs and give them to people I love.
4. I set the `external_url` in the metadata of those NFTs to an Arweave page where I have uploaded the html file.
5. I use the OpenseaAPI and a tiny bit of jQuery to fetch the metadata associated with each NFT, query the `external_url` and replace the html content on each chapter page with whatever comes back. It currently takes [14 lines of code](https://github.com/andytudhope/finding-the-blue-book/blob/gh-pages/assets/js/main.js) to do this.
6. Guardians are therefore entirely in control of what gets displayed for their chapter and can change it by using the `updateTokenURI` method in the [Guardians.sol contract](https://etherscan.io/address/0xeB3fC95B74C79C2c3469188A72df2c2399D752AB#writeContract).

As you can see from the links above, everything is free and open source and always will be. Please take this, improve on it, and do more creative things if you feel inspired.

## Finding Blue Infinity

You can find the first version of this peace of The Blue Book [here](http://finding.thebluebook.co.za).

There are many more chapters to write, and the library never ends. I'll pretend to end this here by turning to another favourite poet of mine, [Lisel Mueller](https://www.poetryfoundation.org/poems/52577/monet-refuses-the-operation-56d231289e6db):

>  To paint the speed of light!  
Our weighted shapes, these verticals,  
burn to mix with air  
and change our bones, skin, clothes  
to gases.  Doctor,  
if only you could see  
how heaven pulls earth into its arms  
and how infinitely the heart expands  
to claim this world, blue vapor without end.  