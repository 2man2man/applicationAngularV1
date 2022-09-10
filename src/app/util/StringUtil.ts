
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
}