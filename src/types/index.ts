export interface IPayinRequest {
  orderId: string;
  amount: number;
  name: string;
  email: string;
  mobile: string;
  vpa: string;
}

export interface IPayinResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: {
    orderId: string;
    message: string;
  };
}

export interface IPayinStatusRequest {
  orderId: string;
}

export interface IPayinStatusResponse {
  statusCode: number;
  message: string;
  success: boolean;
  data: {
    orderId: string;
    status: 'SUCCESS' | 'PENDING' | 'FAILED';
    txnRefId: string;
  };
}
