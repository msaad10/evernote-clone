import React, { useRef, useEffect } from 'react';
import TagInput from './TagInput';
import './RichTextEditor.css';

const RichTextEditor = ({ selectedNotebook, onContentChange, onAddTag, onRemoveTag }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && selectedNotebook) {
      // Store current selection
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(editorRef.current);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      const caretOffset = preCaretRange.toString().length;

      // Update content
      editorRef.current.innerHTML = selectedNotebook.content;

      // Restore cursor position
      let charCount = 0;
      const nodeStack = [editorRef.current];
      let node;
      let foundStart = false;
      let stop = false;

      while (!stop && (node = nodeStack.pop())) {
        if (node.nodeType === 3) {
          const nextCharCount = charCount + node.length;
          if (!foundStart && caretOffset >= charCount && caretOffset <= nextCharCount) {
            const range = document.createRange();
            range.setStart(node, caretOffset - charCount);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
            stop = true;
          }
          charCount = nextCharCount;
        } else {
          let i = node.childNodes.length;
          while (i--) {
            nodeStack.push(node.childNodes[i]);
          }
        }
      }
    }
  }, [selectedNotebook]);

  const handleContentChange = (e) => {
    if (editorRef.current && onContentChange) {
      onContentChange(editorRef.current.innerHTML);
    }
  };

  const handleFormat = (command) => {
    document.execCommand(command, false, null);
    handleContentChange();
  };

  return (
    <div className="rich-text-editor">
      <div className="editor-toolbar">
        <button 
          onClick={() => handleFormat('bold')} 
          title="Bold"
          className="format-button"
        >
          <strong>B</strong>
        </button>
        <button 
          onClick={() => handleFormat('italic')} 
          title="Italic"
          className="format-button"
        >
          <em>I</em>
        </button>
        <button 
          onClick={() => handleFormat('underline')} 
          title="Underline"
          className="format-button"
        >
          <u>U</u>
        </button>
        <button 
          onClick={() => handleFormat('insertUnorderedList')} 
          title="Bullet List"
          className="format-button"
        >
          • List
        </button>
      </div>
      <TagInput
        tags={selectedNotebook.tags}
        onAddTag={onAddTag}
        onRemoveTag={onRemoveTag}
      />
      <div
        ref={editorRef}
        className="editor-content"
        contentEditable
        onInput={handleContentChange}
        dir="ltr"
        style={{ textAlign: 'left' }}
        suppressContentEditableWarning={true}
        placeholder="Start writing..."
      />
    </div>
  );
};

export default RichTextEditor;