import Config from "../config/config"
import DomHelper from "../helper/DomHelper"
import Listener from "../contract/Listener"
import PageMode from "../model/PageMode"

const title = '🚢 UrlListener'

export default class UrlListener implements Listener {
    start(pageMode: PageMode) {
        window.onpopstate = this.onURLChanged
    }

    private onURLChanged() {
        let verbose = false
        if (verbose) {
            console.log(title, 'URL变化了', window.location.hash)
        }
        let hash = window.location.hash
        if (hash) {
            DomHelper.goto(hash.substring(1), Config.editorLabel)
        }
    }
}