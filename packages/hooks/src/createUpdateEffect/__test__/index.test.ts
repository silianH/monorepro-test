import { useEffect, useLayoutEffect } from "react"
import createUpdateEffect from ".."
import { renderHook } from "@testing-library/react";

describe('createUpdateEffect', () => {
    it('should work for useEffect', () => {
        const useUpdateEffect = createUpdateEffect(useEffect);
        let mountedState = 1
        const hook = renderHook(() => {
            useUpdateEffect(() => {
                mountedState++;
            })
        })
        expect(mountedState).toBe(1)
        hook.rerender()
        expect(mountedState).toBe(2)
    })

    it('should work for useLayoutEffect', () => {
        const useUpdateEffect = createUpdateEffect(useLayoutEffect);
        let mountedState = 1
        const hook = renderHook(() => {
            useUpdateEffect(() => {
                mountedState++;
            })
        })
        expect(mountedState).toBe(1)
        hook.rerender()
        expect(mountedState).toBe(2)
    })
})