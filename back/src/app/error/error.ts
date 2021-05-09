import ErrorType from './types'
import ErrorMessage from './messages'

const getErrorMessage = (errorType: ErrorType) => {
    const response = { "errorType": errorType, "msg": ErrorMessage[errorType] }
    return response
}

export default getErrorMessage