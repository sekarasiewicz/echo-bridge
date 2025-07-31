// API Types for Echo Bridge Application

export type EchoRequest = {
  message: string;
};

export type EchoResponse = {
  echo: string;
  timestamp: string;
};

export type ApiError = {
  error: string;
  message: string;
  status: number;
  timestamp: string;
};
