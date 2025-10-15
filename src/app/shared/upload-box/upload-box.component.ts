import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload-box',
  standalone: true,
  templateUrl: './upload-box.component.html',
  styleUrl: './upload-box.component.scss'
})
export class UploadBoxComponent {
  @Output() fileSelected = new EventEmitter<File>();
  @ViewChild('fileInput', { static: true }) fileInput!: ElementRef<HTMLInputElement>;

  onChange() {
    const input = this.fileInput.nativeElement;
    const f = input.files?.[0];
    if (f) this.fileSelected.emit(f);
    input.value = '';
  }

  onDrop(e: DragEvent) {
    e.preventDefault();
    const f = e.dataTransfer?.files?.[0];
    if (f) this.fileSelected.emit(f);
    this.fileInput.nativeElement.value = '';
  }

  onDragOver(e: DragEvent) { e.preventDefault(); }
}