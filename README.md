# RustFest.eu

This website is a `jekyll` site. You're welcome to fork and use this for your conference. We've tried to make it reasonably generic.

Pull requests are welcome, and if you find any mistakes please just open an issue.

## Developing for the site

* In general favor convention over customization. We want to organize a conference, not maintain a giant mess of options.
* We strive to make the site accessible. Prefer static to dynamic, use `alt` tags on images.
    + Further, consider reviewing changes in `lynx` or another console browser. Our visitors **do** use these, and we respect them.
* We make use of 'collections' to manage our data. In general you will find `_collection/_schema.md` which will describe the options of a collection. Some collections have assets which will be in `assets/collection/*`.
* We can't use most Jekyll plugins since we're hosted on Github pages.

# Common tasks

## Change `_config.yml`

Every change to `_config.yml` will not be reflected while jekyll is still running.
You need to terminate it with `Ctrl` + `C` and then start it again:

```
docker run --rm --volume=$(pwd):/srv/jekyll -p 35729:35729 -p 4000:4000 -it jekyll/jekyll jekyll serve
```

## Adding an Organizer

Create a file by the name of `_organizers/nick.md` where `nick` is the nick of the organizer. Use the options detailed in `_organizers/_schema.md` to configure the details.

Then, save their image to `assets/organizers/nick.png`. It should be `660x660` at most. You can use this to configure it:

```bash
make images
```

The final PR should include:

* `_organizers/nick.md`
* `assets/organizers/nick.png`

## Adding a Sponsor

You can either ask them the details from `_sponsors/_schema.md` and fill it out for them, ask them to fill it out, or if they'd like, have them make a PR.

Ask them for an SVG version of their logo.

Reduce the size of the SVG with a project like [svgcleaner](https://crates.io/crates/svgcleaner) and make sure that the browser does not collapse the image into a 0x0 pixel one.

The final PR should incude:

* `_sponsors/company.md`
* `assets/sponsors/company.svg || assets/sponsors/company.png`

## Adding a Speaker

You can either ask them the details from `_speakers/_schema.md` and fill it out for them, ask them to fill it out, or if they'd like, have them make a PR. Their `nick` should either be their nickname or their first initial then last name.

Ask them for a PNG image which they'd like to be shown publicly.

The final PR should include:

* `_speakers/nick.md`
* `assets/(event-asset-folder/)speakers/nick.png`

## Adding a Session

Create a file by the name of `_sessions/snake-case-short-name.md`. Use the options detailed in `_sessions/_schema.md` to configure the details.

The final PR should include:

* `_sessions/nick.md`

# Useful Snippets

* Get a particular item from a collection (In this example, `sponsors` who are `featured: true`):
  ```ruby
  {{ site.sponsors | where: "featured", true }}
  ```
* Bind a value:
  ```ruby
  {{ assign partners = site.sponsors | where: "group", "partner" }}
  ```
* Do a `.map()` on a collection. (In this example, list all speakers by name as a sentence):
  ```ruby
  {{ site.speakers | map: "speaker", "name" | array_to_sentence_string }}
  ```
* Debug a value:
  ```ruby
  <pre>{{ site.speakers | inspect }}</pre>
  ```
* Use a `where_exp` to check arrays for contents, etc. (In this example, get the names of a speakers for a talk):
  ```ruby
  {{ site.speakers | where_exp: "speaker", "talk.speakers contains speaker.slug" | map "speaker", "name" }}
  ```

# Social cards

After merging (or checking out locally) you can go to **http://localhost:4000/meta/twitter-card-generator/** to see a list of cards showing up. Edit the file `_layout/meta-twitter-card-generator.html` adding sessions (talks, workshops, keynote, ...) descriptions (there's a JSON object `var data` towards the end), and to change the visuals (e.g. the SVG).

When you are done, you can just screenshot the cards and save them as a .png image into `/assets/social/` under the name specified in the `socialImageSrc` parameter of the session item. Screenshots can be taken with:
- (easiest way) Firefox (55+): there's [a nifty tool for taking screenshots](https://screenshots.firefox.com).
- Otherwise, with Firefox, in the devtools you can just right-click a card and click "Screenshot node", which saves a .png file of the correct size automatically into your "Downloads" folder.

**Note** that these files are recompressed by Twitter as .jpegs, so there is no harm in having large files.

The Twitter Card Validator service can be used for checking metadata (it also works on this page, it will show Ashley's card that is embedded in the metadata in <head>), but it only works for already-on-line pages, doesn't work with locally served devpages (as it uses Twitter's crawler).
