import { ObjectId } from 'mongodb';

export default function isObjectId(id: string): boolean {
  return ObjectId.isValid(id);
}