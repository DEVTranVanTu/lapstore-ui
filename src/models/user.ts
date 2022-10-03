export interface AuthData {
  email: string
  password: string
}

export interface AuthResponse {
  status: string
  data: {
    token: string
    user: {
      _id: string
      email: string
      username: string
      profile?: any
      role: string
    }
  }
}

export interface User {
  _id: string
  email: string
  username: string
  profile: any
  role: string
  createdAt?: Date
  updatedAt?: Date
}

export interface userInfor {
  user: User
}

export interface UpdateProfile {
  profile: {
    data: User
  }
}
