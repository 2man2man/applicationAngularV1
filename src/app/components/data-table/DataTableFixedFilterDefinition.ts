
export class DataTableFixedFilterDefinition {
  filterAttribute: string;
  fixedValueString: string;
  fixedValueNumber: number;

  public getValue(): any {
    if (this.fixedValueString) {
      return this.fixedValueString;
    }
    if (this.fixedValueNumber) {
      return this.fixedValueNumber;
    }
  }
}
