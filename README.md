# SRA Blog

Repository maintains the SRA Blog. It is accessible here: https://blog.sravjti.in/

## Overview

* Uses Jekyll to generate the static webpage.
* Uses the theme `bitbrain/jekyll-dash`
* Output from Jekyll is pushed to `gh-pages` branch using github actions. Github Pages is configured to use `gh-pages` branch.
* It uses Github Actions to publish the generated jekyll blog to `gh-pages`, normal github pages jekyll build pipeline can't be used to generate tags, so we manually build using github actions and push to `gh-pages` branch.
* It uses the following github action `helaili/jekyll-action@2.0.4`

## Submitting new blog posts 

* Fork this repo.
* All assets like images or videos or gif should go into `/assets/posts/`, create a new subfolder for the specific post, let's say the blog title is `how to use github pages`, then create a folder like `/assets/posts/how-to-use-github-pages`.
* The content should be written in markdown, the file should go into `_posts` folder.
* File should be named as follows, `<year>-<month>-<date>-article-name.md`.
* Let's say today's date is 13th June 2021, then the filename is expected to be `2021-06-13-hoe-to-use-github-pages.md`
* Each markdown file must begin with the following predicate
  ```markdown
  ---
  layout: post
  title: <name of the article>
  tags: <specific tag with which you want to classify the article, can be something like OpenCV, embedded-system, it shouldn't have spaces>
  description: <put a short description of the topic here>
  ---

  -- [Author's name](Link-to-their-github-account)
  ```
* Add your content below, it's good idea to begin with a heading with single `#`, and go on. For using images follow the following path convention `/assets/posts/<name-of-the-post-folder>/<filename>`, for example something like this can be done to insert a image `![](/assets/posts/using-jekyll-with-github-pages-part-1/create_repo.png)`
* For reference go through this markdown file: https://raw.githubusercontent.com/SRA-VJTI/blog/master/_posts/2020-09-14-using-jekyll-with-github-pages-1.md
* Verify that the changes are correct by running it on your local machine, you need bundle and jekyll installed, [instructions are here](https://jekyllrb.com/docs/installation/)
  ```bash
  # cd into the repository
  gem install jekyll bundler
  bundle exec jekyll serve
  # Visit here http://localhost:4000 to see your changes
  ```
* Commit the changes and file a Pull Request. Please use a proper title, and a short description of the blog post.

## License

```
MIT License

Copyright (c) 2021 Society of Robotics and Automation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
