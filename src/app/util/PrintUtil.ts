export class PrintUtils {


    public static openBase64PdfInNewWindow(base64: string): void {
        const bytes = base64ToByteArray(base64);
        const pdfUrl = byteArrayToUrl(bytes, "application/pdf");
        openPdfInNewWindow(pdfUrl);
    }


}

function base64ToByteArray(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
}

function byteArrayToUrl(bytes: Uint8Array, mimeType: string): string {
    const blob = new Blob([bytes], { type: mimeType });
    return URL.createObjectURL(blob);
}

function openPdfInNewWindow(pdfUrl: string): void {
    const win = window.open(pdfUrl, '_blank');
    if (win) {
        win.focus();
    }
}