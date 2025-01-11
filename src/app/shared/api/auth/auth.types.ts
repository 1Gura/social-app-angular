
/** Сообщение для отправки данных для логина */
export interface LoginRequest {
  /** Имя пользователя */
  username: string;
  /** Пароль пользователя */
  password: string;
  email?: string | undefined;
}

/** Сообщение для ответа на запрос логина */
export interface LoginResponse {
  /** Токен для аутентификации (JWT или другой) */
  accessToken: string;
  /** Рефреш-токен для обновления доступа */
  refreshToken: string;
  /** Успешность логина */
  success: boolean;
  /** Сообщение об ошибке или успехе */
  message: string;
  user: UserInfoRequest | undefined;
}

/** Сообщение для регистрации нового пользователя */
export interface RegisterRequest {
  /** Имя пользователя */
  username: string;
  /** Пароль */
  password: string;
  /** Электронная почта */
  email: string;
}

/** Ответ на запрос регистрации */
export interface RegisterResponse {
  /** Успешность регистрации */
  success: boolean;
  /** Сообщение об ошибке или успехе */
  message: string;
  /** токен */
  accessToken: string;
  /** Рефреш-токен для обновления доступа */
  refreshToken: string;
  user: UserInfoRequest | undefined;
}

/** Сообщение для проверки токена */
export interface CheckTokenRequest {
  /** Токен для проверки */
  token: string;
}

/** Ответ на запрос проверки токена */
export interface CheckTokenResponse {
  /** Является ли токен действительным */
  valid: boolean;
  /** Сообщение о статусе токена */
  message: string;
}

/** Сообщение для запроса на выход (logout) */
export interface LogoutRequest {
  /** Токен, который нужно отозвать */
  token: string;
}

/** Ответ на запрос выхода */
export interface LogoutResponse {
  /** Успешность выхода */
  success: boolean;
  /** Сообщение */
  message: string;
}

/** Сообщение для изменения пароля */
export interface ChangePasswordRequest {
  /** Имя пользователя */
  username: string;
  /** Старый пароль */
  oldPassword: string;
  /** Новый пароль */
  newPassword: string;
}

/** Ответ на запрос изменения пароля */
export interface ChangePasswordResponse {
  /** Успешность изменения пароля */
  success: boolean;
  /** Сообщение */
  message: string;
}

/** Сообщение для получения данных пользователя */
export interface UserInfoRequest {
  /** Имя пользователя */
  username: string;
  id: string;
  email: string;
}

/** Ответ на запрос получения информации о пользователе */
export interface UserInfoResponse {
  /** Имя пользователя */
  username: string;
  /** Электронная почта */
  email: string;
  /** Дата создания аккаунта */
  createdAt: string;
}
