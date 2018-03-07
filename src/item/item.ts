export class Item {
    id: string;
    content: string;
    timestamp: string;
    createdBy: string;

    constructor(id: string, content: string, timestamp: string, createdBy: string) {
        this.id = id;
        this.content = content;
        this.timestamp = timestamp;
        this.createdBy = createdBy;
    }

    getId() {
        return this.id;
    }

    getContent() {
        return this.content;
    }

    getTimestamp() {
        return this.timestamp;
    }

    getCreatedBy() {
        return this.createdBy;
    }

    isSame(item: Item) {
        return (this.id === item.getId());
    }
}