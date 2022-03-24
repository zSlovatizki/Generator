// import React from 'react';
// import ReactDOM from 'react-dom';
// import {Editor, EditorState} from 'draft-js';
 
// export  default function  Message (props) {
//   const [editorState, setEditorState] = React.useState("");
 
//   const editor = React.useRef(null);
 
//   function focusEditor() {
//     editor.current.focus();
//   }
 
//   React.useEffect(() => {
//     focusEditor()
//   }, []);
 
//   return (
//     <div onClick={focusEditor}>
//       <Editor
//         ref={editor}
//         editorState={editorState}
//         onChange={editorState => setEditorState(editorState)}
//       />
//     </div>
//   );
// }
