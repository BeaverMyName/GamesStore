import 'reflect-metadata';
import { injectable } from "inversify";
import PaymentResponse from '../dtos/PaymentResponse';

export interface PaymentService {
    doPayment(price: number): Promise<PaymentResponse>;
}

@injectable()
export default class DefaultPaymentService implements PaymentService{
    //TODO: finish method
    public async doPayment(price: number): Promise<PaymentResponse> {
        return { statusCode: 200 };
    }
}