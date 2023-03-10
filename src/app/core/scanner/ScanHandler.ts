
export class ScanHandler {

    private static readonly FIXED_LOCATION_PREFIX: string = "FixedLocation_";


    private static readonly PREFIX: string = "zyx";
    private static readonly SUFFIX = "xyz";

    private scannedValue: string = "";
    private lastScannedTime: number | undefined;

    handleFixedLocationScan: (scannedCode: string) => void;

    public scanInput(input: string): void {

        if (!input) {
            return;
        }
        else if (input == "Shift") {
            return;
        }

        this.scannedValue = this.scannedValue + input;

        if (!this.checkIfScan()) {
            this.reset();
            return;
        }
        this.lastScannedTime = new Date().getTime();

        if (this.isScanFinished()) {
            this.callScanFinishedHooks();
            this.reset();
        }
    }

    private reset(): void {
        this.scannedValue = "";
        this.lastScannedTime = undefined;
    }

    private checkIfScan(): boolean {
        if (!this.checkPrefixSuffix()) {
            return false;
        }
        // if (!this.checkScanTime()) {
        //     return false;
        // }
        return true;
    }

    private checkScanTime(): boolean {
        if (!this.lastScannedTime) {
            return true;
        }
        let delay = new Date().getTime() - this.lastScannedTime;
        if (delay > 200) {
            return false;
        }
        return true;
    }

    private checkPrefixSuffix(): boolean {
        if (!this.scannedValue) {
            return false;
        }

        if (this.scannedValue.length <= 3) {
            const slicedPrefix = ScanHandler.PREFIX.slice(0, this.scannedValue.length)
            if (this.scannedValue == slicedPrefix) {
                return true;
            }
            return false;
        }
        return this.scannedValue.startsWith(ScanHandler.PREFIX);
    }


    private isScanFinished(): boolean {
        return this.scannedValue.endsWith(ScanHandler.SUFFIX);
    }

    private callScanFinishedHooks(): void { //TODO: remove prefix, sufix

        let stringToProvide = this.scannedValue.replace("zyx", "");
        stringToProvide = stringToProvide.replace("xyz", "");

        if (this.isFixedLocationScan(stringToProvide)) {
            stringToProvide = stringToProvide.substring(ScanHandler.FIXED_LOCATION_PREFIX.length + stringToProvide.lastIndexOf(ScanHandler.FIXED_LOCATION_PREFIX));
            if (this.handleFixedLocationScan) {
                this.handleFixedLocationScan(stringToProvide);
            }
            return;
        }
    }

    private isFixedLocationScan(input: string) {
        return input.includes(ScanHandler.FIXED_LOCATION_PREFIX);
    }

}