export class LogisticExecutionStorageModel {

    public static readonly MAX_STOCK_QUANTITY = 1000000;

    storageExecutionId: number;
    fixedLocation: any;
    private _article: any;

    private _quantity: number = 1;

    toStoragePositionJson() {
        return {
            "articleId": this._article.id,
            "fixedLocationId": this.fixedLocation.id,
            "quantity": this.quantity
        }
    }

    public reset(): void {
        this.article = undefined;
        this.fixedLocation = undefined;
        this.quantity = 1;
    }

    public changeQuantity(changeValue: number) {
        this.quantity = this.quantity + changeValue;
    }

    public get quantity(): number {
        return this._quantity;
    }
    public set quantity(value: number) {
        value = Math.max(value, 1);
        value = Math.min(value, LogisticExecutionStorageModel.MAX_STOCK_QUANTITY);
        this._quantity = value;
    }

    public get article(): any {
        return this._article;
    }
    public set article(value: any) {
        this._article = value;
    }

    setFixedLocation(data: any): void {
        this.fixedLocation = data;
    }




}