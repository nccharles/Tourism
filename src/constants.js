import { Platform } from 'react-native';

export const TOKEN_KEY = '@ecommerce/token';
export const HOST = Platform.OS === 'ios' ? 'localhost' : '192.168.1.71';
