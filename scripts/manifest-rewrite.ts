import * as fs from "fs"
import * as path from "path"
import { fileURLToPath } from 'url'
import manifest from "../src/manifest"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// chrome build default, so currently default firefox is true
const isFirefox = true // process.env.EXTENSION === "firefox"

const { background, side_panel, ...commons } = manifest
const firfoxManifest = {
    ...commons,
    background:
        // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/background
        isFirefox
            ? {
                scripts: [background.service_worker],
                type: background.type
            }
            : background,
    [isFirefox ? "sidebar_action" : "side_panel"]:
        isFirefox
            ? {
                default_panel: side_panel.default_path
            }
            : side_panel
    // options_page is deprecated in firefox v3, but still works
}

fs.writeFileSync(path.resolve(__dirname, "../extension/manifest.json"), JSON.stringify(firfoxManifest, null, 2))