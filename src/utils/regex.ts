// src/utils/validators.ts

// 🔤 정규식 정의 --------------------------------------------------------------------------------------
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const phoneRegex = /^01([0|1|6|7|8|9]?)([0-9]{3,4})([0-9]{4})$/;
export const passwordRegex = /^(?!^[a-zA-Z]+$)(?!^\d+$)(?!^[!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]{8,}$/;

// ✅ 검증 함수들 --------------------------------------------------------------------------------------
export const validateEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

export const formatPhoneNumber = (phone : string) => {
  if (!phone) return '';
  const cleaned = ('' + phone).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{0,4})(\d{0,4})$/);
  if (match) {
    return `${match[1]}-${match[2]}${match[3] ? `-${match[3]}` : ''}`;
  }
  return phone;
};

export const validatePhoneNumber = (phone: string): boolean => {
  return phoneRegex.test(phone);
};

export const validatePassword = (password: string): boolean => {
  return passwordRegex.test(password);
};

export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

