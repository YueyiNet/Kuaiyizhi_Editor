import UpdateData from "../model/UpdateData";
import Plugin from "../contract/Plugin";
import TreeNode from "../model/TreeNode";
import EditorDoc from "../model/EditorDoc";
import ImageHelper from "../helper/ImageHelper";

const title = "🍎 LocalNodeApp"

class LocalNodeApp implements Plugin {
    onDownloadImage(src: string, name: string): void {
        console.log(title, 'download image')

        if (src.startsWith('data:image/') || src.startsWith('data: image/')) {
            ImageHelper.downloadBase64(src)
        } else {
            ImageHelper.downloadImageFromUrl(src)
        }
    }

    onMessage(message: string): void {
        let verbose = false

        if (verbose) {
            console.log(title, 'message', message)
        }
    }

    onPageLoaded(): void {
        let verbose = false

        if (verbose) {
            console.log(title, 'onPageLoaded')
        }

        const currentNode = LocalDB.getNode()
        const currentDoc = LocalDB.getCurrentDoc() || EditorDoc.makeDefaultDoc()

        window.api.node.setNode(currentNode)
        window.api.doc.setDoc(currentDoc)
    }

    onSelectionTypeChange(type: string): void {

    }

    onDocUpdated(data: EditorDoc): void {
        let verbose = true

        if (verbose) {
            console.log(title, 'onDocUpdated', data)
        }

        var docs = LocalDB.getDocs()
        if (docs) {
            docs = docs.map(doc => {
                if (doc.uuid == data.uuid) {
                    return data
                }
                return doc
            })
        }

        if (!docs) {
            docs = []
        }

        LocalDB.saveDocs(docs)
    }

    onDocsUpdated(data: EditorDoc[]): void {
        let verbose = true

        if (verbose) {
            console.log(title, 'onDocsUpdated', data.length)
        }

        LocalDB.saveDocs(data)
    }
}

class LocalDB {
    static getCurrentDoc(): EditorDoc | undefined {
        let docs = LocalDB.getDocs()

        if (!docs) {
            return undefined
        }

        let currentDocUUID = LocalDB.getCurrentDocUUID()

        if (currentDocUUID.length == 0) {
            return docs[0]
        }

        return docs.find(doc => doc.uuid == currentDocUUID)
    }

    static saveNode(node: TreeNode): void {
        localStorage.setItem('node', node.toJSONString())
    }

    static saveDocs(docs: EditorDoc[]): void {
        let verbose = true

        if (verbose) {
            console.log(title, 'saveDocs', docs, docs.length)
        }

        docs.forEach((doc: EditorDoc) => {
            if (doc.uuid.length == 0) {
                throw new Error('uuid is empty')
            }
        })

        localStorage.setItem('docs', JSON.stringify(docs))
    }

    static getNode(): TreeNode {
        let verbose = false
        let saveData = localStorage.getItem('node')
        let treeNode = saveData ? new TreeNode(JSON.parse(saveData)) : TreeNode.makeDefaultNode()

        if (verbose) {
            console.log(title, 'getNode', treeNode)
        }

        return treeNode
    }

    static getDocs(): EditorDoc[] | null {
        let verbose = false
        let saveData = localStorage.getItem('docs')

        if (verbose) {
            console.log(title, 'getDocs', saveData)
        }

        if (!saveData) {
            return null
        }

        let docs = JSON.parse(saveData).map((doc: { [key: string]: any; }) => EditorDoc.fromObject(doc))

        if (verbose) {
            console.log(title, 'getDoc', docs)
        }

        return docs
    }

    static saveCurrentDocUUID(uuid: string): void {
        localStorage.setItem('current_doc_uuid', uuid)
    }

    static getCurrentDocUUID(): string {
        return localStorage.getItem('current_doc_uuid') || ""
    }
}

export default LocalNodeApp