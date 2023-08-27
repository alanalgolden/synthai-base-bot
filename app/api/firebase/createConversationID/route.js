import { v4 as uuidv4 } from "uuid";

export function createConversationId() {
  const uniqueId = uuidv4();
  return `${uniqueId}`;
}
