// API Types for Echo Bridge Application

export interface EchoRequest {
  message: string;
}

export interface EchoResponse {
  echo: string;
  timestamp: string;
}

export interface ApiError {
  error: string;
  message: string;
  status: number;
  timestamp: string;
}
