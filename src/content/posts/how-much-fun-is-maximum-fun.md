---
title: How Much Fun is Maximum Fun?
description: I’m a big consumer of podcasts. Ever since I started living on my own while in graduate school I’ve found that having funny and interesting people in my…
pubDate: '2016-06-04'
kind: post
tags:
- r
- podcasts
- data visualization
archive: true
---

## Intro

I’m a big consumer of podcasts. Ever since I started living on my own while in graduate school I’ve found that having funny and interesting people in my ears helps me get through the day. Even now that I’m cohabiting with my wife I haven’t left my trusty podcasts behind. They’re great for the long commutes back and forth to San Diego, for reducing my stress while stuck in LA traffic, and for making my laugh while I cook, clean, and exercise.

I’m a fan and donor (support the things you love!) of one podcast network in particular, [Maximum Fun](http://www.maximumfun.org), so much so that I’m a semi-regular participant in their Facebook group and subreddit. Recently, someone in the Facebook group asked for some data about the network, in particular the number of shows that have been published, in order to visualize the growth of the network. As someone who’s keen to keep my data analysis skills fresh and nimble I took this as an opportunity to dive back into R. Here’s what I’ve done so far:

## Gathering Data from an RSS Feed

Podcasts are unique in that they’re basically just a simple feed of audio files. That feed has data embedded into it that we can access and save. I’m pretty new to web-scrapping, but I was able to find a really nice example of [how to scrape an RSS feed in R here](https://gist.github.com/izahn/5785265). I adapted that to scrape and save data from each of the podcasts in the Maximum Fun network. Here’s an example:

```
library(RCurl)
```

```
## Loading required package: bitops
```

```
library(XML)

options(stringsAsFactors = FALSE)

## get rss document
xml.url <- "http://adventurezone.libsyn.com/rss"
script <- getURL(xml.url, ssl.verifypeer = FALSE)

## convert document to XML tree in R
doc <- xmlParse(script)
## find the names of the item nodes

## Extract some information from each node in the rss feed
titles <- xpathSApply(doc,'//item/title',xmlValue)
date <- xpathSApply(doc,'//item/pubDate',xmlValue)
duration <- xpathSApply(doc,'//item/itunes:duration',xmlValue)

# create data frame with important variables
Adventurezone <- data.frame(titles, date, duration)

# create unique identifier
Adventurezone$id <- "The Adventure Zone"
```

I probably could have created a function to run through all the shows, but instead I used that chunk for every show. It was actually useful as a few of the shows had missing episodes or titles and durations that didn’t match up.

Once I had all the data scrapped from the feeds I was able to combine it into one dataset of 4,202 episodes from 25 different shows. The date/duration variables were pretty messy so I noodled around a bit and cleaned them up into something manageable. I’ve saved that final data in [Rdata](https://dl.dropboxusercontent.com/u/2513399/MaximumFun.rdata) and [.csv](https://dl.dropboxusercontent.com/u/2513399/MaximumFun.csv) formats if you want to play with them yourself. I’m loading the RData file here:

```
load(url("https://www.dropbox.com/s/5l94kzc54s177uh/MaximumFun.rdata?dl=1"))
```

## Visualizations

Once we have all the data in a good format creating visualizations is actually pretty easy! Let’s start with a simple bar chart that plots the number of shows per month:

```
library(ggplot2)
library(scales)
# simple bar chart with sum of number of shows per month
mf.stacked.bar <- ggplot(MaximumFun, aes(monthyear)) + geom_bar() +
  labs(title = "Number of Shows on Maximum Fun per Month", x = "Year - Month", y = "Number of Shows Published") +
  theme(axis.text.x = element_text(angle = 90, hjust = 1, size = 6))
mf.stacked.bar
```

![](/images/archive/posts/2016-06-04-how-much-fun-is-maximum-fun/barchart-1.png)

That’s not bad, but what if we wanted to know which shows were on the network over time? We can use the “id” variable we created in the initial data scrapping process to label each show. This visualization needs a better color palette to better differentiate between each show, but I’ll leave it here for now:

```
library(ggplot2)
library(scales)
# add in color to represent the shows
# needs a better color palette
mf.stacked.bar2 <- ggplot(MaximumFun, aes(monthyear, fill = id)) + geom_bar() +
  labs(title = "Number of Shows on Maximum Fun per Month", x = "Year - Month", y = "Number of Shows Published") +
  theme(axis.text.x = element_text(angle = 90, hjust = 1, size = 6), legend.position="bottom")
mf.stacked.bar2
```

![](/images/archive/posts/2016-06-04-how-much-fun-is-maximum-fun/barchart_shows-1.png)

What can we find out about each show? Let’s start with visualizing the total number of hours each podcast has published:

```
library(ggplot2)
library(scales)
mf.stacked.bar4 <- ggplot(MaximumFun, aes(id, (showlength/60))) + geom_bar(stat="identity") +
  labs(title = "Total Duration of Each Show on Maximum Fun", x = "Show", y = "Total Number of Hours") +
  theme(axis.text.x = element_text(angle = 90, hjust = 1))
mf.stacked.bar4
```

```
## Warning: Removed 32 rows containing missing values (position_stack).
```

![](/images/archive/posts/2016-06-04-how-much-fun-is-maximum-fun/show_hours-1.png)

How about the number of episodes per show?

```
# simple bar chart for total number of episodes per show
mf.stacked.bar5 <- ggplot(MaximumFun, aes(id)) + geom_bar() +
  labs(title = "Number of Episode of each Show on Maximum Fun", x = "Show", y = "Total Number of Episodes") +
  theme(axis.text.x = element_text(angle = 90, hjust = 1))
mf.stacked.bar5
```

![](/images/archive/posts/2016-06-04-how-much-fun-is-maximum-fun/show_episodes-1.png)

I also got around to reformatting the data so that we could look at the number of shows and amount of content produced by Maximum Fun over time. To do that we first have to create a new dataset that aggregates some of the information:

```
library(plyr)
# number of shows on the network over time
MaxFunShows <- ddply(MaximumFun, c("monthyear"), summarise,
                           'NumberofShows' = length(unique(id)),
                           'DurationofShows' = sum(showlength, na.rm=TRUE)
)
```

```
## Loading required package: lubridate
```

```
## 
## Attaching package: 'lubridate'
```

```
## The following object is masked from 'package:plyr':
## 
##     here
```

```
## The following object is masked from 'package:base':
## 
##     date
```

Then we can make plots just like the ones we have above!

```
mf.stacked.bar5 <- ggplot(MaxFunShows, aes(monthyear, NumberofShows)) + geom_bar(stat="identity") +
  labs(title = "Number of Shows on Maximum Fun over time", x = "Date", y = "Number of Shows on the Network") +
  theme(axis.text.x = element_text(angle = 90, hjust = 1, size = 6))
mf.stacked.bar5
```

![](/images/archive/posts/2016-06-04-how-much-fun-is-maximum-fun/barchart_number_shows-1.png)

What about the amount of content over time?

```
mf.stacked.bar5 <- ggplot(MaxFunShows, aes(monthyear, (DurationofShows/60))) + geom_bar(stat="identity") +
  labs(title = "Amount of Content Produced (in hours) by Maximum Fun over time", x = "Date", y = "Hours") +
  theme(axis.text.x = element_text(angle = 90, hjust = 1, size = 6))
mf.stacked.bar5
```

![](/images/archive/posts/2016-06-04-how-much-fun-is-maximum-fun/barchart_networkhours-1.png)

Unfortunately, this doesn’t include some of the great shows that have moved on to be either independtly operated or part of another network, but it’s still a pretty good approximation of the growth over time.

I’ll probably keep noodling around with this data. Probably a lot more I can do with visualizing particular shows and the network as a whole. If you have ideas [get in touch](http://twitter.com/eramirez)!
