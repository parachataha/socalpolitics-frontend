"use client";
import { Slate, Editable, withReact } from 'slate-react';
import { useMemo, useCallback, useEffect, useState } from 'react';
import { createEditor } from 'slate';
import Image from 'next/image'; // Import the Image component from next/image

const SlateBody = ({ data }) => {
  const [editor, setEditor] = useState(withReact(createEditor()));

  useEffect(() => {
    setEditor(withReact(createEditor()));
  }, []);

  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const renderElement = useCallback(props => <Element {...props} editor={editor} />, [editor]); // Include editor in the dependency array
  
  // let [slateData, setSlateData] = data.body;

    try {

      // useEffect(()=>{
      //   setSlateData(JSON.parse(data.body))
      //   console.log(slateData)
      // }, [data])

      return (
        <Slate editor={editor} initialValue={JSON.parse(data.body)}>
          <Editable 
            readOnly
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        </Slate>
      )
    } catch (error) {
      console.log("Error Fetching Data's Body:", error);
      return <p>Error Fetching {"Data's"} Body.</p>;
    }
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
      return <ImageElementReadOnly {...attributes} element={element} />;
    case 'link':
      return <LinkElementReadOnly {...attributes} element={element} />;
    default:
      return <span {...attributes}>{children}</span>;
  }
};

const ImageElementReadOnly = ({ attributes, element }) => {
  return (
    <div className="img-wrapper">
      <Image src={element.url} alt="Image" width={100} height={100} />
    </div>
  );
};

const LinkElementReadOnly = ({ attributes, children, element }) => {
  return (
    <a href={element.url} target="_blank" rel="noopener noreferrer" {...attributes}>
      {element.children[0].text}
    </a>
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
