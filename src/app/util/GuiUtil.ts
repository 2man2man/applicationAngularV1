import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material/dialog";
import { ErrorDialogComponent } from "../components/simple/error-dialog/error.dialog.component";
import { ProgressDialogComponent } from "../components/simple/progress/dialog/progress.dialog.component";
import { SleepUtils } from "./SleepUtils";

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


    public static openProgressDialog(dialog: MatDialog): MatDialogRef<ProgressDialogComponent> {
        return dialog.open(ProgressDialogComponent);
    }

    public static showProgressDialogComplete(dialogRef: MatDialogRef<ProgressDialogComponent>, durationMS: number): Promise<any> {
        return Promise.resolve()
            .then(() => dialogRef.componentInstance.setComplete())
            .then(() => SleepUtils.sleep(durationMS));
    }

    public static closeProgressDialog(dialogRef: MatDialogRef<ProgressDialogComponent>) {
        if (dialogRef) {
            try {
                return dialogRef.close();
            } catch (error) {
                return dialogRef;
            }
        }
    }


}