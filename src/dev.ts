import baseDoc from './dev/base';
import bigDoc from './dev/big';
import imageDoc from './dev/image';
import drawDoc from './dev/draw';
import docs from './dev/docs';
import pDoc from './dev/p';
import tocDoc from './dev/toc';
import miniDoc from './dev/mini';
import bulletListDoc from './dev/bulletList';
import aDoc from './dev/a';
import featureDoc from './dev/feature';
import tableDoc from './dev/table';
import editor from './main'

const div = document.createElement('div');
div.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
        padding: 5px;
        display: flex;
        justify-content: center;
        z-index: 500;
        background-color: rgba(255, 255, 255, 0.8);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    `;

// Add dark mode styles
const darkModeStyles = `
        @media (prefers-color-scheme: dark) {
            #dev-toolbar {
                background-color: rgba(50, 50, 50, 0.8) !important;
            }
            #dev-toolbar button {
                background-color: #444;
                color: #fff;
                border: 1px solid #666;
            }
            #dev-toolbar button:hover {
                background-color: #555;
            }
        }
    `;

const styleElement = document.createElement('style');
styleElement.textContent = darkModeStyles;
document.head.appendChild(styleElement);

div.id = 'dev-toolbar';

const buttons = [
    { text: '功能', onclick: () => editor.setHtml(featureDoc) },
    { text: '小型', onclick: () => editor.setHtml(miniDoc) },
    { text: '文档组', onclick: () => editor.setHtml(docs) },
    { text: '混合', onclick: () => editor.setHtml(baseDoc) },
    { text: '大型', onclick: () => editor.setHtml(bigDoc) },
    { text: '图片', onclick: () => editor.setHtml(imageDoc) },
    { text: '表格', onclick: () => editor.setHtml(tableDoc) },
    { text: '画图', onclick: () => editor.setHtml(drawDoc) },
    { text: '段落', onclick: () => editor.setHtml(pDoc) },
    { text: '链接', onclick: () => editor.setHtml(aDoc) },
    { text: '目录', onclick: () => editor.setHtml(tocDoc) },
    { text: '列表', onclick: () => editor.setHtml(bulletListDoc) },
    { text: 'TOC', onclick: () => editor.toggleToc() },
    { text: '只读/编辑', onclick: () => editor.toggleReadOnly() },
];

buttons.forEach(button => {
    const btn = document.createElement('button');
    btn.textContent = button.text;
    btn.onclick = button.onclick;
    div.appendChild(btn);
});

document.body.insertBefore(div, document.body.firstChild);

const title = "⛰️ Dev"

editor.onCreate(() => {
    console.log(title, 'create')

    editor.setTranslateApi('https://api.youdao.com/api')
    editor.setDrawLink('/draw/index.html')
})
