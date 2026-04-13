<template>
  <main class="page active"><div class="page-pad">
    <h2 style="padding:16px 0 4px;font-family:var(--font-display);font-size:1.4rem;font-weight:700">Shopping Cart</h2>

    <!-- Empty Cart -->
    <div v-if="store.cart.length === 0" class="cart-empty">
      <span class="material-icons-round">shopping_bag</span>
      <h3>Your cart is empty</h3>
      <p>Add beautiful frames to get started</p>
      <button class="btn-primary" @click="store.nav('shop')">
        <span class="material-icons-round" style="font-size:18px">storefront</span> Start Shopping
      </button>
    </div>

    <!-- Cart Items -->
    <template v-else>
      <div class="cart-items">
        <div
          v-for="(item, i) in store.cart"
          :key="i"
          class="cart-item"
          :style="{ animationDelay: i * 0.08 + 's' }"
        >
          <div class="cart-item-img">
            <div :class="['mini-frame', 'fr-' + getProduct(item.id)?.style]" style="width:52px;height:52px">
              <div class="frame-box" style="width:100%;height:100%">
                <div class="inner" style="width:80%;height:80%"></div>
              </div>
            </div>
          </div>
          <div class="cart-item-info">
            <div class="name">{{ getProduct(item.id)?.name }}</div>
            <div class="size">Size: {{ item.size }}</div>
            <div class="cart-item-bot">
              <div class="price">${{ ((getProduct(item.id)?.price || 0) * item.qty).toFixed(2) }}</div>
              <div class="qty-row">
                <button class="qty-btn" @click="store.chgQty(i, -1)">−</button>
                <span class="qty-val">{{ item.qty }}</span>
                <button class="qty-btn" @click="store.chgQty(i, 1)">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cart Summary -->
      <div class="cart-summary">
        <div class="cart-row"><span>Subtotal</span><span>${{ store.cartSubtotal.toFixed(2) }}</span></div>
        <div class="cart-row">
          <span>Shipping</span>
          <span v-if="store.shipping === 0" style="color:var(--success);font-weight:600">FREE</span>
          <span v-else>${{ store.shipping.toFixed(2) }}</span>
        </div>
        <div class="cart-row"><span>Tax (8%)</span><span>${{ store.tax.toFixed(2) }}</span></div>
        <div v-if="store.shipping > 0" style="font-size:.76rem;color:var(--accent);margin-bottom:8px">
          Add ${{ (99 - store.cartSubtotal).toFixed(2) }} more for free shipping
        </div>
        <div class="cart-row total"><span>Total</span><span>${{ store.cartTotal.toFixed(2) }}</span></div>
        <button class="btn-gold" @click="store.startCheckout()">
          <span class="material-icons-round" style="font-size:20px">lock</span> Proceed to Checkout
        </button>
      </div>

      <!-- Checkout Step 1: Shipping -->
      <div v-if="store.checkoutStep >= 1" class="checkout-section">
        <h3><span class="step-num">1</span> Shipping Address</h3>
        <div class="address-grid">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input class="form-input" value="Sagar">
          </div>
          <div class="form-group">
            <label class="form-label">Phone</label>
            <input class="form-input" value="+91 98765 43210">
          </div>
          <div class="form-group">
            <label class="form-label">Address Line 1</label>
            <input class="form-input" placeholder="Street address">
          </div>
          <div class="form-group">
            <label class="form-label">City</label>
            <input class="form-input" placeholder="City">
          </div>
          <div class="form-group">
            <label class="form-label">State</label>
            <input class="form-input" placeholder="State">
          </div>
          <div class="form-group">
            <label class="form-label">PIN Code</label>
            <input class="form-input" placeholder="PIN code">
          </div>
        </div>
        <button class="btn-gold mt-4" @click="store.checkoutStep = 2">
          Continue to Payment <span class="material-icons-round" style="font-size:18px">arrow_forward</span>
        </button>
      </div>

      <!-- Checkout Step 2: Payment -->
      <div v-if="store.checkoutStep >= 2" class="checkout-section">
        <h3><span class="step-num">2</span> Payment Method</h3>
        <div class="payment-options">
          <div
            v-for="opt in paymentOptions"
            :key="opt.label"
            class="pay-opt"
            :class="{ active: selectedPayment === opt.label }"
            @click="selectedPayment = opt.label"
          >
            <span class="material-icons-round">{{ opt.icon }}</span>
            <div>
              <div class="pay-opt-label">{{ opt.label }}</div>
              <div class="pay-opt-desc">{{ opt.desc }}</div>
            </div>
          </div>
        </div>
        <button class="btn-gold" @click="store.placeOrder()">
          <span class="material-icons-round" style="font-size:20px">check_circle</span> Place Order — ${{ store.cartTotal.toFixed(2) }}
        </button>
      </div>
    </template>
  </div></main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { PRODUCTS } from '@/data/products'

const store = useAppStore()
const selectedPayment = ref('Credit / Debit Card')

const paymentOptions = [
  { icon: 'credit_card', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
  { icon: 'account_balance', label: 'Net Banking', desc: 'All major banks' },
  { icon: 'qr_code_2', label: 'UPI', desc: 'GPay, PhonePe, Paytm' },
  { icon: 'local_shipping', label: 'Cash on Delivery', desc: 'Pay when you receive' },
]

const getProduct = (id: number) => PRODUCTS.find(p => p.id === id)
</script>
