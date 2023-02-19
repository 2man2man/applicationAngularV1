import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { ErrorDialogComponent } from "../components/simple/error-dialog/error.dialog.component";

export class GuiUtil {

    public static setBorderToRed(elemntId: string): void {
        const element = (document.getElementById(elemntId)) as HTMLInputElement;
        if (element == null) {
            return;
        }
        element.style.borderColor = "red";
    }



    public static showErrorDialog(dialog: MatDialog, errorText: string, title?: string): void {
        if (!title) {
            title = "Error"
        }
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = { title: title, text: errorText };
        const dialogRef = dialog.open(ErrorDialogComponent, dialogConfig);
    }
}