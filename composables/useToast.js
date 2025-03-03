import { ref } from 'vue'

const TOAST_TIMEOUT = 5000

// Create separate toast lists for each position
export const toasts = {
  'top-left': ref([]),
  'top-right': ref([]),
  'bottom-left': ref([]),
  'bottom-right': ref([])
}

export function useToast() {
  const add = ({
    title,
    description,
    type = 'default',
    duration = TOAST_TIMEOUT,
    position = 'bottom-right',
    action,
  }) => {
    // Validate position
    if (!['top-left', 'top-right', 'bottom-left', 'bottom-right'].includes(position)) {
      position = 'bottom-right' // fallback to default if invalid
    }

    const id = Math.random().toString(36).slice(2, 9)
    const toast = {
      id,
      title,
      description,
      type,
      action,
      position
    }

    // Add to the correct position array
    toasts[position].value.push(toast)

    if (duration !== Infinity) {
      setTimeout(() => {
        remove(id, position)
      }, duration)
    }

    return id
  }

  const remove = (id, position = null) => {
    // If position is provided, only check that position's array
    if (position && toasts[position]) {
      const index = toasts[position].value.findIndex((toast) => toast.id === id)
      if (index !== -1) {
        toasts[position].value.splice(index, 1)
        return
      }
    }

    // If position not provided or toast not found in specified position, check all positions
    Object.values(toasts).forEach(positionToasts => {
      const index = positionToasts.value.findIndex((toast) => toast.id === id)
      if (index !== -1) {
        positionToasts.value.splice(index, 1)
      }
    })
  }

  const getToasts = (position = 'bottom-right') => {
    return toasts[position]?.value || []
  }

  return {
    add,
    remove,
    getToasts,
    toasts
  }
}