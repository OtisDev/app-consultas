import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared-module';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PdfService } from '../../../core/services/pdf/pdf-service';
import { Expedient, ExpedientRequest } from '../../../models/expedient.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { formatDate } from '../../../helpers/utils.helper';
import { ExpedientService } from '../../../core/services/expedient/expedient-service';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';

@Component({
  selector: 'app-modal-view-pdf',
  imports: [SharedModule, PdfJsViewerModule],
  templateUrl: './modal-view-pdf.html',
  styleUrl: './modal-view-pdf.css'
})
export class ModalViewPdf {

  pdfUrl!: SafeResourceUrl
  readonly data = inject<Expedient>(MAT_DIALOG_DATA);
  pdf!: Blob;

  constructor(
    private sanitizer: DomSanitizer,
    private pdfService: PdfService,
    private expedientService: ExpedientService
  ) { }

  ngOnInit(): void {
    this.getExpedientHistory();
  }

  getExpedientHistory() {

    const request: ExpedientRequest = {
      anio: this.data.ano_eje,
      codigo: this.data.n_expediente.toString()
    }

    this.expedientService.getExpedientHistory(request).subscribe(response => {
      if (!response.success) {
        Swal.fire('Error', response.message, 'error');
        return;
      }

      const index = response.data.length - 1;
      const expediente: Expedient = response.data[index];
      expediente.tipo_reg = expediente.tipo_reg == 'C' ? 'COPIA' : 'ORIGINAL';
      const data: any[] = response.data.map((expedient: Expedient, index) => ([
        expedient.n_registro.toString(),
        expedient.tipo_reg == 'C' ? 'COPIA' : 'ORIG.',
        formatDate(expedient.fecha_registro),
        expedient.idareaini || '',
        formatDate(expedient.fecha_envio),
        expedient.idareafin || '',
        expedient.idestado || '',
        expedient.user_reg || '',
        expedient.parasu || ''
      ]));

      this.generatePdf(data, expediente);

    });


  }

  private async generatePdf(data: Expedient[], expediente_header: Expedient) {

    const head = [
      { content: 'Tipo Reg.', colSpan: 2 },
      'Fecha Reg.',
      'Área Origen',
      'Fecha Envio',
      'Área Destino',
      'Estado',
      'Usuario',
      'Documento/Observación'
    ];
    const document_title = `hoja_de_ruta_expediente_${expediente_header.ano_eje}-${expediente_header.n_expediente}.pdf`;
    this.pdf = await this.pdfService.generateTablePdf(expediente_header, head, data, document_title, false);

    const blobUrl = URL.createObjectURL(this.pdf);

    this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);

  }

  ngOnDestroy(): void {
    if (this.pdf) {
      URL.revokeObjectURL(this.pdfUrl as string);
    }
  }

}
