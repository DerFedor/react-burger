
export type IIngredientType = {
    readonly __v: number;
    readonly _id: string;
    readonly calories: number;
    readonly carbohydrates: number;
    readonly fat: number;
    readonly image: string;
    readonly image_large: string;
    readonly image_mobile: string;
    readonly name: string;
    readonly price: number;
    readonly proteins: number;
    readonly type: string;
};

export interface ILocationState {
    from: {
        pathname: string;
        search: string;
        key: string;
        hash? : string
    };
}