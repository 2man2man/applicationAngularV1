import { StringUtil } from "src/app/util/StringUtil";
import { CellViewDefinition } from "./AbstractCellViewDefinition";

export class ArticleCellView implements CellViewDefinition {

    singleObjectToString(data: any): string {
        return data.number + " " + data.name;
    }
    arrayToString(data: any[]): string {
        let strings: string[] = [];
        data.forEach(element => {
            const singleString = this.singleObjectToString(element);
            strings.push(singleString);
        });
        return StringUtil.combineWithSeparator(", ", strings);
    }

}