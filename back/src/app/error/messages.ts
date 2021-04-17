import ErrorType from './types'

const errorMessages = {
    [ErrorType.UnexpectedError]: "An unexpected error occurred.",
    [ErrorType.ValidationError]: "The data you sent is not valid.",
    [ErrorType.LoginFailed]: "Login failed.",
    [ErrorType.AccessDenied]: "Access denied.",
    [ErrorType.AlreadyExist] : "This value already exists.",
    [ErrorType.NotExist] : "Not Exist."
}

export default errorMessages