import { defineStore } from 'pinia'
import TreeNode from '../model/TreeNode'
import EditorData from '../model/EditorData'
import webkit from '../api/WebKit'
import TurndownService from 'turndown'
import LocalStore from './LocalStore'
import Config from '../config/config'

const config = Config
const isDebug = config.isDebug

export const useAppStore = defineStore('app-store', {
    state: () => {
        return {
            isDebug: isDebug,
            node: isDebug ? new TreeNode(LocalStore.getData()) : new TreeNode({}),
            drawLink: config.drawLink,
            monacoLink: config.monacoLink,
            loading: true,
            ready: false,
            selectionType: '',
        }
    },

    actions: {
        closeDraw: function () {
            console.log('🍋 AppStore: close draw')
            document.dispatchEvent(new CustomEvent('close-draw'))
        },

        getContent(): string {
            return this.node.content
        },

        getJSON(): string {
            return this.node.json
        },

        getDrawLink(): string {
            return this.drawLink
        },

        getMarkdown(): string {
            let html = this.node.content

            var turndownService = new TurndownService({
                headingStyle: 'atx',
            })
            var markdown = turndownService.turndown(html)

            return markdown
        },

        setDrawLink: function (link: string) {
            this.drawLink = link
        },

        setCurrentNode: function (data: object) {
            this.loading = true
            console.log('🍋 AppStore: setCurrentNode && close draw')

            this.node = new TreeNode(data)

            document.dispatchEvent(new CustomEvent('close-draw'))

            this.loading = false
        },

        setCurrentNodeContent: function (content: string) {
            this.loading = true
            console.log('🍋 AppStore: setCurrentNodeContent')

            this.node.content = content
            this.loading = false
        },

        // 设置当前节点的子uuid和content，其中content传递一个通过base64编码的字符
        setUUIDAndContent: function (uuid: string, content: string) {
            this.loading = true
            console.log('🍋 AppStore: setUUIDAndContent')

            let newNode = this.node
            newNode.uuid = uuid
            newNode.content = decodeURIComponent(escape(atob(content)))

            // 会触发编辑器的更新
            this.node = newNode

            this.loading = false
        },

        /* 
            设置当前节点的子节点，传递一个通过base64编码的JSON数组
            所以要先base64解码再解析成JSON
            为什么不直接传递JSON
            因为Swift中的JSON
            [{ {
                "content": "c=\"my-custom",
                "title": "二"
            }]
            传递到这里，变成了
            [{ {
                "content": "class="my-custom",
                "title": "二"
            }]
        */
        setCurrentNodeChildren: function (children: string) {
            this.loading = true
            console.log('🍋 AppStore: setCurrentNodeChildren')

            let data = JSON.parse(decodeURIComponent(escape(atob(children))))
            this.node.children = data.map((element: object) => new TreeNode(element))
            this.loading = false
        },

        updateNode: function (data: EditorData) {
            if (data.content == this.node.content) {
                console.log('🧮 AppStore: 更新节点，没变化，忽略')
                return
            }

            console.log('🧮 AppStore: 更新节点')
            // console.log(data.content)
            // console.log(data.json)

            if (isDebug) {
                LocalStore.saveData(data)
            }

            webkit.updateNode(data)
        },

        setReady() {
            this.ready = true
            webkit.pageLoaded()
        },

        updateSelectionType(type: string) {
            if (type == this.selectionType) return

            this.selectionType = type
            webkit.updateSelectionType(type)
        }
    },
})