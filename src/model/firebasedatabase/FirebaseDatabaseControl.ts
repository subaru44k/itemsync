import { Item } from '../../item/item';
import { FirebaseCallback } from '../firebasecallback';

export interface FirebaseDatabaseControl {
  addItem(channelId: string, itemContent: string, itemCreatedBy: string);
  updateItem(channelId: string, item: Item, itemUpdatedBy: string);
  deleteItem(channelId: string, itemId: string);
  addChannel(channelName: string, itemUpdatedBy: string);
  getChannel(channelId: string);
  getChannels(limit: number);
  listenChannelChange(channelId: string, callback: FirebaseCallback);
}