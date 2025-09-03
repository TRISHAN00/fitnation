import axios from "axios";

export class ShurjoPay {
  constructor(config) {
    this.config = config;
    this.token = null;
    this.tokenExpiry = null;
    this.storeId = null;
  }

  // Add this new verification method
  async verifyPayment(orderId) {
    console.log(orderId, 'from order id')
    try {
      // Get fresh token
      const tokenResponse = await this.getAuthToken();

      console.log(tokenResponse, 'from verify class')

      const response = await fetch(`${this.config.baseUrl}/api/verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenResponse.token}`,
        },
        body: JSON.stringify({
          order_id: orderId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Verification failed: ${JSON.stringify(errorData)}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Payment verification error:", error);
      throw error;
    }
  }

  async getAuthToken() {
    const response = await fetch(`${this.config.baseUrl}/api/get_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: this.config.username,
        password: this.config.password,
      }),
    });

    console.log(response, 'from getAuthToken');

    if (!response.ok) {
      throw new Error(`Failed to get auth token: ${response.statusText}`);
    }

    return response.json();
  }

  async checkout(paymentData) {
    // await this.ensureValidToken();
    const payload = {
      prefix: paymentData.prefix,
      token: paymentData.token,
      store_id: paymentData.store_id,
      ...paymentData,
    };

    console.log(payload, "payload");

    const secretPayUrl = `${this.config.baseUrl}/api/secret-pay`;
    console.log(secretPayUrl, 'secretPayUrl');
    try {
      const response = await axios.post(
        secretPayUrl,
        payload, // no need JSON.stringify, axios does it
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${paymentData.token}`,
          },
        }
      );



      return response.data;
    } catch (error) {
      console.error(
        "Payment initiation error:",
        error.response?.data || error.message
      );
    }

    return null;
  }
}
