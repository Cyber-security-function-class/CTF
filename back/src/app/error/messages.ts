import ErrorType from './types'

const errorMessages = {
    [ErrorType.UnexpectedError]: "An unexpected error occurred.",
    [ErrorType.NicknameExists]: "The user with the nickname already exists.",
    [ErrorType.EmailExist] : "The use with the email already exists.",
    [ErrorType.ValidationError]: "The data you sent is not valid.",
    [ErrorType.LoginFailed]: "Login failed."
}

export default errorMessages