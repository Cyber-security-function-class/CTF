import { validationResult } from 'express-validator';

export const resultsValidator = (req) => {
    const messages = []
    if (!validationResult(req).isEmpty()) {
        const errors = validationResult(req).array()
        for (const i of errors) {
        messages.push(i)
        }
    }
    return messages
}
