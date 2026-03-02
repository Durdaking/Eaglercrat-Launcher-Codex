# Eaglercraft Launcher

Open `index.html` in a browser (or serve this folder with a static web server) to use the launcher.

## Features
- Dropdown selector grouped by version folder (`1.5.2` and `1.12.2`).
- Launches each HTML client in-frame.
- Isolated local save profile per HTML client (the launcher snapshots/restores `localStorage` per file).
- Export launcher save profiles to JSON.
- Import launcher save profiles from JSON for cross-PC migration.

## Notes
- Save isolation/export/import currently manages `localStorage` values for this origin.
- For best compatibility, run from a local static server instead of `file://` URLs.
