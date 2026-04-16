import { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import './Admin.css';

/**
 * PdfUploader — drag & drop or click to upload a PDF to Supabase Storage.
 * Returns the public URL via onUpload(url).
 */
export default function PdfUploader({ currentUrl, onUpload, projectId }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      setError('Only PDF files are supported.');
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError('File too large. Max 20MB.');
      return;
    }

    setError('');
    setUploading(true);
    setProgress(10);

    try {
      const fileName = `${projectId || 'brochure'}-${Date.now()}.pdf`;
      const path = `brochures/${fileName}`;

      setProgress(40);

      const { error: uploadError } = await supabase.storage
        .from('brochures')
        .upload(path, file, { contentType: 'application/pdf', upsert: true });

      if (uploadError) throw uploadError;

      setProgress(80);

      const { data } = supabase.storage.from('brochures').getPublicUrl(path);
      const publicUrl = data.publicUrl;

      setProgress(100);
      onUpload(publicUrl);
    } catch (err) {
      setError(`Upload failed: ${err.message}. Make sure you've run the storage SQL in Supabase.`);
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);
  const onInputChange = (e) => handleFile(e.target.files[0]);

  return (
    <div className="pdf-uploader">
      {/* Drop zone */}
      <div
        className={`pdf-drop-zone${dragging ? ' pdf-drop-zone--active' : ''}${uploading ? ' pdf-drop-zone--uploading' : ''}`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => !uploading && inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          style={{ display: 'none' }}
          onChange={onInputChange}
        />
        {uploading ? (
          <div className="pdf-drop-zone__uploading">
            <div className="pdf-progress-bar">
              <div className="pdf-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <p>Uploading... {progress}%</p>
          </div>
        ) : (
          <>
            <span className="pdf-drop-zone__icon">📄</span>
            <p className="pdf-drop-zone__text">
              <strong>Drag & drop a PDF here</strong><br />
              or click to browse
            </p>
            <p className="pdf-drop-zone__hint">PDF only · Max 20MB</p>
          </>
        )}
      </div>

      {/* Error */}
      {error && <p className="pdf-error">{error}</p>}

      {/* Current file */}
      {currentUrl && !uploading && (
        <div className="pdf-current">
          <span className="pdf-current__icon">✓</span>
          <div className="pdf-current__info">
            <p className="pdf-current__label">Current brochure</p>
            <a href={currentUrl} target="_blank" rel="noopener noreferrer" className="pdf-current__link">
              View PDF ↗
            </a>
          </div>
          <button
            type="button"
            className="admin-remove-btn"
            onClick={() => onUpload('')}
            title="Remove brochure"
          >✕</button>
        </div>
      )}
    </div>
  );
}
