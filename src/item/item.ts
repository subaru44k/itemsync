export class Item {
    id: string;
    content: string;
    timestamp: string;

    constructor(id: string, content: string, timestamp: string) {
        this.id = id;
        this.content = content;
        this.timestamp = timestamp;
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

    isSame(item: Item) {
        return (this.id === item.getId());
    }
}