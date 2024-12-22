// Utility function to validate file type and size
export const validateFile = (file) => {
    const allowedTypes = [
      'application/pdf', 'image/jpeg', 'image/png', 'text/plain', 'text/csv',
      'text/html', 'application/json', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel', 'audio/mpeg', 'application/zip',
    ];
    const maxFileSize = 12 * 1024 * 1024; // 10MB max size
  
    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      return 'Invalid file type. Please upload a supported file type (e.g., PDF, JPG, PNG).';
    }
  
    // Validate file size
    if (file.size > maxFileSize) {
      return 'File is too large. Please upload a file smaller than 12MB.';
    }
  
    return null; // No error
  };
  
