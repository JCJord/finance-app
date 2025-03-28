import { CommonModule } from "@angular/common";
import { Component, Inject, inject } from "@angular/core";
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { FormGroup, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { ButtonComponent, TextInputComponent } from '@finance-teddy-app/ui';
import { NumberInputComponent } from '@finance-teddy-app/ui';
import { Client, ClientService, createClient, updateClient } from "../../clients";
import { Store } from "@ngrx/store";

@Component({
    selector: 'update-client-dialog',
    templateUrl: './update-client-dialog.html',
    imports: [CommonModule,  MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, ReactiveFormsModule, TextInputComponent, NumberInputComponent, ButtonComponent],
})
export class UpdateClientDialog {
    readonly dialogRef = inject(MatDialogRef<UpdateClientDialog>);

    updateClientForm = new FormGroup({
        id: new UntypedFormControl(''),
        name: new UntypedFormControl('', [Validators.required]),
        salary: new UntypedFormControl('', [Validators.required]),
        companyValuation: new UntypedFormControl('', [Validators.required]),
    })

    constructor(private clientService: ClientService, private store: Store, @Inject(MAT_DIALOG_DATA) private data: Client,
    ) {

    }

    ngOnInit() {
        if (this.data) {
          this.updateClientForm.patchValue({
            id: this.data.id,
            name: this.data.name,
            salary: this.data.salary,
            companyValuation: this.data.companyValuation
          });
        }
    }

    submit() {
        if (this.updateClientForm.valid) {
            const updatedClient = this.updateClientForm.value as Client;
            this.store.dispatch(updateClient({ client: updatedClient }));
            this.dialogRef.close();  // Close the dialog after submission
        }
    }
}