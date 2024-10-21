
import Plugin from "../contract/Plugin";
import TreeNode from "../model/TreeNode";
import EditorData from "../model/EditorData";
import PageMode from "../model/PageMode";

const title = "🍎 EventPlugin"
const eventName = "editor-event";

enum EventType {
    editorReady = "editorReady",
    downloadImage = "downloadImage",
    configChanged = "configChanged",
    docUpdated = "docUpdated",
    docsUpdated = "docsUpdated",
    docUpdatedWithNode = "docUpdatedWithNode",
    currentDocUUIDUpdated = "currentDocUUIDUpdated"
}

function emit(name: EventType, data: object = {}) {
    let verbose = false

    if (verbose) {
        console.log(title, `emit event`, eventName)
    }

    window.dispatchEvent(new CustomEvent(eventName, {
        detail: {
            name: name,
            data: data
        }
    }));
}

// Send event to browser
class EventPlugin implements Plugin {
    forPages: PageMode[] = [PageMode.SLOT, PageMode.NODE, PageMode.BASIC]

    onDownloadImage(src: string, name: string): void {
        console.log(title, 'download image')

        emit(EventType.downloadImage, {
            src: src,
            name: name
        })
    }

    onMessage(message: string): void {

    }

    onConfigChanged(): void {
        emit(EventType.configChanged)
    }

    onLoading(reason: string): void {
    }

    onReady(): void {
        let verbose = false

        if (verbose) {
            console.log(title, 'page loaded')
        }

        emit(EventType.editorReady)
    }

    onSelectionTypeChange(type: string): void {

    }

    onDocUpdated(data: EditorData): void {
        emit(EventType.docUpdated, data)
    }

    onDocsUpdated(data: EditorData[]): void {
        emit(EventType.docsUpdated, data)
    }

    onDocUpdatedWithNode(data: EditorData, node: TreeNode): void {
        emit(EventType.docUpdatedWithNode, {
            data: data,
            node: node
        })
    }

    onCurrentDocUUIDUpdated(uuid: string): void {
        emit(EventType.currentDocUUIDUpdated, {
            uuid: uuid
        })
    }
}

export default EventPlugin