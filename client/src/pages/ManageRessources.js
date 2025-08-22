import React from 'react';
import '../styles/ManageRessources.css';

const ManageRessources = () => {
  const folders = [
    { name: 'Documents', icon: '📄', isPrivate: true },
    { name: 'Images', icon: '🖼️', isPrivate: true },
    { name: 'Project Files', icon: '📂', isPrivate: true },
    { name: 'Document.docx', icon: '📄', isPrivate: false },
  ];

  const files = [
    { name: 'Document.docx', size: '1.8 MB', modified: '2018-11-30' },
  ];

  return (
    <div className="resources-container">
      <div className="sidebar">
        <button className="new-resource-btn">+ New Resource</button>
        <button className="back-btn">← Back</button>
        <nav>
          {folders.map((folder, index) => (
            <div key={index} className="folder-item">
              <span className="folder-icon">{folder.icon}</span>
              <span>{folder.name}</span>
              <span className="private-icon">{folder.isPrivate && '🔒'}</span>
              <span className="arrow-icon">›</span>
            </div>
          ))}
        </nav>
      </div>
      <div className="main-content">
        <div className="path-header">
          <h3>Home</h3>
        </div>
        <div className="file-list">
          {files.map((file, index) => (
            <div key={index} className="file-item">
              <div className="file-icon">📄</div>
              <div className="file-details">
                <span className="file-name">{file.name}</span>
                <span className="file-modified">Modified {file.modified}</span>
              </div>
              <span className="file-size">{file.size}</span>
              <button className="file-options-btn">⋮</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageRessources;