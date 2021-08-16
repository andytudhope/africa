---
title: Governing Gracefully
description: Governance mechanisms that distribute funds _by virtue of how they work_ will trump those that attempt to distribute funds as an outcome of their work.
image: essays/img/dialogue.png
---

# Governing Gracefully

> **tl;dr** - governance mechanisms that distribute funds _by virtue of how they work_ will trump those that attempt to distribute funds as an outcome of their work.

Blockchains make it possible to [fuse financial value with any speech act](https://kernel.community/en/learn/module-2/money-speech/#the-expanded-view). When I vote on something I care about, I can simultaneously send money along with my ‘word’ of support or rejection. This represents a literal step function in how we communicate what is valuable.

Therefore, the idea that we should allocate “votes” to those who own governance tokens, but not require those tokens to move when being voted with is pernicious and destructive. Tools like Tally and Snapshot, which disassemble this foundational aspect of our new media - fusing money and speech - can lead us to one place only: a hyper capitalist hellscape, where more power is concentrated in the hands of fewer people, who are less regulated.

![Consensus through Dialogue](./img/dialogue.png)

<div markdown="1" class="center-quote small-text">
Where we actually want to end up.
</div>

## Some History

I wrote the [DApp curation mechanism](https://our.status.im/discover-a-brave-new-curve/) for Status, [dap.ps](https://dap.ps). It’s very simple: the more tokens you lock in a contract, the higher you rank, with one caveat. The more you pay to rank, the cheaper it is for others to vote on your content. This means users have to pay to vote: when I upvote, the money is also locked in the contract and added to the ranking; when I downvote, the money is sent straight back to the DApp owner and subtracted from their ranking.

At first blush, it may seem strange, especially since SNT is a MiniMe token, a standard designed specifically so people could vote without having to lock their tokens (a common pattern in the early days). There are two common issues people have with my design:

1. Doesn’t this just give _more_ power to those who already have resources?
2. Users won’t pay for anything online: that is what web 2 has conditioned us to expect.

The answer to (1) is a simple “no”. People with lots of resources already have power. The maths in the contract ensures in a transparent and verifiable way that the more power you already have, the easier it is for those without power to voice a meaningful (and measurable!) opinion on your ranked content. On a long enough timeline, this actually creates more level playing fields as a result of **how** and **where** the money in this system is programmed to flow.

The answer to (2) is a bit harder: tokens represent a world of digital [abundance](https://quran.com/108), especially those used to govern digital goods. We are going to live in a world where there are billions of different tokens, each with a supply in the billions. Again, on a long enough timeline, the thing which will make these tokens valuable is not the reputation, or even utility, of the protocol they govern today: it is the viability of their internal economy. A good proxy for this is often the velocity and momentum of money: that is, how fast money changes hands and how far it goes.

## Funded Code Running Consensus

The IETF came up with the notion of “rough consensus and running code” for their governance process in the 1990’s. This is an elegant solution, contextually appropriate to the internet circa 1992. However, despite all its advantages, it still requires a Working Group Chair to make decisions about whether all technical objections have been addressed or not. This simple fact makes it largely inapplicable to blockchain governance.

The critical insight here is that we now have[ running code responsible for maintaining consensus](https://kernel.community/en/learn/module-4/consensus/#funded-code-running-consensus) and, **moreover**, this code fuses economic and political expression. We no longer require a chairperson to decide on one direction in which to work, because we can use our econo-linguistic networks to fund as many different directions as possible, simultaneously.

What I am saying is radical: forget quorum, participation and all the other “nice” social outcomes people are trying to design for with ill-conceived tools that disassemble the single most interesting thing about blockchains by allowing you to vote without spending your tokens. 

Build simple mechanisms. Anyone can create a governance proposal. Proposals must specify the budget they need to do meaningful work. No quorum is necessary: all that is required to begin work is enough “votes”, in the form of tokens, being sent to the project in order to fund work. That is it.

## Be Honest

Participation in blockchain governance at the moment is dismal, so won’t requiring people to pay when voting make this infinitely worse? Yes. But participation is a lousy thing to optimize for. Participation should be an outcome of any political process, not a design goal: and the difference really matters. Let’s take a look at how things currently stand.

Project A launches a “governance” token. They specify in their launch that “Token A has no economic value; it is a governance token used to oversee the Project A ecosystem. It has no claim on financial rights,” even though they know full well - given previous projects like YFI and the decentralized exchange infrastructure which now exists - that it will be traded and that the market will assign an economic value to it.

This brand of dishonesty not only does us all a great metaphysical disservice, it prevents the team from thinking clearly about ways the token could be used creatively. It doesn’t matter how “decentralized” your initial distribution is: what matters in the long term is how the token moves around your self-proclaimed “ecosystem” and what incentives there are to spend it.

If governing the system requires people to spend their tokens, then this becomes the perfect [sink](https://vitalik.ca/general/2017/10/17/moe.html) and the single feature that will ensure a healthy distribution in the long term. It moderates the ecosystem in healthy ways: the token has value only insofar as it is used to fund projects which enhance the ecosystem and _value accrues only as a result of the ways in which the token is spent_. 

This approach forces early investors to spend some of their reserves, rather than just holding power over the protocol indefinitely, or pumping and dumping it at their own convenience.

It also means - and this is critical - that **governance is the means by which distribution of funds happens**. Distributing funds is not the outcome! Exploring [interesting and fertile directions](https://breakingsmart.com/en/season-1/rough-consensus-and-maximal-interestingness/) for the development of mutually beneficial software is the outcome, governance is the means by which funds are allocated to achieve this.

Votes-as-costly-economic-signal also doesn’t preclude having DAO treasuries and innovative helper functions like Quadratic Funding. In fact, it gives them a genuine _raison d’etre_. The DAO treasury can help fund in a quadratic way those projects which stronger, economic community signals suggest are most likely to succeed.

What matters here, again, is your time horizon. Maybe you’ll only end up funding one project a year as a community. So what, though? When your protocol is going to affect our shared state for millenia to come, shouldn’t we be [highly intentional](https://kernel.community/en/learn/module-3/intention/#reflecting-truth) about the kinds of things we build and the nature of the changes to our mutual history they enable?

## On Time

Consider the phrase “time horizon”. The shared state we are constructing today will outlive all of us. It will outlive many, many generations to come. The actual mechanisms which process it - currently the EVM - will likely change, but the state itself is going to continue for a period of time no individual living now can readily conceive. The [Arweave team](https://www.arweave.org/yellow-paper.pdf) are some of the only people I know who really get this idea:

> “This pattern of ‘nesting’ of archives when they are retired is common across human history. An archive of Gopherspace (a ‘knowledge web’, prior to the HTTP-based web) can be found inside the Arweave’s permaweb. Inside the Gopherspace archive, one can find archives of earlier Telnet and bulletin board-based discussion systems. Similarly, much of the Library of Congress is now archived on the web, and indeed many of the books contained within the library are themselves collections of old stories/poetry/technical writing. We anticipate that the post-network future of Arweave’s data preservation will continue in a similar pattern, bolstered by the cryptographic interweaving of all data in the network (true verification of a part requires the presence of the whole), and the incentives in the network to create many replications of its information – most of which will never be deleted, even if the miners themselves are disconnected from the network.” (bottom of page 21)

If your governance token gives special permissions to specific parties, it is likely to fail this very simple test of time. `onlyOwner` or `onlySteward` modifiers suck, not just because of regulatory issues, but because they fundamentally fail to acknowledge and design for the dimension of time along which we are really working.

More broadly, token governance is not an initial value problem. It is more like a boundary value problem, and the boundaries are the incentives people have to use, hold and, **most importantly**, to spend the token. 

MKR is a good example of a healthy token ecosystem, bounded by clear incentives to hold the token strongly coupled to the necessity of participating in governance decisions. If token holders don’t make good decisions about the parameters used to keep the system in check, it may become under-collateralized, and they will be diluted as more MKR is printed. You need both rewards and penalties to build good systems, just as it takes positive and negative feedback loops to ensure viable ecosystems. Critically, the key insight of - for instance - work on Eth2 is that **[penalties matter more](https://kernel.community/en/learn/module-6/serenity/#proving-stake)**.

MKR need not be spent to vote, but they did write some very cool custom code for [Ds-Chief](https://docs.makerdao.com/smart-contract-modules/governance-module/chief-detailed-documentation) that works by locking tokens (so there remains an opportunity cost) into [slates](https://docs.makerdao.com/smart-contract-modules/governance-module/chief-detailed-documentation#3-key-mechanisms-and-concepts). They are [constantly improving it](https://forum.makerdao.com/t/mip26-dssgov-governance-contract-redesign/4589), _and_ they did a tonne of research into different kinds of voting on [their forum](https://forum.makerdao.com/search?q=voting). MakerDAO can implement balanced rewards and penalties more seamlessly given the purely financial nature of DAI. This post is about less financial protocols seeking to govern things like public goods, which cannot be so neatly parameterized on chain.

## The Subtle Knife

What I am really advocating for is more subtle than dualistic penalties and rewards, though. 

We can design token ecosystems where what was previously a “penalty” - i.e. spending your money and therefore decreasing your financial worth - actually becomes the very act which ensures that the tokens you remain with become demonstrably valuable. 

**The penalty is the reward** when we build governance systems that distribute funds by virtue of how they work, rather than as the outcome of their work.

---

### Feedback

Comments on this essay point out that it is unclear how getting token holders to spend their tokens actually redistributes power, and that this approach will effectively silence small token holders.

1. Using tokens as votes does increase the supply if projects need to sell those tokens to fund their work. My sense is that this is balanced somewhat by (a) increased demand for a token with increasingly demonstrated utility and (b) the fact that projects can likely fund a lot of their work with the token itself, as contibutors have strong incentives to hold "equity" in the form of tokens associated with the stuff they're actually working on.
2. Currently early investors often get discounted rates, investing before token sales, and then taking a chunk of tokens below market rates. Forcing them to spend in order for governance to work does redistribute these tokens and - at worst - such investors have to buy them back at market rates, which certainly appears to balance things somewhat to my eye.
3. It's true that this system does not optimise for particpation, because these are not nation states, but voluntary communities. What it does optimise for is collective decision making about the "direction of maximal interestingness" as a function of some internal economy.

Another interesting adaptation could involve sending votes-as-funds directly to projects, governance tokens could be returned to the DAO, which in this case acts as a kind of governance token AMM. It receives tokens on projects' behalf, funds them quadratically in  a stable coin if they reach their specified budget threshold, and then redistributes the governance token to new potential members. This redistribution can happen through the completion of Rabbithole tasks, the funding of educational courses for interested learners, rewards for content and marketing contributions, development bounties, security audits, and any other method currently being experimented with. 

There is much discussion about this in the wider community, which has resulted in [Vitalik publishing his thoughts](https://vitalik.ca/general/2021/08/16/voting3.html). Personally, I think his notion about [votes as buy orders](https://ethresear.ch/t/votes-as-buy-orders-a-new-type-of-hybrid-coin-voting-futarchy/10305) is the most interesting addition to the research he has made so far. My sense is that any reputation, identity or proof-of-humanity scheme is doomed to failure because who you really are cannot be fully captured in any language; even universal, executable ones.