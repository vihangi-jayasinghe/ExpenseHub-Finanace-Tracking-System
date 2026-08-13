import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export function exportStatementPDF({ title, filename, headers, rows, summaryLabel, summaryValue }) {
  const doc = new jsPDF()

  // 1. Branded Header
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.setTextColor(15, 23, 42) // slate-900
  doc.text('ExpenseHub', 14, 20)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(100, 116, 139) // slate-500
  doc.text('Personal Finance & Tracking Ledger', 14, 25)

  // Align date to the right side
  doc.setFont('helvetica', 'italic')
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 150, 20)

  // Header separator line
  doc.setDrawColor(226, 232, 240) // slate-200
  doc.setLineWidth(0.5)
  doc.line(14, 28, 196, 28)

  // 2. Metadata details
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(30, 41, 59) // slate-800
  doc.text(title, 14, 38)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(71, 85, 105) // slate-600
  doc.text(`Total Records: ${rows.length}`, 14, 46)
  doc.text(`${summaryLabel}: Rs.${summaryValue}`, 14, 52)

  // 3. Grid Table
  autoTable(doc, {
    startY: 60,
    head: [headers],
    body: rows,
    theme: 'striped',
    headStyles: {
      fillColor: [59, 130, 246], // blue-600
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold',
      halign: 'left'
    },
    bodyStyles: {
      textColor: [51, 65, 85], // slate-700
      fontSize: 9
    },
    columnStyles: {
      // Right-align last column (amount)
      [headers.length - 1]: { halign: 'right' }
    },
    styles: {
      overflow: 'linebreak',
      cellPadding: 4
    },
    didDrawPage: (data) => {
      // Footer page numbers
      const str = `Page ${doc.internal.getNumberOfPages()}`
      doc.setFont('helvetica', 'italic')
      doc.setFontSize(8)
      doc.setTextColor(148, 163, 184) // slate-400
      
      // Align right
      doc.text(str, 196 - doc.getTextWidth(str), 285)
      doc.text('Generated securely via ExpenseHub Finance Tracking System.', 14, 285)
    }
  })

  doc.save(filename)
}
