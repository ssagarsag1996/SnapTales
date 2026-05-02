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
            <img
              :src="getProductImage(getProduct(item.id)?.images ?? [])"
              :alt="getProduct(item.id)?.name"
              class="cart-thumb"
            />
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
        <button v-if="store.checkoutStep === 0" class="btn-gold" @click="handleCheckout">
          <span class="material-icons-round" style="font-size:20px">lock</span> Proceed to Checkout
        </button>
      </div>

      <!-- Checkout Step 1: Shipping -->
      <div ref="checkoutSection" v-if="store.checkoutStep >= 1" class="checkout-section">
        <h3><span class="step-num">1</span> Shipping Address</h3>
        <div class="address-grid">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input class="form-input" v-model="shippingForm.fullName" placeholder="Full name">
          </div>
          <div class="form-group">
            <label class="form-label">Phone</label>
            <input class="form-input" v-model="shippingForm.phone" placeholder="Phone number">
          </div>
          <div class="form-group" style="grid-column:1/-1">
            <label class="form-label">Address Line 1</label>
            <input class="form-input" v-model="shippingForm.line1" placeholder="Street address">
          </div>
          <div class="form-group">
            <label class="form-label">City</label>
            <input class="form-input" v-model="shippingForm.city" placeholder="City">
          </div>
          <div class="form-group">
            <label class="form-label">State</label>
            <input class="form-input" v-model="shippingForm.state" placeholder="State">
          </div>
          <div class="form-group">
            <label class="form-label">PIN Code</label>
            <input class="form-input" v-model="shippingForm.pinCode" placeholder="PIN code">
          </div>
        </div>
        <button class="btn-gold" style="margin-top:4px;width:100%" :disabled="checkoutLoading" @click="proceedToPayment">
          <span v-if="checkoutLoading" class="material-icons-round" style="font-size:18px">hourglass_empty</span>
          <template v-else>
            Continue to Payment
            <span class="material-icons-round" style="font-size:18px">arrow_forward</span>
          </template>
        </button>
      </div>

      <!-- Checkout Step 2: Payment -->
      <div ref="paymentSection" v-if="store.checkoutStep >= 2" class="checkout-section">
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
        <button class="btn-gold" style="width:100%" @click="store.placeOrder()">
          <span class="material-icons-round" style="font-size:20px">check_circle</span>
          Place Order — ${{ store.cartTotal.toFixed(2) }}
        </button>
      </div>
    </template>
  </div></main>
</template>

<script setup lang="ts">
import { ref, reactive, watch, nextTick } from 'vue'
import { useAppStore } from '@/stores/app'
import { userService } from '@/services/userService'
import { getProductImage } from '@/services/productService'

const store = useAppStore()
const selectedPayment  = ref('Credit / Debit Card')
const checkoutLoading  = ref(false)
const checkoutSection  = ref<HTMLElement | null>(null)
const paymentSection   = ref<HTMLElement | null>(null)

const shippingForm = reactive({
  fullName: store.currentUser?.name  ?? '',
  phone:    store.currentUser?.phone ?? '',
  line1: '', city: '', state: '', pinCode: ''
})

watch(() => store.currentUser, (user) => {
  if (user) {
    if (!shippingForm.fullName) shippingForm.fullName = user.name  ?? ''
    if (!shippingForm.phone)    shippingForm.phone    = user.phone ?? ''
  }
})

watch(() => store.checkoutStep, async (step) => {
  await nextTick()
  if (step === 1) checkoutSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  if (step === 2) paymentSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
})

const paymentOptions = [
  { icon: 'credit_card',     label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
  { icon: 'account_balance', label: 'Net Banking',          desc: 'All major banks' },
  { icon: 'qr_code_2',       label: 'UPI',                  desc: 'GPay, PhonePe, Paytm' },
  { icon: 'local_shipping',  label: 'Cash on Delivery',     desc: 'Pay when you receive' },
]

const getProduct = (id: string) => store.products.find(p => p.id === id)

function handleCheckout() {
  if (!store.currentUser) {
    store.openSignIn()
    const stop = watch(() => store.currentUser, (user) => {
      if (user) { stop(); store.startCheckout() }
    })
  } else {
    store.startCheckout()
  }
}

async function proceedToPayment() {
  if (!shippingForm.phone) { store.showToast('Phone number is required'); return }
  if (store.currentUser?.phone === shippingForm.phone) { store.checkoutStep = 2; return }
  checkoutLoading.value = true
  try {
    const { user, token } = await userService.findOrCreate({
      name:  shippingForm.fullName || undefined,
      phone: shippingForm.phone
    })
    store.setUser(user, token)
    store.checkoutStep = 2
  } catch {
    store.showToast('Something went wrong. Please try again.')
  } finally {
    checkoutLoading.value = false
  }
}
</script>

<style scoped>
.cart-thumb { width: 52px; height: 52px; object-fit: cover; border-radius: 10px; }
</style>
