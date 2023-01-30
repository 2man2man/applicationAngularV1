
export class StringUtil {

    public static isEmpty(value: string | undefined): boolean {
        if (!value) {
            return true;
        }
        else if (value === "") {
            return true;
        }
        return false;
    }

    public static combineWithSeparator(separator: string, strings: string[]): string {
        return strings.join(separator);
    }
}