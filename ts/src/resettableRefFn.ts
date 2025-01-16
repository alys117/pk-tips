import { ref, UnwrapRef, Ref } from 'vue'
export function useResettableRefFn<T>(cb: () => T) {
  const state: Ref<UnwrapRef<T>> = ref(cb())
  const reset = () => {
    state.value = cb() as UnwrapRef<T>
  }
  return { state, reset }
}