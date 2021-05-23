export function stringIsEmpty(value: string) {
    if (!value) {
        return true;
    }
    else if (value === "") {
        return true;
    }
    return false;
}