# Leyli Nouraei Yeganeh — GitHub Pages Portfolio

Portfolio source for **https://yeganehleyli.github.io/**. This repository contains the homepage, four project pages, five isometric illustrations in responsive sizes, a local font, and the original downloadable portfolio PDF.

The site has been adapted from the published Sites version for GitHub Pages. No build tools, packages, API keys, or paid hosting plan are required to serve these pages from this public repository.

## Publish from your GitHub account

1. Sign in at https://github.com/yeganehleyli.
2. Create a public repository named **yeganehleyli.github.io**, or open that repository if you already use it. Review existing content before replacing files.
3. Extract the ZIP and open the **yeganehleyli.github.io** folder inside it.
4. In the repository, choose **Add file → Upload files**. Upload this folder's contents, including the **assets** and **projects** folders. The **index.html** file must be at the repository root, not inside an extra parent folder. Commit the upload to **main**.
5. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, then select **main** and **/ (root)**. Save.
6. Once GitHub reports a successful deployment, open **https://yeganehleyli.github.io/**. Publishing may take up to 10 minutes.

No CNAME record or custom-domain setting is needed for the standard github.io address. The empty `.nojekyll` file tells Pages to serve the prepared HTML directly.

Official instructions: https://docs.github.com/en/pages/quickstart

## Profile photo

The **Edit profile photo** link opens your existing protected photo editor in a separate tab:

https://leyli-learning-design.opalsole4.chatgpt.site/profile-photo

Sign in with the ChatGPT account that owns the portfolio, choose or replace your photo, and save. The GitHub homepage loads the public photo from that existing site. Return to the GitHub tab to refresh the photo. The editor and stored photo continue to depend on the existing Sites publication; the main portfolio pages and other assets are served by GitHub. No visitor sign-in is required to view a published photo.

If there is no photo, the About section displays without a portrait. A failed photo request also leaves the rest of the portfolio readable.

For a photo hosted entirely on GitHub instead, upload a square JPG as **assets/profile-photo.jpg** and change `PHOTO_SOURCE` from `'sites'` to `'github'` in **profile-portrait.js**. To update that version later, replace the JPG in the repository. The Sites editor will no longer control it.

## Included files

- `index.html`: portfolio homepage.
- `projects/`: Meta-MILE, STREAM, Immersive Future, and self-regulated learning project pages.
- `assets/`: images, font, favicon, and portfolio PDF.
- `styles.css` and `site.js`: original responsive design, navigation, filters, and email copy interaction.
- `profile-portrait.js`: portrait display and refresh behavior.
- `404.html`: custom missing-page screen.
- `robots.txt` and `sitemap.xml`: updated for the GitHub address.

## Checks performed

Internal page and asset links, document structure, JavaScript syntax, and image/PDF preservation were checked before upload. After changes, verify the published homepage, project links, PDF download, and profile photo. The profile photo depends on the original Sites publication remaining available.

Prepared from Sites version 3, source commit `3767bbdd64183eb5216d881d09ba28a9e1846167`, on October 20, 2026. Portfolio text and reported project results are preserved from the original site.
