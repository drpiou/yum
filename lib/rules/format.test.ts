import { describe, expect, test } from 'vitest';
import YumError from '../error';
import string from '../types/string';
import catchError from '../utils/catchError';
import format, { hasFormat } from './format';

describe('format', () => {
  test('date:1', () => {
    const context = format('date', string());

    const [_, error] = catchError(() => context._validateFormat(context, '2020-01-01'));

    expect(error).toBe(undefined);
  });

  test('date:2', () => {
    const context = format('date', string());

    const [_, error] = catchError(() => context._validateFormat(context, '2020-01-01T00:00:00Z'));

    expect(error).toBe(undefined);
  });

  test('date:3', () => {
    const context = format('date', string());

    const [_, error] = catchError(() => context._validateFormat(context, '2020-01-01T00:00:00.000Z'));

    expect(error).toBe(undefined);
  });

  test('date:4', () => {
    const context = format('date', string());

    const [_, error] = catchError(() => context._validateFormat(context, '2020-01-01T00:00:00-01:00'));

    expect(error).toBe(undefined);
  });

  test('date:5', () => {
    const context = format('date', string());

    const [_, error] = catchError(() => context._validateFormat(context, '2020-01-01T00:00:00.000-01:00'));

    expect(error).toBe(undefined);
  });

  test('date:6', () => {
    const context = format('date', string());

    const [_, error] = catchError(() => context._validateFormat(context, '2020-01-01T00:00'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('date:7', () => {
    const context = format('date', string());

    const [_, error] = catchError(() => context._validateFormat(context, '2020-01-01T00:00:00+01:00'));

    expect(error).toBeInstanceOf(YumError);
  });
  test('message', () => {
    const context = format('date', string(), { message: '' });

    const [_, error] = catchError(() => context._validateFormat(context, '2020-01-01T00:00:00+01:00'));

    expect(error?.reasons[0]?.message).toBe('');
  });

  test('email:1', () => {
    const context = format('email', string());

    const [_, error] = catchError(() => context._validateFormat(context, 'a@a.a'));

    expect(error).toBe(undefined);
  });

  test('email:2', () => {
    const context = format('email', string());

    const [_, error] = catchError(() => context._validateFormat(context, 'a@a-a.a'));

    expect(error).toBe(undefined);
  });

  test('email:3', () => {
    const context = format('email', string());

    const [_, error] = catchError(() => context._validateFormat(context, 'a-a@a-a.a'));

    expect(error).toBe(undefined);
  });

  test('email:4', () => {
    const context = format('email', string());

    const [_, error] = catchError(() => context._validateFormat(context, 'a'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('email:5', () => {
    const context = format('email', string());

    const [_, error] = catchError(() => context._validateFormat(context, 'a.a'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('email:6', () => {
    const context = format('email', string());

    const [_, error] = catchError(() => context._validateFormat(context, 'a-a@'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('email:7', () => {
    const context = format('email', string());

    const [_, error] = catchError(() => context._validateFormat(context, '@a-a.a'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('ipv4:1', () => {
    const context = format('ipv4', string());

    const [_, error] = catchError(() => context._validateFormat(context, '0.0.0.0'));

    expect(error).toBe(undefined);
  });

  test('ipv4:2', () => {
    const context = format('ipv4', string());

    const [_, error] = catchError(() => context._validateFormat(context, '192.168.0.1'));

    expect(error).toBe(undefined);
  });

  test('ipv4:3', () => {
    const context = format('ipv4', string());

    const [_, error] = catchError(() => context._validateFormat(context, '255.255.255.255'));

    expect(error).toBe(undefined);
  });

  test('ipv4:4', () => {
    const context = format('ipv4', string());

    const [_, error] = catchError(() => context._validateFormat(context, '0.0.0'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('ipv4:5', () => {
    const context = format('ipv4', string());

    const [_, error] = catchError(() => context._validateFormat(context, '192.168.0.1.1'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('ipv4:6', () => {
    const context = format('ipv4', string());

    const [_, error] = catchError(() => context._validateFormat(context, '256.256.256.256'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('ipv4:7', () => {
    const context = format('ipv4', string());

    const [_, error] = catchError(() => context._validateFormat(context, 'a.a.a.a'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('ipv6:1', () => {
    const context = format('ipv6', string());

    const [_, error] = catchError(() => context._validateFormat(context, '2001:0db8:85a3:0000:0000:8a2e:0370:7334'));

    expect(error).toBe(undefined);
  });

  test('ipv6:2', () => {
    const context = format('ipv6', string());

    const [_, error] = catchError(() => context._validateFormat(context, '2001:db8::2:1'));

    expect(error).toBe(undefined);
  });

  test('ipv6:3', () => {
    const context = format('ipv6', string());

    const [_, error] = catchError(() => context._validateFormat(context, '2001:db8:0:1:1:1:1:1'));

    expect(error).toBe(undefined);
  });

  test('ipv6:4', () => {
    const context = format('ipv6', string());

    const [_, error] = catchError(() => context._validateFormat(context, '::ffff:c000:0280'));

    expect(error).toBe(undefined);
  });

  test('ipv6:5', () => {
    const context = format('ipv6', string());

    const [_, error] = catchError(() => context._validateFormat(context, '::ffff:192.0.2.128'));

    expect(error).toBe(undefined);
  });

  test('ipv6:6', () => {
    const context = format('ipv6', string());

    const [_, error] = catchError(() => context._validateFormat(context, 'zzzz:zzzz:zzzz:zzzz:zzzz:zzzz:zzzz:zzzz'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('phone:1', () => {
    const context = format('phone', string());

    const [_, error] = catchError(() => context._validateFormat(context, '+1 (555) 555-1234'));

    expect(error).toBe(undefined);
  });

  test('phone:2', () => {
    const context = format('phone', string());

    const [_, error] = catchError(() => context._validateFormat(context, '+1(555)555-1234'));

    expect(error).toBe(undefined);
  });

  test('phone:3', () => {
    const context = format('phone', string());

    const [_, error] = catchError(() => context._validateFormat(context, '+15555551234'));

    expect(error).toBe(undefined);
  });

  test('phone:4', () => {
    const context = format('phone', string());

    const [_, error] = catchError(() => context._validateFormat(context, '+41 00 000 00 00'));

    expect(error).toBe(undefined);
  });

  test('phone:5', () => {
    const context = format('phone', string());

    const [_, error] = catchError(() => context._validateFormat(context, '+41000000000'));

    expect(error).toBe(undefined);
  });

  test('phone:6', () => {
    const context = format('phone', string());

    const [_, error] = catchError(() => context._validateFormat(context, '-1 (555) 555-1234'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('url:1', () => {
    const context = format('url', string());

    const [_, error] = catchError(() => context._validateFormat(context, 'abc.io'));

    expect(error).toBe(undefined);
  });

  test('url:2', () => {
    const context = format('url', string());

    const [_, error] = catchError(() => context._validateFormat(context, 'https://abc.io'));

    expect(error).toBe(undefined);
  });

  test('url:3', () => {
    const context = format('url', string());

    const [_, error] = catchError(() => context._validateFormat(context, 'ftp://abc.io'));

    expect(error).toBe(undefined);
  });

  test('url:4', () => {
    const context = format('url', string());

    const [_, error] = catchError(() => context._validateFormat(context, '://abc.io'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('url:5', () => {
    const context = format('url', string());

    const [_, error] = catchError(() => context._validateFormat(context, 'abc'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('url:6', () => {
    const context = format('url', string());

    const [_, error] = catchError(() => context._validateFormat(context, 'abc.'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('url:7', () => {
    const context = format('url', string());

    const [_, error] = catchError(() => context._validateFormat(context, '.io'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('url:options:1', () => {
    const context = format('url', string(), { protocol: ['http', 'https'] });

    const [_, error] = catchError(() => context._validateFormat(context, 'https://abc.io'));

    expect(error).toBe(undefined);
  });

  test('url:options:2', () => {
    const context = format('url', string(), { protocol: ['http', 'https'] });

    const [_, error] = catchError(() => context._validateFormat(context, 'abc.io'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('url:options:3', () => {
    const context = format('url', string(), { protocol: ['http', 'https'] });

    const [_, error] = catchError(() => context._validateFormat(context, 'ftp://abc.io'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('uuid:1', () => {
    const context = format('uuid', string());

    const [_, error] = catchError(() => context._validateFormat(context, '68881adb-b55a-4272-8602-83996c6e7ecf'));

    expect(error).toBe(undefined);
  });

  test('uuid:2', () => {
    const context = format('uuid', string());

    const [_, error] = catchError(() => context._validateFormat(context, 'zzzzzzzz-zzzz-zzzz-zzzz-zzzzzzzzzzzz'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('uuid:options:1', () => {
    const context = format('uuid', string(), { version: 4 });

    const [_, error] = catchError(() => context._validateFormat(context, '68881adb-b55a-4272-8602-83996c6e7ecf'));

    expect(error).toBe(undefined);
  });

  test('uuid:options:2', () => {
    const context = format('uuid', string(), { version: 1 });

    const [_, error] = catchError(() => context._validateFormat(context, '68881adb-b55a-4272-8602-83996c6e7ecf'));

    expect(error).toBeInstanceOf(YumError);
  });

  test('hasFormat:true', () => {
    const result = hasFormat(format('date', string()));

    expect(result).toBe(true);
  });

  test('hasFormat:false', () => {
    const result = hasFormat(string());

    expect(result).toBe(false);
  });
});
