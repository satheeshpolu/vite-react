import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe('useDebounce', () => {
  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 300));
    expect(result.current).toBe('initial');
  });

  it('does not update value before delay has elapsed', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'first' },
    });

    rerender({ value: 'second' });
    jest.advanceTimersByTime(200);

    expect(result.current).toBe('first');
  });

  it('updates value after delay has elapsed', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'first' },
    });

    rerender({ value: 'second' });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('second');
  });

  it('resets the timer when value changes before delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'first' },
    });

    rerender({ value: 'second' });
    jest.advanceTimersByTime(200);
    rerender({ value: 'third' });
    jest.advanceTimersByTime(200);

    expect(result.current).toBe('first');

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current).toBe('third');
  });

  it('uses default delay of 300ms', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'a' },
    });

    rerender({ value: 'b' });
    jest.advanceTimersByTime(299);
    expect(result.current).toBe('a');

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(result.current).toBe('b');
  });

  it('works with numeric values', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 0 },
    });

    rerender({ value: 42 });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe(42);
  });
});
