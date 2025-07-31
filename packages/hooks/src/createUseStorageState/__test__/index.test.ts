import { renderHook } from "@testing-library/react"
import createUseStorageState from ".."

describe('createUseStorageState', () => {
    beforeEach(() => {
        vi.stubGlobal('localStorage', {
            getItem: vi.fn(),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn()
        });
        localStorage.clear()
    })
    it('should return defaultValue when storage is empty', () => {
        const { rerender, result } = renderHook(() => {
            const useStorageState = createUseStorageState(localStorage)
            const res = useStorageState('test_storage', 'test text')
            return res
        })
        rerender()
        expect(result.current[0]).toBe('test text')
        // expect(localStorage.getItem('test_storage')).toBe('test text')
    })
})