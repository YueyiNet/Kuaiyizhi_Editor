# JuiceEditor

![JuiceEditor](./docs/hero.png)

A powerful rich text editor which name comes from a Chinese word "聚思" (gather your thoughts).

Currently still under development and not yet stable.

## Quick Start

### JavaScript/TypeScript

1. Install JuiceEditor

```bash
npm install @coffic/juice-editor
```

2. Use JuiceEditor in your project

```js
import { EditorFactory, Editor } from '@coffic/juice-editor'

const editor = EditorFactory.register('my-editor', {
    onBeforeCreate: () => {
        console.log('onBeforeCreate for label my-editor')
    },
    onCreate: (editor: Editor) => {
        console.log('onCreate for label my-editor')
        editor.enableLog()
    }
})

// When you type 'editor.', the IDE will suggest available APIs
```

3. Use in your template

```html
<my-editor></my-editor>
```

### Swift Package

<https://github.com/CofficLab/JuiceEditorKit>

## Documentation

<https://cofficlab.github.io/en/juiceEditor/>

## Playground

<https://cofficlab.github.io/JuiceEditor-Playground/>

## Related Projects

-   [JuiceEditorKit](https://github.com/CofficLab/JuiceEditorKit)
-   [JuiceEditor-Playground](https://github.com/cofficlab/JuiceEditor-Playground)
-   [JuiceEditor-Examples](https://github.com/cofficlab/JuiceEditor-Examples)

## Products based on JuiceEditor

-   [KuaiYiZhi APP](https://apps.apple.com/cn/app/%E5%BF%AB%E6%98%93%E7%9F%A5/id6457892799)
-   [KuaiYiZhi](https://www.kuaiyizhi.cn)

## Built based on the following projects

-   [Draw.io](https://github.com/jgraph/drawio)
-   [TailwindCSS](https://tailwindcss.com/)
-   [Vue3](https://v3.vuejs.org/)
-   [Tiptap](https://tiptap.dev/)
-   [Heroicons](https://heroicons.com)
-   [RemixIcon](https://remixicon.com)

## NPM Packages

-   [juice-editor](https://www.npmjs.com/package/@coffic/juice-editor)
-   [juice-editor-draw](https://www.npmjs.com/package/@coffic/juice-editor-draw)

## Maintainer

Work for Joy & Live for Love ➡️ <https://github.com/nookery>

## Contributing

Show your ❤️ by ⭐️ing this repository! It means a lot.

Clone the repo, do something, make a PR.

Looking forward to your PRs, you amazing ideas.

## License

JuiceEditor is released under a dual license:

1. For non-commercial use: [MIT License](LICENSE)
2. For commercial use or modifications: Please [contact the author](https://github.com/nookery) for a commercial license.

Any use of this software for commercial purposes or any modifications to the source code require explicit permission from the author.
