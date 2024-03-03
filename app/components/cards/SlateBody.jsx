"use client"

import { Slate, Editable, withReact } from 'slate-react';
import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { createEditor } from 'slate';
import Image from 'next/image'; 
import Link from 'next/link';

const SlateBody = ({ data, trimEnd }) => {
  let bodyContent = <i> Loading </i>;

  const [isClient, setIsClient] = useState(false)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  const editor = useMemo(() => withReact(createEditor()), []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const renderElement = useCallback(props => <Element {...props} editor={editor} />, [editor]); // Include editor in the dependency array

  try {
    const slateData = JSON.parse(data.body);

    return (
      <div suppressHydrationWarning className="my-1 body text-ellipsis overflow-hidden" style={{maxHeight:trimEnd}}>
        
      <Link href={`/article/${data.id}`}>
        <Slate editor={editor} initialValue={slateData || [{ type: 'paragraph', children: [{ text: '' }] }]}>
          <Editable 
            readOnly
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        </Slate>
      </Link>
      
      </div>
    )

  } catch (error) {
    console.log("Error Fetching Data's Body:", error);
    return <div className="my-1 body text-ellipsis overflow-hidden" style={{maxHeight:trimEnd}}> <i>Error Fetching {"Data's"} Body.</i>; </div>
  } 

};

const Element = ({ attributes, children, element, editor }) => {
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes}>{children}</blockquote>;
    case 'bulleted-list':
      return <ul {...attributes}>{children} </ul>;
    case 'heading-one':
      return <span {...attributes}>{children} </span>;
    case 'heading-two':
      return <span {...attributes}>{children} </span>;
    case 'list-item':
      return <span {...attributes}>{children} </span>;
    case 'image':
      return <ImageElementReadOnly {...attributes} element={element} />;
    case 'link':
      return <LinkElementReadOnly {...attributes} element={element} />;
    default:
      return <span {...attributes}>{children}</span>;
  }
};

const ImageElementReadOnly = ({ attributes, element }) => {
  return (
    <> </>
  );
};

const LinkElementReadOnly = ({ attributes, children, element }) => {
  return (
    <i rel="noopener noreferrer" {...attributes}>
      {element.children[0].text}
    </i>
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

export default SlateBody;
