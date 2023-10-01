export interface Auth {
    data: Data
    access_token: string
    Mensaje: string
    rolA: RolA
  }
  
  export interface Data {
    id: number
    nameUser: string
    app: string
    apm: string
    userName: string
    password: string
    rol_id: number
    created_at: string
    updated_at: string
  }
  
  export interface RolA {
    id: number
    nameRole: string
    created_at: string
    updated_at: string
  }
  