export class ShurjoPay {
  constructor(config) {
    this.config = config;
    this.token = null;
    this.tokenExpiry = null;
    this.storeId = null;
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

    if (!response.ok) {
      throw new Error(`Failed to get auth token: ${response.statusText}`);
    }

    return response.json();
  }

  async ensureValidToken() {
    const now = new Date();

    if (!this.token || !this.tokenExpiry || now >= this.tokenExpiry) {
      const authResponse = await this.getAuthToken();

      if (authResponse.sp_code !== "200") {
        throw new Error(`Authentication failed: ${authResponse.message}`);
      }

      this.token = authResponse.token;
      this.storeId = authResponse.store_id;
      this.tokenExpiry = new Date(
        now.getTime() + (authResponse.expires_in - 60) * 1000
      );
    }
  }

  async initiatePayment(paymentData) {
    await this.ensureValidToken();

    const payload = {
      prefix: this.config.prefix,
      token: this.token,
      store_id: this.storeId,
      ...paymentData,
    };

    const response = await fetch(`${this.config.baseUrl}/api/secret-pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Payment initiation failed: ${response.status} - ${err}`);
    }

    return response.json();
  }

  async verifyPayment(orderId) {
    await this.ensureValidToken();

    const response = await fetch(`${this.config.baseUrl}/api/verification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify({ order_id: orderId }),
    });

    if (!response.ok) {
      throw new Error(`Payment verification failed: ${response.statusText}`);
    }

    return response.json();
  }
}
