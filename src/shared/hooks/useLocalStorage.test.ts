import { renderHook, act } from '@testing-library/react';
import { useLocalStorage } from './useLocalStorage';

beforeEach(() => {
  localStorage.clear();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useLocalStorage', () => {
  it('returns the initial value when nothing is stored', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('returns a stored value from localStorage on mount', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));
    const { result } = renderHook(() => useLocalStorage('test-key', 'default'));
    expect(result.current[0]).toBe('stored-value');
  });

  it('persists a new value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('test-key', ''));

    act(() => {
      result.current[1]('hello');
    });

    expect(result.current[0]).toBe('hello');
    expect(JSON.parse(localStorage.getItem('test-key')!)).toBe('hello');
  });

  it('accepts a function updater', () => {
    const { result } = renderHook(() => useLocalStorage<number>('count', 0));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
  });

  it('works with object values', () => {
    const initial = { name: 'Alice', age: 30 };
    const { result } = renderHook(() => useLocalStorage('user', initial));

    act(() => {
      result.current[1]({ name: 'Bob', age: 25 });
    });

    expect(result.current[0]).toEqual({ name: 'Bob', age: 25 });
    expect(JSON.parse(localStorage.getItem('user')!)).toEqual({ name: 'Bob', age: 25 });
  });

  it('works with array values', () => {
    const { result } = renderHook(() => useLocalStorage<number[]>('nums', []));

    act(() => {
      result.current[1]([1, 2, 3]);
    });

    expect(result.current[0]).toEqual([1, 2, 3]);
  });

  it('falls back to initial value when localStorage has invalid JSON', () => {
    localStorage.setItem('bad-key', 'not-valid-json{{{');
    const { result } = renderHook(() => useLocalStorage('bad-key', 'fallback'));
    expect(result.current[0]).toBe('fallback');
  });
});
