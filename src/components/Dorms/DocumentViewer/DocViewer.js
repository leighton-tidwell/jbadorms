import React from 'react';
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer';
import classes from './DocViewer.module.css';

const CustomDocViewer = ({ doc }) => {
  return (
    <DocViewer
      className={classes.reactDocViewer}
      pluginRenderers={DocViewerRenderers}
      documents={doc}
    />
  );
};

export default CustomDocViewer;
