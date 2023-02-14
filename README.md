# Web pages (layout+content) for DORA Project.

https://dora-rs.github.io

https://dora.carsmos.ai/


# How to preview your changes locally on your desktop

Clone this repo to your desktop via some Git client, e.g. Guthub Desktop.

Run these commands:

> cp Gemfile.local Gemfile
> bundle install
> bundle update
> bundle exec jekyll serve --livereload

Then open a browser page at http://127.0.0.1:4000 

Do NOT commit the Gemfile on your local desktop to Github Pages repo! 
It is needed only on your local host but not needed on the Guthub Pages.


# How to modify content for this website

Edit the [index.md](/index.md) file.


# How to modify the style of this website

Edit the [_layout/default.html](/_layouts/default.html) file.


# For more customization

This website is based on the Dinky Jekyll theme.

https://github.com/pages-themes/dinky

