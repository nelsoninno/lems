# lems.ad: your website package

Last updated October 2026.

## What's here
This folder is the whole Lems website. `index.html` is the Spanish home page (the default, at lems.ad) and `en/index.html` is the English one (at lems.ad/en/). Photos and logos live under `assets/images/`, videos under `assets/video/`, and colors and fonts live in one file, `assets/css/tokens.css`.

## Replace photos or videos
Drop originals into `_source/photos-original/` (logos into `_source/logos-original/`, videos into `_source/video-original/`). Any format works; they get converted. Web-ready versions go here:

| What | Where it appears | Folder | File name pattern |
| --- | --- | --- | --- |
| Logo | Header, history title, footer | `assets/images/logos/` | logo-lems-lems.ad.webp |
| "We get it done" artwork | Hero | `assets/images/hero/` | hero-we-get-it-done-lems-lems.ad.webp |
| Team portraits (4:5, min 800 x 1000px) | Team section | `assets/images/team/` | team-{name}-lems-lems.ad.webp |
| Campaign posters (16:9) | Clients section | `assets/images/gallery/` | poster-campana-{n}-lems-lems.ad.webp |
| Campaign videos (under 25 MB each) | Clients section | `assets/video/` | video-campana-{n}-lems-lems.ad.mp4 |
| Share image (1200 x 630) | WhatsApp, LinkedIn previews | `assets/images/social-share/` | social-share-lems-lems.ad.jpg |

## Change colors
All colors and fonts are in `assets/css/tokens.css`. Editing that one file re-skins the whole site.

## Request a change
Message the EverybodyKnowsYou team with what you'd like changed. Every change is made in both Spanish and English.
