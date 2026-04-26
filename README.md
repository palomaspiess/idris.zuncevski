# Idris Zuncevski Personal Website

Static personal website for Idris Zuncevski, a mechanical engineer.

## Pages

- English pages:
	- `index.html`: Main landing page with technical animation
	- `about.html`: About page
	- `technical.html`: Technical profile and engineering work summary
	- `contact.html`: Contact form (email client based)
- German pages:
	- `de-index.html`: Startseite mit technischer Animation
	- `de-about.html`: Ueber-mich-Seite
	- `de-technical.html`: Technik-Seite
	- `de-contact.html`: Kontaktformular

## Local Preview

Open `index.html` (English) or `de-index.html` (German) directly in your browser, or use a local static server.

## Publish on GitHub Pages

1. Push this repository to GitHub.
2. In GitHub, open repository **Settings** > **Pages**.
3. Under **Build and deployment**, choose:
	- **Source**: Deploy from a branch
	- **Branch**: `main` (or your default branch), folder `/ (root)`
4. Save and wait for deployment.
5. Your site will be available at your GitHub Pages URL.

## Contact Form Note

The contact form is static-site friendly and opens the visitor's email client using `mailto:`.
Update the email address in `script.js` before publishing.