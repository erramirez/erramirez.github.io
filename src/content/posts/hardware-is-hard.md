---
title: Hardware is Hard
description: I’ve been thinking a lot lately about stuff I’ve written, but is lost in other ecosystems. I got a Quora notification this evening and it reminded me of…
pubDate: '2014-03-18'
kind: post
tags: []
archive: true
---

*I’ve been thinking a lot lately about stuff I’ve written, but is lost in other ecosystems. I got a Quora notification this evening and it reminded me of something I wrote on that site over two years ago in response to the question, “How hard is it for a startup to design hardware like Jawbone UP, Nike+ Fuelband, Fitbit, etc.?” I really like my answer, but I’m biased (and “me” is a small sample size). I’ve reproduced it here with a few edits and added updates via footnotes. Let me know what you think.*

There is a lot of room to improve upon the design, UI/UX, and hardware of physical activity and tracking devices. For instance, I noticed you didn’t mention [Basis](mybasis.com). They are bringing a great new device to market this year that will integrate optically sensed HR, galvanic skin response, and accelerometery in a nicely designed watch.[^1]

When you talk about designing hardware you have to think not just about what is possible now, but also what will be possible over the next five to ten years and begin designing products that take advantage of new [MEMs](http://en.wikipedia.org/wiki/Microelectromechanical_systems) technology. For instance, there is a lot of great R&D coming out of MIT that is supporting the creation of [even smaller sensors](http://web.mit.edu/newsoffice/2010/accelerometer-0416.html).

Another design element to think of is functionality. Not in the sense of does the device work, but rather, how it works around your normal everyday life. My fiancé was considering all three you mention (FitBit, Nike+ Fuelband, UP) and decided to go with the FitBit because she didn’t want to be tied to wearing something on her wrist every day that isn’t a watch (she’s old school).[^2] With the new class of open-source wearable microprocessors ([LillyPad](http://arduino.cc/en/Main/arduinoBoardLilyPad), [Flora](http://www.adafruit.com/category/92), etc.) I don’t see why in the next few years we can’t have our trackers embedded in our clothing.[^3]

This is getting long, but I’ll bring up another hardware design that I see really separating the industry - wireless connectivity. I don’t mean bluetooth, I mean true send the data to cloud, kind of connectivity. Qualcomm is pioneering this initiative with their new [Qualcomm Life](http://www.qualcommlife.com/) venture and their proprietary machine-to-machine systems. There will be a day soon, if not this year then next, where your FitBit or Nike+ Fuelband or whatever YOU make has a similar chipset to what you find in the Kindle 3G. This is a huge design challenge as battery usage will be altered dramatically, but again nothing that is insurmountable.[^4]

Lastly, I think (and I’m a bit biased as I’m a behavioral scientist)[^5], is that the technology community tends to overly focus on the hardware rather than the user experience design. Yes, it has to work well as Jawbone showed us. Yes, it has look good - Jawbone showed us that too. But, it also has to be tied to an engaging and worthwhile experience. The importance of good design cannot be overstated. Look at what Aza Raskin is doing over at [Massive Health](http://massivehealth.com/) and their Eatery app.[^6] Design will win every time. If you’re really thinking about building hardware make sure you find an Aza clone (good luck with that) and spend as much if not more time creating, testing, and iterating on the user experience. People will use something because it’s cool and different, but the world will use the thing that works, the thing that makes them forget they’re interacting with 1’s and 0’s (you only need to look at the iPhone for confirmation about the importance of experience design).

Oh, and I guess to really answer your question. It is very, very, very hard to make physical products that work. That doesn’t mean it isn’t worth it. Fitbit is a great example. They went through many trials after their huge showing at Techcrunch50 in 2008. They missed launch dates, they had some product failures, but they persevered. [Now look](http://allthingsd.com/20120124/amid-increasing-competition-fitbit-scores-12-million-in-funding/) at them.[^7]

I guess in the end you might be asking the wrong question. Of course it is hard, building cars is hard, doing astrophysics is hard, playing the cello is hard. But here we are with hundreds of cars to choose from, new PhDs staring at the stars every night, and parents enrolling their children in music lessons. Hard will never go away, but being better is always within reach.

---

As always, comments are welcome. This post is available [on Github](https://github.com/erramirez/erramirez.github.io/blob/master/_posts/2014-03-19-Hardware-Is-Hard.md) if that’s your style, and [Medium](https://medium.com/ernesto-ramirez/38132ec3ac12) if you like that platform. Free free to connect with me on [twitter](https://twitter.com/eramirez) or [email](mailto:er.ramirez@gmail.com).

---


[^1]: The Basis B1 watch/band has since been released. I was lucky enough to get one and have enjoyed wearing it, especially after the new update. I’m still waiting on an API….
[^2]: She originally bought a Fitbit One, but lost it pretty quickly. Her sister then bought her a Fitbit Zip that she’s been wearing it every day for over a year. She loves it.
[^3]: This was an easy prediction to make. We’ve already seen some great entries in the wearable sensing clothing from [Hexoskin](http://www.hexoskin.com/en), [OMsignal](http://www.omsignal.com/), and others.
[^4]: Maybe I’m wrong about this given the current ecosystem of Bluetooth Low Energy devices, but this still kind of irks me. I originally wrote this when I was a heavy Garmin Forerunner user. I went on runs without my phone, which I don’t do now, and wanted my GPS watch to automagically upload that data. I still want that, but I’m in a shrinking minority and I’m probably wrong.
[^5]: I was still full on in my PhD program and this is the most pretentious phrase in this piece. I’m leaving it in to remind me that I am not a behavioral scientist. I am merely an observer.
[^6]: No surprise that Jawbone acquired Massive Health and has made some amazing strides in their mobile app design.
[^7]: Seriously look at them. They have a huge market share in the activity tracking sector: [67%](http://mobihealthnews.com/28825/fitbit-jawbone-nike-had-97-percent-of-fitness-tracker-retail-sales-in-2013/). Even with the Force recalls they’re the dominant player. Do you hear people saying they are building the Fuelband for cars? I don’t.
