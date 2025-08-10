import React, { useState } from 'react';
import { CreditCard, DollarSign, Calendar, CheckCircle, X, Shield } from 'lucide-react';

interface PaymentGatewayProps {
  amount: number;
  description: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ amount, description, onSuccess, onCancel }) => {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolder: '',
    billingAddress: ''
  });
  const [processing, setProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({ ...prev, [name]: value }));
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
    const matches = value.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      value = parts.join(' ');
      if (value.length > 19) value = value.substring(0, 19);
    }

    setPaymentData(prev => ({ ...prev, cardNumber: value }));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setPaymentData(prev => ({ ...prev, expiryDate: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setProcessing(false);
    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Secure Payment</h3>
                <p className="text-blue-100 text-sm">Complete your payment securely</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="text-blue-100 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Payment Summary */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Payment Summary</h4>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">{description}</span>
              <span className="text-2xl font-bold text-gray-900">${amount}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Payment Method</h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  paymentMethod === 'card'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <CreditCard className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Credit Card</span>
              </button>
              <button
                onClick={() => setPaymentMethod('wallet')}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  paymentMethod === 'wallet'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <DollarSign className="w-6 h-6 mx-auto mb-2" />
                <span className="text-sm font-medium">Digital Wallet</span>
              </button>
            </div>
          </div>

          {/* Payment Form */}
          {paymentMethod === 'card' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Card Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  maxLength={19}
                  required
                />
              </div>

              {/* Expiry and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handleExpiryChange}
                    placeholder="MM/YY"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              {/* Card Holder */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Holder Name
                </label>
                <input
                  type="text"
                  name="cardHolder"
                  value={paymentData.cardHolder}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Security Notice */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <p className="text-sm text-green-700">
                  Your payment information is encrypted and secure
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing Payment...
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Pay ${amount}</span>
                    <CheckCircle className="w-5 h-5" />
                  </div>
                )}
              </button>
            </form>
          )}

          {/* Digital Wallet Option */}
          {paymentMethod === 'wallet' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6 mx-auto" />
                </button>
                <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" className="h-6 mx-auto" />
                </button>
              </div>
              <button
                onClick={() => {
                  setProcessing(true);
                  setTimeout(() => {
                    setProcessing(false);
                    onSuccess();
                  }, 1500);
                }}
                disabled={processing}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50"
              >
                {processing ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Processing Payment...
                  </div>
                ) : (
                  `Pay with Digital Wallet - $${amount}`
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;