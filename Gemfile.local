# frozen_string_literal: true

source "https://rubygems.org"

# Run these steps to previewe this web site on your local desktop:
#
#     cp Gemfile.local Gemfile 
#     bundle install
#     bundle update
#     bundle exec jekyll serve --livereload
#
# Then open a browser page at http://127.0.0.1:4000 
#
# Do NOT commit the Gemfile on your local desktop to Github Pages repo! 
# It is needed only on your local host but not needed on the Guthub Pages.

gem "jekyll"

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-sitemap"
  gem "jekyll-include-cache"
  gem 'jekyll-paginate'
  gem 'jekyll-redirect-from'
  gem 'jekyll-remote-theme'
  gem 'jekyll-seo-tag'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.1.0", :install_if => Gem.win_platform?

# Configure as an HTTPS server, a proxy server, and a virtual-host server. 
gem "webrick", "~> 1.7"
