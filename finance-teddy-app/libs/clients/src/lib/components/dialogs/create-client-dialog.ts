import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { FormGroup, ReactiveFormsModule, UntypedFormControl, Validators } from '@angular/forms';
import { ButtonComponent, TextInputComponent } from '@finance-teddy-app/ui';
import { NumberInputComponent } from '@finance-teddy-app/ui';
import { Client, ClientService, createClient } from "../../clients";
import { Store } from "@ngrx/store";

@Component({
    selector: 'create-client-dialog',
    templateUrl: './create-client-dialog.html',
    imports: [CommonModule,  MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, ReactiveFormsModule, TextInputComponent, NumberInputComponent, ButtonComponent],
})
export class CreateClientDialog {
    readonly dialogRef = inject(MatDialogRef<CreateClientDialog>);

    addClientForm = new FormGroup({
        name: new UntypedFormControl('', [Validators.required]),
        salary: new UntypedFormControl('', [Validators.required]),
        companyValuation: new UntypedFormControl('', [Validators.required]),
    })

    constructor(private clientService: ClientService, private store: Store) {

    }

    submit() {
        if (this.addClientForm.valid) {
            const newClient = this.addClientForm.value as Client;
            this.store.dispatch(createClient({ client: newClient }));
            this.dialogRef.close();
        }
    }
}