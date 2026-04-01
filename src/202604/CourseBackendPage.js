import React from 'react';

function CourseBackendPage() {
  const message = "hello world + courseBackend.js";
  
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Course Backend</h1>
      <p style={{ fontSize: '24px', color: '#333' }}>{message}</p>
    </div>
  );
}

export default CourseBackendPage;
