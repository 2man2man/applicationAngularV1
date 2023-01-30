export class GuiUtil {

    public static setBorderToRed(elemntId: string): void {
        const element = (document.getElementById(elemntId)) as HTMLInputElement;
        if (element == null) {
            return;
        }
        element.style.borderColor = "red";
    }
}