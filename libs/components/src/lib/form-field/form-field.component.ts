import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ValidationService } from '@todo/services';

@Component({
  selector: 'lib-form-field',
  standalone: true,
  imports: [CommonModule, InputTextModule, FormsModule, ReactiveFormsModule, FloatLabelModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss',
  providers: [ValidationService],
})
export class FormFieldComponent {
  @Input() label!: string;
  @Input() fieldName!: string;
  @Input() formGroup!: FormGroup;
  @Input() isDisabled!: FormGroup;

  constructor(private validation: ValidationService) { }

  get isInvalid() {
    const control = this.formGroup.get(this.fieldName) as FormControl;
    return this.validation.isInvalid(control);
  }

  get errorMessage(): string {
    const control = this.formGroup.get(this.fieldName) as FormControl;
    return this.validation.getErrorMessage(control);
  }

  get classLabel() {
    return {
      'label-valid': !this.isInvalid,
      'label-invalid': this.isInvalid,
    };
  }

  get classFilled(): { [key: string]: boolean } {
    const isFilled = this.formGroup.get(this.fieldName)?.value !== '';
    return { 'p-filled': isFilled };
  }
}
