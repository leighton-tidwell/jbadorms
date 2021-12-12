import React from 'react';
import dynamic from 'next/dynamic';
import classes from './DocViewer.module.css';
import DocViewer, { MSDocRenderer } from 'react-doc-viewer';

const CustomDocViewer = ({ doc }) => {
  return (
    typeof window !== 'undefined' && (
      <DocViewer
        className={classes.reactDocViewer}
        pluginRenderers={[MSDocRenderer]}
        documents={doc}
      />
    )
  );
};

export default CustomDocViewer;
