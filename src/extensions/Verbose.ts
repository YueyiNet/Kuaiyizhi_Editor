import { TiptapExtension } from '../model/TiptapGroup'

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        verbose: {
            disableVerboseMode: () => ReturnType
            enableVerboseMode: () => ReturnType
        }
    }
}

const Verbose = TiptapExtension.create({
    name: "verbose",

    addStorage() {
        return {
            emoji: '🔍 Verbose',
        }
    },

    addCommands() {
        return {
            disableVerboseMode: () => ({ chain }) => {
                console.log(this.storage.emoji, '🚫 disableVerboseMode')

                return chain()
                    .disableDocVerbose()
                    .disableLocalStorageVerbose()
                    .disableWebKitVerbose()
                    .run()
            },

            enableVerboseMode: () => ({ chain }) => {
                console.log(this.storage.emoji, '✅ enableVerboseMode')

                return chain()
                    .enableDocVerbose()
                    .enableLocalStorageVerbose()
                    .enableWebKitVerbose()
                    .run()
            },
        }
    }
})

export default Verbose