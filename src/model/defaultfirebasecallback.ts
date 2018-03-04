import { FirebaseCallback } from "./FirebaseCallback";
import { Item } from "../item/item";

export class DefaultFirebaseCallback implements FirebaseCallback {
    itemHolder: Item[];

    constructor(itemHolder: Item[]) {
        this.itemHolder = itemHolder;
    }

    onLocalItemAdded(item: Item) {
        this.itemHolder.push(item);
    }

    onLocalItemChanged(item: Item) {
        this.itemHolder.some((v: Item, i: number) => {
            if (v.isSame(item)) {
                this.itemHolder.splice(i, 1, item);
                return true;
            }
            return false;
        })
    }

    onLocalItemDeleted(item: Item) {
        this.itemHolder.some((v: Item, i: number) => {
            if (v.isSame(item)) {
                this.itemHolder.splice(i, 1);
                return true;
            }
            return false;
        });
    }

    onServerItemAdded(item: Item) {
        this.itemHolder.push(item);
    }

    onServerItemChanged(item: Item) {
        this.itemHolder.some((v: Item, i: number) => {
            if (v.isSame(item)) {
                this.itemHolder.splice(i, 1, item);
                return true;
            }
            return false;
        })
    }

    onServerItemDeleted(item: Item) {
        this.itemHolder.some((v: Item, i: number) => {
            if (v.isSame(item)) {
                this.itemHolder.splice(i, 1);
                return true;
            }
            return false;
        });
    }

}