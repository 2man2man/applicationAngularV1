
export class StringUtil {

    public static isEmpty(value: string): boolean {
        if (!value) {
            return true;
        }
        else if (value === "") {
            return true;
        }
        return false;
    }
}