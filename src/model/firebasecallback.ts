import { Item } from "../item/item";

export interface FirebaseCallback {
    onLocalItemAdded(item: Item);
    onLocalItemChanged(item: Item);
    onLocalItemDeleted(item: Item);
    onServerItemAdded(item: Item);
    onServerItemChanged(item: Item);
    onServerItemDeleted(item: Item);
}