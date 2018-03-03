import { conditionalExpression } from "babel-types";

export class Item {
    id: string;
    content: string;

    constructor(id: string, content: string) {
        this.id = id;
        this.content = content;
    }

    getId() {
        return this.id;
    }

    getContent() {
        return this.content;
    }

    isSame(item: Item) {
        return (this.id === item.getId());
    }
}