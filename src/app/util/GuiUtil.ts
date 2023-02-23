import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { ErrorDialogComponent } from "../components/simple/error-dialog/error.dialog.component";
import { ProgressMonitorComponent } from "../components/simple/progress/progress.monitor/progress.monitor.infinite.component";

export class GuiUtil {

    public static setBorderToRed(elemntId: string): void {
        const element = (document.getElementById(elemntId)) as HTMLInputElement;
        if (element == null) {
            return;
        }
        element.style.borderColor = "red";
    }



    public static showErrorDialog(dialog: MatDialog, errorText: string, title?: string): MatDialogRef<ErrorDialogComponent> {
        if (!title) {
            title = "Error"
        }
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = { title: title, text: errorText };
        return dialog.open(ErrorDialogComponent, dialogConfig);
    }


    public static openProgressDialog(dialog: MatDialog): MatDialogRef<ProgressMonitorComponent> {
        return dialog.open(ProgressMonitorComponent);
    }

    public static closeProgressDialog(dialogRef: MatDialogRef<ProgressMonitorComponent>) {
        if (dialogRef) {
            return dialogRef.close();
        }
    }


}