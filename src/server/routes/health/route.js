import { statusCodes } from '#server/common/constants/status-codes.js'

// Health-check route. Used by platform to check if service is running, do not remove!
export function GET(_request, h) {
  return h.response({ message: 'success' }).code(statusCodes.ok)
}
