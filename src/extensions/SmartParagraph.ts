import Paragraph from "@tiptap/extension-paragraph";
import { TiptapEditor } from "../model/TiptapGroup";
import { Node } from "prosemirror-model";
import { AssistantStorage } from "./Assistant";

declare module '@tiptap/core' {
    interface Commands<ReturnType> {
        SmartParagraph: {
            setParagraph: () => ReturnType
            setBackgroundColor: (color: string) => ReturnType
            enableParagraphVerbose: () => ReturnType
            disableParagraphVerbose: () => ReturnType
            translate: (language: string) => ReturnType
            setTranslateApi: (api: string) => ReturnType
        }
    }
}

interface ParagraphOptions {
    colorClass: Record<string, string>
    translateApi: string
}

const SmartParagraph = Paragraph.extend<ParagraphOptions>({
    parseHTML: () => [
        { tag: "banner" },
        { tag: "p" },
    ],

    addStorage() {
        return {
            verbose: false,
            title: '🦜 SmartParagraph',
        }
    },

    addOptions() {
        return {
            ...this.parent?.(),
            colorClass: {
                cyan: 'bg-gradient-to-r from-cyan-800/50 to-cyan-800/30 dark:from-cyan-800/30 dark:to-cyan-800/10',
                blue: 'bg-gradient-to-r from-blue-800/50 to-blue-800/30 dark:from-blue-800/30 dark:to-blue-800/10',
                yellow: 'bg-gradient-to-r from-yellow-800/50 to-yellow-800/30 dark:from-yellow-800/30 dark:to-yellow-800/10',
                red: 'bg-gradient-to-r from-red-800/50 to-red-800/30 dark:from-red-800/30 dark:to-red-800/10',
                green: 'bg-gradient-to-r from-green-800/50 to-green-800/30 dark:from-green-800/30 dark:to-green-800/10',
                purple: 'bg-gradient-to-r from-purple-800/50 to-purple-800/30 dark:from-purple-800/30 dark:to-purple-800/10',
                orange: 'bg-gradient-to-r from-orange-800/50 to-orange-800/30 dark:from-orange-800/30 dark:to-orange-800/10',
                pink: 'bg-gradient-to-r from-pink-800/50 to-pink-800/30 dark:from-pink-800/30 dark:to-pink-800/10',
                gray: 'bg-gradient-to-r from-gray-800/50 to-gray-800/30 dark:from-gray-800/30 dark:to-gray-800/10',
                black: 'bg-gradient-to-r from-black/50 to-black/30 dark:from-black/30 dark:to-black/10',
                indigo: 'bg-gradient-to-r from-indigo-800/50 to-indigo-800/30 dark:from-indigo-800/30 dark:to-indigo-800/10',
                teal: 'bg-gradient-to-r from-teal-800/50 to-teal-800/30 dark:from-teal-800/30 dark:to-teal-800/10',
                lime: 'bg-gradient-to-r from-lime-800/50 to-lime-800/30 dark:from-lime-800/30 dark:to-lime-800/10',
                emerald: 'bg-gradient-to-r from-emerald-800/50 to-emerald-800/30 dark:from-emerald-800/30 dark:to-emerald-800/10',
                sky: 'bg-gradient-to-r from-sky-800/50 to-sky-800/30 dark:from-sky-800/30 dark:to-sky-800/10',
                violet: 'bg-gradient-to-r from-violet-800/50 to-violet-800/30 dark:from-violet-800/30 dark:to-violet-800/10',
                fuchsia: 'bg-gradient-to-r from-fuchsia-800/50 to-fuchsia-800/30 dark:from-fuchsia-800/30 dark:to-fuchsia-800/10',
                rose: 'bg-gradient-to-r from-rose-800/50 to-rose-800/30 dark:from-rose-800/30 dark:to-rose-800/10',
                slate: 'bg-gradient-to-r from-slate-800/50 to-slate-800/30 dark:from-slate-800/30 dark:to-slate-800/10',
                zinc: 'bg-gradient-to-r from-zinc-800/50 to-zinc-800/30 dark:from-zinc-800/30 dark:to-zinc-800/10',
                stone: 'bg-gradient-to-r from-stone-800/50 to-stone-800/30 dark:from-stone-800/30 dark:to-stone-800/10',
                amber: 'bg-gradient-to-r from-amber-800/50 to-amber-800/30 dark:from-amber-800/30 dark:to-amber-800/10',
                brown: 'bg-gradient-to-r from-[#A52A2A]/50 to-[#A52A2A]/30 dark:from-[#A52A2A]/30 dark:to-[#A52A2A]/10',
                maroon: 'bg-gradient-to-r from-[#800000]/50 to-[#800000]/30 dark:from-[#800000]/30 dark:to-[#800000]/10',
                olive: 'bg-gradient-to-r from-[#808000]/50 to-[#808000]/30 dark:from-[#808000]/30 dark:to-[#808000]/10',
                navy: 'bg-gradient-to-r from-[#000080]/50 to-[#000080]/30 dark:from-[#000080]/30 dark:to-[#000080]/10',
                turquoise: 'bg-gradient-to-r from-[#40E0D0]/50 to-[#40E0D0]/30 dark:from-[#40E0D0]/30 dark:to-[#40E0D0]/10',
                coral: 'bg-gradient-to-r from-[#FF7F50]/50 to-[#FF7F50]/30 dark:from-[#FF7F50]/30 dark:to-[#FF7F50]/10',
                crimson: 'bg-gradient-to-r from-[#DC143C]/50 to-[#DC143C]/30 dark:from-[#DC143C]/30 dark:to-[#DC143C]/10',
                gold: 'bg-gradient-to-r from-[#FFD700]/50 to-[#FFD700]/30 dark:from-[#FFD700]/30 dark:to-[#FFD700]/10',
                none: 'ring-1 scale-90',
            },
            languages: [
                '英语',
                '汉语',
            ],
            translateApi: 'http://127.0.0.1/api/translate',
        }
    },

    addAttributes() {
        return {
            class: {
                default: "p-class"
            }
        }
    },

    onBeforeCreate: function () {
        if (this.storage.verbose) {
            console.log(this.storage.title, 'onBeforeCreate:setTranslateApi', this.options.translateApi);
        }

        this.storage.translateApi = this.options.translateApi;
    },

    addCommands() {
        return {
            setParagraph: () => ({ commands }) => {
                return commands.setNode(this.name)
            },

            setBackgroundColor: (color: string) => ({ commands }) => {
                return commands.updateAttributes(this.name, {
                    class: this.options.colorClass[color]
                })
            },

            setTranslateApi: (api: string) => ({ commands }) => {
                if (this.storage.verbose) {
                    console.log(this.storage.title, '⚙️ set translate api', api);
                }

                this.storage.translateApi = api;

                return true;
            },

            enableParagraphVerbose: () => ({ commands }) => {
                this.storage.verbose = true;
                return true;
            },

            disableParagraphVerbose: () => ({ commands }) => {
                this.storage.verbose = false;
                return true;
            },

            translate: (language: string) => ({ editor }: { editor: TiptapEditor }) => {
                if (!editor) {
                    console.error('No editor instance available');
                    return false;
                }

                const { selection } = editor.state;
                const { $from, $to } = selection;
                const node = $from.node();

                if (node.type.name !== this.name) {
                    console.error('Selected node is not a paragraph');
                    return false;
                }

                const assistant = this.editor.storage.assistant as AssistantStorage
                const start = $from.start();
                const end = $to.end();
                const content = editor.state.doc.textBetween(start, end, ' ');
                const debugTitle = this.storage.title;
                const url = assistant.chatApi;
                var originalTextDeleted = false
                var translatedText = '';
                var translatedNode: Node | null = null;
                var verbose = this.storage.verbose;

                this.editor.commands.chat({
                    url,
                    params: {
                        text: "翻译到" + language + "：" + content,
                    },
                    callback(message) {
                        if (!originalTextDeleted) {
                            editor.view.dispatch(editor.state.tr.delete(start, end));
                            originalTextDeleted = true;
                        }

                        if (verbose) {
                            console.log(debugTitle, '📤 翻译结果', message);
                        }

                        let previousLength = translatedNode?.nodeSize ?? 0;
                        translatedText += message;
                        translatedNode = editor.schema.text(translatedText);

                        editor.view.dispatch(editor.state.tr.replaceWith(
                            start,
                            start + previousLength,
                            translatedNode
                        ));
                    },
                    onError(error) {
                        console.warn(debugTitle, '翻译失败', error);
                        editor.commands.showAlert((error as Error).message, {
                            language,
                            api: url,
                        });
                    },
                    onEnd() {
                        if (verbose) {
                            console.log(debugTitle, '🎉 翻译结束。');
                        }
                    }
                });

                return true;
            },
        };
    },
});

export default SmartParagraph;

