<template>
  <main class="page active"><div class="page-pad">
    <h2 style="padding:16px 0 4px;font-family:var(--font-display);font-size:1.4rem;font-weight:700">Frame Preview Tool</h2>
    <p style="color:var(--text-tertiary);font-size:.88rem;margin-bottom:16px">Upload your photo and see how it looks in different frames</p>
    <div class="preview-tool">
      <div class="preview-area">
        <div class="preview-canvas">
          <div
            class="frame-wrap"
            :style="frameStyle"
          >
            <div v-if="!previewSrc" class="no-img">
              <span class="material-icons-round">add_photo_alternate</span>
              <p>Upload a photo to preview</p>
            </div>
            <img
              v-else
              :src="previewSrc"
              style="width:100%;height:100%;object-fit:cover"
              alt="Preview"
            >
          </div>
        </div>
        <div
          class="upload-zone"
          @click="triggerUpload"
          @dragover.prevent="onDragOver"
          @dragenter.prevent="onDragOver"
          @dragleave.prevent="onDragLeave"
          @drop.prevent="onDrop"
          :style="dropStyle"
        >
          <span class="material-icons-round">cloud_upload</span>
          <p>Click or drag to upload your photo</p>
          <small>JPG, PNG, WEBP — Max 10 MB</small>
        </div>
        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          style="display:none"
          @change="handlePhotoUpload"
        >
      </div>
      <div class="preview-controls">
        <div class="form-group">
          <label class="form-label">Frame Style</label>
          <select class="form-select" v-model="selectedStyle" @change="updateFrame">
            <option value="classic">Classic Walnut</option>
            <option value="modern">Modern Matte</option>
            <option value="ornate">Ornate Gold</option>
            <option value="minimal">Minimal White</option>
            <option value="rustic">Rustic Wood</option>
            <option value="gallery">Gallery Black</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Frame Size</label>
          <select class="form-select" v-model="selectedSize" @change="updateFrame">
            <option value="80">5×7</option>
            <option value="75">8×10</option>
            <option value="70">11×14</option>
            <option value="65">16×20</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Mat Color</label>
          <select class="form-select" v-model="selectedMat" @change="updateFrame">
            <option value="none">No Mat</option>
            <option value="#FFFFFF">White</option>
            <option value="#F5F0E8">Cream</option>
            <option value="#2C2C2C">Black</option>
            <option value="#F0EDE4">Ivory</option>
          </select>
        </div>
      </div>
    </div>
  </div></main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { FRAME_STYLES } from '@/data/products'

const fileInput = ref<HTMLInputElement | null>(null)
const previewSrc = ref('')
const selectedStyle = ref('classic')
const selectedSize = ref('80')
const selectedMat = ref('none')
const isDragging = ref(false)

const frameStyle = computed(() => {
  const f = FRAME_STYLES[selectedStyle.value]
  const style: Record<string, string> = {
    border: f.border,
    borderRadius: f.radius,
    width: selectedSize.value + '%',
    height: selectedSize.value + '%',
  }
  if (selectedMat.value !== 'none') {
    style.padding = '12px'
    style.backgroundColor = selectedMat.value
  } else {
    style.padding = '0'
    style.backgroundColor = 'transparent'
  }
  return style
})

const dropStyle = computed(() => {
  if (isDragging.value) {
    return { borderColor: 'var(--accent)', background: 'rgba(var(--accent-rgb),.06)' }
  }
  return {}
})

const triggerUpload = () => {
  fileInput.value?.click()
}

const handlePhotoUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    previewSrc.value = ev.target?.result as string
  }
  reader.readAsDataURL(file)
}

const onDragOver = () => { isDragging.value = true }
const onDragLeave = () => { isDragging.value = false }
const onDrop = (e: DragEvent) => {
  isDragging.value = false
  const file = e.dataTransfer?.files[0]
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (ev) => {
      previewSrc.value = ev.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const updateFrame = () => {
  // Reactivity handles this via computed frameStyle
}

// Expose method to set style from outside (used by BottomSheet "Try with photo" button)
const setFrameStyle = (style: string) => {
  selectedStyle.value = style
}

defineExpose({ setFrameStyle })
</script>
