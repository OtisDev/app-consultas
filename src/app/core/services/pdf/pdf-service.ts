import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import autoTable, { Table, UserOptions } from 'jspdf-autotable';
import { Expedient } from '../../../models/expedient.model';
import { getBase64From } from '../../../helpers/utils.helper';
import * as ExcelJS from 'exceljs';
import * as saveAs from 'file-saver';
import { formatDate } from '../../../helpers/utils.helper';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  async generateTablePdf(
    expHead: Expedient,
    headers: any[],
    data: any[],
    fileName: string = 'documento.pdf',
    autoSave: boolean = true,
    orientation: 'portrait' | 'landscape' = 'portrait',
  ): Promise<Blob> {

    const logoPath = 'assets/images/LOGO_reporte.png'; // Ruta al logo
    const logoBase64 = await getBase64From(logoPath);

    const doc = new jsPDF({
      orientation,
      unit: 'mm',
      format: 'a4'
    });

    const table = autoTable(doc, {
      head: [headers],
      body: data,
      headStyles: {
        fontSize: 7,
        halign: 'center',
        fillColor: [41, 128, 185],
        textColor: 255,
        minCellHeight: 4,
        lineColor: [255, 255, 255],
        lineWidth: 0.1,
        cellPadding: 1,
      },
      bodyStyles: {
        fontSize: 7,
        minCellHeight: 4,
        cellPadding: 1,
      },
      styles: {
        valign: 'middle'
      },
      theme: 'grid',
      tableWidth: 'auto',
      margin: { left: 5, right: 5, top: 60, bottom: 23 },
      didDrawPage: (dataArg) => {
        // Logo (ajusta tamaño y posición)

        if (logoBase64) {
          doc.addImage(logoBase64, 'PNG', 15, 6, 60, 18);
        }

        const pageCount = doc.getNumberOfPages();
        doc.setFontSize(7);
        const date = new Date().toLocaleString('es-ES');
        doc.text(`Fecha/Hora de impresión: ${date}`, doc.internal.pageSize.getWidth() - 55, 12);
        doc.text(`Página ${dataArg.pageNumber} de ${pageCount}`, doc.internal.pageSize.getWidth() - 20, 15);

        // Título centrado
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('HOJA DE RUTA DEL EXPEDIENTE', doc.internal.pageSize.getWidth() / 2, 25, { align: 'center' });

        autoTable(doc, {
          body: [
            [
              'Año',
              ':',
              expHead.ano_eje,
              'Expediente',
              ':',
              expHead.n_expediente,
              'Tipo de Doc.',
              ':',
              expHead.tipo_reg,
              'Fecha Doc.',
              ':',
              new Date(expHead.fecha_doc).toLocaleDateString('es-ES')
            ],
            [
              'Documento',
              ':',
              { content: `${expHead.document_type.nom_tipodoc}`, colSpan: 4 }, //${expHead.document_type.nom_tipodoc}
              'N° Doc.',
              ':',
              { content: expHead.siglas_doc, colSpan: 4 },
            ],
            //['Fecha Doc.', ':', new Date(expHead.fecha_reg).toLocaleDateString('es-ES'), '', '', '', '', '', ''],
            [
              'De',
              ':',
              { content: `${expHead.person.dniruc} - ${expHead.person.nombre}`, colSpan: 10 },
            ],
            [
              { content: 'Asunto' },
              { content: ':' },
              { content: expHead.asunto, colSpan: 10 },
            ]
          ],
          theme: 'plain', // grid|plain
          startY: 30,
          styles: { fontSize: 8, cellPadding: 0.8 },
          columnStyles: {
            0: { halign: 'right', fontStyle: 'bold', cellWidth: 17 },
            1: { cellWidth: 3 },
            2: { halign: 'left', cellWidth: 20 },
            3: { halign: 'right', fontStyle: 'bold', cellWidth: 17 },
            4: { cellWidth: 3 },
            5: { halign: 'left', cellWidth: 20 },
            6: { halign: 'right', fontStyle: 'bold', cellWidth: 19 },
            7: { cellWidth: 3 },
            8: { halign: 'left', cellWidth: 20 },
            9: { halign: 'right', fontStyle: 'bold', cellWidth: 17 },
            10: { cellWidth: 3 },
            11: { halign: 'left', cellWidth: 40 },
          }

        });

        doc.setFontSize(7);

        const text1 = `Documento generado por el Sistema de Tramite Documentario - Municipalidad Distrital de Nuevo Chimbote`;
        doc.text(text1, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 16, { align: 'center' });
        const textOfi = `Oficina de Tecnología de la Información y Sistemas`;
        doc.text(textOfi, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 12, { align: 'center' });
        const text2 = `Verificación: https://www.muninuevochimbote.gob.pe/std`;
        doc.text(text2, doc.internal.pageSize.getWidth() / 2, doc.internal.pageSize.getHeight() - 8, { align: 'center' });
      },
      columnStyles: {
        0: { cellWidth: 7 },
        1: { cellWidth: 10 },
        2: { cellWidth: 15 },
        3: { cellWidth: 40 },
        4: { cellWidth: 15 },
        5: { cellWidth: 40 },
        6: { cellWidth: 18 },
        7: { cellWidth: 19 },
        8: { cellWidth: 36 },
      }
    });

    if (autoSave) {
      doc.save(fileName);
    }

    const pdfBlob: Blob = doc.output("blob");
    return pdfBlob;
  }

  exportToExcel(data: Expedient[], fileName: string = 'export.xlsx'): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Añadir encabezados (ejemplo)
    worksheet.columns = [
      { header: 'AÑO', key: 'ano_eje', width: 10 },
      { header: 'EXPEDIENTE', key: 'n_expediente', width: 15 },
      { header: 'TIPO REG', key: 'tipo_reg', width: 15 },
      { header: 'TIPO MOVIMIENTO', key: 'tipo_mov_ie', width: 15 },
      { header: 'FECHA DOC.', key: 'fecha_reg', width: 20 },
      { header: 'CABECERA', key: 'siglas_doc', width: 35 },
      { header: 'ASUNTO', key: 'asunto', width: 70 },
      { header: 'AREA INICIO', key: 'idareaini', width: 70 },
      { header: 'AREA FINAL', key: 'idareafin', width: 70 },
      { header: 'ESTADO', key: 'idestado', width: 15 },
    ];

    worksheet.autoFilter = { from: 'B1', to: 'H1' };

    // Añadir datos
    data.forEach(item => {
      item.fecha_reg = formatDate(item.fecha_reg);
      item.tipo_reg = item.tipo_reg === 'O' ? 'ORIG.' : item.tipo_reg === 'C' ? 'COPIA' : '';
      item.tipo_mov_ie = item.tipo_mov_ie === 'I' ? 'INTERNO' : item.tipo_mov_ie === 'E' ? 'EXTERNO' : '';
      worksheet.addRow(item);
    });

    // Crear el buffer del archivo
    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs.saveAs(blob, fileName);
    });
  }

  async downloadBlob_(blob: Blob, fileName: string) {
    const buffer = await blob.arrayBuffer();
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.worksheets[0];
    worksheet.autoFilter = {
      from: 'A1',
      to: 'J1'
    };

    const headerRow = worksheet.getRow(1); // primera fila

    // Cambiar altura de fila
    headerRow.height = 25;

    // Cambiar estilo (opcional)
    headerRow.eachCell((cell, colNumber) => {
      cell.font = { bold: true, size: 11, color: { argb: 'FFFFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4472C4' }, // azul oscuro
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };

      const column = worksheet.getColumn(colNumber);
      switch (colNumber) {
        case 1: // AÑO
          column.width = 10;
          break;
        case 2: // EXPEDIENTE
        case 3: // TIPO REG
        case 4: // TIPO MOVIMIENTO
          column.width = 15;
          break;
        case 5: // FECHA DOC.
          column.width = 20;
          break;
        case 6: // CABECERA
          column.width = 35;
          break;
        case 7: // ASUNTO
          column.width = 70;
          break;
        case 8: // AREA INICIO
          column.width = 70;
          break;
        case 9: // AREA FIN
          column.width = 70;
          break;
        case 10: // ESTADO
          column.width = 15;
          break;
      }
    });



    // worksheet.columns.forEach((column) => {
    //   let maxLength = 10;
    //   column.eachCell?.({ includeEmpty: true }, (cell) => {
    //     const columnLength = cell.value ? cell.value.toString().length : 0;
    //     if (columnLength > maxLength) maxLength = columnLength;
    //   });
    //   column.width = maxLength + 3;
    // });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs.saveAs(blob, fileName);
    });

  }

  async downloadBlob(blob: Blob, fileName: string) {
    try {
      const arrayBuffer = await blob.arrayBuffer();
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer);

      const worksheet = workbook.worksheets[0];

      const headerRow = worksheet.getRow(1);
      headerRow.height = 20;

      headerRow.eachCell((cell, colNumber) => {
        cell.font = { bold: true, size: 11, color: { argb: 'FFFFFFFF' } };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: '4472C4' },
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };

        // Ajustar ancho de columna
        const column = worksheet.getColumn(colNumber);
        switch (colNumber) {
          case 1: column.width = 10; break;
          case 2:
          case 3:
          case 4: column.width = 15; break;
          case 5: column.width = 20; break;
          case 6: column.width = 35; break;
          case 7:
          case 8:
          case 9: column.width = 80; break;
          case 10: column.width = 15; break;
        }
      });

      // Evita mutar el workbook original de OpenSpout directamente
      // Crea uno nuevo y copia la hoja
      const newWorkbook = new ExcelJS.Workbook();
      const newWorksheet = newWorkbook.addWorksheet(worksheet.name);
      worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        const values = Array.isArray(row.values) ? row.values.slice(1) : [];
        newWorksheet.addRow(values);
      });

      // Vuelve a aplicar estilos solo a la cabecera
      const newHeader = newWorksheet.getRow(1);
      newHeader.height = 20;
      newHeader.eachCell((cell, colNumber) => {
        cell.font = { bold: true, size: 11, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4472C4' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };

        const column = newWorksheet.getColumn(colNumber);
        switch (colNumber) {
          case 1: column.width = 10; break;
          case 2:
          case 3: column.width = 15; break;
          case 4:
          case 5: column.width = 20; break;
          case 6: column.width = 35; break;
          case 7:
          case 8:
          case 9: column.width = 70; break;
          case 10: column.width = 15; break;
        }
      });

      // Guardar sin errores
      const buffer = await newWorkbook.xlsx.writeBuffer();
      saveAs.saveAs(new Blob([buffer]), fileName);
    } catch (error) {
      console.error('Error generando Excel:', error);
      throw error;
    }
  }
}
