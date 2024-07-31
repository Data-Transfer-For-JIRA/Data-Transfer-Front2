// import { EditorContext, WithEditorActions } from '@atlaskit/editor-core';
// import { ComposableEditor } from '@atlaskit/editor-core/composable-editor';
// import { createDefaultPreset } from '@atlaskit/editor-core/preset-default';

// const ADFEditor = () => {
//   const presetProps = {
//     props: {},
//   };
//   const defaultPreset = createDefaultPreset(presetProps);
//   const initialADFDocument = {
//     version: 1,
//     type: 'doc',
//     content: [
//       {
//         type: 'paragraph',
//         content: [{ type: 'text', text: 'Hello World!' }],
//       },
//     ],
//   };

//   return (
//     <EditorContext>
//       <WithEditorActions
//         render={(editorActions) => (
//           <ComposableEditor
//             preset={defaultPreset}
//             defaultValue={initialADFDocument}
//             onChange={async () => console.log('The current doc is: ', await editorActions.getValue())}
//           />
//         )}
//       />
//     </EditorContext>
//   );
// };
// export default ADFEditor