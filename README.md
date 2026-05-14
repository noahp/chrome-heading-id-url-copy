# Copy Section Link

A Chrome extension that lets you copy a direct URL to any page section by right-clicking on elements with an `id` attribute.

Useful for sites that have heading IDs in their HTML but don't render clickable anchor links in the UI.

## Usage

Right-click anywhere on a page and select **"Copy link to this section"**. The extension finds the nearest ancestor element (including the clicked element itself) with an `id`, then copies `https://current-page-url#the-id` to your clipboard. A brief toast confirms what was copied.

## Installation

1. Go to `chrome://extensions`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked** and select this directory

## Files

- `manifest.json` - extension manifest (MV3)
- `background.js` - registers the context menu item and relays clicks to the content script
- `content.js` - tracks the right-clicked element, walks the DOM for an `id`, writes to clipboard, shows toast
