---
layout: post
title: Using Jekyll to generate static sites and hosting them on Github Pages [Part 1]
tags: jekyll
description: This is a tutorial for using jekyll to generate static sites
---

-- [Vedant Paranjape](https://github.com/VedantParanjape)

# Introduction to Jekyll

## What is Jekyll

Jekyll is a simple, blog-aware, static site generator perfect for personal, project, or organization sites. Think of it like a file-based CMS, without all the complexity. Jekyll takes your content, renders Markdown and Liquid templates, and spits out a complete, static website ready to be served by Apache, Nginx or another web server. Jekyll is the engine behind GitHub Pages, which you can use to host sites right from your GitHub repositories.

Jekyll does what you tell it to do — no more, no less. It doesn't try to outsmart users by making bold assumptions, nor does it burden them with needless complexity and configuration. Put simply, Jekyll gets out of your way and allows you to concentrate on what truly matters: your content.

## What are dynamic websites

Dynamic websites pull information from a database to fill in the content on a webpage. When you search for some movie on Google.com, the search results page you are shown didn’t already exist as a full HTML page; instead, Google.com has a template for search results page that includes things all results pages share, but it queries the database to insert the results of that search you initiated into that template and thus shows the result on your screen.

## What are static websites

Static websites do not use a database to store information. All the info that is to be displayed on the webpage is already contained inside the html file, be it javascript or css. The HTML pages that make up a static site can be completely written by hand, or you can offload some of this work using something like Jekyll.

## Github Pages

GitHub Pages is a place to store the files that run a website and host that website for people to visit. It can only be used to host static websites. Using it we can publish static websites through github, the domain name for the page is as follows `<github_username>.github.io`

# Getting started

## Using html files

* Create a new repository with any name, say jekyll-site
  
![](/assets/posts/using-jekyll-with-github-pages-part-1/create_repo.png)

* Add a new file named, `index.html` to the repository.

```html
<html>
hello world from jekyll
</html>
```

![](/assets/posts/using-jekyll-with-github-pages-part-1/add_file.png)

* Commit changes and push it to the repository.
* Go to repository settings, and scroll down, you will see a Github Pages section, in that in source, dropdown and select branch as master, and then press save. Now wait for some time, you will see something like `Your site is published at <link to your site>`.

![](/assets/posts/using-jekyll-with-github-pages-part-1/go_to_github_pages.png)

![](/assets/posts/using-jekyll-with-github-pages-part-1/published.png)

* Press the link, and see the expected output as follows.

![](/assets/posts/using-jekyll-with-github-pages-part-1/site.png)

# Conclusion

* Remember one thing, if there are multiple .html files, index.html file is the one which is shown as the first page.   
* So, this is how you use github pages to host your own html pages, but again we are using html and css to build a site, which actually hasn't solved our problem, So, now we show how to do the same using markdown files.

## Using markdown files

* Rename index.html to index.md
* Edit index.md and add the following to it

```markdown
# Helloworld
## Hello world using jekyll

`this is code fencing`

*Text in Italic*

**Text in Bold**

Normal Text
```

* Now commit the changes and push it to repository.
* Go out and check your mobile for a minute, as it takes few minutes to reflect changes.
* Now open the site and see the expected output as follows.

![](/assets/posts/using-jekyll-with-github-pages-part-1/site_with_markdown.png)

# Conclusion

* Site will be rendered into html files using jekyll, even if our file is in markdown.  
* So, Jekyll translates the markdown file into html files, thus reducing our work, and since markdown is very easy to use and maintain, and doesn't have wierd tags like html, it is very human readable and maintainable.
* Now, say you want to add such a page to some project you did, so you can't add these .md files in your github pages, there is a functionality to overcome this, we can store all our github pages files in a sub folder called `/docs`, and this will be rendered as earlier, to do this, go to repository settings, and scroll down, you will see a Github Pages section, in that in source, dropdown and select file as /docs, and then press save.

![](/assets/posts/using-jekyll-with-github-pages-part-1/settings_select_docs_as_root_folder.png)

* Try this yourself, by creating a docs folder and moving the `index.md` to /docs, then commit and push the changes.    
* You can also try to theme your page, click on `choose a theme` below source section, and select the theme of your choice, wait for sometime, and check the website again. For example here, I have used the `slate-theme`.

![](/assets/posts/using-jekyll-with-github-pages-part-1/page_with_theme.png)    
