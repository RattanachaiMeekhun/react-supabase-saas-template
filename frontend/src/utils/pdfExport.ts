import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export interface ExportPDFOptions {
  filename?: string;
  quality?: number;
  format?: 'a4' | 'a3' | 'letter';
  orientation?: 'portrait' | 'landscape';
}

/**
 * Export a DOM element to PDF
 * @param element - The DOM element to export
 * @param options - Export options
 */
export const exportToPDF = async (
  element: HTMLElement,
  options: ExportPDFOptions = {}
): Promise<void> => {
  try {
    const {
      filename = 'dashboard-export.pdf',
      quality = 1,
      orientation = 'landscape'
    } = options;

    // Create canvas from element
    const canvas = await html2canvas(element, {
      scale: quality,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      removeContainer: true,
      logging: false,
      // Add foreign object rendering to handle modern CSS
      foreignObjectRendering: true,
      // Skip problematic elements
      ignoreElements: (element) => {
        // Ignore elements with certain classes if needed
        return element.classList.contains('no-export') ||
               element.tagName === 'IFRAME' ||
               element.tagName === 'OBJECT' ||
               element.tagName === 'EMBED';
      },
      // Override problematic CSS properties
      onclone: (clonedDoc) => {
        // Fix oklch colors by converting to fallback colors
        const style = clonedDoc.createElement('style');
        style.textContent = `
          * {
            color: rgb(0, 0, 0) !important;
            background-color: transparent !important;
          }
          .bg-white { background-color: #ffffff !important; }
          .bg-gray-50 { background-color: #f9fafb !important; }
          .bg-blue-600 { background-color: #2563eb !important; }
          .text-white { color: #ffffff !important; }
          .text-gray-600 { color: #4b5563 !important; }
          .text-gray-800 { color: #1f2937 !important; }
          .border-gray-300 { border-color: #d1d5db !important; }
          .shadow { box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1) !important; }
        `;
        clonedDoc.head.appendChild(style);
      }
    });

    const imgData = canvas.toDataURL('image/png');
    
    // Calculate dimensions
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    
    // Create PDF
    const pdf = new jsPDF({
      orientation,
      unit: 'px',
      format: [imgWidth, imgHeight]
    });

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    
    // Save PDF
    pdf.save(filename);
    
    console.log('PDF exported successfully');
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw new Error('Failed to export PDF');
  }
};

/**
 * Export dashboard with specific styling for better PDF output
 */
export const exportDashboardToPDF = async (
  elementId: string,
  options: ExportPDFOptions = {}
) => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    throw new Error(`Element with ID "${elementId}" not found`);
  }

  // Temporarily modify styles for better PDF output
  const originalStyles = {
    overflow: element.style.overflow,
    height: element.style.height,
    maxHeight: element.style.maxHeight
  };

  // Set styles for PDF export
  element.style.overflow = 'visible';
  element.style.height = 'auto';
  element.style.maxHeight = 'none';

  try {
    await exportToPDF(element, {
      filename: 'dashboard.pdf',
      quality: 2,
      orientation: 'portrait',
      ...options
    });
  } finally {
    // Restore original styles
    element.style.overflow = originalStyles.overflow;
    element.style.height = originalStyles.height;
    element.style.maxHeight = originalStyles.maxHeight;
  }
};
