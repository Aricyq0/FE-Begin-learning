// 设置本地存储内容
import "../dist/css/github-markdown.css";
import DOMPurify from "dompurify";
import ace from "ace-builds";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-cloud_editor_dark";

const marked = require("marked");

document.addEventListener("DOMContentLoaded", () => {
  const defaultInput = `# Markdown syntax guide

## Headers

# This is a Heading h1
## This is a Heading h2
###### This is a Heading h6

## Emphasis

*This text will be italic*  
_This will also be italic_

**This text will be bold**  
__This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
* Item 2a
* Item 2b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

## Images

![This is an alt text.](https://images.unsplash.com/photo-1444080748397-f442aa95c3e5?q=80&w=3132&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) 

## Links

You may be using [Markdown Live Preview](https://markdownlivepreview.com/).

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Tables

| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |

## Blocks of code

${"`"}${"`"}${"`"}
let message = 'Hello world';
alert(message);
${"`"}${"`"}${"`"}

## Inline code

This web site is using ${"`"}markedjs/marked${"`"}.
`;
  const editorMarkdown = localStorage.getItem("editorMarkdown") || defaultInput;

  /**************  markdown转html：Start************/
  const output = document.querySelector("#output");

  function markedToHtml(markdown) {
    const markedHtml = DOMPurify.sanitize(marked.parse(markdown));
    output.innerHTML = markedHtml;
  }

  /**************  markdown转html：End************/

  /************编辑器初始化及事件绑定：Start***********/
  const editor = ace.edit("editor");
  editor.renderer.setStyle("padding-top", "10px");
  editor.getSession().setUseWrapMode(true);
  editor.setOptions({
    maxLines: Infinity,
    mode: "ace/mode/markdown",
    theme: "ace/theme/cloud_editor_dark",
    fontSize: "16px",
    showPrintMargin: false,
    highlightActiveLine: true,
    indentedSoftWrap: false,
    autoScrollEditorIntoView: true,
    readOnly: false,
  });

  editor.addEventListener("change", () => {
    markedToHtml(editor.getValue());
    localStorage.setItem("editorMarkdown", editor.getValue());
  });
  // 编辑器元素赋值
  editor.setValue(editorMarkdown);
  // 预览框HTML赋值
  markedToHtml(editorMarkdown);

  /************  编辑器初始化及事件绑定：End***********/

  /************** 重置按钮事件绑定：Start************/
  const reset = document.querySelector("#reset");
  reset.addEventListener("click", () => {
    editor.setValue(defaultInput);
    markedToHtml(defaultInput);
    localStorage.setItem("editorMarkdown", defaultInput);
  });

  /**************  重置按钮事件绑定：End************/

  /**************  导出Markdown按钮事件绑定：Start************/
  const downloadMD = document.getElementById("exportMD").parentElement;

  downloadMD.addEventListener("click", () => {
    console.log("downloadMD");

    const markdown = editor.getValue();
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const a = document.createElement("a");
    const url = URL.createObjectURL(blob);
    a.href = url;
    a.download = "markdown.md";
    a.click();
    URL.revokeObjectURL(url);
  });

  /**************  导出Markdown按钮事件绑定：End************/

  /**************  导出PDF按钮事件绑定：Start(待完成)************/
  const downloadPDF = document.getElementById("exportPDF").parentElement;

  downloadPDF.addEventListener("click", () => {
    generatePDF(output, "document.pdf");
  });
  /**************  导出PDF按钮事件绑定：End************/
});
