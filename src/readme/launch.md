---
title: A Peak Behind the Curtain
description: Formerly known as the README!
layout: layouts/article.njk
---
# A Peak Behind the Curtain

Hey there, and thanks for checking the README! This will mostly be dedicated to some of the content and tools that I used when creating this site, since there's plenty of things I really do want to mention that wouldn't be possible without breaking the 4th wall. Well, you checked the license. I think that's ground to say that it's been broken.

Ideally, I hope that this can prove useful to anyone creating their own structured websites.

## A Bit of Background

Right now, I'm taking a "Web Design & Development" course at the [University of Lethbridge](https://www.ulethbridge.ca/). The course has been great and I've been learning lots, but it's a bit of review to me. That's because during the summer I ended up following the University of Waterloo's [OpenCS Courses](https://open.cs.uwaterloo.ca/) on web programming. It was enough for me to get comfortable with the basic structure of HTML, and the pain that Javascript can be at times. That  OpenCS site is my go to recommendation for anyone that wants to get into programming, by the way! 

This site was developed as part of a class assignment, where the goal was to create a 3-5 page website for a fictional entity. After a example from *Destiny* was shown to the class, my mind immediately shifted towards *Titanfall* as a possible option. It's a series that I have come to adore when it comes to lore, as it's surprisingly deep for what was relegated to elevator music when it first released. Mind you, it would be as if they had a rock band performing elevator music. 

![](/img/Screenshot_Demeter.jpg)

When doing a quick search on the roster of established factions in *Titanfall* at the moment, the Frontier Corps introduced in *Apex Legends* caught my eye. I realized that if I covered them for my project, I could use the [Red Cross](https://www.redcross.org/) as a reference for the design of the site. It also helps that the Frontier Corps is also an interesting group within the Frontier, being one of the few humanitarian organizations.

## Markdown Markup

Once I had the base in place, I then began having dangerous thoughts. My mind started thinking about implementing Markdown parsing.

[Markdown](https://daringfireball.net/projects/markdown/) is genuinely fantastic, as it's widespread adoption can testify to. Its syntax is simple yet powerful, and is extremely versatile. I even used it to write a essay paper recently! The biggest problem I've found with Markdown, however, is trying to parse it into HTML. I have found it to be an absolute nightmare trying to figure it out, so I hope if you take anything away from this its how to properly handle Markdown.

1. **Pick your parser**: You got millions to choose from, pick one. I don't think it really matters which one you pick, other than [what feature set it offers](https://css-tricks.com/choosing-right-markdown-parser/).
2. **Learn [AJAX](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX)**: This will allow you to actually access the markdown files in your site.
3. **Mix Them**: This part really comes down to implementation, and your choice of parser. (For reference, I used [Showdown](http://showdownjs.com) as the parser for this site) No matter what, you'll want to invoke the parser as part of the function that triggers on `httpRequest.onreadystatechange`.

As a reference, here's the function I used for parsing markdown on this site. Feel free to copy it if you want!

```
function ajaxMarkdown(fileRequest, targetId) {
    var httpRequest = new XMLHttpRequest();
    console.log(httpRequest);
    
    if (!httpRequest) {
        console.log("ABORTING: Cannot create an XMLHTTP instance");
        return false;
    }
    httpRequest.open('GET', fileRequest);
    httpRequest.onreadystatechange = function() {
        if ((httpRequest.readyState === XMLHttpRequest.DONE) && (httpRequest.status === 200)) {
            var converter = new showdown.Converter();
            console.log(httpRequest.response);
            document.getElementById(targetId).innerHTML = converter.makeHtml(httpRequest.responseText);
        } else {
            console.log("There was a problem with the request.");
        }
    }
    httpRequest.send();
}
```
If you notice the `fileRequest` and `targetId` variables, those are for when the function gets called in the HTML's script function. Here's how that looks like on this page:

```
<script>
    window.onload = function() {
        ajaxMarkdown("/media/markdown/README.md", "article");
        ajaxMarkdown("/media/markdown/LICENCE.md", "licenceDesktop");    
        ajaxMarkdown("/media/markdown/LICENCE.md", "licenceMobile");
    }
</script>
```

## Regulations in Check

The EU's **General Data Protection Regulation** has been enforced [since May of 2018](https://www.gdpreu.org/compliance/). While that doesn't mean a whole lot to the average user, to privacy advocates it means there's now legal ground going against data hungry platforms. To web developers, it's something relatively small that's worth keeping in mind as a project is being developed.

For this site GDPR wasn't too huge of a deal, except for one major thing: [Google Fonts](https://github.com/google/fonts/issues/1495). Since Google snags your IP (and possibly even more) anytime someone links their site to the Google Font's API, any site using them is going against regulation! Fortunately, [there's ways to get around the API](https://www.brycewray.com/posts/2020/08/good-stuff-without-google/). For this site I used [google-webfonts-helper](https://google-webfonts-helper.herokuapp.com/fonts) to download the WOFF/WOFF2 files, alongside the CSS code needed to get them working!

Last bit of concern I had was with Showdown, as I planned to use a CDN to access the script rather than host it locally. (I wasn't in the mood to figure out how to do it when the documentation looked like another language) I chose to use their [CDNJS](https://cdnjs.com/) link, as from what I could vet from both [their GitHub issues](https://github.com/cdnjs/cdnjs/issues/13272) and [CloudFlare's GDPR policies](https://www.cloudflare.com/en-ca/gdpr/introduction/) it seems to be all clear.

## Special Thanks

- Manuel Matuzovic (for their [in-depth look into HTML boilerplates](https://www.matuzo.at/blog/html-boilerplate/))
- [Apex Legends Wiki](https://apexlegends.fandom.com/wiki/Apex_Legends_Wiki)

## Licences & Copyright

Some files and images in this site are owned by [*Electronic Arts Inc.*](https://www.ea.com/) and [*Respawn Entertainment*](http://www.respawn.com/), who hold the copyright on *Titanfall*. All trademarks and registered trademarks present on this site are proprietary to *Electronic Arts Inc.*, with their usage defendable as [**fair use**](https://en.wikipedia.org/wiki/fair_use) under [United States copyright law](https://en.wikipedia.org/wiki/United_States_copyright_law).

This site uses the IBM Plex Mono and Teko font families under the SIL Open Font License, 1.1. See [Google Fonts' Attribution page](https://fonts.google.com/attribution) for more information.

This site thanks the following open source projects:
- [google-webfonts-helper](https://github.com/majodev/google-webfonts-helper)
- [showdownjs](https://github.com/showdownjs/showdown)
- [cdnjs](https://github.com/cdnjs)
- [neocities](https://github.com/neocities)