export class Channel {
    id: string;
    name: string;
    owner: string;
    timestamp: string;

    constructor(id: string, name: string, owner: string, timestamp: string) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.timestamp = timestamp;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getTimestamp() {
        return this.timestamp;
    }

    isSame(channel: Channel) {
        return (this.id === channel.getId());
    }
}