'use strict'
import { MessageLog } from './../schemas'
const MessageLogModel = {
  save
}

export default MessageLogModel

async function save (log) {
  const messageLog = new MessageLog(log)
  return messageLog.save()
}
