import { Component, Input } from '@angular/core';
import { Location } from '@angular/common'

@Component({
    selector: 'cancel-confirm',
    templateUrl: './cancel.confirm.component.html',
    styleUrls: ['./cancel.confirm.component.less']
})
export class CancelConfirmComponent {

    @Input() saveFunction: () => void;

    @Input() cancelFunction: () => void;


    constructor(
        private location: Location
        // public dialogRef: MatDialogRef<ConfirmDialogComponent>,
        // @Inject(MAT_DIALOG_DATA) public data: any) { }

    ) { }

    public save(): void {
        this.saveFunction();
    }

    public cancel(): void {
        if (this.cancelFunction) {
            this.cancelFunction();
        } else {
            this.location.back();
        }
    }

}
