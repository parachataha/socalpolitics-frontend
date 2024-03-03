"use client"

import React, { useCallback, useMemo, useState, useRef, useEffect } from 'react';
import { Editable, withReact, Slate, useSlate, ReactEditor } from 'slate-react';
import { createEditor, Editor, Transforms, Range, Path } from 'slate';
import { withHistory } from 'slate-history';
import { FaBold, FaUnderline, FaCode, FaItalic, FaImage, FaRegTrashAlt, FaLink } from 'react-icons/fa';
import { LuHeading1, LuHeading2 } from 'react-icons/lu';

const HOTKEYS = {
  'mod+shift+1': 'heading-one',
  'mod+shift+2': 'heading-two',
  'mod+opt': 'code',
  'mod+alt': 'code',
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+shift+i': 'insert-image',
  'mod+shift+a': 'insert-link',
};

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const RichTextEditor = ( {value, onChange} ) => {
  const [body, setBody] = useState(value);

  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  
  const renderElement = useCallback(props => <Element {...props}  editor={editor}/>, []);

  const insertImage = (editor, url) => {
    const text = { text: '' };
    const image = { type: 'image', url, children: [text] };
    const paragraph = { type: 'paragraph', children: [{ text: '' }] };
  
    // Insert the image and a new undeletable paragraph
    Transforms.insertNodes(editor, [image, paragraph]);
  
    // Move the selection to the end of the new paragraph
    // Transforms.select(editor, Editor.end(editor, paragraph));
  };

  const insertLink = (editor) => {
    const url = prompt('Enter the link URL:');
    const text = prompt('Enter the link display text:');

    if (url && text) {
      const link = { type: 'link', url, children: [{ text }] };
      const paragraphBefore = { type: 'paragraph', children: [{ text: ' ' }] };
      const paragraphAfter = { type: 'paragraph', children: [{ text: ' ' }] };

      // Insert the paragraphs and link between them
      Transforms.insertNodes(editor, [paragraphBefore, link, paragraphAfter], { at: editor.selection || null });
      Transforms.move(editor);

      // Move to the beginning of the editor if the selection is collapsed
      if (Range.isCollapsed(editor.selection)) {
        Transforms.select(editor, Editor.start(editor, []));
      }
    }
  };
  
  const handleEditorChange = (value) => {
    setBody(value);
    onChange(value);
  };

  return (
    <Slate editor={editor} initialValue={initialValue}>
      <div className='toolbar flex gap-3'>
        <div className='action' onClick={() => toggleMark(editor, 'bold')}>
          <FaBold />
        </div>
        <div className='action' onClick={() => toggleMark(editor, 'italic')}>
          <FaItalic />
        </div>
        <div className='action' onClick={() => toggleMark(editor, 'underline')}>
          <FaUnderline />
        </div>
        <div className='action codeblock' onClick={() => toggleMark(editor, 'code')}>
          <FaCode />
        </div>
        <div className='action header-one' onClick={() => toggleBlock(editor, 'heading-one')}>
          <LuHeading1 />
        </div>
        <div className='action header-two' onClick={() => toggleBlock(editor, 'heading-two')}>
          <LuHeading2 />
        </div>
        <div className='action image' onClick={() => insertImage(editor, prompt('Enter the image URL:'))}>
          <FaImage />
        </div>
        <div className='action link' onClick={() => insertLink(editor)}>
          <FaLink />
        </div>
      </div>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder=''
        spellCheck
        onKeyDown={(event) => {
          const { selection } = editor;

          const content = Array.from(Editor.nodes(editor), ([node]) => node);
          handleEditorChange(content)

          if (event.key === 'Enter') {
            // Handle Enter key
            if (selection && 'collapsed' in selection && selection.collapsed) {
              const [start] = Range.edges(selection);
              const point = Editor.point(editor, start, { edge: 'start' });
              const [node] = Editor.node(editor, point.path);

              // Separate image and link logic
              if (node && node.type === 'image') {
                const newLine = { type: 'paragraph', children: [{ text: '' }] };
                Transforms.insertNodes(editor, newLine, { at: Editor.after(editor, point.path) });
                Transforms.select(editor, Editor.start(editor, Editor.after(editor, point.path)));
                return;
              }
            }
          }

          if (event.key.startsWith('Arrow')) {
            // Handle Arrow keys
            if (selection && 'collapsed' in selection && selection.collapsed) {
              const [start] = Range.edges(selection);
              const point = Editor.point(editor, start, { edge: 'start' });
              const [node] = Editor.node(editor, point.path);

              // Separate link and paragraph logic
              if (node && node.type === 'link') {
                const targetPath = event.key === 'ArrowLeft' ? Editor.before(editor, point.path) : Editor.after(editor, point.path);
                Transforms.select(editor, targetPath);
                event.preventDefault();
                return;
              }
            }
          }

          for (const hotkey in HOTKEYS) {
            if (isHotkey(hotkey, event)) {
              const mark = HOTKEYS[hotkey];
              if (mark === 'image') {
                insertImage(editor, mark);
              } else if (mark === 'insert-link') {
                insertLink(editor);
              } else {
                toggleMark(editor, mark);
              }
            } else {
              const mark = '';
              toggleMark(editor, mark);
            }
          }
        }}
      />


    </Slate>
  );
};

const Element = ({ attributes, children, element, editor }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'heading-one':
      return <h2 {...attributes}>{children}</h2>;
    case 'heading-two':
      return <h3 {...attributes}>{children}</h3>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'image':
      return <ImageElement editor={editor} attributes={attributes} element={element} />;
    case 'link':
      return (
        <LinkElement editor={editor} element={element}>
          {children}
        </LinkElement>
      );
    default:
      return <span {...attributes}>{children}</span>;
  }
};

const ImageElement = ({ attributes, element, editor }) => {
  const [hidden, setHidden] = useState(false);
  const imageRef = useRef();

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const newLine = { type: 'paragraph', children: [{ text: '' }] };
      Transforms.insertNodes(editor, newLine, { at: Editor.end(editor, []) });
    } else if (event.key.startsWith('Arrow')) {
      event.preventDefault();
      // Move the focus to a neighboring text element (above or below the image)
      const [, path] = Editor.node(editor, imageRef.current);
      const isArrowUp = event.key === 'ArrowUp';
      const isArrowDown = event.key === 'ArrowDown';
      const targetPath = isArrowUp ? Editor.before(editor, path) : isArrowDown ? Editor.after(editor, path) : null;
      if (targetPath) {
        const [, targetNode] = Editor.node(editor, targetPath);
        Transforms.select(editor, targetPath);
        event.preventDefault();
      }
    }
  };

  useEffect(() => {
    if (imageRef.current) {
      // Ensure the image is not editable
      const imageNode = imageRef.current;
      imageNode.contentEditable = false;
      // Focus on the parent element to make arrow keys work
      const parentElement = imageNode.parentElement;
      parentElement.contentEditable = true;
      parentElement.focus();
    }
  }, [imageRef.current]);

  const handleDelete = () => {
    Transforms.removeNodes(editor, { at: ReactEditor.findPath(editor, element) });
  };
  

  return (
    <div
      ref={imageRef}
      className={`img-wrapper ${hidden && 'hidden'}`}
      {...attributes}
      onKeyDown={handleKeyDown}
      contentEditable={false}
    >
      <div>
        {element.children && element.children.length === 0 ? (
          <span>&nbsp;</span>
        ) : (
          <img src={element.url} alt='Inserted Image' />
        )}
        <div className='cursor-pointer' onClick={handleDelete}>
          <FaRegTrashAlt className='img-delete' />
        </div>
      </div>
    </div>
  );
};

const LinkElement = ({ attributes, children, element, editor }) => {
  const [hidden, setHidden] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === 'Delete' && Range.isCollapsed(editor.selection)) {
      event.preventDefault();
      setHidden(true); // Hide the link instead of crashing
    }
  };

  const handleClick = () => {
    Transforms.removeNodes(editor, { at: ReactEditor.findPath(editor, element) });
  };
  

  return (
    <>
      {!hidden && (
        <a
          className={`link-wrapper ${hidden && 'hidden'}`}
          target='_blank'
          href={element.url}
          {...attributes}
          onKeyDown={handleKeyDown}
          style={{ display: 'inline', textDecoration: 'none' }}
          onClick={handleClick}
        >
          <span className='link-text' style={{ textDecoration: 'underline' }}>{children}</span>
          <span className='link-url'>({element.url})</span>
        </a>
      )}
    </>
  );
};


const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });

  return !!match;
};

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);

  for (const type of LIST_TYPES) {
    Transforms.unwrapNodes(editor, { match: (n) => n.type === type, split: true });
  }

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : format,
  });

  if (!isActive && LIST_TYPES.includes(format)) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const isHotkey = (hotkey, event) => {
  const hotkeyArray = hotkey.split('+');
  const isKeyMatch = (key) => {
    if (key === 'mod') return event.metaKey || event.ctrlKey;
    return event.key.toLowerCase() === key;
  };
  return hotkeyArray.every(isKeyMatch);
};

const initialValue = [
  {
    type: 'heading-one',
    children: [{ text: 'Welcome to your article editor!' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'You can add ' },
      { text: 'bold,', bold: true },
      { text: ' ' },
      { text: 'underline,', underline: true },
      { text: ' and ' },
      { text: 'italics', italic: true },
      { text: '. You can also use them ' },
      { text: 'all together!', bold: true, italic: true, underline: true },
      { text: ' Delete this to get started!' },
      { text: ' PS: You can use cmd or control keys to speed up your typing!' },
    ],
  },
];

export default RichTextEditor;
