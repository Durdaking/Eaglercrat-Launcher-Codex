diff --git a/README.md b/README.md
index be03a6bdd487872bb78f259506a6c94dd63748ec..cc752e0dbe44b6ca08b77b453e6197cae216cb56 100644
--- a/README.md
+++ b/README.md
@@ -1 +1,18 @@
-I made this with codex and its not done
+# Eaglercraft Launcher
+
+Open `index.html` in a browser (or serve this folder with a static web server) to use the launcher.
+
+## Features
+- Top-left credit text: **Made by Durdaking**.
+- Import/export controls are placed in the top-right of the launcher.
+- Version selection is shown as centered buttons in this top-to-bottom order: `1.12.2`, `1.8.8`, `1.5.2`.
+- `1.8.8` includes an extra dropdown to choose `hacked`, `legit`, or `modded` clients, and only launches from that selected category.
+- Client dropdown labels show only the file name (without folder prefixes), while launch paths still use the correct folder internally.
+- Added launcher controls below the selectors for launching in a fullscreen frame or opening the selected client directly in a new tab.
+- Isolated save data per HTML file.
+- Multiple named launcher profiles (create, switch, delete).
+- Export/import launcher profiles to JSON for cross-PC migration.
+
+## Notes
+- Save isolation/export/import currently manages `localStorage` values for this origin.
+- For best compatibility, run from a local static server instead of `file://` URLs.
