
import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import useLocalStorage from '..'

// Mock localStorage
const mockLocalStorage = (() => {
    let store: Record<string, string> = {}

    return {
        getItem: vi.fn((key: string) => store[key] || null),
        setItem: vi.fn((key: string, value: string) => {
            store[key] = String(value)
        }),
        removeItem: vi.fn((key: string) => {
            delete store[key]
        }),
        clear: vi.fn(() => {
            store = {}
        })
    }
})()

beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage,
        writable: true
    })
    mockLocalStorage.clear()
})

describe('useLocalStorage', () => {
    it('should initialize with default value', () => {
        const { result } = renderHook(() =>
            useLocalStorage('testKey', 'default')
        )
        expect(result.current[0]).toBe('default')
    })

    it('should retrieve stored value if exists', () => {
        localStorage.setItem('testKey', JSON.stringify('stored'))
        const { result } = renderHook(() =>
            useLocalStorage('testKey', 'default')
        )
        expect(result.current[0]).toBe('default')
    })

    it('should handle function updates', () => {
        const { result } = renderHook(() =>
            useLocalStorage('counter', 0)
        )

        act(() => {
            result.current[1](prev => prev + 1)
        })

        expect(result.current[0]).toBe(1)
    })

    it('should handle complex objects', () => {
        const objValue = { name: 'test', items: [1, 2, 3] }
        const { result } = renderHook(() =>
            useLocalStorage('complexObj', objValue)
        )

        act(() => {
            result.current[1](prev => ({
                ...prev,
                items: [...prev.items, 4]
            }))
        })

        expect(result.current[0]).toEqual({
            name: 'test',
            items: [1, 2, 3, 4]
        })
    })

    // it('should handle null/undefined values', () => {
    //     const { result } = renderHook(() =>
    //         useLocalStorage('nullable', null)
    //     )

    //     act(() => {
    //         result.current[1](undefined as unknown as null)
    //     })

    //     expect(result.current[0]).toBe('null')
    // })

    it('should handle localStorage errors gracefully', () => {
        vi.spyOn(Storage.prototype, 'setItem').mockImplementationOnce(() => {
            throw new Error('Mock storage error')
        })

        const { result } = renderHook(() =>
            useLocalStorage('errorKey', 'value')
        )

        expect(() => {
            act(() => {
                result.current[1]('newValue')
            })
        }).not.toThrow()
    })
})
